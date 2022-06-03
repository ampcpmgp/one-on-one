// https://github.com/sveltejs/svelte/issues/3492
export function srcObject(node, stream) {
  node.srcObject = stream;
  return {
    update(newStream) {
      if (node.srcObject !== newStream) {
        node.srcObject = newStream;
      }
    },
    destroy() {
      /* stream revoking logic here */
    },
  };
}
