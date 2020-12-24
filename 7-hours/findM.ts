

export class Tree {
  static insert(
    value: any,
    tree: Tree | null = null,
    valueOf = v => v,
  ): Tree {
    if (tree instanceof Tree) {
      if (valueOf(value) >= valueOf(tree.value)) {
        tree.right = Tree.insert(value, tree.right);
      } else {
        tree.left = Tree.insert(value, tree.right);
      }

      return tree;
    }

    return new Tree(value);
  }

  static deleteMin(tree: Tree, parent: Tree | null = null): Tree {
    if (tree.left instanceof Tree) {
      return Tree.deleteMin(tree.left, tree);
    }

    const { right } = tree;
    tree.right = null;

    if (parent instanceof Tree) {
      parent.left = right;
    }

    return tree;
  }

  constructor(public value: any, public left = null, public right = null) {}
}

const findM = (
  list: any[],
  m = 100,
  valueOf = v => v,
) => {
  let counts = 0;

  const tree = list.reduce((full, value) => {
    counts += 1;
    const result = Tree.insert(value, full, valueOf);

    if (counts > m) {
      Tree.deleteMin(result);
    }
    return result;
  }, null);

  if (m > 0 && counts >= m) {
    return Tree.deleteMin(tree).value;
  }
  return null;
};

export default findM;
