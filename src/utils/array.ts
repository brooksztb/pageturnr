export function groupBy<T extends Record<string, any>, K extends keyof T>(
  array: T[] | undefined,
  key: K | { (obj: T): string }
): Record<string, T[]> {
  const keyFn = key instanceof Function ? key : (obj: T) => obj[key]
  if (array) {
    return array.reduce((objectsByKeyValue, obj) => {
      const value = keyFn(obj)
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
      return objectsByKeyValue
    }, {} as Record<string, T[]>)
  }

  return {} as Record<string, T[]>
}
