import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Input, Form } from "antd";
import Select from "components/Select";
import { SERVICE_STATUS } from "../../../../configs";
import { openInNewTab } from "utils";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const { TextArea } = Input;

function GiaiPhauBenh(props) {
  const { t } = useTranslation();
  const [listTinhChatBenhPham] = useEnum(ENUM.TINH_CHAT_BENH_PHAM);
  const {
    listAllPhuongPhapNhuom,
    listAllViTriSinhThiet,
    infoDichVu,
    form,
    getListAllPhuongPhapNhuom,
    getListAllViTriSinhThiet,
  } = props;
  const isDisabled = infoDichVu.trangThai !== SERVICE_STATUS.DA_TIEP_NHAN_MAU;
  // const isDisabled = false;
  const isShowFiledGPB =
    infoDichVu.nhomDichVuCap2Id == 62 ||
    infoDichVu.nhomDichVuCap2Id === undefined;
  useEffect(() => {
    form.setFieldsValue(infoDichVu);
  }, [infoDichVu]);

  useEffect(() => {
    getListAllPhuongPhapNhuom({ page: "", size: "", active: true });
    getListAllViTriSinhThiet({ page: "", size: "", active: true });
  }, []);

  return (
    <Main>
      <Form form={form} layout="vertical" className="form-content">
        <Form.Item
          label={t("xetNghiem.benhPham")}
          name="benhPham"
          className="form-item"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label={t("xetNghiem.moTaBenhPham")}
          name="moTaBenhPham"
          className="form-item"
        >
          <TextArea autoSize={{ minRows: 1, maxRows: 6 }} disabled />
        </Form.Item>
        <Form.Item
          label={t("xetNghiem.tinhChatBenhPham")}
          name="tinhChatBenhPham"
          className="form-item"
        >
          <Select disabled={isDisabled} data={listTinhChatBenhPham} />
        </Form.Item>
        {isShowFiledGPB && (
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/vi-tri-sinh-thiet")}
              >
                {t("xetNghiem.viTriSinhThiet")}
              </div>
            }
            name="viTriSinhThietId"
            className="form-item"
          >
            <Select disabled={isDisabled} data={listAllViTriSinhThiet} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/phuong-phap-nhuom")}
              >
                {t("xetNghiem.phuongPhapNhuom")}
              </div>
            }
            name="phuongPhapNhuomId"
            className="form-item"
          >
            <Select disabled={isDisabled} data={listAllPhuongPhapNhuom} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item
            label={t("xetNghiem.soGpb")}
            name="soGpb"
            className="form-item"
          >
            <Input disabled={isDisabled} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item
            label={t("xetNghiem.soTieuBan")}
            name="soTieuBan"
            className="form-item"
          >
            <Input disabled={isDisabled} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item
            label={t("xetNghiem.soHoSo")}
            name="soHoSo"
            className="form-item"
          >
            <Input disabled={isDisabled} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item
            label={t("xetNghiem.viThe")}
            name="viThe"
            className="form-item form-item--full-width"
          >
            <TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
          </Form.Item>
        )}
        {isShowFiledGPB && (
          <Form.Item
            label={t("xetNghiem.daiThe")}
            name="daiThe"
            className="form-item form-item--full-width"
          >
            <TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
          </Form.Item>
        )}
      </Form>
    </Main>
  );
}

export default connect(
  ({
    viTriSinhThiet: { listAllViTriSinhThiet },
    phuongPhapNhuom: { listAllPhuongPhapNhuom },
  }) => ({
    listAllViTriSinhThiet,
    listAllPhuongPhapNhuom,
  }),
  ({
    viTriSinhThiet: { getListAllViTriSinhThiet },
    phuongPhapNhuom: { getListAllPhuongPhapNhuom },
  }) => ({
    getListAllViTriSinhThiet,
    getListAllPhuongPhapNhuom,
  })
)(GiaiPhauBenh);
