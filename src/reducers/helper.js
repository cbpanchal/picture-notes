import React from "react";

export const convertObjToArr = objectData => {
  const newArray = [];
  if (objectData !== undefined && objectData) {
    Object.keys(objectData).map(key => {
      const data = {
        key,
        ...objectData[key]
      };
      newArray.push(data);
    });
  }
  return newArray;
};
