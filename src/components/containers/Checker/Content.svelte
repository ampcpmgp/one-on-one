<script>
  import { nanoid } from "nanoid";
  import {
    connect,
    disconect,
    mediaStream,
  } from "./../../../states/!common/room.js";
  import { srcObject } from "../../../actions/video";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";

  onMount(() => {
    connect(nanoid());
  });

  function exit() {
    disconect();
    push("/");
  }
</script>

<ul>
  <li>カメラ映像が正しく表示されていますか？</li>
  <li>マイク音声がスピーカーから流れますか？</li>
  <li>問題が無ければ確認は完了です。</li>
</ul>

<!-- svelte-ignore a11y-media-has-caption -->
<video use:srcObject={$mediaStream} autoplay playsinline />

<div>
  <button on:click={exit}>退室する</button>
</div>
