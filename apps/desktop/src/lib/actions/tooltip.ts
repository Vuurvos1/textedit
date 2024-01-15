import { computePosition, offset } from '@floating-ui/dom';
import type { Placement } from '@floating-ui/dom';

export type TooltipOptions = {
	text?: string;
	placement?: Placement;
	delay?: number;
};

export function tooltip(targetEl: HTMLElement, options: TooltipOptions) {
	const tooltipEl = createTooltip(targetEl);

	function createTooltip(targetEl: HTMLElement) {
		const tooltipEl = Object.assign(document.createElement('div'), {
			role: 'tooltip',
			innerHTML: options?.text ?? 'Tooltip',
			style: `
					display: none;
          width: max-content;
          position: absolute;
          font-weight: 600;
          background: var(--background-secondary-alt);
          color: var(--text-base);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: .75rem;
					z-index: 100;
          `
		});

		targetEl.after(tooltipEl);
		return tooltipEl;
	}

	async function updateTooltipPosition(targetEl: HTMLElement, tooltipEl: HTMLElement) {
		const { x, y } = await computePosition(targetEl, tooltipEl, {
			placement: options?.placement ?? 'right',
			middleware: [offset(8)]
		});

		Object.assign(tooltipEl.style, {
			left: `${x}px`,
			top: `${y}px`
		});
	}

	let timeout: ReturnType<typeof setTimeout>;

	function showTooltip() {
		timeout = setTimeout(
			() => {
				tooltipEl.style.display = 'block';
				updateTooltipPosition(targetEl, tooltipEl);
			},
			options?.delay ?? 500
		);
	}

	function hideTooltip() {
		clearTimeout(timeout);
		tooltipEl.style.display = 'none';
	}

	// add event listeners
	targetEl.addEventListener('mouseenter', showTooltip);
	targetEl.addEventListener('mouseleave', hideTooltip);

	return {
		destroy() {
			// remove event listeners when element is removed
			targetEl.removeEventListener('mouseenter', showTooltip);
			targetEl.removeEventListener('mouseLeave', hideTooltip);
		}
	};
}
