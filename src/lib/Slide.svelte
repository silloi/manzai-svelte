<script lang="ts">
  export let message = "";
</script>

<article>
  <p>{message}</p>
</article>

<style>
  article {
    width: 100%;
  }

  p {
    font-size: 4vw;
    border: solid 0.5vw;
    border-radius: 1vw;
    padding: 2vw 4vw;
  }

  @media (min-width: 768px) {
    p {
      font-size: 2vw;
      border: solid 0.25vw;
      border-radius: 0.5vw;
      padding: 1vw 2vw;
    }
  }
</style>
