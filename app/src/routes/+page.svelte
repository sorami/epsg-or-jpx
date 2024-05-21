<script lang="ts">
	import { onMount } from 'svelte';
	import { groups, type GROUP, type CodeItem } from '$lib';

	let { data } = $props();

	let selectedGroup = $state(groups[0]);
	let selectedCode: CodeItem = $state({
		code: '',
		epsg: null,
		jpx: null
	});

	function select() {
		selectedGroup = groups[Math.floor(Math.random() * groups.length)];

		const codes = data[selectedGroup];
		selectedCode = codes[Math.floor(Math.random() * codes.length)];
	}

	let mode: 'question' | 'answer' = $state('question');
	let isShaking = $state(false);
	function handleClick(answer: GROUP) {
		mode = 'answer';
		if (selectedGroup === answer) {
		} else {
			shake();
		}
	}

	function shake() {
		isShaking = true;
		setTimeout(() => {
			isShaking = false;
		}, 500);
	}

	function retry() {
		mode = 'question';
		select();
	}

	onMount(() => {
		select();
	});
</script>

<svelte:head>
	<title>EPSG or JPX - sorami.dev</title>
</svelte:head>

<div class="absolute right-8 bottom-8">
	<a target="_blank" href="https://zenn.dev/mierune/articles/9d31472c71fe05">
		<div class="w-8 h-8 i-tabler-info-circle-filled bg-zinc-100/50 hover:bg-cyan-400"></div>
	</a>
</div>

<main class="grid place-items-center h-100vh">
	<div class="flex flex-col gap-16 items-center my-10 mx-3" class:shake={isShaking}>
		<h1 class="text-2xl sm:text-3xl font-black tracking-tight text-zinc-200">
			EPSGコード or 証券コード ?
		</h1>

		<div class="flex items-center gap-5 h-[4rem]">
			<span class="ml-10 font-orbitron text-7xl font-black text-green-400 tracking-wider"
				>{selectedCode?.code}</span
			>
			<button
				class:invisible={mode === 'question'}
				class="rounded-full flex p-1.5 mt-2 hover:bg-green-500"
				onclick={retry}
			>
				<div class="i-tabler-reload w-5 h-5 text-zinc-800"></div>
			</button>
		</div>

		<div
			id="choices"
			class:answered={mode === 'answer'}
			class="flex gap-6 text-slate-700 font-bold text-lg"
		>
			<button class:correct={selectedGroup === 'epsg'} onclick={() => handleClick('epsg')}
				>EPSG</button
			>
			<button class:correct={selectedGroup === 'both'} onclick={() => handleClick('both')}
				>EPSG&JPX</button
			>
			<button class:correct={selectedGroup === 'jpx'} onclick={() => handleClick('jpx')}>JPX</button
			>
		</div>

		<div class:invisible={mode !== 'answer'} class="h-[8em] flex flex-col gap-6">
			{#if selectedGroup !== 'jpx'}
				<div class="flex items-baseline gap-2.5 flex-wrap">
					<div class="answer-text">{selectedCode?.epsg}</div>
					<div>
						<a
							target="_blank"
							href={`https://epsg.io/${selectedCode?.code}`}
							class="text-xs flex items-center gap-1"
						>
							<div>epsg.io</div>
							<div class="i-tabler-external-link w-3 h-3"></div></a
						>
					</div>
				</div>
			{/if}
			{#if selectedGroup !== 'epsg'}
				<div class="flex items-baseline gap-2.5 flex-wrap">
					<div class="answer-text">{selectedCode?.jpx}</div>
					<div>
						<a
							target="_blank"
							href={`https://minkabu.jp/stock/${selectedCode?.code}`}
							class="text-xs flex items-center gap-1"
						>
							<div>みんかぶ</div>
							<div class="i-tabler-external-link w-3 h-3"></div>
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
	#choices button {
		@apply px-3.5 py-1.5 rounded-full
		@apply hover:bg-green-300;
	}

	#choices.answered button {
		@apply cursor-none;
		@apply opacity-20;
		@apply cursor-none pointer-events-none;
	}
	#choices.answered button.correct {
		@apply opacity-100;
		@apply bg-green-400 text-zinc-900;
	}

	.answer-text {
		@apply text-lg font-bold text-green-400;
	}

	@keyframes shake {
		0% {
			transform: translate(1px, 1px) rotate(0deg);
		}
		10% {
			transform: translate(-1px, -2px) rotate(-1deg);
		}
		20% {
			transform: translate(-3px, 0px) rotate(1deg);
		}
		30% {
			transform: translate(3px, 2px) rotate(0deg);
		}
		40% {
			transform: translate(1px, -1px) rotate(1deg);
		}
		50% {
			transform: translate(-1px, 2px) rotate(-1deg);
		}
		60% {
			transform: translate(-3px, 1px) rotate(0deg);
		}
		70% {
			transform: translate(3px, 1px) rotate(-1deg);
		}
		80% {
			transform: translate(-1px, -1px) rotate(1deg);
		}
		90% {
			transform: translate(1px, 2px) rotate(0deg);
		}
		100% {
			transform: translate(1px, -2px) rotate(-1deg);
		}
	}

	.shake {
		animation: shake 0.5s;
	}
</style>
