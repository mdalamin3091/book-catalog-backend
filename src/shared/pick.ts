export const pick = <T extends Record<string, unknown>, k extends keyof T>(
  query: T,
  fields: k[]
): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const field of fields) {
    if (query && query.hasOwnProperty.call(query, field)) {
      finalObj[field] = query[field];
    }
  }
  return finalObj;
};
