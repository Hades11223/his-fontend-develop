import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from "react";
import { ModalStyled, Main, ContentTable } from "./styled";
import { Row, Input, Button, Checkbox, message } from "antd";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import IcSave from "assets/images/thuNgan/icSave.png";
import { useDispatch, useSelector } from "react-redux";
import { ModalNotification } from "pages/chanDoanHinhAnh/components/ModalNotification";
import stringUtils from "mainam-react-native-string-utils";

const ModalPhanPhong = (props, ref) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refButtonSave = useRef(null);

  const { listServices = [], nbDotDieuTriId } = useSelector(
    (state) => state.choTiepDonDV
  );
  const { listtrangThaiDichVu = [], listgioiTinh } = useSelector(
    (state) => state.utils
  );
  const { listDanhSachPhong } = useSelector((state) => state.phongThucHien);

  const {
    choTiepDonDV: { getTongHopDichVuCLS, phanPhongDv },
    phongThucHien: { getListPhongTheoDichVu },
    chanDoanHinhAnh: { getPhongChanDoan },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  const [open, setOpen] = useState(false);
  const [state, _setState] = useState({
    isCheckedAll: false,
    listKeys: [],
    selectedRowKeys: [],
    dsDichVuId: [],
    listDsDichVuId: [],
  });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refThongTinDichVu = useRef(null);
  const paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );
  useEffect(() => {
    let listAllKeys = [];
    let listAlldichVuId = [];
    const dataservice = listServices.map((item, index) => {
      listAllKeys.push(item.id);
      listAlldichVuId.push(item.dsDichVuId);
      return { ...item, stt: index + 1 };
    });

    setState({
      listKeys: listAllKeys,
      listDsDichVuId: listAlldichVuId,
    });
    setState({ data: dataservice });
  }, [listServices]);

  useEffect(() => {
    let listAllKeys = [];
    let listAlldichVuId = [];
    const dataservice = listServices.map((item, index) => {
      listAllKeys.push(item.id);
      listAlldichVuId.push(item.dsDichVuId);
      return { ...item, stt: index + 1 };
    });

    setState({
      listKeys: listAllKeys,
      listDsDichVuId: listAlldichVuId,
    });
    setState({ data: dataservice });
  }, [listServices]);

  useImperativeHandle(ref, () => ({
    show: (selectedRowKeys, dsDichVuId) => {
      let checkedAll;
      if (listServices?.length === selectedRowKeys?.length) checkedAll = true;
      else checkedAll = false;
      setOpen(true);
      setState({
        selectedRowKeys: selectedRowKeys,
        isCheckedAll: checkedAll,
        dsDichVuId: dsDichVuId,
      });
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              setOpen(false);
            },
          },
          {
            keyCode: 115, //Enter
            onEvent: () => {
              refButtonSave.current && refButtonSave.current.click();
            },
          },
        ],
      });
    },
  }));
  useEffect(() => {
    if (!open) {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    }
  }, [open]);
  useEffect(() => {
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  useEffect(() => {
    if (open) getListPhongTheoDichVu({ dsDichVuId: state.dsDichVuId , khoaChiDinhId: state.data[0].khoaChiDinhId});
  }, [state.selectedRowKeys]);

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    let updateSelectDichVuId = data.map((item) => item.dichVuId);
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    updateSelectDichVuId = [...new Set(updateSelectDichVuId)];

    setState({ selectedRowKeys: updatedSelectedKeys });
    if (listServices.length === updatedSelectedKeys.length) {
      setState({ isCheckedAll: true, dsDichVuId: updateSelectDichVuId });
    } else {
      setState({ isCheckedAll: false, dsDichVuId: updateSelectDichVuId });
    }
  };

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? state.listKeys : [],
      isCheckedAll: e.target?.checked,
      dsDichVuId: e.target?.checked ? state.listDsDichVuId : [],
    });
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            style={{ color: "#03317c" }}
            onChange={oncheckAll}
            checked={state.isCheckedAll}
          >
            {" "}
            Tất cả
          </Checkbox>
        }
      />
    ),
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const onSearchInput = (option) => {
    let value = option?.trim().toLowerCase().unsignText();
    let dataSearch = state.data?.filter(
      (option) =>
        option.tenDichVu.toLowerCase().unsignText().indexOf(value) >= 0
    );
    if (value) {
      setState({ data: dataSearch });
    } else {
      setState({
        data: listServices.map((item, index) => {
          return { ...item, stt: index + 1 };
        }),
      });
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onSave = () => {    
    const { selectedRowKeys, phongId } = state;
    let data = {
      dsId: selectedRowKeys.map((item, index) => {
        return item;
      }),
      phongId,
    };
    phanPhongDv(data)
      .then(() => {
        getTongHopDichVuCLS({ nbDotDieuTriId }, false);
        getPhongChanDoan({ loaiPhong: 20 }, paramCheck);
        closeModal();
      })
      .catch((error) => {
        if (error?.code == 7609 || error?.code == 8401) {
          setOpen(false);
          refThongTinDichVu.current &&
            refThongTinDichVu.current.show({
              title: "Thông báo",
              content: error.message,
              okText: "Đóng",
              classNameOkText: "button-closel",
              showBtnOk: true,
            });
        } else {
          message.error(error.message);
        }
      });
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "30px",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ"
          search={
            <Input
              placeholder="Tìm tên dịch vụ"
              onChange={(e) => onSearchInput(e.target.value)}
            />
          }
        />
      ),
      width: "110px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
    },
    {
      title: <HeaderSearch title="Trạng thái" />,
      width: "40px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item, index) => {
        return listtrangThaiDichVu.find((x) => x.id === item)?.ten || "";
      },
    },
  ];

  return (
    <ModalStyled width={800} visible={open} closable={false} footer={null}>
      <Main>
        <Row className="header">
          <div className="header__left">
            <span style={{ fontWeight: "bold" }}>Phân phòng </span>
          </div>
          <div className="header__right">
            <span>{`${listServices[0]?.tenNb} - ${
              listgioiTinh?.find((x) => x.id == listServices[0]?.gioiTinh)?.ten
            } - ${listServices[0]?.tuoi} tuổi`}</span>
          </div>
        </Row>
        <div className="infopatient-room">
          <div className="info-room">
            <label style={{ fontWeight: "bold" }}>Chọn phòng thực hiện</label>
            <Select
              placeholder="Chọn phòng thực hiện"
              style={{ width: "30%" }}
              data={listDanhSachPhong}
              value={state.phongId}
              id="phongId"
              onChange={(e) => setState({ phongId: e })}
            />
            <label style={{ fontWeight: "bold", paddingTop: 15 }}>
              Chọn dịch vụ muốn phân phòng
            </label>
            <div className="table-service">
              <Row className="header-table">
                <div className="header-table__left">
                  Đã chọn {state.selectedRowKeys.length} dịch vụ
                </div>
              </Row>
              <ContentTable>
                <TableWrapper
                  // rowClassName={rowClassName}
                  columns={columns}
                  rowSelection={rowSelection}
                  dataSource={state?.data}
                  // onRow={onRow}
                  scroll={{ y: 450 }}
                  rowKey={(record) => record?.id}
                />
              </ContentTable>
            </div>
            <Button className="btn_back" onClick={closeModal}>
              Quay lại
            </Button>
            <Button className="btn_save" ref={refButtonSave} onClick={onSave}>
              <span>Lưu</span>
              <img src={IcSave} alt="..." />
            </Button>
          </div>
        </div>
      </Main>
      <ModalNotification ref={refThongTinDichVu} />
    </ModalStyled>
  );
};

export default forwardRef(ModalPhanPhong);
