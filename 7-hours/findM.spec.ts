import findM, { Tree } from './findM';

const big999 = new Array(999).fill(1).map(() => Math.random() * 1000 + 7000);
const small4000 = new Array(4000).fill(1).map(() => Math.random() * 5000);
const arr5000 = [...big999, 6666, ...small4000];

test.each`
  list               | m       | expected
  ${[1, 2, 3, 4, 5]} | ${3}    | ${3}
  ${[]}              | ${3}    | ${null}
  ${arr5000}         | ${1000} | ${6666}
`('Find the $m of $list', ({ list, m, expected }): void => {
  expect(findM(list, m)).toBe(expected);
});

describe('Tree function testing', (): void => {
  test('::insert', (): void => {
    const root = Tree.insert('2 Root');
    expect(root.value).toBe('2 Root');

    const level1 = Tree.insert('3-2 Right', Tree.insert('1-2 Left', root));
    expect(level1.value).toBe('2 Root');
    expect(level1.left.value).toBe('1-2 Left');
    expect(level1.right.value).toBe('3-2 Right');
  });

  test('::deleteMin', (): void => {
    //       100
    //     /     \
    //    30     120
    //      \   /   \
    //      40 110  130
    const tree = new Tree(
      100,
      new Tree(30, null, new Tree(40)),
      new Tree(120, new Tree(110), new Tree(130)),
    );

    const [after, removed] = Tree.deleteMin(tree);
    expect(removed).toBe(30);
    expect(after.value).toBe(100);
    expect(after.left.value).toBe(40);
  });
});
