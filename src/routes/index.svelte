<script lang="ts">
	import ResetCss from 'svelte-manzai/ResetCss.svelte';
	import Slides from 'svelte-manzai/Slides.svelte';
	import Textarea from 'svelte-manzai/Textarea.svelte';

	let isFocused = false;
	const onFocus = () => (isFocused = true);
	const onBlur = () => (isFocused = false);

	let text = `---
  actors:
    - name: Plato
      type: 1
      avatar: https://4.bp.blogspot.com/-wKE2eJO3r4c/WKbKuWJAEvI/AAAAAAABB2Y/u1lfOE_OyG0G_XHxUl89h7v577UeCSQdgCLcB/s400/nigaoe_platon.png
    - name: Socrates
      type: 2
      avatar: https://3.bp.blogspot.com/-lEHqMVOWaoM/WD_cVZQHSAI/AAAAAAABADg/fyZKYa-B-0QS7V0KvuyZcu429SmcU5fygCLcB/s400/nigaoe_socrates.png
---

Socrates: あのイーハトーヴォのすきとほった風

Plato: 夏でも底に冷たさをもつ青いそら

[https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clouds_over_the_Atlantic_Ocean.jpg/2560px-Clouds_over_the_Atlantic_Ocean.jpg]

Socrates: うつくしい森で飾られたモーリオ市

[https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clouds_over_the_Atlantic_Ocean.jpg/2560px-Clouds_over_the_Atlantic_Ocean.jpg]

Plato: 郊外のぎらぎらひかる草の波

Socrates: 了
`;
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
