import { Pagination, Checkbox, Input, InputNumber } from "antd";
import { DatePicker, InputTimeout, TableWrapper } from "components";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { checkRole } from "utils/role-utils";
import { Main } from "./styled";
import moment from "moment";

const { Column } = TableWrapper;

const ChiPhiHapSay = (props) => {
  const { t } = useTranslation();

  const {
    chiPhiHapSay: { patchOrPostRecord, getRecord },
  } = useDispatch();

  const { listData, totalElements, page, size } = useSelector(
    (state) => state.chiPhiHapSay
  );
  const { currentItem: currentItemVTYT } = useSelector(
    (state) => state.chiPhiHapSayVTYT
  );

  const [state, _setState] = useState({
    dataTable: [],
    newData: [],
    editData: [],
    currentIndex: null,
    // isNew: false,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { dataTable, currentIndex, newData, editData } = state;

  const allDataTable = [...dataTable, ...newData];

  useEffect(() => {
    if (currentItemVTYT.dichVuId)
      getRecord({ dichVuId: currentItemVTYT.dichVuId }).then((res) => {
        setState({ dataTable: res.data });
      });
  }, [currentItemVTYT]);

  const handleAddNewRow = () => {
    const initDataNewRow = {
      key: `key${state.dataTable.length + state.newData.length + 1}`,
      active: true,
    };

    setState({
      newData: [...state.newData, initDataNewRow],
      currentIndex: state.dataTable.length + state.newData.length,
    });
  };

  const handleInRow = (record = {}, index) => {
    return {
      onClick: (event) => {
        const obj = { currentIndex: index };
        if (
          index < dataTable.length &&
          editData.findIndex((item) => record.id === item.id) === -1
        ) {
          obj.editData = [...editData, record];
        }
        setState(obj);
      },
    };
  };

  const onChange = (key, selector) => (e) => {
    let value = "";

    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d;
    else value = e;

    // if (selector) {
    //   allDataTable[key][selector] = value;
    // } else allDataTable[key] = value;

    if (key === "tuNgay" || key === "denNgay") {
      allDataTable[currentIndex][key] = moment(value).format("YYYY-MM-DD");
    } else {
      allDataTable[currentIndex][key] = value;
    }
  };

  const handleSaveDataTable = ({ loaiDoiTuongId }) => {
    const handlePostPutData = (key) => {
      if (state[key].length) {
        state[key]
          .filter((item) => item.hasOwnProperty("tongTien"))
          .forEach((item) => {
            patchOrPostRecord({
              id: key === "editData" ? item.id : null,
              active: item.active,
              denNgay: item.denNgay,
              tuNgay: item.tuNgay,
              tongTien: item.tongTien,
              dichVuId: currentItemVTYT.dichVuId,
            })
              .then((res) => {
                setState({ currentIndex: null, [key]: [] });
              })
              .catch((err) => console.log("err", err));
          });
      }
    };

    handlePostPutData("newData");
    handlePostPutData("editData");
  };

  const columns = [
    Column({
      title: t("common.stt"),
      width: "36px",
      dataIndex: "key",
      key: "1",
      align: "center",
      render: (idx) => page * size + Number(idx.slice(3)) + 1,
    }),
    Column({
      title: t("danhMuc.chiTietHapSay"),
      // i18Name: "danhMuc.maVatTu",
      // width: "120px",
      dataIndex: "tongTien",
      key: "tongTien",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <InputNumber
              min={0}
              defaultValue={item}
              placeholder={t("danhMuc.nhapChiTietHapSay")}
              onChange={onChange("tongTien")}
            />
          );
        } else return item;
      },
    }),
    Column({
      title: t("common.tuNgay"),
      // i18Name: "danhMuc.maVatTu",
      width: "68px",
      dataIndex: "tuNgay",
      key: "tuNgay",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <DatePicker
              format="YYYY/MM/DD"
              placeholder="Chọn ngày"
              onChange={onChange("tuNgay")}
              defaultValue={
                item
                  ? moment().set({
                      year: item.slice(0, 4),
                      month: Number(item.slice(5, 7)) - 1,
                      date: item.slice(8, 10),
                    })
                  : null
              }
            />
          );
        } else return item;
      },
    }),
    Column({
      title: t("common.denNgay"),
      // i18Name: "danhMuc.maVatTu",
      width: "68px",
      dataIndex: "denNgay",
      key: "denNgay",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <DatePicker
              format="YYYY/MM/DD"
              placeholder="Chọn ngày"
              onChange={onChange("denNgay")}
              defaultValue={
                item
                  ? moment().set({
                      year: item.slice(0, 4),
                      month: Number(item.slice(5, 7)) - 1,
                      date: item.slice(8, 10),
                    })
                  : null
              }
            />
          );
        } else return item;
      },
    }),
    Column({
      title: t("danhMuc.coHieuLuc"),
      // i18Name: "danhMuc.maVatTu",
      width: "48px",
      dataIndex: "active",
      key: "denNgay",
      align: "center",
      render: (item, list, index) => {
        if (index === state.currentIndex) {
          return (
            <Checkbox
              defaultChecked={item}
              onChange={onChange(index, "active")}
            />
          );
        } else return <Checkbox checked={item} />;
      },
    }),
  ];

  const onCancel = () => {
    setState({
      currentIndex: -1,
      dataTable: (dataTable || []).filter((item) => item.tongTien),
    });
  };

  const rowClassName = (record, index, __) => {
    return index === state.currentIndex
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  return (
    <Main>
      <EditWrapper
        title={"Chi phí hấp sấy"}
        onCancel={onCancel}
        onSave={handleSaveDataTable}
        onAddNewRow={handleAddNewRow}
        isShowSaveButton={currentItemVTYT.dichVuId}
        isShowCancelButton={currentItemVTYT.dichVuId}
        showAdded={currentItemVTYT.dichVuId}
        roleSave={props.roleSave}
        roleEdit={props.roleEdit}
        // editStatus={state?.pressButtonAdded ? false : editStatus}
        // forceShowButtonSave={
        //   (state?.pressedRow && checkRole(props.roleEdit) && true) ||
        //   (state.pressButtonAdded && checkRole(props.roleEdit) && true) ||
        //   false
        // }
        // forceShowButtonCancel={
        //   (state?.pressedRow && checkRole(props.roleEdit) && true) ||
        //   (state.pressButtonAdded && checkRole(props.roleEdit) && true) ||
        //   false
        // }
        // isEditAndPressRow={dichVuId && checkRole(props.roleEdit)}
      >
        <fieldset>
          <div>
            <TableWrapper
              scroll={{ y: false, x: false }}
              columns={columns}
              dataSource={allDataTable || []}
              onRow={handleInRow}
              rowClassName={rowClassName}
            ></TableWrapper>
            {totalElements > 1 && (
              <Pagination
                // onChange={onChangePage}
                current={page + 1}
                pageSize={size}
                total={totalElements}
                // onShowSizeChange={onSizeChange}
                style={{ flex: 1, justifyContent: "flex-end" }}
              />
            )}
          </div>
        </fieldset>
      </EditWrapper>
    </Main>
  );
};

export default ChiPhiHapSay;
