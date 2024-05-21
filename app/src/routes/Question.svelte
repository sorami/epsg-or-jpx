<script lang="ts">
	import type { CodeItem } from '$lib';

	type MyProps = {
		mode: string;
		selectedCode: CodeItem;
		select: () => void;
	};
	let { mode, selectedCode, select }: MyProps = $props();

	export function typewriter(node: Node, { charDuration = 200 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;
		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text!.length * charDuration;

		return {
			duration,
			tick: (t: number) => {
				const i = Math.trunc(text!.length * t);
				node.textContent = text!.slice(0, i);
			}
		};
	}
</script>

<div class="flex items-center gap-7 h-[4rem]">
	{#key selectedCode}
		<span
			in:typewriter={{ charDuration: 220 }}
			class="ml-11 font-orbitron text-7xl font-black text-green-400 tracking-wider"
			>{selectedCode.code}</span
		>
	{/key}
	<button
		class:invisible={mode === 'question'}
		class="rounded-full flex p-1.5 mt-2 hover:bg-green-300"
		onclick={select}
	>
		<div class="i-tabler-reload w-5 h-5 text-zinc-800"></div>
	</button>
</div>
