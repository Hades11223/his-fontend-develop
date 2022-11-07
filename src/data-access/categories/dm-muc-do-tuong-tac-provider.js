import { DM_MUC_DO_TUONG_TAC } from "client/api";
import apiProvider from "data-access/api-base";

export default {
  ...apiProvider.init({ API: DM_MUC_DO_TUONG_TAC }),
};
