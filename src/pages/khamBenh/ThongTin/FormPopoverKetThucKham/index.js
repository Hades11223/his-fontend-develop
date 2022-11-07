import React, { useState, useMemo, useEffect } from "react";
import { Form } from "antd";
import Select from "components/Select";
import { HUONG_DIEU_TRI_KHAM, ENUM } from "constants/index";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
function FormPopoverKetThucKham(props) {
  const { t } = useTranslation();
  const { onChangePopoverKetThucKham, form } = props;
  const [listHuongDieuTriKham] = useEnum(ENUM.HUONG_DIEU_TRI_KHAM);
  const [listKetQuaDieuTri] = useEnum(ENUM.KET_QUA_DIEU_TRI);

  const [huongDieuTri, setHuongDieuTri] = useState();

  useEffect(() => {
    // mặc định hẹn khám
    if (!form.getFieldValue("keyHuongDieuTri")) {
      setHuongDieuTri(20);
      form.setFieldsValue({ keyHuongDieuTri: 20 });
      onChangePopoverKetThucKham({ keyHuongDieuTri: 20 });
    }
  }, []);

  const handleChangeHuongDieuTri = (value) => {
    setHuongDieuTri(value);
  };
  const listKetQuaDieuTriFilter = useMemo(() => {
    const _huongDieuTri = huongDieuTri || form.getFieldValue("keyHuongDieuTri");
    return listKetQuaDieuTri.filter((item) => {
      let arrKetQua = [];
      if (_huongDieuTri === HUONG_DIEU_TRI_KHAM.HEN_KHAM) {
        arrKetQua = [1, 2, 3, 10];
      } else if (_huongDieuTri === HUONG_DIEU_TRI_KHAM.CHO_VE) {
        arrKetQua = [1, 2, 10];
      } else if (
        _huongDieuTri === HUONG_DIEU_TRI_KHAM.NHAP_VIEN ||
        _huongDieuTri === HUONG_DIEU_TRI_KHAM.CHUYEN_VIEN
      ) {
        arrKetQua = [3, 4, 10];
      } else {
        arrKetQua = [10];
      }

      return arrKetQua.includes(item.id);
    });
  }, [huongDieuTri, listKetQuaDieuTri]);

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={onChangePopoverKetThucKham}
    >
      <Form.Item
        label={t("khamBenh.ketLuanKham.huongDieuTri")}
        name="keyHuongDieuTri"
        rules={[
          {
            required: true,
            message: t("khamBenh.ketLuanKham.vuiLongNhapHuongDieuTri"),
          },
        ]}
      >
        <Select
          allowClear
          data={listHuongDieuTriKham}
          placeholder={t("common.ketLuanKham.chonHuongDieuTri")}
          onChange={handleChangeHuongDieuTri}
        />
      </Form.Item>
      <Form.Item label={t("common.ketQua")} name="keyKetQua">
        <Select
          allowClear
          data={listKetQuaDieuTriFilter}
          placeholder={t("common.ketLuanKham.chonKetQuaKham")}
        />
      </Form.Item>
    </Form>
  );
}

export default React.memo(FormPopoverKetThucKham);
