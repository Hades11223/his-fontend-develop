import { Col, Form } from "antd";
import {
  ROLES,
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  TABLE_LAYOUT,
  ADD_LAYOUT,
  PAGE_DEFAULT,
} from "constants/index";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { combineSort } from "../../../utils";
import BaseDm3 from "pages/danhMuc/BaseDm3";
import { checkRole } from "utils/role-utils";
import MultiLevelTab from "components/MultiLevelTab";
import stringUtils from "mainam-react-native-string-utils";
import ThongTinDichVu from "./components/ThongTinDichVu";
import LoaiHinhThanhToan from "./components/LoaiHinhThanhToan";
import DanhMucLoaiDoiTuong from "./components/DanhMucLoaiDoiTuong";
import { useTranslation } from "react-i18next";

const roleAddLoaiDoiTuong = ROLES["DANH_MUC"].LOAI_DOI_TUONG_THEM
const roleEditLoaiDoiTuong = ROLES["DANH_MUC"].LOAI_DOI_TUONG_SUA

const LoaiDoiTuong = () => {
  const { t } = useTranslation()

  const {
    loaiDoiTuong: {
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSortColumn
    },
  } = useSelector(state => state)

  const {
    loaiDoiTuong: {
      getListLoaiDoiTuong,
      createOrEdit,
      updateData
    },
    utils: { getUtils },
    loaiDoiTuongLoaiHinhTT: { updateData: updateDataLoaiHinhTT }
  } = useDispatch()


  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickSaveBtnHotKey = useRef(null);
  const refLoaiHinhTT = useRef({});
  const refAutoFocus = useRef(null);
  const refClickBtnAddHotKey = useRef();
  const loaiHinhThanhToanRef = useRef({ refLoaiHinhTT, refLayerHotKey })


  const [form] = Form.useForm();
  const [state, _setState] = useState({
    editStatus: false,
    activeKeyTab: "1",
    isFormEdit: false,

    showFullTable: false,
    collapseStatus: false,
    changeShowFullTable: false,
  })
  const setState = (data = {}) => _setState(state => ({ ...state, ...data }))

  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const handleClickedBtnAddHotKey = () => {
    setState({ editStatus: false });
    form.resetFields();
    refAutoFocus.current.focus();
    updateData({ dataEditDefault: {} });
    updateDataLoaiHinhTT({ listLoaiHinhThanhToanCuaDoiTuong: [] })
    setState({ activeKeyTab: "1" })
    refLoaiHinhTT.current.handleResetData && refLoaiHinhTT.current.handleResetData()
  };


  const handleCancelBtn = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
    refLoaiHinhTT.current.handleCancelDataTable && refLoaiHinhTT.current.handleCancelDataTable()
  };

  const handleSaveBtn = (e) => {
    if (e?.preventDefault) e.preventDefault();
    state.isFormEdit &&
      form
        .validateFields()
        .then(async (values) => {
          const body = { ...values, id: dataEditDefault.id };

          createOrEdit(body).then((res) => {
            const params = {
              page,
              size,
              ...dataSearch,
              sort: combineSort(
                dataEditDefault.id ? dataSortColumn : { createdAt: 2 }
              ),
            };
            if (!state.editStatus) {
              params.page = PAGE_DEFAULT;
            }

            if (res && res.code === 0) {
              getListLoaiDoiTuong({ size: 10 })
            }
          });

        })
        .catch((error) => {
          if (error?.errorFields?.length) setState({ activeKeyTab: "1" })
        });
    refLoaiHinhTT.current.handleSaveDataTable && refLoaiHinhTT.current.handleSaveDataTable({ loaiDoiTuongId: dataEditDefault.id })
  };

  refClickSaveBtnHotKey.current = handleSaveBtn;
  refClickBtnAddHotKey.current = handleClickedBtnAddHotKey

  useEffect(() => {
    getUtils({ name: "doiTuong" });
    getUtils({ name: "loaiMienGiam" });
    getListLoaiDoiTuong({ size: 10 })
  }, []);

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });

    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAddHotKey.current && refClickBtnAddHotKey.current();
          },
        },
        {
          keyCode: 115, //F4
          onEvent: () => {
            refClickSaveBtnHotKey.current && refClickSaveBtnHotKey.current();
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
      title: "THÔNG TIN LOẠI ĐỐI TƯỢNG",
      key: "1",
      render: () => {
        return (
          <ThongTinDichVu
            ref={refAutoFocus}
            form={form}
            editStatus={state.editStatus}
            changeFormEdit={(bool) => setState({ isFormEdit: bool })}
          />
        );
      },
    },
    {
      key: "2",
      title: "LOẠI HÌNH THANH TOÁN",
      render: () => {
        return (
          <LoaiHinhThanhToan
            ref={loaiHinhThanhToanRef}
            editStatus={state.editStatus}

          />
        );
      },
    },
  ];


  const handleChangeShowTable = () => {
    setState({
      changeShowFullTable: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTable: false,
      });
    }, 1000);
  };

  const handleCollapsePane = () => {
    setState({ collapseStatus: !state.collapseStatus });
  };

  
  return (
    <BaseDm3
      breadcrumb={[
        { title: "Danh mục", link: "/danh-muc" },
        {
          title: t("danhMuc.danhMucLoaiDoiTuong"),
          link: "/danh-muc/loai-doi-tuong",
        },
      ]}
    >
      <Col
        {...(!state.showFullTable
          ? state.collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT
          : null)}
        span={state.showFullTable ? 24 : null}
        className={`pr-3 ${state.changeShowFullTable ? "" : "transition-ease"}`}
      >
        <DanhMucLoaiDoiTuong
          ref={refClickBtnAddHotKey}
          form={form}
          layerId={refLayerHotKey.current}
          roleAdd={checkRole([roleAddLoaiDoiTuong])}
          onSetEditMode={() => setState({ editStatus: true })}
          onChangeShowTable={handleChangeShowTable}
          onCollapsePane={handleCollapsePane}
          showFullTable={state.showFullTable}
          collapseStatus={state.collapseStatus}
        />
      </Col>
      {!state.showFullTable && (
        <Col
          {...(state.collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
          className={`mt-3 ${state.changeShowFullTable ? "" : "transition-ease"
            }`}
        >
          <MultiLevelTab
            listPanel={listPanel}
            isBoxTabs={true}
            activeKey={state.activeKeyTab}
            onChange={(activeKeyTab) => setState({ activeKeyTab })}
            layerId={refLayerHotKey.current}
            roleEdit={checkRole([roleEditLoaiDoiTuong])}
            onCancelBtn={handleCancelBtn}
            onSaveBtn={handleSaveBtn}
          />
        </Col>
      )}
    </BaseDm3>
  );
};

export default LoaiDoiTuong;
