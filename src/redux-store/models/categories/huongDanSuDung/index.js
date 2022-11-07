import fetchProvider from "data-access/categories/dm-huong-dan-su-dung-provider";
import apiBase from "../../../../data-access/api-base";
import baseStore from "../../base-store";

export default {
  ...baseStore({
    fetchProvider,
    storeName: "hdsd",
    title: "Hướng dẫn sử dụng",
    initState: {
      listAllVideo: [],
      currentVideos: [],
    },
    customEffect: ({ dispatch }) => ({
      ...apiBase.initReduxGetListAll({
        dispatch,
        api: fetchProvider.search,
        KEY_CACHE: "DATA_ALL_HDSD",
        model: "hdsd",
        fieldName: "HDSD",
      }),
      getAllVideo: (payload, state) => {
        dispatch.hdsd.getListAllHDSD({ size: 999 }).then((res) => {
          const listAllVideo = res.reduce(
            (acc, cur) => [
              ...acc,
              ...(cur.dsVideo
                ? cur.dsVideo.map((video) => {
                    const split = video.split("/");

                    return {
                      ma: cur.ma,
                      name: split[split.length - 1],
                      url: video,
                    };
                  })
                : []),
            ],
            []
          );

          dispatch.hdsd.updateData({
            listAllVideo,
          });
        });
      },
      filterVideos: ({ ma, ten }, state) => {
        dispatch.hdsd.updateData({
          currentVideos: state.hdsd.listAllVideo.filter((item) =>
            ten
              ? item.name.toLowerCase().indexOf(ten.toLowerCase()) !== -1
              : item.ma === ma
          ),
        });
      },
    }),
  }),
};
