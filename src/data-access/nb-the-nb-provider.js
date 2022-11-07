import { NB_THE_NB } from "client/api";
import apiBase from "./api-base";

export default {
  init: { ...apiBase.init({ API: NB_THE_NB }) },
  initHuy: { ...apiBase.init({ API: `${NB_THE_NB}/huy` }) },
};
