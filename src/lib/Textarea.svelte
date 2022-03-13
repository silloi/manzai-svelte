<script lang="ts">
	export let text = '';
	export let onFocus = () => {};
	export let onBlur = () => {};
</script>

<textarea bind:value={text} on:focus={onFocus} on:blur={onBlur} />

<style>
	textarea {
		width: 100%;
	}

	@media (min-width: 768px) {
		textarea {
			height: 100vh;
			box-sizing: border-box;
		}
	}
</style>
