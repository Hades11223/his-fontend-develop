// export const formatDecimal = (val) => {
//   if(!val) return 0;
//   let valStr = String(val);
//   if (valStr && /\D*/.test(valStr)) {
//     valStr = valStr.replace(/\D*/g, "");
//   }
//   return valStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };
export const formatDecimal = (val) => {
  if (!val || val === "0" || val === "undefined") return 0;
  const num = String(val);
  const indexOfDot = num.indexOf(".");
  if (indexOfDot > 0) {
    const formattedNum = num.slice(0, indexOfDot);
    const decimal = num.slice(indexOfDot + 1, num.length);

    return formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + decimal;
  }

  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
