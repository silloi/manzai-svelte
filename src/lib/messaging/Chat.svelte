<script lang="ts">
	import { parse } from '$lib';
	import Messages from './Messages.svelte';

	export let text = '';

	$: parsedText = parse(text);

	$: header = parsedText.header;
	$: contents = parsedText.contents;

	$: title = header.title?.toString() ?? '';
</script>

<header>
	{title}
</header>

<Messages {contents} />
