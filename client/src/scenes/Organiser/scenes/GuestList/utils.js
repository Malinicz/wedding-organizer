export const pipe = (...functions) => data => {
  return functions.reduce((a, b) => b(a), data);
};
