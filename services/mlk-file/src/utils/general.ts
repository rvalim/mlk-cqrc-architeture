export function tryParse(payload) {
  try {
  return JSON.parse(payload);
  } catch (e) {
    return payload;
  }
}

export function tryStringify(payload) {
  try {
    return JSON.stringify(payload);
  } catch (e) {
    return payload;
  }
}