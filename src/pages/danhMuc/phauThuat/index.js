import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import KhoaChiDinh from "components/DanhMuc/KhoaChiDinh";
import PhongThucHien from "components/DanhMuc/PhongThucHien";
import TuyChonGia from "components/DanhMuc/TuyChonGia";
import MultiLevelTab from "components/MultiLevelTab";
import DichVuKyThuat from "components/DanhMuc/DichVuKyThuat";
import ThongTinDichVu from "components/DanhMuc/ThongTinDichVu";
import NhomChiPhi from "components/DanhMuc/NhomChiPhi";
import MucDichSuDung from "components/DanhMuc/MucDichSuDung";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import { Main } from "./styled";
import {
  SORT_DEFAULT,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT_COLLAPSE,
} from "./configs";
import { ADD_LAYOUT, TABLE_LAYOUT } from "constants/index";
import { Col } from "antd";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import { useTranslation } from "react-i18next";
const DichVuKham = (props) => {
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
  const { t } = useTranslation();
  const [editStatus, setEditStatus] = useState(false);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
    activeKeyTab: "1",
  });
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

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
      !props.currentItem?.hanCheKhoaChiDinh &&
      state.activeKeyTab === "khoaChiDinh"
    ) {
      setState({ activeKeyTab: "1" });
    }
  }, [props.currentItem]);

  refClickBtnSave.current = (e) => {
    const { activeKeyTab } = state;
    if (activeKeyTab === "1" && refSave1.current) refSave1.current(e);
    if (activeKeyTab === "2" && refSave2.current) refSave2.current(e);
    if (activeKeyTab === "3" && refSave3.current) refSave3.current(e);
    if (activeKeyTab === "4" && refSave4.current) refSave4.current(e);
    if (activeKeyTab === "5" && refSave5.current) refSave5.current(e);
    if (activeKeyTab === "6" && refSave6.current) refSave6.current(e);
  };

  const listPanel = [
    {
      title: "Thông tin dịch vụ",
      key: 1,
      show: true,
      render: () => {
        return (
          <ThongTinDichVu
            refCallbackSave={refSave1}
            loaiDichVu={40}
            currentItem={props.currentItem}
            updateData={props.updateData}
            roleSave={[ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_THEM]}
            roleEdit={[ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_SUA])
                : !checkRole([ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_THEM])
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
            refCallbackSave={refSave2}
            dichVuId={props.currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_THEM]}
            roleEdit={[ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_SUA])
                : !checkRole([ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_THEM])
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
            dichVuId={props.currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_THEM]}
            roleEdit={[ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_SUA])
                : !checkRole([ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_THEM])
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
            dichVuId={props.currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_THEM]}
            roleEdit={[ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_SUA])
                : !checkRole([ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_THEM])
            }
          />
        );
      },
    },
    {
      key: 5,
      title: "Nhóm chi phí",
      show: true,
      render: () => {
        return (
          <NhomChiPhi
            refCallbackSave={refSave5}
            dichVuId={props.currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_THEM]}
            roleEdit={[ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_SUA])
                : !checkRole([ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_THEM])
            }
          />
        );
      },
    },
    {
      key: 6,
      title: `${t("danhMuc.mucDichSuDung")}(TT35)`,
      show: props.currentItem?.dichVu?.mucDichSuDung,
      render: () => {
        return (
          <MucDichSuDung
            refCallbackSave={refSave6}
            dichVuId={props.currentItem?.id}
            currentItem={props.currentItem}
          />
        );
      },
    },
  ];

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    props.updateData({
      currentItem: { tachSoLuong: true },
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
            loaiDichVu={40}
            title="Danh mục DV phẫu thuật - thủ thuật"
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].DV_PHAU_THUAT_THU_THUAT_THEM])
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
    chuyenKhoa: { listAllChuyenKhoa = [] },
    donViTinh: { listAllDonViTinh = [] },
    utils: {
      listnhomChiPhiBh = [],
      listgioiTinh = [],
      listdoiTuongSuDung = [],
    },
    nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
    nhomDichVuCap2: { listAllNhomDichVuCap2 = [] },
    nhomDichVuCap3: { listAllNhomDichVuCap3 = [] },
  } = state;

  return {
    listData,
    listnhomChiPhiBh,
    listgioiTinh,
    listdoiTuongSuDung,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    listAllChuyenKhoa,
    listAllDonViTinh,
    listAllNhomDichVuCap1,
    listAllNhomDichVuCap2,
    listAllNhomDichVuCap3,
  };
};
const mapDispatchToProps = ({
  dichVuKyThuat: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  utils: { getUtils },
  nhomDichVuCap1: { getAllDichVuCap1 },
  nhomDichVuCap2: { getAllDichVuCap2 },
  nhomDichVuCap3: { getAllDichVuCap3 },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  getAllDichVuCap1,
  getAllDichVuCap2,
  getAllDichVuCap3,
});

export default connect(mapStateToProps, mapDispatchToProps)(DichVuKham);
