<script lang="ts">
	import { submitContactForm } from '#lib/contact/submit.ts';
	import { contact } from '#lib/content/company.ts';
	import Button from '../ui/Button.svelte';

	/**
	 * Contact form with client-side validation. Errors show after a field is
	 * left or on submit; on submit, focus moves to the first invalid field.
	 * Sending is delegated to submitContactForm() (src/lib/contact/submit.ts).
	 */
	const { form } = contact;
	type Field = 'name' | 'email' | 'message';

	const values = $state<Record<Field, string>>({ name: '', email: '', message: '' });
	const touched = $state<Record<Field, boolean>>({ name: false, email: false, message: false });
	let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
	let formEl: HTMLFormElement | undefined = $state();

	const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

	function validate(field: Field): string | null {
		const value = values[field].trim();
		if (!value) return form.messages.required;
		if (field === 'email' && !EMAIL.test(value)) return form.messages.email;
		return null;
	}

	const errors = $derived({
		name: touched.name ? validate('name') : null,
		email: touched.email ? validate('email') : null,
		message: touched.message ? validate('message') : null
	});

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		if (status === 'sending') return;

		touched.name = touched.email = touched.message = true;
		const firstInvalid = (['name', 'email', 'message'] as const).find((f) => validate(f));
		if (firstInvalid) {
			formEl?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
			return;
		}

		status = 'sending';
		try {
			await submitContactForm({
				name: values.name.trim(),
				email: values.email.trim(),
				message: values.message.trim()
			});
			status = 'success';
			values.name = values.email = values.message = '';
			touched.name = touched.email = touched.message = false;
		} catch (error) {
			console.error(error);
			status = 'error';
		}
	}
</script>

<form class="form" novalidate bind:this={formEl} {onsubmit}>
	{#each ['name', 'email', 'message'] as const as field (field)}
		{@const meta = form.fields[field]}
		{@const error = errors[field]}
		<div class="field" class:has-error={!!error}>
			<label for="contact-{field}">{meta.label}</label>
			{#if field === 'message'}
				<textarea
					id="contact-{field}"
					name={field}
					rows="6"
					placeholder={meta.placeholder}
					required
					aria-invalid={error ? 'true' : undefined}
					aria-describedby={error ? `contact-${field}-error` : undefined}
					bind:value={values[field]}
					onblur={() => (touched[field] = true)}
				></textarea>
			{:else}
				<input
					id="contact-{field}"
					name={field}
					type={field === 'email' ? 'email' : 'text'}
					autocomplete={field === 'email' ? 'email' : 'name'}
					placeholder={meta.placeholder}
					required
					aria-invalid={error ? 'true' : undefined}
					aria-describedby={error ? `contact-${field}-error` : undefined}
					bind:value={values[field]}
					onblur={() => (touched[field] = true)}
				/>
			{/if}
			{#if error}
				<p class="error" id="contact-{field}-error">{error}</p>
			{/if}
		</div>
	{/each}

	<div class="actions">
		<Button
			type="submit"
			label={form.submit}
			variant="accent"
			size="lg"
			disabled={status === 'sending'}
			aria-busy={status === 'sending'}
		/>
	</div>

	<div class="status" aria-live="polite" role="status">
		{#if status === 'success'}
			<p class="message message--success">{form.messages.success}</p>
		{/if}
	</div>
	<div aria-live="assertive" role="alert">
		{#if status === 'error'}
			<p class="message message--error">{form.messages.error}</p>
		{/if}
	</div>
</form>

<style>
	.form {
		display: grid;
		gap: var(--space-5);
	}

	.field {
		display: grid;
		gap: var(--space-2);
	}

	label {
		font-size: var(--text-sm);
		font-weight: 600;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.875rem 1.125rem;
		border: 0;
		border-radius: var(--radius-md);
		background: var(--color-paper);
		box-shadow: inset 0 0 0 1px var(--color-line-strong);
		font-size: var(--text-base);
		line-height: 1.5;
		transition: box-shadow var(--dur-fast) var(--ease-out);
	}

	textarea {
		resize: vertical;
		min-height: 9rem;
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--color-ink-subtle);
	}

	input:hover,
	textarea:hover {
		box-shadow: inset 0 0 0 1px var(--color-ink-subtle);
	}

	input:focus-visible,
	textarea:focus-visible {
		outline: none;
		border-radius: var(--radius-md);
		box-shadow:
			inset 0 0 0 2px var(--color-accent),
			0 0 0 4px var(--color-accent-soft);
	}

	.has-error input,
	.has-error textarea {
		box-shadow: inset 0 0 0 2px var(--color-error);
	}

	.error {
		font-size: var(--text-sm);
		font-weight: 560;
		color: var(--color-error);
	}

	.actions {
		margin-top: var(--space-2);
	}

	.message {
		padding: var(--space-4) var(--space-5);
		border-radius: var(--radius-md);
		font-weight: 560;
		animation: message-in var(--dur-slow) var(--ease-out) both;
	}

	.message--success {
		background: var(--color-accent-soft);
		color: var(--color-accent-strong);
	}

	.message--error {
		background: #f6e3e0;
		color: var(--color-error);
	}

	@keyframes message-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}
</style>
