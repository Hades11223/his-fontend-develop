import { NV_THONG_BAO } from "client/api";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NV_THONG_BAO }),
};
