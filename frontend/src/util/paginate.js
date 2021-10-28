import _ from "../pages/home/node_modules/lodash";

export const paginate = ({ items, currentPage, limit }) => {
  console.log(limit);
  const offset = (currentPage - 1) * limit;
  return _(items).slice(offset).take(limit).value();
};
