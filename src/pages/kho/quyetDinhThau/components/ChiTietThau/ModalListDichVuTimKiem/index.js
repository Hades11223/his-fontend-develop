import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Input } from "antd";
import { Main, ContentTable, ModalStyled } from "./styled";
import IconCancel from "assets/images/kho/icClose.png";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";

let timer = null;
const ModalListDichVuTimKiem = (props, ref) => {
  const {
    dichVuKho: { listDichVuKho, totalElements, page, size, dataSortColumn },
  } = useSelector((state) => state);

  const {
    dichVuKho: {
      onSizeChange,
      onChangeInputSearch,
      onSortChange,
      onSearch,
      updateData,
    },
  } = useDispatch();

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (key === "ten") {
      setState({ ten: value });
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 500);
  };
  console.log("state.ten", state.ten)
  const columns = [
    {
      title: <HeaderSearch title="STT" isTitleCenter={true} />,
      key: "index",
      dataIndex: "index",
      width: "5%",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã hàng hóa"
          sort_key="ma"
          dataSort={dataSortColumn["ma"] || 0}
          onClickSort={onClickSort}
          isTitleCenter={true}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: "15%",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên hàng hóa"
          sort_key="ten"
          dataSort={dataSortColumn["ten"] || 0}
          onClickSort={onClickSort}
          isTitleCenter={true}
          search={
            <Input
              value={state.ten}
              placeholder="Tìm kiếm"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: "20%",
      dataIndex: "ten",
      key: "ten",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Hàm lượng"
          sort_key="hamLuong"
          dataSort={dataSortColumn["hamLuong"] || 0}
          onClickSort={onClickSort}
          isTitleCenter={true}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("hamLuong")}
            />
          }
        />
      ),
      width: "15%",
      dataIndex: "hamLuong",
      key: "hamLuong",
    },
    {
      title: (
        <HeaderSearch
          title="Hoạt chất"
          sort_key="tenHoatChat"
          isTitleCenter={true}
        />
      ),
      width: "15%",
      dataIndex: "tenHoatChat",
      key: "tenHoatChat",
    },
    {
      title: (
        <HeaderSearch
          title="Đơn vị tính"
          sort_key="tenDonViTinh"
          isTitleCenter={true}
          onClickSort={onClickSort}
        />
      ),
      width: "15%",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
    },
    {
      title: (
        <HeaderSearch
          title="Hệ số định mức"
          sort_key="heSoDinhMuc"
          isTitleCenter={true}
        />
      ),
      width: "15%",
      dataIndex: "heSoDinhMuc",
      key: "heSoDinhMuc",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Quy cách"
          sort_key="quyCach"
          isTitleCenter={true}
          search={
            <Input placeholder="Tìm kiếm" onChange={onSearchInput("quyCach")} />
          }
        />
      ),
      width: "15%",
      dataIndex: "quyCach",
      key: "quyCach",
    },
    {
      title: (
        <HeaderSearch
          title="Loại hình ánh xạ"
          sort_key="maTuongDuong"
          isTitleCenter={true}
        />
      ),
      width: "15%",
      dataIndex: "maTuongDuong",
      key: "maTuongDuong",
    },
  ];

  useImperativeHandle(ref, () => ({
    show: ({ ten, loaiDichVu }, onOk) => {
      setState({ show: true, ten, loaiDichVu });
    },
  }));

  const oncloseModal = () => {
    setState({ show: false, ten: "" });
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        updateData({ newRecordThau: record });
        oncloseModal();
      },
    };
  };
  return (
    <ModalStyled
      width={1200}
      visible={state.show}
      closable={false}
      footer={null}
    >
      <Main>
        <Row className="header-table">
          <div className="header-table__left">Danh sách dịch vụ</div>
          <div className="header-table__right">
            <img src={IconCancel} alt="IconCancel" onClick={oncloseModal} />
          </div>
        </Row>
        <ContentTable>
          <TableWrapper
            columns={
              state?.loaiDichVu === 90
                ? columns.filter((x) => x.dataIndex !== "maTuongDuong")
                : state?.loaiDichVu === 100
                ? columns.filter(
                    (x) =>
                      x.dataIndex !== "maHoatChat" && x.dataIndex !== "hamLuong"
                  )
                : columns
            }
            onRow={onRow}
            dataSource={listDichVuKho}
            scroll={{ y: 450 }}
            rowKey={(record) => `${record.id}`}
          />
          {!!totalElements ? (
            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              listData={listDichVuKho}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
              stylePagination={{ flex: 1, justifyContent: "flex-start" }}
            />
          ) : null}
        </ContentTable>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalListDichVuTimKiem);
