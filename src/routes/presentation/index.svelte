<script lang="ts">
	import ResetCss from 'svelte-manzai/ResetCss.svelte';
	import Slides from 'svelte-manzai/Slides.svelte';
	import Textarea from 'svelte-manzai/Textarea.svelte';

	import { protagoras } from '$lib/samples/texts';

	let isFocused = false;
	const onFocus = () => (isFocused = true);
	const onBlur = () => (isFocused = false);

	let text = protagoras;
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
