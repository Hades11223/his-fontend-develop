import { Form, Row, Col, TimePicker, Checkbox, Button, Input } from "antd";
import { Select } from "components";
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { DATA_TIME_QMS, ENUM, TRANG_THAI_HIEN_THI } from "constants/index";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import IcCreate from "assets/images/kho/IcCreate2.png";
import IcSave from "assets/images/kho/save.png";
import { Main, ModalStyled } from "./styled";
import { useDispatch } from "react-redux";
import moment from "moment";
import Carousel from "components/Carousel";
import { useHistory } from "react-router-dom";
import IcClose from "assets/images/qms/icClose.png";
import { useEnum, useListAll, useStore } from "hook";

const Modal = (props, ref) => {
  const history = useHistory();
  const formatHour = "HH:mm";
  const refVideo = useRef(null);
  const [state, _setState] = useState({
    value: [],
    data: [],
    currentIndex: -1,
  });
  const {
    phong: { getListPhong },
    khoa: { getListKhoa },
    nhanVien: {
      getListNhanVien,
      getListNhanVienTongHop,
      getListDieuDuong,
      getListBacSi,
    },
    kiosk: { createOrEdit, postVideo, updateData },
    template: { onChangeInputSearch },
    thietLap: { getThietLap },
    kiosk: { getById: getByIdKiosk },
  } = useDispatch();

  const listRoom = useStore("phong.listRoom", []);
  const listKhoa = useStore("khoa.listKhoa", []);
  const listTemplate = useStore("template.listTemplate", []);
  const dataSearch = useStore("kiosk.dataSearch", []);
  const dataBAC_SI = useStore("thietLap.dataBAC_SI", {});
  const dataKY_THUAT_Y = useStore("thietLap.dataKY_THUAT_Y", {});
  const dataDIEU_DUONG = useStore("thietLap.dataDIEU_DUONG", {});
  const dataY_TA = useStore("thietLap.dataY_TA", {});
  const listNhanVien = useStore("nhanVien.listNhanVien", []);
  const listDieuDuong = useStore("nhanVien.listDieuDuong", []);
  const listBacSi = useStore("nhanVien.listBacSi", []);

  const [listAllQuayTiepDon] = useListAll("quayTiepDon");
  const [listTrangThaiHienThi] = useEnum(ENUM.TRANG_THAI_HIEN_THI);
  const [listAllVanBang] = useListAll("vanBang");
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item) => {
      setState({ show: true, currentItem: item, currentData: item });
    },
  }));
  let kioskId = window.location.search.getQueryStringHref("kioskId");
  const [form] = Form.useForm();

  const renderTime = () => {
    return DATA_TIME_QMS.map((item, index) => {
      return (
        <Col span={6} key={index} style={{ paddingLeft: "0px" }}>
          <Form.Item
            style={{ paddingLeft: "0px" }}
            rules={[
              {
                required: false,
                message: "Vui lòng chọn thời gian làm việc!",
              },
            ]}
            label={item.title}
            name={item.value}
          >
            <TimePicker
              placeholder={item.title}
              format="HH:mm"
              popupClassName="popup-time-picker"
            />
          </Form.Item>
        </Col>
      );
    });
  };
  useEffect(() => {
    getListKhoa({});
    getListPhong({ loaiPhong: dataSearch?.loaiQms });
    getListNhanVienTongHop({});
    onChangeInputSearch({ loaiQms: dataSearch?.loaiQms, active: true });
    getThietLap({ ma: "BAC_SI" });
    getThietLap({ ma: "KY_THUAT_Y" });
    getThietLap({ ma: "DIEU_DUONG" });
    getThietLap({ ma: "Y_TA" });
  }, []);

  useEffect(() => {
    if (state.loaiQms) {
      getListPhong({ loaiPhong: state?.loaiQms });
      onChangeInputSearch({ loaiQms: state?.loaiQms, active: true });
    }
    let data = (
      state.loaiQms === 10
        ? listTrangThaiHienThi.filter((x) =>
            [
              TRANG_THAI_HIEN_THI.DANG_KHAM_THUC_HIEN,
              TRANG_THAI_HIEN_THI.GOI_NHO,
              TRANG_THAI_HIEN_THI.TIEP_THEO,
            ].includes(x?.id)
          )
        : listTrangThaiHienThi || []
    ).map((item) => {
      return { name: item?.id, isactive: true };
    });
    setState({ dataTable: data });
  }, [listTrangThaiHienThi, state.loaiQms]);

  useEffect(() => {
    if (dataKY_THUAT_Y || dataBAC_SI) {
      let bacSi =
        listAllVanBang?.filter(
          (x) => x.ma == dataKY_THUAT_Y || x.ma == dataBAC_SI
        ) || [];
      let bacSiIds = bacSi.map((x) => x.id);
      if (bacSiIds?.length) getListBacSi({ dsVanBangId: bacSiIds });
    }
  }, [listAllVanBang, dataBAC_SI, dataKY_THUAT_Y]);

  useEffect(() => {
    if (dataDIEU_DUONG || dataY_TA) {
      let dieuDuong =
        listAllVanBang?.filter(
          (x) => x.ma == dataDIEU_DUONG || x.ma == dataY_TA
        ) || [];
      let dieuDuongIds = dieuDuong.map((x) => x.id);
      if (dieuDuongIds?.length) getListDieuDuong({ dsVanBangId: dieuDuongIds });
    }
  }, [listAllVanBang, dataDIEU_DUONG, dataY_TA]);

  const onChangeInput = (key, index) => (e) => {
    state.dataTable[index][key] = e.target.checked;
  };

  useEffect(() => {
    loadCurrentItem(state.currentItem);
  }, [state.currentItem, state.show]);

  const loadCurrentItem = (item) => {
    if (item) {
      const data = {
        ...item,
        phongId: item?.phongId || dataSearch?.phongId,
        thoiGianChieuDen: item?.thoiGianChieuDen
          ? moment(item?.thoiGianChieuDen, formatHour)
          : null,
        thoiGianChieuTu: item?.thoiGianChieuTu
          ? moment(item?.thoiGianChieuTu, formatHour)
          : null,
        thoiGianSangDen: item?.thoiGianSangDen
          ? moment(item?.thoiGianSangDen, formatHour)
          : null,
        thoiGianSangTu: item?.thoiGianSangTu
          ? moment(item?.thoiGianSangTu, formatHour)
          : null,
      };
      let bacSi = listNhanVien.filter((x) => item?.dsBacSiId.includes(x.id));
      setState({
        currentId: item?.id,
        currentIndex: -1,
        fileName: item?.dsVideo?.map((item) => {
          return item?.split("/").pop();
        }),
        dataTable: (listTrangThaiHienThi || []).map((item) => {
          return {
            name: item?.id,
            isactive: item?.dsTrangThai.includes(item?.id),
          };
        }),
        video: item?.dsVideo,
        bacSi,
        loaiQms: item?.loaiQms,
      });
      form.setFieldsValue(data);
    } else {
      form.resetFields();
      form.setFieldsValue({ phongId: dataSearch?.phongId });
      setState({
        loaiQms: dataSearch?.loaiQms,
      });
    }
  };

  const onRow = (record = {}, index) => {
    if (record.name == 10 || record.name == 20 || record.name == 60)
      return null;
    return {
      onClick: (event) => {
        setState({ currentIndex: index });
      },
    };
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 30,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => {
        return index + 1;
      },
    },
    {
      title: <HeaderSearch title="Tên trường trên MH Kiosk" />,
      width: 200,
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (item) => {
        return (listTrangThaiHienThi || []).find((x) => x.id == item)?.ten;
      },
    },
    {
      title: <HeaderSearch title="Hiển thị" />,
      width: 50,
      dataIndex: "isactive",
      key: "isactive",
      align: "center",
      render: (item, data, index) => {
        if (state.currentIndex === index) {
          return (
            <Checkbox
              onChange={onChangeInput("isactive", index)}
              defaultValue={item}
            ></Checkbox>
          );
        } else {
          return <Checkbox checked={item}></Checkbox>;
        }
      },
    },
  ];
  const onCancel = () => {
    setState({ show: false });
  };

  const onChangeField = (key) => (e) => {
    if (key === "khoaId") {
      getListNhanVien({ size: 500, khoaId: e });
      getListPhong({ size: 500, khoaId: e });
    }
    if (key === "loaiPhong") {
      getListPhong({ size: 500, loaiPhong: e });
    }
  };

  const onSave = () => {
    form.submit();
  };

  const generateLink = (path) => {
    let link = `/qms/qms-doc/${path}`;
    history.push(link);
  };

  const onHanldeSubmit = (values) => {
    let newData = state?.dataTable.filter((item) => {
      return item.isactive && item.name;
    });

    const {
      thoiGianChieuDen,
      thoiGianChieuTu,
      thoiGianSangDen,
      thoiGianSangTu,
    } = values;
    const { video } = state;
    const data = {
      ...values,
      phongId: values?.phongId || dataSearch?.phongId,
      dsTrangThai: (newData || []).map((item) => {
        return item.name;
      }),
      loaiQms: state?.loaiQms || dataSearch?.loaiQms,
      thoiGianChieuDen: thoiGianChieuDen
        ? thoiGianChieuDen.format("HH:mm")
        : null,
      thoiGianChieuTu: thoiGianChieuTu ? thoiGianChieuTu.format("HH:mm") : null,
      thoiGianSangDen: thoiGianSangDen ? thoiGianSangDen.format("HH:mm") : null,
      thoiGianSangTu: thoiGianSangTu ? thoiGianSangTu.format("HH:mm") : null,
      dsVideo: Array.isArray(video) ? video : Array(video),
      id: state.currentId,
    };
    createOrEdit(data).then((s) => {
      updateData({ currentKiosk: s });
      let data = (listTrangThaiHienThi || []).map((item) => {
        return { name: item?.id, isactive: true };
      });
      generateLink(
        `${listTemplate.find((x) => x.id === s.mauQmsId)?.url}?kioskId=${s?.id}`
      );
      setState({ dataTable: data, show: false });
      if (kioskId) {
        getByIdKiosk(kioskId);
      }
    });
  };

  const onChangeBacSi = (e) => {
    let data = listNhanVien.filter((x) => e.includes(x.id));
    if (data) setState({ bacSi: data });
  };

  const handleUploadFile = (event) => {
    event.preventDefault();
    return refVideo.current.click();
  };

  const selectVideo = (data) => {
    let type =
      data.target &&
      data.target.files &&
      data.target.files[0] &&
      data.target.files[0].type;
    if (type === "video/mp4") {
      let fileUpload = "";
      let fileName = "";
      fileUpload = data.target.files[0] || {};
      fileName = fileUpload.name;
      setState({
        fileName,
        fileUpload,
      });
      postVideo(fileUpload).then((s) => {
        setState({ video: s?.data });
      });
    }
  };

  const onReset = () => {
    if (state.currentItem?.id) {
      loadCurrentItem(state.currentData);
    } else {
      loadCurrentItem();
      let data = (listTrangThaiHienThi || []).map((item) => {
        return { name: item?.id, isactive: true };
      });
      setState({ dataTable: data, currentIndex: -1 });
    }
  };

  return (
    <ModalStyled
      visible={state.show}
      width={1000}
      closable={false}
      footer={false}
      onCancel={onCancel}
    >
      <Main>
        <div className="header">
          <div className="left">
            <span>THIẾT LẬP THÔNG SỐ</span>
          </div>
          <div className="right">
            <img src={IcClose} alt="..." onClick={onCancel} />
          </div>
        </div>
        <div className="content">
          <Form
            form={form}
            layout="vertical"
            className="form-custom"
            onFinish={onHanldeSubmit}
          >
            <Row>
              <Col xs={12}>
                <Form.Item
                  label="Tên thiết bị"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên thiết bị!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên thiết bị"></Input>
                </Form.Item>
                {state?.loaiQms !== 10 && (
                  <Form.Item
                    name="khoaId"
                    label="Khoa"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn khoa!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn Khoa"
                      data={listKhoa}
                      onChange={onChangeField("khoaId")}
                    />
                  </Form.Item>
                )}
                {state?.loaiQms !== 10 && (
                  <Form.Item
                    name="dsBacSiId"
                    label="Bác sĩ"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn bác sĩ!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn bác sĩ"
                      data={listBacSi}
                      onChange={onChangeBacSi}
                      mode="multiple"
                      showArrow
                    />
                  </Form.Item>
                )}
                {state?.loaiQms !== 10 && (
                  <Form.Item name="dieuDuongId" label="Y tá">
                    <Select
                      required={true}
                      message="Vui lòng chọn trợ lý y tá!"
                      placeholder="Chọn trợ lý y tá"
                      data={listDieuDuong}
                    />
                  </Form.Item>
                )}
                {state?.loaiQms !== 10 && (
                  <Form.Item name="hoTroId" label="Hỗ trợ">
                    <Select
                      required={true}
                      message="Vui lòng chọn hỗ trợ HD!"
                      placeholder="Chọn hỗ trợ HD"
                      data={listDieuDuong}
                    />
                  </Form.Item>
                )}
              </Col>
              <Col xs={12}>
                <Form.Item name="mac" label="Địa chỉ MAC">
                  <Input placeholder="Nhâp địa chỉ Mac"></Input>
                </Form.Item>
                {state?.loaiQms !== 10 && (
                  <Form.Item
                    name="phongId"
                    label="Phòng"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn phòng!",
                      },
                    ]}
                  >
                    <Select placeholder="Chọn Phòng" data={listRoom} />
                  </Form.Item>
                )}
                {state?.loaiQms !== 10 && (
                  <Form.Item className="d-flex">
                    <Carousel data={state.bacSi} />
                  </Form.Item>
                )}
              </Col>
            </Row>
            {state?.loaiQms !== 10 && (
              <Row>
                <Form.Item label="Thời gian làm việc" colon={false}>
                  <Row gutter={22}>{renderTime()}</Row>
                </Form.Item>
              </Row>
            )}
            {state?.loaiQms === 10 && (
              <Row>
                <Form.Item
                  name="khoaId"
                  label="Khoa"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn khoa!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn Khoa"
                    data={listKhoa}
                    onChange={onChangeField("khoaId")}
                  />
                </Form.Item>
              </Row>
            )}
            {state?.loaiQms === 10 && (
              <Row>
                <Form.Item
                  name="quayTiepDonId"
                  label="Quầy tiếp đón"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn khoa!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn quầy tiếp đón"
                    data={listAllQuayTiepDon}
                  />
                </Form.Item>
              </Row>
            )}
          </Form>
          <TableWrapper
            columns={columns}
            dataSource={state.dataTable}
            rowKey={(record) => record.name}
            onRow={onRow}
          ></TableWrapper>
          <Form
            form={form}
            layout="vertical"
            className="form-custom"
            onFinish={onHanldeSubmit}
          >
            <Form.Item
              name="mauQmsId"
              label="Mã mẫu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn mã mẫu!",
                },
              ]}
            >
              <Select
                required={true}
                message="Vui lòng chọn Template"
                placeholder="Chọn Template"
                data={listTemplate}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
          <div className="footer">
            <span className="title">Video</span>
            <div className="video">
              <div className="left">
                <a>{state.fileName}</a>
              </div>
              <div className="right">
                <input
                  style={{ display: "none" }}
                  accept="video/*"
                  type="file"
                  onChange={(e) => selectVideo(e)}
                  ref={refVideo}
                ></input>
                <Button onClick={handleUploadFile} className="btn-upload">
                  <span>Upload</span>
                  <img src={IcCreate} />
                </Button>
              </div>
            </div>
          </div>
          <div className="button">
            <Button className="btn-reset" onClick={onReset}>
              Đặt lại
            </Button>
            <Button className="btn-save" onClick={onSave}>
              {" "}
              <span>Lưu</span>
              <img src={IcSave} />
            </Button>
          </div>
        </div>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(Modal);
