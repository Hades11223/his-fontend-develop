import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";
import { message } from "antd";

export default {
  // use in data-access file
  init: ({ API, path = dataPath }) => ({
    // không sử dụng searchAll (vì giống searchTongHop)
      searchAll: ({
        page = 0,
        sort,
        size = 500,
        active = true,
        ...payload
      } = {}) => {
        return new Promise((resolve, reject) => {
          client
            .get(
              combineUrlParams(`${path}${API}/tong-hop`, {
                page: page + "",
                sort,
                size,
                active,
                ...payload,
              })
            )
            .then((s) => {
              if (s?.data?.code === 0) resolve(s?.data);
              else reject(s?.data);
            })
            .catch(reject);
        });
      },
    searchTongHop: ({
      page = 0,
      sort,
      size = 500,
      active = true,
      ...payload
    } = {}) => {
      return new Promise((resolve, reject) => {
        client
          .get(
            combineUrlParams(`${path}${API}/tong-hop`, {
              page: page + "",
              sort,
              size,
              active,
              ...payload,
            })
          )
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch(reject);
      });
    },
    search: ({ page = 0, sort, size = 10, ...payload } = {}) => {
      return new Promise((resolve, reject) => {
        client
          .get(
            combineUrlParams(`${path}${API}`, {
              page: page + "",
              sort,
              size,
              ...payload,
            })
          )
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch(reject);
      });
    },
    filter: ({ page, sort, size, ...payload } = {}) => {
      return new Promise((resolve, reject) => {
        client
          .get(
            combineUrlParams(`${path}${API}`, {
              ...payload,
            })
          )
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch(reject);
      });
    },
    post: (params) => {
      return new Promise((resolve, reject) => {
        client
          .post(`${path}${API}`, params)
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch(reject);
      });
    },
    put: ({ id, ...rest }) => {
      return new Promise((resolve, reject) => {
        client
          .put(`${path}${API}/${id}`, rest)
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch(reject);
      });
    },
    patch: ({ id, ...rest }) => {
      return new Promise((resolve, reject) => {
        client
          .patch(`${path}${API}/${id}`, rest)
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch(reject);
      });
    },
    delete: (id) => {
      return new Promise((resolve, reject) => {
        client
          .delete(`${path}${API}/${id}`)
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch(reject);
      });
    },
    getById: (id) => {
      return new Promise((resolve, reject) => {
        client
          .get(`${dataPath}${API}/${id}`)
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch(reject);
      });
    },
    getByIdTongHop: (id) => {
      return new Promise((resolve, reject) => {
        client
          .get(`${dataPath}${API}/tong-hop/${id}`)
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch(reject);
      });
    },
    searchTheoTaiKhoan: ({
      page = 0,
      sort,
      size = 500,
      active = true,
      ...payload
    }) => {
      return new Promise((resolve, reject) => {
        client
          .get(
            combineUrlParams(`${path}${API}/theo-tai-khoan`, {
              page,
              size,
              sort,
              active,
              ...payload,
            })
          )
          .then((res) => {
            if (res?.data?.code === 0) resolve(res?.data);
            else reject(res?.data);
          })
          .catch((err) => reject(err));
      });
    },
    batch: (params) => {
      return new Promise((resolve, reject) => {
        client
          .post(`${path}${API}/batch`, params)
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch(reject);
      });
    },
    import: (payload) => {
      return new Promise((resolve, reject) => {
        client
          .post(`${dataPath}${API}/import`, payload, {
            responseType: "arraybuffer",
          })
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  }),

  // use in redux-store file `getListAll${fieldName}`
  initReduxGetListAll: ({
    dispatch,
    api,
    model,
    fieldName,
    KEY_CACHE,
    timeReload = 600000,
    getKeyCache = (key, payload) => {
      return key;
    },
    modifyData = (data, payload, state) => {
      return data;
    },
    onSaveState = (data) => {
      return {};
    },
    allowCaching = true,
  }) => ({
    [`getListAll${fieldName}`]: (payload = {}, state) => {
      return new Promise(async (resolve, reject) => {
        const key = getKeyCache(KEY_CACHE, payload, state);
        try {
          let dataCache = null;
          if (allowCaching) {
            dataCache = await cacheUtils.read("", key, {}, false);
            if (
              //Nếu dữ liệu hiện tại khác dữ liệu trong redux
              JSON.stringify(dataCache?.data || []) !==
              JSON.stringify(state[model][`listAll${fieldName}`])
            ) {
              const newState = {
                [`listAll${fieldName}`]: dataCache?.data || [],
                [`listAllDefault${fieldName}`]: dataCache?.data || [],
              };
              dispatch[model].updateData({ ...newState });
            }
          }
          const syncTime = localStorage.getItem("TIME_RELOAD");
          if (
            !allowCaching ||
            !dataCache?.data ||
            !Number.isInteger(dataCache?.date) ||
            new Date().getTime() - dataCache?.date > timeReload ||
            syncTime - dataCache?.date > 0
          ) {
            api(payload).then((s) => {
              let { data } = s;
              data = orderBy(data, "ten", "asc");
              data = modifyData(data, payload, state);
              cacheUtils.save(
                "",
                key,
                { data, date: new Date().getTime() },
                false
              );
              if (
                JSON.stringify(data) !== JSON.stringify(dataCache?.data || [])
              ) {
                const newState = {
                  [`listAll${fieldName}`]: data || [],
                  [`listAllDefault${fieldName}`]: data || [],
                };
                dispatch[model].updateData({
                  ...newState,
                  ...(onSaveState(data) || {}),
                });
              }
            });
          }
          resolve(dataCache?.data || []);
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
  }),

  onImport: async (payload, fetchApi) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      payload?.dong && formData.append("dong", payload.dong);
      payload.sheet && formData.append("sheet", payload.sheet);
      payload?.file && formData.append("file", payload.file[0]);
      fetchApi(formData)
        .then((response) => {
          const blob = new Blob([new Uint8Array(response)], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.setAttribute("download", `${payload?.file?.[0]?.name}`);
          document.body.appendChild(link);
          link.click();
          resolve(response);
        })
        .catch(reject);
    });
  },
};
