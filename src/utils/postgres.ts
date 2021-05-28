export function serializeStringArray(array: Array<string>) {
  let values = array
    .filter((value) => value)
    .map((value) => {
      return `"${value.replace("'", "''").trim()}"`
    })
    .join(',')

  return `{${values}}`
}
