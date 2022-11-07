import { DM_HANG_THE } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_HANG_THE }),
};
