<script lang="ts">
	import { parseText } from '$lib/parse';
	import Messages from './Messages.svelte';

	export let text = '';

	$: parsedText = parseText(text);

	$: header = parsedText.header;
	$: contents = parsedText.contents;

	$: title = header.title?.toString() ?? '';
</script>

<header>
	{title}
</header>

<Messages {contents} />
