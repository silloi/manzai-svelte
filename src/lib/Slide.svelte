<script lang="ts">
  export let message = "";
</script>

<article>
  <p>{message}</p>
</article>

<style>
  article {
    width: 100%;
    overflow-wrap: anywhere;
    /* border: solid 0.25vw;
    border-radius: 0.25vw; */
    /* background-color: white; */
  }

  p {
    font-size: 4vw;
    padding: 2vw 25vw;
    text-shadow: 0.5vw 0.5vw 0 white, -0.5vw -0.5vw 0 white,
      -0.5vw 0.5vw 0 white, 0.5vw -0.5vw 0 white, 0px 0.5vw 0 white,
      0-0.5vw 0 white, -0.5vw 0 0 white, 0.5vw 0 0 white;
  }

  @media (min-width: 768px) {
    p {
      font-size: 2vw;
      padding: 1vw 12.5vw;
      text-shadow: 0.25vw 0.25vw 0 white, -0.25vw -0.25vw 0 white,
        -0.25vw 0.25vw 0 white, 0.25vw -0.25vw 0 white, 0px 0.25vw 0 white,
        0-0.25vw 0 white, -0.25vw 0 0 white, 0.25vw 0 0 white;
    }
  }
</style>
