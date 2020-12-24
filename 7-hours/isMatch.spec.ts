import isMatch, { recuration, iteration } from './isMatch';

describe('基本案例', (): void => {
  test.each`
    text        | pattern     | expected
    ${''}       | ${''}       | ${true}
    ${'a'}      | ${''}       | ${false}
    ${''}       | ${'a'}      | ${false}
    ${'abc'}    | ${'abc'}    | ${true}
    ${'abcabc'} | ${'a.c..c'} | ${true}
    ${'aabbcc'} | ${'a*'}     | ${true}
  `('$"text" <-> "$pattern"', ({ text, pattern, expected }): void => {
    expect(recuration(text, pattern)).toBe(expected);
    expect(iteration(text, pattern)).toBe(expected);
  });
});

describe('高複雜度案例', (): void => {
  test.each`
    text            | pattern                  | expected
    ${'abcbcbcbcd'} | ${'a**bc*bc*'}           | ${true}
    ${'abcbcbcbcd'} | ${'********..*****..*k'} | ${false}
  `('"$text" <-> "$pattern"', ({ text, pattern, expected }): void => {
    expect(isMatch(text, pattern)).toBe(expected);
  });
});
