export function areArraysEqual<T>(a1: Array<T>, a2: Array<T>): boolean {
  if (a1.length !== a2.length) {
    return false;
  }
  const superSet: Record<string, any> = {};
  for (const i of a1) {
    const e = i + typeof i;
    superSet[e] = 1;
  }

  for (const i of a2) {
    const e = i + typeof i;
    if (!superSet[e]) {
      return false;
    }
    superSet[e] = 2;
  }

  for (let e in superSet) {
    if (superSet[e] === 1) {
      return false;
    }
  }

  return true;
}
