import React, { useRef, useEffect } from "react";
import { ModalTemplate, Button } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, message } from "antd";
import { HOTKEY } from "constants/index";
import { useParams } from "react-router-dom";
import PhatHanhTheIcon from "assets/svg/tiep-don/phatHanhThe.svg";
import { refConfirm } from "app";

const PhatHanhThe = () => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const [form] = Form.useForm();
  const { id } = useParams();

  const {
    thongTinBenhNhan: { tuoi, tenNb },
    chiTietNb: { maThe },
  } = useSelector((state) => state.nbDotDieuTri || {});

  const {
    nbTheNb: { postRecord },
    nbTheNbHuy: { postRecord: postRecordHuy },
    nbDotDieuTri: { getChiTietById },
  } = useDispatch();

  useEffect(() => {
    if (id) getChiTietById(id);
  }, [id]);

  const onFinishModal = () => {
    form.validateFields().then((values) => {
      postRecord({
        nbDotDieuTriId: id,
        maThe: values.maThe,
        stateIgnoreMessage: false,
      })
        .then((res) => {
          message.success(t("tiepDon.phatHanhTheRFIDThanhCong"));
          if (id) getChiTietById(id);
          refModal.current.hide();
          form.resetFields();
        })
        .catch((err) => {
          message.error(t("tiepDon.phatHanhTheRFIDThanhCong"));
        });
    });
  };

  const hotKeys = [
    {
      keyCode: HOTKEY.ESC,
      onEvent: () => {
        refModal.current.hide();
      },
    },
    {
      keyCode: HOTKEY.F4,
      onEvent: onFinishModal,
    },
  ];

  return (
    <>
      {maThe && (
        <Button
          onClick={() => {
            refConfirm.current &&
              refConfirm.current.show(
                {
                  title: t("tiepDon.huyTheRFID"),
                  content: t("tiepDon.xacNhanHuyTheRFID").replace("{0}", tenNb),
                  cancelText: t("common.quayLai"),
                  okText: t("common.dongY"),
                  classNameOkText: "button-error",
                  showImg: true,
                  showBtnOk: true,
                },
                () => {
                  postRecordHuy({
                    nbDotDieuTriId: id,
                    maThe: maThe,
                    stateIgnoreMessage: false,
                  })
                    .then((res) => {
                      message.success(t("tiepDon.huyTheRFIDThanhCong"));
                      if (id) getChiTietById(id);
                    })
                    .catch((err) => {
                      message.error(t("tiepDon.huyTheRFIDThatBai"));
                    });
                }
              );
          }}
          icon={<PhatHanhTheIcon />}
        >
          {t("tiepDon.huyTheRFID")}
        </Button>
      )}

      {maThe === null && (
        <Button
          onClick={() => refModal.current.show()}
          icon={<PhatHanhTheIcon />}
        >
          {t("tiepDon.phatHanhTheRFID")}
        </Button>
      )}

      <ModalTemplate
        autoFocus={false}
        getContainer={false}
        width={640}
        ref={refModal}
        title={t("tiepDon.phatHanhTheRFID")}
        closable={false}
        onCancel={() => refModal.current.hide}
        hotKeys={hotKeys}
        rightTitle={
          <div>
            {tenNb} - {tuoi} {t("common.tuoi")}
          </div>
        }
        actionLeft={
          <Button.Text
            leftIcon={<IcArrowLeft />}
            type="primary"
            iconHeight={15}
            onClick={() => refModal.current.hide()}
          >
            {t("common.quayLai")}
          </Button.Text>
        }
        actionRight={
          <Button
            type="primary"
            minWidth={100}
            rightIcon={<CheckCircleOutlined />}
            iconHeight={15}
            onClick={onFinishModal}
          >
            {t("common.xacNhan")}
          </Button>
        }
      >
        <Main>
          <Form form={form} layout="vertical">
            <Form.Item label={t("tiepDon.maSoThe")} name="maThe">
              <Input
                autoFocus={true}
                className="input-option"
                placeholder={t("tiepDon.vuiLongNhapMaSoThe")}
                autoComplete="off"
              />
            </Form.Item>
          </Form>
        </Main>
      </ModalTemplate>
    </>
  );
};

export default PhatHanhThe;
