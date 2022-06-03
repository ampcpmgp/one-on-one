import { test, expect } from "vitest";
import { formId } from "./room";

test("should formId is empty string", () => {
  formId.subscribe((value) => {
    expect(value).toEqual("");
  });
});
