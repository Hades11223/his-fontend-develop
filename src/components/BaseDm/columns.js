import { Checkbox, Input, InputNumber } from "antd";
import InputTimeout from "components/InputTimeout";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC } from "constants/index";
import React from "react";

// ví dụ sử dụng: màn danh mục liều dùng

const yesNoCheck = (name) => [
  {
    id: "",
    ten: "Tất cả",
  },
  {
    id: "true",
    ten: "Có " + name?.toLowerCase(),
  },
  {
    id: "false",
    ten: "Không " + name?.toLowerCase(),
  },
];

export default ({
  onClickSort,
  dataSortColumn,
  onSearchInput,
  handleDeleteItem,
  page,
  size,
  titleMain,
}) => ({
  stt: {
    title: <HeaderSearch title="STT" />,
    width: 50,
    dataIndex: "stt",
    key: "stt",
    align: "center",
    render: (_, __, index) => index + 1 + page * size,
  },
  thuTuHienThi: {
    title: (
      <HeaderSearch
        title="Thứ tự hiển thị"
        sort_key="stt"
        onClickSort={onClickSort}
        dataSort={dataSortColumn.stt || 0}
        search={
          <Input
            placeholder="Tìm thứ tự hiển thị"
            type="number"
            onChange={(e) => {
              onSearchInput(e.target.value, "stt");
            }}
          />
        }
      />
    ),
    width: 100,
    dataIndex: "stt",
    key: "stt",
  },
  ma: {
    title: (
      <HeaderSearch
        title={`Mã ${titleMain}`}
        sort_key="ma"
        onClickSort={onClickSort}
        dataSort={dataSortColumn.ma || 0}
        search={
          <Input
            placeholder={`Tìm mã ${titleMain}`}
            onChange={(e) => {
              onSearchInput(e.target.value, "ma");
            }}
          />
        }
      />
    ),
    width: 150,
    dataIndex: "ma",
    key: "ma",
  },
  ten: {
    title: (
      <HeaderSearch
        title={`Tên ${titleMain}`}
        sort_key="ten"
        onClickSort={onClickSort}
        dataSort={dataSortColumn.ten || 0}
        search={
          <Input
            placeholder={`Tìm tên ${titleMain}`}
            onChange={(e) => {
              onSearchInput(e.target.value, "ten");
            }}
          />
        }
      />
    ),
    width: 200,
    dataIndex: "ten",
    key: "ten",
  },
  moTa: {
    title: (
      <HeaderSearch
        title={`Mô tả`}
        sort_key="moTa"
        onClickSort={onClickSort}
        dataSort={dataSortColumn.moTa || 0}
        search={
          <Input
            placeholder={`Tìm mô tả`}
            onChange={(e) => {
              onSearchInput(e.target.value, "moTa");
            }}
          />
        }
      />
    ),
    width: 180,
    dataIndex: "moTa",
    key: "moTa",
  },
  active: {
    title: (
      <HeaderSearch
        searchSelect={
          <Select
            data={HIEU_LUC}
            placeholder="Chọn hiệu lực"
            defaultValue=""
            onChange={(value) => {
              onSearchInput(value, "active");
            }}
          />
        }
        sort_key="active"
        onClickSort={onClickSort}
        dataSort={dataSortColumn.active || 0}
        title="Có hiệu lực"
      />
    ),
    width: 120,
    dataIndex: "active",
    key: "active",
    align: "center",
    render: (item) => {
      return <Checkbox checked={item} />;
    },
  },
  colInput: ({ title = "", fieldName = "", width = 150, render }) => ({
    title: (
      <HeaderSearch
        title={title}
        sort_key={fieldName}
        onClickSort={onClickSort}
        dataSort={dataSortColumn[fieldName] || 0}
        search={
          <Input
            placeholder={`Tìm ${title}`}
            onChange={(e) => {
              onSearchInput(e.target.value, fieldName);
            }}
          />
        }
      />
    ),
    width,
    dataIndex: fieldName,
    key: fieldName,
    render,
  }),
  colCheckbox: ({ title = "", fieldName = "", width }) => ({
    title: (
      <HeaderSearch
        searchSelect={
          <Select
            data={yesNoCheck(title)}
            placeholder={"Chọn " + title}
            defaultValue=""
            onChange={(value) => {
              onSearchInput(value, fieldName);
            }}
          />
        }
        sort_key={fieldName}
        onClickSort={onClickSort}
        dataSort={dataSortColumn[fieldName] || 0}
        title={title}
      />
    ),
    width: width || 50,
    dataIndex: fieldName,
    key: fieldName,
    align: "center",
    render: (item) => {
      return <Checkbox checked={item} />;
    },
  }),
  colMulSelect: ({
    data = [],
    title = "",
    fieldName = "",
    width = 100,
    fieldMap = "ten",
    fieldSearch = fieldName + "Id",
    mode,
    render,
    align = "center"
  }) => ({
    title: (
      <HeaderSearch
        searchSelect={
          <Select
            data={data}
            placeholder={"Chọn " + title?.toLowerCase()}
            onChange={(value) => {
              onSearchInput(value, fieldSearch);
            }}
            mode={mode}
          />
        }
        sort_key={fieldName}
        onClickSort={onClickSort}
        dataSort={dataSortColumn[fieldName] || 0}
        title={title}
      />
    ),
    width,
    dataIndex: fieldName,
    key: fieldName,
    align: align,
    render: render
      ? render
      : (item) => item?.map((item) => item[fieldMap]).join(", "),
  }),
  colInputPrice: ({ title = "", fieldName = "", width = 60, render }) => ({
    title: (
      <HeaderSearch
        title={title}
        sort_key={fieldName}
        onClickSort={onClickSort}
        dataSort={dataSortColumn[fieldName] || 0}
        search={
          <InputTimeout
            formatPrice={true}
            type="number"
            placeholder="0"
            style={{ width: "100%" }}
            // min={0}
            onChange={(value) => onSearchInput(value, fieldName)}
          />
        }
      />
    ),
    width: "150px",
    dataIndex: fieldName,
    key: fieldName,
    render: render
      ? render
      : (item, list, index) => (item ? (item + "").formatPrice() : ""),
  }),
});
