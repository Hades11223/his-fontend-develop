import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import ThietLapChonKho from "components/DanhMuc/ThietLapChonKho";
import KhoTrucThuoc from "components/DanhMuc/KhoTrucThuoc";
import NhanVienQuanLy from "components/DanhMuc/NhanVienQuanLy";
import MultiLevelTab from "components/MultiLevelTab";
import Kho from "components/DanhMuc/Kho";
import ThongTinKho from "components/DanhMuc/ThongTinKho";
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

const QuanTriKho = (props) => {
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
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
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const listPanel = [
    {
      title: "Thông tin kho",
      key: 1,
      render: () => {
        return (
          <ThongTinKho
            currentItem={props.currentItem}
            layerId={refLayerHotKey.current}
          />
        );
      },
    },
    {
      key: 2,
      title: "Kho trực thuộc",
      render: () => {
        return <KhoTrucThuoc khoQuanLyId={props.currentItem?.id} />;
      },
    },
    {
      key: 3,
      title: "Thiết lập kho chỉ định",
      render: () => {
        return <ThietLapChonKho khoId={props.currentItem?.id} />;
      },
    },
    {
      key: 4,
      title: "Nhân viên quản lý",
      render: () => {
        return <NhanVienQuanLy khoId={props.currentItem?.id} />;
      },
    },
  ];

  const handleClickedBtnAdded = () => {
    props.updateData({
      currentItem: {},
    });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

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
  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };

  return (
    <Main>
      <HomeWrapper
        title="Kho"
        listLink={[
          { title: "Kho", link: "/kho" },
          {
            title: "Thiết lập quản trị kho",
            link: "/kho/quan-tri-kho",
          },
        ]}
      >
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
          <Kho
            title="Quản trị kho"
            scroll={{ x: 1000 }}
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
                title: "Thêm mới",
                onClick: handleClickedBtnAdded,
                buttonHeaderIcon: (
                  <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                ),
              },
              {
                className: `btn-change-full-table ${state?.showFullTable ? "small" : "large"}`,
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
            layerId={refLayerHotKey.current}
          />
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`tab-area mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            <MultiLevelTab
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
    kho: { listData, totalElements, page, size, currentItem },
    utils: {},
  } = state;

  return {
    listData,
    currentItem,
    totalElements,
    page,
    size,
  };
};
const mapDispatchToProps = ({
  kho: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  utils: { getUtils },
}) => ({
  getUtils,
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuanTriKho);
