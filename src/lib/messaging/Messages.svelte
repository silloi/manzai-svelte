<script lang="ts">
	import Message from './Message.svelte';

	export let contents = [];
</script>

{#each contents as item}
	<Message {...item} />
{/each}
