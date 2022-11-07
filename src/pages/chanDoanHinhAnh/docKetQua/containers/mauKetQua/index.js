import { Select } from "antd";
import React from "react";
import { Main } from "./styled";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import InputTimeout from "../../../../../components/InputTimeout";
import TextField from "components/TextField";
import { searchString } from "utils";

const { Option } = Select;

const MauKetQua = (props) => {
  // todo: data test bỏ khi ghép api
  const mauKetQua = [
    { ten: "mẫu A", id: 1 },
    { ten: "mẫu 2", id: 2 },
    { ten: "mẫu 3", id: 3 },
    { ten: "mẫu 4", id: 4 },
    { ten: "mẫu 5", id: 5 },
    { ten: "mẫu 6", id: 6 },
    { ten: "mẫu 7", id: 7 },
  ];
  const mayTH = [
    { ten: "máy A", id: 1 },
    { ten: "máy 2", id: 2 },
    { ten: "máy 3", id: 3 },
    { ten: "máy 4", id: 4 },
    { ten: "máy 5", id: 5 },
    { ten: "máy 6", id: 6 },
    { ten: "máy 7", id: 7 },
  ];
  const ktv = [
    { ten: "kỹ thuật viên A", id: 1 },
    { ten: "kỹ thuật viên 2", id: 2 },
    { ten: "kỹ thuật viên 3", id: 3 },
    { ten: "kỹ thuật viên 4", id: 4 },
    { ten: "kỹ thuật viên 5", id: 5 },
    { ten: "kỹ thuật viên 6", id: 6 },
    { ten: "kỹ thuật viên 7", id: 7 },
  ];
  const thuKy = [
    { ten: "thư ký A", id: 1 },
    { ten: "thư ký 2", id: 2 },
    { ten: "thư ký 3", id: 3 },
    { ten: "thư ký 4", id: 4 },
    { ten: "thư ký 5", id: 5 },
    { ten: "thư ký 6", id: 6 },
    { ten: "thư ký 7", id: 7 },
  ];

  return (
    <Main>
      <div className="title">
        <div className="search-select" style={{ width: "50%" }}>
          <img src={IconSearch} alt="IconSearch" className="icon-search" />
          <Select
            showSearch
            allowClear
            onClear={() => {}}
            placeholder="Mẫu kết quả"
            filterOption={(a, b) => searchString(a, b.children)}
          >
            {mauKetQua.map((item, index) => (
              <Option key={index} value={item?.id}>
                {item?.ten}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="content">
        <div className="line">
          <span>Máy thực hiện:</span>
          <div>
            <Select
              showSearch
              allowClear
              onClear={() => {}}
              // placeholder="Mẫu kết quả"
              filterOption={(a, b) => searchString(a, b.children)}
            >
              {mayTH.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {item?.ten}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="line">
          <span>Kỹ thuật viên:</span>
          <div>
            <Select
              showSearch
              allowClear
              onClear={() => {}}
              // placeholder="Mẫu kết quả"
              filterOption={(a, b) => searchString(a, b.children)}
            >
              {ktv.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {item?.ten}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="line">
          <span>Thư ký:</span>
          <div>
            <Select
              showSearch
              allowClear
              onClear={() => {}}
              // placeholder="Mẫu kết quả"
              filterOption={(a, b) => searchString(a, b.children)}
            >
              {thuKy.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {item?.ten}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="line">
          <span>Kỹ thuật: </span>
          <div>
            <InputTimeout />
          </div>
        </div>

        <div className="line">
          <span>Mô tả: </span>
          <div>
            <InputTimeout />
          </div>
        </div>

        <div className="line">
          <span>Kết luận: </span>
          <div>
            <InputTimeout />
          </div>
        </div>

        <div className="line">
          <span>Khuyến nghị: </span>
          <div>
            <InputTimeout />
          </div>
        </div>

        <div className="line">
          <span>Thời gian: </span>
          <div>
            <InputTimeout readOnly />
          </div>
        </div>

        <div className="line">
          <span>Bác sĩ: </span>
          <div>
            <InputTimeout readOnly/>
          </div>
        </div>

        <div className="line">
          <span>Tên bác sĩ:</span>
          <div>
            <InputTimeout readOnly/>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default MauKetQua;
