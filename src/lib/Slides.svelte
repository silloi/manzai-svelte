<script lang="ts">
  import { MESSAGE_TYPE, Message, parseText } from "./parser";

  import Slide from "./Slide.svelte";
  import Keydown from "./Keydown.svelte";

  export let text = "";
  export let isFocused = false;

  $: parsedText = parseText(text);

  $: header = parsedText.header;
  $: contents = parsedText.contents;

  let position = 0;

  $: content = contents[position];

  let left = "";
  let right = "";

  const setAvatar = (content: Message) => {
    if (!content.avatar) {
      return;
    }

    if (content.type === MESSAGE_TYPE.OBJECTIVE) {
      left = content.avatar;
    } else if (content.type === MESSAGE_TYPE.SUBJECTIVE) {
      right = content.avatar;
    }
  };
  $: setAvatar(content);

  let background = "";

  const setBackground = (content: Message) => {
    if (content.media) {
      background = contents[position].media;
      position++;
    }
  };
  $: setBackground(content);

  const resetBackground = () => {
    background = "";
  };

  const slideToTop = () => {
    resetBackground();

    position = 0;
  };

  const slideNext = () => {
    resetBackground();

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
      {#if left}
        <img class="narrator left" src={left} alt="" />
      {:else}
        <div />
      {/if}
      {#if right}
        <img class="narrator right" src={right} alt="" />
      {:else}
        <div />
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
