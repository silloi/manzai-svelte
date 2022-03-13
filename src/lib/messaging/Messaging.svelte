<script lang="ts">
	import Chat from '$lib/messaging/Chat.svelte';
	import Textarea from '$lib/Textarea.svelte';

	export let text = '';
</script>

<div class="flex">
	<div class="flex-item">
		<Chat {text} />
	</div>

	<div class="flex-item">
		<Textarea bind:text />
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
