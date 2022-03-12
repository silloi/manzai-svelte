<script lang="ts">
  import { MESSAGE_TYPE } from "./enums/common";
  import type { Message } from "./types/common";

  export let content: Message;

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
</script>

<div class="actors">
  {#if left}
    <img class="actor left" src={left} alt="" />
  {:else}
    <div />
  {/if}
  {#if right}
    <img class="actor right" src={right} alt="" />
  {:else}
    <div />
  {/if}
</div>

<style>
  .actors {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: end;
    width: 100%;
    z-index: 1;
  }

  .actor {
    height: 100%;
    width: 25%;
  }
</style>
