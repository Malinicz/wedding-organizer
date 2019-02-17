export function toBoolean(value) {
  return value === 'true' ? true : false;
}

export function divideArrayIntoChunks(items, itemsInChunk) {
  let result = [];
  let tempGroup = [];

  for (let i = 0, len = items.length; i < len; i++) {
    if (i !== 0 && i % itemsInChunk === 0) {
      result.push(tempGroup);
      tempGroup = [];
    }

    tempGroup.push(items[i]);

    if (i === len - 1) {
      result.push(tempGroup);
      return result;
    }
  }
}
