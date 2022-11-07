import React, { useEffect, useState } from "react";
import { HeaderSearch, TableWrapper, Select } from "components";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Space, Image } from "antd";
import { openInNewTab } from "utils";

const ThongTinKho = (props) => {
  const [data, setData] = useState([]);
  const [showRow, setShowRow] = useState(false);
  const [newRecord, setNewRecord] = useState({ khoaQuanLy: true });
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const data = props.dataSource.map((item, index) => {
      return { ...item, action: item, stt: index + 1 };
    });
    setData(data);
    setCurrentItem(null);
    setCurrentIndex(-1);
  }, [props.dataSource, props.isRefresh]);

  const onNew = () => {
    setShowRow(!showRow);
  };

  const onSaveNew = () => {
    let newData = [...newRecord.dsKho, ...props.dataSource] || [];
    setData(newData);
    props.addInfoKho(newData);
    setShowRow(false);
  };

  const onSave = (item, list, index) => {
    if (index === currentIndex) {
      data[index] = newRecord.dsKho;
      setCurrentItem(null);
      setCurrentIndex(-1);
      setData(data);
      props.addInfoKho(data);
    }
  };

  const onMultiChange = (selector, key) => (value, option) => {
    if (currentItem) {
      if (selector) {
        if (!currentItem[selector]) {
          currentItem[selector] = [];
        } else {
          if ("kho" === selector) {
            currentItem[selector] = option?.lists;
          } else {
            currentItem[selector] = option?.map((i) => i.lists);
          }
        }

        if (key && currentItem[key]) {
          currentItem[key] = value;
        }
      }
    }
  };

  const onChangeSelect = (value, option, name) => {
    newRecord.dsKho = value.map((x) => {
      return { khoId: x };
    });
    setNewRecord(newRecord);
  };

  const onChangeInput = (e) => {
    newRecord.dsKho = { khoId: e };
    setNewRecord(newRecord);
  };

  const onRow = (record = {}, index) => {
    return {
     onClick: (event) => {
        setCurrentItem(JSON.parse(JSON.stringify(record)));
        setCurrentIndex(index);
      },
    };
  };

  const onEdit = (record, element, index) => {
    setCurrentItem(JSON.parse(JSON.stringify(record)));
    setCurrentIndex(index);
  };

  const onDelete = (item) => {
    let o = data.filter((e) => e.action !== item) || [];
    setData(o);
    // let dsKhoaPhong = o.map((e) => e.action);
    props.addInfoKho(o);
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, value, index) => {
        return index + 1;
      },
    },

    {
      title: (
        <HeaderSearch
          title={(
            <div
              className="pointer"
              onClick={() => openInNewTab("/kho/quan-tri-kho")}
            >
              Tên kho
            </div>
          )}
          sort_key="khoId"
          searchSelect={
            showRow && (
              <Select
                mode="multiple"
                placeholder="Chọn kho"
                data={props.kho}
                onChange={(value, option) => {
                  onChangeSelect(value, option, "dsKho");
                }}
              />
            )
          }
        />
      ),
      width: 280,
      dataIndex: "khoId",
      key: "khoId",
      render: (item, list, index) => {
        if (index === currentIndex) {
          return (
            <Select
              placeholder="Chọn kho"
              data={props.kho}
              defaultValue={item}
              onChange={(e) => onChangeInput(e)}
            />
          );
        } else return (props.kho || []).find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Actions"
          searchSelect={
            showRow && (
              <Image
                preview={false}
                src={require("assets/images/his-core/iconTick.png")}
                onClick={onSaveNew}
              />
            )
          }
        />
      ),
      width: 50,
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (item, element, index) => {
        const isEdit = index === currentIndex;
        return isEdit ? (
          <Space>
            <Image
              preview={false}
              src={require("assets/images/his-core/iconTick.png")}
              onClick={() => {
                onSave(item, element, index);
              }}
            />
            <Image
              preview={false}
              src={require("assets/images/his-core/iconDelete.png")}
              onClick={() => {
                onDelete(item);
              }}
            />
          </Space>
        ) : (
          <Space>
            <Image
              preview={false}
              src={require("assets/images/his-core/iconEdit.png")}
              onClick={() => {
                onEdit(item, element, index);
              }}
            />
            <Image
              preview={false}
              src={require("assets/images/his-core/iconDelete.png")}
              onClick={() => {
                onDelete(item);
              }}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <div className="main-kho">
      <div className="title-info">
        Thêm kho
        <button className="right-info" onClick={onNew}>
          + Thêm
        </button>
      </div>
      <div className="table-info">
        <TableWrapper
          columns={columns}
          dataSource={data}
          onRow={onRow}
        ></TableWrapper>
      </div>
    </div>
  );
};
export default ThongTinKho;
