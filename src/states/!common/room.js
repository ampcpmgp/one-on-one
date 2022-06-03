import { derived, get, writable } from "svelte/store";
import { nanoid } from "nanoid";
import * as Ayame from "@open-ayame/ayame-web-sdk";
import { AYAME_WS_URL } from "../../constants/ayame";

export const formId = writable("");
export const tmpId = writable(nanoid());
export const currentId = writable("");
export const ayameRoomId = derived(currentId, (id) => `one-on-one-jp-${id}`);

/** @type {import("svelte/store").Writable<import("@open-ayame/ayame-web-sdk/dist/connection").default>} */
export const conn = writable();

/** @type {import("svelte/store").Writable<MediaStream>} */
export const mediaStream = writable();
/** @type {import("svelte/store").Writable<MediaStream>} */
export const remoteStream = writable();

currentId.subscribe(async (id) => {
  // disconect
  if (id === "") {
    stopTracks();
    get(conn)?.disconnect();
    currentId.set("");
    return;
  }

  // new connection
  const _conn = Ayame.connection(AYAME_WS_URL, get(ayameRoomId));
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
});

function stopTracks() {
  get(mediaStream)
    ?.getTracks()
    .forEach((track) => track.stop());
}
