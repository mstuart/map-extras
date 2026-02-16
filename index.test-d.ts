import {expectType, expectError} from 'tsd';
import {
	mapValues,
	filterEntries,
	mergeMap,
	invertMap,
	groupBy,
} from './index.js';

const numberMap = new Map([['a', 1], ['b', 2]]);

expectType<Map<string, number>>(mapValues(numberMap, value => value * 2));
expectType<Map<string, string>>(mapValues(numberMap, value => `v${value}`));
expectType<Map<string, number>>(filterEntries(numberMap, value => value > 1));
expectType<Map<string, number>>(mergeMap(numberMap, new Map([['c', 3]])));
expectType<Map<number, string>>(invertMap(numberMap));
const groupFunction = (x: number): string => x > 1 ? 'big' : 'small';
expectType<Map<string, number[]>>(groupBy([1, 2, 3], groupFunction));

expectError(mapValues('not a map', x => x));
expectError(filterEntries('not a map', x => x));
