<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quintIn } from 'svelte/easing';
	import type { Group } from '$lib';

	type MyProps = {
		initLoad: boolean;
		mode: string;
		selectedGroup: Group;
		handleClick: (e: MouseEvent, answer: Group) => void;
	};
	let { initLoad, mode, selectedGroup, handleClick }: MyProps = $props();
</script>

<div id="choices" class:answered={mode === 'answer'} class="h-[3rem]">
	{#if initLoad}
		<div
			in:fade={{ duration: 2000, easing: quintIn }}
			class="flex gap-6 text-slate-700 font-bold text-lg"
		>
			<button
				class:correct={selectedGroup === 'epsg'}
				onclick={(e) => handleClick(e, 'epsg')}
				class="flex items-center gap-1.5"
			>
				<div class="i-tabler-world"></div>
				EPSG</button
			>
			<button class:correct={selectedGroup === 'both'} onclick={(e) => handleClick(e, 'both')}
				>EPSG&thinsp;&&thinsp;JPX</button
			>
			<button
				class:correct={selectedGroup === 'jpx'}
				onclick={(e) => handleClick(e, 'jpx')}
				class="flex items-center gap-1.5"
			>
				JPX
				<div class="i-tabler-coin-yen w-5.5 h-5.5"></div>
			</button>
		</div>
	{/if}
</div>

<style>
	#choices button {
		@apply text-xs md:text-lg;
		@apply px-3.5 py-1.5 rounded-full;
		transition:
			background-color 0.3s,
			opacity 1.8s;
	}
	#choices button:hover {
		@apply bg-cyan-400;
		transition: background-color 0.3s;
	}

	#choices.answered button {
		@apply cursor-none;
		@apply opacity-20;
		@apply cursor-none pointer-events-none;
		transition: opacity 0.4s;
	}
	#choices.answered button.correct {
		@apply opacity-100;
		@apply bg-green-400 text-zinc-900;
		transition: background-color 0.4s;
	}
</style>
