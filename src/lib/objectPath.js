export function setByPath(object, path, value) {
  const [key, ...rest] = path.split(".");

  if (rest.length === 0) return { ...object, [key]: value };

  return {
    ...object,
    [key]: setByPath(object[key] ?? {}, rest.join("."), value),
  };
}
