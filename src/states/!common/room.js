import { writable } from "svelte/store";
import { nanoid } from "nanoid";

export const id = writable("");
export const tmpId = writable(nanoid());
