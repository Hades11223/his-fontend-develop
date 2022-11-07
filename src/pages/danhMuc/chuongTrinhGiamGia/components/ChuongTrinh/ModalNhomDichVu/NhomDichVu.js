import React, { useState, useEffect, useMemo } from "react";
import { Image, Input } from "antd";
import { ContentTranfer } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";

const ListNhomDichVu = ({
  listService,
  updateListService,
}) => {
  const [state, _setState] = useState({
    data: [],
  });

  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };

  const service = useMemo(() => {
    return listService.map((item, index) => {
      return {
        ...item,
        action: item,
        index: index + 1,
      };
    })
  }, [listService]);

  useEffect(() => {
    setState({
      data: service,
    });
  }, [service]);


  const onSearchInput = (value) => {
    let valueText = value?.trim().toLowerCase().unsignText();
    if (valueText) {
      let dataSearch = state.data?.filter((option) =>
        option?.ten?.toLowerCase().unsignText().indexOf(valueText) >= 0
      ).map((item, index) => {
        return {
          ...item,
          index: index + 1
        }
      });
      setState({ data: dataSearch || [] });
    } else {
      setState({ data: service });
    }
  };

  const handleDeleteItem = (item) => {
    let arr = state.data.filter(e => e.action !== item);
    setState({ data: arr });
    updateListService(arr);
  }

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "30px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên nhóm dịch vụ"
          search={
            <Input
              placeholder="Tìm tên nhóm dịch vụ"
              onChange={(e) => onSearchInput(e.target.value)}
            />
          }
        />
      ),
      width: "150px",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: <HeaderSearch title=""/>,
      width: "30px",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (item) => {
        return (
          <Image
            preview={false}
            src={require("assets/images/his-core/iconDelete.png")}
            onClick={() => {
              handleDeleteItem(item);
            }}
          />
        );
      },
    },
  ];

  return (
    <ContentTranfer>
      <div className="title">
        Đã chọn {listService?.length} nhóm dịch vụ
      </div>
      <TableWrapper
        columns={columns}
        dataSource={state.data}
        style={{ marginTop: 0, }}
        scroll={{ y: 100, }}
      />
    </ContentTranfer>
  );
}

export default (ListNhomDichVu);
