import React, { useState, useEffect, useMemo, useRef } from "react";
import { Input, Collapse, message } from "antd";
import { TextField, Select } from "components";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import Header from "./components/header";
import Table from "./components/table";
import { StickyWrapper } from "../components/StepWrapper/styled";
import { Main, MainTextFiled, CollapseWrapper, GlobalStyle } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import imgSearch from "assets/images/template/icSearch.png";
import { groupBy, isEmpty, uniqBy } from "lodash";
import HeaderThuocKeNgoai from "./components/HeaderThuocKeNgoai";
import TableThuocKeNgoaiPanel from "./components/TableThuocKeNgoai";
import {
  TRANG_THAI_DICH_VU,
  LOAI_DICH_VU,
  LOAI_DON_THUOC,
  LIST_LOAI_DON_THUOC,
  DOI_TUONG,
} from "constants/index";
import { refElement } from "../ThongTin";
import { useTranslation } from "react-i18next";
import ModalChiDinhThuoc from "./ModalChiDinhThuoc";
import { useEnum } from "hook";

const { Panel } = Collapse;
const DonThuoc = (props) => {
  const { t } = useTranslation();
  const { dataNb, listDvThuoc, listDvThuocKeNgoai } = useSelector(
    (state) => state.chiDinhDichVuKho
  );
  const { infoNb, thongTinChiTiet } = useSelector((state) => state.khamBenh);
  const {
    full_name: fullName,
    nhanVienId,
    chucVuId,
  } = useSelector((state) => state.auth.auth);
  const [listLoaiDonThuoc] = useEnum("loaiDonThuoc");
  const listThietLapChonKho = useSelector(
    (state) => state.thietLapChonKho.listThietLapChonKho
  );
  const { doiTuong } = infoNb || {};
  const { nbDotDieuTriId } = thongTinChiTiet;
  const khoaChiDinhId = thongTinChiTiet.nbDichVu?.khoaChiDinhId;
  const phongThucHienId = thongTinChiTiet.nbDvKyThuat?.phongThucHienId;
  const tenBacSiChiDinh = thongTinChiTiet.bacSiKham?.ten || fullName;

  const { nbKetLuan, nbKhamXet, nbChanDoan, nbDvKyThuat } =
    thongTinChiTiet || {};
  const { trangThai: trangThaiKham } = nbDvKyThuat || {};

  const refModalChiDinhThuoc = useRef(null);

  const {
    duongDung: { getListAllDuongDung },
    chiDinhDichVuKho: { getListDichVuThuoc, getListDichVuThuocKeNgoai },
    chiDinhKhamBenh: { loiDan },
    thietLapChonKho: { getListThietLapChonKhoTheoTaiKhoan },
    donViTinh: { getListAllDonViTinh },
  } = useDispatch();

  const refNbKetLuan = useRef(null);
  const [state, _setState] = useState({
    listDichVu: [],
    listGoiDv: [],
    loadingChiDinh: false,
    thanhTien: 0,
    loaiDonThuoc: 20
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const dataKho = useMemo(() => {
    if (state.loaiDonThuoc === 20)
      return uniqBy(listThietLapChonKho || [], "id");
    return [];
  }, [state.loaiDonThuoc, listThietLapChonKho]);

  useEffect(() => {
    refNbKetLuan.current = nbKetLuan || {};
    refNbKetLuan.current.ghiChu = nbKhamXet?.ghiChu;
  }, [nbKetLuan, nbKhamXet]);
  useEffect(() => {
    getListAllDonViTinh({ page: "", size: "" });
    getListAllDuongDung({ page: "", size: "" });
  }, []);

  useEffect(() => {
    if (!isEmpty(infoNb) && !isEmpty(thongTinChiTiet)) {
      getListThietLapChonKhoTheoTaiKhoan({
        loaiDoiTuongId: infoNb?.loaiDoiTuongId,
        loaiDichVu: LOAI_DICH_VU.THUOC, // thuốc
        khoaNbId: infoNb?.khoaNbId,
        khoaChiDinhId: khoaChiDinhId,
        doiTuong: infoNb?.doiTuong,
        noiTru: infoNb?.noiTru,
        capCuu: infoNb?.capCuu,
        phongId: phongThucHienId,
        nhanVienId: nhanVienId,
        chucVuId: chucVuId,
        canLamSang: false,
      });
    }
  }, [infoNb, thongTinChiTiet]);
  const listPanel = useMemo(() => {
    // const grouped = groupBy(listDvThuoc || [], "loaiDonThuoc");
    let listLoaiDonThuocKey = [];
    let grouped = listDvThuoc.reduce((init, item) => {
      if (item.khoBhyt) {
        let cacheData = init?.[`khoBhyt-${item?.soPhieu}`]
          ? init?.[`khoBhyt-${item?.soPhieu}`]
          : [];
        init = {
          ...init,
          [`khoBhyt-${item?.soPhieu}`]: [...cacheData, item],
        };
        listLoaiDonThuocKey = [
          ...listLoaiDonThuocKey,
          {
            id: [`khoBhyt-${item?.soPhieu}`],
            ten: t("khamBenh.donThuoc.donThuocBHYT"),
          },
        ];
        return init;
      }
      if (item.tuTruc) {
        let cacheData = init?.[`tuTruc-${item?.soPhieu}`]
          ? init?.[`tuTruc-${item?.soPhieu}`]
          : [];
        init = {
          ...init,
          [`tuTruc-${item?.soPhieu}`]: [...cacheData, item],
        };
        listLoaiDonThuocKey = [
          ...listLoaiDonThuocKey,
          {
            id: [`tuTruc-${item?.soPhieu}`],
            ten: t("khamBenh.donThuoc.donThuocTuTruc"),
          },
        ];
        return init;
      }
      if (item.nhaThuoc) {
        let cacheData = init?.[item.loaiDonThuoc]
          ? init?.[item.loaiDonThuoc]
          : [];
        init = {
          ...init,
          [item.loaiDonThuoc]: [...cacheData, item],
        };
        return init;
      }
      return init;
    }, {});
    let listloaiDonThuocCustom = [
      ...(listLoaiDonThuoc || []),
      ...(listLoaiDonThuocKey || []),
      {
        id: "khoBhyt",
        ten: t("khamBenh.donThuoc.donThuocBHYT"),
      },
      {
        id: "tuTruc",
        ten: t("khamBenh.donThuoc.donThuocTuTruc"),
      },
    ];

    return Object.keys(grouped || []).map((key) => {
      let groupByIdArr = grouped[key];
      const { loaiDonThuoc } = (grouped && grouped[key][0]) || {};

      const tableByBacsi = groupBy(groupByIdArr, "bacSiChiDinhId");

      return {
        header: (
          <Header
            title={listloaiDonThuocCustom?.find((x) => x.id == key)?.ten}
            listDvThuoc={groupByIdArr}
            nbDotDieuTriId={nbDotDieuTriId}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            phieuNhapXuatId={grouped[key]?.[0]?.phieuNhapXuatId}
            loaiDonThuoc={loaiDonThuoc}
          />
        ),
        content: (
          <>
            {Object.keys(tableByBacsi).map((keyBs) => (
              <Table
                // title={t("khamBenh.donThuoc.thuocDieuTri")}
                title={`Bác sĩ chỉ định: ${tableByBacsi[keyBs][0]?.tenBacSiChiDinh}`}
                listDvThuoc={tableByBacsi[keyBs]}
                nbDotDieuTriId={nbDotDieuTriId}
                listLoaiDonThuoc={key}
                isTuTruc={tableByBacsi[keyBs] && tableByBacsi[keyBs][0]?.tuTruc}
                key={`${key}-${keyBs}`}
              />
            ))}
          </>
        ),
        key,
      };
    });
  }, [listDvThuoc, nbDotDieuTriId, listLoaiDonThuoc]);
  const listPanelThuocKeNgoai = useMemo(() => {
    // const grouped = groupBy(listDvThuocKeNgoai, "id");
    // return Object.keys(grouped).map((key) => {
    //   let groupByIdArr = grouped[key];

    const tableByBacsi = groupBy(listDvThuocKeNgoai, "bacSiChiDinhId");

    return {
      header: (
        <HeaderThuocKeNgoai
          title={t("khamBenh.donThuoc.donThuocKeNgoai")}
          listDvThuoc={listDvThuocKeNgoai || []}
          nbDotDieuTriId={nbDotDieuTriId}
        />
      ),
      content: (
        <>
          {Object.keys(tableByBacsi).map((keyBs) => (
            <TableThuocKeNgoaiPanel
              // title={t("khamBenh.donThuoc.thuocDieuTri")}
              title={`Bác sĩ chỉ định: ${tableByBacsi[keyBs][0]?.tenBacSiChiDinh}`}
              listDvThuoc={tableByBacsi[keyBs]}
              nbDotDieuTriId={nbDotDieuTriId}
              key={keyBs}
            />
          ))}
        </>
      ),
      key: 150,
    };
    // });
  }, [listDvThuocKeNgoai, nbDotDieuTriId]);

  useEffect(() => {
    const isKsk = infoNb?.khamSucKhoe || infoNb?.loaiDoiTuongKsk;

    getListDichVuThuoc({
      nbDotDieuTriId,
      chiDinhTuDichVuId: isKsk ? null : thongTinChiTiet.id,
      chiDinhTuLoaiDichVu: isKsk ? null : LOAI_DICH_VU.KHAM,
      dsTrangThaiHoan: [0, 10, 20],
    });
    getListDichVuThuocKeNgoai({
      nbDotDieuTriId,
      chiDinhTuDichVuId: isKsk ? null : thongTinChiTiet.id,
      chiDinhTuLoaiDichVu: isKsk ? null : LOAI_DICH_VU.KHAM,
    });
  }, [thongTinChiTiet]);

  const dsCdChinh = useMemo(() => {
    return nbChanDoan?.dsCdChinh || [];
  }, [nbChanDoan?.dsCdChinh]);

  const { loaiDonThuoc } = state;
  const disableChiDinh = useMemo(() => {
    return !dataNb?.dsCdChinh?.length && !dataNb?.cdSoBo;
  }, [dataNb?.id, dataNb?.cdSoBo, dataNb?.dsCdChinh]);

  const onSelectLoaiDonThuoc = (value) => {
    setState({
      loaiDonThuoc: value,
      khoId: null,
    });
  };

  const onSelectKho = (value) => {
    setState({
      khoId: value,
    });
  };

  const labeGhiChu = useMemo(() => {
    return (
      <>
        {t("khamBenh.donThuoc.ghiChu")}{" "}
        {!nbKetLuan?.ghiChu && <span style={{ color: "red" }}> *</span>}
      </>
    );
  }, [nbKetLuan?.ghiChu]);
  const labeLoiDan = useMemo(() => {
    return (
      <>
        {t("khamBenh.donThuoc.loiDan")}{" "}
        {!nbKetLuan?.loiDan && <span style={{ color: "red" }}> *</span>}
      </>
    );
  }, [nbKetLuan?.loiDan]);
  const disabled =
    state.loaiDonThuoc === undefined ||
    state.loaiDonThuoc == 10 ||
    state.loaiDonThuoc == 150 ||
    state.loaiDonThuoc === "";

  const onCollapsed = (value) => {
    setState({
      activeKey: value,
    });
  };
  const handleLoiDan = (key) => (value) => {
    refNbKetLuan.current[key] = value;
  };
  const onSave = () => {
    let obj = {
      id: thongTinChiTiet?.id,
      body: {
        ghiChu: refNbKetLuan.current?.ghiChu,
        loiDan: refNbKetLuan.current?.loiDan,
      },
    };
    loiDan(obj);
  };
  const onShowPopupChiDinh = () => {
    if (
      TRANG_THAI_DICH_VU.DA_KET_LUAN === trangThaiKham && //khi đã kết luận thì không cho kê thuốc kho
      loaiDonThuoc === 20
    ) {
      message.error(t("khamBenh.donThuoc.huyKetLuanDeChiDinhThemThuoc"));
      return;
    }
    if (!disabled && !state.khoId) {
      return;
    }
    // if (disableChiDinh) return;
    refModalChiDinhThuoc.current &&
      refModalChiDinhThuoc.current.show({
        loaiDonThuoc: state.loaiDonThuoc,
        khoId: state.khoId,
        dataKho: uniqBy(listThietLapChonKho || [], "id"),
        disableChiDinh,
        // dataSource,
      });
  };

  return (
    <Main className="fadeIn">
      <GlobalStyle />
      <StickyWrapper>
        <MainTextFiled>
          {/* <TextField
            label={t("khamBenh.donThuoc.bacSiChiDinh")}
            html={tenBacSiChiDinh}
            refsChild={refElement}
            keyReload={"don-thuoc"}
          /> */}
          <div className="mr-5">
            <span className={dsCdChinh.length === 0 ? "red" : ""}>
              {t("khamBenh.donThuoc.chanDoan")} <span className="red"> *</span>:
            </span>
            {dsCdChinh.map((cd, index) => {
              if (dsCdChinh.length === index + 1) {
                return <span key={cd?.id}>{cd?.ten}</span>;
              }

              return <span key={cd?.id}>{cd?.ten}, </span>;
            })}
          </div>
          <TextField
            label={labeGhiChu}
            html={nbKetLuan?.ghiChu}
            // delayTyping={300}
            onChange={handleLoiDan("ghiChu")}
            onBlur={onSave}
            refsChild={refElement}
          />
          <TextField
            label={labeLoiDan}
            html={nbKetLuan?.loiDan}
            // delayTyping={300}
            onChange={handleLoiDan("loiDan")}
            onBlur={onSave}
            refsChild={refElement}
            keyReload={"don-thuoc"}
          />

          {
            // elementKey === 4 && //bỏ điều kiện check elementKey == 4 thì mới hiển thị box chỉ định thuốc
            <>
              <div className="select-box">
                <div>{t("khamBenh.donThuoc.themChiDinh")} &nbsp;</div>
                <div>
                  <Select
                    dropdownClassName="drop-down-select"
                    defaultValue={state.loaiDonThuoc}
                    className="select-box_select"
                    value={loaiDonThuoc}
                    data={LIST_LOAI_DON_THUOC.filter((item) => [
                      LOAI_DON_THUOC.NHA_THUOC,
                      LOAI_DON_THUOC.THUOC_KHO,
                      LOAI_DON_THUOC.KE_NGOAI,
                    ])}
                    onChange={onSelectLoaiDonThuoc}
                    placeholder={t("khamBenh.donThuoc.vuiLongChonLoaiDonThuoc")}
                  />
                </div>
                <div>&nbsp;&nbsp;&nbsp;</div>
                <div>
                  <Select
                    data={dataKho}
                    style={{ width: "200px" }}
                    placeholder={t("khamBenh.donThuoc.vuiLongChonKho")}
                    onChange={onSelectKho}
                    value={state.khoId}
                    disabled={disabled}
                  />
                </div>
                <div className="addition-box">
                  <div className="input-box">
                    <img src={imgSearch} alt="imgSearch" />
                    <Input
                      placeholder={t("khamBenh.donThuoc.chonThuoc")}
                      onKeyPress={(e) => {
                        e.preventDefault();
                        e.target.value = "";
                        return null;
                      }}
                      readOnly={true}
                      onClick={onShowPopupChiDinh}
                    />
                  </div>
                </div>
              </div>
              {dataKho?.length && !disabled && !state.khoId ? (
                <div
                  style={{
                    height: 18,
                    color: "red",
                    marginLeft: 266,
                    visibility: "inherit",
                  }}
                >
                  {t("khamBenh.donThuoc.vuiLongChonKho")}
                </div>
              ) : null}
            </>
          }
        </MainTextFiled>
      </StickyWrapper>
      <div className="collapse-content">
        <CollapseWrapper
          bordered={false}
          defaultActiveKey={["1", "2"]}
          activeKey={state.activeKey}
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
          onChange={onCollapsed}
        >
          {listPanel.map((panel) => (
            <Panel key={panel.key} header={panel.header}>
              {panel.content}
            </Panel>
          ))}
        </CollapseWrapper>
      </div>
      {listDvThuocKeNgoai?.length > 0 && (
        <div className="collapse-content">
          <CollapseWrapper
            bordered={false}
            defaultActiveKey={[150]}
            activeKey={state.activeKey}
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
            onChange={onCollapsed}
          >
            {/* {listPanelThuocKeNgoai.map((panel) => ( */}
            <Panel
              key={listPanelThuocKeNgoai.key}
              header={listPanelThuocKeNgoai.header}
            >
              {listPanelThuocKeNgoai.content}
            </Panel>
            {/* ))} */}
          </CollapseWrapper>
        </div>
      )}
      <ModalChiDinhThuoc ref={refModalChiDinhThuoc} />
    </Main>
  );
};

export default DonThuoc;
