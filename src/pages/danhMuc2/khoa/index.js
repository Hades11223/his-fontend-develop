import React from "react";
import { Checkbox, Form, Input, InputNumber } from "antd";
import { HeaderSearch, ListImage, Select, TableWrapper } from "components";
import { useMemo } from "react";
import BaseDmWrap from "components/BaseDmWrap";
import Image from "components/Image";
import { ENUM } from "constants/index";
import { useEnum, useStore } from "hook";
import useListAll from "hook/useListAll";
import { useEffect, useState } from "react";
import { formatNumber, openInNewTab } from "utils";
import { Main } from "../styled";

// tododanhmuc

const screenName = "khoa";
const { ColumnInput, ColumnSelect, ColumnCheckbox } = TableWrapper;
const initFormValue = { active: true, thanhToanSau: true };

const Index = () => {
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const [listAllKhoa] = useListAll("khoa");
  const [listAllToaNha] = useListAll("toaNha");
  const [listAllLoaiBenhAn] = useListAll("loaiBenhAn");
  const [listtinhChatKhoa] = useEnum(ENUM.TINH_CHAT_KHOA);
  const { dataEditDefault } = useStore("khoa", {});

  useEffect(() => {
    setState({ logo: dataEditDefault?.logo });
  }, [dataEditDefault]);

  const getlisttinhChatKhoa = (item) => {
    let res = (listtinhChatKhoa || []).reduce(
      (arr, current) =>
        item && item.some((e) => e === current.id)
          ? [...arr, current.ten]
          : [...arr],
      []
    );
    return (res.length && res) || [];
  };

  const getListTenKhoa = (item) => {
    let res = (listAllKhoa || []).reduce(
      (arr, current) =>
        item && item.some((e) => e === current.id)
          ? [...arr, current.ten]
          : [...arr],
      []
    );
    return (res.length && res) || [];
  };

  const mapToaNha = useMemo(
    () => listAllToaNha?.reduce((a, b) => ({ ...a, ["toaNha" + b.id]: b }), {}),
    [listAllToaNha]
  );

  const getColumns = ({ baseColumns = {}, ...rest }) => [
    baseColumns.stt,
    {
      title: <HeaderSearch title="Logo" />,
      width: 120,
      dataIndex: "logo",
      key: "logo",
      render: (item) => {
        return (
          <div>
            <Image src={item || ""} />
          </div>
        );
      },
    },
    baseColumns.ma,
    baseColumns.ten,
    ColumnInput({
      title: "T??n vi???t t???t",
      dataIndex: "vietTat",
      width: 150,
      ...rest,
    }),
    ColumnInput({
      title: "m?? BHYT",
      dataIndex: "maBhyt",
      width: 150,
      ...rest,
    }),
    ColumnInput({
      title: "T??n BH",
      dataIndex: "tenBhyt",
      width: 150,
      ...rest,
    }),
    ColumnInput({
      title: "Lo???i b???nh ??n",
      dataIndex: "loaiBenhAn",
      searchKey: "loaiBenhAn.ten",
      width: 150,
      render: (item) => item?.ten,
      ...rest,
    }),
    ColumnSelect({
      title: "Nh??",
      dataIndex: "dsToaNhaId",
      dataSelect: listAllToaNha,
      width: 150,
      render: (item) =>
        item?.map((i) => mapToaNha["toaNha" + i]?.ten).join(", "),
      ...rest,
    }),
    ColumnSelect({
      title: "Nh?? thu ti???n",
      dataIndex: "dsNhaThuTienId",
      dataSelect: listAllToaNha,
      width: 150,
      render: (item) =>
        item?.map((i) => mapToaNha["toaNha" + i]?.ten).join(", "),
      ...rest,
    }),
    ColumnInput({
      title: "Gi?????ng k??? ho???ch",
      dataIndex: "giuongKeHoach",
      width: 150,
      align: "right",
      ...rest,
    }),
    ColumnInput({
      title: "Gi?????ng th???c k??",
      dataIndex: "giuongThucKe",
      width: 150,
      align: "right",
      ...rest,
    }),
    ColumnInput({
      title: "Tr???n b???o hi???m",
      dataIndex: "tranBaoHiem",
      width: 150,
      align: "right",
      render: (field) => (field ? formatNumber(field) : ""),
      ...rest,
    }),
    ColumnSelect({
      title: "T??nh ch???t khoa",
      dataSelect: [{ id: "", ten: "T???t c???" }, ...listtinhChatKhoa],
      dataIndex: "dsTinhChatKhoa",
      width: 250,
      render: (item) => {
        return getlisttinhChatKhoa(item).join(", ");
      },
      ...rest,
    }),
    ColumnInput({
      title: "Ng?????ng t???m ???ng ??i???u tr???",
      dataIndex: "nguongTamUng",
      width: 150,
      align: "right",
      render: (field) => (field ? formatNumber(field) : ""),
      ...rest,
    }),
    ColumnSelect({
      title: "???????c ph??p m?????n gi?????ng t???i khoa",
      dataSelect: [{ id: "", ten: "T???t c???" }, ...listAllKhoa],
      dataIndex: "dsKhoaMuonGiuongId",
      width: 250,
      render: (item) => {
        return getListTenKhoa(item).join(", ");
      },
      ...rest,
    }),
    ColumnInput({
      title: "M?? t???",
      dataIndex: "moTa",
      width: 150,
      ...rest,
    }),
    ColumnCheckbox({
      title: "Thanh to??n sau",
      textSearch: ["Thanh to??n sau", "Kh??ng thanh to??n sau"],
      dataIndex: "thanhToanSau",
      width: 150,
      ...rest,
    }),
    ColumnCheckbox({
      title: "Ti???p nh???n n???i tr??",
      textSearch: ["C?? ti???p nh???n", "Kh??ng ti???p nh???n"],
      dataIndex: "tiepNhanNoiTru",
      width: 150,
      render: (item, data) =>
        data?.dsTinhChatKhoa?.includes(70) && <Checkbox checked={item} />,
      ...rest,
    }),
    baseColumns.active,
  ];

  const onChangeTinhChatKhoa = (e) => {
    const newV = e.includes(70);
    if (newV !== state.visibleTiepNhan) {
      setState({ visibleTiepNhan: newV });
    }
  };
  const renderForm = ({
    form,
    editStatus,
    refAutoFocus,
    autoFocus,
    checkChangeField,
  }) => {
    return (
      <>
        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ width: "49%" }}>
            <Form.Item
              label="M?? khoa"
              name="ma"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? khoa!",
                },
                {
                  max: 20,
                  message: "Vui l??ng nh???p m?? khoa kh??ng qu?? 20 k?? t???!",
                },
              ]}
            >
              <Input
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui l??ng nh???p m?? khoa"
              />
            </Form.Item>
            <Form.Item
              label="T??n khoa"
              name="ten"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n khoa!",
                },
                {
                  max: 1000,
                  message: "Vui l??ng nh???p t??n khoa kh??ng qu?? 1000 k?? t???!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p t??n khoa"
              />
            </Form.Item>
          </div>
          <Form.Item label="Logo" name="logo" valuePropName="files">
            <ListImage uploadImage={checkChangeField("logo")} provider="khoa" />
          </Form.Item>
        </div>

        <Form.Item
          label="T??n vi???t t???t"
          name="vietTat"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p t??n vi???t t???t!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui l??ng nh???p t??n vi???t t???t"
          />
        </Form.Item>
        <Form.Item
          label="M?? BHYT"
          name="maBhyt"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p m?? BHYT!",
            },
          ]}
        >
          <Input className="input-option" placeholder="Vui l??ng nh???p m?? BHYT" />
        </Form.Item>
        <Form.Item label="Lo???i b???nh ??n" name="loaiBenhAnId">
          <Select data={listAllLoaiBenhAn} placeholder="Ch???n lo???i b???nh ??n" />
        </Form.Item>
        <Form.Item label="T??n BH" name="tenBhyt">
          <Input className="input-option" placeholder="Vui l??ng nh???p t??n BH" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/toa-nha")}
            >
              Nh?? thu ti???n
            </div>
          }
          name="dsNhaThuTienId"
          rules={[
            {
              required: true,
              message: "Vui l??ng ch???n nh?? thu ti???n!",
            },
          ]}
        >
          <Select
            data={listAllToaNha}
            placeholder="Ch???n nh?? thu ti???n"
            mode="multiple"
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/toa-nha")}
            >
              Nh??
            </div>
          }
          name="dsToaNhaId"
          rules={[
            {
              required: true,
              message: "Vui l??ng ch???n nh??!",
            },
          ]}
        >
          <Select data={listAllToaNha} placeholder="Ch???n nh??" mode="multiple" />
        </Form.Item>
        <Form.Item label="Gi?????ng th???c k??" name="giuongThucKe">
          <Input
            type="number"
            placeholder="Nh???p gi?????ng th???c k??"
            className="input-option"
          />
        </Form.Item>
        <Form.Item label="Gi?????ng k??? ho???ch" name="giuongKeHoach">
          <Input
            type="number"
            placeholder="Nh???p gi?????ng k??? ho???ch"
            className="input-option"
          />
        </Form.Item>
        <Form.Item label="T??nh ch???t khoa" name="dsTinhChatKhoa">
          <Select
            mode="multiple"
            data={[...listtinhChatKhoa]}
            placeholder="Ch???n t??nh ch???t khoa"
            onChange={onChangeTinhChatKhoa}
          />
        </Form.Item>
        <Form.Item label="Tr???n b???o hi???m" name="tranBaoHiem">
          <InputNumber
            type="number"
            placeholder="Nh???p tr???n b???o hi???m"
            className="input-option"
            min={0}
          />
        </Form.Item>
        <Form.Item label="Ng?????ng t???m ???ng ??i???u tr???" name="nguongTamUng">
          <InputNumber
            type="number"
            placeholder="Nh???p ng?????ng t???m ???ng ??i???u tr???"
            className="input-option"
            min={0}
          />
        </Form.Item>
        <Form.Item
          label="???????c ph??p m?????n gi?????ng t???i khoa"
          name="dsKhoaMuonGiuongId"
        >
          <Select
            data={listAllKhoa}
            mode="multiple"
            placeholder="Ch???n khoa"
            showArrow
          />
        </Form.Item>

        <Form.Item label="M?? t???" name="moTa" style={{ width: "98%" }}>
          <Input className="input-option" placeholder="Vui l??ng nh???p m?? t???" />
        </Form.Item>

        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>C?? hi???u l???c</Checkbox>
          </Form.Item>
        )}
        <Form.Item name="thanhToanSau" valuePropName="checked">
          <Checkbox>Thanh to??n sau</Checkbox>
        </Form.Item>
        {state.visibleTiepNhan && (
          <Form.Item name="tiepNhanNoiTru" valuePropName="checked">
            <Checkbox>Ti???p nh???n n???i tr??</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };

  const afterSubmit = () => {
    setState({ logo: null });
  };

  const mapToForm = (data) => {
    setState({ visibleTiepNhan: data?.dsTinhChatKhoa?.includes(70) });
    return { ...data, dsKhoaMuonGiuongId: data?.dsKhoaMuonGiuongId || [] };
  };

  return (
    <Main>
      <BaseDmWrap
        titleMain={screenName}
        getColumns={getColumns}
        renderForm={renderForm}
        roleName={"KHOA"}
        storeName="khoa"
        initFormValue={initFormValue}
        afterSubmit={afterSubmit}
        mapToForm={mapToForm}
      />
    </Main>
  );
};

export default Index;
