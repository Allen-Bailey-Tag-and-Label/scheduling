const sanitizeObject = (columns) =>
  Object.keys(columns).map((key) => {
    return {
      key,
      title: key
    };
  });
const validateArray = (columns) =>
  columns.map((column) => {
    if (typeof column === 'object' && !Array.isArray(column) && column !== null) return column;
    if (typeof column === 'string') return { key: column, title: column };
  });

export default (columns) => {
  if (Array.isArray(columns)) return validateArray(columns);
  if (typeof columns === 'object' && !Array.isArray(columns) && columns !== null)
    return sanitizeObject(columns);
};
