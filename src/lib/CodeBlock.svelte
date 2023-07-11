<script lang="ts">
	import { NodeViewWrapper, NodeViewContent } from 'svelte-tiptap';
	import type { NodeViewProps } from '@tiptap/core';
	import { engineRuntimes } from '$lib/stores';

	export let node: NodeViewProps['node'];
	export let updateAttributes: NodeViewProps['updateAttributes'];
	// export let selected: NodeViewProps['selected'] = false;
	export let extension: NodeViewProps['extension'];

	let selectedLanguage: string = node.attrs.language;
	let output = '';

	$: selectedLanguage, selectedLanguage && updateAttributes({ language: selectedLanguage });
	$: executable =
		$engineRuntimes.find((engine) => engine.aliases.includes(selectedLanguage)) ||
		$engineRuntimes.find((engine) => engine.language === selectedLanguage);

	// function keyDown(ev: KeyboardEvent) {
	// 	console.log(ev.key);
	// 	if (ev.key === 'Tab') {
	// 		ev.preventDefault();
	// 		ev.stopPropagation();
	// 	}
	// }

	async function runCode() {
		if (!executable) {
			return;
		}

		const res = await fetch('https://emkc.org/api/v2/piston/execute', {
			method: 'POST',
			body: JSON.stringify({
				language: executable.language,
				version: executable.version,
				files: [
					{
						content: node.textContent
					}
				],
				args: ['']
			})
		});

		if (!res.ok) {
			console.log(res);
			return;
		}

		const data = await res.json();

		if (data?.compile?.stderr) {
			output = data.compile.output;
			return;
		}

		output = data.run.output;
	}
</script>

<NodeViewWrapper class="code-block relative leading-relaxed">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="absolute right-2 top-2 flex flex-row items-center gap-4" contentEditable="false">
		<!-- TODO: base this on api value -->
		{#if executable}
			<button
				on:click={runCode}
				class="grid h-8 w-8 items-center rounded-full text-green-500 hover:bg-white/10"
				aria-label="run code"
			>
				<!-- can't use svelte component here -->
				<!-- could turn into a loading spinner while running or something -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="ml-1.5 h-5 w-5"
				>
					<polygon points="5 3 19 12 5 21 5 3" />
				</svg>
			</button>
		{/if}

		<select class="text-base text-black" bind:value={selectedLanguage}>
			<option value="null">auto</option>
			<option disabled> — </option>

			{#each extension.options.lowlight.listLanguages() as lang}
				<option value={lang}>
					{lang}
				</option>
			{/each}
		</select>
	</div>

	<!-- elements need to be like this to prevent cursor grabbing jank -->
	<pre><NodeViewContent as="code" class="leading-relaxed language-{selectedLanguage}" /><div
			contentEditable="false"
			class:border-t={output}
			class:pb-4={output}
			class="output max-h-48 overflow-y-auto px-4 text-white dark:text-white">
				{#if output}
				<h4
					class="text-md sticky top-0 my-0 bg-inherit py-2 text-white backdrop-blur lg:my-0">Output:</h4>
        <pre
					class="mb-0 text-sm leading-relaxed">{output}</pre>
			{/if}
      </div></pre></NodeViewWrapper
>

<style lang="postcss">
	:global(.code-block) {
		> pre {
			@apply px-0 pb-0;

			:global(code > div) {
				@apply px-4 pb-4;
			}
		}

		.output pre {
			@apply px-0;
		}
	}
</style>
