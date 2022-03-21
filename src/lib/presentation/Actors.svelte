<script lang="ts">
	import { MESSAGE_TYPE } from '$lib/enums/common';
	import type { Content } from '$lib/types/common';

	export let content: Content;

	let left = '';
	let right = '';

	const setAvatar = (content: Content) => {
		if (!content.avatar) {
			return;
		}

		if (content.type === MESSAGE_TYPE.OBJECTIVE) {
			left = content.avatar;
		} else if (content.type === MESSAGE_TYPE.SUBJECTIVE) {
			right = content.avatar;
		}
	};
	$: setAvatar(content);
</script>

<div class="narrators">
	{#if left}
		<img class="narrator left" src={left} alt="" />
	{:else}
		<div />
	{/if}
	{#if right}
		<img class="narrator right" src={right} alt="" />
	{:else}
		<div />
	{/if}
</div>

<style>
	.narrators {
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: end;
		width: 100%;
		z-index: 1;
	}

	.narrator {
		height: 100%;
		width: 25%;
	}
</style>
