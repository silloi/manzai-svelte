<script lang="ts">
  import type { Message } from "./parser";

  export let position = 0;
  export let content: Message;

  let background = "";

  const setBackground = (content: Message) => {
    background = "";

    if (content.media) {
      background = content.media;
      position++;
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
