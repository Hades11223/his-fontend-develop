import apiBase from "../api-base";
import { DM_HOAT_CHAT } from "client/api";

export default {
  ...apiBase.init({ API: DM_HOAT_CHAT }),
};
