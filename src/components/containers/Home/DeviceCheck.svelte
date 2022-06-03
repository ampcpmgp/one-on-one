<script>
  import { push } from "svelte-spa-router";
</script>

<h2>カメラ・マイクチェック</h2>

<button on:click={() => push("/checker")}>カメラ・マイクチェック</button>

<p>
  ※マイクがスピーカー音を拾うと、ハウリングする場合があります。その場合は一度退室し、スピーカー音を少し落とした上で再度確認してください。
</p>
