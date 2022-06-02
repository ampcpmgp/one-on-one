<script>
  import { id, tmpId } from "../../../states/!common/room";
  import * as Ayame from "@open-ayame/ayame-web-sdk";
  import HowToUse from "./HowToUse.svelte";

  /** @type {HTMLVideoElement} */
  let localVideo;
  /** @type {HTMLVideoElement} */
  let remoteVideo;

  let currentRoomId = "";

  /** @type {import("@open-ayame/ayame-web-sdk/dist/connection").default} */
  let conn;

  /** @type {MediaStream} */
  let mediaStream;

  async function exitRoom() {
    mediaStream.getTracks().forEach((track) => track.stop());
    conn?.disconnect();
    currentRoomId = "";
  }

  async function enterRoom(id) {
    if (id === "") {
      alert("ルームIDを入力してください");
      return;
    }

    currentRoomId = id;

    conn = Ayame.connection("wss://ayame-labo.shiguredo.app/signaling", id);

    mediaStream = await navigator.mediaDevices.getUserMedia({
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

{#if currentRoomId === $tmpId}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video bind:this={localVideo} autoplay playsinline />
{:else if currentRoomId !== ""}
  <video bind:this={localVideo} muted autoplay playsinline />
  <!-- svelte-ignore a11y-media-has-caption -->
  <video bind:this={remoteVideo} autoplay playsinline />
{:else}
  <HowToUse />
{/if}

<button on:click={() => exitRoom()}>退室する</button>

<style>
  input[type="text"] {
    width: 400px;
  }
</style>
