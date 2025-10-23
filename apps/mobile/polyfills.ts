// 1) Random values must be first
import 'react-native-get-random-values';

// 2) WebCrypto (for `jose`)
import { Crypto } from 'react-native-webcrypto';
if (!global.crypto) {
  // @ts-expect-error RN global
  global.crypto = new Crypto();
}

// 3) URL, fetch-related quirks
import 'react-native-url-polyfill/auto';

// 4) Buffer & process (light Node shims)
import { Buffer } from 'buffer';
if (!global.Buffer) {
  // @ts-expect-error RN global
  global.Buffer = Buffer;
}

const proc = require('process/browser');
if (!global.process) {
  // @ts-expect-error RN global
  global.process = proc;
}
// Hints some libs expect
// @ts-expect-error RN global
global.process.browser = true;
// @ts-expect-error RN global
global.process.version = 'v18.0.0';

// 5) Optional tiny stream/event/util shims for browserified deps
// (Only set if the library actually touches them at runtime)
try { require('events'); } catch {}
try { require('util'); } catch {}
try { require('readable-stream'); } catch {}
