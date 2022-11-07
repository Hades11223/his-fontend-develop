import React, { useState, useEffect, useMemo, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { connect } from "react-redux";
import { ENUM, HIEU_LUC } from "constants/index";
import { Checkbox, InputNumber } from "antd";
import { handleBlurInput, handleKeypressInput } from "utils";
import { openInNewTab } from "utils";
import { checkRole } from "utils/role-utils";
import { Main } from "./styled";
import { useEnum } from "hook";
function DichVuKemTheo(props) {
  const {
    size,
    page,
    dichVuId,
    totalElements,
    dsLoaiDichVu,
    loaiDichVu,
    refCallbackSave = {},
  } = props;
  const [state, _setState] = useState({
    active: false,
    data: [],
    services: [],
  });
  const [listThoiDiemChiDinh] = useEnum(ENUM.THOI_DIEM_CHI_DINH);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  useEffect(() => {
    if (dichVuId) {
      props.getData({ dichVuChinhId: dichVuId });
      props.getAllDichVu({ dsLoaiDichVu: dsLoaiDichVu });
      props.getAllKhoTongHop({});
      props.getListAllLoaiDoiTuong();
    }
  }, [dichVuId]);
  useEffect(() => {
    setState({
      listAllLoaiDoiTuong: [
        { id: "", ten: "Tất cả" },
        ...props.listAllLoaiDoiTuong,
      ],
    });
  }, [props.listAllLoaiDoiTuong]);

  useEffect(() => {
    setState({ data: [...props.listData] });
  }, [props.listData, page, size]);

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  // const onSearchInput = (key) => (e) => {
  //   let value = "";
  //   if (e?.target) {
  //     if (e.target.hasOwnProperty("checked")) value = e.target.checked;
  //     else value = e.target.value;
  //   } else value = e;
  //   props.onChangeInputSearch({
  //     [key]: value,
  //     dichVuId,
  //   });
  // };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else value = e;
        props.onChangeInputSearch({
          [key]: value,
        });
      },
      500,
      key,
      e?.target
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
    setState({
      currentItem: state.currentItem,
    });
  };

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1, dichVuId });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size, dichVuId });
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: "index",
    },
    {
      title: (
        <HeaderSearch
          title={<div className="pointer">Thời điểm chỉ định</div>}
          sort_key="thoiDiemChiDinh"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["thoiDiemChiDinh"] || 0}
          searchSelect={
            <Select
              data={listThoiDiemChiDinh}
              placeholder="Chọn thời điểm chỉ định"
              onChange={onSearchInput("thoiDiemChiDinh")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "thoiDiemChiDinh",
      key: "thoiDiemChiDinh",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Select
              placeholder={"Chọn thời điểm chỉ định"}
              data={listThoiDiemChiDinh}
              onSelect={onChange("thoiDiemChiDinh")}
              value={state.currentItem?.thoiDiemChiDinh}
            ></Select>
          );
        } else
          return (
            item &&
            listThoiDiemChiDinh.find((itemFind) => item === itemFind.id)?.ten
          );
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/vat-tu")} //TODO: danh-muc/thuoc
            >
              Tên dịch vụ
            </div>
          }
          require
          sort_key="dichVuKemTheo.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVuKemTheo.ten"] || 0}
          searchSelect={
            <Select
              data={props.listAllDichVu}
              placeholder="Chọn dịch vụ"
              onChange={onSearchInput("dichVuKemTheoId")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dichVuKemTheo",
      key: "dichVuKemTheo",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <>
              <Select
                placeholder={"Chọn dịch vụ"}
                data={props.listAllDichVu}
                onSelect={onChange("id", "dichVuKemTheo")}
                value={state.currentItem?.dichVuKemTheo?.id}
              ></Select>
              {state?.checkValidate &&
                !state.currentItem?.dichVuKemTheo?.id && (
                  <span className="error">Vui lòng chọn tên dịch vụ</span>
                )}
            </>
          );
        } else return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/loai-doi-tuong")}
            >
              Loại đối tượng
            </div>
          }
          sort_key="loaiDoiTuong.id"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["loaiDoiTuong.id"] || 0}
          searchSelect={
            <Select
              onChange={onSearchInput("loaiDoiTuong.id")}
              className="select"
              placeholder={"Chọn loại đối tượng"}
              data={state.listAllLoaiDoiTuong}
              allowClear={false}
            ></Select>
          }
        />
      ),
      width: "200px",
      dataIndex: "loaiDoiTuong",
      key: "loaiDoiTuong",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Select
              placeholder={"Chọn loại đối tượng"}
              data={props.listAllLoaiDoiTuong}
              onSelect={onChange("id", "loaiDoiTuong")}
              value={state.currentItem?.loaiDoiTuong?.id}
            ></Select>
          );
        } else return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng"
          require={loaiDichVu !== 20}
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["soLuong"] || 0}
          search={
            <InputNumber
              placeholder="Tìm số lượng"
              onChange={onSearchInput("soLuong")}
              onKeyDown={handleKeypressInput}
              onBlur={handleBlurInput}
              type="number"
              min={0}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "soLuong",
      key: "soLuong",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <>
              <InputNumber
                placeholder={"Nhập số lượng"}
                onChange={onChange("soLuong")}
                style={{ width: "100%" }}
                defaultValue={state.currentItem?.soLuong}
                min={0}
                type="number"
                onKeyDown={handleKeypressInput}
                onBlur={handleBlurInput}
              />
              {state?.checkValidate &&
                !state.currentItem?.soLuong &&
                loaiDichVu !== 20 && (
                  <span className="error">Vui lòng nhập số lượng</span>
                )}
            </>
          );
        } else return item;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="khongTinhTien"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.khongTinhTien || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Không tính tiền"
              onChange={onSearchInput("khongTinhTien")}
            />
          }
          title="Không tính tiền"
        />
      ),
      width: "100px",
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Checkbox
              defaultChecked={item}
              onChange={onChange("khongTinhTien")}
            />
          );
        } else
          return (
            <Checkbox checked={item} onChange={onChange("khongTinhTien")} />
          );
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
          searchSelect={
            <Select
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
          if (state.currentIndex !== index)
            setState({
              currentItem: JSON.parse(JSON.stringify(record)),
              currentIndex: index,
              pressedRow: true,
            });
        },
      };
    }
  };
  const onAddNewRow = () => {
    let item = { dichVuId, active: true };
    setState({
      currentItem: item,
      currentIndex: 0,
      data: [item, ...state.data],
      pressButtonAdded: true,
    });
  };
  const onSave = () => {
    const { id, active = true } = state.currentItem || {};
    if (
      !state.currentItem?.dichVuKemTheo?.id ||
      (!state.currentItem?.soLuong && loaiDichVu !== 20)
    ) {
      setState({
        checkValidate: true,
      });
      return;
    } else {
      setState({
        checkValidate: false,
      });
    }
    props
      .createOrEdit({
        id,
        dichVuChinhId: dichVuId,
        thoiDiemChiDinh: state?.currentItem?.thoiDiemChiDinh,
        // khoId: state.currentItem?.kho?.id,
        loaiDoiTuongId: state.currentItem?.loaiDoiTuong?.id,
        dichVuKemTheoId: state.currentItem?.dichVuKemTheo?.id,
        soLuong: state.currentItem?.soLuong,
        active,
        khongTinhTien: !!state?.currentItem?.khongTinhTien,
      })
      .then((s) => {
        setState({
          currentIndex: -1,
          currentItem: null,
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
      pressButtonAdded: false,
    });
  };
  return (
    <Main>
      <EditWrapper
        title={"Dịch vụ kèm theo"}
        onCancel={onCancel}
        onSave={onSave}
        onAddNewRow={onAddNewRow}
        isShowSaveButton={state.currentItem}
        isShowCancelButton={state.currentItem}
        showAdded={dichVuId && !state.currentItem}
        roleSave={props.roleSave}
        roleEdit={props.roleEdit}
        editStatus={state?.pressButtonAdded ? false : editStatus}
        forceShowButtonSave={
          (state?.pressedRow && checkRole(props.roleEdit) && true) || false
        }
        forceShowButtonCancel={
          (state?.pressedRow && checkRole(props.roleEdit) && true) || false
        }
        // isHiddenButtonAdd={true}
      >
        <div>
          <TableWrapper
            scroll={{ y: 400, x: 700 }}
            columns={columns}
            dataSource={dichVuId ? state.data : []}
            onRow={onRow}
          ></TableWrapper>
          {dichVuId && totalElements ? (
            <Pagination
              listData={state?.data}
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
    </Main>
  );
}

const mapStateToProps = (state) => {
  const {
    dichVuKemTheo: { listData, size, page, totalElements, dataSortColumn },
    kho: { listAllKho = [] },
    dichVu: { listAllDichVu = [] },
    loaiDoiTuong: { listAllLoaiDoiTuong = [] },
  } = state;

  return {
    listAllLoaiDoiTuong,
    listData: listData || [],
    size,
    page,
    totalElements,
    listAllKho,
    listAllDichVu,
    dataSortColumn: dataSortColumn || { active: 2, "dichVu.ten": 1 },
  };
};

const mapDispatchToProps = ({
  dichVuKemTheo: {
    getData,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    onDelete,
  },
  dichVu: { getAllDichVu },
  kho,
  loaiDoiTuong: { getListAllLoaiDoiTuong },
  utils: { getUtils },
}) => {
  return {
    getData,
    getAllDichVu,
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    onDelete,
    getAllKhoTongHop: kho.getAllTongHop,
    getListAllLoaiDoiTuong,
    getUtils,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DichVuKemTheo);
