import { useInterval } from "hook";
export default {
  UseInterval(url, id) {
    useInterval(() => {
      if (id) url(id);
    }, 5000);
  },
};
