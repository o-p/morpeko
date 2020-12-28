type Valuify<Origin, Scalarized> = (value: Origin) => Scalarized;
type RemovedValue<T> = T | null;
type TreeAfterRemove<T> = Tree<T> | null;

export class Tree<T> {
  static insert<V>(
    value: V,
    tree: Tree<V> | null = null,
    valueOf: Valuify<V, any> = (v: V) => v,
  ): Tree<V> | null {
    if (tree instanceof Tree) {
      return valueOf(value) >= valueOf(tree.value as V)
        ? new Tree(tree.value, tree.left, Tree.insert(value, tree.right, valueOf))
        : new Tree(tree.value, Tree.insert(value, tree.left, valueOf), tree.right);
    }
    return new Tree(value);
  }

  static deleteMin<V>(tree?: Tree<V>): [TreeAfterRemove<V>, RemovedValue<V>] {
    if (!(tree instanceof Tree)) {
      return [null, null];
    }

    if (tree.left instanceof Tree) {
      const [removed, value] = Tree.deleteMin(tree.left);
      return [new Tree(tree.value, removed, tree.right), value];
    }

    return [tree.right, tree.value as V];
  }

  constructor(
    public value?: T,
    public left: Tree<T> | null = null,
    public right: Tree<T> | null = null,
  ) {}
}

const findM = (list: any[], m = 100, valueOf = (v: any) => v) => {
  let counts = 0;

  const tree = list.reduce((full, value) => {
    counts += 1;
    const result = Tree.insert(value, full, valueOf) as Tree<any>;

    if (counts > m) {
      return Tree.deleteMin(result)[0];
    }
    return result;
  }, null);

  if (m > 0 && counts >= m) {
    return Tree.deleteMin(tree)[1];
  }
  return null;
};

export default findM;
