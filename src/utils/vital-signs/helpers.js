import _ from "lodash";
export function formatName(userName) {
  const name = userName.trim();
  const newName = name.replace(/\s+/g, " ");
  const arr = newName.split(" ");
  const length = arr.length;

  return arr.reduce((finalTex, item, i) => {
    if (i < length - 1) {
      finalTex = finalTex.concat(`${item.charAt(0)}.`);
    } else {
      finalTex = finalTex.concat(`${item} `);
    }
    return finalTex;
  }, "");
}

export const isArrayEqual = function (x, y) {
  return _(x).xorWith(y, _.isEqual).isEmpty();
};
