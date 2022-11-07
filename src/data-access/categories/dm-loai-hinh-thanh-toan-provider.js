import { DM_LOAI_HINH_THANH_TOAN } from "client/api";
import apiProvider from "data-access/api-base";

export default {
  ...apiProvider.init({ API: DM_LOAI_HINH_THANH_TOAN }),
};
