export const TRANG_THAI_PHIEU_THU = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Đã thanh toán",
  },
  {
    id: "false",
    ten: "Chưa thanh toán",
  },
];

export const SO_TIEN = [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "0,1000000",
    ten: "0 - 1.000.000 VND",
  },
  {
    id: "2000001,5000000",
    ten: "2.000.001 - 5.000.000 VND",
  },
  {
    id: "5000001,10000000",
    ten: "5.000.001 - 10.000.000 VND",
  },
  {
    id: "10000001,30000000",
    ten: "10.000.001 - 30.000.000 VND",
  },
  {
    id: "30000000",
    ten: "Trên 30.000.000 VND",
  },
];

export const TIME_FORMAT = "HH:mm:ss DD/MM/YYYY";

export const formatDecimal = (val) => {
  if (!val) return;
  const num = String(val);
  const indexOfDot = num.indexOf(".");
  if (indexOfDot > 0) {
    const formattedNum = num.slice(0, indexOfDot);
    const decimal = num.slice(indexOfDot + 1, num.length);

    return formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + decimal;
  }

  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
