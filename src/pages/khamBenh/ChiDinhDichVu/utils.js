export const getColorByTrangThai = (status) => {
  let statusLevel = 0;
  if (
    [
      10, // ĐĂNG KÝ KHÁM
      15, // CHỜ TIẾP ĐÓN
    ].includes(status)
  )
    statusLevel = 1;
  else if (
    [
      20, // CHỜ KHÁM
      25, // CHỜ TIẾP NHẬN,
    ].includes(status)
  ) {
    statusLevel = 2;
  } else if (
    [
      30, // ĐÃ CHECKIN KHÁM,
      35, // ĐÃ CHECKIN
    ].includes(status)
  ) {
    statusLevel = 3;
  } else if (
    [
      40, // CHUẨN BỊ KHÁM,
      43, // CHUẨN BỊ THỰC HIỆN
      46, // CHUẨN BỊ LẤY MẪU
    ].includes(status)
  ) {
    statusLevel = 4;
  } else if (
    [
      60, // ĐANG KHÁM,
      63, // ĐÃ TIẾP NHẬN
      66, // ĐÃ LẤY MẪU
    ].includes(status)
  ) {
    statusLevel = 5;
  } else if (
    [
      70, // ĐANG THỰC HIỆN DV,
    ].includes(status)
  ) {
    statusLevel = 6;
  } else if (
    [
      100, // CHỜ KẾT LUẬN,
    ].includes(status)
  ) {
    statusLevel = 7;
  } else if (
    [
      110, // CHỜ KẾT LUẬN,
    ].includes(status)
  ) {
    statusLevel = 8;
  } else if (
    [
      120, // CHỜ KẾT LUẬN,
    ].includes(status)
  ) {
    statusLevel = 9;
  } else if (
    [
      130, // CHỜ KẾT LUẬN,
    ].includes(status)
  ) {
    statusLevel = 10;
  } else statusLevel = "11";

  if (statusLevel <= 4) return "#FC3B3A";
  if (statusLevel <= 10) return "#fdc015";
  return "#049254";
};

export const canEditOrUpdate = (trangThai, loaiDichVu, listTrangThai = []) => {
  const isValid = (status, typeServices) => {
    if (typeServices === 10) {
      // Khám có trạng thái < Xếp hàng đợi khám
      return status <= 50;
    } else if (typeServices === 20) {
      // Xét nghiệm có trạng thái < đã lấy bệnh phẩm
      return status < 90;
    } else if (typeServices === 30 || typeServices === 40) {
      // CLS có trạng thái < đã tiếp nhận
      return status < 63;
    }
  };

  let shouldEditOrDel = false;
  if (trangThai) {
    shouldEditOrDel = isValid(trangThai, loaiDichVu);
  } else {
    if (loaiDichVu === 60) {
      return true;
    }
    shouldEditOrDel = listTrangThai.some((item) => isValid(item, loaiDichVu));
  }
  return shouldEditOrDel;
};
