import React from "react";
import { Input, Form } from "antd";
import { Main } from "./styled";
import FormWraper from "components/FormWraper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
const XML4 = ({ form4, state, setState, id }) => {
  const { getList, updateData, onSizeChange, onSortChange } =
    useDispatch().danhSachHoSoBaoHiem79A46QD4201Xml4;
  const { listData, totalElements, page, size, dataSortColumn } = useSelector(
    (state) => state.danhSachHoSoBaoHiem79A46QD4201Xml4
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
          sort_key="maLk"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maLk"] || 0}
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
          title="MA_DICH_VU"
          sort_key="maDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maDichVu"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_DICH_VU",
      key: "MA_DICH_VU",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_CHI_SO"
          sort_key="maChiSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maChiSo"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_CHI_SO",
      key: "MA_CHI_SO",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="TEN_CHI_SO"
          sort_key="tenChiSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenChiSo"] || 0}
        />
      ),
      width: 150,
      dataIndex: "TEN_CHI_SO",
      key: "TEN_CHI_SO",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="GIA_TRI"
          sort_key="giaTri"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaTri"] || 0}
        />
      ),
      width: 150,
      dataIndex: "GIA_TRI",
      key: "GIA_TRI",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MA_MAY"
          sort_key="maMay"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maMay"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MA_MAY",
      key: "MA_MAY",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="KET_LUAN"
          sort_key="ketLuan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ketLuan"] || 0}
        />
      ),
      width: 150,
      dataIndex: "KET_LUAN",
      key: "KET_LUAN",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="MO_TA"
          sort_key="moTa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["moTa"] || 0}
        />
      ),
      width: 150,
      dataIndex: "MO_TA",
      key: "MO_TA",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="NGAY_KQ"
          sort_key="ngayKq"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngayKq"] || 0}
        />
      ),
      width: 150,
      dataIndex: "NGAY_KQ",
      key: "NGAY_KQ",
      render: (item) => {
        return item;
      },
    },
  ];
  const onChangePage = (page) => {
    // getList({ page: page - 1 });
    getList({ id, activeKeyTab: "4", page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ id, activeKeyTab: "4", size });
  };
  const onRow = (record, index) => {
    return {
      onClick: async (event) => {
        await setState({
          selectedRow: record,
        });
        await updateData({ dataCurrent: record });
        await form4.setFieldsValue(record);
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
            form={form4}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            {/* ----------------------------------------------------------------------- */}
            <Form.Item
              label="MA_LK"
              name="MA_LK"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập MA_LK!",
                },
              ]}
            >
              <Input disabled={true} className="input-option" />
            </Form.Item>
            <Form.Item label="MA_DICH_VU" name="MA_DICH_VU">
              <Input className="input-option" />
            </Form.Item>
            <Form.Item label="MA_CHI_SO" name="MA_CHI_SO">
              <Input className="input-option" />
            </Form.Item>
            <Form.Item label="TEN_CHI_SO" name="TEN_CHI_SO">
              <Input className="input-option" />
            </Form.Item>
            <Form.Item label="GIA_TRI" name="GIA_TRI">
              <Input className="input-option" />
            </Form.Item>
            <Form.Item label="MA_MAY" name="MA_MAY">
              <Input className="input-option" />
            </Form.Item>
            <Form.Item label="KET_LUAN" name="KET_LUAN">
              <Input className="input-option" />
            </Form.Item>
            <Form.Item label="MO_TA" name="MO_TA">
              <Input className="input-option" />
            </Form.Item>
            <Form.Item
              label="NGAY_KQ"
              name="NGAY_KQ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập NGAY_KQ!",
                },
              ]}
            >
              <Input className="input-option" />
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

export default XML4;
