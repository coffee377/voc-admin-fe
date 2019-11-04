// const sum = (a, b) => a + b;
//
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });
import { isApiStructured, hasApiProperty } from '@/utils';

const data1: any = { A: 'a', B: 'b' };
const data2: any = { A: 'a', B: 'b', data: {} };

test(`${JSON.stringify(data1)}`, () => {
  expect(isApiStructured(data1)).toBe(false);
});

test(`${JSON.stringify(data2)}`, () => {
  expect(isApiStructured(data2)).toBe(true);
});
