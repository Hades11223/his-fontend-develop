import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { connect } from "react-redux";
import {  Button } from "antd";
import { Element, scroller } from "react-scroll";
import ArrowLeft from "assets/images/khamBenh/arrow-left.png";
import ArrowRight from "assets/images/khamBenh/arrow-right.png";
import { Main } from "./styled";
import { FRAME_TITLE } from "../../configs";
const StepWrapper = ({
  customHeaderRight,
  children,
  elementKey,
  searchDv,
  listDvKham,
  updateData,
  listGoiDv,
  dataNb,
  auth
}) => {
  const [state, _setState] = useState({
    visible: false,
    listDichVu: [],
    listSelectedDv: [],
    listGoiDv: [],
    isCheckAll: false,
    indeterminate: false,
    loadingChiDinh: false,
    isGoiDichVu: false,
    thanhTien: 0,
    listAllDichVu: [],
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    const { listSelectedDv } = state;
    const listSelectedUniqueKey = listSelectedDv.map((item) => item.uniqueKey);
    const listDichVu = (listDvKham || []).map((item, index) => ({
      ...item,
      key: index,
      uniqueKey: `${item.id}-${item.dichVuId}`,
    }));
    setState({
      listDichVu,
      listAllDichVu: listDichVu,
      isCheckAll: listDichVu.every((item) =>
        listSelectedUniqueKey.includes(item.uniqueKey)
      ),
    });
  }, [listDvKham]);

  const disableChiDinh = useMemo(() => {
    return !dataNb?.dsCdChinh?.length && !dataNb?.cdSoBo;
  }, [dataNb?.id, dataNb?.cdSoBo]);

  useEffect(() => {
    if (dataNb?.cdSoBo !== null && dataNb?.cdSoBo !== "") {
      searchDv({});
    } else {
      updateData({
        listDvKham: [],
      });
    }
  }, [disableChiDinh, elementKey]);
  const onNavigate = (type) => {
    if (
      (elementKey === 0 && type === "previous") ||
      (elementKey === 1 && type === "next")
    ) {
      return;
    }

    const updateState = type === "previous" ? elementKey - 1 : elementKey + 1;

    scroller.scrollTo(updateState, {
      duration: 500,
      smooth: "easeInOutQuint",
      containerId: "containerElement",
    });
  };

  const onRenderFrameTitle = () => {
    return FRAME_TITLE[elementKey];
  };

  return (
    <Main>
      <div className="section-header">
        <div className="create-title">{onRenderFrameTitle()}</div>
      </div>
      <Element
        name="stepwrapper"
        className="element section-body"
        id="containerElement"
        style={{
          position: "relative",
          height: `calc(100vh - 630px)`,
          overflowY: "scroll",
        }}
      >
        {children}
      </Element>
      <div className="nav-bottom">
        <Button className="button-ok" onClick={() => onNavigate("previous")}>
          <img src={ArrowLeft} alt="" />
        </Button>
        <Button className="button-ok" onClick={() => onNavigate("next")}>
          <img src={ArrowRight} alt="" />
        </Button>
      </div>
    </Main>
  );
};
const mapStateToProps = (state) => {
  return {
    listDvKham: state.chiDinhDichVuCls.listDvKham || [],
    selectedLoaiDichVu: state.chiDinhDichVuCls.loaiDichVu,
    nbDotDieuTriId: state.choTiepDonDV?.nbDotDieuTriId,
    listGoiDv: state.chiDinhDichVuCls.listGoiDv,
    dataNb: state.chiDinhDichVuCls.dataNb,
    auth: state.auth.auth
  };
};
const mapDispatchToProps = ({
  chiDinhDichVuCls: {
    searchDv,
    tamTinhTien,
    chiDinhDichVu,
    getDsDichVuChiDinhXN,
    getDsDichVuChiDinhKham,
    getDsDichVuChiDinhCLS,
    updateData,
  },
}) => ({
  searchDv,
  tamTinhTien,
  chiDinhDichVu,
  getDsDichVuChiDinhXN,
  getDsDichVuChiDinhKham,
  getDsDichVuChiDinhCLS,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(StepWrapper);
