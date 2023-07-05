<script lang="ts">
	// import { PlayIcon } from 'svelte-feather-icons';
	import { NodeViewWrapper, NodeViewContent } from 'svelte-tiptap';
	import type { NodeViewProps } from '@tiptap/core';

	export let node: NodeViewProps['node'];
	export let updateAttributes: NodeViewProps['updateAttributes'];
	// export let selected: NodeViewProps['selected'] = false;
	export let extension: NodeViewProps['extension'];

	let selectedLanguage: string = node.attrs.language;

	$: selectedLanguage, selectedLanguage && updateAttributes({ language: selectedLanguage });

	const supportLanguages: string[] = ['javascript'];

	let output = '';

	// function keyDown(ev: KeyboardEvent) {
	// 	console.log(ev.key);
	// 	if (ev.key === 'Tab') {
	// 		ev.preventDefault();
	// 		ev.stopPropagation();
	// 	}
	// }

	async function runCode() {
		// const a = await fetch('https://emkc.org/api/v2/piston/runtimes');
		// const b = await a.json();
		// console.log(b);

		const url = 'https://emkc.org/api/v2/piston/execute';

		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				language: 'javascript',
				version: '18.15.0',
				files: [
					{
						name: 'main.js',
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

		output = data.run.output;
	}
</script>

<NodeViewWrapper class="code-block relative leading-relaxed">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="absolute right-2 top-2 flex flex-row items-center gap-4">
		{#if supportLanguages.includes(selectedLanguage)}
			<button
				on:click={runCode}
				class="grid h-8 w-8 items-center rounded-full text-green-500 hover:bg-white/10"
				aria-label="run code"
			>
				<!-- can't use svelte component here -->
				<!-- could turn into a loading spinner while running or something -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="ml-1.5"
				>
					<polygon points="5 3 19 12 5 21 5 3" />
				</svg>
			</button>
		{/if}

		<select class="text-base text-black" bind:value={selectedLanguage} contentEditable={false}>
			<option value="null">auto</option>
			<option disabled> — </option>

			{#each extension.options.lowlight.listLanguages() as lang}
				<option value={lang}>
					{lang}
				</option>
			{/each}
		</select>
	</div>

	<pre class="leading-[0] md:leading-[0]">
    <NodeViewContent as="code" class="leading-relaxed language-{selectedLanguage}" />

    {#if output}
			<div class="my-4 border-t pt-4 leading-[0] text-white">
        <h4 class="text-md mt-0 text-white lg:mt-0">Output:</h4>
        <p class="text-sm">{output}</p>
      </div>
		{/if}
  </pre>
</NodeViewWrapper>

<style>
</style>
