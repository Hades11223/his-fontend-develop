import React, { useMemo, useRef } from "react";
import { MainChoose } from "./styled";
import { Tag, Checkbox } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { formatDecimal } from "../../../../utils";
import { ModalNotification2 } from "components/ModalConfirm";
import TableWrapper from "components/TableWrapper";
import { HeaderSearch, InputTimeout } from "components";
import Select from "components/Select";

const DichVuDaChon = ({ data = [], onDeleteItem, onChangeChooseItem }) => {
  //ref
  const refModalNotificationDeleted = useRef(null);

  const listChooseDVMemo = useMemo(() => {
    return data.map((item, idx) => ({
      ...item,
      stt: idx + 1,
    }));
  }, [data]);

  const totalPriceMemo = useMemo(() => {
    const sum = data.reduce((s, { giaKhongBaoHiem }) => s + giaKhongBaoHiem, 0);

    return sum;
  }, [data]);

  const deleteDichVu = (item) => (e) => {
    e.preventDefault();

    onDeleteItem(item.uniqueKey);
  };

  const columns = [
    {
      title: <HeaderSearch isTitleCenter={true} title={<Checkbox checked />} />,
      key: "stt",
      width: 40,
      align: "center",
      render: (item, list, index) => (
        <Checkbox checked onChange={deleteDichVu(list)} />
      ),
    },
    {
      title: <HeaderSearch title="STT" isTitleCenter={true} />,
      dataIndex: "stt",
      width: 50,
      align: "center",
    },
    {
      title: <HeaderSearch title="Tên dịch vụ" />,
      width: 250,
      dataIndex: "ten",
    },
    {
      title: <HeaderSearch title="Số lượng" />,
      width: 70,
      dataIndex: "soLuong",
      render: (item, list, index) => {
        return (
          <div onClick={(event) => event.stopPropagation()}>
            <InputTimeout
              type="number"
              value={item || 1}
              style={{ width: 50 }}
              min={1}
              step={1}
              onChange={onChangeChooseItem("soLuong", list)}
            />
          </div>
        );
      },
    },
    {
      title: <HeaderSearch title="Phòng thực hiện" />,
      width: 180,
      dataIndex: "phongId",
      render: (item, list, index) => {
        const _dataPhong = list?.dsPhong || list?.dsPhongThucHien || [];

        return (
          <Select
            onChange={onChangeChooseItem("phongId", list)}
            value={item}
            placeholder={"Chọn phòng thực hiện"}
            data={_dataPhong.map((x) => ({
              ...x,
              id: x.phongId,
            }))}
          />
        );
      },
    },
  ];

  return (
    <MainChoose>
      <div className="choose-header">
        <div>
          <CheckCircleOutlined /> Đã chọn
        </div>
        <div>Tổng tiền: {formatDecimal(totalPriceMemo)} vnđ</div>
      </div>

      <div className="choose-content" key={listChooseDVMemo.length}>
        {/* {listChooseDVMemo.map((x, index) => (
          <div className="item-container" key={index}>
            <Tag className="item" closable onClose={deleteDichVu(x)}>
              {`${x.ten} (Slg: ${x.soLuong || 0})`}
            </Tag>
          </div>
        ))} */}
        <TableWrapper
          rowKey={(record, index) => record.uniqueKey}
          columns={columns}
          dataSource={listChooseDVMemo}
        />
      </div>

      <ModalNotification2 ref={refModalNotificationDeleted} />
    </MainChoose>
  );
};

export default DichVuDaChon;
