import { DM_KICH_CO_VT } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_KICH_CO_VT }),
};
