<script lang="ts">
  import Slide from "./Slide.svelte";

  export let text = "";

  const parseText = (text: string) => text.split("");

  $: list = parseText(text);

  let position = 0;

  const slidePrev = () => position--;
  const slideNext = () => position++;
</script>

<main>
  {#each list as item, index}
    {#if index === position}
      <Slide message={text + item} />
    {/if}
  {/each}

  {#if position !== 0}
    <button on:click={slidePrev}>prev</button>
  {/if}

  {#if position !== list.length - 1}
    <button on:click={slideNext}>next</button>
  {/if}
</main>

<style>
  main {
    width: 100%;
  }
</style>
