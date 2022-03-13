<script lang="ts">
	import ResetCss from '$lib/ResetCss.svelte';
	import Slides from '$lib/Slides.svelte';
	import Textarea from '$lib/Textarea.svelte';

	export let text = '';

	let isFocused = false;
	const onFocus = () => (isFocused = true);
	const onBlur = () => (isFocused = false);
</script>

<ResetCss />

<div class="flex">
	<div class="flex-item">
		<Slides bind:text {isFocused} />
	</div>

	<div class="flex-item">
		<Textarea bind:text {onFocus} {onBlur} />
	</div>
</div>

<style>
	.flex {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	@media (min-width: 768px) {
		.flex {
			flex-direction: row-reverse;
			justify-content: flex-end;
		}

		.flex-item {
			flex: 1;
		}
	}
</style>
