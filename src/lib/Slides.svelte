<script lang="ts">
  import Slide from "./Slide.svelte";

  export let text = "";

  const parseText = (text: string) => text.split("");

  $: list = parseText(text);

  let position = 0;

  const slidePrev = () => position--;
  const slideNext = () => position++;
</script>

<div class="wrapper">
  <main>
    <div class="messages">
      {#each list as item, index}
        {#if index === position}
          <Slide message={text + item} />
        {/if}
      {/each}
    </div>

    <div class="narrators">
      <img class="narrator" src="https://placehold.jp/200x300.png" alt="" />
      <img class="narrator" src="https://placehold.jp/200x300.png" alt="" />
    </div>

    <div class="tools">
      {#if position !== 0}
        <button on:click={slidePrev}>prev</button>
      {/if}

      {#if position !== list.length - 1}
        <button on:click={slideNext}>next</button>
      {/if}
    </div>
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

  .narrators {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
  }

  .narrator {
    width: 25%;
  }

  .tools {
    z-index: 1000;
  }
</style>
