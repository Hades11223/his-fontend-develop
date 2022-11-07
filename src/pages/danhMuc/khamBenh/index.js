import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import KhoaChiDinh from "components/DanhMuc/KhoaChiDinh";
import PhongThucHien from "components/DanhMuc/PhongThucHien";
import TuyChonGia from "components/DanhMuc/TuyChonGia";
import NhomChiPhi from "components/DanhMuc/NhomChiPhi";
import MultiLevelTab from "components/MultiLevelTab";
import DichVuKyThuat from "components/DanhMuc/DichVuKyThuat";
import ThongTinDichVu from "components/DanhMuc/ThongTinDichVu";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import { Main } from "./styled";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import { Col } from "antd";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import { useStore } from "hook";

const ID_LOAI_DICH_VU = 10;
const TEN_LOAI_DICH_VU = "Danh mục dịch vụ khám bệnh";

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
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
    activeKeyTab: "1",
  });

  const {
    dichVuKyThuat: { updateData, onExport, onImport },
  } = useDispatch();

  const currentItem = useStore("dichVuKyThuat.currentItem", {});

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

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
  };

  const listPanel = [
    {
      title: "Thông tin dịch vụ",
      key: 1,
      render: () => {
        return (
          <ThongTinDichVu
            refCallbackSave={refSave1}
            loaiDichVu={ID_LOAI_DICH_VU}
            currentItem={currentItem}
            updateData={updateData}
            roleSave={[ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_THEM]}
            roleEdit={[ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_SUA])
                : !checkRole([ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_THEM])
            }
            isRequireChuyenKhoa={true}
            refTab={refTab}
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
            roleSave={[ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_THEM]}
            roleEdit={[ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_SUA])
                : !checkRole([ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_THEM])
            }
          />
        );
      },
    },
    {
      key: 3,
      title: "Khoa chỉ định dịch vụ",
      render: () => {
        return (
          <KhoaChiDinh
            refCallbackSave={refSave3}
            dichVuId={currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_THEM]}
            roleEdit={[ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_SUA])
                : !checkRole([ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_THEM])
            }
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
            roleSave={[ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_THEM]}
            roleEdit={[ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_SUA])
                : !checkRole([ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_THEM])
            }
          />
        );
      },
    },
    {
      key: 5,
      title: "Nhóm chi phí",
      render: () => {
        return (
          <NhomChiPhi
            refCallbackSave={refSave5}
            dichVuId={currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_THEM]}
            roleEdit={[ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_SUA])
                : !checkRole([ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_THEM])
            }
          />
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
              onExport({
                id: ID_LOAI_DICH_VU,
                ten: TEN_LOAI_DICH_VU,
              })
            }
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].DICH_VU_KHAM_BENH_THEM])
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

export default DichVuKham;
