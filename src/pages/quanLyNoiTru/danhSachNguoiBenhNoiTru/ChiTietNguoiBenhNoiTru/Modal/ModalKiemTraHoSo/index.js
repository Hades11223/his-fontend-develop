import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from "react";
import { Collapse, Form, message } from "antd";
import { Main, CollapseWrapper } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { ModalTemplate } from "components";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import { useEnum, useStore } from "hook";
import HeaderPanel from "./components/HeaderPanel";
import TableDVChuaHoanThanh from "./components/TableDVKTChuaHoanThanh";
import { orderBy } from "lodash";
import { ENUM } from "constants/index";
import TableVatTuChuaTra from "./components/TableVatTuChuaTra";
import TableVatTuChuaLinh from "./components/TableVatTuChuaLinh";
import TableThoiGianCoKetQua from "./components/TableThoiGianCoKetQua";
import TableDVThieuThoiGian from "./components/TableDVThieuThoiGian";
import TableThoiGianYLenh from "./components/TableThoiGianYLenh";
import moment from "moment";
import IcHyperLink from "assets/svg/noiTru/ic-hyper-link.svg";
import Icon from "@ant-design/icons";
import { refConfirm } from "app";
import { useTranslation } from "react-i18next";
import IcDelete from "assets/svg/noiTru/ic-delete.svg";

const { Panel } = Collapse;

