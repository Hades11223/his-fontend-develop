import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { TableWrapper, Pagination } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Main } from "./styled";
import { SORT_DEFAULT } from "./configs";
import { Input } from "antd";
import Checkbox from "components/Checkbox";
import Select from "components/Select";
import { HIEU_LUC } from "constants/index";

const Kho = (props) => {
  const {
    totalElements,
    listloaiDichVuKho,
    listCoCheDuyetPhat,
    listCoCheDuTru,
    listGiuTonKhaDung,
    listKhoa,
    classNameRow,
    styleMain,
    styleContainerButtonHeader,

    layerId,
    currentItem,
  } = props;

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [dataSortColumn, setDataSortColumn] = useState({
    active: 2,
    createdAt: 2,
  });

  const refSelectRow = useRef();
  const refAutoFocus = useRef(null);
  const { onRegisterHotkey } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    props.onSizeChange({ size: 10 });
    props.getUtils({ name: "loaiDichVuKho" });
    props.getUtils({ name: "CoCheDuyetPhat" });
    props.getUtils({ name: "CoCheDuTru" });
    props.getUtils({ name: "GiuTonKhaDung" });
    props.getListKhoa({});

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

  refSelectRow.current = (index) => {
    const { listData } = props;
    const indexNextItem =
      (listData?.findIndex((item) => item.id === currentItem?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < listData.length) {
      props.updateData({
        currentItem: listData[indexNextItem],
      });
      setTimeout(() => {
        document
          .getElementsByClassName("row-id-" + listData[indexNextItem]?.id)[0]
          .scrollIntoView({ block: "end", behavior: "smooth" });
      }, 1);
    }
  };
  console.log("render");
  const YES_NO = [
    { id: "", ten: "T???t c???" },
    { id: true, ten: "C??" },
    { id: false, ten: "Kh??ng" },
  ];
  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    props.onChangeInputSearch({
      [key]: value,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: 0,
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? Kho"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma}
          search={
            <Input placeholder="T??m ki???m" onChange={onSearchInput("ma")} />
          }
        />
      ),
      width: 120,
      dataIndex: "ma",
      key: 1,
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??n kho"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten}
          search={
            <Input placeholder="T??m ki???m" onChange={onSearchInput("ten")} />
          }
        />
      ),
      width: 200,
      dataIndex: "ten",
      key: 2,
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Lo???i kho"
          sort_key="dsLoaiDichVu"
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...(listloaiDichVuKho || [])]}
              defaultValue=""
              placeholder="Ch???n lo???i kho"
              onChange={onSearchInput("dsLoaiDichVu")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsLoaiDichVu",
      key: 3,
      render: (item, list, index) => {
        if (props.listloaiDichVuKho?.length) {
          let list =
            item
              ?.map((loai, index) => {
                let x = props.listloaiDichVuKho.find(
                  (item2) => item2.id === loai
                );
                return x?.ten || "";
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
          title="Khoa qu???n l??"
          sort_key="khoaQuanLyId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaQuanLyId}
          searchSelect={
            <Select
              data={listKhoa}
              placeholder="Ch???n khoa"
              onChange={onSearchInput("khoaQuanLyId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "khoaQuanLyId",
      key: 4,
      render: (item, list, index) => {
        if (props.listKhoa?.length) {
          return props.listKhoa.find((x) => x.id === item)?.ten || "";
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh???p t??? NCC"
          sort_key="nhapTuNcc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhapTuNcc}
          searchSelect={
            <Select
              data={YES_NO}
              placeholder="Nh???p t??? NCC"
              onChange={onSearchInput("nhapTuNcc")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhapTuNcc",
      key: 5,
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh?? thu???c"
          sort_key="nhaThuoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nhaThuoc}
          searchSelect={
            <Select
              data={YES_NO}
              placeholder="Nh?? thu???c"
              onChange={onSearchInput("nhaThuoc")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaThuoc",
      key: 6,
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Kh??ng s??? d???ng"
          sort_key="khongSuDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khongSuDung}
          searchSelect={
            <Select
              data={YES_NO}
              placeholder="Kh??ng s??? d???ng"
              onChange={onSearchInput("khongSuDung")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "khongSuDung",
      key: 7,
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="C?? hi???u l???c"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="C?? hi???u l???c"
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "active",
      key: 8,
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="C?? ch??? Duy???t /Ph??t"
          sort_key="dsCoCheDuyetPhat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsCoCheDuyetPhat}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...(listCoCheDuyetPhat || [])]}
              defaultValue=""
              placeholder="Ch???n lo???i ?? ch??? Duy???t /Ph??t"
              onChange={onSearchInput("dsCoCheDuyetPhat")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsCoCheDuyetPhat",
      key: 9,
      render: (item, list, index) => {
        if (props.listCoCheDuyetPhat?.length) {
          let list =
            item
              ?.map((loai, index) => {
                let x = props.listCoCheDuyetPhat.find(
                  (item2) => item2.id === loai
                );
                return x?.ten || "";
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
          title="C?? ch??? d??? tr??/L??nh b??"
          sort_key="dsCoCheDuTru"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsCoCheDuTru}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...(listCoCheDuTru || [])]}
              defaultValue=""
              placeholder="Ch???n lo???i c?? ch??? d??? tr??/L??nh b??"
              onChange={onSearchInput("dsCoCheDuTru")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsCoCheDuTru",
      key: 10,
      render: (item, list, index) => {
        if (props.listCoCheDuTru?.length) {
          let list =
            item
              ?.map((loai, index) => {
                let x = props.listCoCheDuTru.find((item2) => item2.id === loai);
                return x?.ten || "";
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
          title="Gi??? ch??? ngay khi k??"
          sort_key="dsGiuTonKhaDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsGiuTonKhaDung}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...(listGiuTonKhaDung || [])]}
              defaultValue=""
              placeholder="Ch???n gi??? ch??? ngay khi k??"
              onChange={onSearchInput("dsGiuTonKhaDung")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsGiuTonKhaDung",
      key: 11,
      render: (item, list, index) => {
        if (props.listGiuTonKhaDung?.length) {
          let list =
            item
              ?.map((loai, index) => {
                let x = props.listGiuTonKhaDung.find(
                  (item2) => item2.id === loai
                );
                return x?.ten || "";
              })
              .filter((item) => item) ?? [];
          return list.join(", ");
        }
        return "";
      },
    },
  ];

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size });
  };

  const onShowAndHandleUpdate = (data = {}) => {
    props.updateData({
      currentItem: { ...data },
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
      },
    };
  };

  const setRowClassName = (record) => {
    let idDiff = currentItem?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  return (
    <Main>
      <TableWrapper
        title={props.title}
        scroll={{ x: 1000 }}
        buttonHeader={props.buttonHeader || []}
        classNameRow={classNameRow}
        styleMain={styleMain}
        styleContainerButtonHeader={styleContainerButtonHeader}
        columns={columns.filter((item) => {
          return item.display !== false;
        })}
        dataSource={props.listData}
        onRow={onRow}
        rowKey={(record) => record?.id}
        rowClassName={setRowClassName}
      ></TableWrapper>

      {!!props.listData?.length && (
        <Pagination
          onChange={onChangePage}
          current={props.page + 1}
          pageSize={props.size}
          total={totalElements}
          listData={props.listData}
          onShowSizeChange={onSizeChange}
        />
      )}
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    kho: {
      listData,
      totalElements,
      page,
      size,
      dataSearch,
      dataSort,
      currentItem,
      dataSortColumn,
    },
    khoa: { listKhoa },
    utils: {
      listloaiDichVuKho = [],
      listCoCheDuyetPhat = [],
      listCoCheDuTru = [],
      listGiuTonKhaDung = [],
    },
  } = state;

  return {
    listData,
    listKhoa,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    listloaiDichVuKho,
    listCoCheDuyetPhat,
    listCoCheDuTru,
    listGiuTonKhaDung,
  };
};
const mapDispatchToProps = ({
  kho: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  khoa: { getListKhoa },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  getListKhoa,
});

export default connect(mapStateToProps, mapDispatchToProps)(Kho);
