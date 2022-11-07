import { DM_GOI_PT_TT_CHI_TIET } from "client/api";
import { client, dataPath } from "client/request";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_GOI_PT_TT_CHI_TIET }),
};
