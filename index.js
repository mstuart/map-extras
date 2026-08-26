export function mapValues(map, function_) {
  const result = new Map();
  for (const [key, value] of map) {
    result.set(key, function_(value, key));
  }

  return result;
}

export function filterEntries(map, shouldKeep) {
  const result = new Map();
  for (const [key, value] of map) {
    if (shouldKeep(value, key)) {
      result.set(key, value);
    }
  }

  return result;
}

export function mergeMap(...maps) {
  const result = new Map();
  for (const map of maps) {
    for (const [key, value] of map) {
      result.set(key, value);
    }
  }

  return result;
}

export function invertMap(map) {
  const result = new Map();
  for (const [key, value] of map) {
    result.set(value, key);
  }

  return result;
}

export function groupBy(iterable, function_) {
  const result = new Map();
  for (const item of iterable) {
    const key = function_(item);
    // Single lookup instead of has() + get() (+ set()): fetch the group once
    // and create it on the miss. Groups are always arrays, so `undefined`
    // unambiguously means "not yet present".
    let group = result.get(key);
    if (group === undefined) {
      group = [];
      result.set(key, group);
    }

    group.push(item);
  }

  return result;
}
