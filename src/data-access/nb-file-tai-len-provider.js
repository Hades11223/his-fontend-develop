import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_FILE_TAI_LEN } from "client/api";
import apiBase from "./api-base";

export default {
  ...apiBase.init({ API: NB_FILE_TAI_LEN }),
};
