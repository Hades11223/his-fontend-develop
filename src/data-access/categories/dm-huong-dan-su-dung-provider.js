import { DM_HUONG_DAN_SU_DUNG } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_HUONG_DAN_SU_DUNG }),
};
