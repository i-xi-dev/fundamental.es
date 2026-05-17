import { ByteOrder } from "../byte_order.mts";

export const _BYTE_ORDER = (() => {
  return ((new Uint8Array(Uint16Array.of(0xFEFF).buffer))[0] === 0xFE)
    ? ByteOrder.BIG_ENDIAN
    : ByteOrder.LITTLE_ENDIAN;
})();

export function _resolveByteOrder(byteOrder?: ByteOrder): ByteOrder {
  if (Object.values(ByteOrder).includes(byteOrder as ByteOrder) === true) {
    return byteOrder as ByteOrder;
  }
  return _BYTE_ORDER;
}
