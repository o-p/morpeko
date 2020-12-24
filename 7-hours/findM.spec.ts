import findM, { Tree } from './findM';

test.each`
  list               | m    | expected
  ${[1, 2, 3, 4, 5]} | ${3} | ${3}
  ${[]}              | ${3} | ${null}
`('Find the $m of $list', ({ list, m, expected }): void => {
  expect(findM(list, m)).toBe(expected);
});

test('數的測試', (): void => {
  const tree = new Tree(3, 4, 5);
  expect(tree.value).toBe(3);
  expect(tree.left).toBe(4);
  expect(tree.right).toBe(5);
});
