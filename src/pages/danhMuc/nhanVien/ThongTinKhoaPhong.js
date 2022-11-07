import React, { useEffect, useRef, useState } from "react";
import { HeaderSearch, TableWrapper, Select } from "components";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Image } from "antd";
import { openInNewTab } from "utils";
// import { isEqual } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";

const ThongTinKhoaPhong = React.forwardRef(
  ({ isRefresh, handleAdded }, ref) => {
    const [state, _setState] = useState({
      dataTable: [],
      currentIndex: null,
    });
    const setState = (data = {}) =>
      _setState((state) => ({ ...state, ...data }));

    const {
      phong: { listAllPhong },
      khoa: { listAllKhoa },
      toaNha: { listAllToaNha },
      nhanVien: { dataEditDefault },
    } = useSelector((state) => state);

    const {
      nhanVien: { updateData },
      khoa: { getListAllKhoa },
      phong: { getListAllPhong },
      toaNha: { getListAllToaNha },
    } = useDispatch();

    const { t } = useTranslation();

    useEffect(() => {
      getListAllKhoa({ active: true, page: "", size: "" });
      getListAllPhong({ active: true, page: "", size: "" });
      getListAllToaNha({ active: true, page: "", size: "" });
    }, []);

    useEffect(() => {
      const dataTable = (dataEditDefault.dsKhoa || []).map((item, index) => {
        return { ...item, stt: index + 1 };
      });
      setState({ dataTable: dataTable, currentIndex: null, isNew: false });
    }, [dataEditDefault.dsKhoa, isRefresh]);

    const handleAddNewRow = () => {
      if (state.isNew) return;
      const initDataNewRow = {
        khoaQuanLy: true,
        key: `key${state.dataTable.length}`,
      };
      setState({
        isNew: true,
        dataTable: [initDataNewRow, ...state.dataTable],
        currentIndex: 0,
        // currentIndex: state.dataTable.length,
      });
    };

    const handleDelete = (e, indexDelete) => {
      e.stopPropagation();
      refConfirm.current &&
        refConfirm.current.show(
          {
            title: t("common.xoaDuLieu"),
            content: `${t("common.banCoChacMuonXoa")} ?`,
            cancelText: t("common.quayLai"),
            okText: t("common.dongY"),
            classNameOkText: "button-error",
            showImg: true,
            showBtnOk: true,
          },
          () => {
            let newArr = state.dataTable.filter(
              (item, index) => index !== indexDelete
            );
            setState({ dataTable: newArr });
          }
        );
    };

    const handleSaveDataTable = () => {
      const newArr = state.dataTable.filter((item) =>
        item.hasOwnProperty("khoa")
      );
      dataEditDefault.dsKhoa = newArr;
      updateData(dataEditDefault);
      setState({ currentIndex: null, isNew: false });
      handleAdded();
    };

    const onCancel = () => {
      const dataTable = (dataEditDefault.dsKhoa || []).map((item, index) => {
        return { ...item, stt: index + 1 };
      });
      setState({ dataTable: dataTable, currentIndex: null, isNew: false });
    };

    const handleInRow = (record = {}, index) => {
      return {
        onClick: (event) => {
          setState({ currentIndex: index });
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

      const dataTable = [...state.dataTable];

      if (selector) {
        // if (!dataTable[selector]) dataTable[selector] = {};
        dataTable[key][selector] = value;
      } else dataTable[key] = value;
      setState({ dataTable });
    };

    const onMultiChange = (index, selector, key) => (value, option) => {
      if (!state.dataTable[index][selector]) {
        state.dataTable[index][selector] = [];
      }

      if (selector === "khoa") {
        state.dataTable[index][selector] = option?.lists;
      } else {
        state.dataTable[index][selector] = option?.map((i) => i.lists);
      }
      if (key && state.dataTable[index][key]) {
        state.dataTable[index][key] = value;
      }

      // if (selector === "khoa") {
      //   state.dataTable[index]["dsPhong"] = null;
      //     state.dataTable[index]["dsToaNha"] = null;

      //   getListAllPhong({ khoaId: value });
      //     getListAllToaNha({ khoaId: value });
      // }
    };

    // const onChangeCheckbox = (value, name) => {
    //   newRecord.khoaQuanLy = value;
    //   setNewRecord(newRecord);
    // };

    // const onChangeSelect = (value, option, name) => {
    //   if ("khoa" === name) {
    //     newRecord.khoa = option ? option.lists : {};
    //     getListPhongTongHop({
    //       khoaId: option?.value,
    //       page: "",
    //       size: "",
    //     });
    //   } else if ("dsToaNha" === name) {
    //     newRecord.dsToaNha = option ? option : [];
    //   } else if ("dsPhong" === name) {
    //     newRecord.dsPhong = option ? option : [];
    //   }
    //   setNewRecord(newRecord);
    // };

    const columns = [
      {
        title: <HeaderSearch title="STT" />,
        width: 38,
        dataIndex: "stt",
        key: "stt",
        align: "center",
      },

      {
        title: (
          <HeaderSearch
            title="Khoa"
            sort_key="khoa"
            // searchSelect={
            //   showRow && (
            //     <Select
            //       placeholder="Chọn khoa"
            //       data={listAllKhoa}
            //       onChange={(value, option) => {
            //         onChangeSelect(value, option, "khoa");
            //       }}
            //     />
            //   )
            // }
          />
        ),
        width: 192,
        dataIndex: "khoa",
        key: "khoa",
        render: (item, list, index) => {
          if (index === state.currentIndex) {
            return (
              <Select
                data={listAllKhoa}
                onChange={onMultiChange(index, "khoa", "khoaId")}
                style={{ width: "100%" }}
                defaultValue={item && item.id}
                value={item?.id}
              />
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
                onClick={() => openInNewTab("/danh-muc/toa-nha")}
              >
                Nhà
              </div>
            }
            sort_key="nha"
            // searchSelect={
            //   showRow && (
            //     <Select
            //       mode="multiple"
            //       placeholder="Chọn nhà"
            //       data={listAllToaNha}
            //       onChange={(value, option) => {
            //         onChangeSelect(value, option, "dsToaNha");
            //       }}
            //     />
            //   )
            // }
          />
        ),
        width: 128,
        dataIndex: "dsToaNha",
        key: "dsToaNha",
        render: (item, list, index) => {
          if (index === state.currentIndex) {
            return (
              <Select
                mode="multiple"
                data={listAllToaNha}
                placeholder="Chọn tòa nhà"
                onChange={onMultiChange(index, "dsToaNha")}
                defaultValue={item && item.map((e) => e.id)}
                value={(state.dataTable[index]["dsToaNha"] || []).map(
                  (e) => e.id
                )}
              />
            );
          } else
            return (
              item &&
              item.length > 0 &&
              item.map((e) => e && e.ten?.length > 0 && e.ten).join(",")
            );
        },
      },

      {
        title: (
          <HeaderSearch
            title={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/phong")}
              >
                Phòng
              </div>
            }
            sort_key="phong"
            // searchSelect={
            //   showRow && (
            //     <Select
            //       mode="multiple"
            //       placeholder="Chọn phòng"
            //       data={listAllPhong}
            //       onChange={(value, option) => {
            //         onChangeSelect(value, option, "dsPhong");
            //       }}
            //     />
            //   )
            // }
          />
        ),
        width: 192,
        dataIndex: "dsPhong",
        key: "dsPhong",
        render: (item, list, index) => {
          if (index === state.currentIndex) {
            return (
              <Select
                mode="multiple"
                data={listAllPhong}
                placeholder="Chọn phòng"
                onChange={onMultiChange(index, "dsPhong")}
                defaultValue={item && item.map((e) => e.id)}
                value={(state.dataTable[index]["dsPhong"] || []).map(
                  (e) => e.id
                )}
              />
            );
          }
          return (
            item &&
            item.length > 0 &&
            item.map((e) => e && e.ten?.length > 0 && e.ten).join(",")
          );
        },
      },
      {
        title: (
          <HeaderSearch
            title="Khoa quản lý"
            // searchSelect={
            //   showRow && (
            //     <Checkbox
            //       defaultChecked="true"
            //       onChange={(e) => {
            //         onChangeCheckbox(e.target.value, "khoaQuanLy");
            //       }}
            //     />
            //   )
            // }
          />
        ),
        width: 80,
        dataIndex: "khoaQuanLy",
        key: "khoaQuanLy",
        align: "center",
        render: (item, list, index) => {
          if (index === state.currentIndex) {
            return (
              <Checkbox
                defaultChecked={item}
                onChange={onChange(index, "khoaQuanLy")}
              />
            );
          } else return <Checkbox checked={item} />;
        },
      },

      {
        title: (
          <HeaderSearch
            title="Thao tác"
            // searchSelect={
            //   showRow && (
            //     <Image
            //       preview={false}
            //       src={require("assets/images/his-core/iconTick.png")}
            //       onClick={onSaveNew}
            //     />
            //   )
            // }
          />
        ),
        width: 80,
        dataIndex: "thaoTac",
        key: "thaoTac",
        align: "center",
        render: (item, element, index) => {
          return (index !== 0 || !state.isNew) && (
            <Image
              preview={false}
              src={require("assets/images/his-core/iconDelete.png")}
              onClick={(e) => handleDelete(e, index)}
            />
          );
        },
      },
    ];

    return (
      // <div className="main-info">
      //   <div className="table-info">
      <EditWrapper
        // title={"Thông tin khoa phòng"}
        onCancel={onCancel}
        onSave={() => handleSaveDataTable({ dataTable: state.dataTable })}
        actionHeaderClass={"table-header-custom"}
        onAddNewRow={handleAddNewRow}
        isShowSaveButton={true}
        isShowCancelButton={true}
        showAdded={true}
        // roleSave={props.roleSave}
        // roleEdit={props.roleEdit}
        // editStatus={state?.pressButtonAdded ? false : editStatus}
        // forceShowButtonSave={
        //   (state?.pressedRow && checkRole(.roleEdit) && true) || false
        // }
        // forceShowButtonCancel={
        //   (state?.pressedRow && checkRole(props.roleEdit) && true) || false
        // }
        // isHiddenButtonAdd={true}
      >
        <>
          <TableWrapper
            columns={columns}
            dataSource={state.dataTable}
            onRow={handleInRow}
            rowClassName={(record, index) => {
              return record.key === state.dataTable[state.currentIndex]?.key
                ? `row-actived row-id-${ref.current}_${record.id}`
                : `row-id-${ref.current}_${record.id}`;
            }}
          />
          {/* {totalElements && (
              <Pagination
                listData={state?.data}
                // onChange={onChangePage}
                current={props.page + 1}
                pageSize={props.size}
                total={totalElements}
                onShowSizeChange={onSizeChange}
                style={{ flex: 1, justifyContent: "flex-end" }}
              />
            )} */}
        </>
      </EditWrapper>
      //   </div>
      // </div>
    );
  }
);
export default ThongTinKhoaPhong;
