<script lang="ts">
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';
	import type { Mode, Group, CodeItem } from '$lib';
	import { groups } from '$lib';

	import { blur, fade } from 'svelte/transition';

	import Question from './Question.svelte';
	import Choices from './Choices.svelte';
	import Answer from './Answer.svelte';

	let { data } = $props();

	let initLoad = $state(false);
	let mode: Mode = $state('question');
	let selectedGroup: Group = $state(groups[0]);
	let selectedCode: CodeItem = $state({
		code: '',
		epsg: null,
		jpx: null
	});

	function select() {
		mode = 'question';
		selectedGroup = groups[Math.floor(Math.random() * groups.length)];
		const codes = data[selectedGroup];
		selectedCode = codes[Math.floor(Math.random() * codes.length)];
	}

	let isShaking = $state(false);
	function handleClick(e: MouseEvent, answer: Group) {
		mode = 'answer';
		if (selectedGroup === answer) {
			confetti({
				particleCount: 140,
				spread: 80,
				origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
			});
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

	onMount(() => {
		select();
		initLoad = true;
	});

	const headerInfo = {
		title: 'EPSG or JPX - sorami.dev',
		url: 'https://sorami.dev/epsg-or-jpx/',
		favicon: 'https://sorami.dev/_assets/favicon.svg',
		description: 'EPSGコードか、証券コードか。',
		thumbnail: 'https://sorami.dev/epsg-or-jpx/thumbnail.png'
	};
</script>

<svelte:head>
	<title>{headerInfo.title}</title>

	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width" />
	<link rel="canonical" href={headerInfo.url} />
	<link rel="icon" type="image/svg+xml" href={headerInfo.favicon} />

	<meta name="title" content={headerInfo.title} />
	<meta name="description" content={headerInfo.description} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={headerInfo.url} />
	<meta property="og:title" content={headerInfo.title} />
	<meta property="og:description" content={headerInfo.description} />
	<meta property="og:image" content={headerInfo.thumbnail} />

	<meta property="twitter:card" content="summary" />
	<meta property="twitter:url" content={headerInfo.url} />
	<meta property="twitter:title" content={headerInfo.title} />
	<meta property="twitter:description" content={headerInfo.description} />
	<meta property="twitter:image" content={headerInfo.thumbnail} />
</svelte:head>

<main class="grid place-items-center h-100vh">
	<div class="flex flex-col gap-16 items-center my-10 mx-3" class:shake={isShaking}>
		<h1 class="text-2xl sm:text-3xl font-black tracking-tight text-zinc-200">
			EPSGコード or 証券コード ?
		</h1>

		<Question {mode} {selectedCode} {select} />

		<Choices {mode} {selectedGroup} {initLoad} {handleClick} />

		<Answer {mode} {selectedGroup} {selectedCode} />
	</div>
</main>

<div class="absolute right-8 bottom-8">
	<a target="_blank" href="https://zenn.dev/mierune/articles/9d31472c71fe05">
		<div class="w-8 h-8 i-tabler-info-circle-filled bg-zinc-100/70 hover:bg-cyan-400"></div>
	</a>
</div>

<style>
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
