export const fuzzyMatch = (str1: string, str2: string): boolean => {
  const normalize = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return (
    normalize(str1).includes(normalize(str2)) ||
    normalize(str2).includes(normalize(str1))
  );
};
