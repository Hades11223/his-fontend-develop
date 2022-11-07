import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Main } from "./styled";
import { combineSort } from "utils";
import {
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT_COLLAPSE,
} from "constants/index";
import { Col, Form } from "antd";
import stringUtils from "mainam-react-native-string-utils";
import ThongTinChiTiet from "./ThongTinChiTiet";
import ThongTinKhoaPhong from "./ThongTinKhoaPhong";
import DanhSachNhanVien from "./DanhSachNhanVien";
import BaseDm3 from "pages/danhMuc/BaseDm3"
import MultiLevelTab from "components/MultiLevelTab";


const NhanVien = () => {
  const [dataSortColumn, setDataSortColumn] = useState({ active: 2, id: 2 });
  const [editStatus, setEditStatus] = useState(false);
  const [logo, setLogo] = useState();
  const [anhKy, setAnhKy] = useState();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const {
    page,
    size,
    dataEditDefault,
    dataSearch,
  } = useSelector((state) => state.nhanVien);

  const { getListNhanVien, updateData, createOrEdit } = useDispatch().nhanVien;

  const [state, _setState] = useState({
    showFullTable: false,
    activeKey: "0"
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const [form] = Form.useForm();

  const refAutoFocus = useRef();
  const refLayerHotKey = useRef(stringUtils.guid());
  const ref = useRef({ refAutoFocus, refLayerHotKey });

  const {
    phimTat: { onAddLayer, onRemoveLayer },
    phong: { getListAllPhong },
    toaNha: { getListAllToaNha }
  } = useDispatch();

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    getListNhanVien(params);
  }, []);

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    data.ngaySinh = data.ngaySinh && moment(data.ngaySinh);
    data.dsChuyenKhoaId = data.dsChuyenKhoaId || [];
    updateData({ dataEditDefault: data });
    setLogo(data.anhDaiDien);
    setAnhKy(data.anhKy);
    form.setFieldsValue(data);
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        onShowAndHandleUpdate(record.action);
        getListAllPhong({ active: true, page: "", size: "" });
        getListAllToaNha({ active: true, page: "", size: "" });
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    form.resetFields();
    updateData({ dataEditDefault: {} });
    setLogo(null);
    setAnhKy(null);

    if (refAutoFocus.current) {
      setTimeout(() => {
        refAutoFocus.current.focus();
      }, 50);
    }
  };

  const onChangeTab = (activeTab) => setState({ activeKey: activeTab });

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

  const handleCancel = () => {
    if (editStatus) {
      dataEditDefault.ngaySinh =
        dataEditDefault.ngaySinh && moment(dataEditDefault.ngaySinh);
      dataEditDefault.dsChuyenKhoaId = dataEditDefault.dsChuyenKhoaId || [];
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
    setIsRefresh(!isRefresh);
  };

  const getDsKhoa = () => {
    // let dsKhoa = [];
    // if (!editStatus && dsKhoaPhong.length === 0) {
    //   return dsKhoa;
    // }
    // let thongTinKhoaPhong =
    //   dsKhoaPhong.length === 0 ? dataEditDefault.dsKhoa : dsKhoaPhong;
    // dsKhoa = thongTinKhoaPhong.map((e) => {
    //   let obj = {};
    //   obj.khoaId = e.khoa.id;
    //   obj.khoaQuanLy = e.khoaQuanLy;
    //   if (e.dsPhong) {
    //     obj.dsPhongId = e.dsPhong.map((i) => i.id);
    //   }
    //   if (e.dsToaNha) {
    //     obj.dsToaNhaId = e.dsToaNha.map((i) => i.id);
    //   }
    //   return obj;
    // });
    // return dsKhoa;

    return (dataEditDefault.dsKhoa || []).map((e) => {
      let obj = {};
      obj.khoaId = e.khoa.id;
      obj.khoaQuanLy = e.khoaQuanLy;
      if (e.dsPhong) {
        obj.dsPhongId = e.dsPhong.map((i) => i.id);
      }
      if (e.dsToaNha) {
        obj.dsToaNhaId = e.dsToaNha.map((i) => i.id);
      } 
      return obj;
    });
  };

  const handleAdded = (e) => {
    if (e?.preventDefault) e.preventDefault();
    form
      .validateFields()
      .then(async (values) => {
        let dsKhoa = getDsKhoa();
        values = { ...values, dsKhoa };
        if (editStatus) {
          values = { ...values, id: dataEditDefault.id, dsKhoa };
        }
        // console.log("values", values);
        createOrEdit(values).then(() => {
          const params = {
            page,
            size,
            ...dataSearch,
            sort: combineSort(dataSortColumn),
          };
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
            form.resetFields();
          }
          getListNhanVien(params);
        });
      })
      .catch((error) => {
        if (error.errorFields?.length)
          onChangeTab("0")
      });
  };


  const listPanel = [
    {
      title: "THÔNG TIN CHI TIẾT",
      key: "0",
      render: () => {
        return (
          <ThongTinChiTiet
            form={form}
            editStatus={editStatus}
            anhKy={anhKy}
            setAnhKy={setAnhKy}
            logo={logo}
            setLogo={setLogo}
            ref={ref}
            handleCancel={handleCancel}
            handleAdded={handleAdded}
          />
        );
      },
    },
    {
      key: "1",
      title: "THÔNG TIN KHOA PHÒNG",
      render: () => {
        return (
          <ThongTinKhoaPhong
            isRefresh={isRefresh}
            handleAdded={handleAdded}
            ref={refLayerHotKey}
          />
        );
      },
    },
  ];


  return (
  <Main>
    <BaseDm3
      breadcrumb={[
        { title: "Quản trị", link: "/quan-tri" },
        {
          title: "Danh mục nhân viên",
          link: "/quan-tri/nhan-vien",
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
          <DanhSachNhanVien
            collapseStatus={collapseStatus}
            setCollapseStatus={setCollapseStatus}
            dataSortColumn={dataSortColumn}
            setDataSortColumn={setDataSortColumn}
            showFullTable={state.showFullTable}
            handleClickedBtnAdded={handleClickedBtnAdded}
            handleChangeshowTable={handleChangeshowTable}
            onRow={onRow}
            ref={refLayerHotKey}
          />
        </Col>
      {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
          className={`mt-3 h-100 ${state.changeShowFullTbale ? "" : "transition-ease"
            }`}
          style={
            state.isSelected
              ? { border: "2px solid #c1d8fd", borderRadius: 20 }
              : {}
          }
        >
          <MultiLevelTab
            listPanel={listPanel}
            // isBoxTabs={true}
            activeKey={state.activeKey}
            onChange={onChangeTab}
            defaultActiveKey={state.activeKey}
            isNotBorder={true}
          />
          </Col>
      )}
      {/* <ThongTinKho
        style={{ paddingTop: "15px" }}
        kho={listAllKho}
        dataSource={dataEditDefault.dsKho || []}
        addInfoKho={addInfoKho}
        isRefresh={isRefresh}
      ></ThongTinKho> */}
    </BaseDm3 >
  </Main>
  );
};

export default NhanVien;

