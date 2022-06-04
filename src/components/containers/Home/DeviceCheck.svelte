<script>
  import { push } from "svelte-spa-router";
</script>

<h2>カメラ・マイクチェック</h2>

<button on:click={() => push("/checker")}>カメラ・マイクチェック</button>
