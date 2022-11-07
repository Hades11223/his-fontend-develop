import React, { useState } from "react";
import {
  ADD_LAYOUT,
  TABLE_LAYOUT,
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
} from "constants/index";
import { Col, Form } from "antd";
import DsMauKetQua from "./containers/DsMauKetQua";
import ThongTinDichVu from "./containers/thongTinDichVu";
import { Page } from "components";

const LoaiCapCuu = (props) => {
  const [form] = Form.useForm();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    editStatus: false,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
  const handleChangeshowTable = () => {
    setState({
      changeShowFullTbale: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTbale: false,
      });
    }, 1000);
  };
  return (
    <Page breadcrumb={[{ title: "Danh mục", link: "/danh-muc" }]}>
      <Col
        {...(!state.showFullTable
          ? collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT
          : null)}
        span={state.showFullTable ? 24 : null}
        className={`pr-3 ${state.changeShowFullTbale ? "" : "transition-ease"}`}
      >
        <DsMauKetQua
          handleChangeshowTable={handleChangeshowTable}
          handleCollapsePane={handleCollapsePane}
          collapseStatus={collapseStatus}
          stateParent={state}
          setStateParent={setState}
        />
      </Col>
      {!state.showFullTable && (
        <Col
          {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
          className={`mt-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <ThongTinDichVu
            form={form}
            stateParent={state}
            setStateParent={setState}
          />
        </Col>
      )}
    </Page>
  );
};

export default LoaiCapCuu;
