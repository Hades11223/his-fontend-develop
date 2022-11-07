import React, { useEffect, useState, useMemo, useRef } from "react";
import { Input, message, Select as AntSelect, Divider, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { StickyWrapper, DropdownStyle, AddButtonStyled } from "./styled";
import { LOAI_DICH_VU_CHI_DINH } from "../configs";
import { TRANG_THAI_DICH_VU } from "constants/index";
import { Select } from "components";
import imgSearch from "assets/images/template/icSearch.png";
import { openInNewTab } from "utils";
import { useTranslation } from "react-i18next";
import ModalChiDinhDichVu from "./ModalChiDinhDichVu";
import SaveIcon from "assets/svg/chuanDoanHinhAnh/save.svg";
import EditIcon from "assets/svg/hoSoBenhAn/edit.svg";
import { useStore } from "hook";
import DichVuDaChiDinh from "./DichVuDaChiDinh";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "components";
import ModalThemMoiGoi from "pages/goiDichVu/DanhSachSuDungGoi/ModalThemMoiGoi";

const { Option } = AntSelect;

const ChiDinhDichVu = (props) => {
  const { t } = useTranslation();
  const { dataNb } = useSelector((state) => state.chiDinhKhamBenh);
  const { listNbGoiDv, listGoiDv } = useSelector((state) => state.nbGoiDv);
  const infoNb = useStore("khamBenh.infoNb", {});
  const { trangThaiKsk, khamSucKhoe, maNb, tenNb } = infoNb || {};
  const thongTinChiTiet = useStore("khamBenh.thongTinChiTiet", {});
  const configData = useStore("chiDinhKhamBenh.configData", null);
  const { trangThai: trangThaiKham } = useStore(
    "khamBenh.thongTinChiTiet.nbDvKyThuat",
    {}
  );

  const {
    nbGoiDv: { getByNbThongTinId, getListGoiDv },
    chiDinhKhamBenh: { postNbGoiDv },
    benhPham: { getListAllBenhPham },
    loaiDoiTuongLoaiHinhTT: { getListLoaiDoiTuongTT },
  } = useDispatch();

  const refModalChiDinhDichVu = useRef(null);
  const refModalThemMoiGoi = useRef(null);

  const [editGoiDv, setEditGoiDv] = useState(false);
  const [dsGoiChon, setDsGoiChon] = useState([]);

  const [state, _setState] = useState({});

  const setState = (data) => {
    _setState((state) => {
      return {
        ...state,
        ...data,
      };
    });
  };

  useEffect(() => {
    if (configData) {
      getListAllBenhPham({ page: "", size: "" });
    }
  }, [configData]);

  useEffect(() => {
    if (infoNb?.loaiDoiTuongId)
      getListLoaiDoiTuongTT({
        page: "",
        size: "",
        loaiDoiTuongId: infoNb?.loaiDoiTuongId,
        active: true,
      });
  }, [infoNb]);

  const chanDoan = useMemo(() => {
    let { dsCdChinh, cdSoBo } = dataNb || {};
    dsCdChinh = (dsCdChinh || []).filter((item) => item);
    if (dsCdChinh.length) {
      return dsCdChinh.map((item) => item?.ten).join();
    }
    return cdSoBo || [];
  }, [dataNb]);

  const disableChiDinh = useMemo(() => {
    return !dataNb?.dsCdChinh?.length && !dataNb?.cdSoBo;
  }, [dataNb?.id, dataNb?.cdSoBo, dataNb?.dsCdChinh]);

  const onSelectServiceType = (value) => {
    if (disableChiDinh) return;

    setState({
      loaiDichVu: value,
    });
  };

  const listLoaiChiDinhDV = useMemo(() => {
    return [
      ...LOAI_DICH_VU_CHI_DINH.map((item) => {
        item.ten = t(item.i18n);
        return item;
      }),
      ...listNbGoiDv.map((x) => ({
        ...x,
        id: x.goiDvId,
        ten: x.tenGoiDv,
        nbGoiDvId: x.id,
      })),
      ...(khamSucKhoe
        ? [
            {
              ten: t("khamBenh.chiDinh.dvTrongHopDongKSK"),
              id: "KSK",
            },
          ]
        : []),
    ];
  }, [khamSucKhoe, t, listNbGoiDv]);

  const onShowPopupChiDinh = () => {
    if (disableChiDinh) {
      message.error(t("khamBenh.chiDinh.yeuCauNhapChanDoanTruocChiDinhDichVu"));
      return;
    }

    refModalChiDinhDichVu.current &&
      refModalChiDinhDichVu.current.show({
        loaiDichVu: state.loaiDichVu || "",
        dsDoiTuongSuDung: [20],
        nbThongTinId: configData?.nbThongTinId,
        nbDotDieuTriId: configData?.nbDotDieuTriId,
        khoaChiDinhId: configData?.khoaChiDinhId,
        chiDinhTuDichVuId: configData.chiDinhTuDichVuId,
        disableChiDinh: disableChiDinh,
        isHiddenTyLett: true,
        isPhauThuat: false,
        listLoaiChiDinhDV: listLoaiChiDinhDV,
        doiTuong: configData?.thongTinNguoiBenh?.doiTuong,
      });
  };
  const handleChange = (value) => {
    setDsGoiChon(value);
  };

  function onSaveGoiDv() {
    const insertGoiDv = dsGoiChon.filter(
      (x1) => listNbGoiDv.findIndex((x2) => x2.goiDvId === x1) === -1
    );
    Promise.all(
      insertGoiDv.map((x) => {
        return postNbGoiDv({
          nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
          goiDvId: x,
        });
      })
    ).then(() => {
      getByNbThongTinId({ page: 0, nbThongTinId: configData.nbThongTinId });
      setEditGoiDv(false);
    });
  }

  function onEditGoiDv() {
    setEditGoiDv(true);
    setDsGoiChon((listNbGoiDv || []).map((x) => x.goiDvId));
    getListGoiDv({});
  }

  const onCreateGoiLieuTrinh =
    (autoAdd = false) =>
    () => {
      refModalThemMoiGoi.current &&
        refModalThemMoiGoi.current.show(
          {
            // loaiDichVu: state.loaiDichVu,
            dsDoiTuongSuDung: [],
            // nbThongTinId: infoPatient.nbThongTinId,
            // nbDotDieuTriId: currentToDieuTri.nbDotDieuTriId,
            // khoaChiDinhId: currentToDieuTri.khoaChiDinhId,
            // chiDinhTuDichVuId: currentToDieuTri.id,
            chiDinhTuLoaiDichVu: 210,
            disableChiDinh: false,
            isHiddenTyLett: true,
            isPhauThuat: false,
            listLoaiChiDinhDV: listLoaiChiDinhDV,
            maNb,
            tenNb,
          },
          (newId) => {
            getListGoiDv({});
            setDsGoiChon([...dsGoiChon, newId]);

            if (autoAdd) {
              postNbGoiDv({
                nbDotDieuTriId: thongTinChiTiet.nbDotDieuTriId,
                goiDvId: newId,
              }).then(() => {
                getByNbThongTinId({
                  page: 0,
                  nbThongTinId: configData.nbThongTinId,
                });
              });
            }
          }
        );
    };

  //End Select Component ChiDinh
  const renderSticky = useMemo(() => {
    return (
      <StickyWrapper>
        <div className="info">
          <div className="info__left">
            <p>
              {t("khamBenh.chiDinh.chanDoan")}: <span>{chanDoan}</span>
            </p>
            <p>
              {t("khamBenh.chiDinh.bacSiChiDinh")}:{" "}
              <span>{t("khamBenh.chiDinh.nguoiBenhYeuCau")}</span>
            </p>
          </div>
          <div className="info__right">
            <p>
              {t("khamBenh.chanDoan.chanDoanKemTheo")}:
              <span>
                {(dataNb?.dsCdKemTheo || []).map((item) => item.ten).join()}
              </span>
            </p>
            <div className="person">
              <div className="title small">
                {"NB sử dụng gói"}:{" "}
                {!editGoiDv && (
                  <Tooltip title="Chỉnh sửa gói dịch vụ người bệnh">
                    <EditIcon className="icon" onClick={onEditGoiDv} />
                  </Tooltip>
                )}
                &ensp;
                {!editGoiDv && (
                  <Tooltip title="Thêm mới gói dịch vụ">
                    <PlusCircleOutlined
                      style={{ color: "#049254", fontSize: 15 }}
                      onClick={onCreateGoiLieuTrinh(true)}
                    />
                  </Tooltip>
                )}
              </div>
              {editGoiDv ? (
                <div className="detail small select-goidv">
                  <DropdownStyle />
                  <AntSelect
                    mode="multiple"
                    listHeight={150}
                    value={dsGoiChon}
                    onChange={handleChange}
                    dropdownClassName="kham-benh-select-goi-dv"
                    filterOption={(input, option) =>
                      option &&
                      option.children &&
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <AddButtonStyled>
                          <Button
                            leftIcon={<PlusCircleOutlined />}
                            type={"success"}
                            onClick={onCreateGoiLieuTrinh(false)}
                          >
                            {t("goiDichVu.themMoiGoi")}
                          </Button>
                        </AddButtonStyled>
                      </>
                    )}
                  >
                    {listGoiDv.map((item) => (
                      <Option
                        key={item.id}
                        value={item.id}
                        disabled={
                          listNbGoiDv.findIndex(
                            (x) => x.goiDvId === item.id
                          ) !== -1
                        }
                      >
                        {item.ten}
                      </Option>
                    ))}
                  </AntSelect>

                  <SaveIcon className="icon" onClick={onSaveGoiDv} />
                </div>
              ) : (
                <div className="detail small">
                  {(listNbGoiDv || []).map((item, idx) => {
                    return (
                      <a
                        href={`/goi-dich-vu/chi-tiet-nguoi-benh-su-dung-goi/${item.id}`}
                        key={item.id}
                        target={"_blank"}
                      >
                        {item.tenGoiDv}
                        {idx + 1 < (listNbGoiDv || []).length && (
                          <span>, </span>
                        )}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* {elementKey === 1 && trangThaiKham != TRANG_THAI_DICH_VU.DA_KET_LUAN && ( */}
        {trangThaiKham != TRANG_THAI_DICH_VU.DA_KET_LUAN &&
          !(khamSucKhoe && trangThaiKsk == 30) && ( //bỏ điều kiện check elementKey == 1 thì mới hiển thị box chỉ định dịch vụ
            <div className="select-box">
              <div
                className="pointer"
                onClick={() => {
                  let path = "/danh-muc/dich-vu-kham-benh";
                  if (state.loaiDichVu == 10)
                    path = "/danh-muc/dich-vu-kham-benh";
                  else if ((state.loaiDichVu = 20))
                    path = "/danh-muc/dich-vu-xet-nghiem";
                  else if ((state.loaiDichVu = 30))
                    path = "/danh-muc/dich-vu-cdha-tdcn";
                  else if ((state.loaiDichVu = 150))
                    path = "/goi-dich-vu/danh-muc";
                  openInNewTab(path);
                  return;
                }}
              >
                {t("khamBenh.chiDinh.themChiDinh")} &nbsp;
              </div>
              <div>
                <Select
                  defaultValue=""
                  className="select-box_select"
                  data={listLoaiChiDinhDV}
                  placeholder={t("khamBenh.chiDinh.chonLoaiDV")}
                  onChange={onSelectServiceType}
                />
              </div>
              <div className="addition-box">
                <div className="input-box">
                  <img src={imgSearch} alt="imgSearch" />
                  <Input
                    placeholder={t("khamBenh.chiDinh.chonDichVu")}
                    value={state.filterText}
                    readOnly={true}
                    onClick={onShowPopupChiDinh}
                  />
                </div>
              </div>
            </div>
          )}
      </StickyWrapper>
    );
  }, [
    chanDoan,
    dataNb,
    trangThaiKham,
    state.loaiDichVu,
    t,
    editGoiDv,
    listNbGoiDv,
    listGoiDv,
    dsGoiChon,
    trangThaiKsk,
    khamSucKhoe,
    listLoaiChiDinhDV
  ]);

  return (
    <>
      {renderSticky}
      <DichVuDaChiDinh
        isHiddenTyLett={true}
        isDisplayLoaiPttt={false}
        isDisplayIconHoan={true}
      />
      <ModalChiDinhDichVu ref={refModalChiDinhDichVu} />
      <ModalThemMoiGoi ref={refModalThemMoiGoi} />
    </>
  );
};

export default ChiDinhDichVu;
