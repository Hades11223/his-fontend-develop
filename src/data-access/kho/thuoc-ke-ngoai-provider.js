import { client, dataPath } from "client/request";
import { DM_THUOC_CHI_DINH_NGOAI } from "client/api";
import apiBase from "../api-base";

export default {
  ...apiBase.init({ API: DM_THUOC_CHI_DINH_NGOAI }),
};
