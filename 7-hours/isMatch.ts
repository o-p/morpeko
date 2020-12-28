/** 透過 Recuration 方式比對，複雜的 * 案例會超過 Max Call Stack */
export function recuration(text: string, pattern: string): boolean {
  const [char] = text;
  const [tester] = pattern;

  switch (tester) {
    // *: 0 ~ ∞ chars
    case '*':
      return (
        // 分解為: isMatch 0 chars || isMatch 1 ~ ∞ chars
        recuration(text, pattern.slice(1)) || recuration(text.slice(1), pattern)
      );
    // 已經沒有後續 pattern, 但如果還有 char, 則必定 false
    case undefined:
      return char === undefined;
    // 單字節判斷
    default:
      return (
        (tester === '.' || tester === char) &&
        recuration(text.slice(1), pattern.slice(1))
      );
  }
}

/**
 * 透過 Iteration 方式比對，要注意 text 與 pattern 兩邊各自要獨立的 anchor
 * 另外每個 * 只要遇到新的 * 就可以刷新兩個 anchor，因為新的 * 必定可以涵蓋前者的範圍
 */
export function iteration(text: string, pattern: string): boolean {
  let anchorT = text.length;
  let anchorP = pattern.length;
  let indexT = 0;
  let indexP = 0;
  let tester = '';

  while (indexP < pattern.length || anchorT < text.length) {
    const char = text[indexT];
    tester = pattern[indexP];

    // 如果判斷子為 * 重設 anchor
    if (tester === '*') {
      anchorT = indexT;
      anchorP = ++indexP;
      continue;
    }

    // 剛好 text & pattern 都測試到終點，通過測試
    if (tester === undefined && char === undefined) {
      return true;
    }

    // 單字節符合規則，繼續前進
    if (tester === '.' || tester === char) {
      indexP += 1;
      indexT += 1;
      continue;
    }

    // 不合規則，判斷 index 是否可以往回至 anchor
    if (anchorT < text.length) {
      indexT = ++anchorT;
      indexP = anchorP;
      continue;
    }

    return false;
  }
  return tester === '*' || indexT === text.length;
}

/**
 * 透過 Pattern 判斷兩個字串是否相等，支援兩種 wildcard:
 *   - ".": 單一任意字元
 *   - "*": 任意長度的任意字元
 */
export default iteration;
