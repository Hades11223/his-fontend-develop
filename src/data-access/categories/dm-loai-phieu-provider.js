import { DM_LOAI_BAO_CAO } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_LOAI_BAO_CAO }),
};
