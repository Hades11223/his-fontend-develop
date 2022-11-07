import { DM_GOI_DV } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_GOI_DV }),
};
