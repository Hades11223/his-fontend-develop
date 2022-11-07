import { Checkbox, Form, Input } from "antd";
import BaseDmWrap from "components/BaseDmWrap";
import { ROLES } from "constants/index";
import React, { useEffect, useState } from "react";
import { Main } from "../styled";
import { useTranslation } from "react-i18next";
import useListAll from "hook/useListAll";
import { Select, TableWrapper } from "components";
import { useDispatch } from "react-redux";
import { useStore } from "hook";
import SelectLoadMore from "components/SelectLoadMore";
import dmDichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider.js";
const { ColumnSelect, ColumnInput } = TableWrapper;

const TuongTacThuoc = ({}) => {
  const { t } = useTranslation();
  const [listAllDacTinhDuocLy] = useListAll("dacTinhDuocLy");
  const [listAllHauQuaTuongTac] = useListAll("hauQuaTuongTac");
  const [listAllMucDoTuongTac] = useListAll("mucDoTuongTac");
  const [listAllMaBenh] = useListAll("maBenh");

  const {
    tuongTacThuoc: { searchHoatChatTongHop1, searchHoatChatTongHop2 },
  } = useDispatch();
  const listHoatChat1 = useStore("tuongTacThuoc.listHoatChat1", []);
  const listHoatChat2 = useStore("tuongTacThuoc.listHoatChat2", []);
  const [state, _setState] = useState({
    addParam1: { "dichVu.loaiDichVu": 90 },
    addParam2: { "dichVu.loaiDichVu": 90 },
    canhBaoIcd: false,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    searchHoatChatTongHop1({ page: "", size: "", active: true });
    searchHoatChatTongHop2({ page: "", size: "", active: true });
  }, []);
  const getColumns = ({ baseColumns = [], ...rest }) => [
    baseColumns.stt,
    ColumnSelect({
      title: `${t("danhMuc.dacTinhDuocLy")} 1`,
      dataIndex: "dacTinhDuocLy1",
      searchKey: "dacTinhDuocLy1Id",
      dataSelect: listAllDacTinhDuocLy,
      width: 200,
      render: (item) => item?.ten,
      ...rest,
    }),
    ColumnSelect({
      title: `${t("danhMuc.dacTinhDuocLy")} 2`,
      dataIndex: "dacTinhDuocLy2",
      searchKey: "dacTinhDuocLy2Id",
      dataSelect: listAllDacTinhDuocLy,
      width: 200,
      render: (item) => item?.ten,
      ...rest,
    }),
    ColumnSelect({
      title: `${t("danhMuc.hoatChat")} 1`,
      dataIndex: "hoatChat1",
      dataSelect: listHoatChat1,
      searchKey: "hoatChat1Id",
      width: 200,
      render: (item) => item?.ten,
      ...rest,
    }),
    ColumnSelect({
      title: `${t("danhMuc.hoatChat")} 2`,
      dataIndex: "hoatChat2",
      searchKey: "hoatChat2Id",
      dataSelect: listHoatChat2,
      width: 200,
      render: (item) => item?.ten,
      ...rest,
    }),
    ColumnSelect({
      title: t("danhMuc.mucDoTuongTac"),
      dataIndex: "mucDoTuongTac",
      searchKey: "mucDoTuongTacId",
      dataSelect: listAllMucDoTuongTac,
      width: 200,
      render: (item) => item?.ten,
      ...rest,
    }),
    ColumnInput({
      title: t("danhMuc.coChe"),
      dataIndex: "coChe",
      width: 200,
      ...rest,
    }),
  ];

  const onChangeField = (form, value, variables) => {
    if (variables === "dacTinhDuocLy1Id") {
      searchHoatChatTongHop1({
        page: "",
        size: "",
        active: true,
        dacTinhDuocLyId: value,
      });
      form.setFieldsValue({ hoatChat1Id: null, dsBietDuoc1Id: [] });
    }
    if (variables === "dacTinhDuocLy2Id") {
      searchHoatChatTongHop2({
        page: "",
        size: "",
        active: true,
        dacTinhDuocLyId: value,
      });
      form.setFieldsValue({ hoatChat2Id: null, dsBietDuoc2Id: [] });
    }

    if (variables === "hoatChat1Id") {
      setState({ addParam1: { ...state?.addParam1, hoatChatId: value } });
      form.setFieldsValue({ dsBietDuoc1Id: [] });
    }

    if (variables === "hoatChat2Id") {
      setState({ addParam2: { ...state?.addParam2, hoatChatId: value } });
      form.setFieldsValue({ dsBietDuoc2Id: [] });
    }

    if (variables === "canhBaoIcd") {
      setState({ canhBaoIcd: value?.target?.checked });
    }
  };
  const renderForm = ({ form }) => {
    return (
      <>
        <Form.Item
          label={`${t("danhMuc.dacTinhDuocLy")} 1`}
          name="dacTinhDuocLy1Id"
        >
          <Select
            className="input-option"
            data={listAllDacTinhDuocLy}
            placeholder={`${t("danhMuc.dacTinhDuocLy")} 1`}
            onChange={(e, list) => onChangeField(form, e, "dacTinhDuocLy1Id")}
          />
        </Form.Item>
        <Form.Item
          label={`${t("danhMuc.dacTinhDuocLy")} 2`}
          name="dacTinhDuocLy2Id"
        >
          <Select
            className="input-option"
            data={listAllDacTinhDuocLy}
            placeholder={`${t("danhMuc.dacTinhDuocLy")} 2`}
            onChange={(e, list) => onChangeField(form, e, "dacTinhDuocLy2Id")}
          />
        </Form.Item>
        <Form.Item
          label={`${t("danhMuc.hoatChat")} 1`}
          name="hoatChat1Id"
          rules={[
            {
              required: true,
              message: t("danhMuc.vuiLongNhapHoatChat"),
            },
          ]}
        >
          <Select
            className="input-option"
            placeholder={`${t("danhMuc.hoatChat")} 1`}
            data={listHoatChat1}
            onChange={(e, list) => onChangeField(form, e, "hoatChat1Id")}
          />
        </Form.Item>
        <Form.Item
          label={`${t("danhMuc.hoatChat")} 2`}
          name="hoatChat2Id"
          rules={[
            {
              required: !state?.canhBaoIcd,
              message: t("danhMuc.vuiLongNhapHoatChat"),
            },
          ]}
        >
          <Select
            className="input-option"
            placeholder={`${t("danhMuc.hoatChat")} 2`}
            data={listHoatChat2}
            onChange={(e, list) => onChangeField(form, e, "hoatChat2Id")}
          />
        </Form.Item>
        <Form.Item label={`${t("danhMuc.bietDuoc")} 1`} name="dsBietDuoc1Id">
          <SelectLoadMore
            api={dmDichVuKhoProvider.search}
            mapData={(i) => ({
              value: i?.dichVu?.id,
              label: i?.dichVu?.ten,
            })}
            className="input-option"
            placeholder={`${t("danhMuc.bietDuoc")} 1`}
            addParam={state?.addParam1}
            mode="multiple"
            showArrow
            addValue={state?.dsBietDuoc1}
          />
        </Form.Item>
        <Form.Item label={`${t("danhMuc.bietDuoc")} 2`} name="dsBietDuoc2Id">
          <SelectLoadMore
            api={dmDichVuKhoProvider.search}
            mapData={(i) => ({
              value: i?.dichVu?.id,
              label: i?.dichVu?.ten,
            })}
            className="input-option"
            placeholder={`${t("danhMuc.bietDuoc")} 2`}
            addParam={state?.addParam2}
            mode="multiple"
            showArrow
            addValue={state?.dsBietDuoc2}
          />
        </Form.Item>

        <Form.Item
          label={t("danhMuc.mucDoTuongTac")}
          name="mucDoTuongTacId"
          rules={[
            {
              required: true,
              message: t("danhMuc.vuiLongNhapMucDoTuongTac"),
            },
          ]}
        >
          <Select
            className="input-option"
            data={listAllMucDoTuongTac}
            placeholder={t("danhMuc.mucDoTuongTac")}
          />
        </Form.Item>
        <Form.Item
          label={t("danhMuc.coChe")}
          name="coChe"
          rules={[
            {
              max: 2000,
              message: t("danhMuc.vuiLongNhapGiaTriKhongQuaKyTu")
                .replace("{0}", t("danhMuc.coChe").toLowerCase())
                .replace("{1}", 2000),
            },
          ]}
        >
          <Input className="input-option" placeholder={t("danhMuc.coChe")} />
        </Form.Item>
        <Form.Item
          label={t("danhMuc.hauQua")}
          name="hauQuaTuongTacId"
          rules={[
            {
              required: true,
              message: t("danhMuc.vuiLongNhapHauQua"),
            },
          ]}
        >
          <Select
            className="input-option"
            data={listAllHauQuaTuongTac}
            placeholder={t("danhMuc.hauQua")}
          />
        </Form.Item>
        <Form.Item
          label={t("danhMuc.xuTri")}
          name="xuTri"
          rules={[
            {
              max: 2000,
              message: t("danhMuc.vuiLongNhapGiaTriKhongQuaKyTu")
                .replace("{0}", t("danhMuc.xuTri").toLowerCase())
                .replace("{1}", 2000),
            },
          ]}
        >
          <Input className="input-option" placeholder={t("danhMuc.xuTri")} />
        </Form.Item>

        {state?.canhBaoIcd && (
          <Form.Item
            label={t("danhMuc.chanDoanBenh")}
            name="dsChanDoanId"
            rules={[
              {
                required: state?.canhBaoIcd,
                message: t("danhMuc.vuiLongNhapChanDoanBenh"),
              },
            ]}
          >
            <Select
              className="input-option"
              placeholder={t("danhMuc.chanDoanBenh")}
              data={listAllMaBenh}
              mode="multiple"
              showArrow
            />
          </Form.Item>
        )}
        <Form.Item label=" " name="canhBaoIcd" valuePropName="checked">
          <Checkbox onChange={(e) => onChangeField(form, e, "canhBaoIcd")}>
            {" "}
            {t("danhMuc.cahnhBaoIcd")}
          </Checkbox>
        </Form.Item>
        <Form.Item label=" " name="khongChiDinh" valuePropName="checked">
          <Checkbox> {t("danhMuc.chanKeThuoc")}</Checkbox>
        </Form.Item>
      </>
    );
  };
  const onShowUpdate = ({ form }, data = {}) => {
    form.setFieldsValue({
      dsBietDuoc1Id: data?.dsBietDuoc1Id || [],
      dsBietDuoc2Id: data?.dsBietDuoc2Id || [],
    });
    setState({
      dsBietDuoc1:
        data?.dsBietDuoc1.map((item) => ({
          value: item?.id,
          label: item?.ten,
        })) || [],
      dsBietDuoc2:
        data?.dsBietDuoc2.map((item1) => ({
          value: item1?.id,
          label: item1?.ten,
        })) || [],
      canhBaoIcd: data.canhBaoIcd,
    });
  };
  return (
    <Main>
      <BaseDmWrap
        titleTable={t("danhMuc.khaiBaoTuongTacThuoc")}
        getColumns={getColumns}
        renderForm={renderForm}
        roleSave={ROLES["DANH_MUC"].TUONG_TAC_THUOC_THEM}
        roleEdit={ROLES["DANH_MUC"].TUONG_TAC_THUOC_SUA}
        storeName="tuongTacThuoc"
        onShowUpdate={onShowUpdate}
      />
    </Main>
  );
};

export default TuongTacThuoc;
