<script>
  import { currentId, tmpId } from "./../../../states/!common/room.js";
</script>

<h2>カメラ・マイクチェック</h2>

<button on:click={() => ($currentId = $tmpId)}>カメラ・マイクチェック</button>

<p>
  ※マイク音声がハウリングする場合があります。その場合は一度退室し、スピーカー音を少し落とした上で再度確認してください。
</p>
