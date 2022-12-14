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
                // title="Th??ng tin chi ti???t"
                onCancel={handleCancel}
                cancelText="H???y"
                onOk={handleAdded}
                okText="L??u [F4]"
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
                                    label="H??? t??n"
                                    name="ten"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui l??ng nh???p h??? t??n",
                                        },
                                        {
                                            max: 255,
                                            message: "Vui l??ng nh???p h??? t??n kh??ng qu?? 255 k?? t???!",
                                        },
                                    ]}
                                >
                                    <Input
                                        ref={refAutoFocus}
                                        className="input-option"
                                        placeholder="Vui l??ng nh???p h??? t??n"
                                        maxLength={255}
                                    />
                                </Form.Item>

                                <Form.Item
                                    className="item-date"
                                    label="Ng??y sinh"
                                    name="ngaySinh"
                                    style={{ width: "100%" }}
                                >
                                    <DatePicker
                                        format={BIRTHDAY_FORMAT}
                                        placeholder="Ng??y sinh"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Gi???i t??nh"
                                    name="gioiTinh"
                                    style={{ width: "100%" }}
                                >
                                    <Select
                                        className="input-option"
                                        placeholder="Ch???n gi???i t??nh"
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
                                    label="S??? ??i???n tho???i"
                                    name="soDienThoai"
                                    style={{ width: "100%" }}
                                >
                                    <Input
                                        className="input-option"
                                        placeholder="S??? ??i???n tho???i"
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
                                    label="MST/ T??n t??i kho???n k??"
                                    name="taiKhoanKy"
                                    style={{ width: "100%" }}
                                >
                                    <Input
                                        className="input-option"
                                        placeholder="MST/ T??n t??i kho???n k??"
                                    />
                                </Form.Item>
                                <div style={{ display: "flex" }}> 
                                <Form.Item
                                    label="???nh ?????i di???n"
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
                                    label="???nh ch??? k??"
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
                                        <Checkbox>?????t kh??m online</Checkbox>
                                    </Form.Item>
                                    <Form.Item
                                        name="active"
                                        valuePropName="checked"
                                        style={{ width: "100%", marginTop: 16 }}
                                    >
                                        <Checkbox>C?? hi???u l???c</Checkbox>
                                    </Form.Item>
                                </div>

                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="M?? nh??n vi??n"
                                    name="ma"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui l??ng nh???p m?? nh??n vi??n",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="input-option"
                                        placeholder="M?? nh??n vi??n"
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
                                            B???ng chuy??n m??n
                                        </div>
                                    }
                                    name="vanBangId"
                                    style={{ width: "100%" }}
                                >
                                    <Select
                                        placeholder="B???ng chuy??n m??n"
                                        data={listAllVanBang}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div
                                            className="pointer"
                                            onClick={() => openInNewTab("/danh-muc/chuyen-khoa")}
                                        >
                                            Chuy??n khoa
                                        </div>
                                    }
                                    name="dsChuyenKhoaId"
                                    style={{ width: "100%" }}
                                >
                                    <Select
                                        data={listAllChuyenKhoa}
                                        mode="multiple"
                                        placeholder="Chuy??n khoa"
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
                                            H???c h??m h???c v???
                                        </div>
                                    }
                                    name="hocHamHocViId"
                                    style={{ width: "100%" }}
                                >
                                    <Select
                                        data={listAllHocHamHocVi}
                                        placeholder="H???c h??m h???c v???"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Ch???ng ch???"
                                    name="chungChi"
                                    style={{ width: "100%" }}
                                >
                                    <Input className="input-option" placeholder="Ch???ng ch???" />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <div
                                            className="pointer"
                                            onClick={() => openInNewTab("/danh-muc/chuc-vu")}
                                        >
                                            Ch???c v???
                                        </div>
                                    }
                                    name="chucVuId"
                                    style={{ width: "100%" }}
                                >
                                    <Select data={listAllChucVu} placeholder="Ch???c v???" />
                                </Form.Item>
                                <Form.Item
                                    label="Ch???ng th?? s???/ MK k??"
                                    name="matKhauKy"
                                    style={{ width: "100%" }}
                                >
                                    <Input.Password
                                        autoComplete="new-password"
                                        className="input-option"
                                        placeholder="Ch???ng th?? s???/ M???t kh???u k??"
                                        iconRender={(visible) =>
                                            visible ? (
                                                <Tooltip
                                                    title="Hi???n th??? th??ng tin"
                                                    placement="bottom"
                                                >
                                                    <EyeTwoTone />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="???n th??ng tin" placement="bottom">
                                                    <EyeInvisibleOutlined />
                                                </Tooltip>
                                            )
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Danh hi???u"
                                    name="danhHieu"
                                    style={{ width: "100%" }}
                                >
                                    <Input className="input-option" placeholder="Danh hi???u" />
                                </Form.Item>
                                <Form.Item
                                    label="Chi ch??"
                                    name="ghiChu"
                                    style={{ width: "100%" }}
                                >
                                    <TextArea
                                        style={{ minHeight: 100 }}
                                        className="input-option"
                                        placeholder="Ghi ch??"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="M???t kh???u H????T"
                                    name="matKhauHddt"
                                    style={{ width: "100%" }}
                                >
                                    <Input.Password
                                        autoComplete="new-password"
                                        className="input-option"
                                        placeholder="M???t kh???u H????T"
                                        iconRender={(visible) =>
                                            visible ? (
                                                <Tooltip
                                                    title="Hi???n th??? th??ng tin"
                                                    placement="bottom"
                                                >
                                                    <EyeTwoTone />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="???n th??ng tin" placement="bottom">
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