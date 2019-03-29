// in windows
// btoa(encodeURI('hello, 你好')); aGVsbG8sJTIwJUU0JUJEJUEwJUU1JUE1JUJE
// decodeURI(atob('aGVsbG8sJTIwJUU0JUJEJUEwJUU1JUE1JUJE')); hello, 你好

// utf-8
const directionChart = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const base64 = {
  encode(str) {
    let output = '';
    let char1, char2, char3, enc1, enc2, enc3, enc4;
    let i = 0;
    str = this._utf8_encode(str);

    while (i < str.length) {
      char1 = str.charCodeAt(i++);
      char2 = str.charCodeAt(i++);
      char3 = str.charCodeAt(i++);

      enc1 = char1 >> 2;
      enc2 = ((char1 & 3) << 4) | (char2 >> 4);
      enc3 = ((char2 & 15) << 2) | (char3 >> 6);
      enc4 = char3 & 63;

      if (Number.isNaN(char2)) {
        enc3 = enc4 = 64;
      }

      if (Number.isNaN(char3)) {
        enc4 = 64;
      }

      output += `${directionChart.charAt(enc1)}${directionChart.charAt(enc2)}${directionChart.charAt(enc3)}${directionChart.charAt(enc4)}`;
    }
    return output;
  },

  decode(str) {
    let output = '';
    let char1, char2, char3, char4, enc1, enc2, enc3;
    let i = 0;

    str = str.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    while (i < str.length) {
      char1 = directionChart.indexOf(str.charAt(i++));
      char2 = directionChart.indexOf(str.charAt(i++));
      char3 = directionChart.indexOf(str.charAt(i++));
      char4 = directionChart.indexOf(str.charAt(i++));

      enc1 = (char1 << 2) | (char2 >> 4);
      enc2 = ((char2 & 15) << 4) | (char3 >> 2);
      enc3 = ((char3 & 3) << 6) | char4;

      output += String.fromCharCode(enc1);
      if (char3 !== 64) {
        output += String.fromCharCode(enc2);
      }

      if (char4 !== 64) {
        output += String.fromCharCode(enc3);
      }
    }

    output = this._utf8_decode(output);
    return output;
  },

  _utf8_encode(str) {
    if (typeof str === 'string') {
      str = str.replace(/\r\n/g, '\n');
    }

    if (typeof str === 'number') {
      str = str.toString();
    }

    let utf8ByteText = '';
    for (let i = 0, len = str.length; i < len; i++) {
      let codePoint = str.charCodeAt(i);
      if (codePoint <= 0x7f) {
        utf8ByteText += String.fromCharCode(codePoint);
      } else if (codePoint >= 0x80 && codePoint <= 0x7ff) {
        utf8ByteText += String.fromCharCode((codePoint >> 6) | 192);
        utf8ByteText += String.fromCharCode((codePoint & 63) | 128);
      } else {
        utf8ByteText += String.fromCharCode((codePoint >> 12) | 224);
        utf8ByteText += String.fromCharCode(((codePoint >> 6) & 63) | 128);
        utf8ByteText += String.fromCharCode((codePoint & 63) | 128);
      }
    }
    return utf8ByteText;
  },

  _utf8_decode(utf8Text) {
    let c1 = 0,
      c2 = 0,
      c3 = 0;
    let i = 0;
    let string = '';

    while (i < utf8Text.length) {
      const c1 = utf8Text.charCodeAt(i);

      if (c1 <= 0x7f) {
        string += String.fromCharCode(c1);
        i++;
      } else if (c1 >= 0xc0 && c1 <= 0xdf) {
        c2 = utf8Text.charCodeAt(i + 1);
        string += String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utf8Text.charCodeAt(i + 1);
        c3 = utf8Text.charCodeAt(i + 2);
        string += String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
};

// Uint8Array
