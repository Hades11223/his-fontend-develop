import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import MultiLevelTab from "components/MultiLevelTab";
import DichVuKyThuat from "components/DanhMuc/DichVuKyThuat";
import DichVuKemTheo from "components/DanhMuc/DichVuKemTheo";
import TuyChonGia from "components/DanhMuc/TuyChonGia";
import KhoaChiDinh from "components/DanhMuc/KhoaChiDinh";
import PhongThucHien from "components/DanhMuc/PhongThucHien";
import NhomChiPhi from "components/DanhMuc/NhomChiPhi";
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
let timer = null;

const ServicesPack = (props) => {
  const refTab = useRef();
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const [editStatus, setEditStatus] = useState(false);
  const { currentItem, getUtils } = props;
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    // props.onSizeChange({ size: 10, loaiDichVu: 120 });
    // getUtils({ name: "loaiMau" });
    // getUtils({ name: "nhomChiPhiBh" });
    // getUtils({ name: "nguonKhacChiTra" });
    props.getUtils({ name: "PhanLoaiPtTt" });
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
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const listPanel = [
    {
      title: "Thông tin dịch vụ",
      key: 1,
      render: () => {
        return (
          <ThongTinDichVu
            loaiDichVu={120}
            currentItem={props.currentItem}
            roleSave={[ROLES["DANH_MUC"].CHE_PHAM_MAU_THEM]}
            roleEdit={[ROLES["DANH_MUC"].CHE_PHAM_MAU_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].CHE_PHAM_MAU_SUA])
                : !checkRole([ROLES["DANH_MUC"].CHE_PHAM_MAU_THEM])
            }
            layerId={refLayerHotKey.current}
            ignoreFetch={true}
            refTab={refTab}
          />
        );
      },
    },
    {
      key: 2,
      title: "Dịch vụ kèm theo",
      render: () => {
        return (
          <DichVuKemTheo
            // loaiDichVu={currentItem?.loaiDichVu}
            dichVuId={currentItem?.id}
            dsLoaiDichVu={[10, 20, 30, 90, 100]}
            roleSave={[ROLES["DANH_MUC"].CHE_PHAM_MAU_THEM]}
            roleEdit={[ROLES["DANH_MUC"].CHE_PHAM_MAU_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].CHE_PHAM_MAU_SUA])
                : !checkRole([ROLES["DANH_MUC"].CHE_PHAM_MAU_THEM])
            }
            layerId={refLayerHotKey.current}
          />
        );
      },
    },
    // {
    //   key: 3,
    //   title: "Tùy chọn giá",
    //   render: () => {
    //     return <TuyChonGia dichVuId={currentItem?.id} />;
    //   },
    // },
    {
      key: 3,
      title: "Khoa chỉ định dịch vụ",
      key: "khoaChiDinh",
      render: () => {
        return <KhoaChiDinh dichVuId={currentItem?.id} />;
      },
    },
    // {
    //   key: 5,
    //   title: "Phòng thực hiện",
    //   render: () => {
    //     return <PhongThucHien dichVuId={currentItem?.id} />;
    //   },
    // },
    {
      key: 4,
      title: "Nhóm chi phí",
      render: () => {
        return <NhomChiPhi dichVuId={currentItem?.id} />;
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
      currentItem: { phiVanChuyen: true },
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
            setEditStatus={setEditStatus}
            loaiDichVu={120}
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            title="Danh mục chế phẩm máu"
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].CHE_PHAM_MAU_THEM])
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
            layerId={refLayerHotKey.current}
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
              ref={refTab}
              defaultActiveKey={1}
              listPanel={listPanel}
              isBoxTabs={true}
            ></MultiLevelTab>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    dichVuKyThuat: { currentItem },
  } = state;

  return {
    currentItem,
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
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesPack);
