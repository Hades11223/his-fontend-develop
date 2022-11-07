import { DM_MAU_DIEN_BIEN } from "client/api";
import apiProvider from "../api-base";

export default {
  ...apiProvider.init({ API: DM_MAU_DIEN_BIEN }),
};
