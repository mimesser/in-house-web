export const truncateFileName = (fileName: string) => {
  const parts = fileName.split(".");
  const name = parts.slice(0, parts.length - 1).join(".");
  const ending = parts[parts.length - 1];
  if (name.length < 11) return fileName;
  return `${name.slice(0, 4)}...${name.slice(name.length - 5)}.${ending}`;
};
