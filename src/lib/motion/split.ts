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
}

const WHITESPACE = /^[ \t\n\r\f]+$/;
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
 * Split `root` (or its two-tone [data-line-group] children) for kinetic
 * effects. Create it inside a gsap context so it reverts with it.
 */
export function kineticSplit(root: HTMLElement, options: KineticSplitOptions): SplitText {
	const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-line-group]'));
	const targets = groups.length ? groups : [root];
	const chars = options.unit === 'chars';
	const control = root.closest<HTMLElement>('a, button') ?? (chars ? root.querySelector<HTMLElement>('a, button') : null);
	const isHeading = /^H[1-6]$/.test(root.tagName);
	const weight = getComputedStyle(root).fontWeight;

	// Accessible text, captured while the text is still whole
	const rootLabel = normalise(root.textContent);
	const controlLabel = control && !control.hasAttribute('aria-label') ? normalise(control.textContent) : null;
	let aria: 'auto' | 'hidden' | 'none' = 'none';
	if (options.unit && !control && isHeading) aria = groups.length ? 'hidden' : 'auto';

	let advances = chars ? measureAdvances(targets) : null;
	let restore: (() => void)[] = [];

	const undo = () => {
		restore.forEach((fn) => fn());
		restore = [];
	};

	return SplitText.create(targets, {
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
			const weighted = !!advances && advances.length === self.chars.length;
			if (weighted) {
				self.chars.forEach((char, i) => ((char as HTMLElement).style.width = `${advances![i]}em`));
				restore.push(setAttribute(root, 'data-kinetic-weight', ''));
				root.style.setProperty('--kw', weight);
				restore.push(() => root.style.removeProperty('--kw'));
			}
			return options.onSplit(self, weighted);
		},
		onRevert() {
			undo();
			options.onRevert?.();
			// Re-measure on the whole text before autoSplit splits it again (not on teardown)
			if (chars && options.alive?.() !== false && root.isConnected) advances = measureAdvances(targets);
		}
	});
}
