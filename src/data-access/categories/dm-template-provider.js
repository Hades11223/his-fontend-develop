import { DM_TEMPLATE } from "client/api";
import apiBase from "../api-base";

export default {
  ...apiBase.init({ API: DM_TEMPLATE }),
};
