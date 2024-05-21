<script lang="ts">
	import { fade, blur } from 'svelte/transition';
	import type { Mode, CodeItem } from '$lib';

	type MyProps = {
		mode: Mode;
		selectedGroup: string;
		selectedCode: CodeItem;
	};
	let { mode, selectedGroup, selectedCode }: MyProps = $props();
</script>

<div class="h-[12em]">
	{#if mode === 'answer'}
		<div class="flex flex-col gap-5" in:blur={{ duration: 700 }} out:fade={{ duration: 250 }}>
			{#if selectedGroup !== 'jpx'}
				<div class="flex items-center gap-2 flex-wrap">
					<div class="i-tabler-world answer-icon"></div>
					<div class="flex items-baseline gap-2">
						<div class="answer-text">{selectedCode?.epsg}</div>
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
				<div class="flex items-center gap-2 flex-wrap">
					<div class="i-tabler-coin-yen answer-icon"></div>
					<div class="flex items-baseline gap-2">
						<div class="answer-text">{selectedCode?.jpx}</div>
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
	{/if}
</div>

<style>
	.answer-icon {
		@apply w-5 h-5 text-green-400;
	}
	.answer-text {
		@apply text-xs sm:text-lg font-bold text-green-400;
	}
</style>
