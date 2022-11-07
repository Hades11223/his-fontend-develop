import { Row } from "antd";
import { Button, ModalTemplate, Select } from "components";
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import ModalChonLoaiPhieu from "../ModalChonLoaiPhieu";
import { Main } from "./styled";

const ModalChonKho = forwardRef((props, ref) => {
  const refOk = useRef(null);
  const refModal = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (data, onOk) => {
      const { listKhoUser } = data;
      setState({ show: true, listKhoUser });
      refOk.current = onOk;
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onCancel = () => {
    setState({ show: false });
  };

  const onOk = () => {
    if (state.khoId) {
      if (refOk.current) refOk.current(state.khoId, state.showLinhBu);
      setState({ show: false });
    }
  };

  return (
    <ModalTemplate
      width={378}
      ref={refModal}
      onCancel={onCancel}
      title="Chọn kho nhập"
      actionRight={
        <Button type="primary" onClick={onOk}>
          Xác nhận
        </Button>
      }
    >
      <Main>
        <Row className="container">
          <Row className="content">
            <Row className="info-content">
              <label>Kho nhập</label>
              <Select
                style={{ width: "100%" }}
                data={state.listKhoUser}
                onSelect={(e, item) => {
                  const value = e.target ? e.target?.value : e;
                  setState({
                    khoId: value,
                    showLinhBu: item.lists?.dsCoCheDuTru?.some(
                      (item) => item === 20
                    ),
                  });
                }}
              />
              {!state.khoId && <div className="error">Chọn kho nhập</div>}
            </Row>
          </Row>
        </Row>
      </Main>
    </ModalTemplate>
  );
});

const ModalChonPhieuNhap = forwardRef(
  ({ onSelectPhieuLinhBu = () => {} }, ref) => {
    const refExternal = useRef(null);
    const refReserve = useRef(null);
    const refModalLoaiPhieu = useRef();
    const [state, _setState] = useState({
      show: false,
      showLinhBu: false,
    });
    const setState = (data = {}) => {
      _setState((state) => {
        return { ...state, ...data };
      });
    };
    useImperativeHandle(ref, () => ({
      show: ({ data, showLinhBu } = {}, onExternal, onReserve) => {
        setState({ showLinhBu, show: true, data });
        if (refModalLoaiPhieu.current) refModalLoaiPhieu.current.show();
        refExternal.current = onExternal;
        refReserve.current = onReserve;
      },
    }));
    const onCreateExternal = () => {
      setState({ show: false });
      if (refExternal.current) refExternal.current();
    };

    const onCreateReserve = () => {
      setState({ show: false });
      if (refReserve.current) refReserve.current();
    };

    const dataChonLoaiPhieu = [
      {
        id: 1,
        title: "Phiếu nhập dự trù",
        description: "Đề xuất dự trù hàng hóa vào kho",
      },
      ...(state?.data?.nhapTuNcc
        ? [
            {
              id: 2,
              title: "Phiếu nhập từ nhà cung cấp",
              description: "Nhập hàng hóa từ nhà cung cấp vào kho",
            },
          ]
        : []),
      ...(state.showLinhBu
        ? [
            {
              id: 3,
              title: "Phiếu lĩnh bù",
              description: "Tạo phiếu lĩnh bù bổ sung tủ trực",
            },
          ]
        : []),
    ];

    const onClick = (id) => {
      setState({ show: false });
      if (id === 1) {
        onCreateReserve();
      }
      if (id === 2) {
        onCreateExternal();
      }
      if (id === 3) {
        onSelectPhieuLinhBu();
      }
    };

    return (
      <ModalChonLoaiPhieu
        ref={refModalLoaiPhieu}
        title="Chọn loại phiếu nhập"
        data={dataChonLoaiPhieu}
        onClick={onClick}
      ></ModalChonLoaiPhieu>
      // <ModalStyled2
      //   width={665}
      //   footer={null}
      //   visible={state.show}
      //   onCancel={onCancel}
      //   closable={false}
      // >
      //   <Row className="container">
      //     <Row className="header">
      //       <h1>Chọn loại phiếu nhập</h1>
      //       <img src={IcClose} alt="..." onClick={onCancel}></img>
      //     </Row>
      //     <Row className="content">
      //       <Col xs={12}>
      //         <Button className="btn-accept" onClick={() => onCreateReserve()}>Phiếu nhập dự trù</Button>
      //       </Col>
      //       <Col xs={12}>
      //         <Button className="btn-accept" onClick={() => onCreateExternal()}>Phiếu nhập từ nhà cung cấp</Button>
      //       </Col>
      //     </Row>
      //   </Row>
      // </ModalStyled2>
    );
  }
);

export { ModalChonKho, ModalChonPhieuNhap };
