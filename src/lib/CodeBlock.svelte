<script lang="ts">
	import { NodeViewWrapper, NodeViewContent } from 'svelte-tiptap';
	import type { NodeViewProps } from '@tiptap/core';

	export let node: NodeViewProps['node'];
	export let updateAttributes: NodeViewProps['updateAttributes'];
	// export let selected: NodeViewProps['selected'] = false;
	export let extension: NodeViewProps['extension'];

	let selectedLanguage: string = node.attrs.language;

	$: selectedLanguage, selectedLanguage && updateAttributes({ language: selectedLanguage });
	// $: selectedLanguage, console.log(selectedLanguage, node.attrs.language);
</script>

<NodeViewWrapper class="code-block">
	<select bind:value={selectedLanguage} contentEditable={false}>
		<option value="null">auto</option>
		<option disabled> — </option>

		{#each extension.options.lowlight.listLanguages() as lang}
			<option value={lang}>
				{lang}
			</option>
		{/each}
	</select>

	<pre>
    <NodeViewContent as="code" class="language-{selectedLanguage}" />
  </pre>
</NodeViewWrapper>

<style>
	:global(.code-block) {
		position: relative;
	}

	:global(.code-block select) {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
	}
</style>
