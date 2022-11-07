import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import ThongTinDichVu from "components/DanhMuc/ThongTinDichVu";
import DichVuKemTheo from "components/DanhMuc/DichVuKemTheo";
import PhongThucHien from "components/DanhMuc/PhongThucHien";
import KhoaChiDinh from "components/DanhMuc/KhoaChiDinh";
import NhomChiPhi from "components/DanhMuc/NhomChiPhi";
import TuyChonGia from "components/DanhMuc/TuyChonGia";
import MultiLevelTab from "components/MultiLevelTab";
import { Main } from "./styled";
import DichVuKyThuat from "components/DanhMuc/DichVuKyThuat";
import { SORT_DEFAULT } from "./configs";
import { Col } from "antd";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  ROLES
} from "constants/index";
import { checkRole } from "utils/role-utils";
import stringUtils from "mainam-react-native-string-utils";
import { useTranslation } from "react-i18next";
import MucDichSuDung from "components/DanhMuc/MucDichSuDung";

const ID_LOAI_DICH_VU = 30;
const TEN_LOAI_DICH_VU = "Danh mục dịch vụ CĐHA-TDCN";

const ServicesPack = (props) => {
  const refTab = useRef();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSave1 = useRef();
  const refSave2 = useRef();
  const refSave3 = useRef();
  const refSave4 = useRef();
  const refSave5 = useRef();
  const refSave6 = useRef();
  const refSave7 = useRef();
  const { t } = useTranslation();
  const [editStatus, setEditStatus] = useState(false);
  const { currentItem, getUtils, onImport, onExport } = props;
  const [collapseStatus, setCollapseStatus] = useState(false);
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const [state, _setState] = useState({
    showFullTable: false,
    activeKeyTab: "1",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    props.onSizeChange({ size: 10, loaiDichVu: ID_LOAI_DICH_VU });
    getUtils({ name: "gioiTinh" });
    getUtils({ name: "doiTuongSuDung" });
    getUtils({ name: "nhomChiPhiBh" });
    getUtils({ name: "nguonKhacChiTra" });
  }, []);
  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAdd.current && refClickBtnAdd.current();
          },
        },
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
      props.updateData({ currentItem: {} });
    };
  }, []);

  useEffect(() => {
    if (
      !currentItem?.hanCheKhoaChiDinh &&
      state.activeKeyTab === "khoaChiDinh"
    ) {
      setState({ activeKeyTab: "1" });
    }
  }, [currentItem]);

  refClickBtnSave.current = (e) => {
    const { activeKeyTab } = state;
    if (activeKeyTab === "1" && refSave1.current) refSave1.current(e);
    if (activeKeyTab === "2" && refSave2.current) refSave2.current(e);
    if (activeKeyTab === "3" && refSave3.current) refSave3.current(e);
    if (activeKeyTab === "4" && refSave4.current) refSave4.current(e);
    if (activeKeyTab === "5" && refSave5.current) refSave5.current(e);
    if (activeKeyTab === "6" && refSave6.current) refSave6.current(e);
    if (activeKeyTab === "7" && refSave7.current) refSave7.current(e);
  };

  const listPanel = [
    {
      title: "Thông tin dịch vụ",
      key: 1,
      show: true,
      render: () => {
        return (
          <ThongTinDichVu
            updateData={props.updateData}
            refCallbackSave={refSave1}
            currentItem={currentItem}
            loaiDichVu={ID_LOAI_DICH_VU}
            roleSave={[ROLES["DANH_MUC"].CDHA_TDCN_THEM]}
            roleEdit={[ROLES["DANH_MUC"].CDHA_TDCN_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_SUA])
                : !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_THEM])
            }
            refTab={refTab}
          />
        );
      },
    },
    {
      key: 2,
      title: "Tùy chọn giá",
      show: true,
      render: () => {
        return (
          <TuyChonGia
            dichVuId={currentItem?.id}
            refCallbackSave={refSave2}
            roleSave={[ROLES["DANH_MUC"].CDHA_TDCN_THEM]}
            roleEdit={[ROLES["DANH_MUC"].CDHA_TDCN_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_SUA])
                : !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_THEM])
            }
          />
        );
      },
    },
    {
      // key: 3,
      title: "Khoa chỉ định dịch vụ",
      key: "khoaChiDinh",
      show: true,
      render: () => {
        return (
          <KhoaChiDinh
            refCallbackSave={refSave3}
            dichVuId={currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].CDHA_TDCN_THEM]}
            roleEdit={[ROLES["DANH_MUC"].CDHA_TDCN_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_SUA])
                : !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_THEM])
            }
          />
        );
      },
    },
    {
      key: 4,
      title: "Phòng thực hiện",
      show: true,
      render: () => {
        return (
          <PhongThucHien
            refCallbackSave={refSave4}
            dichVuId={currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].CDHA_TDCN_THEM]}
            roleEdit={[ROLES["DANH_MUC"].CDHA_TDCN_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_SUA])
                : !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_THEM])
            }
          />
        );
      },
    },
    {
      key: 5,
      title: "Dịch vụ kèm theo",
      show: true,
      render: () => {
        return (
          <DichVuKemTheo
            refCallbackSave={refSave5}
            dichVuId={currentItem?.id}
            dsLoaiDichVu={[90, 100]}
            roleSave={[ROLES["DANH_MUC"].CDHA_TDCN_THEM]}
            roleEdit={[ROLES["DANH_MUC"].CDHA_TDCN_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_SUA])
                : !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_THEM])
            }
          />
        );
      },
    },
    {
      key: 6,
      title: "Nhóm chi phí",
      show: true,
      render: () => {
        return (
          <NhomChiPhi
            refCallbackSave={refSave6}
            dichVuId={currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].CDHA_TDCN_THEM]}
            roleEdit={[ROLES["DANH_MUC"].CDHA_TDCN_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_SUA])
                : !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_THEM])
            }
          />
        );
      },
    },
    {
      key: 7,
      title: `${t("danhMuc.mucDichSuDung")}(TT35)`,
      show: props.currentItem?.dichVu?.mucDichSuDung,
      render: () => {
        return (
          <MucDichSuDung
            refCallbackSave={refSave7}
            dichVuId={props.currentItem?.id}
            currentItem={props.currentItem}
          />
        );
      },
    },
  ];

  const onShowAndHandleUpdate = (data = {}) => {
    props.updateData({
      currentItem: { ...data },
    });
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    props.updateData({
      currentItem: {
        tachSoLuong: true,
      },
    });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
  const handleChangeshowTable = () => {
    setState({
      changeShowFullTbale: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTbale: false,
      });
    }, 1000);
  };
  // const refAutoFocus = useRef(null);
  // useEffect(() => {
  //   if (refAutoFocus.current) {
  //     refAutoFocus.current.focus();
  //   }
  // }, [dataEditDefault]);
  return (
    <Main>
      <HomeWrapper title="Danh mục">
        <Col
          {...(!state.showFullTable
            ? collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          span={state.showFullTable ? 24 : null}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <DichVuKyThuat
            layerId={refLayerHotKey.current}
            setEditStatus={setEditStatus}
            loaiDichVu={ID_LOAI_DICH_VU}
            title={TEN_LOAI_DICH_VU}
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            onImport={onImport}
            onExport={() =>
              onExport({ id: ID_LOAI_DICH_VU, ten: TEN_LOAI_DICH_VU })
            }
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].CDHA_TDCN_THEM])
                ? [
                    {
                      title: "Thêm mới [F1]",
                      onClick: handleClickedBtnAdded,
                      buttonHeaderIcon: (
                        <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                      ),
                    },
                    {
                      className: `btn-change-full-table ${
                        state?.showFullTable ? "small" : "large"
                      }`,
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
                : [
                    {
                      className: `btn-change-full-table ${
                        state?.showFullTable ? "small" : "large"
                      }`,
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
            }
          />
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            <MultiLevelTab
              // defaultActiveKey={1}
              ref={refTab}
              listPanel={listPanel.filter((x) => x.show)}
              isBoxTabs={true}
              activeKey={state.activeKeyTab}
              onChange={(activeKeyTab) => setState({ activeKeyTab })}
            ></MultiLevelTab>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    dichVuKyThuat: {
      listData,
      totalElements,
      page,
      size,
      dataSearch,
      dataSort,
      currentItem,
      dataSortColumn,
    },
    utils: {
      listgioiTinh = [],
      listnhomChiPhiBh = [],
      listnguonKhacChiTra = [],
      listdoiTuongSuDung = [],
    },
  } = state;

  return {
    listdoiTuongSuDung,
    listData,
    listgioiTinh,
    listnhomChiPhiBh,
    listnguonKhacChiTra,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
  };
};
const mapDispatchToProps = ({
  dichVuKyThuat: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    onImport,
    onExport,
  },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  onImport,
  onExport,
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesPack);
