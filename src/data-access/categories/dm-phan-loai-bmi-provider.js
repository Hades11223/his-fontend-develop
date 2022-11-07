import { DM_PHAN_LOAI_BMI } from "client/api";
import apiProvider from "../api-base";

export default {
  ...apiProvider.init({ API: DM_PHAN_LOAI_BMI }),
};
