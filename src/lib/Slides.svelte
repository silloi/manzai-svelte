<script lang="ts">
  import { parseText } from "./parser";

  import Slide from "./Slide.svelte";

  export let text = "";

  $: parsedText = parseText(text);

  $: header = parsedText.header;
  $: contents = parsedText.contents;

  let position = 0;

  const slidePrev = () => position--;
  const slideNext = () => position++;
</script>

<div class="wrapper">
  <main>
    <div class="messages">
      {#each contents as item, index}
        {#if index === position}
          <Slide {...item} />
        {/if}
      {/each}
    </div>

    <div class="narrators">
      <img
        class="narrator"
        src="https://science4fun.info/wp-content/uploads/2021/05/Socrates.jpg"
        alt=""
      />
      <img
        class="narrator"
        src="https://w7.pngwing.com/pngs/233/96/png-transparent-man-face-statue-plato-ancient-greece-phaedo-republic-allegory-of-the-cave-grece-stone-carving-head-ancient-history-thumbnail.png"
        alt=""
      />
    </div>

    <div class="tools">
      {#if position !== 0}
        <button on:click={slidePrev}>prev</button>
      {/if}

      {#if position !== contents.length - 1}
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
    align-items: end;
    width: 100%;
    z-index: 1;
  }

  .narrator {
    height: 100%;
    width: 25%;
  }

  .tools {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }
</style>
