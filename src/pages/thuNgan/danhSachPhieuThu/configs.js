export const TRANG_THAI_PHIEU_THU = [
  {
    id: "",
    i18n: "common.tatCa",
    ten: "Tất cả",
  },
  {
    id: "true",
    i18n: "thuNgan.daThanhToan",
    ten: "Đã thanh toán",
  },
  {
    id: "false",
    i18n: "thuNgan.chuaThanhToan",
    ten: "Chưa thanh toán",
  },
];

export const TRANG_THAI_XUAT_HOA_DON = [
  {
    id: "",
    i18n: "common.tatCa",
    ten: "Tất cả",
  },
  {
    id: "true",
    i18n: "thuNgan.daXuat",
    ten: "Đã xuất",
  },
  {
    id: "false",
    i18n: "thuNgan.chuaXuat",
    ten: "Chưa xuất",
  },
];

export const SO_TIEN = [
  {
    id: "",
    i18n: "common.tatCa",
    ten: "Tất cả",
  },
  {
    id: "0,1000000",
    ten: "0 - 1.000.000 VND",
  },
  {
    id: "1000001,2000000",
    ten: "1.000.001-2.000.000",
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
    i18n: "thuNgan.tren30000000",
    ten: "Trên 30.000.000 VND",
  },
];

export const TIME_FORMAT = "HH:mm:ss DD/MM/YYYY";

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
