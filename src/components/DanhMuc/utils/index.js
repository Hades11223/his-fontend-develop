export const formatKetQuaThamChieu = (key, ketQuaThamChieu, type) => {
  switch (+key) {
    case 10:
    case 30:
      if (type === "save") {
        return [ketQuaThamChieu];
      }
      return ketQuaThamChieu && ketQuaThamChieu.join(", ");
    case 20:
      return ketQuaThamChieu;
    default:
      return [];
  }
};
export const formatKetQuaThamChieuChiSoCon = (key, ketQuaThamChieu, type) => {
  switch (+key) {
    case 10:
    case 30:
      return ketQuaThamChieu;
    case 20:
      if (type === "save") {
        return (
          ((ketQuaThamChieu || []).length && ketQuaThamChieu.join(", ")) || ""
        );
      }
      return (!!ketQuaThamChieu && ketQuaThamChieu.split(",")) || [];
    default:
      return ketQuaThamChieu;
  }
};
