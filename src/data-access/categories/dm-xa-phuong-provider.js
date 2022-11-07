import { ZONES } from "client/api";
import apiBase from "../api-base";

export default {
  ...apiBase.init({ API: ZONES }),
};
