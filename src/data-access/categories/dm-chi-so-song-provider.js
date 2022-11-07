import { DM_CHI_SO_SONG } from "client/api";
import apiProvider from "../api-base";
export default {
  ...apiProvider.init({ API: DM_CHI_SO_SONG }),
};
