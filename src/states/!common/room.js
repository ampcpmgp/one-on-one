import { writable } from "svelte/store";
import { nanoid } from "nanoid";

export const formId = writable("");
export const tmpId = writable(nanoid());
export const currentId = writable("");
/** @type {import("svelte/store").Writable<import("@open-ayame/ayame-web-sdk/dist/connection").default>} */
export const conn = writable();
