import apiBase from "./api-base";
import { NB_PHIEU_THU_GIAM_GIA } from "client/api";

export default {
  search: apiBase.init({ API: NB_PHIEU_THU_GIAM_GIA }).search,
};
