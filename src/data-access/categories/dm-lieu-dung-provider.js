import { DM_LIEU_DUNG } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_LIEU_DUNG }),
};
