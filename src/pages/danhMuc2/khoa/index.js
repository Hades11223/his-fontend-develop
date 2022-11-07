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
      title: "Tên viết tắt",
      dataIndex: "vietTat",
      width: 150,
      ...rest,
    }),
    ColumnInput({
      title: "mã BHYT",
      dataIndex: "maBhyt",
      width: 150,
      ...rest,
    }),
    ColumnInput({
      title: "Tên BH",
      dataIndex: "tenBhyt",
      width: 150,
      ...rest,
    }),
    ColumnInput({
      title: "Loại bệnh án",
      dataIndex: "loaiBenhAn",
      searchKey: "loaiBenhAn.ten",
      width: 150,
      render: (item) => item?.ten,
      ...rest,
    }),
    ColumnSelect({
      title: "Nhà",
      dataIndex: "dsToaNhaId",
      dataSelect: listAllToaNha,
      width: 150,
      render: (item) =>
        item?.map((i) => mapToaNha["toaNha" + i]?.ten).join(", "),
      ...rest,
    }),
    ColumnSelect({
      title: "Nhà thu tiền",
      dataIndex: "dsNhaThuTienId",
      dataSelect: listAllToaNha,
      width: 150,
      render: (item) =>
        item?.map((i) => mapToaNha["toaNha" + i]?.ten).join(", "),
      ...rest,
    }),
    ColumnInput({
      title: "Giường kế hoạch",
      dataIndex: "giuongKeHoach",
      width: 150,
      align: "right",
      ...rest,
    }),
    ColumnInput({
      title: "Giường thực kê",
      dataIndex: "giuongThucKe",
      width: 150,
      align: "right",
      ...rest,
    }),
    ColumnInput({
      title: "Trần bảo hiểm",
      dataIndex: "tranBaoHiem",
      width: 150,
      align: "right",
      render: (field) => (field ? formatNumber(field) : ""),
      ...rest,
    }),
    ColumnSelect({
      title: "Tính chất khoa",
      dataSelect: [{ id: "", ten: "Tất cả" }, ...listtinhChatKhoa],
      dataIndex: "dsTinhChatKhoa",
      width: 250,
      render: (item) => {
        return getlisttinhChatKhoa(item).join(", ");
      },
      ...rest,
    }),
    ColumnInput({
      title: "Ngưỡng tạm ứng điều trị",
      dataIndex: "nguongTamUng",
      width: 150,
      align: "right",
      render: (field) => (field ? formatNumber(field) : ""),
      ...rest,
    }),
    ColumnSelect({
      title: "Được phép mượn giường tại khoa",
      dataSelect: [{ id: "", ten: "Tất cả" }, ...listAllKhoa],
      dataIndex: "dsKhoaMuonGiuongId",
      width: 250,
      render: (item) => {
        return getListTenKhoa(item).join(", ");
      },
      ...rest,
    }),
    ColumnInput({
      title: "Mô tả",
      dataIndex: "moTa",
      width: 150,
      ...rest,
    }),
    ColumnCheckbox({
      title: "Thanh toán sau",
      textSearch: ["Thanh toán sau", "Không thanh toán sau"],
      dataIndex: "thanhToanSau",
      width: 150,
      ...rest,
    }),
    ColumnCheckbox({
      title: "Tiếp nhận nội trú",
      textSearch: ["Có tiếp nhận", "Không tiếp nhận"],
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
              label="Mã khoa"
              name="ma"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã khoa!",
                },
                {
                  max: 20,
                  message: "Vui lòng nhập mã khoa không quá 20 ký tự!",
                },
              ]}
            >
              <Input
                ref={refAutoFocus}
                className="input-option"
                placeholder="Vui lòng nhập mã khoa"
              />
            </Form.Item>
            <Form.Item
              label="Tên khoa"
              name="ten"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên khoa!",
                },
                {
                  max: 1000,
                  message: "Vui lòng nhập tên khoa không quá 1000 ký tự!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên khoa"
              />
            </Form.Item>
          </div>
          <Form.Item label="Logo" name="logo" valuePropName="files">
            <ListImage uploadImage={checkChangeField("logo")} provider="khoa" />
          </Form.Item>
        </div>

        <Form.Item
          label="Tên viết tắt"
          name="vietTat"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên viết tắt!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Vui lòng nhập tên viết tắt"
          />
        </Form.Item>
        <Form.Item
          label="Mã BHYT"
          name="maBhyt"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã BHYT!",
            },
          ]}
        >
          <Input className="input-option" placeholder="Vui lòng nhập mã BHYT" />
        </Form.Item>
        <Form.Item label="Loại bệnh án" name="loaiBenhAnId">
          <Select data={listAllLoaiBenhAn} placeholder="Chọn loại bệnh án" />
        </Form.Item>
        <Form.Item label="Tên BH" name="tenBhyt">
          <Input className="input-option" placeholder="Vui lòng nhập tên BH" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/toa-nha")}
            >
              Nhà thu tiền
            </div>
          }
          name="dsNhaThuTienId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nhà thu tiền!",
            },
          ]}
        >
          <Select
            data={listAllToaNha}
            placeholder="Chọn nhà thu tiền"
            mode="multiple"
          />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/toa-nha")}
            >
              Nhà
            </div>
          }
          name="dsToaNhaId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nhà!",
            },
          ]}
        >
          <Select data={listAllToaNha} placeholder="Chọn nhà" mode="multiple" />
        </Form.Item>
        <Form.Item label="Giường thực kê" name="giuongThucKe">
          <Input
            type="number"
            placeholder="Nhập giường thực kê"
            className="input-option"
          />
        </Form.Item>
        <Form.Item label="Giường kế hoạch" name="giuongKeHoach">
          <Input
            type="number"
            placeholder="Nhập giường kế hoạch"
            className="input-option"
          />
        </Form.Item>
        <Form.Item label="Tính chất khoa" name="dsTinhChatKhoa">
          <Select
            mode="multiple"
            data={[...listtinhChatKhoa]}
            placeholder="Chọn tính chất khoa"
            onChange={onChangeTinhChatKhoa}
          />
        </Form.Item>
        <Form.Item label="Trần bảo hiểm" name="tranBaoHiem">
          <InputNumber
            type="number"
            placeholder="Nhập trần bảo hiểm"
            className="input-option"
            min={0}
          />
        </Form.Item>
        <Form.Item label="Ngưỡng tạm ứng điều trị" name="nguongTamUng">
          <InputNumber
            type="number"
            placeholder="Nhập ngưỡng tạm ứng điều trị"
            className="input-option"
            min={0}
          />
        </Form.Item>
        <Form.Item
          label="Được phép mượn giường tại khoa"
          name="dsKhoaMuonGiuongId"
        >
          <Select
            data={listAllKhoa}
            mode="multiple"
            placeholder="Chọn khoa"
            showArrow
          />
        </Form.Item>

        <Form.Item label="Mô tả" name="moTa" style={{ width: "98%" }}>
          <Input className="input-option" placeholder="Vui lòng nhập mô tả" />
        </Form.Item>

        {editStatus && (
          <Form.Item name="active" valuePropName="checked">
            <Checkbox>Có hiệu lực</Checkbox>
          </Form.Item>
        )}
        <Form.Item name="thanhToanSau" valuePropName="checked">
          <Checkbox>Thanh toán sau</Checkbox>
        </Form.Item>
        {state.visibleTiepNhan && (
          <Form.Item name="tiepNhanNoiTru" valuePropName="checked">
            <Checkbox>Tiếp nhận nội trú</Checkbox>
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
