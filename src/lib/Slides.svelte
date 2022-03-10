<script lang="ts">
  import { MESSAGE_TYPE, parseText } from "./parser";

  import Slide from "./Slide.svelte";
  import Keydown from "./Keydown.svelte";

  export let text = "";
  export let isFocused = false;

  $: parsedText = parseText(text);

  $: header = parsedText.header;
  $: contents = parsedText.contents;

  let position = 0;
  let background = "";

  const slideToTop = () => (position = 0);
  const slideNext = () => {
    if (contents[position + 1].type === MESSAGE_TYPE.MEDIA) {
      background = contents[position + 1].media;
      position++;
    }

    position++;
  };
</script>

{#if !isFocused}
  <Keydown {position} {contents} {slideNext} />
{/if}

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
      {#if header.images.length > 0 && header.images[0]}
        <img class="narrator" src={header.images[0]} alt="" />
      {/if}
      {#if header.images.length > 1 && header.images[1]}
        <img class="narrator" src={header.images[1]} alt="" />
      {/if}
    </div>

    <div class="tools">
      <button on:click={slideToTop}>top</button>

      {#if position !== contents.length - 1}
        <button on:click={slideNext}>next</button>
      {/if}
    </div>

    <div class="background" style="background-image: url({background})" />
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

  .background {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
  }
</style>
