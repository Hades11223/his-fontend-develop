export const TRANG_THAI = [
  {
    id: "",
    ten: "common.tatCa",
  },
  {
    ten: "common.co",
    id: "true",
  },
  {
    ten: "common.khong",
    id: "false",
  },
];

export const isNumber = (value) => {
  const regex = /^[0-9\b]+$/;
  return regex.test(value);
};

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
