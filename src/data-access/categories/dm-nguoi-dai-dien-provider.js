import { DM_NGUOI_DAI_DIEN } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_NGUOI_DAI_DIEN }),
};
