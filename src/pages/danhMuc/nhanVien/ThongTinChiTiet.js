import { checkRole } from "utils/role-utils";
import { CreatedWrapper, Select, ListImage } from 'components'
import { BIRTHDAY_FORMAT, ROLES } from 'constants/index'
import React, { useEffect } from 'react'
import { Checkbox, DatePicker, Input, Form, Tooltip, Row, Col } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { openInNewTab } from 'utils';
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { Main } from "./styled";

const ThongTinChiTiet = React.forwardRef(({
    form,
    editStatus,
    anhKy,
    setAnhKy,
    logo,
    setLogo,
    handleCancel,
    handleAdded
}, ref) => {
    const { refAutoFocus, refLayerHotKey } = ref.current

    const { listgioiTinh } = useSelector((state) => state.utils);
    const { listAllVanBang } = useSelector((state) => state.vanBang);
    const { listAllChuyenKhoa } = useSelector((state) => state.chuyenKhoa);
    const { listAllHocHamHocVi } = useSelector((state) => state.hocHamHocVi);
    const { listAllChucVu } = useSelector((state) => state.chucVu);

    // const { listgioiTinh } = useStore("utils", []);
    // const { listAllVanBang } = useStore("vanBang", []);
    // const { listAllChuyenKhoa } = useStore("chuyenKhoa", []);
    // const { listAllHocHamHocVi } = useStore("hocHamHocVi", []);
    // const { listAllChucVu } = useStore("chucVu", []);

    const { getUtils } = useDispatch().utils;
    const { getListAllVanBang } = useDispatch().vanBang;
    const { getListAllChuyenKhoa } = useDispatch().chuyenKhoa;
    const { getListAllHocHamHocVi } = useDispatch().hocHamHocVi;
    const { getListAllChucVu } = useDispatch().chucVu;


    useEffect(() => {
        getListAllChuyenKhoa({ active: true, page: "", size: "" });
        getListAllHocHamHocVi({ active: true, page: "", size: "" });
        getListAllChucVu({ active: true, page: "", size: "" });
        getListAllVanBang({ active: true, page: "", size: "" });
        getUtils({ name: "gioiTinh" });
    }, [])


    const onUpdateData = (item, type) => {
        if (type === "anhKy") {
            setAnhKy(item);
        } else {
            setLogo(item);
        }
        form.setFieldsValue({ [type]: item });
    };


    return (
        <Main>
            <CreatedWrapper
                // title="Thông tin chi tiết"
                onCancel={handleCancel}
                cancelText="Hủy"
                onOk={handleAdded}
                okText="Lưu [F4]"
                roleSave={[ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN_THEM]}
                roleEdit={[ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN_SUA]}
                editStatus={editStatus}
                layerId={refLayerHotKey.current}
                border={false}
            >
                <fieldset
                    disabled={
                        editStatus
                            ? !checkRole([ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN_SUA])
                            : !checkRole([ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN_THEM])
                    }
                >
                    <Form
                        form={form}
                        layout="vertical"
                        className="form-custom responsive-col"
                    >
                        <Row style={{ width: "100%" }}>
                            <Col span={12}>
                                <Form.Item
                                    label="Họ tên"
                                    name="ten"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập họ tên",
                                        },
                                        {
                                            max: 255,
                                            message: "Vui lòng nhập họ tên không quá 255 ký tự!",
                                        },
                                    ]}
                                >
                                    <Input
                                        ref={refAutoFocus}
                                        className="input-option"
                                        placeholder="Vui lòng nhập họ tên"
                                        maxLength={255}
                                    />
                                </Form.Item>

                                <Form.Item
                                    className="item-date"
                                    label="Ngày sinh"
                                    name="ngaySinh"
                                    style={{ width: "100%" }}
                                >
                                    <DatePicker
                                        format={BIRTHDAY_FORMAT}
                                        placeholder="Ngày sinh"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Giới tính"
                                    name="gioiTinh"
                                    style={{ width: "100%" }}
                                >
                                    <Select
                                        className="input-option"
                                        placeholder="Chọn giới tính"
                                        data={listgioiTinh}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    style={{ width: "100%" }}
                                >
                                    <Input className="input-option" placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="soDienThoai"
                                    style={{ width: "100%" }}
                                >
                                    <Input
                                        className="input-option"
                                        placeholder="Số điện thoại"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="CMND/HC"
                                    name="soCanCuoc"
                                    style={{ width: "100%" }}
                                >
                                    <Input className="input-option" placeholder="CMND/HC" />
                                </Form.Item>
                                <Form.Item
                                    label="MST/ Tên tài khoản ký"
                                    name="taiKhoanKy"
                                    style={{ width: "100%" }}
                                >
                                    <Input
                                        className="input-option"
                                        placeholder="MST/ Tên tài khoản ký"
                                    />
                                </Form.Item>
                                <div style={{ display: "flex" }}> 
                                <Form.Item
                                    label="Ảnh đại diện"
                                    name="anhDaiDien"
                                    style={{ width: "100%" }}
                                >
                                    <ListImage
                                        uploadImage={(e) => onUpdateData(e, "anhDaiDien")}
                                        files={logo}
                                        provider="nhanVien"
                                        showUploadList={false}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Ảnh chữ ký"
                                    name="anhKy"
                                    style={{ width: "100%" }}
                                >
                                    <ListImage
                                        uploadImage={(e) => onUpdateData(e, "anhKy")}
                                        files={anhKy}
                                        provider="nhanVien"
                                        showUploadList={false}
                                    />
                                    </Form.Item>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <Form.Item
                                        name="online"
                                        valuePropName="checked"
                                        style={{ width: "100%", marginTop: 16 }}
                                    >
                                        <Checkbox>Đặt khám online</Checkbox>
                                    </Form.Item>
                                    <Form.Item
                                        name="active"
                                        valuePropName="checked"
                                        style={{ width: "100%", marginTop: 16 }}
                                    >
                                        <Checkbox>Có hiệu lực</Checkbox>
                                    </Form.Item>
                                </div>

                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Mã nhân viên"
                                    name="ma"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mã nhân viên",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="input-option"
                                        placeholder="Mã nhân viên"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <div
                                            className="pointer"
                                            onClick={() =>
                                                openInNewTab("/danh-muc/van-bang-chuyen-mon")
                                            }
                                        >
                                            Bằng chuyên môn
                                        </div>
                                    }
                                    name="vanBangId"
                                    style={{ width: "100%" }}
                                >
                                    <Select
                                        placeholder="Bằng chuyên môn"
                                        data={listAllVanBang}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div
                                            className="pointer"
                                            onClick={() => openInNewTab("/danh-muc/chuyen-khoa")}
                                        >
                                            Chuyên khoa
                                        </div>
                                    }
                                    name="dsChuyenKhoaId"
                                    style={{ width: "100%" }}
                                >
                                    <Select
                                        data={listAllChuyenKhoa}
                                        mode="multiple"
                                        placeholder="Chuyên khoa"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div
                                            className="pointer"
                                            onClick={() =>
                                                openInNewTab("/danh-muc/hoc-ham-hoc-vi")
                                            }
                                        >
                                            Học hàm học vị
                                        </div>
                                    }
                                    name="hocHamHocViId"
                                    style={{ width: "100%" }}
                                >
                                    <Select
                                        data={listAllHocHamHocVi}
                                        placeholder="Học hàm học vị"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Chứng chỉ"
                                    name="chungChi"
                                    style={{ width: "100%" }}
                                >
                                    <Input className="input-option" placeholder="Chứng chỉ" />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <div
                                            className="pointer"
                                            onClick={() => openInNewTab("/danh-muc/chuc-vu")}
                                        >
                                            Chức vụ
                                        </div>
                                    }
                                    name="chucVuId"
                                    style={{ width: "100%" }}
                                >
                                    <Select data={listAllChucVu} placeholder="Chức vụ" />
                                </Form.Item>
                                <Form.Item
                                    label="Chứng thư số/ MK ký"
                                    name="matKhauKy"
                                    style={{ width: "100%" }}
                                >
                                    <Input.Password
                                        autoComplete="new-password"
                                        className="input-option"
                                        placeholder="Chứng thư số/ Mật khẩu ký"
                                        iconRender={(visible) =>
                                            visible ? (
                                                <Tooltip
                                                    title="Hiển thị thông tin"
                                                    placement="bottom"
                                                >
                                                    <EyeTwoTone />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Ẩn thông tin" placement="bottom">
                                                    <EyeInvisibleOutlined />
                                                </Tooltip>
                                            )
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Danh hiệu"
                                    name="danhHieu"
                                    style={{ width: "100%" }}
                                >
                                    <Input className="input-option" placeholder="Danh hiệu" />
                                </Form.Item>
                                <Form.Item
                                    label="Chi chú"
                                    name="ghiChu"
                                    style={{ width: "100%" }}
                                >
                                    <TextArea
                                        style={{ minHeight: 100 }}
                                        className="input-option"
                                        placeholder="Ghi chú"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Mật khẩu HĐĐT"
                                    name="matKhauHddt"
                                    style={{ width: "100%" }}
                                >
                                    <Input.Password
                                        autoComplete="new-password"
                                        className="input-option"
                                        placeholder="Mật khẩu HĐĐT"
                                        iconRender={(visible) =>
                                            visible ? (
                                                <Tooltip
                                                    title="Hiển thị thông tin"
                                                    placement="bottom"
                                                >
                                                    <EyeTwoTone />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Ẩn thông tin" placement="bottom">
                                                    <EyeInvisibleOutlined />
                                                </Tooltip>
                                            )
                                        }
                                    />
                                </Form.Item>

                            </Col>
                        </Row>
                    </Form>
                </fieldset>
            </CreatedWrapper>
        </Main>
    )
})

export default ThongTinChiTiet