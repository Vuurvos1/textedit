<script>
	import Tags from './Tags.svelte';
	import { GitHub, FileText, Hash, Trash, Inbox, Chevron, User as UserIcon } from '$lib/icons';
	import PopoutMenu from '$lib/ui/PopoutMenu.svelte';

	import {
		showNavigation,
		showNotes,
		showEditor,
		user,
		notes,
		note,
		updateNote,
		noteFilter,
		filteredNotes
	} from '$lib/stores';
	import { supabaseClient } from '$lib/db';

	let loading = false;
	async function handleLogin() {
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signInWithOAuth({
				provider: 'github'
			});
			// console.log(error, user, session);
			if (error) throw error;
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	}

	async function logout() {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.error(error);
		}

		// clear all values
		$user = {};
		$notes = [];
		$note = $notes[0];
	}

	function closeSidebar() {
		$showNotes = true;
		$showNavigation = false;
		$showEditor = false;
	}
</script>

<!-- navigation, change to an asside? -->
<div class="h-full py-4">
	<h3 class="font-bold font-lg px-4 mb-2">Views</h3>

	<ul class="flex flex-col">
		<li>
			<button
				class="w-full px-4 py-1 hover:bg-slate-400"
				on:click={() => {
					$noteFilter.status = 'public';
					$noteFilter.text = '';
					$noteFilter.tag = '';
					$note = $filteredNotes[0]; // these 2 lines should always be run when a filter is changed?
					$updateNote = Math.random();

					closeSidebar();
				}}
			>
				<FileText />
				<span>Notes</span>
			</button>
		</li>
		<li>
			<button
				class="w-full px-4 py-1 hover:bg-slate-400"
				on:click={() => {
					// filter notes that don't have a tag
					$noteFilter.status = 'untagged';
					$noteFilter.text = '';
					$noteFilter.tag = '';

					$note = $filteredNotes[0]; // these 2 lines should always be run when a filter is changed?
					$updateNote = Math.random();

					closeSidebar();
				}}
			>
				<Hash />
				<span>Untaged</span>
			</button>
		</li>
		<li>
			<button
				class="w-full px-4 py-1 hover:bg-slate-400"
				on:click={() => {
					$noteFilter.status = 'archived';
					$noteFilter.tag = '';
					$noteFilter.text = '';
					$note = $filteredNotes[0];
					$updateNote = Math.random();

					closeSidebar();
				}}
			>
				<Inbox />
				<span>Archived</span>
			</button>
		</li>
		<li>
			<button
				class="w-full px-4 py-1 hover:bg-slate-400"
				on:click={() => {
					$noteFilter.status = 'deleted';
					$noteFilter.tag = '';
					$noteFilter.text = '';
					$note = $filteredNotes[0];
					$updateNote = Math.random();

					closeSidebar();
				}}
			>
				<Trash />
				<span>Deleted</span>
			</button>
		</li>
	</ul>

	<Tags />

	<div class="flex flex-row justify-between px-4 md:hidden">
		<button
			class="flex flex-row gap-2"
			on:click={() => {
				closeSidebar();
			}}
		>
			<!-- TODO: turn this into a rotatable component, allong with chevron down -->
			<Chevron rotation={270} />
			<span>back</span>
		</button>

		<div class="flex flex-row ">
			<!-- profile -->
			<PopoutMenu placement="top-start" extraOpts={{ modifiers: [] }}>
				<UserIcon slot="icon" />
				{#if $user && $user?.email}
					<h3>Account</h3>
					<p>You are signed in as:</p>
					<p>{$user.email}</p>
					<p>Using: {$user?.app_metadata?.provider}</p>

					<button class="hover:text-purple-600" on:click={logout}>Logout</button>
				{:else}
					<button class="flex flex-row items-center gap-2 px-2 py-1" on:click={handleLogin}>
						<GitHub />

						<span class="w-max">Login with Github</span>
					</button>
				{/if}
			</PopoutMenu>
			<!-- settings -->
			<!-- theme -->
		</div>
	</div>
</div>

<style lang="scss">
	ul {
		margin-bottom: 1.25rem;
	}

	li {
		margin-bottom: 0.25rem;

		button {
			display: flex;
			flex-direction: row;
		}

		span {
			margin-left: 0.5rem;
		}
	}
</style>
