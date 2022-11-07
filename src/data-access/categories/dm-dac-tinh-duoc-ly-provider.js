import { DM_DAC_TINH_DUOC_LY } from "client/api";
import apiProvider from "data-access/api-base";

export default {
  ...apiProvider.init({ API: DM_DAC_TINH_DUOC_LY }),
};
