import { DM_LOAI_BENH_AN } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_LOAI_BENH_AN }),
};
