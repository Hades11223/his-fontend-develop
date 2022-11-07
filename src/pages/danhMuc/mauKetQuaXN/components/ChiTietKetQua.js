import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { HIEU_LUC } from "constants/index";
import { Checkbox, Input } from "antd";
const MauKetQua = (props) => {
  const refSelectRow = useRef();
  const {
    listData,
    totalElements,
    page,
    size,
    dataSortColumn,
    listAllDVXetNghiem,
    getAllDichVuXN,
    classNameRow,
    styleMain,
    styleContainerButtonHeader,
    layerId,
  } = props;
  const [data, setData] = useState([]);
  const [dataEditDefault, setDataEditDefault] = useState({});
  const { onRegisterHotkey } = useDispatch().phimTat;
  useEffect(() => {
    props.onSizeChange({ size: 10 });
    getAllDichVuXN({ "dichVu.loaiDichVu": 20, size: 9999 });

    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 38, //up
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
  }, []);
  useEffect(() => {
    setData([...listData]);
  }, [props.listData, page, size]);

  refSelectRow.current = (index) => {
    const indexNextItem =
      (data?.findIndex((item) => item.id === dataEditDefault?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      props.onRow(data[indexNextItem]);
      setDataEditDefault(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else value = e;
        props.onChangeInputSearch({
          [key]: value,
        });
      },
      500,
      key,
      e?.target
    );
  };
  const onChangePage = (page) => {
    props.onSearch({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size });
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 45,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={<Input placeholder="Tìm mã" onChange={onSearchInput("ma")} />}
        />
      ),
      width: 120,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên mẫu"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input placeholder="Tìm tên mẫu" onChange={onSearchInput("ten")} />
          }
        />
      ),
      width: 120,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Kết luận"
          sort_key="ketLuan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ketLuan || 0}
          search={
            <Input
              placeholder="Tìm kết luận"
              onChange={onSearchInput("ketLuan")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "ketLuan",
      key: "ketLuan",
    },
    {
      title: (
        <HeaderSearch
          title="Kết quả"
          sort_key="ketQua"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ketQua || 0}
          search={
            <Input
              placeholder="Tìm kết quả"
              onChange={onSearchInput("ketQua")}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "ketQua",
      key: "ketQua",
    },
    {
      title: (
        <HeaderSearch
          title="Vị thể"
          sort_key="viThe"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.viThe || 0}
          search={
            <Input placeholder="Tìm vị thể" onChange={onSearchInput("viThe")} />
          }
        />
      ),
      width: 170,
      dataIndex: "viThe",
      key: "viThe",
    },
    {
      title: (
        <HeaderSearch
          title="Đại thể"
          sort_key="daiThe"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.daiThe || 0}
          search={
            <Input
              placeholder="Tìm đại thể"
              onChange={onSearchInput("daiThe")}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "daiThe",
      key: "daiThe",
    },
    {
      title: (
        <HeaderSearch
          title="Tên xét nghiệm"
          // sort_key="dsDichVu.ten"
          // onClickSort={onClickSort}
          // dataSort={props.dataSortColumn["dsDichVu.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên xét nghiệm"
              onChange={onSearchInput("tenXetNghiem")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dsDichVu",
      key: "dsDichVu",
      render: (item, list, index) => {
        if (listAllDVXetNghiem?.length) {
          let list =
            item
              ?.map((el, index) => {
                let x = listAllDVXetNghiem.find(
                  (dv) => dv.dichVu?.id === el?.id
                );
                return x?.dichVu?.ten || "";
              })
              .filter((item) => item) ?? [];
          return list.join(", ");
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={onSearchInput("active")}
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
  ];
  const onRow = (record) => ({
    onClick: () => {
      props.onRow(record);
      setDataEditDefault(record);
    },
  });
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  return (
    <div>
      <TableWrapper
        title="Danh mục mẫu kết quả xét nghiệm"
        buttonHeader={props.buttonHeader}
        columns={columns}
        classNameRow={classNameRow}
        styleMain={styleMain}
        styleContainerButtonHeader={styleContainerButtonHeader}
        dataSource={data}
        onRow={onRow}
        rowClassName={setRowClassName}
      ></TableWrapper>
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={data}
          total={totalElements}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    mauKetQuaXN: {
      listData,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSortColumn,
    },
    dichVuKyThuat: { listAllDVXetNghiem = [] },
  } = state;

  return {
    listAllDVXetNghiem,
    listData,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSortColumn,
  };
};
const mapDispatchToProps = ({
  mauKetQuaXN: {
    onSearch,
    createOrEdit,
    updateData,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
  },
  mauKetQuaXN: { getAll: getAllMauKetQuaXN },
  dichVuKyThuat: { getAll: getAllDichVuXN },
}) => ({
  onSearch,
  createOrEdit,
  updateData,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getAllDichVuXN,
  getAllMauKetQuaXN,
});

export default connect(mapStateToProps, mapDispatchToProps)(MauKetQua);
