import { DM_NGUON_NHAP_KHO } from "client/api";
import apiBase from "data-access/api-base";

export default {
  
  ...apiBase.init({ API: DM_NGUON_NHAP_KHO }),
};
