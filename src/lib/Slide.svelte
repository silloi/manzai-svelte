<script lang="ts">
  import { MESSAGE_TYPE } from "./parser";

  export let type: MESSAGE_TYPE = MESSAGE_TYPE.DESCRIPTIVE;
  export let name = "";
  export let message = "";
</script>

<article>
  <span>{name}</span>
  <p>{message}</p>
</article>

<style>
  article {
    width: 100%;
    overflow-wrap: anywhere;
  }

  p {
    font-size: 4vw;
    padding: 2vw 25vw;
    text-shadow: 0.5vw 0.5vw 0.5vw white, -0.5vw -0.5vw 0.5vw white,
      -0.5vw 0.5vw 0.5vw white, 0.5vw -0.5vw 0.5vw white, 0.5vw 0 0.5vw white,
      -0.5vw 0 0.5vw white, 0 0.5vw 0.5vw white, 0 -0.5vw 0.5vw white;
  }

  @media (min-width: 768px) {
    p {
      font-size: 2vw;
      padding: 1vw 12.5vw;
      text-shadow: 0.25vw 0.25vw 0.25vw white, -0.25vw -0.25vw 0.25vw white,
        -0.25vw 0.25vw 0.25vw white, 0.25vw -0.25vw 0.25vw white,
        0.25vw 0 0.25vw white, -0.25vw 0 0.25vw white, 0 0.25vw 0.25vw white,
        0 -0.25vw 0.25vw white;
    }
  }
</style>
