import _ from "../../home/node_modules/lodash";

const colors = [
  {
    id: 1,
    color: "hsl(87, 70%, 50%)",
  },
  {
    id: 2,
    color: "hsl(9, 70%, 50%)",
  },
  {
    id: 3,
    color: "hsl(173, 70%, 50%)",
  },
  {
    id: 4,
    color: "hsl(297, 70%, 50%)",
  },
  { id: 5, color: "hsl(213, 70%, 50%)" },
];

export const countCategories = (items) => {
  let count = {};

  //count genre id occurrenc
  items.map((m) => {
    count[m.category2.label] = (count[m.category2.label] || 0) + 1;
  });

  //convert into object and sort by highest
  let result = Object.keys(count).map((e) => {
    return { label: e, value: count[e] };
  });

  let sorted = _.orderBy(result, "value", "desc");

  //get top 3
  sorted = sorted.slice(0, 5);

  const total = sorted.map((m, idx) => {
    const color = colors.find((c) => c.id === idx + 1);
    return { id: m.label, label: m.label, value: m.value, color: color.color };
  });

  return total;
};
