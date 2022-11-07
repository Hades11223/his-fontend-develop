import React, {
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Main, MainTitle } from "./styled";
import DanhSachPhieuThuChuyen from "./danhSachPhieu";
import ListService from "./danhSachDichVu";
import { useParams, useHistory } from "react-router-dom";
import { firstLetterWordUpperCase } from "utils";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { Button, ModalTemplate } from "components";
import { ENUM, HOTKEY } from "constants/index";
import { useEnum } from "hook";
function ModalContent(props, ref) {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const { nbDotDieuTriId, phieuThuId } = useParams();
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const { thongTinPhieuThu } = useSelector((state) => state.thuNgan);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);

  const {
    thuNgan: { tachPhieuThu, getThongTinPhieuThu },
    danhSachPhieuThu: { onSearch },
    danhSachDichVu: { onSizeChange },
    nbDotDieuTri: { tongTienDieuTri },
  } = useDispatch();
  const [state, _setState] = useState({
    selectedRowKeys: [],
    value: 1,
    listServices: [],
  });
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };

  const refHandleAfterSubmit = useRef();
  const handleClickBack = () => {
    setState({
      value: 1,
      show: false,
    });
  };
  useImperativeHandle(ref, () => ({
    show: ({ phieuThuId }, callback) => {
      setState({
        phieuThuId,
        show: true,
        selectedRowKeys: [],
        value: 1,
        listServices: [],
      });
      refHandleAfterSubmit.current = callback;
    },
  }));
  let gioiTinh =
    listGioiTinh?.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};

  const onChange = (e) => {
    setState({
      value: e.target.value,
    });
  };
  const renderTypeTranfer = useCallback(() => {
    switch (state.value) {
      case 1:
        return null;
      default:
        return <DanhSachPhieuThuChuyen getPhieuThu={getPhieuThu} />;
    }
  }, [state.value]);

  const getPhieuThu = (phieuThuMoiId) => {
    setState({
      phieuThuMoiId,
    });
  };

  const updateListServices = (data) => {
    setState({
      listServices: data,
    });
  };
  const onOk = (isOk) => async () => {
    if (isOk) {
      const { phieuThuMoiId } = state;
      const listDV = state.listServices.map((item) => {
        return {
          id: item.id,
        };
      });
      let params = {
        dsDichVu: listDV,
        id: phieuThuId,
        nbDotDieuTriId,
      };
      if (state.value === 2 && !!phieuThuMoiId) {
        params = { ...params, phieuThuMoiId };
      }
      tachPhieuThu(params).then((res) => {
        if (res.code === 0) {
          handleClickBack();
          setState({
            value: 1,
          });
          refHandleAfterSubmit.current();
          // if (state.listServices?.length !== listAllService.length) {
          //   getThongTinPhieuThu(phieuThuId);
          //   tongTienDieuTri({ id: nbDotDieuTriId });
          // } else {
          //   onSearch({
          //     dataSearch: { nbDotDieuTriId },
          //   }).then((s) => {
          //     debugger
          //     const { data = [] } = s;
          //     if (s?.code === 0) {
          //       getThongTinPhieuThu(data[0].id);
          //       tongTienDieuTri({ id: nbDotDieuTriId });
          //       onSizeChange({ nbDotDieuTriId, phieuThuId: data[0].id });
          //       history.push(
          //         `/thu-ngan/chi-tiet-phieu-thu/${maHoSo}/${data[0].id}/${nbDotDieuTriId}`
          //       );
          //     }
          //   });
          // }
        }
      });
    } else {
      handleClickBack();
    }
  };
  const hotKeys = [
    {
      keyCode: HOTKEY.ESC,
      onEvent: () => {
        onOk(false)();
      },
    },
    {
      keyCode: HOTKEY.F4,
      onEvent: () => {
        onOk(true)();
      },
    },
  ];
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  return (
    <ModalTemplate
      width={800}
      ref={refModal}
      title={t("thuNgan.chuyenPhieuThu")}
      onCancel={onOk(false)}
      closable={false}
      rightTitle={
        <>
          <span>{firstLetterWordUpperCase(thongTinBenhNhan?.tenNb)} </span> -{" "}
          <span className="normal-weight">{gioiTinh?.ten}</span>
          {thongTinBenhNhan?.tuoi && (
            <>
              {" "}
              -{" "}
              <span className="normal-weight">
                {thongTinBenhNhan?.tuoi} {t("common.tuoi")}
              </span>
            </>
          )}
        </>
      }
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOk(false)}
        >
          {t("common.quayLai")} [ESC]
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          iconHeight={15}
          onClick={onOk(true)}
          disabled={thongTinPhieuThu.thanhToan}
        >
          {t("common.xacNhan")} [F4]
        </Button>
      }
      hotKeys={hotKeys}
    >
      <Main>
        <MainTitle>{t("thuNgan.chonPhieuThuDen")}</MainTitle>
        <div className="group-tranfer">
          <Radio.Group onChange={onChange} value={state.value}>
            <Radio value={1}>{t("thuNgan.phieuThuMoi")}</Radio>
            <Radio value={2}>{t("thuNgan.phieuThuDaTonTai")}</Radio>
          </Radio.Group>
          {renderTypeTranfer()}
        </div>
        <MainTitle>{t("thuNgan.chonDichVuMuonChuyenPhieuThu")}</MainTitle>
        <ListService
          updateListServices={updateListServices}
          nbDotDieuTriId={nbDotDieuTriId}
          phieuThuId={phieuThuId}
        />
      </Main>
    </ModalTemplate>
  );
}
export default forwardRef(ModalContent);
