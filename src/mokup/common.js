export const loadDataSort = (sorter, type) => {
  let typeSort = sorter.value === 1 ? ",asc" : sorter.value === 2 ? ",desc" : "";
  let resSort = typeSort && sorter.key + typeSort;
  return resSort;
};

export const addLayoutXS = (item) => {
  return { xs: item };
};
