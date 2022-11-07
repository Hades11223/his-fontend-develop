import React, { useState, useEffect } from "react";

import { Modal, Form, InputNumber, Divider, Input } from "antd";
import { Main } from "./styled";
import { A4 } from "constants/index";
import { formItemLayout } from "components/constanst";
import TableControl from "../TableControl";

const numberToArray = (number) => {
  let arr = [];

  for (let i = 1; i <= number; i++) {
    arr.push({ key: i });
  }
  return arr;
};

const GenerateTable = ({ visible, onOke, close }) => {
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [tableWidth, setTableWidth] = useState(A4.width);
  const [obj, setObj] = useState({ col: {}, row: {} });

  useEffect(() => {
    handleChangeCols(5);
    handleChangeRows(5);
  }, []);

  const handleChangeRows = (value) => {
    setRows(numberToArray(value));
  };

  const handleChangeCols = (value) => {
    setCols(
      numberToArray(value).map((item) => ({
        ...item,
        width: Math.round((1 / value) * 100) / 100,
      }))
    );
  };

  const handleOk = () => {
    onOke({
      rows,
      cols: cols.map((c) => {
        return { ...c, width: c.width * tableWidth - 1 };
      }),
    });
  };

  const handleFocusCol = (out) => {
    setObj(out);
  };

  const handleChangeWidth = (value) => {
    setTableWidth(value);
  };

  const handleChangeColWidth = (e) => {
    const value = e.target.value;

    if (obj.col.key) {
      const arr = cols.map((c) =>
        c.key === obj.col.key ? { ...c, width: parseInt(value) / 100 } : c
      );
      setCols(arr);
      setObj({ ...obj, col: { ...obj.col, width: parseInt(value) / 100 } });
    }
  };

  return (
    <Modal
      visible={visible}
      title="Table props"
      onOk={handleOk}
      onCancel={close}
      okText="Ok"
      cancelText="Cancel"
    >
      <Main>
        <Form {...formItemLayout}>
          <Form.Item label="Rows" style={{ marginBottom: 0 }}>
            <InputNumber
              defaultValue={5}
              size={"small"}
              onChange={handleChangeRows}
            />
          </Form.Item>

          <Form.Item label="Columns" style={{ marginBottom: 0 }}>
            <InputNumber
              defaultValue={5}
              size={"small"}
              onChange={handleChangeCols}
            />
          </Form.Item>

          <Form.Item label="Table width" style={{ marginBottom: 0 }}>
            <InputNumber
              defaultValue={tableWidth}
              size={"small"}
              onChange={handleChangeWidth}
            />
          </Form.Item>

          <Divider />

          <div>
            <Form.Item label="Column width" style={{ marginBottom: 0 }}>
              <Input
                style={{ width: 120 }}
                addonAfter={"%"}
                value={(obj.col.width || 0) * 100}
                size={"small"}
                onChange={handleChangeColWidth}
              />
            </Form.Item>

            <TableControl
              cols={cols}
              rows={rows}
              handleChangeFocus={handleFocusCol}
              setWidth
            />
          </div>
        </Form>
      </Main>
    </Modal>
  );
};

export default GenerateTable;
