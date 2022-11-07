// should refactor

import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Checkbox, Col, Input, Form } from "antd";
import Select from "components/Select";
import imgSearch from "assets/images/template/icSearch.png";
import CheckBoxVt from "./checkBox";
import { ROLES } from "constants/index";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import BaseDmWrap from "components/BaseDmWrap";

const SettingsPermission = ({
  getListAllQuyen,
  listAllQuyen,
  getNhomTinhNang,
  ListTinhNang,
  onExport,
  onImport,
}) => {
  const { t } = useTranslation();
  const refAutoFocus = useRef(null);

  const [state, _setState] = useState({
    groupPermission: [],
    dataPermission: {},
    isCheckedAll: false,
    indeterminateCheckAll: false,
    inValidRoles: false,
    allPermision: [],
    dsQuyenId: [],
    showFullTable: false,
    listAllQuyen: [],
    oldAllPermisson: [],
    arrAllPermision: [],
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { inValidRoles } = state;
  useEffect(() => {
    getListAllQuyen({ active: true, size: 1000 });
    getNhomTinhNang({ active: true, size: 1000 });
  }, []);

  const onReset = ({
    setState: updateState,
    updateData,
    form,
    refAutoFocus,
  }) => {
    setState({ inValidRoles: false, dataPermission: {}, dsQuyenId: [] });
    updateState({
      editStatus: false,
    });
    updateData({ dataEditDefault: null });
    form.resetFields();

    if (refAutoFocus.current) {
      setTimeout(() => {
        refAutoFocus.current.focus();
      }, 50);
    }
  };

  const onShowUpdate = (_, data = {}) => {
    let { dsQuyen } = data;
    const dsQuyenId = dsQuyen.map((quyen) => quyen.id);

    setState({
      dsQuyenId: dsQuyenId,
      editStatus: true,
      addedDisabledOk: true,
    });
  };

  const onCancel = ({ form, dataEditDefault }) => {
    setState({
      dataPermission: {},
      inValidRoles: false,
    });
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const isSubmit = () => {
    if (!state.dsQuyenId?.length) {
      setState({ inValidRoles: true });
      return false;
    }
    return true;
  };

  const beforeSubmit = (values) => {
    let formattedData = {
      ...values,
      moTa: values?.moTa?.trim(),
      ma: values?.ma?.trim(),
      ten: values.ten?.trim(),
      dsQuyenId: state.dsQuyenId,
    };
    return formattedData;
  };
  const afterSubmit = () => {
    setState({
      dsQuyenId: [],
      addedDisabledOk: true,
      dataPermission: {},
    });
  };
  const getColumns = ({ baseColumns }) => [
    baseColumns.stt,
    baseColumns.ma,
    baseColumns.ten,
    baseColumns.moTa,
    baseColumns.active,
  ];

  const filterByGroup = (value) => {
    if (value.length) {
      const newPermisson = state.oldAllPermisson.filter((tinhNang) => {
        return value.some((item) => item == tinhNang.id);
      });
      setState({
        allPermision: newPermisson,
      });
    } else {
      setState({
        allPermision: state.oldAllPermisson,
      });
    }
  };
  useEffect(() => {
    setState({
      listAllQuyen: listAllQuyen,
    });
  }, [listAllQuyen]);
  useEffect(() => {
    if (state.listAllQuyen?.length) {
      const data = {};
      const arrPermision = [];
      state.listAllQuyen.forEach((permission) => {
        // if (permission.dsNhomTinhNangId.length > 1) console.log(permission);
        permission.dsNhomTinhNangId.forEach((id) => {
          if (!data[id]) {
            data[id] = [];
            data[id].push(permission);
          } else {
            data[id].push(permission);
          }
          arrPermision.push(id);
        });
      });
      setState({ arrAllPermision: arrPermision });
      if (ListTinhNang.length) {
        ListTinhNang.forEach((tinhNang) => {
          tinhNang.permision = data[tinhNang.id];
        });
      }
      setState({
        allPermision: ListTinhNang,
        oldAllPermisson: ListTinhNang,
      });
    } else {
      setState({
        allPermision: [],
      });
    }
  }, [state.listAllQuyen, ListTinhNang]);
  const filterByPermission = (e) => {
    const { value } = e.target;
    const filterData = !value
      ? listAllQuyen
      : listAllQuyen.filter(
          (item) => item.ten?.toLowerCase().unsignText().indexOf(value) >= 0
        );
    setState({
      listAllQuyen: filterData,
    });
  };

  const onCheckAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      const listAllPermissonSelectd = [];
      state.allPermision.forEach((tinhNang) => {
        if (tinhNang?.permision?.length) {
          tinhNang.permision.forEach((per) => {
            listAllPermissonSelectd.push(per.id);
          });
        }
      });
      setState({
        isCheckedAll: true,
        addedDisabledOk: false,
        dsQuyenId: listAllPermissonSelectd,
        inValidRoles: false,
      });
    } else {
      setState({
        isCheckedAll: false,
        addedDisabledOk: false,
        dsQuyenId: [],
        inValidRoles: true,
      });
    }
  };

  const onChangeAllPermission = (e) => {
    const { value, checked } = e.target;
    const listPer = state.allPermision.find((item) => item.id == value);
    if (checked) {
      const per = listPer.permision.map((item) => item.id);
      const newPer = [...state.dsQuyenId, ...per];
      setState({
        isCheckedAll: listAllQuyen.length === newPer.length ? true : false,
        // isCheckedAll: true,
        dsQuyenId: newPer,
        inValidRoles: ![...state.dsQuyenId, ...per]?.length,
        addedDisabledOk: false,
      });
    } else {
      const per = listPer.permision.map((item) => item.id);
      const newPerssion = state.dsQuyenId.filter((item) => {
        return !per.some((e) => e == item);
      });
      setState({
        isCheckedAll: false,
        dsQuyenId: newPerssion,
        addedDisabledOk: false,
        inValidRoles: !newPerssion?.length,
      });
    }
  };

  const onChangeOnePermisson = (e) => {
    const { value, checked } = e.target;
    if (!checked) {
      const newPermisson = state.dsQuyenId.filter((per) => per !== value);
      setState({
        isCheckedAll: false,
        dsQuyenId: newPermisson,
        addedDisabledOk: false,
        inValidRoles: !newPermisson?.length,
      });
    } else {
      const newPermisson = [...state.dsQuyenId, value];
      setState({
        isCheckedAll:
          listAllQuyen.length === newPermisson.length ? true : false,
        dsQuyenId: newPermisson,
        addedDisabledOk: false,
        inValidRoles: ![...state.dsQuyenId, value]?.length,
      });
    }
  };

  const renderForm = () => {
    return (
      <>
        <Form.Item
          label="Mã vai trò"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã vai trò!",
            },
            {
              max: 50,
              message: "Vui lòng nhập mã vai trò không quá 50 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã vai trò!",
            },
          ]}
        >
          <Input
            ref={refAutoFocus}
            className="input-option"
            placeholder="Vui lòng nhập mã vai trò"
          />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="moTa"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập mô tả không quá 1000 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mô tả!",
            },
          ]}
        >
          <Input className="input-option" placeholder="Vui lòng nhập mô tả" />
        </Form.Item>
        <Form.Item
          label="Tên vai trò"
          name="ten"
          rules={[
            {
              max: 1000,
              message: "Vui lòng nhập tên vai trò không quá 1000 ký tự!",
            },
            {
              required: true,
              message: "Vui lòng nhập tên vai trò!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên vai trò"
          />
        </Form.Item>
        {state.editStatus && (
          <Form.Item label=" " name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
        {inValidRoles && (
          <div style={{ width: "100%", color: "red", marginLeft: 25 }}>
            Vui lòng chọn quyền!
          </div>
        )}
        <div
          className="permission-action"
          style={inValidRoles ? { border: "1px solid red" } : {}}
        >
          <div className="header-permission">Quyền được gán</div>
          <div className="content-permission">
            <div className="action-filter addition-box">
              <div className="check">
                {/* <Checkbox onChange={onCheckAll} checked={state.isCheckedAll} /> */}
                <Checkbox
                  onChange={onCheckAll}
                  checked={
                    state.dsQuyenId?.length === state.arrAllPermision.length
                  }
                />
                <span> Chọn tất cả</span>
              </div>
              <div className="select addition-box">
                <Select
                  data={ListTinhNang}
                  mode="multiple"
                  placeholder="Chọn nhóm tính năng"
                  onChange={filterByGroup}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="select addition-box">
                <div className="input-box">
                  <img src={imgSearch} alt="imgSearch" />
                  <Input
                    placeholder="Tìm kiếm quyền"
                    onChange={filterByPermission}
                  />
                </div>
              </div>
            </div>
            <div className="list-func">
              {state.allPermision.map((item, index) => {
                if (item?.permision?.length) {
                  return (
                    <CheckBoxVt
                      key={index}
                      permision={item}
                      values={state.dsQuyenId}
                      onChangeAllPermission={onChangeAllPermission}
                      onChangeOnePermisson={onChangeOnePermisson}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Main>
      <BaseDmWrap
        listLink={[
          { title: t("danhMuc.quanTriHeThong"), link: "/quan-tri" },
          {
            title: t("danhMuc.danhMucVaiTro"),
            link: "/quan-tri/danh-muc-vai-tro",
          },
        ]}
        titleMain="vai trò hệ thống"
        getColumns={getColumns}
        renderForm={renderForm}
        roleSave={ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_THEM}
        roleEdit={ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_SUA}
        storeName="adminVaiTroHeThong"
        onShowUpdate={onShowUpdate}
        onCancel={onCancel}
        beforeSubmit={beforeSubmit}
        afterSubmit={afterSubmit}
        onReset={onReset}
        isSubmit={isSubmit}
        addedDisabledOk={state.addedDisabledOk}
        onExport={onExport}
        onImport={onImport}
      />
    </Main>

    // <BaseDm3
    //   breadcrumb={[
    //     { title: t("danhMuc.quanTriHeThong"), link: "/quan-tri" },
    //     {
    //       title: t("danhMuc.danhMucVaiTro"),
    //       link: "/quan-tri/danh-muc-vai-tro",
    //     },
    //   ]}
    // >
    //   <Main>
    //     <Col
    //       {...(!state.showFullTable
    //         ? collapseStatus
    //           ? TABLE_LAYOUT_COLLAPSE
    //           : TABLE_LAYOUT
    //         : null)}
    //       span={state.showFullTable ? 24 : null}
    //       className={`pr-3 ${
    //         state.changeShowFullTbale ? "" : "transition-ease"
    //       }`}
    //       style={{ display: "flex", flexDirection: "column" }}
    //     >
    //       <TableWrapper
    //         title="Danh mục vai trò"
    //         scroll={{ x: 1000 }}
    //         classNameRow={"custom-header"}
    //         styleMain={{ marginTop: 0 }}
    //         styleContainerButtonHeader={{
    //           display: "flex",
    //           width: "100%",
    //           justifyContent: "flex-end",
    //           alignItems: "center",
    //           paddingRight: 35,
    //         }}
    //         buttonHeader={
    //           checkRole([ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_THEM])
    //             ? [
    //                 {
    //                   type: "create",
    //                   title: "Thêm mới [F1]",
    //                   onClick: handleClickedBtnAdded,
    //                   buttonHeaderIcon: (
    //                     <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
    //                   ),
    //                 },
    //                 {
    //                   className: `btn-change-full-table ${
    //                     state?.showFullTable ? "small" : "large"
    //                   }`,
    //                   title: (
    //                     <Icon
    //                       component={state.showFullTable ? thuNho : showFull}
    //                     />
    //                   ),
    //                   onClick: handleChangeshowTable,
    //                 },

    //                 {
    //                   className: "btn-collapse",
    //                   title: (
    //                     <Icon
    //                       component={
    //                         collapseStatus ? extendTable : extendChiTiet
    //                       }
    //                     />
    //                   ),
    //                   onClick: handleCollapsePane,
    //                 },
    //               ]
    //             : [
    //                 {
    //                   className: `btn-change-full-table ${
    //                     state?.showFullTable ? "small" : "large"
    //                   }`,
    //                   title: (
    //                     <Icon
    //                       component={state.showFullTable ? thuNho : showFull}
    //                     />
    //                   ),
    //                   onClick: handleChangeshowTable,
    //                 },
    //                 {
    //                   className: "btn-collapse",
    //                   title: (
    //                     <Icon
    //                       component={
    //                         collapseStatus ? extendTable : extendChiTiet
    //                       }
    //                     />
    //                   ),
    //                   onClick: handleCollapsePane,
    //                 },
    //               ]
    //         }
    //         columns={columns}
    //         dataSource={listData}
    //         onRow={onRow}
    //         layerId={refLayerHotKey.current}
    //         dataEditDefault={dataEditDefault}
    //         // rowKey={(record) => record.id}
    //         // rowClassName={setRowClassName}
    //       />
    //       {!!totalElements ? (
    //         <Pagination
    //           onChange={onChangePage}
    //           current={page + 1}
    //           pageSize={size}
    //           listData={listData}
    //           total={totalElements}
    //           onShowSizeChange={onSizeChange}
    //           style={{ flex: 1, justifyContent: "flex-end" }}
    //         />
    //       ) : null}
    //     </Col>
    //     {!state.showFullTable && (
    //       <Col
    //         {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
    //         className={`mt-3 h-100 ${
    //           state.changeShowFullTbale ? "" : "transition-ease"
    //         }`}
    //         style={
    //           state.isSelected
    //             ? { border: "2px solid #c1d8fd", borderRadius: 20 }
    //             : {}
    //         }
    //       >
    //         <CreatedWrapper
    //           title="Thông tin chi tiết"
    //           onCancel={handleCancel}
    //           cancelText="Hủy"
    //           onOk={handleAdded}
    //           okText="Lưu [F4]"
    //           roleSave={[ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_THEM]}
    //           roleEdit={[ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_SUA]}
    //           editStatus={state.editStatus}
    //           layerId={refLayerHotKey.current}
    //         >
    //           <FormWraper
    //             disabled={
    //               state.editStatus
    //                 ? !checkRole([
    //                     ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_SUA,
    //                   ])
    //                 : !checkRole([
    //                     ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_THEM,
    //                   ])
    //             }
    //             form={form}
    //             layout="vertical"
    //             style={{ width: "100%" }}
    //             className="form-custom"
    //           >

    //         </CreatedWrapper>
    //       </Col>
    //     )}
    //   </Main>
    // </BaseDm3>
  );
};

const mapStateToProps = ({
  quyen: { listAllQuyen },
  nhomTinhNang: { listAllData: ListTinhNang },
}) => {
  return {
    listAllQuyen,
    ListTinhNang,
  };
};
const mapDispatchToProps = ({
  quyen: { getListAllQuyen },
  nhomTinhNang: { onGetAll },
  adminVaiTroHeThong: { onExport, onImport },
}) => ({
  getListAllQuyen,
  getNhomTinhNang: onGetAll,
  onExport,
  onImport,
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPermission);
