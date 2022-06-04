import { get, writable } from "svelte/store";
import * as Ayame from "@open-ayame/ayame-web-sdk";
import { AYAME_WS_URL } from "../../constants/ayame";

/** @type {import("svelte/store").Writable<import("@open-ayame/ayame-web-sdk/dist/connection").default>} */
export const conn = writable();

/** @type {import("svelte/store").Writable<MediaStream>} */
export const mediaStream = writable();
/** @type {import("svelte/store").Writable<MediaStream>} */
export const remoteStream = writable();

export async function disconect() {
  stopTracks();
  await get(conn)?.disconnect();
}

export async function connect(id) {
  const ayameRoomId = `one-on-one-jp-${id}`;
  const _conn = Ayame.connection(AYAME_WS_URL, ayameRoomId);
  const _mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  await _conn.connect(_mediaStream);
  _conn.on("disconnect", console.log);
  _conn.on("addstream", (/** @type {any} */ e) => {
    remoteStream.set(e.stream);
  });

  conn.set(_conn);
  mediaStream.set(_mediaStream);
}

function stopTracks() {
  get(mediaStream)
    ?.getTracks()
    .forEach((track) => track.stop());
}
