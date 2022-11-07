import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import DichVuKemTheo from "components/DanhMuc/DichVuKemTheo";
import NhomChiPhi from "components/DanhMuc/NhomChiPhi";
import PhongThucHien from "components/DanhMuc/PhongThucHien";
import KhoaChiDinh from "components/DanhMuc/KhoaChiDinh";
import TuyChonGia from "components/DanhMuc/TuyChonGia";
import MultiLevelTab from "components/MultiLevelTab";
import DanhSachDichVu from "./components/DanhSachDichVu";
import ThongTinDichVu from "./components/ThongTinDichVu";
import { Main } from "./styled";
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
} from "constants/index";
import { Col } from "antd";
import stringUtils from "mainam-react-native-string-utils";
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
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
    activeKeyTab: "1",
  });
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const {
    dichVuGiuong: { updateData },
  } = useDispatch();
  const {
    dichVuGiuong: { currentItem },
  } = useSelector((state) => state);
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
      updateData({ currentItem: {} });
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
  const listPanel = [
    {
      title: "Thông tin dịch vụ",
      key: 1,
      render: () => {
        return (
          <ThongTinDichVu
            updateData={updateData}
            refCallbackSave={refSave1}
            currentItem={currentItem}
            refTab={refTab}
            // roleSave={[ROLES["DANH_MUC"].DICH_VU_XN_THEM]}
            // roleEdit={[ROLES["DANH_MUC"].DICH_VU_XN_SUA]}
            // editStatus={
            //   editStatus
            //     ? !checkRole([ROLES["DANH_MUC"].DICH_VU_XN_SUA])
            //     : !checkRole([ROLES["DANH_MUC"].DICH_VU_XN_THEM])
            // }
          />
        );
      },
    },
    {
      key: 2,
      title: "Tùy chọn giá",
      render: () => {
        return (
          <TuyChonGia
            refCallbackSave={refSave2}
            dichVuId={currentItem?.id}
            // roleSave={[ROLES["DANH_MUC"].DICH_VU_XN_THEM]}
            // roleEdit={[ROLES["DANH_MUC"].DICH_VU_XN_SUA]}
            // editStatus={
            //   editStatus
            //     ? !checkRole([ROLES["DANH_MUC"].DICH_VU_XN_SUA])
            //     : !checkRole([ROLES["DANH_MUC"].DICH_VU_XN_THEM])
            // }
          />
        );
      },
    },
    {
      // key: 3,
      title: "Khoa chỉ định dịch vụ",
      key: "khoaChiDinh",
      render: () => {
        return (
          <KhoaChiDinh
            refCallbackSave={refSave3}
            dichVuId={currentItem?.id}
            // roleSave={[ROLES["DANH_MUC"].DICH_VU_XN_THEM]}
            // roleEdit={[ROLES["DANH_MUC"].DICH_VU_XN_SUA]}
            // editStatus={
            //   editStatus
            //     ? !checkRole([ROLES["DANH_MUC"].DICH_VU_XN_SUA])
            //     : !checkRole([ROLES["DANH_MUC"].DICH_VU_XN_THEM])
            // }
          />
        );
      },
    },
    {
      key: 4,
      title: "Phòng thực hiện",
      render: () => {
        return (
          <PhongThucHien
            refCallbackSave={refSave4}
            dichVuId={currentItem?.id}
            // roleSave={[ROLES["DANH_MUC"].DICH_VU_XN_THEM]}
            // roleEdit={[ROLES["DANH_MUC"].DICH_VU_XN_SUA]}
            // editStatus={
            //   editStatus
            //     ? !checkRole([ROLES["DANH_MUC"].DICH_VU_XN_SUA])
            //     : !checkRole([ROLES["DANH_MUC"].DICH_VU_XN_THEM])
            // }
          />
        );
      },
    },
    {
      key: 5,
      title: "Dịch vụ kèm theo",
      render: () => {
        return (
          <DichVuKemTheo
            refCallbackSave={refSave5}
            dichVuId={currentItem?.id}
            dsLoaiDichVu={[90, 100]}
            loaiDichVu={130}
            // roleSave={[ROLES["DANH_MUC"].DICH_VU_XN_THEM]}
            // roleEdit={[ROLES["DANH_MUC"].DICH_VU_XN_SUA]}
            // editStatus={
            //   editStatus
            //     ? !checkRole([ROLES["DANH_MUC"].DICH_VU_XN_SUA])
            //     : !checkRole([ROLES["DANH_MUC"].DICH_VU_XN_THEM])
            // }
          />
        );
      },
    },
    {
      key: 6,
      title: "Nhóm chi phí",
      render: () => {
        return (
          <NhomChiPhi refCallbackSave={refSave6} dichVuId={currentItem?.id} />
        );
      },
    },
  ];

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    updateData({
      currentItem: {},
    });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
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
          <DanhSachDichVu
            layerId={refLayerHotKey.current}
            setEditStatus={setEditStatus}
            title="Danh mục dịch vụ giường"
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            buttonHeader={[
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
                  <Icon component={state.showFullTable ? thuNho : showFull} />
                ),
                onClick: handleChangeshowTable,
              },

              {
                className: "btn-collapse",
                title: (
                  <Icon
                    component={collapseStatus ? extendTable : extendChiTiet}
                  />
                ),
                onClick: handleCollapsePane,
              },
            ]}
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
              listPanel={listPanel}
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
export default ServicesPack;
