
const sortList = (list, key) => {
  let listCopy = [...list]
  listCopy.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
  return listCopy;
}

export { sortList };
