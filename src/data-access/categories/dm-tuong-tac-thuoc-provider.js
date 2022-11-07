import { DM_TUONG_TAC_THUOC } from "client/api";
import apiProvider from "../api-base";

export default {
  ...apiProvider.init({ API: DM_TUONG_TAC_THUOC }),
};
