import { isApiStructured } from '@/utils';
import { mixin } from '@/utils/merge';

const data1: any = { A: 'a', B: 'b' };
const data2: any = { A: 'a', B: 'b', message: {} };
const data3: any = { message: {} };

test(`${JSON.stringify(data1)}`, () => {
  expect(isApiStructured(data1)).toBe(false);
});

test(`${JSON.stringify(data2)}`, () => {
  expect(isApiStructured(data2)).toBe(true);
});

test(`${JSON.stringify(data2)}`, () => {
  expect(isApiStructured(data3)).toBe(true);
});

test('merge', () => {
  const s1 = { a: [1], b: [2] };
  const s2 = { a: [3], b: [4] };
  const s3 = { a: [5], b: [6] };
  const s4 = { a: [7], b: [8] };
  const s5 = { a: [9], b: [10], c: { name: 'test' } };
  const r = mixin(s1, s2, s3, s4, s5);
  console.log(r);
});
