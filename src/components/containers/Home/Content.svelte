<script>
  import { id, tmpId } from "../../../states/!common/room";

  import * as Ayame from "@open-ayame/ayame-web-sdk";

  /** @type {HTMLVideoElement} */
  let localVideo;
  /** @type {HTMLVideoElement} */
  let remoteVideo;

  async function enterRoom(id) {
    if (id === "") {
      alert("ルームIDを入力してください");
      return;
    }

    const conn = Ayame.connection(
      "wss://ayame-labo.shiguredo.app/signaling",
      id
    );

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    await conn.connect(mediaStream);
    conn.on("disconnect", console.log);
    conn.on("addstream", (/** @type {any} */ e) => {
      remoteVideo.srcObject = e.stream;
    });
    localVideo.srcObject = mediaStream;
  }
</script>

<input type="text" bind:value={$id} placeholder="ルームIDを入力してください" />
<button on:click={() => enterRoom($id)}>入室する</button>
<button>ルーム作成</button>
<button on:click={() => enterRoom($tmpId)}>カメラ・マイクチェック</button>

<video bind:this={localVideo} muted autoplay playsinline />
<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={remoteVideo} autoplay playsinline />

<style>
  input[type="text"] {
    width: 400px;
  }
</style>
