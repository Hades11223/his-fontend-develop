import React, { memo, useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "antd";
import orderBy from "lodash/orderBy";
import { ENUM, HOTKEY, LOAI_DICH_VU, ROLES } from "constants/index";
import Header from "components/Header";
import { TableWrapper, Select, HeaderSearch, InputTimeout } from "components";
import { Main } from "./styled";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { checkRole } from "utils/role-utils";
import { useEnum, useStore } from "hook";
import { refConfirm } from "app";
import Setting from "components/TableWrapper/Setting";

const TimKiemDichVu = ({ layerId, ...props }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const refCurrentFocus = useRef(null);
  const refSettings = useRef(null);
  const thongTinBenhNhan = useStore("nbDotDieuTri.thongTinBenhNhan", {});
  const listDvKham = useStore("tiepDonDichVu.listDvKham", []);
  const listDvChoose = useStore("tiepDonDichVu.listDvChoose", [], false);
  const listNbGoiDv = useStore("nbGoiDv.listNbGoiDv", []);
  const listAllPhong = useStore("phong.listAllPhong", []);
  const { doiTuong, khamSucKhoe, gioiTinh, covid, khoaTiepDonId } = useSelector(
    (state) => state.tiepDon
  );
  const { auth } = useSelector((state) => state.auth);
  const [listLoaiDichVu] = useEnum(ENUM.LOAI_DICH_VU);
  const listLoaiHinhThanhToanCuaDoiTuong = useStore(
    "loaiDoiTuongLoaiHinhTT.listLoaiHinhThanhToanCuaDoiTuong",
    []
  );
  const listDvDaTiepDon = useStore("tiepDonDichVu.listDvDaTiepDon", []);

  const {
    tiepDonDichVu: {
      searchDvTiepDon,
      searchDvKSKTiepDon,
      getDsGoiDvChiTiet,
      themDichVu,
      xoaDichVu,
      themBo,
      xoaBo,
    },
    phimTat: { onRegisterHotkey },
    loaiDoiTuongLoaiHinhTT: { getListLoaiDoiTuongTT },
  } = useDispatch();

  const [listGoiDvChoose, setListGoiDvChoose] = useState([]);

  const [state, _setState] = useState({
    active: 1,
    textSearchDv: "",
    loaiDichVu: 10,
    itemHtmlTriggerClicked: null,
    currentFocus: {},
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (thongTinBenhNhan?.loaiDoiTuongId)
      getListLoaiDoiTuongTT({
        page: "",
        size: "",
        loaiDoiTuongId: thongTinBenhNhan?.loaiDoiTuongId,
        active: true,
      });
  }, [thongTinBenhNhan]);

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: HOTKEY.TAB,
          onEvent: () => {
            setState({ idFocus: document.activeElement.id, currentFocus: {} });
          },
        },
      ],
    });
  }, []);

  // useEffect(() => {
  //   if (gioiTinh !== undefined && khoaTiepDonId)
  //     onGetListService({
  //       loaiDichVu: state.loaiDichVu,
  //       gioiTinh: gioiTinh,
  //       khoaChiDinhId: khoaTiepDonId,
  //       covid: covid && state.textSearchDv.length <= 0 ? covid : null,
  //     });
  // }, [gioiTinh, covid, state.textSearchDv, khoaTiepDonId]);

  const dataloaiDichVu = useMemo(() => {
    // if (doiTuong === 2)
    //   return listLoaiDichVu.filter((item) => item.id == 10);
    const goiDVKSK = [{ id: "ksk", ten: t("tiepDon.dvTrongHopDongKSK") }];

    return [
      ...(checkRole([ROLES["TIEP_DON"].KE_DV_KHAM])
        ? listLoaiDichVu.filter((item) => item.id === LOAI_DICH_VU.KHAM)
        : []),
      ...(checkRole([ROLES["TIEP_DON"].KE_DV_XN])
        ? listLoaiDichVu.filter((item) => item.id === LOAI_DICH_VU.XET_NGHIEM)
        : []),
      ...(checkRole([ROLES["TIEP_DON"].KE_DV_CLS])
        ? listLoaiDichVu.filter((item) => item.id === LOAI_DICH_VU.CDHA)
        : []),
      ...(checkRole([ROLES["TIEP_DON"].KE_DV_CLS])
        ? listLoaiDichVu.filter(
            (item) => item.id === LOAI_DICH_VU.PHAU_THUAT_THU_THUAT
          )
        : []),
      ...(checkRole([ROLES["TIEP_DON"].KE_GOI_DV])
        ? listLoaiDichVu.filter((item) => item.id === LOAI_DICH_VU.GOI_DICH_VU)
        : []),
      ...listLoaiDichVu.filter(
        (item) => item.id === LOAI_DICH_VU.NGOAI_DIEU_TRI
      ), // Khác
      ...(khamSucKhoe ? goiDVKSK : []),
      ...listNbGoiDv.map((x) => ({ ...x, ten: x.tenGoiDv })),
    ];
  }, [listLoaiDichVu, auth, doiTuong, listNbGoiDv, khamSucKhoe]);

  const onChangeGroupService = (value, item) => {
    //https://conf.isofh.com.vn/pages/viewpage.action?pageId=34413804
    // if (doiTuong === 2) {
    //   if (value === 10) {
    //     setState({ loaiDichVu: value });
    //     onGetListService({ loaiDichVu: value });
    //   }
    // } else {
    setState({ loaiDichVu: value });
    onGetListService({ loaiDichVu: value });
    // }
  };

  const onGetListService = (payload = {}) => {
    const _selectedGroup = dataloaiDichVu.find(
      (x) => x.id === payload.loaiDichVu
    );
    if (_selectedGroup?.goiDvId) {
      getDsGoiDvChiTiet({
        page: "",
        size: "",
        goiDvId: _selectedGroup.goiDvId,
        nbGoiDvId: _selectedGroup.id,
        nbThongTinId: thongTinBenhNhan?.nbThongTinId,
        khoaChiDinhId: khoaTiepDonId,
        dangSuDung: true,
      });
      return;
    }
    if (payload.loaiDichVu === "ksk") {
      searchDvKSKTiepDon({
        nbDotDieuTriId: id,
        hopDongKsk: true,
      });
    } else {
      searchDvTiepDon({
        gioiTinh: gioiTinh,
        covid: covid ? covid : null,
        ...payload,
        khoaChiDinhId: khoaTiepDonId,
        page: "",
        size: "",
      });
    }
  };

  let listService = useMemo(() => {
    let datacheck = listDvChoose || [];
    if (state.loaiDichVu === LOAI_DICH_VU.GOI_DICH_VU) {
      datacheck = listGoiDvChoose;
    }

    let ten = "",
      tenText = "";

    let data = (listDvKham || [])
      .filter((item) => {
        ten = `${item?.ten ? item?.ten : ""} ${
          item?.maPhong ? item?.maPhong : ""
        } ${item?.tenPhong ? item?.tenPhong : ""}`;
        tenText = ten ? ten.trim().toLowerCase().unsignText() : "";

        return tenText.indexOf(state.textSearchDv) >= 0;
      })
      .map((item, index) => {
        let dataChecked = datacheck?.filter((option) => {
          return (
            option?.dichVuId === item?.dichVuId &&
            (item?.phongId ? option?.phongId === item?.phongId : true)
          );
        });

        let checkThanhToan = dataChecked?.find((option) => option.thanhToan);
        return {
          ...item,
          checked: !!dataChecked.length,
          thanhToan: !!checkThanhToan,
          key: index,
        };
      });

    return orderBy(data, "checked", "desc");
  }, [listDvKham, listDvChoose, state.textSearchDv]);

  const onSearchService = (value) => {
    let textSearchDv = value ? value.trim().toLowerCase().unsignText() : "";
    setState({ textSearchDv });
  };

  const onSelectService = (data) => (e) => {
    //nam.mn 2021 05 20
    /*
    - update nghiệp vụ mới, cho phép chọn nhiều dịch vụ trùng nhau, bỏ trạng thái check box khi click chọn
    - yến confirm    
    */
    let listLoaiHinhMacDinh = listLoaiHinhThanhToanCuaDoiTuong.filter(
      (x) => x.macDinh
    );
    let item = {
      ...data,
      loaiHinhThanhToanId:
        listLoaiHinhMacDinh.length === 1
          ? listLoaiHinhMacDinh[0]?.loaiHinhThanhToanId
          : data?.loaiHinhThanhToanId,
    };
    let value = e?.target?.checked;
    if (state.loaiDichVu === LOAI_DICH_VU.GOI_DICH_VU) {
      if (value) {
        themBo({ boChiDinhId: item.dichVuId, nbDotDieuTriId: id });
        setListGoiDvChoose([item, ...listGoiDvChoose]);
      } else {
        xoaBo({ boChiDinhId: item.dichVuId });
        let _listGoiDvChoose = listGoiDvChoose.filter(
          (x) => x.dichVuId !== item.dichVuId
        );
        setListGoiDvChoose(_listGoiDvChoose);
      }
      return;
    }

    let service = listDvKham.find((x) => {
      return (
        x?.dichVuId === item?.dichVuId &&
        (item?.phongId ? x?.phongId === item?.phongId : true)
      );
    });
    let checkDuplicate = false;
    let index = [...listDvChoose, ...listDvDaTiepDon].find((x) => {
      return x.dichVuId === item.dichVuId && x.phongId !== item.phongId;
    });
    if (index && value) {
      refConfirm.current &&
        refConfirm.current.show(
          {
            title: t("tiepDon.trungDichVu"),
            content: t("tiepDon.xacNhanKeTrungDichVu").replace("{0}", item.ten),
            cancelText: t("common.quayLai"),
            okText: t("common.dongY"),
            classNameOkText: "button-error",
            showImg: true,
            showBtnOk: true,
          },
          () => {
            if (value) {
              themDichVu({ dsDichVu: [item], nbDotDieuTriId: id });
            } else {
              xoaDichVu({ dsDichVu: [item] });
            }
          },
          () => {}
        );
      checkDuplicate = true;
    }
    if (service && !checkDuplicate) {
      // service.checked = value;
      if (value) {
        themDichVu({ dsDichVu: [item], nbDotDieuTriId: id });
      } else {
        xoaDichVu({ dsDichVu: [item] });
      }
    }
  };

  const getTenPhong = (id) => {
    let phong = listAllPhong?.find((e) => e.id === id);
    if (phong) {
      return (
        phong?.ma + "-" + phong?.ten + (phong.toaNha ? "-" + phong.toaNha : "")
      );
    }
    return "";
  };

  useEffect(() => {
    if (state.itemHtmlTriggerClicked) {
      state.itemHtmlTriggerClicked.click();
    }
  }, [state.itemHtmlTriggerClicked]);

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        setState({
          itemHtmlTriggerClicked:
            event.target.parentElement.lastElementChild.firstElementChild,
        });
      },
    };
  };

  setTimeout(() => {
    if (refCurrentFocus.current) {
      refCurrentFocus.current.focus();
    }
  }, 1);

  return (
    <Main>
      <Header
        title={t("tiepDon.chiDinhDichVu")}
        content={
          <>
            <Select
              onChange={onChangeGroupService}
              value={state.loaiDichVu}
              placeholder={t("tiepDon.chonNhomDichVu")}
              data={dataloaiDichVu}
            />
            <div className="input-text">
              <img src={require("assets/images/welcome/search2.png")} alt="" />
              <InputTimeout
                autoFocus={true}
                placeholder={t("tiepDon.timTenDichVuPhongThucHien")}
                onChange={(e) => onSearchService(e)}
              />
            </div>
            <div className="icon-option">
              {/* <img
                src={require("assets/images/welcome/menu2.png")}
                alt=""
              />
              <img
                src={require("assets/images/welcome/iconTabletwo.png")}
                alt=""
              /> */}
            </div>
          </>
        }
      />
      <TableWrapper
        className="table"
        scroll={{ y: 453, x: 1000 }}
        ref={refSettings}
        rowKey={(record, index) =>
          `${index} - ${record.dichVuId} - ${record.phongId}`
        }
        onRow={onRow}
        rowClassName={(record) =>
          record?.checked
            ? "background-checked"
            : "checkbox_dv_" + record.dichVuId === state.idFocus
            ? "background-hover"
            : ""
        }
        columns={[
          {
            title: (
              <HeaderSearch
                title={t("tiepDon.maDV")}
                sort_key="ma"
                // // onClickSort={onClickSort}
                // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 70,
            dataIndex: "ma",
            hideSearch: true,
            i18Name: "tiepDon.maDV",
            show: true,
          },
          {
            title: (
              <HeaderSearch
                title={t("common.tenDichVu")}
                sort_key="ten"
                // // onClickSort={onClickSort}
                // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 294,
            dataIndex: "ten",
            type: true,
            hideSearch: true,
            i18Name: "common.tenDichVu",
            show: true,
          },
          {
            title: (
              <HeaderSearch
                title={t("tiepDon.donGiaKhongBh")}
                sort_key="giaKhongBaoHiem"
                // // onClickSort={onClickSort}
                // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 90,
            dataIndex: "giaKhongBaoHiem",
            hideSearch: true,
            align: "right",
            i18Name: "tiepDon.donGiaKhongBh",
            show: true,
            render: (item) => {
              return <div>{item ? item.formatPrice() : ""}</div>;
            },
          },
          {
            title: (
              <HeaderSearch
                title={t("tiepDon.donGiaBH")}
                sort_key="giaBaoHiem"
                // // onClickSort={onClickSort}
                // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 80,
            dataIndex: "giaBaoHiem",
            hideSearch: true,
            align: "right",
            i18Name: "tiepDon.donGiaBH",
            show: true,
            render: (item) => {
              return <div>{item ? item.formatPrice() : ""}</div>;
            },
          },
          {
            title: (
              <HeaderSearch
                title={t("tiepDon.phong")}
                sort_key="phongId"
                // // onClickSort={onClickSort}
                // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 200,
            dataIndex: "phongId",
            hideSearch: true,
            i18Name: "tiepDon.phong",
            show: true,

            render: (item) => {
              return getTenPhong(item);
            },
          },
          {
            title: (
              <HeaderSearch
                title={
                  <>
                    {t("common.chon")} <Setting refTable={refSettings} />
                  </>
                }
                // sort_key="ma"
                // // onClickSort={onClickSort}
                // dataSort={props.dataSortColumn && props?.dataSortColumn["tenNb"] || 0}
              />
            ),
            width: 60,
            dataIndex: "checked",
            hideSearch: true,
            align: "center",
            fixed: "right",
            render: (value, item, index) => {
              if (item?.thanhToan) {
                return (
                  <Checkbox
                    ref={
                      item.dichVuId === state.currentFocus.dichVuId
                        ? refCurrentFocus
                        : null
                    }
                    checked={value}
                    id={"checkbox_dv_" + item.dichVuId}
                    // disabled
                    className="box-item"
                  ></Checkbox>
                );
              } else {
                return (
                  <Checkbox
                    ref={
                      item.dichVuId === state.currentFocus.dichVuId
                        ? refCurrentFocus
                        : null
                    }
                    id={"checkbox_dv_" + item.dichVuId}
                    autoFocus={state.isSelect === 1 && index === 1}
                    className="box-item"
                    onChange={onSelectService(item)}
                    checked={value}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        const event = {
                          target: { checked: !e.target?.checked },
                        };
                        onSelectService(item)(event);
                        if (!e.target?.checked) {
                          setState({ currentFocus: item });
                        }
                      }
                    }}
                  />
                );
              }
            },
          },
        ]}
        dataSource={listService}
        showHeaderTable={false}
        headerMinHeight="auto"
        tableName="TABLE_TIEP_DON_TIM_KIEM_DICH_VU"
      ></TableWrapper>
    </Main>
  );
};
export default memo(TimKiemDichVu);
