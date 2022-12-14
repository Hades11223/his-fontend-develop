import React, { useState } from "react";
import groupBy from "lodash/groupBy";
import { Checkbox, Form, Input, Row, Col, message } from "antd";
import ContentDsDichVu from "./Content";
import Select from "components/Select";
import benhPhamProvider from "data-access/categories/dm-benh-pham-provider";
import CustomPopover from "pages/chanDoanHinhAnh/tiepNhan/CustomPopover";
import { Main } from "./styled";
import { LOAI_DICH_VU } from "constants/index";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
const { Option } = Select;
const DanhSachDichVu = (props) => {
  const { t } = useTranslation();
  const listAllBenhPham = useSelector(
    (state) => state.benhPham.listAllBenhPham
  );
  const listPhongThucHien = useStore("phongThucHien.listData", []);
  const nbDotDieuTriId = useSelector(
    (state) => state.khamBenh.infoNb?.nbDotDieuTriId
  );
  const soPhieuCls = useSelector(
    (state) => state.chiDinhKhamBenh.soPhieuCls || []
  );
  const getNBSoPhieuCLS = useDispatch().chiDinhKhamBenh.getNBSoPhieuCLS;
  const themThongTinPhieu = useDispatch().chiDinhKhamBenh.themThongTinPhieu;
  const searchPhongThucHien = useDispatch().phongThucHien.getData;
  const themThongTinDV = useDispatch().chiDinhKhamBenh.themThongTinDV;

  const { dataGroup = [], getDsDichVu, getListAllBenhPham } = props;

  // const data = dataGroup.map((item) => ({
  //   ...item,
  //   KEY: `${item.soPhieu}-${item.tenPhongThucHien}-${item.benhPham}`,
  // }));
  // const dataGroupLevel2 = groupBy(data, "KEY");

  const data = dataGroup;
  const dataGroupLevel2 = groupBy(data, "keyDefine");

  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [visible, setVisible] = useState([]);
  const preventCollapsed = (e) => {
    e.stopPropagation();
  };

  const handleVisible = (key, data) => (e) => {
    const dataPhieuChung = data[0] || {};

    form.setFieldsValue({
      benhPhamId: dataPhieuChung.benhPhamId || "",
      ghiChu: dataPhieuChung.ghiChu,
      soPhieuId: dataPhieuChung.soPhieuId,
      tuTra: dataPhieuChung.tuTra,
      // phongThucHienId: dataPhieuChung.phongThucHienId,
    });
    searchPhongThucHien({
      soPhieuId: dataPhieuChung.soPhieuId,
      nbDotDieuTriId: nbDotDieuTriId,
    });
    getNBSoPhieuCLS({ loaiDichVu: data[0]?.loaiDichVu });
    setVisible(key);
  };

  const onCancel = () => {
    setVisible([]);
  };

  const handleSubmit = (data) => () => {
    form.validateFields().then(async (values) => {
      let benhPhamId = await getIdBenhPham(values.benhPhamId);
      values.benhPhamId = benhPhamId;
      const soPhieuId = data[0]?.soPhieuId;
      const loaiDichVu = data[0]?.loaiDichVu;
      const obj = {
        benhPhamId: values.benhPhamId,
        nbDvKyThuat: {
          phongThucHienId: values.phongThucHienId,
          soPhieuId: values.soPhieuId,
        },
        nbDichVu: {
          tuTra: values.tuTra,
          ghiChu: values.ghiChu,
        },
      };
      themThongTinPhieu({ body: obj, id: soPhieuId, loaiDichVu }).then((s) => {
        if (s.code === 0) {
          setVisible([]);
          form.resetFields();
          getDsDichVu(loaiDichVu);
        }
      });
    });
  };

  const dataPhongThucHien = listPhongThucHien.map((item) => ({
    id: item.phongId,
    ten: `${item.phong?.ma} - ${item.phong?.ten}`,
    dichVuId: item.dichVuId,
  }));
  const dataPhongThucHienGeneral = listPhongThucHien.map((item) => ({
    id: item.phongId,
    ten: `${item?.ma} - ${item?.ten}`,
    // dichVuId: item.dichVuId,
  }));
  const optionsChild = dataPhongThucHienGeneral.map((item, index) => {
    return (
      <Option
        disabled={item.id == data[0].phongThucHienId}
        key={index}
        value={item?.id + ""}
      >{`${item?.ten}`}</Option>
    );
  });

  const renderInfo = (soPhieuId, loaiDichVu) => {
    return (
      <Form form={form} layout="vertical" className="form-custom">
        <Row gutter={8}>
          {![LOAI_DICH_VU.CDHA, LOAI_DICH_VU.KHAM].includes(loaiDichVu) && (
            <Col span={12}>
              <Form.Item
                label={t("khamBenh.chiDinh.benhPham")}
                name="benhPhamId"
                rules={[
                  {
                    required: true,
                    message: t("khamBenh.chiDinh.vuiLongNhapBenhPham"),
                  },
                ]}
              >
                <Select
                  allowClear
                  data={listAllBenhPham}
                  placeholder={t("benhPham.chonTenBenhPham")}
                  mode="tags"
                  removeIcon={() => null}
                  onChange={onChangeBenhPham}
                />
              </Form.Item>
            </Col>
          )}
          {![LOAI_DICH_VU.CDHA, LOAI_DICH_VU.KHAM].includes(loaiDichVu) && (
            <Col span={12}>
              <Form.Item
                label={t("common.phong")}
                name="phongThucHienId"
                rules={[
                  {
                    required: true,
                    message: t("common.vuiLongNhapPhong"),
                  },
                ]}
              >
                <Select
                  allowClear
                  // value={12312312}
                  // data={dataPhongThucHienGeneral}
                  placeholder={t("common.chonTenPhong")}
                >
                  {optionsChild}
                </Select>
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item label={t("common.luuY")} name="ghiChu">
              <Input
                className="input-option"
                placeholder={t("khamBenh.chiDinh.vuiLongNhapLuuY")}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("khamBenh.chiDinh.soPhieu")}
              name="soPhieuId"
              rules={[
                {
                  required: true,
                  message: t("khamBenh.chiDinh.vuiLongNhapSoPhieu"),
                },
              ]}
            >
              <Select
                data={soPhieuCls}
                placeholder={t("khamBenh.chiDinh.chonSoPhieu")}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="" name="tuTra" valuePropName="checked">
              <Checkbox>{t("common.tuTra")}</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  };

  const onChangeBenhPham = (values) => {
    try {
      if (values.length > 1) {
        form.setFieldsValue({
          benhPhamId: values[values.length - 1] || "",
        });
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getIdBenhPham = (values) => {
    return new Promise(async (resolve, reject) => {
      if (Array.isArray(values)) {
        // n???u value is array l???y item cu???i c??ng
        let newItem = values[values.length - 1];

        if (typeof newItem === "string") {
          //n???u item l?? string th?? ti???n h??nh g???i api ????? t???o b???nh ph???m
          const response = await benhPhamProvider.post({
            ten: newItem,
          });
          if (response.code === 0) {
            getListAllBenhPham({}); //t???o xong b???nh ph???m th?? g???i api search b???nh ph???m
            resolve(response.data.id); //t???o xong th?? resolve v??? id b???nh ph???n
          } else reject();
        } else {
          resolve(newItem); //n???u kh??ng ph???i string th?? resolve lu??n id b???nh ph???m
        }
      } else resolve(values); //n???u kh??ng ph???i array th?? resolve lu??n id b??nh ph???m
    });
  };
  const onChangePhieu = (soPhieuId, loaiDichVu, form) => async (value) => {
    if (form) {
      form.setFieldsValue({ benhPhamId: value[value.length - 1] });
    }
    try {
      const benhPhamId = await getIdBenhPham(value);
      await themThongTinPhieu({
        body: {
          benhPhamId: benhPhamId,
        },
        id: soPhieuId,
        loaiDichVu,
      }).then((s) => {
        if (s.code === 0) {
          getDsDichVu(loaiDichVu);
        }
      });
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <Main>
      {Object.keys(dataGroupLevel2).map((key, index) => {
        const indexOfDash = key.indexOf("-");
        const soPhieu = key.slice(0, indexOfDash);
        const {
          soPhieuId,
          benhPhamId,
          phongThucHienId,
          loaiDichVu,
          diaDiemPhongThucHien,
          tenPhongThucHien,
          maPhongThucHien,
          trangThai,
        } = dataGroupLevel2[key][0] || {};
        return (
          <div key={`${soPhieuId}-${benhPhamId}-${phongThucHienId}`}>
            <div className="form-info">
              <div
                className="form-info__left"
                onClick={preventCollapsed}
                onKeyDown={preventCollapsed}
                onKeyPress={preventCollapsed}
              >
                {![LOAI_DICH_VU.CDHA, LOAI_DICH_VU.KHAM].includes(
                  loaiDichVu
                ) && (
                  <Form form={form2} layout="horizontal">
                    <Form.Item
                      label={t("khamBenh.chiDinh.benhPham") + ":"}
                      name="benhPhamId"
                      style={{ flexWrap: "nowrap", marginBottom: 0 }}
                    >
                      <Select
                        mode="tags"
                        defaultValue={benhPhamId}
                        onChange={onChangePhieu(soPhieuId, loaiDichVu, form2)}
                        removeIcon={() => null}
                        style={{ width: 170 }}
                        allowClear
                        data={listAllBenhPham}
                        placeholder=".............................."
                      />
                    </Form.Item>
                  </Form>
                )}
              </div>
              <div className="form-info__center">
                {LOAI_DICH_VU.KHAM !== loaiDichVu && (
                  <span className="form-id">
                    <CustomPopover
                      icon={null}
                      onSubmit={handleSubmit(dataGroupLevel2[key])}
                      onCancel={onCancel}
                      text={t("khamBenh.chiDinh.soPhieu") + ": " + soPhieu}
                      contentPopover={renderInfo(
                        data[0]?.soPhieuId,
                        loaiDichVu
                      )}
                      visible={visible.includes(key)}
                      handleVisible={handleVisible(key, dataGroupLevel2[key])}
                      placement="bottom"
                    />
                  </span>
                )}
              </div>
              {LOAI_DICH_VU.KHAM !== loaiDichVu && (
                <div
                  className="form-info__right"
                  onClick={preventCollapsed}
                  onKeyDown={preventCollapsed}
                  onKeyPress={preventCollapsed}
                >
                  {t("common.phong")}:
                  <span>
                    {diaDiemPhongThucHien ||
                      `${maPhongThucHien} - ${tenPhongThucHien}`}
                  </span>
                </div>
              )}
            </div>
            <ContentDsDichVu
              trangThai={trangThai}
              loaiDichVu={loaiDichVu}
              dataSource={dataGroupLevel2[key]}
              dataPhongThucHien={dataPhongThucHien}
              getDsDichVu={getDsDichVu}
              onChangePhieu={onChangePhieu}
              getNBSoPhieuCLS={getNBSoPhieuCLS}
              searchPhongThucHien={searchPhongThucHien}
              themThongTinDV={themThongTinDV}
              listAllBenhPham={listAllBenhPham}
              {...props}
            />
          </div>
        );
      })}
    </Main>
  );
};

export default DanhSachDichVu;
