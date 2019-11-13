import { isApiStructured } from '@/utils';

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
