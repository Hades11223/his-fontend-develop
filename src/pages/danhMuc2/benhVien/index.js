import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, message, Upload } from "antd";
import { TableWrapper } from "components";
import BaseDmWrap from "components/BaseDmWrap";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import fileUpload from "data-access/file-provider";
import { useEnum, useStore } from "hook";
import useListAll from "hook/useListAll";
import React, { useEffect, useState } from "react";
import { openInNewTab } from "utils";
import fileUtils from "utils/file-utils";
import { useTranslation } from "react-i18next";
const screenName = "Bệnh viện";
const { TextArea } = Input;
const { ColumnInput } = TableWrapper;

// tododanhmuc

const BenhVien = ({}) => {
  const [listtuyenBenhVien] = useEnum("tuyenBenhVien", []);
  const [listhangBenhVien] = useEnum("hangBenhVien", []);
  const [listAllTinh] = useListAll("tinh", { active: true });
  const dataEditDefault = useStore("benhVien._dataEdit");
  const { t } = useTranslation();
  const [imageUploaded, setImageUploaded] = useState({
    loading: false,
    imageUrl: "",
  });
  const [imageThuongHieuUploaded, setImageThuongHieuUploaded] = useState({
    loading: false,
    imageUrl: "",
  });

  useEffect(() => {
    setImageUploaded({
      ...imageUploaded,
      imageUrl: dataEditDefault?.logo
        ? fileUtils.absoluteFileUrl(dataEditDefault?.logo)
        : null,
    });
    setImageThuongHieuUploaded({
      ...imageThuongHieuUploaded,
      imageUrl: dataEditDefault?.logoThuongHieu
        ? fileUtils.absoluteFileUrl(dataEditDefault?.logoThuongHieu)
        : null,
    });
  }, [dataEditDefault]);

  const afterSubmit = () => {
    setImageUploaded({
      ...imageUploaded,
      imageUrl: null,
    });
    setImageThuongHieuUploaded({
      ...imageThuongHieuUploaded,
      imageUrl: null,
    });
  };

  const beforeSubmit = async (value) => {
    let output = { ...value };
    if (typeof value?.logo !== "string" && value?.logo != null) {
      const resLogo = await fileUpload.upload(
        value?.logo?.file?.originFileObj,
        "benhVien"
      );
      output.logo = resLogo.code === 0 ? resLogo.data : "";
    }
    if (
      typeof value?.logoThuongHieu !== "string" &&
      value?.logoThuongHieu != null
    ) {
      const resLogoThuongHieu = await fileUpload.upload(
        value?.logoThuongHieu?.file?.originFileObj,
        "benhVien"
      );
      output.logoThuongHieu =
        resLogoThuongHieu.code === 0 ? resLogoThuongHieu.data : "";
    }
    return output;
  };

  const getColumns = ({
    baseColumns = {},
    onClickSort,
    dataSortColumn,
    onSearchInput,
    ...rest
  }) => [
    baseColumns.stt,
    {
      title: <HeaderSearch title="Logo" />,
      width: 120,
      dataIndex: "logo",
      key: "logo",
      render: (item) => {
        return (
          <div>
            <img
              style={{ maxWidth: 100, maxHeight: 100 }}
              src={item ? fileUtils.absoluteFileUrl(item) : ""}
            />
          </div>
        );
      },
    },
    baseColumns.ma,
    baseColumns.ten,
    {
      title: (
        <HeaderSearch
          title="Tuyến bệnh viện"
          sort_key="tuyenBenhVien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tuyenBenhVien || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listtuyenBenhVien]}
              defaultValue=""
              placeholder="Chọn tuyến bệnh viện"
              onChange={onSearchInput("tuyenBenhVien")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tuyenBenhVien",
      key: "tuyenBenhVien",
      render: (tuyenBenhVien) => {
        return listtuyenBenhVien.find((tuyen) => tuyen.id === tuyenBenhVien)
          ?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Hạng bệnh viện"
          sort_key="hangBenhVien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.hangBenhVien || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listhangBenhVien]}
              defaultValue=""
              placeholder="Chọn hạng bệnh viện"
              onChange={onSearchInput("hangBenhVien")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "hangBenhVien",
      key: "hangBenhVien",
      render: (hangBenhVien) => {
        return listhangBenhVien.find((hang) => hang.id === hangBenhVien)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tỉnh/TP"
          sort_key="tinhThanhPho.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tinhThanhPho.ten"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listAllTinh]}
              defaultValue=""
              placeholder="Tìm tỉnh thành phố"
              onChange={onSearchInput("tinhThanhPhoId")}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "tinhThanhPho",
      key: "tinhThanhPho",
      render: (item) => {
        return item && <span>{item.ten}</span>;
      },
    },
    ColumnInput({
      title: "Địa chỉ",
      dataIndex: "diaChi",
      width: 200,
      onClickSort,
      dataSortColumn,
      onSearchInput,
      ...rest,
    }),
    baseColumns.ghiChu,
    baseColumns.active,
  ];

  const handleUploadLogo = () => {
    return;
  };
  const handleChangeLogo = (data) => {
    const fileUpload = data.file.originFileObj;
    if (fileUpload.size > 23000) {
      message.error(t("danhMuc.kichThuocAnhPhaiNhoHon") + " 150x150");
      return;
    } else {
      const urlPreview = URL.createObjectURL(fileUpload);
      setImageUploaded({ ...imageUploaded, imageUrl: urlPreview });
    }
  };
  const uploadButton = (
    <div>
      {imageUploaded.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleUploadLogoThuongHieu = () => {
    return;
  };
  const handleChangeLogoThuongHieu = (data) => {
    const fileUpload = data.file.originFileObj;
    const urlPreview = URL.createObjectURL(fileUpload);
    setImageThuongHieuUploaded({
      ...imageThuongHieuUploaded,
      imageUrl: urlPreview,
    });
  };
  const uploadButtonThuongHieu = (
    <div>
      {imageUploaded.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const renderForm = ({ editStatus }) => {
    return (
      <>
        <Form.Item
          label="Mã bệnh viện"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã bệnh viện!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã bệnh viện không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã bệnh viện!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập mã bệnh viện"
            autoFocus
          />
        </Form.Item>
        <Form.Item label="Logo" name="logo">
          <Upload
            name="logo"
            showUploadList={false}
            listType="picture-card"
            multiple={false}
            maxCount={1}
            customRequest={handleUploadLogo}
            onChange={handleChangeLogo}
          >
            {imageUploaded.imageUrl ? (
              <img
                src={imageUploaded.imageUrl}
                alt="logo"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Tên bệnh viện"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên bệnh viện!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên bệnh viện không quá 1000 ký tự!",
            },
          ]}
        >
          <Input className="input-option" />
        </Form.Item>
        <Form.Item label="Tuyến bệnh viện" name="tuyenBenhVien">
          <Select data={listtuyenBenhVien} placeholder="Chọn tuyến bệnh viện" />
        </Form.Item>
        <Form.Item label="Hạng bệnh viện" name="hangBenhVien">
          <Select data={listhangBenhVien} placeholder="Chọn hạng bệnh viện" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/dia-chi-hanh-chinh?tab=2")}
            >
              Tỉnh/TP
            </div>
          }
          name="tinhThanhPhoId"
        >
          <Select data={listAllTinh} placeholder="Chọn tỉnh/TP" />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="diaChi">
          <Input className="input-option" placeholder="Nhập địa chỉ" />
        </Form.Item>
        <Form.Item label="Ghi chú" name="ghiChu">
          <TextArea
            rows={4}
            placeholder="Nhập ghi chú"
            showCount
            maxLength={1000}
          />
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" label=" " valuePropName="checked">
            <Checkbox>Hiệu lực</Checkbox>
          </Form.Item>
        )}
        <Form.Item label="Ảnh bản quyền thương hiệu" name="logoThuongHieu">
          <Upload
            name="logoThuongHieu"
            showUploadList={false}
            listType="picture-card"
            multiple={false}
            maxCount={1}
            customRequest={handleUploadLogoThuongHieu}
            onChange={handleChangeLogoThuongHieu}
          >
            {imageThuongHieuUploaded.imageUrl ? (
              <img
                src={imageThuongHieuUploaded.imageUrl}
                alt="logoThuongHieu"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButtonThuongHieu
            )}
          </Upload>
        </Form.Item>
      </>
    );
  };
  return (
    <BaseDmWrap
      titleMain={screenName}
      roleName="BENH_VIEN"
      // classNameForm={"form-custom--one-line"}
      storeName="benhVien"
      getColumns={getColumns}
      renderForm={renderForm}
      beforeSubmit={beforeSubmit}
      afterSubmit={afterSubmit}
    />
  );
};

export default BenhVien;
