<script lang="ts">
	import { parse } from '$lib';

	import Slide from './Slide.svelte';
	import Keydown from './Keydown.svelte';
	import Narrators from './Narrators.svelte';
	import Tools from './Tools.svelte';
	import Background from './Background.svelte';

	export let text = '';
	export let isFocused = false;

	$: parsedText = parse(text);

	$: header = parsedText.header;
	$: contents = parsedText.contents;

	let position = 0;

	$: content = contents[position];

	const slideToTop = () => {
		position = 0;
	};

	const slideNext = () => {
		if (position < contents.length - 1) {
			position++;
		}
	};
</script>

{#if !isFocused}
	<Keydown {position} {contents} {slideNext} />
{/if}

<div class="wrapper">
	<main>
		<div class="messages">
			{#each contents as item, index}
				{#if index === position}
					<Slide message={item.message} />
				{/if}
			{/each}
		</div>

		<Narrators {content} />

		<Tools {slideToTop} {slideNext} />

		<Background bind:position {content} />
	</main>
</div>

<style>
	@media (min-width: 768px) {
		.wrapper {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: black;
		}
	}

	main {
		position: relative;
		aspect-ratio: 16 / 9;
		background: white;
	}

	.messages {
		position: absolute;
		width: 100%;
		bottom: 0;
		z-index: 10;
	}
</style>
