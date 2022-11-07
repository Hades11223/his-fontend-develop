import { Row, Tooltip } from "antd";
import React, { useRef } from "react";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import "./styled.css";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";
import { ModalNotification2 } from "components/ModalConfirm";

const TimKiem = (props) => {
  const refModalDelete = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const { deleteById } = useDispatch().danhSachHoSoBaoHiem79A46QD4201;
  const onDelete = () => {
    refModalDelete.current &&
      refModalDelete.current.show(
        {
          title: "Xoá dữ liệu",
          content: `Bạn chắc chắn muốn xóa ${id}?`,
          cancelText: "Quay lại",
          okText: "Đồng ý",
          classNameOkText: "button-error",
          showBtnOk: true,
        },
        async () => {
          await deleteById({ id });
          history.push(
            "/quyet-toan-bhyt/danh-sach-ho-so-bao-hiem-79a-46cot-theo-qd4210"
          );
        },
        () => {}
      );
  };
  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>
              Chi tiết hồ sơ giám định BH mẫu 79A 46 cột QĐ4210
              <img
                style={{ marginLeft: 10, cursor: "pointer" }}
                src={require("assets/images/utils/delete-blue.png")}
                title="Xóa hồ sơ"
                onClick={onDelete}
                alt={require("assets/images/utils/delete-blue.png")}
              />
              <Tooltip title="In hồ sơ" placement="bottom">
                <img
                  style={{ marginLeft: 10, cursor: "pointer" }}
                  src={require("assets/images/utils/print-blue.png")}
                  alt={"..."}
                />
              </Tooltip>
            </label>
          </div>
        </Row>
      </Row>
      <ModalNotification2 ref={refModalDelete} />
    </Main>
  );
};

export default TimKiem;
