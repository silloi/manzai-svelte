<script lang="ts">
  import { Message, parseText } from "./parser";

  import Slide from "./Slide.svelte";
  import Keydown from "./Keydown.svelte";
  import Actors from "./Actors.svelte";
  import Tools from "./Tools.svelte";

  export let text = "";
  export let isFocused = false;

  $: parsedText = parseText(text);

  $: header = parsedText.header;
  $: contents = parsedText.contents;

  let position = 0;

  $: content = contents[position];

  let background = "";

  const setBackground = (content: Message) => {
    background = "";

    if (content.media) {
      background = contents[position].media;
      position++;
    }
  };
  $: setBackground(content);

  const slideToTop = () => {
    position = 0;
  };

  const slideNext = () => {
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
          <Slide message={item.message} />
        {/if}
      {/each}
    </div>

    <Actors {content} />

    <Tools {slideToTop} {slideNext} />

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

  .background {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
  }
</style>
