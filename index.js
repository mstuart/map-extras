export function mapValues(map, function_) {
	const result = new Map();
	for (const [key, value] of map) {
		result.set(key, function_(value, key));
	}

	return result;
}

export function filterEntries(map, function_) {
	const result = new Map();
	for (const [key, value] of map) {
		if (function_(value, key)) {
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
		if (!result.has(key)) {
			result.set(key, []);
		}

		result.get(key).push(item);
	}

	return result;
}
