import React from "react";
import { Checkbox, Form, Image, Input, Tooltip } from "antd";
import { HeaderSearch, Select, TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import { HIEU_LUC, ROLES } from "constants/index";
import useListAll from "hook/useListAll";
import { useEnum } from "hook";

const { ColumnDm, ColumnSelect, ColumnInput } = TableWrapper;

const QuanLyThongBao = (props) => {
  const [listAllKhoa] = useListAll("khoa", { active: true });
  const [listAllPhong] = useListAll("phong", { acitve: true });
  const [listAllToaNha] = useListAll("toaNha", { acitve: true });
  const [listAllChucVu] = useListAll("chucVu", { acitve: true });
  const [listAllVaiTro] = useListAll("adminVaiTroHeThong", { acitve: true });

  const listAll = {
    listAllKhoa,
    listAllPhong,
    listAllToaNha,
    listAllChucVu,
    listAllVaiTro,
  };

  const [listloaiThongBao] = useEnum("loaiThongBao", []);

  const renderDsCol = ({ title, ten, ...rest }) =>
    ColumnSelect({
      title,
      dataIndex: "ds" + ten,
      searchKey: `ds${ten}Id`,
      sort_key: `ds${ten}Id`,
      width: 200,
      dataSelect: listAll[`listAll${ten}`],
      // selectSearch: true,
      // renderSearch: (
      //   <Select
      //     mode="multiple"
      //     showArrow
      //     placeholder="Tìm kiếm"
      //     data={listAll[`listAll${ten}`]}
      //     onChange={(value) => {
      //       onSearchInput(value, `ds${ten}Id`);
      //     }}
      //   />
      // ),
      render: (item) => {
        return item && item.length > 0 && item.map((e) => e?.ten).join(",");
      },
      ...rest,
    });

  const getColumns = ({ baseColumns = {}, handleDeleteItem, ...rest }) => [
    baseColumns.stt,
    ColumnInput({
      title: "Nội dung thông báo",
      dataIndex: "noiDung",
      width: 350,
      ...rest,
    }),
    ColumnSelect({
      title: "Loại thông báo",
      dataIndex: "loaiThongBao",
      width: 150,
      dataSelect: listloaiThongBao,
      render: (item) => {
        if (item) {
          return (
            listloaiThongBao?.filter((e) => {
              return item === e.id;
            })[0] || {}
          ).ten;
        }
      },
      ...rest,
    }),
    renderDsCol({
      title: "Vai trò",
      ten: "VaiTro",
      ...rest,
    }),
    renderDsCol({
      title: "Khoa",
      ten: "Khoa",
      ...rest,
    }),
    renderDsCol({
      title: "Phòng",
      ten: "Phong",
      ...rest,
    }),
    renderDsCol({
      title: "Chức vụ",
      ten: "ChucVu",
      ...rest,
    }),
    renderDsCol({
      title: "Nhà",
      ten: "ToaNha",
      ...rest,
    }),
    baseColumns.active,
    {
      title: <HeaderSearch title="Tiện ích" />,
      width: 80,
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, item) => {
        return (
          <Tooltip title="Xóa thông báo" placement="bottom">
            <Image
              className="ig-e-onRow" // ignore event onrow
              preview={false}
              src={require("assets/images/his-core/iconDelete.png")}
              onClick={() => {
                handleDeleteItem(item);
              }}
            />
          </Tooltip>
        );
      },
    },
  ];

  const renderForm = ({ editStatus, refAutoFocus, form }) => {
    return (
      <>
        <div style={{ width: "100%" }}>
          <Form.Item
            label="Nội dung"
            name="noiDung"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung",
              },
              {
                max: 1500,
                message: "Vui lòng nhập nội dung không quá 1500 ký tự!",
              },
            ]}
          >
            <Input.TextArea
              ref={refAutoFocus}
              placeholder="Vui lòng nhập nội dung"
              maxLength={1500}
              rows={10}
              showCount
            />
          </Form.Item>
        </div>

        <div style={{ width: "50%" }}>
          <Form.Item
            label="Loại thông báo"
            name="loaiThongBao"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn loại thông báo",
              },
            ]}
          >
            <Select data={listloaiThongBao} placeholder="Chọn loại" />
          </Form.Item>

          <Form.Item label="Khoa" name="dsKhoaId" style={{ width: "100%" }}>
            <Select
              mode="multiple"
              showArrow
              data={listAllKhoa}
              placeholder="Chọn khoa"
            />
          </Form.Item>

          <Form.Item label="Phòng" name="dsPhongId" style={{ width: "100%" }}>
            <Select
              mode="multiple"
              showArrow
              data={listAllPhong}
              placeholder="Chọn phòng"
            />
          </Form.Item>
          {editStatus && (
            <Form.Item name="active" valuePropName="checked">
              <Checkbox>Có hiệu lực</Checkbox>
            </Form.Item>
          )}
        </div>
        <div style={{ width: "50%" }}>
          <Form.Item
            label="Vai trò"
            name="dsVaiTroId"
            style={{ width: "100%" }}
          >
            <Select
              mode="multiple"
              showArrow
              data={listAllVaiTro}
              placeholder="Chọn vai trò"
            />
          </Form.Item>
          <Form.Item
            label="Chức vụ"
            name="dsChucVuId"
            style={{ width: "100%" }}
          >
            <Select
              mode="multiple"
              showArrow
              data={listAllChucVu}
              placeholder="Chọn chức vụ"
            />
          </Form.Item>

          <Form.Item label="Nhà" name="dsNhaId" style={{ width: "100%" }}>
            <Select
              mode="multiple"
              showArrow
              data={listAllToaNha}
              placeholder="Chọn nhà"
            />
          </Form.Item>
        </div>
      </>
    );
  };

  const mapToForm = (data) => ({
    ...data,
    ...["dsKhoaId", "dsPhongId", "dsNhaId", "dsVaiTroId", "dsChucVuId"].reduce(
      (acc, item) => ({ ...acc, [item]: data[item] ? data[item] : [] }),
      {}
    ),
  });

  return (
    // <Main>
    //   <HomeWrapper title="Quản lý thông báo">
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
    //     >
    //       <TableWrapper
    //         title="Quản lý thông báo"
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
    //           checkRole([ROLES["QUAN_LY_THONG_BAO"].QUYEN_THEM])
    //             ? [
    //                 {
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
    //         dataSource={data}
    //         onRow={onRow}
    //         rowClassName={(record, index) => {
    //           if (dataEditDefault.id === record.id) {
    //             return "row-edit row-id-" + record.id;
    //           } else return "row-id-" + record.id;
    //         }}
    //       ></TableWrapper>
    //       {totalElements && (
    //         <Pagination
    //           onChange={onPageChange}
    //           current={page + 1}
    //           pageSize={size}
    //           listData={data}
    //           total={totalElements}
    //           onShowSizeChange={onSizeChange}
    //           style={{ flex: 1, justifyContent: "flex-end" }}
    //         />
    //       )}
    //     </Col>
    //     {!state.showFullTable && (
    //       <Col
    //         {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
    //         className={`mt-3 ${
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
    //           roleSave={[ROLES["QUAN_LY_THONG_BAO"].QUYEN_THEM]}
    //           roleEdit={[ROLES["QUAN_LY_THONG_BAO"].QUYEN_SUA]}
    //           okText="Lưu [F4]"
    //           editStatus={editStatus}
    //         >
    //           <FormWraper
    //             form={form}
    //             layout="vertical"
    //             style={{ width: "100%" }}
    //             className="form-custom"
    //             disabled={
    //               editStatus
    //                 ? !checkRole([ROLES["QUAN_LY_THONG_BAO"].QUYEN_SUA])
    //                 : !checkRole([ROLES["QUAN_LY_THONG_BAO"].QUYEN_THEM])
    //             }
    //           ></FormWraper>
    //         </CreatedWrapper>
    //       </Col>
    //     )}
    //   </HomeWrapper>
    // </Main>
    <BaseDmWrap
      listLink={[
        {
          link: "/quan-ly-thong-bao",
          title: "Quản lý thông báo",
        },
      ]}
      titleTable="Quản lý thông báo"
      titleMain="thông báo"
      getColumns={getColumns}
      renderForm={renderForm}
      roleSave={ROLES["QUAN_LY_THONG_BAO"].QUYEN_THEM}
      roleEdit={ROLES["QUAN_LY_THONG_BAO"].QUYEN_SUA}
      // classNameForm={"form-custom--one-line"}
      storeName="thongBao"
      mapToForm={mapToForm}
    />
  );
};

export default QuanLyThongBao;
