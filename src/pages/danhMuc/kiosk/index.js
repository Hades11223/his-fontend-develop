import { Col, Form } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import DanhSach from "pages/danhMuc/kiosk/components/DanhSach";
import ChiTiet from "pages/danhMuc/kiosk/components/ChiTiet";
import { Main } from "./styled";
import { HomeWrapper } from "components";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import stringUtils from "mainam-react-native-string-utils";

const Kiosk = () => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

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
    <Main>
      <HomeWrapper title="Danh mục">
        <Col
          {...(!state.showFullTable
            ? collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          span={state.showFullTable ? 24 : null}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <DanhSach
            handleChangeshowTable={handleChangeshowTable}
            handleCollapsePane={handleCollapsePane}
            collapseStatus={collapseStatus}
            form={form}
            stateParent={state}
            setStateParent={setState}
            layerId={refLayerHotKey.current}
          ></DanhSach>
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 h-100 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
          >
            <ChiTiet
              form={form}
              collapseStatus={collapseStatus}
              stateParent={state}
              setStateParent={setState}
              layerId={refLayerHotKey.current}
            ></ChiTiet>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

export default Kiosk;
