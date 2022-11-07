import { Col, DatePicker, message, Row } from "antd";
import { ModalTemplate, Button } from "components";
import Select from "components/Select";
import { ENUM } from "constants/index";
import { useEnum, useStore } from "hook";
import moment from "moment";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ElementFilter from "components/common/ElementFilter";
import { useTranslation } from "react-i18next";

const ModalPhieuLinhBu = (props, ref) => {
  const { t } = useTranslation();

  const listKhoaTheoTaiKhoan = useStore("khoa.listKhoaTheoTaiKhoan", []);
  const listKhoUser = useStore("kho.listKhoUser", []);
  const listKhoCha = useStore("kho.listKhoCha", []);
  const khoIdDefault = useStore("phieuNhapXuat.thongTinPhieu.khoId");
  const {
    khoa: { getKhoaTheoTaiKhoan },
    kho: { getListKhoCha },
    nhapKho: { taoPhieuLinhBu },
    phieuNhapXuat: { guiDuyetPhieu },
  } = useDispatch();

  const [listLoaiDichVu] = useEnum(ENUM.LOAI_DICH_VU);
  const refModal = useRef(null);
  const refElementFilter = useRef(null);

  const history = useHistory();
  const [state, _setState] = useState({
    initState: {
      loaiDichVu: 90,
      // khoId, // kho chọn trong modal chọn kho
      tuThoiGian: moment().set("hour", 0).set("minute", 0).set("second", 0),
      denThoiGian: moment().set("hour", 23).set("minute", 59).set("second", 59),
    },
    listKhoTuTruc: [],
  });
  const khoId = state.initState.khoId;
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const setInitState = (key, value) => {
    setState({ initState: { ...state.initState, [key]: value } });
  };

  useImperativeHandle(ref, () => ({
    show: ({ khoId: selectKhoId } = {}) => {
      setState({ show: true });
      if (listKhoUser.length > 0) {
        onSelectLoaiDV(90); // mặc định loại thuốc
        setInitState("khoId", selectKhoId || khoIdDefault); // chọn kho mặc định
        getListKhoCha({
          khoTrucThuocId: selectKhoId || khoIdDefault,
          dsLoaiDichVu: [90],
        });
      }
      getKhoaTheoTaiKhoan({});
    },
  }));

  const onSelectLoaiDV = (loaiDV, onChange) => {
    const listKhoTuTruc = listKhoUser.filter(
      (item) =>
        item?.dsLoaiDichVu?.some((loai) => loai === loaiDV) && //Có loại kho tương ứng với loại DV
        item?.dsCoCheDuTru?.some((coChe) => coChe === 20) // Cơ chế dự trù/lĩnh bù = Tạo phiếu lĩnh bù
    );
    setState({ listKhoTuTruc });
    const __callback = onChange
      ? onChange("khoId")
      : (khoId) => setInitState({ khoId });

    const defaultKhoId = listKhoTuTruc.some((item) => item.id === khoId);
    __callback(defaultKhoId ? khoId : undefined);
    if (defaultKhoId) {
      getListKhoCha({ khoTrucThuocId: khoId, dsLoaiDichVu: [loaiDV] });
    }
  };

  useEffect(() => {
    if (listKhoaTheoTaiKhoan.length > 0) {
      setInitState("dsKhoaChiDinhId", [listKhoaTheoTaiKhoan[0].id]);
    }
  }, [listKhoaTheoTaiKhoan, listKhoUser]);

  const customChange = (key, onChange, _state) => (value) => {
    if (key === "loaiDichVu") {
      onSelectLoaiDV(value, onChange);
      onChange("khoDoiUngId")();
    }
    if (key === "khoId") {
      getListKhoCha({
        khoTrucThuocId: value,
        dsLoaiDichVu: [_state.loaiDichVu],
      });
    }
    onChange(key)(value);
  };

  const onCancel = () => {
    setState({ show: false });
  };

  const renderFilter = ({ _state, onChange }) => {
    return (
      <Row>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              Loại DV<span className="icon-required">*</span>
            </label>
            <Select
              onChange={customChange("loaiDichVu", onChange, _state)}
              value={_state.loaiDichVu}
              className="input-filter"
              placeholder={"Chọn loại DV"}
              data={listLoaiDichVu.filter((loai) =>
                [90, 100, 110].some((a) => a === loai.id)
              )}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              Khoa chỉ định<span className="icon-required">*</span>
            </label>
            <Select
              onChange={onChange("dsKhoaChiDinhId")}
              value={_state.dsKhoaChiDinhId}
              mode="multiple"
              className="input-filter"
              placeholder={"Chọn khoa chỉ định"}
              data={listKhoaTheoTaiKhoan}
            />
          </div>
        </Col>

        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              Kho tủ trực<span className="icon-required">*</span>
            </label>
            <Select
              onChange={customChange("khoId", onChange, _state)}
              value={_state.khoId}
              className="input-filter"
              placeholder={"Chọn kho tủ trực"}
              data={state.listKhoTuTruc}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              Kho xuất<span className="icon-required">*</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn kho xuất"}
              onChange={onChange("khoDoiUngId")}
              value={_state.khoDoiUngId}
              data={listKhoCha}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
              Từ ngày
              <span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime
              value={_state.tuThoiGian}
              onChange={onChange("tuThoiGian")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-date">
            <label className="label-filter">
              Đến ngày<span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime
              value={_state.denThoiGian}
              onChange={onChange("denThoiGian")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
            />
          </div>
        </Col>
      </Row>
    );
  };

  const hrefTo = (id) => {
    setTimeout(() => {
      history.push(`/kho/nhap-kho/chi-tiet-linh-bu/${id}`);
    }, 1000);
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onSubmit = (type) => () => {
    refElementFilter.current &&
      refElementFilter.current.submit(async (data) => {
        try {
          if (!data.loaiDichVu) {
            message.error("Vui lòng chọn loại dịch vụ");
            return;
          }
          if (data.dsKhoaChiDinhId?.length === 0) {
            message.error("Vui lòng chọn khoa chỉ định");
            return;
          }
          if (!data.khoId) {
            message.error("Vui lòng chọn kho tủ trực");
            return;
          }
          if (!data.khoDoiUngId) {
            message.error("Vui lòng chọn kho xuất");
            return;
          }
          if (!data.tuThoiGian) {
            message.error("Vui lòng chọn từ ngày");
            return;
          }
          if (!data.denThoiGian) {
            message.error("Vui lòng chọn đến ngày");
            return;
          }
          setState({ loading: true });
          const res = await taoPhieuLinhBu({ ...data, loaiNhapXuat: 80 });
          if (type === 1) {
            const onSucess = () => {
              hrefTo(res.data?.id);
            };
            const final = () => {
              setState({ loading: false });
            };
            await guiDuyetPhieu({
              id: res?.data?.id,
              message: "Tạo mới và gửi duyệt phiếu thành công",
              onSucess,
              final,
            });
            onCancel();
          } else {
            message.success("Tạo mới phiếu thành công");
            hrefTo(res.data?.id);
          }
        } catch (e) {
          message.error(e?.message);
        } finally {
          setState({ loading: false });
        }
      });
  };

  return (
    <ModalTemplate
      ref={refModal}
      visible={state.visible}
      onCancel={onCancel}
      width={800}
      title="Phiếu lĩnh bù tủ trực"
      actionRight={
        <>
          <Button
            type={"primary"}
            onClick={onSubmit(0)}
            loading={state.isLoading}
          >
            Tạo phiếu
          </Button>
          <Button
            type={"primary"}
            onClick={onSubmit(1)}
            loading={state.isLoading}
          >
            Tạo và gửi duyệt
          </Button>
        </>
      }
    >
      <ElementFilter
        description={"Chọn các điều kiện để tạo phiếu lĩnh bù"}
        renderFilter={renderFilter}
        ref={refElementFilter}
        initState={state.initState}
      />
    </ModalTemplate>
  );
};

export default forwardRef(ModalPhieuLinhBu);
