import { writable } from "svelte/store";
import { nanoid } from "nanoid";

export const formId = writable("");
export const tmpId = writable(nanoid());
export const currentId = writable("");
