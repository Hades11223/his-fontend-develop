import { DM_BENH_PHAM } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_BENH_PHAM }),
};
