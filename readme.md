# map-extras

> Utility functions for JavaScript Map — mapValues, filterEntries, merge, invert, and groupBy

## Install

```sh
npm install map-extras
```

## Usage

```js
import {mapValues, filterEntries, mergeMap, invertMap, groupBy} from 'map-extras';

const prices = new Map([['apple', 1], ['banana', 2], ['cherry', 3]]);

mapValues(prices, value => value * 2);
//=> Map { 'apple' => 2, 'banana' => 4, 'cherry' => 6 }

filterEntries(prices, value => value > 1);
//=> Map { 'banana' => 2, 'cherry' => 3 }

mergeMap(prices, new Map([['date', 4]]));
//=> Map { 'apple' => 1, 'banana' => 2, 'cherry' => 3, 'date' => 4 }

invertMap(prices);
//=> Map { 1 => 'apple', 2 => 'banana', 3 => 'cherry' }

groupBy([1, 2, 3, 4], x => x % 2 === 0 ? 'even' : 'odd');
//=> Map { 'odd' => [1, 3], 'even' => [2, 4] }
```

## API

### mapValues(map, function_)

Returns a new Map with values transformed by `function_(value, key)`.

### filterEntries(map, function_)

Returns a new Map with entries where `function_(value, key)` is truthy.

### mergeMap(...maps)

Returns a new Map merging all maps. Later maps override earlier ones.

### invertMap(map)

Returns a new Map with keys and values swapped.

### groupBy(iterable, function_)

Returns a Map where keys are `function_(item)` results and values are arrays of items.

## Related

- [set-extras](https://github.com/mstuart/set-extras) - Set algebra operations
- [iterable-ops](https://github.com/mstuart/iterable-ops) - Lazy utility functions for iterables

## License

MIT
