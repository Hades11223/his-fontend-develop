import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Main, ModalStyled, CircleKhoaStyled } from "./styled";
import DanhSachPG from "./DanhSachPG";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RightOutlined, BoxPlotOutlined } from "@ant-design/icons";
import ModalDanhSachNguoiBenh from "./components/DanhSachNguoiBenh";
import ModalThemMoiPhongGiuong from "./components/ModalThemMoiPhongGiuong";
import { MODE_FILTER_GIUONG } from "constants/index";

const ModalSoDoPhongGiuong = (props, ref) => {
  const refModalDanhSachNguoiBenh = useRef(null);
  const refModalThemMoiPhongGiuong = useRef(null);
  const {
    soDoPhongGiuong: { getNbSlTheoKhoa, updateDataSearch, resetDataSearch },
  } = useDispatch();

  const {
    soDoPhongGiuong: { nbSlTheoKhoa, dataSearch },
    khoa: { listDataTongHop },
    phong: { listRoom },
  } = useSelector((state) => state);

  const [state, _setState] = useState({
    show: false,
  });

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
      });
    },
  }));

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onClose = () => {
    resetDataSearch();
    setState({ show: false });
  };

  useEffect(() => {
    if (dataSearch.khoaId) {
      getNbSlTheoKhoa({ khoaId: dataSearch.khoaId });
    }
  }, [dataSearch.khoaId]);

  function onSelectPhong(item) {
    return () => {
      updateDataSearch({ phongId: item?.id });
    };
  }

  function onShowDsNb(_data) {
    return () => {
      refModalDanhSachNguoiBenh.current &&
        refModalDanhSachNguoiBenh.current.show(_data);
    };
  }

  function onThemMoiPG(_data) {
    return () => {
      refModalThemMoiPhongGiuong.current &&
        refModalThemMoiPhongGiuong.current.show(_data);
    };
  }

  function filterGiuong(_filterMode) {
    return () => {
      updateDataSearch({
        filterMode: _filterMode,
      });
    };
  }

  return (
    <ModalStyled
      width={"95%"}
      visible={state.show}
      footer={null}
      onCancel={onClose}
    >
      <Main>
        <Row>
          <Col span={3} className="left-panel">
            <div className="khoa-info">
              <CircleKhoaStyled>
                {listDataTongHop.find((x) => x.id === dataSearch.khoaId)?.ten ||
                  ""}
              </CircleKhoaStyled>
            </div>
            <div className="khoa-giuong-info">
              <div>
                <a
                  className={
                    dataSearch?.filterMode === MODE_FILTER_GIUONG.ALL &&
                    "selected"
                  }
                  onClick={filterGiuong(MODE_FILTER_GIUONG.ALL)}
                >
                  <b>{nbSlTheoKhoa.slGiuong}</b> giường |{" "}
                  <b>{nbSlTheoKhoa.slPhong}</b> phòng
                </a>
              </div>
              <div>
                <a
                  className={
                    dataSearch?.filterMode === MODE_FILTER_GIUONG.EMPTY &&
                    "selected"
                  }
                  onClick={filterGiuong(MODE_FILTER_GIUONG.EMPTY)}
                >
                  <b>{nbSlTheoKhoa.slGiuongTrong}</b> giường trống
                </a>
              </div>
              <div>
                <a
                  className={
                    dataSearch?.filterMode === MODE_FILTER_GIUONG.EXIST &&
                    "selected"
                  }
                  onClick={filterGiuong(MODE_FILTER_GIUONG.EXIST)}
                >
                  <b>{nbSlTheoKhoa.slNb}</b> người bệnh
                </a>
              </div>
            </div>

            <div className="left-panel-ds-pg">
              {(listRoom || []).map((item) =>
                item.id === dataSearch.phongId ? (
                  <div
                    className="left-panel-ds-pg-selected-item"
                    key={item.id}
                    onClick={onSelectPhong(item)}
                  >
                    <div className="left-panel-ds-pg-selected-item-icon">
                      <BoxPlotOutlined />
                    </div>
                    <div className="left-panel-ds-pg-selected-item-label">
                      {item.ten}
                    </div>
                    <div className="left-panel-ds-pg-selected-item-arrow">
                      <RightOutlined />
                    </div>
                  </div>
                ) : (
                  <div
                    className="left-panel-ds-pg-item"
                    key={item.id}
                    onClick={onSelectPhong(item)}
                  >
                    <div className="left-panel-ds-pg-item-label">
                      {item.ten}
                    </div>
                  </div>
                )
              )}
            </div>
          </Col>
          <Col span={21}>
            <DanhSachPG onShowDsNb={onShowDsNb} onThemMoiPG={onThemMoiPG} />
          </Col>
        </Row>

        <ModalDanhSachNguoiBenh ref={refModalDanhSachNguoiBenh} />
        <ModalThemMoiPhongGiuong ref={refModalThemMoiPhongGiuong} />
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalSoDoPhongGiuong);
