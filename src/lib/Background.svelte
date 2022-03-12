<script lang="ts">
  import type { Message } from "./types/common";

  export let position = 0;
  export let content: Message;

  let background = "";
  let skipFlag = false;

  const setBackground = (content: Message) => {
    if (!skipFlag) {
      background = "";
    }
    skipFlag = false;

    if (content.media) {
      background = content.media;
      position++;
      skipFlag = true;
    }
  };
  $: setBackground(content);
</script>

<div class="background" style="background-image: url({background})" />

<style>
  .background {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
  }
</style>
