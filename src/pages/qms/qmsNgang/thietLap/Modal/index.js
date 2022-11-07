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
const Modal = forwardRef((props, ref) => {
  const formatHour = "HH:mm";
  const history = useHistory();

  const refVideo = useRef(null);
  const [state, _setState] = useState({ value: [], data: [] });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const listRoom = useStore("phong.listRoom", []);
  const listTemplate = useStore("template.listTemplate", []);
  const listNhanVien = useStore("nhanVien.listNhanVien", []);
  const listDieuDuong = useStore("nhanVien.listDieuDuong", []);
  const listBacSi = useStore("nhanVien.listBacSi", []);
  const listQuayTiepDonTongHop = useStore(
    "quayTiepDon.listQuayTiepDonTongHop",
    []
  );
  const {
    phong: { getListPhongTongHop },
    nhanVien: { getListNhanVienTongHop },
    kiosk: { createOrEdit, postVideo },
    template: { onChangeInputSearch, updateData },
    kiosk: { getById: getByIdKiosk },
    quayTiepDon: { getListTongHop },
  } = useDispatch();
  const [listTrangThaiHienThi] = useEnum(ENUM.TRANG_THAI_HIEN_THI);
  const [listAllKhoa] = useListAll("khoa");

  useImperativeHandle(ref, () => ({
    show: (options = {}) => {
      const { loaiQms, phongId, item } = options;
      setState({
        show: true,
        currentItem: item,
        currentData: item,
        loaiQms,
        phongId,
      });
    },
  }));
  let kioskId = window.location.search.getQueryStringHref("kioskId");
  const [form] = Form.useForm();

  const renderTime = () => {
    return DATA_TIME_QMS.map((item, index) => {
      return (
        <Col span={12} key={index} style={{ paddingLeft: "0px" }}>
          <Form.Item
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
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
    if (state?.loaiQms && state?.loaiQms !== 10) {
      getListPhongTongHop({
        loaiPhong: state?.loaiQms,
        active: true,
        page: "",
        size: "",
      });
    }
    onChangeInputSearch({
      loaiQms: state?.loaiQms,
      active: true,
    });
  }, [state?.loaiQms]);

  const onChangeInput = (key, index) => (e) => {
    state.dataTable[index][key] = e.target.checked;
  };

  useEffect(() => {
    if (state?.show) {
      if (state?.currentItem?.id) {
        getByIdKiosk(state?.currentItem?.id).then((s) => {
          loadCurrentItem(s);
        });
      } else {
        loadCurrentItem();
      }
    }
  }, [state.currentItem, state?.show]);
  const loadCurrentItem = async (item) => {
    if (item) {
      const listQuay = await getListTongHop({
        khoaId: item.khoaId,
        active: true,
        page: "",
        size: "",
      });
      const data = {
        ...item,
        phongId: item?.phongId || state?.phongId,
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
        dataTable: (item.loaiQms === 10
          ? listTrangThaiHienThi.filter((x) =>
              [
                TRANG_THAI_HIEN_THI.DANG_KHAM_THUC_HIEN,
                TRANG_THAI_HIEN_THI.GOI_NHO,
                TRANG_THAI_HIEN_THI.TIEP_THEO,
              ].includes(x?.id)
            )
          : listTrangThaiHienThi || []
        ).map((x1) => {
          return {
            name: x1?.id,
            isactive: item?.dsTrangThai?.includes(x1?.id),
          };
        }),
        video: item?.dsVideo,
        bacSi,
        loaiQms: item?.loaiQms,
      });
      form.setFieldsValue(data);
    } else {
      form.resetFields();
      form.setFieldsValue({ phongId: state?.phongId });
      let data = (
        state?.loaiQms === 10
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
      setState({
        loaiQms: state?.loaiQms,
        dataTable: data,
      });
    }
  };
  const generateLink = (path) => {
    let link = `/qms/qms-ngang/${path}`;
    history.push(link);
  };

  const onRow = (record = {}, index) => {
    if (record.name == 10 || record.name == 20) return null;
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
      getListNhanVienTongHop({ active: true, page: "", size: "", khoaId: e });
      getListTongHop({ khoaId: e, active: true, page: "", size: "" });
    }
    if (key === "loaiPhong") {
      getListPhongTongHop({ loaiPhong: e, active: true, page: "", size: "" });
    }
  };

  const onSave = () => {
    form.submit();
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
      phongId: values?.phongId || state?.phongId,
      dsTrangThai: (newData || []).map((item) => {
        return item.name;
      }),
      loaiQms: state?.loaiQms || state?.loaiQms,
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
      setState({ dataTable: data, currentIndex: -1 });
    }
  };
  return (
    <ModalStyled
      visible={state.show}
      width={1840}
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
                <Row>
                  <Col xs={12}>
                    <Form.Item
                      name="ten"
                      label="Tên thiết bị"
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
                          data={listAllKhoa}
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
                        <Select
                          placeholder="Chọn Phòng"
                          data={listRoom || []}
                        />
                      </Form.Item>
                    )}
                    {state?.loaiQms !== 10 && (
                      <Form.Item className="d-flex">
                        <Carousel data={state.bacSi} height="350px" />
                      </Form.Item>
                    )}
                  </Col>
                </Row>
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
                        data={listAllKhoa}
                        onChange={onChangeField("khoaId")}
                      />
                    </Form.Item>
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
                        data={listQuayTiepDonTongHop}
                      />
                    </Form.Item>
                  </Row>
                )}
              </Col>

              <Col xs={12}>
                {state?.loaiQms !== 10 && (
                  <Row>
                    <Form.Item colon={false} label="Thời gian làm việc">
                      <Row gutter={22}>{renderTime()}</Row>
                    </Form.Item>
                  </Row>
                )}
                <TableWrapper
                  columns={columns}
                  dataSource={state.dataTable}
                  rowKey={(record) => record.name}
                  onRow={onRow}
                ></TableWrapper>
              </Col>
            </Row>
            <Row>
              <Col xs={12} style={{ paddingRight: "0.75rem" }}>
                <Form.Item
                  name="mauQmsId"
                  label="Mẫu QMS"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn mã mẫu!",
                    },
                  ]}
                  className="custom"
                >
                  <Select
                    required={true}
                    message="Vui lòng chọn Template"
                    placeholder="Chọn Template"
                    data={listTemplate}
                  />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <div className="footer">
                  <Row>
                    <Col xs={3}>
                      <span className="title">Video</span>
                    </Col>
                    <Col xs={21}>
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
                          <Button
                            onClick={handleUploadFile}
                            className="btn-upload"
                          >
                            <span>Upload</span>
                            <img src={IcCreate} alt={IcCreate} />
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Form>

          <div className="button">
            <Button className="btn-reset" onClick={onReset}>
              Đặt lại
            </Button>
            <Button className="btn-save" onClick={onSave}>
              <span>Lưu</span>
              <img src={IcSave} alt="..." />
            </Button>
          </div>
        </div>
      </Main>
    </ModalStyled>
  );
});

export default Modal;
