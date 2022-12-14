import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import SelectCustome from "components/Select";
import { connect } from "react-redux";
import { HIEU_LUC } from "constants/index";
import { Input, Checkbox, InputNumber, Select } from "antd";
import InputBlockString from "../inputBlockString";
import { formatKetQuaThamChieuChiSoCon } from "../utils";
import { checkRole } from "utils/role-utils";
function ChiSoCon(props) {
  const {
    size,
    page,
    dichVuId,
    mauKetQuaXnId,
    totalElements,
    getAllNhomChiSo,
    listAllNhomChiSo,
    loaiDichVu,
    refCallbackSave = {},
  } = props;
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (dichVuId) {
      props.getData({ dichVuId });
    }
    if (mauKetQuaXnId) {
      props.getData({ mauKetQuaXnId });
    }
  }, [dichVuId || mauKetQuaXnId]);
  useEffect(() => {
    if (mauKetQuaXnId && !listAllNhomChiSo.length) {
      getAllNhomChiSo({ size: 9999 });
    }
  }, [mauKetQuaXnId]);
  useEffect(() => {
    setState({ data: [...props.listData] });
  }, [props.listData, page, size]);

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, e) => {
        let value = "";
        if (e) {
          if (e?.hasOwnProperty("checked")) value = e?.checked;
          else value = e?.value || e;
        } else value = e;
        props.onChangeInputSearch({
          [key]: value,
        });
      },
      500,
      key,
      e?.target || e
    );
  };

  const onChange = (key, selector) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (state.currentItem) {
      if (selector) {
        if (!state.currentItem[selector]) state.currentItem[selector] = {};
        state.currentItem[selector][key] = value;
      } else state.currentItem[key] = value;
    }
    if (key === "loaiKetQua") {
      setState({
        loaiKetQuaXN: value,
      });
      state.currentItem["ketQuaThamChieu"] = +value === 20 ? [] : null;
      setState({
        currentItem: state.currentItem,
      });
    }
    setState({
      currentItem: state.currentItem,
    });
  };
  const onChangePage = (page) => {
    props.onSearch({ page: page - 1, dichVuId, mauKetQuaXnId });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size, dichVuId, mauKetQuaXnId });
  };
  const renderKetQuaThamChieu = useCallback(() => {
    switch (state.loaiKetQuaXN) {
      case 10:
        return (
          <InputBlockString
            defaultValue={state.currentItem?.ketQuaThamChieu}
            placeholder="Nh???p k???t qu??? tham chi???u"
            style={{ width: "100%" }}
            onChange={onChange("ketQuaThamChieu")}
          />
        );
      case 20:
        return (
          <Select
            defaultValue={state.currentItem?.ketQuaThamChieu}
            placeholder="Nh???p k???t qu??? tham chi???u"
            mode="tags"
            onChange={onChange("ketQuaThamChieu")}
          ></Select>
        );
      case 30:
        return (
          <SelectCustome
            defaultValue={state.currentItem?.ketQuaThamChieu}
            placeholder="Ch???n k???t qu??? tham chi???u"
            data={[
              { id: "??m t??nh", ten: "??m t??nh" },
              { id: "D????ng t??nh", ten: "D????ng t??nh" },
            ]}
            onChange={onChange("ketQuaThamChieu")}
          />
        );
      default:
        return <Input placeholder="Nh???p k???t qu??? tham chi???u" disabled />;
    }
  }, [state.loaiKetQuaXN]);
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      sortIndex: 1,
    },
    {
      sortIndex: 2,
      title: (
        <HeaderSearch
          title="M?? ch??? s??? con"
          sort_key="ma"
          require
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="T??m m?? ch??? s??? con"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "ma",
      key: "ma",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <>
              <Input
                defaultValue={state.currentItem?.ma}
                placeholder="Nh???p m?? ch??? s??? con"
                onChange={onChange("ma")}
              />
              {state?.checkValidate && !state.currentItem?.ma && (
                <span className="error">Vui l??ng nh???p m?? ch??? s??? con</span>
              )}
              {state.currentItem?.ma && state.currentItem?.ma?.length > 20 && (
                <span className="error">
                  Vui l??ng nh???p m?? ch??? s??? con kh??ng qu?? 20 k?? t???
                </span>
              )}
            </>
          );
        } else return item;
      },
    },
    {
      sortIndex: 3,
      title: (
        <HeaderSearch
          title="T??n ch??? s??? con"
          sort_key="ten"
          require
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="T??m t??n ch??? s??? con"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "ten",
      key: "ten",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <>
              <Input
                defaultValue={state.currentItem?.ten}
                placeholder="Nh???p t??n ch??? s??? con"
                onChange={onChange("ten")}
              />
              {state?.checkValidate && !state.currentItem?.ten && (
                <span className="error">Vui l??ng nh???p t??n ch??? s??? con</span>
              )}
              {state.currentItem?.ten &&
                state.currentItem?.ten?.length > 1000 && (
                  <span className="error">
                    Vui l??ng nh???p t??n ch??? s??? con kh??ng qu?? 1000 k?? t???
                  </span>
                )}
            </>
          );
        } else return item;
      },
    },
    {
      sortIndex: 11,
      title: (
        <HeaderSearch
          // title={(!!dichVuId && "M?? g???i LIS") || "Test groups CLSI"}
          title={"M?? g???i LIS"}
          sort_key="maKetNoi"
          require={!!dichVuId}
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["maKetNoi"] || 0}
          search={
            <Input
              placeholder={`T??m ${
                // (!!dichVuId && "m?? g???i LIS") || "test groups CLSI"
                "m?? g???i LIS"
              }`}
              onChange={onSearchInput("maKetNoi")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "maKetNoi",
      key: "maKetNoi",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <>
              <Input
                defaultValue={state.currentItem?.maKetNoi}
                placeholder={`Nh???p ${
                  (!!dichVuId && "m?? g???i LIS") || "test groups CLSI"
                }`}
                onChange={onChange("maKetNoi")}
              />
              {state?.checkValidate &&
                !state.currentItem?.maKetNoi &&
                !!dichVuId && (
                  <span className="error">Vui l??ng nh???p m?? g???i LIS</span>
                )}
            </>
          );
        } else return item;
      },
    },
    {
      display: [20].includes(loaiDichVu),
      sortIndex: 4,
      title: (
        <HeaderSearch
          title="Lo???i k???t qu???"
          sort_key="loaiKetQua"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.loaiKetQua || 0}
          searchSelect={
            <SelectCustome
              data={props.listloaiKetQuaXetNghiem}
              placeholder="Ch???n loai k???t qu???"
              onChange={onSearchInput("loaiKetQua")}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "loaiKetQua",
      key: "loaiKetQua",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          console.log(props.listloaiKetQuaXetNghiem, "listloaiKetQuaXetNghiem");
          return (
            <SelectCustome
              data={props.listloaiKetQuaXetNghiem}
              placeholder="Ch???n loai k???t qu???"
              onSelect={onChange("loaiKetQua")}
              value={state.currentItem?.loaiKetQua}
            ></SelectCustome>
            // <SelectLargeData
            //   data={props.listloaiKetQuaXetNghiem}
            //   placeholder="Ch???n loai k???t qu???"
            //   onChange={onChange("loaiKetQua")}
            //   style={{ width: "100%" }}
            //   getValue={(item) => item?.id}
            //   renderText={(item) => item?.ten}
            //   value={state.currentItem?.loaiKetQua}
            // />
          );
        } else {
          if (props.listloaiKetQuaXetNghiem?.length) {
            return (
              props.listloaiKetQuaXetNghiem.find((x) => x.id === item)?.ten ||
              ""
            );
          }
          return "";
        }
      },
    },
    {
      display: [20].includes(loaiDichVu),
      sortIndex: 4,
      title: (
        <HeaderSearch
          title="K???t qu??? tham chi???u"
          sort_key="K???t qu??? tham chi???u"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.ketQuaThamChieu || 0}
          search={
            <Input
              placeholder="Nh???p k???t qu??? tham chi???u"
              onChange={onSearchInput("ketQuaThamChieu")}
            />
          }
        />
      ),
      width: "170px",
      dataIndex: "ketQuaThamChieu",
      key: "ketQuaThamChieu",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return renderKetQuaThamChieu();
        } else return item;
      },
    },
    {
      sortIndex: 5,
      title: (
        <HeaderSearch
          title="Ch??? s??? n??? th???p"
          sort_key="chiSoNuThap"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNuThap"] || 0}
          search={
            <InputNumber
              placeholder="T??m ch??? s??? n??? th???p"
              onChange={onSearchInput("chiSoNuThap")}
              type="number"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "chiSoNuThap",
      key: "chiSoNuThap",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              type="number"
              defaultValue={state.currentItem?.chiSoNuThap}
              placeholder="Nh???p ch??? s??? n??? th???p"
              onChange={onChange("chiSoNuThap")}
            />
          );
        } else return item;
      },
    },
    {
      sortIndex: 6,
      title: (
        <HeaderSearch
          title="Ch??? s??? n??? cao"
          sort_key="chiSoNuCao"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNuCao"] || 0}
          search={
            <InputNumber
              placeholder="T??m ch??? s??? n??? cao"
              onChange={onSearchInput("chiSoNuCao")}
              type="number"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "chiSoNuCao",
      key: "chiSoNuCao",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              type="number"
              defaultValue={state.currentItem?.chiSoNuCao}
              placeholder="Nh???p ch??? s??? n??? cao"
              onChange={onChange("chiSoNuCao")}
            />
          );
        } else return item;
      },
    },
    {
      sortIndex: 7,
      title: (
        <HeaderSearch
          title="Ch??? s??? nam th???p"
          sort_key="chiSoNamThap"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNamThap"] || 0}
          search={
            <InputNumber
              placeholder="T??m ch??? s??? nam th???p"
              onChange={onSearchInput("chiSoNamThap")}
              type="number"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "chiSoNamThap",
      key: "chiSoNamThap",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              type="number"
              defaultValue={state.currentItem?.chiSoNamThap}
              placeholder="Nh???p ch??? s??? nam th???p"
              onChange={onChange("chiSoNamThap")}
            />
          );
        } else return item;
      },
    },
    {
      sortIndex: 8,
      title: (
        <HeaderSearch
          title="Ch??? s??? nam cao"
          sort_key="chiSoNamCao"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNamCao"] || 0}
          search={
            <InputNumber
              placeholder="T??m ch??? s??? nam cao"
              onChange={onSearchInput("chiSoNamCao")}
              type="number"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "chiSoNamCao",
      key: "chiSoNamCao",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              type="number"
              defaultValue={state.currentItem?.chiSoNamCao}
              placeholder="Nh???p ch??? s??? nam cao"
              onChange={onChange("chiSoNamCao")}
            />
          );
        } else return item;
      },
    },
    {
      display: !!mauKetQuaXnId,
      sortIndex: 9,
      title: (
        <HeaderSearch
          title="K???t qu??? b??nh th?????ng"
          sort_key="chiSoBinhThuong"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoBinhThuong"] || 0}
          search={
            <Input
              placeholder="T??m k???t qu??? b??nh th?????ng"
              onChange={onSearchInput("chiSoBinhThuong")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "chiSoBinhThuong",
      key: "chiSoBinhThuong",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Select
              defaultValue={state.currentItem?.chiSoBinhThuong}
              placeholder="Nh???p k???t qu??? b??nh th?????ng"
              onChange={onChange("chiSoBinhThuong")}
              mode="tags"
            ></Select>
          );
        } else return item;
      },
    },
    {
      display: !!mauKetQuaXnId,
      sortIndex: 10,
      title: (
        <HeaderSearch
          title="Nh??m ch??? s??? con"
          require={!!mauKetQuaXnId}
          sort_key="nhomChiSoCon.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["nhomChiSoCon.ten"] || 0}
          searchSelect={
            <SelectCustome
              onChange={onSearchInput("nhomChiSoConId")}
              className="select"
              placeholder={"Ch???n nh??m ch??? s??? con"}
              data={listAllNhomChiSo}
              allowClear={false}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "nhomChiSoCon",
      key: "nhomChiSoCon",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <>
              <SelectCustome
                data={listAllNhomChiSo}
                placeholder={"Ch???n nh??m ch??? s??? con"}
                onChange={onChange("id", "nhomChiSoCon")}
                value={state.currentItem?.nhomChiSoCon?.id}
              ></SelectCustome>
              {state?.checkValidate &&
                !state.currentItem?.nhomChiSoCon?.id &&
                !!mauKetQuaXnId && (
                  <span className="error">Vui l??ng ch???n ch??? s??? con!</span>
                )}
            </>
          );
        } else return item?.ten;
      },
    },
    {
      sortIndex: 4,
      title: (
        <HeaderSearch
          title="????n v???"
          sort_key="donVi"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["donVi"] || 0}
          search={
            <Input placeholder="T??m ????n v???" onChange={onSearchInput("donVi")} />
          }
        />
      ),
      width: "200px",
      dataIndex: "donVi",
      key: "donVi",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Input
              defaultValue={state.currentItem?.donVi}
              placeholder="Nh???p ????n v???"
              onChange={onChange("donVi")}
            />
          );
        } else return item;
      },
    },
    {
      sortIndex: 12,
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          searchSelect={
            <SelectCustome
              data={HIEU_LUC}
              placeholder="Ch???n hi???u l???c"
              onChange={onSearchInput("active")}
            />
          }
          title="C?? hi???u l???c"
        />
      ),
      width: "100px",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Checkbox defaultChecked={item} onChange={onChange("active")} />
          );
        } else return <Checkbox checked={item} onChange={onChange("active")} />;
      },
    },
  ];

  const onRow = (record = {}, index) => {
    if (!state.pressButtonAdded) {
      return {
        onClick: (event) => {
          const {
            chiSoBinhThuong = "",
            loaiKetQua,
            ketQuaThamChieu,
            ...rest
          } = record;
          let dataEdit = {
            ...rest,
          };
          if (!!mauKetQuaXnId) {
            dataEdit = {
              ...dataEdit,
              chiSoBinhThuong:
                (!!chiSoBinhThuong && chiSoBinhThuong.split(",")) || [],
            };
          }
          if (loaiDichVu === 20) {
            dataEdit = {
              ...dataEdit,
              loaiKetQua,
              ketQuaThamChieu: formatKetQuaThamChieuChiSoCon(
                loaiKetQua,
                ketQuaThamChieu
              ),
            };
            setState({
              loaiKetQuaXN: loaiKetQua,
            });
          }
          if (state.currentIndex !== index)
            setState({
              currentItem: JSON.parse(JSON.stringify(dataEdit)),
              currentIndex: index,
              pressedRow: true,
            });
        },
      };
    }
  };
  const onAddNewRow = () => {
    let item = { dichVuId, mauKetQuaXnId, active: true };
    setState({
      currentItem: item,
      currentIndex: 0,
      data: [item, ...state.data],
      loaiKetQuaXN: null,
      pressButtonAdded: true,
    });
  };
  const onSave = () => {
    const {
      id,
      active = true,
      chiSoNuCao,
      chiSoNuThap,
      chiSoNamCao,
      chiSoNamThap,
      donVi,
      ma,
      maKetNoi,
      ten,
      chiSoBinhThuong,
      nhomChiSoCon,
      loaiKetQua,
      ketQuaThamChieu,
    } = state.currentItem || {};
    if (ma && ma?.length <= 20 && ten && ten?.length <= 1000) {
      if (!!dichVuId) {
        if (maKetNoi) {
          setState({
            checkValidate: false,
          });
        } else {
          setState({
            checkValidate: true,
          });
          return;
        }
      } else if (!!mauKetQuaXnId) {
        if (!!nhomChiSoCon?.id) {
          setState({
            checkValidate: false,
          });
        } else {
          setState({
            checkValidate: true,
          });
          return;
        }
      }
    } else {
      setState({
        checkValidate: true,
      });
      return;
    }
    let params = {
      id,
      active,
      chiSoNuCao,
      chiSoNuThap,
      chiSoNamCao,
      chiSoNamThap,
      donVi,
      ma,
      maKetNoi,
      ten,
    };
    if (dichVuId) {
      params = { ...params, dichVuId: dichVuId };
      if (loaiDichVu === 20) {
        params = {
          ...params,
          loaiKetQua,
          ketQuaThamChieu: formatKetQuaThamChieuChiSoCon(
            loaiKetQua,
            ketQuaThamChieu,
            "save"
          ),
        };
      }
    }
    if (mauKetQuaXnId) {
      params = {
        ...params,
        mauKetQuaXnId: mauKetQuaXnId,
        nhomChiSoConId: nhomChiSoCon?.id,
        chiSoBinhThuong:
          ((chiSoBinhThuong || []).length && chiSoBinhThuong.join(", ")) || "",
      };
    }

    props.createOrEdit(params).then((s) => {
      setState({
        currentIndex: -1,
        currentItem: null,
        loaiKetQuaXN: null,
        pressButtonAdded: false,
      });
    });
  };
  refCallbackSave.current = onSave;

  const onCancel = () => {
    setState({
      currentIndex: -1,
      currentItem: null,
      data: (state.data || []).filter((item) => item.id),
      checkValidate: false,
      loaiKetQuaXN: null,
      pressButtonAdded: false,
    });
  };
  let filterColumn = columns.filter((item) => {
    return item.display !== false;
  });
  return (
    <EditWrapper
      title={"Ch??? s??? con"}
      onCancel={onCancel}
      onSave={onSave}
      onAddNewRow={onAddNewRow}
      isShowSaveButton={state.currentItem}
      isShowCancelButton={state.currentItem}
      showAdded={(dichVuId || mauKetQuaXnId) && !state.currentItem}
      roleSave={props.roleSave}
      roleEdit={props.roleEdit}
      editStatus={state?.pressButtonAdded ? false : editStatus}
      forceShowButtonSave={
        (state?.pressedRow && checkRole(props.roleEdit) && true) || false
      }
      forceShowButtonCancel={
        (state?.pressedRow && checkRole(props.roleEdit) && true) || false
      }
    >
      <div>
        <TableWrapper
          scroll={{ y: 500, x: 700 }}
          columns={
            !!mauKetQuaXnId
              ? filterColumn.sort((a, b) => a.sortIndex - b.sortIndex)
              : filterColumn
          }
          dataSource={dichVuId || mauKetQuaXnId ? state.data : []}
          onRow={onRow}
        ></TableWrapper>
        {(dichVuId || mauKetQuaXnId) && totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={props.page + 1}
            pageSize={props.size}
            total={totalElements}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : null}
      </div>
    </EditWrapper>
  );
}

const mapStateToProps = (state) => {
  const {
    chiSoCon: { listData, size, page, totalElements, dataSortColumn },
    nhomChiSo: { listAllData: listAllNhomChiSo = [] },
    utils: { listloaiKetQuaXetNghiem = [] },
  } = state;

  return {
    listData: listData || [],
    size,
    page,
    totalElements,
    dataSortColumn: dataSortColumn || { active: 2, "dichVu.ten": 1 },
    listAllNhomChiSo,
    listloaiKetQuaXetNghiem,
  };
};

const mapDispatchToProps = ({
  chiSoCon: {
    getData,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    onDelete,
  },
  nhomChiSo: { getAllTongHop: getAllNhomChiSo },
}) => {
  return {
    getData,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    onDelete,
    getAllNhomChiSo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChiSoCon);
