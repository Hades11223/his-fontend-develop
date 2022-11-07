import { DM_CHI_PHI_HAP_SAY_VTYT } from "client/api";
import { client, dataPath } from "client/request";
import apiBase from "data-access/api-base";

export default {
  init: apiBase.init({ API: DM_CHI_PHI_HAP_SAY_VTYT }),
  initVTYT: apiBase.init({ API: `${DM_CHI_PHI_HAP_SAY_VTYT}/vat-tu` }),
};
