import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { ModalTemplate, Button } from "components";
import { message, Row } from "antd";
import { useDispatch } from "react-redux";
import { Main } from "./styled";
import InputTimeout from "components/InputTimeout";
import { LOAI_DICH_VU } from "constants/index.js";
import { useStore } from "hook";
import imgSearch from "assets/images/template/icSearch.png";
import TableSuatAn from "./TableSuatAn";

const DichVuSuatAn = (props, ref) => {
  const { t } = useTranslation();
  const { dataNb, chiDinhTuLoaiDichVu, refreshList } = props;
  const refModal = useRef(null);
  const refIsSubmit = useRef(null);
  const refTable = useRef();

  const { tamTinhTien, chiDinhDichVu, getListDichVuSuatAn } =
    useDispatch().chiDinhSuatAn;

  const dataSearch = useStore("chiDinhSuatAn.dataSearch", {});
  const [state, _setState] = useState({
    show: false,
    listSelectedDv: [],
    thanhTien: 0,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      show: (option = {}) => {
        setState({
          show: true,
          khoId: option?.khoId,
          filterText: "",
          dataSource: option?.dataSource || {},
          dataKho: option?.dataKho || [],
        });
        getListDichVuSuatAn({ dsLoaiDichVu: LOAI_DICH_VU.SUAT_AN, ten: "" });
        refIsSubmit.current = false;
        if (refTable.current) {
          refTable.current.onShow();
        }
      },
    }),
    [state.show]
  );

  useEffect(() => {
    if (!state.show) {
      setTimeout(() => refModal.current.hide(), 50);
    } else {
      refModal.current.show({});
    }
  }, [state.show]);

  const onTamTinhTien = (listSelected) => {
    const payload = listSelected.map((item) => ({
      nbDotDieuTriId: dataNb?.nbDotDieuTriId || dataNb?.id,
      nbDichVu: {
        dichVuId: item?.dichVuId,
        soLuong: item.soLuong || 1,
        dichVu: {
          id: item?.id,
          ma: item?.ma,
          ten: item?.ten,
          hamLuong: item?.hamLuong,
          tenHoatChat: item?.tenHoatChat,
        },
        khoaChiDinhId: dataNb?.khoaChiDinhId,
        chiDinhTuDichVuId: dataNb?.id,
        chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
      },
    }));
    tamTinhTien(payload).then((s) => {
      const thanhTien = (s || []).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.nbDichVu.thanhTien,
        0
      );
      const messageWarning = ((s || []).filter((x) => x.message) || []).reduce(
        (value, currentValue) => value.concat(currentValue.message + ", "),
        ""
      );
      if (messageWarning?.length) message.warning(messageWarning);
      setState({
        thanhTien: thanhTien,
        listSelectedDv: listSelected,
      });
    });
  };

  const onChangeInput = (e) => {
    let objSearch = {
      ten: e,
      dsLoaiDichVu: LOAI_DICH_VU.SUAT_AN,
    };

    getListDichVuSuatAn(objSearch);
  };

  const onSubmit = () => {
    if (refIsSubmit.current) return;
    const { listSelectedDv } = state;
    if (!listSelectedDv.length) {
      message.error("Yêu cầu nhập chỉ định dịch vụ!");
      return;
    }
    let checkSoLuong = listSelectedDv.some(
      (item) => !item.soLuong || item.soLuong === 0
    );
    if (checkSoLuong) {
      message.error("Trường bắt buộc điền: Số lượng");
      return;
    }

    const payload = listSelectedDv.map((item) => {
      return {
        loaiBuaAnId: item.loaiBuaAnId,
        nbDotDieuTriId: dataNb?.nbDotDieuTriId || dataNb?.id,
        dotXuat: item.dotXuat || false,
        nbDichVu: {
          dichVuId: item?.dichVuId,
          soLuong: item.soLuong,
          chiDinhTuDichVuId: dataNb?.id,
          chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
          khoaChiDinhId: dataNb?.khoaChiDinhId,
          loaiDichVu: item?.loaiDichVu,
          thoiGianThucHien: dataNb?.thoiGianYLenh,
        },
      };
    });
    refIsSubmit.current = true;

    chiDinhDichVu(payload)
      .then((s) => {
        let messageError = (s || []).filter(
          (item) => item.message && item.code !== 0
        );
        messageError?.length &&
          message.error(messageError.map((x) => x.message).join(","));

        refreshList();
        onCancel();
      })
      .catch(() => {
        refIsSubmit.current = false;
      });
  };

  const onCancel = () => {
    setState({
      show: false,
      thanhTien: 0,
      listSelectedDv: [],
    });
  };

  return (
    <ModalTemplate
      width={"95%"}
      ref={refModal}
      title={t("common.chiDinhSuatAn")}
      onCancel={onCancel}
      visible={state.show}
    >
      <Main>
        <Row className="content">
          <Row className="content-title">
            <span className="text">THÊM CHỈ ĐỊNH</span>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <div className="input-box">
              <img src={imgSearch} alt="imgSearch" />
              <InputTimeout
                style={{ width: "100%", height: 32, marginLeft: 0 }}
                className="input-header"
                placeholder="Chọn dịch vụ"
                onChange={onChangeInput}
                value={dataSearch.ten}
              />
            </div>
          </Row>

          <Row>
            <TableSuatAn
              thanhTien={state.thanhTien}
              onSelected={onTamTinhTien}
              khoId={state.khoId}
              loaiDichVu={LOAI_DICH_VU.SUAT_AN}
              visible={state.show}
              ref={refTable}
            />
          </Row>
        </Row>
        <div className="footer-btn">
          <Button type={"default"} onClick={onCancel} minWidth={100}>
            Hủy
          </Button>
          <Button type="primary" onClick={onSubmit} minWidth={100}>
            Đồng ý
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(DichVuSuatAn);