const ModalKiemTraHoSo = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const refTableDVChuaHoanThanh = useRef(null);
  const refTableVatTuChuaLinh = useRef(null);
  const refTableThoiGianCoKetQua = useRef(null);
  const refTableVatTuChuaTra = useRef(null);

  const { infoPatient } = useStore("danhSachNguoiBenhNoiTru", {});
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const { tenNb, tuoi, thoiGianRaVien } = infoPatient || {};
  const age = tuoi ? ` - ${tuoi} tuổi` : "";
  const raVien = thoiGianRaVien
    ? moment(thoiGianRaVien).format("DD/MM/YYYY HH:mm:ss")
    : "";

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    nbDotDieuTri: { thongTinHoSo = {} },
  } = useSelector((state) => state);

  const {
    nbDotDieuTri: { kiemTraRaVien },
    danhSachNguoiBenhNoiTru: { deleteDichVu },
  } = useDispatch();

  const gioiTinh = useMemo(() => {
    return (
      (listGioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
      {}
    );
  }, [infoPatient, listGioiTinh]);

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const listPanel = useMemo(() => {
    const _thongTinHoSo = {
      dsDvChuaHoanThanh: thongTinHoSo?.dsDvChuaHoanThanh || [],
      dsDvChuaLinh: thongTinHoSo?.dsDvChuaLinh || [],
      dsDvChuaTra: thongTinHoSo?.dsDvChuaTra || [],
      phanGiuong: thongTinHoSo?.phanGiuong,
      thoiGian: {
        dsDvSaiThoiGianThucHien: thongTinHoSo?.dsDvSaiThoiGianThucHien,
        dsDvSaiThoiGianCoKetQua: thongTinHoSo?.dsDvSaiThoiGianCoKetQua,
        dsDvThieuThoiGianCoKq: thongTinHoSo?.dsDvThieuThoiGianCoKq,
        dsDvSaiThoiGianYLenh: thongTinHoSo?.dsDvSaiThoiGianYLenh,
      },
    };

    const _list = Object.keys(_thongTinHoSo).map((key) => {
      switch (key) {
        case "dsDvChuaHoanThanh":
          return {
            key: 1,
            soKhoan: _thongTinHoSo[key]?.length || 0,
            title: "Dịch vụ kỹ thuật chưa hoàn thành",
            content: (
              <TableDVChuaHoanThanh
                ref={refTableDVChuaHoanThanh}
                data={_thongTinHoSo[key]}
              />
            ),
          };

        case "dsDvChuaLinh":
          return {
            key: 2,
            soKhoan: _thongTinHoSo[key]?.length || 0,
            title:
              "Thuốc, vật tư, máu, hóa chất chưa tạo phiếu lĩnh, chưa duyệt lĩnh",
            content: (
              <TableVatTuChuaLinh
                ref={refTableVatTuChuaLinh}
                data={_thongTinHoSo[key]}
              />
            ),
          };

        case "dsDvChuaTra":
          return {
            key: 3,
            soKhoan: _thongTinHoSo[key]?.length || 0,
            title:
              "Thuốc, vật tư, máu, hóa chất chưa tạo phiếu trả, chưa duyệt trả",
            content: (
              <TableVatTuChuaTra
                ref={refTableVatTuChuaTra}
                data={_thongTinHoSo[key]}
              />
            ),
          };

        case "phanGiuong":
          return {
            key: 4,
            title: "Lỗi liên quan đến giường",
            soKhoan: !_thongTinHoSo[key] ? 1 : 0,
            content: !_thongTinHoSo[key] ? (
              <div className="phan-giuong">
                <div className="text-err">
                  {`1. Người bệnh chưa phân giường! ${
                    state.khoaLamViec?.ten
                      ? `(Nếu khoa cho ra viện khác ${state.khoaLamViec?.ten}, vui lòng bỏ qua thông báo này!)`
                      : ""
                  }`}
                </div>
                <a
                  href="#!"
                  onClick={() => {
                    props.openModalPhongGiuong();
                    onClose();
                  }}
                >
                  <span>Phân giường cho người bệnh</span>
                  <Icon component={IcHyperLink} />
                </a>
              </div>
            ) : (
              ""
            ),
          };

        case "thoiGian":
          const _listThoiGian = Object.keys(_thongTinHoSo[key]).filter(
            (key2) =>
              _thongTinHoSo[key][key2] && _thongTinHoSo[key][key2].length > 0
          );

          return {
            key: 5,
            soKhoan: _listThoiGian?.length || 0,
            title: "Lỗi liên quan đến thời gian",
            content: (
              <div>
                {_listThoiGian.map((key2) => {
                  switch (key2) {
                    case "dsDvSaiThoiGianThucHien":
                      return (
                        <div className="thoi-gian-item">
                          <div className="text-err">
                            {`1- Lỗi: Thời gian chỉ định, thời gian thực hiện
                            không được sau thời gian ra viện! Thời gian ra viện:
                            ${raVien}`}
                            &emsp;
                            <Icon
                              className="pl-5"
                              component={IcDelete}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDeleteDichVu(51);
                              }}
                            />
                          </div>
                          <TableThoiGianCoKetQua
                            data={_thongTinHoSo[key][key2]}
                            ref={refTableThoiGianCoKetQua}
                          />
                        </div>
                      );

                    case "dsDvSaiThoiGianCoKetQua":
                      return (
                        <div className="thoi-gian-item">
                          <div className="text-err">
                            {`2- Lỗi: Thời gian có kết quả không được sau thời
                            gian ra viện! Thời gian ra viện: ${raVien}`}
                          </div>
                          <TableDVThieuThoiGian
                            data={_thongTinHoSo[key][key2]}
                          />
                        </div>
                      );

                    case "dsDvThieuThoiGianCoKq":
                      return (
                        <div className="thoi-gian-item">
                          <div className="text-err">
                            {`3- Lỗi: Dịch vụ không được thiếu thời gian có kết
                            quả`}
                          </div>
                          <TableThoiGianYLenh data={_thongTinHoSo[key][key2]} />
                        </div>
                      );

                    case "dsDvSaiThoiGianYLenh":
                      return (
                        <div className="thoi-gian-item">
                          <div className="text-err">
                            {`4- Lỗi: Tờ điều trị có thời gian y lệnh không được
                            sau thời gian ra viện. Thời gian ra viện: ${raVien}`}
                          </div>
                          <TableThoiGianYLenh data={_thongTinHoSo[key][key2]} />
                        </div>
                      );

                    default:
                      return null;
                  }
                })}
              </div>
            ),
          };

        default:
          return {};
      }
    });

    return orderBy(_list, ["key"], "asc");
  }, [thongTinHoSo]);

  useImperativeHandle(ref, () => ({
    show: ({ khoaLamViec }) => {
      setState({ show: true, khoaLamViec });

      kiemTraRaVien(infoPatient?.id);
    },
  }));

  const onRefreshList = () => {
    kiemTraRaVien(infoPatient?.id);
  };

  const onDeleteDichVu = (key) => {
    let listDeleteDv = [];

    switch (key) {
      case 1:
        listDeleteDv = refTableDVChuaHoanThanh.current
          ? refTableDVChuaHoanThanh.current.getDeleteDvList()
          : null;
        break;
      case 2:
        listDeleteDv = refTableVatTuChuaLinh.current
          ? refTableVatTuChuaLinh.current.getDeleteDvList()
          : null;
        break;
      case 3:
        listDeleteDv = refTableVatTuChuaTra.current
          ? refTableVatTuChuaTra.current.getDeleteDvList()
          : null;
        break;
      case 51:
        listDeleteDv = refTableThoiGianCoKetQua.current
          ? refTableThoiGianCoKetQua.current.getDeleteDvList()
          : null;
        break;
      default:
        break;
    }

    if (!listDeleteDv || listDeleteDv.length == 0) {
      message.error("Vui lòng chọn dịch vụ để xóa!");
      return;
    }
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.canhBao"),
          content: `Bạn có chắc chắn muốn xóa ${listDeleteDv.length} dịch vụ đã chọn?`,
          cancelText: t("common.huy"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
          okText: t("common.dongY"),
        },
        () => {
          deleteDichVu(listDeleteDv)
            .then(() => {
              message.success("Xóa thành công dịch vụ");
              onRefreshList();
            })
            .catch((errArr) => {
              if (errArr) {
                const errTxt = errArr
                  .filter((x) => x.code != 0)
                  .map((x) => `${x?.nbDichVu?.dichVu?.ten}: ${x.message}`)
                  .join(", <br />");

                refConfirm.current &&
                  refConfirm.current.show(
                    {
                      title: "Không thể xóa được những dịch vụ dưới đây",
                      content: errTxt,
                      cancelText: t("common.dong"),
                      classNameOkText: "button-error",
                      showImg: true,
                      typeModal: "error",
                    },
                    () => {}
                  );

                if (errArr.some((x) => x.code == 0)) {
                  onRefreshList();
                }
              }
            });
        }
      );
  };

  const onClose = () => {
    form.resetFields();
    setState({ show: false });
  };

  return (
    <ModalTemplate
      width={"90%"}
      closable={true}
      ref={refModal}
      title={"Kiểm tra hồ sơ"}
      rightTitle={`${tenNb} - ${gioiTinh.ten}${age}`}
      onCancel={onClose}
    >
      <Main>
        <div className="collapse-content">
          <CollapseWrapper
            bordered={false}
            defaultActiveKey={[]}
            expandIcon={({ isActive }) => (
              <IcArrow
                style={
                  isActive
                    ? { transform: "rotate(90deg)" }
                    : { transform: "unset" }
                }
              />
            )}
            className="site-collapse-custom-collapse"
          >
            {(listPanel || []).map((panel) => {
              return (
                <Panel
                  key={panel.key}
                  header={
                    <HeaderPanel
                      {...panel}
                      onRefreshList={onRefreshList}
                      onDeleteDichVu={() => onDeleteDichVu(panel.key)}
                      hideDelete={[4, 5].includes(panel.key)}
                    />
                  }
                >
                  {panel.content}
                </Panel>
              );
            })}
          </CollapseWrapper>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalKiemTraHoSo);
