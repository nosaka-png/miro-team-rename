// 置き換えロジックのテスト：node test.js
const assert = require('assert');
const { buildReplacer } = require('./rename.js');
const r = buildReplacer([{from:'A',to:'D'},{from:'B',to:'E'},{from:'C',to:'F'}]);
const t = (i, o, c) => { const x = r(i); assert.strictEqual(x.text, o, i); if (c !== undefined) assert.strictEqual(x.count, c, i); };
t('<p>Aチーム</p>', '<p>Dチーム</p>', 1);
t('<p>A-1</p><p>B-12</p>', '<p>D-1</p><p>E-12</p>', 2);
t('AチームとBチーム', 'DチームとEチーム', 2);
t('<p>DATA-1</p>', '<p>DATA-1</p>', 0);        // 英単語の一部は置換しない
t('A-B', 'A-B', 0);                            // 数字でないものは対象外
t('Aチームa', 'Aチームa', 0);
const swap = buildReplacer([{from:'A',to:'B'},{from:'B',to:'A'}]);
assert.strictEqual(swap('Aチーム/Bチーム').text, 'Bチーム/Aチーム');   // 連鎖しない
const jp = buildReplacer([{from:'A',to:'ラッコ'}]);
assert.strictEqual(jp('Aチーム・A-3').text, 'ラッコチーム・ラッコ-3');
assert.strictEqual(buildReplacer([{from:'A',to:''}]), null);
console.log('ALL OK');
