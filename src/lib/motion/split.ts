/**
 * Kinetic text splitting on top of SplitText. Browser only: call it from
 * attachments, never during SSR.
 *
 * - Same space: before every split the kerned advance of each character is
 *   measured on the unsplit text and the character span is locked to it (in
 *   em). The split text occupies exactly the space the original did, and a
 *   weight change stays inside its box, so neighbours never move.
 * - Same reading: headings get the original text as aria-label with the
 *   fragments aria-hidden. Text inside a link or button keeps that control's
 *   original name as aria-label (otherwise split characters are announced
 *   one by one). Paragraphs are split at word boundaries only.
 * - Resize / font swap: when lines are split, SplitText's autoSplit re-splits
 *   (debounced); widths are re-measured in onRevert, while the text is whole.
 */
import { SplitText } from './gsap';

export interface KineticSplitOptions {
	/** Split into lines (block spans). Enables autoSplit. */
	lines?: boolean;
	/** Clip each line in a mask (for the rise). */
	mask?: boolean;
	/** Also split into words, or words and characters. */
	unit?: 'words' | 'chars';
	/** Words stay display: inline (paragraphs that never transform words). */
	inlineWords?: boolean;
	/** Runs after every (re-)split. Return the entrance tween so SplitText carries its progress over. */
	onSplit: (split: SplitText, weighted: boolean) => gsap.core.Animation | void;
	/** Runs before every re-split and on the final revert. */
	onRevert?: () => void;
	/** Return false once the owner is being torn down (skips re-measuring). */
	alive?: () => boolean;
	/** The text changed while split (it has been reverted): split it again if needed. */
	onStale?: () => void;
}

const WHITESPACE = /^[ \t\n\r\f]+$/;
/** Debounce for re-splitting on container resize, in ms (the same as SplitText's autoSplit). */
const RESPLIT_DELAY = 200;
const segmenter =
	typeof Intl !== 'undefined' && 'Segmenter' in Intl
		? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
		: null;

function graphemes(text: string): { segment: string; index: number }[] {
	if (segmenter) return [...segmenter.segment(text)];
	let index = 0;
	return Array.from(text, (segment) => {
		const item = { segment, index };
		index += segment.length;
		return item;
	});
}

/**
 * Kerned advance of every non-whitespace character, in em, in document order
 * (the same order SplitText produces its chars in).
 */
function measureAdvances(elements: readonly HTMLElement[]): number[] {
	const advances: number[] = [];
	const range = document.createRange();
	for (const element of elements) {
		const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
		let previous = -1;
		let previousLeft = 0;
		let previousTop = 0;
		for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
			const size = parseFloat(getComputedStyle(node.parentElement ?? element).fontSize) || 16;
			for (const { segment, index } of graphemes(node.data)) {
				if (WHITESPACE.test(segment)) {
					previous = -1;
					continue;
				}
				range.setStart(node, index);
				range.setEnd(node, index + segment.length);
				const rect = range.getBoundingClientRect();
				// Same line as the previous glyph: its advance runs up to this glyph (kerning included)
				if (previous >= 0 && Math.abs(rect.top - previousTop) < 1 && rect.left > previousLeft) {
					advances[previous] = (rect.left - previousLeft) / size;
				}
				previous = advances.push(rect.width / size) - 1;
				previousLeft = rect.left;
				previousTop = rect.top;
			}
		}
	}
	return advances;
}

const normalise = (text: string | null) => (text ?? '').replace(/\s+/g, ' ').trim();

/** Sets an attribute and returns a function that puts the old value back. */
function setAttribute(element: Element, name: string, value: string) {
	const old = element.getAttribute(name);
	element.setAttribute(name, value);
	return () => (old === null ? element.removeAttribute(name) : element.setAttribute(name, old));
}

/**
 * Lets SplitText work on a copy of each target's content.
 *
 * SplitText empties the original text nodes and reverts by resetting
 * innerHTML, which replaces the nodes Svelte keeps references to (text and
 * {#if} anchors): later updates (e.g. navigating between two pages of the same
 * route) would then land in detached nodes and the old text would stay on
 * screen. Instead the original nodes wait in a fragment, where Svelte can keep
 * updating them, and come back on the final revert. If they change while the
 * text is split, or a split target is removed, `onStale` runs.
 */
export function guardNodes(root: HTMLElement, targets: readonly HTMLElement[], onStale: () => void) {
	const stores = targets.map(() => document.createDocumentFragment());
	let away = false;
	const observer = new MutationObserver(() => onStale());

	return {
		/** Move the originals into the fragments; the targets get copies to split. */
		out() {
			if (away) return;
			targets.forEach((target, i) => {
				const copies = Array.from(target.childNodes, (node) => node.cloneNode(true));
				stores[i].replaceChildren(...target.childNodes);
				target.replaceChildren(...copies);
				observer.observe(stores[i], { subtree: true, childList: true, characterData: true });
			});
			if (root !== targets[0]) observer.observe(root, { childList: true });
			away = true;
		},
		/** Put the originals (with any updates) back in place of SplitText's copy. */
		in() {
			if (!away) return;
			observer.disconnect();
			targets.forEach((target, i) => target.replaceChildren(...stores[i].childNodes));
			away = false;
		}
	};
}

