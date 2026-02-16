import test from 'ava';
import {
	mapValues,
	filterEntries,
	mergeMap,
	invertMap,
	groupBy,
} from './index.js';

// --- mapValues ---

test('mapValues transforms values', t => {
	const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
	const result = mapValues(map, value => value * 2);
	t.deepEqual([...result], [['a', 2], ['b', 4], ['c', 6]]);
});

test('mapValues receives key as second argument', t => {
	const map = new Map([['x', 1], ['y', 2]]);
	const result = mapValues(map, (value, key) => `${key}:${value}`);
	t.deepEqual([...result], [['x', 'x:1'], ['y', 'y:2']]);
});

test('mapValues returns a new Map', t => {
	const original = new Map([['a', 1]]);
	const result = mapValues(original, x => x);
	t.true(result instanceof Map);
	t.not(result, original);
});

test('mapValues with empty Map', t => {
	const result = mapValues(new Map(), x => x);
	t.is(result.size, 0);
	t.true(result instanceof Map);
});

// --- filterEntries ---

test('filterEntries filters by value', t => {
	const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
	const result = filterEntries(map, value => value > 1);
	t.deepEqual([...result], [['b', 2], ['c', 3]]);
});

test('filterEntries filters by key', t => {
	const map = new Map([['apple', 1], ['banana', 2], ['cherry', 3]]);
	const result = filterEntries(map, (_value, key) => key.startsWith('b'));
	t.deepEqual([...result], [['banana', 2]]);
});

test('filterEntries with no matches', t => {
	const map = new Map([['a', 1], ['b', 2]]);
	const result = filterEntries(map, value => value > 10);
	t.is(result.size, 0);
});

test('filterEntries with all matches', t => {
	const map = new Map([['a', 1], ['b', 2]]);
	const result = filterEntries(map, value => value > 0);
	t.is(result.size, 2);
});

test('filterEntries returns a new Map', t => {
	const original = new Map([['a', 1]]);
	const result = filterEntries(original, () => true);
	t.true(result instanceof Map);
	t.not(result, original);
});

test('filterEntries with empty Map', t => {
	const result = filterEntries(new Map(), () => true);
	t.is(result.size, 0);
});

// --- mergeMap ---

test('mergeMap combines two maps', t => {
	const a = new Map([['x', 1]]);
	const b = new Map([['y', 2]]);
	const result = mergeMap(a, b);
	t.deepEqual([...result], [['x', 1], ['y', 2]]);
});

test('mergeMap later overrides earlier', t => {
	const a = new Map([['x', 1]]);
	const b = new Map([['x', 2]]);
	const result = mergeMap(a, b);
	t.is(result.get('x'), 2);
});

test('mergeMap with three maps', t => {
	const a = new Map([['a', 1]]);
	const b = new Map([['b', 2]]);
	const c = new Map([['c', 3]]);
	const result = mergeMap(a, b, c);
	t.is(result.size, 3);
	t.is(result.get('a'), 1);
	t.is(result.get('b'), 2);
	t.is(result.get('c'), 3);
});

test('mergeMap returns a new Map', t => {
	const a = new Map([['x', 1]]);
	const result = mergeMap(a);
	t.true(result instanceof Map);
	t.not(result, a);
});

test('mergeMap with empty maps', t => {
	const result = mergeMap(new Map(), new Map());
	t.is(result.size, 0);
});

test('mergeMap does not mutate inputs', t => {
	const a = new Map([['x', 1]]);
	const b = new Map([['y', 2]]);
	mergeMap(a, b);
	t.is(a.size, 1);
	t.is(b.size, 1);
});

// --- invertMap ---

test('invertMap swaps keys and values', t => {
	const map = new Map([['a', 1], ['b', 2]]);
	const result = invertMap(map);
	t.deepEqual([...result], [[1, 'a'], [2, 'b']]);
});

test('invertMap returns a new Map', t => {
	const original = new Map([['a', 1]]);
	const result = invertMap(original);
	t.true(result instanceof Map);
	t.not(result, original);
});

test('invertMap with empty Map', t => {
	const result = invertMap(new Map());
	t.is(result.size, 0);
});

test('invertMap with string values', t => {
	const map = new Map([[1, 'a'], [2, 'b']]);
	const result = invertMap(map);
	t.is(result.get('a'), 1);
	t.is(result.get('b'), 2);
});

test('invertMap double invert returns equivalent map', t => {
	const original = new Map([['a', 1], ['b', 2]]);
	const result = invertMap(invertMap(original));
	t.deepEqual([...result], [...original]);
});

// --- groupBy ---

test('groupBy groups items', t => {
	const result = groupBy([1, 2, 3, 4, 5, 6], x => (x % 2 === 0 ? 'even' : 'odd'));
	t.deepEqual(result.get('even'), [2, 4, 6]);
	t.deepEqual(result.get('odd'), [1, 3, 5]);
});

test('groupBy returns a Map', t => {
	const result = groupBy([1, 2, 3], x => x);
	t.true(result instanceof Map);
});

test('groupBy with string keys', t => {
	const result = groupBy(['cat', 'car', 'dog'], word => word[0]);
	t.deepEqual(result.get('c'), ['cat', 'car']);
	t.deepEqual(result.get('d'), ['dog']);
});

test('groupBy with empty iterable', t => {
	const result = groupBy([], x => x);
	t.is(result.size, 0);
});

test('groupBy single group', t => {
	const result = groupBy([1, 2, 3], () => 'all');
	t.deepEqual(result.get('all'), [1, 2, 3]);
	t.is(result.size, 1);
});

test('groupBy preserves order within groups', t => {
	const result = groupBy([3, 1, 4, 1, 5, 9], x => (x > 3 ? 'big' : 'small'));
	t.deepEqual(result.get('small'), [3, 1, 1]);
	t.deepEqual(result.get('big'), [4, 5, 9]);
});

// --- return types ---

test('all functions return Map instances', t => {
	t.true(mapValues(new Map(), x => x) instanceof Map);
	t.true(filterEntries(new Map(), () => true) instanceof Map);
	t.true(mergeMap(new Map()) instanceof Map);
	t.true(invertMap(new Map()) instanceof Map);
	t.true(groupBy([], x => x) instanceof Map);
});
