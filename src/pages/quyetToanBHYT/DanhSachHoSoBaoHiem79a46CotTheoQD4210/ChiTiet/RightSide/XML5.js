import React from "react";
import { Input, Form } from "antd";
import { Main } from "./styled";
import FormWraper from "components/FormWraper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
const XML5 = ({ form5, state, setState, id }) => {
  const { getList, updateData, onSizeChange, onSortChange } =
    useDispatch().danhSachHoSoBaoHiem79A46QD4201Xml5;
  const { listData, totalElements, page, size, dataSortColumn } = useSelector(
    (state) => state.danhSachHoSoBaoHiem79A46QD4201Xml5
  );
  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 50,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="MA_LK"
          sort_key="MA_LK"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["MA_LK"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_LK",
      key: "MA_LK",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="NGAY_YL"
          sort_key="NGAY_YL"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["NGAY_YL"] || 0}
        />
      ),
      width: 150,
      dataIndex: "NGAY_YL",
      key: "NGAY_YL",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="DIEN_BIEN"
          sort_key="DIEN_BIEN"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["DIEN_BIEN"] || 0}
        />
      ),
      width: 150,
      dataIndex: "DIEN_BIEN",
      key: "DIEN_BIEN",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="HOI_CHAN"
          sort_key="HOI_CHAN"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["HOI_CHAN"] || 0}
        />
      ),
      width: 150,
      dataIndex: "HOI_CHAN",
      key: "HOI_CHAN",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="PHAU_THUAT"
          sort_key="PHAU_THUAT"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["PHAU_THUAT"] || 0}
        />
      ),
      width: 150,
      dataIndex: "PHAU_THUAT",
      key: "PHAU_THUAT",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Thông tin DL lỗi"
          sort_key="Thông tin DL lỗi"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["Thông tin DL lỗi"] || 0}
        />
      ),
      width: 150,
      dataIndex: "Thông tin DL lỗi",
      key: "Thông tin DL lỗi",
      render: (item) => {
        return item;
      },
    },
  ];
  const onChangePage = (page) => {
    getList({ id, activeKeyTab: "5", page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ id, activeKeyTab: "5", size });
  };
  const onRow = (record, index) => {
    return {
      onClick: async (event) => {
        await setState({
          selectedRow: record,
        });
        await updateData({ dataCurrent: record });
        await form5.setFieldsValue(record);
      },
    };
  };
  return (
    <Main>
      {state.selectedRow ? (
        <>
          <div
            className={"button-list"}
            onClick={() => setState({ selectedRow: null })}
          >
            Xem danh sách <img src={require("assets/images/utils/files.png")} />
          </div>

          <FormWraper
            readOnly={!state.saveState}
            form={form5}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <Form.Item style={{ width: "100%" }} label="MA_LK" name="MA_LK">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập MA_LK"
              />
            </Form.Item>
            <Form.Item style={{ width: "100%" }} label="NGAY_YL" name="NGAY_YL">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập NGAY_YL"
              />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              label="DIEN_BIEN"
              name="DIEN_BIEN"
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập DIEN_BIEN"
              />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              label="HOI_CHAN"
              name="HOI_CHAN"
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập HOI_CHAN"
              />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              label="PHAU_THUAT"
              name="PHAU_THUAT"
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập PHAU_THUAT"
              />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              label="Thông tin DL lỗi"
              name="Thông tin DL lỗi"
            >
              <Input disabled={true} className="input-option" />
            </Form.Item>
          </FormWraper>
        </>
      ) : (
        <>
          <TableWrapper
            scroll={{ x: 1000 }}
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            columns={columns}
            dataSource={listData}
            onRow={onRow}
          />
          {!!totalElements && (
            <Pagination
              listData={listData}
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
            />
          )}
        </>
      )}
    </Main>
  );
};

export default XML5;
