<script lang="ts">
	import Messages from './Messages.svelte';

	export let title = '';
	export let contents = [];
</script>

<header>
	{title}
</header>

<Messages {contents} />
