import { message, Popover, Radio, Row } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import imgSearch from "assets/images/template/icSearch.png";
import { Main } from "./styled";
import { LOAI_DICH_VU } from "constants/index.js";
import TableDonThuoc from "./TableDonThuoc";
import TableThuocKeNgoai from "./TableThuocKeNgoai";
import ThongTinThuoc from "./ThongTinThuoc";
import { Button, ModalTemplate, Select, InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import IcGroup from "assets/images/template/icGroup.png";
import cacheUtils from "utils/cache-utils";
import { refConfirm } from "app";

const DichVuThuoc = (props, ref) => {
  const { t } = useTranslation();
  const {
    dataNb,
    onSelectThuocKeNgoai,
    chiDinhTuLoaiDichVu,
    listLoaiDonThuoc,
    thongTinNguoiBenh,
  } = props;
  const refModal = useRef(null);
  const refThongTinThuoc = useRef(null);
  const refIsSubmit = useRef(null);
  const refInput = useRef(null);

  const { nhanVienId } = useSelector((state) => state.auth.auth);
  const { listThietLapChonKho } = useSelector((state) => state.thietLapChonKho);

  const { listAllLieuDung } = useSelector((state) => state.lieuDung);

  const {
    boChiDinh: { getBoChiDinh },
    chiDinhDichVuThuoc: {
      tamTinhTien,
      chiDinhDichVuKho,
      getListDichVuThuoc,
      chiDinhDichVuThuocKeNgoai,
      getListDichVuThuocKeNgoai,
      searchDv,
      getListDichVuTonKho,
    },
  } = useDispatch();

  const [state, _setState] = useState({
    show: false,
    listDichVu: [],
    listSelectedDv: [],
    listGoiDv: [],
    thanhTien: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    async function fetchData() {
      let data = await cacheUtils.read(
        "",
        "DATA_THEO_SO_LUONG_TON_KHO_THUOC",
        null,
        false
      );
      if (data) {
        setState({ theoSoLuongTonKho: data?.theoSoLuongTonKho });
      } else {
        setState({ theoSoLuongTonKho: 15 });
      }
    }
    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    show: (option = {}) => {
      setState({
        show: true,
        loaiDonThuoc: option?.loaiDonThuoc,
        khoId: option?.khoId,
        filterText: "",
        dataSource: option?.dataSource || {},
        dataKho: option?.dataKho || [],
        dungKemId: option?.dungKemId,
      });
      onSelectLoaiDonThuoc(option?.khoId)(option?.loaiDonThuoc);
      refIsSubmit.current = false;
    },
  }));
  useEffect(() => {
    if (!state.show) {
      setTimeout(() => refModal.current.hide(), 50);
    } else {
      refModal.current.show({});
      setTimeout(() => refInput.current && refInput.current.focus(), 50);
    }
  }, [state.show]);

  const { loaiDonThuoc, thanhTien } = state;
  const onSelectedBoChiDinh = (itemSelected) => {
    let item = {};
    let obj = {
      loaiDichVu: LOAI_DICH_VU.THUOC,
      notCallBoChiDinh: true,
    };

    if (itemSelected.id !== state.boChiDinhSelected?.id) {
      //nếu item không giống thì sẽ thêm vào
      item = itemSelected;
    }
    if (!!item.id) {
      obj.boChiDinhId = item.id;
    }
    if (state.loaiDonThuoc === 150) {
      // kê thuốc ngoài
      delete obj.loaiDichVu;
    } else if (loaiDonThuoc === 20) {
      delete obj.loaiDichVu;
      delete obj.notCallBoChiDinh;
      getListDichVuTonKho({
        ...obj,
        khoId: state.khoId,
        page: "0",
        size: "10",
        dataSortColumn: { ten: 1 },
      });
    } else {
      searchDv(obj);
    }
  };
  const onTamTinhTien = (listSelected, type) => {
    const payload = listSelected.map((item) => ({
      nbDotDieuTriId: dataNb?.nbDotDieuTriId || dataNb?.id,
      nbDichVu: {
        dichVuId: item?.dichVuId,
        soLuong: item.soLuong,
        tuTra: item?.tuTra,
        khongTinhTien: item.khongTinhTien,
        khoaChiDinhId: dataNb?.khoaChiDinhId,
        chiDinhTuDichVuId: dataNb?.id,
        chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
      },
    }));
    if (type === "soLuong" || type === "tuTra" || type === "khongTinhTien") {
      tamTinhTien(payload).then((s) => {
        const thanhTien = (s || []).reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.nbDichVu.thanhTien,
          0
        );
        setState({
          thanhTien: thanhTien,
          listSelectedDv: listSelected,
        });
      });
    } else {
      state.listSelectedDv = listSelected;
    }
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
      switch (state.loaiDonThuoc) {
        case 150:
          return {
            nbDotDieuTriId: dataNb?.nbDotDieuTriId,
            thuocChiDinhNgoaiId: item?.id,
            soLuong: item.soLuong,
            ghiChu: item?.ghiChu,
            lieuDungId: item.lieuDungId,
            chiDinhTuDichVuId: dataNb?.id,
            chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
          };
        default:
          return {
            nbDotDieuTriId: dataNb?.nbDotDieuTriId,
            lieuDungId: item.lieuDungId,
            nbDichVu: {
              dichVuId: item?.dichVuId,
              soLuong: item.soLuong,
              chiDinhTuDichVuId: dataNb?.id,
              chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
              khoaChiDinhId: dataNb?.khoaChiDinhId,
              tuTra: item.tuTra,
              khongTinhTien: item.khongTinhTien,
              ghiChu: item?.ghiChu,
            },
            nbDvKho: {
              khoId: state.khoId,
              dungKemId: state?.dungKemId,
            },
            dsMucDich: item?.dsMucDich,
          };
      }
    });
    refIsSubmit.current = true;

    if (state.loaiDonThuoc === 150) {
      // thuốc kê ngoài

      chiDinhDichVuThuocKeNgoai(payload)
        .then((s) => {
          if (s?.code === 0) {
            getListDichVuThuocKeNgoai({
              nbDotDieuTriId: dataNb?.nbDotDieuTriId,
              chiDinhTuDichVuId: dataNb.id,
              chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
            });
            onCancel();
          }
        })
        .catch(() => {
          refIsSubmit.current = false;
        });
    } else {
      chiDinhDichVuKho(payload)
        .then((s) => {
          // if (s?.code === 0) { // sample of s = [{…}] => s.code always is undefined #SAKURA-14657
          getListDichVuThuoc({
            nbDotDieuTriId: dataNb?.nbDotDieuTriId,
            chiDinhTuDichVuId: dataNb.id,
            chiDinhTuLoaiDichVu: chiDinhTuLoaiDichVu,
            // dsTrangThaiHoan: [0, 10, 20],
          }).then((res) => {
            let list = s?.map((item) => item.loaiDonThuoc);
            setState({
              activeKey: list,
              listSelectedDv: [],
            });
          });
          // }

          let tuongTacThuoc = (s?.filter((x) => x.tuongTacThuoc) || []).map(
            (x1) => x1.tuongTacThuoc
          );
          tuongTacThuoc?.length &&
            chiDinhTuLoaiDichVu === LOAI_DICH_VU.TO_DIEU_TRI &&
            message.error(tuongTacThuoc.join(", "));

          const updatingRecord = (s || [])
            .map((item) => ({
              ...item,
              dsMucDich: payload.find(
                (x) => x?.nbDichVu?.dichVuId === item?.nbDichVu?.dichVuId
              )?.dsMucDich,
            }))
            .filter((item1) => item1.code && item1.code !== 0);
          const errMessage = (s || [])
            .filter((item) => item.code && item.code !== 0)
            .map(
              (item2) => `(${item2?.nbDichVu?.dichVu?.ten} - ${item2.message})`
            );
          const warMessage = (s || []).filter(
            (item1) => item1.code === 0 && item1.message
          );
          if (errMessage.length) {
            message.error(errMessage.map((x) => x).join(", "));
          } else if (warMessage.length) {
            let content = warMessage[0].message;
            content &&
              refConfirm.current &&
              refConfirm.current.show(
                {
                  title: t("common.canhBao"),
                  content: content,
                  cancelText: t("common.dong"),
                  classNameOkText: "button-error",
                  showImg: true,
                  typeModal: "warning",
                },
                () => {}
              );
          }
          if (updatingRecord.length > 0)
            refThongTinThuoc.current &&
              refThongTinThuoc.current.show(
                { newTable: updatingRecord, loaiDonThuoc },
                (options) => {
                  setState({ activeKey: options.activeKey, show: false });
                }
              );
          onCancel();
        })
        .catch(() => {
          refIsSubmit.current = false;
        });
    }

    // getListDichVuThuoc({
    //   nbDotDieuTriId: currentToDieuTri?.nbDotDieuTriId,
    //   chiDinhTuDichVuId: currentToDieuTri?.id,
    //   chiDinhTuLoaiDichVu: 210,
    // });
  };
  const onSelectLoaiDonThuoc = (khoId) => (value) => {
    setState({
      loaiDonThuoc: value,
      khoId: khoId,
      listSelectedDv: [],
    });
    if (value === 150) {
      getBoChiDinh({ thuocChiDinhNgoai: true, bacSiChiDinhId: nhanVienId });
    } else {
      getBoChiDinh({
        dsLoaiDichVu: LOAI_DICH_VU.THUOC,
        bacSiChiDinhId: nhanVienId,
      });
    }
  };

  const onSelectKho = (value) => {
    setState({
      khoId: value,
    });
  };

  const onCancel = () => {
    setState({
      boChiDinhSelected: null,
      show: false,
      thanhTien: 0,
      listSelectedDv: [],
    });
  };

  const disabled = [10, 150].includes(loaiDonThuoc);

  const onSelectedNoPayment = (data) => {
    onSelectThuocKeNgoai(data);
    setState({
      show: true,
      thanhTien: thanhTien,
      listSelectedDv: data,
    });
  };
  const onChangeRadio = (e) => {
    setState({ theoSoLuongTonKho: e.target.value });
    cacheUtils.save(
      "",
      "DATA_THEO_SO_LUONG_TON_KHO_THUOC",
      { theoSoLuongTonKho: e.target.value },
      false
    );
  };

  const popovercontent = (
    <div style={{ display: "grid" }}>
      {t("common.caiDatTimKiemHangHoa")}:
      <Radio.Group
        defaultValue={state?.theoSoLuongTonKho}
        style={{ display: "grid" }}
        onChange={onChangeRadio}
      >
        <Radio value={15}>{t("common.hangHoaConTon")}</Radio>
        <Radio value={""}>{t("common.tatCaHangHoa")}</Radio>
      </Radio.Group>
    </div>
  );

  return (
    <ModalTemplate
      width={1366}
      ref={refModal}
      title="Chỉ định thuốc"
      onCancel={onCancel}
      actionRight={
        <>
          <Button type={"default"} onClick={onCancel} minWidth={100}>
            Hủy
          </Button>
          <Button type="primary" onClick={onSubmit} minWidth={100}>
            Đồng ý
          </Button>
        </>
      }
    >
      <Main>
        <Row className="content">
          <Row className="content-title">
            <span className="text">THÊM CHỈ ĐỊNH</span>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <Select
              placeholder="Chọn loại đơn"
              data={listLoaiDonThuoc}
              value={loaiDonThuoc}
              onChange={onSelectLoaiDonThuoc()}
            ></Select>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <Select
              placeholder="Chọn kho"
              data={listThietLapChonKho}
              onChange={onSelectKho}
              value={state?.khoId}
              disabled={disabled}
            ></Select>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <div className="input-box">
              <img src={imgSearch} alt="imgSearch" />
              <InputTimeout
                ref={refInput}
                style={{ width: 450, height: 32, marginLeft: 0 }}
                className="input-header"
                placeholder="Nhập tên thuốc "
                value={state.keyWord}
                onChange={(e) => {
                  setState({
                    keyWord: e,
                  });
                }}
              />
            </div>
            <div className="setting">
              <Popover
                trigger={"click"}
                content={popovercontent}
                placement="bottom"
              >
                <img src={IcGroup} alt="IcGroup" />
              </Popover>
            </div>
          </Row>
          <Row className="info">
            {state.loaiDonThuoc === 150 ? (
              <TableThuocKeNgoai
                onSelectedNoPayment={onSelectedNoPayment}
                thanhTien={thanhTien}
                boChiDinhSelected={state.boChiDinhSelected}
                onSelectedBoChiDinh={onSelectedBoChiDinh}
                loaiDonThuoc={state.loaiDonThuoc}
                visible={state.show}
              />
            ) : (
              <TableDonThuoc
                thanhTien={thanhTien}
                onSelected={onTamTinhTien}
                boChiDinhSelected={state.boChiDinhSelected}
                listAllLieuDung={listAllLieuDung || []}
                khoId={state.khoId}
                loaiDonThuoc={state.loaiDonThuoc}
                loaiDichVu={LOAI_DICH_VU.THUOC}
                visible={state.show}
                showSearch={false}
                keyWord={state?.keyWord}
                theoSoLuongTonKho={state?.theoSoLuongTonKho}
                nbDotDieuTriId={dataNb?.nbDotDieuTriId || dataNb?.id}
              />
            )}
          </Row>
        </Row>
      </Main>
      <ThongTinThuoc
        ref={refThongTinThuoc}
        khoId={state.khoId}
        chiDinhTuLoaiDichVu={chiDinhTuLoaiDichVu}
        dataNb={dataNb}
        dungKemId={state?.dungKemId}
        thongTinNguoiBenh={thongTinNguoiBenh}
      ></ThongTinThuoc>
    </ModalTemplate>
  );
};

export default forwardRef(DichVuThuoc);
