import _ from "lodash";

export const paginate = (data: [], pageNumber: number, pageSize: number) => {
  //if pagesize is 5, startIndex of page1 = 0, page2 = 5
  const startIndex = (pageNumber - 1) * pageSize;

  //return a new array starting from startIndex upto pageSize
  return _(data).slice(startIndex).take(pageSize).value();
};
