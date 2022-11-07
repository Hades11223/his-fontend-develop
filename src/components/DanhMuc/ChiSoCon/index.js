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
            placeholder="Nhập kết quả tham chiếu"
            style={{ width: "100%" }}
            onChange={onChange("ketQuaThamChieu")}
          />
        );
      case 20:
        return (
          <Select
            defaultValue={state.currentItem?.ketQuaThamChieu}
            placeholder="Nhập kết quả tham chiếu"
            mode="tags"
            onChange={onChange("ketQuaThamChieu")}
          ></Select>
        );
      case 30:
        return (
          <SelectCustome
            defaultValue={state.currentItem?.ketQuaThamChieu}
            placeholder="Chọn kết quả tham chiếu"
            data={[
              { id: "Âm tính", ten: "Âm tính" },
              { id: "Dương tính", ten: "Dương tính" },
            ]}
            onChange={onChange("ketQuaThamChieu")}
          />
        );
      default:
        return <Input placeholder="Nhập kết quả tham chiếu" disabled />;
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
          title="Mã chỉ số con"
          sort_key="ma"
          require
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã chỉ số con"
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
                placeholder="Nhập mã chỉ số con"
                onChange={onChange("ma")}
              />
              {state?.checkValidate && !state.currentItem?.ma && (
                <span className="error">Vui lòng nhập mã chỉ số con</span>
              )}
              {state.currentItem?.ma && state.currentItem?.ma?.length > 20 && (
                <span className="error">
                  Vui lòng nhập mã chỉ số con không quá 20 ký tự
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
          title="Tên chỉ số con"
          sort_key="ten"
          require
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên chỉ số con"
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
                placeholder="Nhập tên chỉ số con"
                onChange={onChange("ten")}
              />
              {state?.checkValidate && !state.currentItem?.ten && (
                <span className="error">Vui lòng nhập tên chỉ số con</span>
              )}
              {state.currentItem?.ten &&
                state.currentItem?.ten?.length > 1000 && (
                  <span className="error">
                    Vui lòng nhập tên chỉ số con không quá 1000 ký tự
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
          // title={(!!dichVuId && "Mã gửi LIS") || "Test groups CLSI"}
          title={"Mã gửi LIS"}
          sort_key="maKetNoi"
          require={!!dichVuId}
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["maKetNoi"] || 0}
          search={
            <Input
              placeholder={`Tìm ${
                // (!!dichVuId && "mã gửi LIS") || "test groups CLSI"
                "mã gửi LIS"
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
                placeholder={`Nhập ${
                  (!!dichVuId && "mã gửi LIS") || "test groups CLSI"
                }`}
                onChange={onChange("maKetNoi")}
              />
              {state?.checkValidate &&
                !state.currentItem?.maKetNoi &&
                !!dichVuId && (
                  <span className="error">Vui lòng nhập mã gửi LIS</span>
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
          title="Loại kết quả"
          sort_key="loaiKetQua"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.loaiKetQua || 0}
          searchSelect={
            <SelectCustome
              data={props.listloaiKetQuaXetNghiem}
              placeholder="Chọn loai kết quả"
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
              placeholder="Chọn loai kết quả"
              onSelect={onChange("loaiKetQua")}
              value={state.currentItem?.loaiKetQua}
            ></SelectCustome>
            // <SelectLargeData
            //   data={props.listloaiKetQuaXetNghiem}
            //   placeholder="Chọn loai kết quả"
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
          title="Kết quả tham chiếu"
          sort_key="Kết quả tham chiếu"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.ketQuaThamChieu || 0}
          search={
            <Input
              placeholder="Nhập kết quả tham chiếu"
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
          title="Chỉ số nữ thấp"
          sort_key="chiSoNuThap"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNuThap"] || 0}
          search={
            <InputNumber
              placeholder="Tìm chỉ số nữ thấp"
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
              placeholder="Nhập chỉ số nữ thấp"
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
          title="Chỉ số nữ cao"
          sort_key="chiSoNuCao"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNuCao"] || 0}
          search={
            <InputNumber
              placeholder="Tìm chỉ số nữ cao"
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
              placeholder="Nhập chỉ số nữ cao"
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
          title="Chỉ số nam thấp"
          sort_key="chiSoNamThap"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNamThap"] || 0}
          search={
            <InputNumber
              placeholder="Tìm chỉ số nam thấp"
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
              placeholder="Nhập chỉ số nam thấp"
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
          title="Chỉ số nam cao"
          sort_key="chiSoNamCao"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNamCao"] || 0}
          search={
            <InputNumber
              placeholder="Tìm chỉ số nam cao"
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
              placeholder="Nhập chỉ số nam cao"
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
          title="Kết quả bình thường"
          sort_key="chiSoBinhThuong"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoBinhThuong"] || 0}
          search={
            <Input
              placeholder="Tìm kết quả bình thường"
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
              placeholder="Nhập kết quả bình thường"
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
          title="Nhóm chỉ số con"
          require={!!mauKetQuaXnId}
          sort_key="nhomChiSoCon.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["nhomChiSoCon.ten"] || 0}
          searchSelect={
            <SelectCustome
              onChange={onSearchInput("nhomChiSoConId")}
              className="select"
              placeholder={"Chọn nhóm chỉ số con"}
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
                placeholder={"Chọn nhóm chỉ số con"}
                onChange={onChange("id", "nhomChiSoCon")}
                value={state.currentItem?.nhomChiSoCon?.id}
              ></SelectCustome>
              {state?.checkValidate &&
                !state.currentItem?.nhomChiSoCon?.id &&
                !!mauKetQuaXnId && (
                  <span className="error">Vui lòng chọn chỉ số con!</span>
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
          title="Đơn vị"
          sort_key="donVi"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["donVi"] || 0}
          search={
            <Input placeholder="Tìm đơn vị" onChange={onSearchInput("donVi")} />
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
              placeholder="Nhập đơn vị"
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
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
          title="Có hiệu lực"
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
      title={"Chỉ số con"}
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
