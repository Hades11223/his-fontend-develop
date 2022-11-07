import { message } from "antd";
import { get } from "lodash";
import baoCaoProvider from "data-access/categories/dm-bao-cao-provider";
import moment from "moment";
import { t } from "i18next";
import cloneDeep from "lodash/cloneDeep";
export default {
  state: {
    loading: false,
    id: "",
    props: {
      value: "",
      name: "",
      api: "",
      fontSize: "3",
    },
    lines: [],
    components: [],
    chunkComponent: {},
    line: {},
    component: {},
    inputList: [],
    type: "",
    configFiles: [],
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },

    updateFormProps(state, payload) {
      return {
        ...state,
        props: {
          ...payload,
        },
      };
    },

    // manage components
    updateComponents(state, payload) {
      const newItems = state.components.map((item) =>
        item.key === payload.key ? payload : item
      );
      return { ...state, components: newItems };
    },
  },
  effects: (dispatch) => ({
    convertData: (data) => {
      if (data.data) {
        let components = data.data.components || [];
        components = components.map((item) => {
          if (item.name === "GroupCheck" && item.props?.checkList) {
            item.props.checkList = item.props?.checkList.map((item2) => {
              item2.labelValue = item2.label;
              return item2;
            });
          }
          return item;
        });
        const config = data.data.config || data.data.cauHinh;
        let obj = {
          id: data.data.id,
          props: {
            ma: data.data.ma,
            ten: data.data.ten,
            api: data.data.api,
            fontSize: config?.fontSize || "3",
            layoutType: config?.layoutType || "default",
            tenTieuChi: data.data.tenTieuChi,
            apiTieuChi: data.data.apiTieuChi,
            soCapKyDienTu: data.data.soCapKyDienTu,
            chonTieuChi: data.data.chonTieuChi || false,
            apiTemplate: data.data.apiTemplate || "",
          },
          lines: data.data.layout || [],
          components: components,
          chunkComponent: (get(data, "data.layout", []) || []).reduce(
            (res, next) => ({
              ...res,
              [next.key]: get(data, "data.components", []).filter(
                (item) => item.lineKey === next.key
              ),
            }),
            {}
          ),
          line: {},
        };
        dispatch.config.updateData(obj);
        return obj;
      }
    },
    onUpdate: ({ formInfo = {}, ...payload }, rootState) => {
      const { config } = rootState;
      if (!Object.keys(formInfo).length) formInfo = config.props || {};
      const { id, properties } = payload;
      if (id) {
        let components = payload.components
          .filter((item) => !!item)
          .map((item) => {
            let props = properties.key === item.key ? properties : item.props;
            return {
              ...item,
              value: item.value,
              content: "",
              props: {
                ...item.props,
                ...props,
                checkList:
                  item.props && item.props.checkList
                    ? item.props.checkList.map((check) => {
                        const list = props.checkList || [];
                        const obj = list.find((i) => i.key === check.key) || {};
                        return {
                          ...check,
                          ...obj,
                          label: check && check.labelValue,
                        };
                      })
                    : [],
              },
            };
          });
        const data = {
          id: payload.id,
          ...formInfo,
          layout: payload.lines,
          components: components,
          cauHinh: {
            fontSize: formInfo.fontSize || "3",
            layoutType: formInfo.layoutType,
          },
        };
        baoCaoProvider
          .patch({ id, ...data })
          .then((s) => {
            dispatch.config.convertData(s);
            message.success(s?.message || "Cập nhật form thành công");
          })
          .catch((e) => {
            message.error(e?.message || t("common.capNhatThanhCong"));
          });
      }
    },
    getById: (payload = {}) => {
      return new Promise((resolve, reject) => {
        dispatch.config.updateData({
          loading: true,
          formInfo: null,
        });
        baoCaoProvider
          .getById(payload.id)
          .then(async (s) => {
            const data = await dispatch.config.convertData(s);
            dispatch.files.getTemplateAPI({
              api: get(data, "props.apiTemplate", "")
                ? get(data, "props.apiTemplate", "")
                : get(data, "props.api", ""),
            });
            dispatch.config.updateData({
              loading: false,
              formInfo: data.props,
            });
          })
          .catch((e) => {
            dispatch.config.updateData({
              loading: false,
            });
            message.error(e?.message || t("common.capNhatThanhCong"));
          });
      });
    },
    onAddComponent: (payload, state) => {
      let components = state.config.components;
      let time = 0;
      const execute = (com) => {
        const props = com?.props;
        time++;
        if (com.type == "table") {
          if (props?.keysHadConfig) {
            let newKeysHadConfig = {};
            for (let x in props?.keysHadConfig) {
              let config = props?.keysHadConfig[x];
              if (config) {
                let arr = x.split("_");
                arr[0] = com.key;
                newKeysHadConfig[arr.join("_")] = JSON.parse(
                  JSON.stringify(config)
                );
              }
            }
            props.keysHadConfig = newKeysHadConfig;
          }
          (props.rows || []).forEach((row, indexr) => {
            (props.cols || []).forEach((col, indexc) => {
              const boxKey = `${com.oldKey || com.key}_${row.key}_${col.key}`;

              const component = components.find((c) => c.parent === boxKey);
              if (component) {
                //       let blockKey = moment().valueOf() + time;
                let newKey = moment().valueOf() + time;
                let parrentKey = `${com.key || com.key}_${row.key}_${col.key}`;
                //       let component =
                //         components.find((item2) => item2.parent == item.key) || {};
                const newComponent = JSON.parse(
                  JSON.stringify({
                    ...component,
                    oldKey: component.key,
                    oldLineKey: component.lineKey,
                    key: newKey,
                    parent: parrentKey,
                    lineKey: com.lineKey,
                  })
                );
                components.push(newComponent);
                execute(newComponent);
              }
            });
          });
        } else if (props?.lines?.length) {
          props.lines.forEach((line) => {
            let newLineKey = moment().valueOf() + time;
            if (line.items?.length) {
              line.items.forEach((item) => {
                let blockKey = moment().valueOf() + time;
                let newKey = moment().valueOf() + time;
                let component =
                  components.find((item2) => item2.parent == item.key) || {};
                const newComponent = JSON.parse(
                  JSON.stringify({
                    ...component,
                    key: newKey,
                    parent: blockKey,
                    lineKey: newLineKey,
                  })
                );
                components.push(newComponent);
                item.key = blockKey;
                item.parent = newLineKey;
                item.lineKey = newLineKey;
                execute(newComponent);
              });
            }
            line.key = newLineKey;
          });
        }
      };
      execute(payload);

      dispatch.config.updateData({
        components: [...components, payload],
      });
    },
    onCopyComponent: (payload, state) => {
      dispatch.config.updateData({
        componentCopy: cloneDeep(payload),
      });
      message.success(t("editor.daCopyComponent"));
    },
    onRemoveComponent(payload, state) {
      dispatch.config.updateData({
        components: state.config.components.filter(
          (item) => item.key !== payload.key
        ),
        component: {},
      });
    },
    onCopyLayout: (payload, state) => {
      dispatch.config.updateData({
        layoutCopy: cloneDeep(payload),
      });
    },
    onPasteLayout: (payload = {}, state) => {
      dispatch.config.updateData(cloneDeep(payload));
    },
  }),
};
