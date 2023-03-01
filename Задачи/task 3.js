class Item {
  constructor(name, price, quantity, description) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
  getName() {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
  getCount() {
    return this.quantity;
  }
  getDescription() {
    return this.description;
  }
}

const getQueryObj = (query) => {
  const parts = query.split("&");
  const queryObj = {};

  parts.forEach((part, index) => {
    const partsSplitted = part.split("-");
    const [fieldName, ...rest] = partsSplitted;

    if (rest.length === 2) {
      const [query, value] = rest;
      queryObj[index] = { fieldName, query, value };
    } else {
      const [numParam] = rest;
      const [query, value] = numParam;
      queryObj[index] = { fieldName, query, value };
    }
  });

  return queryObj;
};

const filter = (queryObj, items, index = 0) => {
  queryObjLength = Object.keys(queryObj).length;

  const newQuery = {};
  for (key in queryObj) {
    if (key !== String(index)) {
      newQuery[key] = queryObj[key];
    }
  }
  if (queryObjLength === 0) {
    return items;
  } else {
    const firstQuery = queryObj[index];
    const { fieldName } = firstQuery;

    if (fieldName === "name" || fieldName === "description") {
      const { query, value } = firstQuery;

      if (query === "contains") {
        const filteredItems = items.filter((item) =>
          item[fieldName].includes(value)
        );

        return filter(newQuery, filteredItems, index + 1);
      } else {
        const filteredItems = items.filter((item) =>
          item[fieldName].endsWith(value)
        );

        return filter(newQuery, filteredItems, index + 1);
      }
    } else {
      const { query, value } = firstQuery;

      const filteredItems = items.filter((item) => {
        switch (query) {
          case "=":
            return (item[fieldName] = value);
          case ">":
            return item[fieldName] > value;
            break;
          case "<":
            return item[fieldName] < value;
            break;
          case ">=":
            return item[fieldName] >= value;
            break;
          case "<=":
            return item[fieldName] <= value;
            break;
        }
      });
      return filter(newQuery, filteredItems, index + 1);
    }
  }
};
const test = "name-contains-fd&price-=2&quantity->5&description-ends-abc";

const queryObj = getQueryObj(test);

const testItems = [
  new Item("good1 fd", 25, 10, "test description1 abc"),
  new Item("good2", 25, 10, "test description2"),
  new Item("good3 fd", 25, 10, "test description3 abc"),
  new Item("good4", 25, 10, "test description4 abc"),
];
console.log(filter(queryObj, testItems));
