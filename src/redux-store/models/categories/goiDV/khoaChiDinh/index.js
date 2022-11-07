import fetchProvider from "data-access/categories/dm-khoa-chi-dinh-dich-vu-provider";
import baseStore from "../../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "khoaChiDinh",
    title: "khoa chỉ định",
  }),
};
