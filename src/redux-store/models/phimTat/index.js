export default {
  state: {
    layers: [],
    hotKeys: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onAddLayer: ({ layerId, keyCodes }, state) => {
      let layers = state.phimTat.layers;
      const index = layers.findIndex((item) => item.layerId == layerId); //tìm xem layer này đã được thêm chưa
      let layer = null;
      if (index >= 0) {
        //nếu layer đã được thêm
        layer = layers[index];
        layers.splice(index, 1);
        dispatch.phimTat.updateData({ layers: [layer, ...layers] }); //thì move layer đấy lên top
      } else {
        // ngược lại thì append lên đầu
        dispatch.phimTat.updateData({
          layers: [
            {
              layerId,
            },
            ...layers,
          ],
        });
      }
    },
    onRemoveLayer: ({ layerId }, state) => {
      let layers = state.phimTat.layers;
      let hotKeys = state.phimTat.hotKeys || [];
      dispatch.phimTat.updateData({
        layers: layers.filter((item) => item.layerId != layerId), //xóa layer theo Id
        hotKeys: hotKeys.filter((item) => item.layerId != layerId), //xóa tất cả các hotKey có layer là layerId
      });
    },
    onRegisterHotkey: ({ layerId, hotKeys: listHostKeys = [] }, state) => {
      let hotKeys = state.phimTat.hotKeys;
      listHostKeys.forEach((hotKey) => {
        let index = hotKeys.findIndex((item) => {
          return (
            item.layerId == layerId &&
            item.id == hotKey.id &&
            item.keyCode == hotKey.keyCode
          );
        });
        if (index == -1) index = hotKeys.length;
        hotKeys[index] = { layerId, ...hotKey };
      });
      dispatch.phimTat.updateData({ hotKeys: [...hotKeys] });
    },
    onUnRegisterHotkey: ({ layerId, hotKeys: listHostKeys = [] }, state) => {
      let hotKeys = state.phimTat.hotKeys.filter((hotKey) => {
        return !listHostKeys.find(
          (item) =>
            item.layerId == layerId &&
            item.keyCode == hotKey.keyCode &&
            item.id == hotKey.id
        );
      });
      dispatch.phimTat.updateData({ hotKeys });
    },
    onEvent: (e = {}, state) => {
      try {
        let layers = state.phimTat.layers;
        let hotKeys = state.phimTat.hotKeys;
        const layer = layers[0];
        if (!layer) return;
        else {
          const keyCode = e.keyCode;
          hotKeys.forEach((hotKey) => {
            if (
              hotKey.keyCode == keyCode &&
              hotKey.layerId == layer.layerId &&
              hotKey.onEvent
            ) {
              try {
                e.preventDefault();
                hotKey.onEvent(e);
              } catch (error) {
                console.log(error);
              }
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  }),
};
