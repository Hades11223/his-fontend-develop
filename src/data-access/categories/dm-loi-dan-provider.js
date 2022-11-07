import { DM_LOI_DAN } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_LOI_DAN }),
};