export interface KineticSplit {
	split: SplitText;
	/** Final revert: back to the original (Svelte-owned) nodes. */
	finish: () => void;
}

/**
 * Split `root` (or its two-tone [data-line-group] children) for kinetic
 * effects. Create it inside a gsap context so it reverts with it.
 */
export function kineticSplit(root: HTMLElement, options: KineticSplitOptions): KineticSplit {
	const chars = options.unit === 'chars';
	const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-line-group]'));
	const outerControl = root.closest<HTMLElement>('a, button');
	const innerControl = chars && !outerControl ? root.querySelector<HTMLElement>('a, button') : null;
	const control = outerControl ?? innerControl;
	// Text inside a link/button (e.g. <h3><a>…</a></h3>) is split inside it, so it stays in the link
	const targets = groups.length ? groups : innerControl ? [innerControl] : [root];
	const isHeading = /^H[1-6]$/.test(root.tagName);
	const weight = getComputedStyle(root).fontWeight;

	// Accessible text, captured while the text is still whole
	const rootLabel = normalise(root.textContent);
	const controlLabel = control && !control.hasAttribute('aria-label') ? normalise(control.textContent) : null;
	let aria: 'auto' | 'hidden' | 'none' = 'none';
	if (options.unit && !control && isHeading) aria = groups.length ? 'hidden' : 'auto';

	// Measured on the whole text: character advances, and the root's width.
	// Split lines can shrink a shrink-to-fit heading to its widest line, so its
	// width is held while split (and re-split when its container resizes).
	let advances: number[] | null = null;
	let width = 0;
	const measure = () => {
		if (chars) advances = measureAdvances(targets);
		width = root.getBoundingClientRect().width;
	};
	measure();

	let restore: (() => void)[] = [];
	const undo = () => {
		restore.forEach((fn) => fn());
		restore = [];
	};

	// autoSplit only watches the split elements, which can't grow while their width
	// is held; so also re-split when the viewport width changes (fluid type follows it).
	let viewportWidth = window.innerWidth;
	let timer = 0;
	const stopWatching = () => {
		clearTimeout(timer);
		window.removeEventListener('resize', onResize);
	};
	const onResize = () => {
		clearTimeout(timer);
		timer = window.setTimeout(() => {
			if (!split.isSplit) return stopWatching();
			if (window.innerWidth === viewportWidth) return;
			viewportWidth = window.innerWidth;
			split.split(config);
		}, RESPLIT_DELAY);
	};
	if (options.lines) window.addEventListener('resize', onResize);

	const config: SplitText.Vars = {
		type: [options.lines && 'lines', options.unit && 'words', chars && 'chars'].filter(Boolean).join(','),
		mask: options.mask ? 'lines' : undefined,
		linesClass: 'split-line',
		wordsClass: options.inlineWords ? 'kinetic-word kinetic-word--inline' : 'kinetic-word',
		charsClass: 'kinetic-char',
		tag: 'span',
		aria,
		autoSplit: !!options.lines,
		onSplit(self) {
			undo();
			if (aria === 'hidden') restore.push(setAttribute(root, 'aria-label', rootLabel));
			if (control && controlLabel) restore.push(setAttribute(control, 'aria-label', controlLabel));

			// Lock each character to its measured advance; only then can weight change safely
			const locked = advances;
			const weighted = !!locked && locked.length === self.chars.length;
			if (locked && weighted) {
				self.chars.forEach((char, i) => ((char as HTMLElement).style.width = `${locked[i]}em`));
				restore.push(setAttribute(root, 'data-kinetic-weight', ''));
				root.style.setProperty('--kw', weight);
				restore.push(() => root.style.removeProperty('--kw'));
			}
			if (options.lines) {
				root.style.minInlineSize = `${width}px`;
				restore.push(() => root.style.removeProperty('min-inline-size'));
			}
			return options.onSplit(self, weighted);
		},
		onRevert() {
			undo();
			options.onRevert?.();
			const teardown = options.alive?.() === false || !root.isConnected;
			// Final revert (not an autoSplit/resize re-split): hand the nodes back to Svelte
			if (finishing || teardown) guard.in();
			if (teardown) {
				stopWatching();
				return;
			}
			// Re-measure on the whole text before it is split again
			measure();
		}
	};

	let finishing = false;
	const finish = () => {
		finishing = true;
		split.revert();
		finishing = false;
		guard.in(); // also when a gsap context already reverted the split
	};
	// Content changed under the split (Svelte update): the owner re-creates it
	const guard = guardNodes(root, targets, () => {
		if (!split.isSplit) return;
		finish();
		options.onStale?.();
	});

	guard.out();
	const split = SplitText.create(targets, config);
	return { split, finish };
}
