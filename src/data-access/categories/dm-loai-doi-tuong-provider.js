import { DM_LOAI_DOI_TUONG } from "client/api";
import apiBase from "data-access/api-base";

export default {
  ...apiBase.init({ API: DM_LOAI_DOI_TUONG }),
};
