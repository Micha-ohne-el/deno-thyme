import {Thyme} from '/mod.ts';

import {assert, assertEquals, assertStringIncludes} from 'std/testing/asserts.ts';

Deno.test('constructor consistency', () => {
  const margin = 1; // leave room for possible time differences.

  const date = new Date();
  const thyme1 = new Thyme();
  const thyme2 = new Thyme(date);
  const thyme3 = new Thyme(Date.now());

  assert(Math.abs(+thyme1 - +thyme2) <= margin);
  assert(Math.abs(+thyme2 - +thyme3) <= margin);
  assert(Math.abs(+thyme1 - +thyme3) <= margin);
});

Deno.test('formatSimple', () => {
  const moonLanding = new Thyme(Date.UTC(1969, 6, 20, 0, 20, 18));
  assertEquals(
    moonLanding.formatSimple('YYYY-MM-DD @ hh:mm:ss.iii'),
    '1969-07-20 @ 00:20:18.000'
  );
  assertEquals(
    moonLanding.formatSimple('Y;M;D;h;m;s;i;E;C'),
    '69;7;20;0;20;18;0;CE;AD'
  );
  assertEquals(moonLanding.formatSimple(''), '');
  assertEquals(moonLanding.formatSimple('CCCC'), 'AD  ');
  for (const key of [...'YMDhmsiCE']) {
    // Repeating a key X times, must result in a string with length >= X.
    // We only need to check for equality here because 100 is very large.
    assertEquals(moonLanding.formatSimple(key.repeat(100)).length, 100);
  }
});

Deno.test('custom inspect', () => {
  const test = 123456789;
  const thyme = new Thyme(test);
  assertStringIncludes(Deno.inspect(thyme), test.toString());
});
