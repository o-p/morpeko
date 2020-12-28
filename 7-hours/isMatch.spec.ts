import isMatch, { recuration, iteration } from './isMatch';

describe('基本案例', (): void => {
  test.each`
    text            | pattern          | expected
    ${''}           | ${''}            | ${true}
    ${'a'}          | ${''}            | ${false}
    ${''}           | ${'a'}           | ${false}
    ${'abcabbaabc'} | ${'abcabbaabc'}  | ${true}
    ${'abcabbaabc'} | ${'ab......bc'}  | ${true}
    ${'abcabbaabc'} | ${'ab.......bc'} | ${false}
    ${'abcabbaabc'} | ${'ab.*.bc'}     | ${true}
    ${'abcabbaabc'} | ${'ab*ab*ab*'}   | ${true}
    ${'abcabbaabc'} | ${'a*'}          | ${true}
    ${'abcabbaabc'} | ${'a*c'}         | ${true}
    ${'abcabbaabc'} | ${'*c'}          | ${true}
    ${'abcabbaabc'} | ${'*'}           | ${true}
  `('$"$text" <-> "$pattern"', ({ text, pattern, expected }): void => {
    expect(recuration(text, pattern)).toBe(expected);
    expect(iteration(text, pattern)).toBe(expected);
  });
});

describe('高複雜度案例', (): void => {
  test.each`
    text            | pattern                  | expected
    ${'abcbcbcbcd'} | ${'a**bc*bc*'}           | ${true}
    ${'abcbcbcbcd'} | ${'********..*****..*k'} | ${false}
    ${'abcabbaabc'} | ${'ab*ab*ab*ab*'}        | ${false}
  `('"$text" <-> "$pattern"', ({ text, pattern, expected }): void => {
    expect(isMatch(text, pattern)).toBe(expected);
  });
});
