import fetchProvider from "data-access/categories/dm-chi-so-song-provider";
import baseStore from "../../base-store";
import apiBase from "data-access/api-base";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "chiSoSong",
    title: "Chỉ số sống",
    customEffect: ({ dispatch }) => ({}),
  }),
};
