/**
Create a new Map with values transformed by a function.

@param map - The input Map.
@param function_ - The transform function receiving `(value, key)`.
@returns A new Map with transformed values.

@example
```
import {mapValues} from 'map-extras';

const map = new Map([['a', 1], ['b', 2]]);
mapValues(map, value => value * 2);
//=> Map { 'a' => 2, 'b' => 4 }
```
*/
export function mapValues<K, V, U>(map: Map<K, V>, function_: (value: V, key: K) => U): Map<K, U>;

/**
Create a new Map with entries filtered by a predicate.

@param map - The input Map.
@param function_ - The predicate function receiving `(value, key)`.
@returns A new Map with entries that pass the predicate.

@example
```
import {filterEntries} from 'map-extras';

const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
filterEntries(map, value => value > 1);
//=> Map { 'b' => 2, 'c' => 3 }
```
*/
export function filterEntries<K, V>(map: Map<K, V>, function_: (value: V, key: K) => boolean): Map<K, V>;

/**
Merge multiple Maps into a new Map. Later Maps override earlier ones.

@param maps - The Maps to merge.
@returns A new merged Map.

@example
```
import {mergeMap} from 'map-extras';

const a = new Map([['x', 1]]);
const b = new Map([['y', 2]]);
mergeMap(a, b);
//=> Map { 'x' => 1, 'y' => 2 }
```
*/
export function mergeMap<K, V>(...maps: Array<Map<K, V>>): Map<K, V>;

/**
Create a new Map with keys and values swapped.

@param map - The input Map.
@returns A new Map with keys and values inverted.

@example
```
import {invertMap} from 'map-extras';

const map = new Map([['a', 1], ['b', 2]]);
invertMap(map);
//=> Map { 1 => 'a', 2 => 'b' }
```
*/
export function invertMap<K, V>(map: Map<K, V>): Map<V, K>;

/**
Group items from an iterable by a key function.

@param iterable - The input iterable.
@param function_ - The function to compute the group key.
@returns A Map where keys are group keys and values are arrays of items.

@example
```
import {groupBy} from 'map-extras';

groupBy([1, 2, 3, 4], x => x % 2 === 0 ? 'even' : 'odd');
//=> Map { 'odd' => [1, 3], 'even' => [2, 4] }
```
*/
export function groupBy<T, K>(iterable: Iterable<T>, function_: (item: T) => K): Map<K, T[]>;
