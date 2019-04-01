const directionChart = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function fromByteArray(uint8) {
  if (!(Array.isArray(uint8) || (uint8 instanceof Uint8Array))) {
    console.error('uint8 must instanceof Array or Uint8Array');
    return false;
  }

  const len = uint8.length;
  const extra = len % 0x03;
  const divisibleLen = len - extra;
  let i = 0;
  let parts = '';
console.log(divisibleLen)
  while (i < divisibleLen) {
    const tmp = ((uint8[i++] << 16) & 0xff0000) + ((uint8[i++] << 8) & 0xff00) + uint8[i++];
    parts += directionChart.charAt((tmp >> 18) & 0x3f) + 
      directionChart.charAt((tmp >> 12) & 0x3f) + 
      directionChart.charAt((tmp >> 6) & 0x3f) +
      directionChart.charAt(tmp & 0x3f);
  }

  if (extra === 1) {
    const tmp = uint8[len -1];
    parts += directionChart.charAt(tmp >> 2) + directionChart.charAt(tmp << 4 & 0x3f) + '==';
  } else if (extra === 2) {
    const tmp = (uint8[len - 2] << 8) + uint8[len -1];
    parts += 
      directionChart.charAt(tmp >> 10) + 
      directionChart.charAt(tmp >> 4 & 0x3f) + 
      directionChart.charAt(tmp << 2 & 0x3f) + 
      '=';
  }

  return parts
}
