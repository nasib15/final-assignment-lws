export const replaceMongoIdInArray = (array) => {
  const isArray = Array.isArray(array);
  if (!isArray) {
    return null;
  }

  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
  const isObject = obj instanceof Object;
  if (!isObject) {
    return null;
  }
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};
