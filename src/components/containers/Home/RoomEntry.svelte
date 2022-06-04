<script>
  import { nanoid } from "nanoid";
  import { push } from "svelte-spa-router";

  let formId = "";

  function handleRoomIdGenerateButtonClick() {
    formId = nanoid();

    var type = "text/plain";
    var blob = new Blob([formId], { type });
    var data = [new window.ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(
      function () {
        // alert("ルームIDをコピーしました!");
      },
      function () {
        /* failure */
      }
    );
  }

  function enterRoom() {
    if (formId === "") {
      alert("ルームIDを入力してください!");
      return;
    }

    push(`/room/${formId}`);
  }
</script>

<h2>ルーム</h2>

<input
  type="text"
  bind:value={formId}
  placeholder="ルームIDを入力してください"
/>
<button on:click={enterRoom}>入室する</button>
<button on:click={handleRoomIdGenerateButtonClick}>ルームID生成</button>

<style>
  input[type="text"] {
    width: 280px;
  }
</style>
