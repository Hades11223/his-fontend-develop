import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import Select from "components/Select";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TabPanel from "components/MultiLevelTab/TabPanel";
import Pagination from "components/Pagination";
import DeleteIcon from "assets/svg/kho/delete.svg";
import { ModalNotification2 } from "components/ModalConfirm";
import { useStore } from "hook";

const NhanVienQuanLy = ({ khoId, ...props }) => {
  const refModalConfirm = useRef(null);
  const [state, _setState] = useState({
    viewStatus: true,
  });

  const {
    nhanVienKho: {
      createMultiple,
      onSearch: onSearchNhanVienKho,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
      deleteNhanVienKho,
    },
    nhanVien: { getListAllNhanVien },
  } = useDispatch();

  const listData = useStore("nhanVienKho.listData", []);
  const page = useStore("nhanVienKho.page", 0);
  const size = useStore("nhanVienKho.size", 0);
  const totalElements = useStore("nhanVienKho.totalElements", 0);
  const listAllNhanVien = useStore("nhanVien.listAllNhanVien", []);

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const handleClickedBtnAdded = () => {
    if (khoId) {
      let ds = state.listNhanVienKho || [];
      let currentItem = {
        index: 0,
        nhanVienId: null,
        dsNhanVienId: [],
        dsTenNhanVien: [],
        dsMaNhanVien: [],
        khoId,
        nhanVien: {},
        kho: {},
      };
      ds = [currentItem, ...ds].map((item, index) => ({ ...item }));
      setState({
        viewStatus: false,
        currentIndex: currentItem.index,
        currentItem,
        listNhanVienKho: [...ds],
      });
    }
  };

  const listNhanVien = useMemo(() => {
    return (listAllNhanVien || []).map((item) => ({
      id: item?.id,
      ten: item?.ma,
    }));
  }, [listAllNhanVien]);
  const onChange = (key, index) => (e) => {
    const value = e.target ? e.target?.value : e;
    let item = state.listNhanVienKho?.find((x) => x?.index == index);
    if (key == "nhanVien") {
      let dsNhanVienId = [...(value || [])];
      item = { ...item, dsNhanVienId };
    }

    state.listNhanVienKho[state.currentIndex] = { ...item };
    setState({ listNhanVienKho: [...state.listNhanVienKho] });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        setState({
          currentItem: JSON.parse(JSON.stringify(record)),
          currentIndex: index,
          pressedRow: true,
        });
      },
    };
  };
  console.log();
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    onChangeInputSearch({
      [key]: value,
      khoId,
    });
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const onChangePage = (page) => {
    setState({ currentIndex: null, viewStatus: true });
    onSearchNhanVienKho({ page: page - 1 });
  };

  const onChangeSize = (size) => {
    setState({ currentIndex: null, viewStatus: true });
    onSizeChange({ size: size });
  };

  const handleData = () => {
    let ds = state.listNhanVienKho?.reduce((acc, item, index) => {
      const dsTaiKhoan = listAllNhanVien?.filter((x) =>
        item?.dsNhanVienId?.includes(x?.id)
      );
      let newItem = {
        ...item,
        dsTenNhanVien: dsTaiKhoan?.map((x) => x?.ten) || [],
        dsMaNhanVien: dsTaiKhoan?.map((x) => x?.ma) || [],
      };
      return [...acc, newItem];
    }, []);
    return ds;
  };

  const onOk = (isOk) => {
    if (isOk) {
      let currentItem = state.listNhanVienKho[state.currentIndex];
      let payload = (currentItem?.dsNhanVienId || []).map((item) => {
        return {
          nhanVienId: item,
          khoId: currentItem.khoId,
        };
      });
      if (currentItem?.id) {
        payload = {
          ...payload,
          id: currentItem?.id,
        };
      } else {
        createMultiple(payload)
          .then((s) => {})
          .catch((e) => {})
          .finally(() => {
            setState({
              viewStatus: true,
              currentIndex: null,
              currentItem: null,
            });
          });
      }
    } else {
      setState({
        viewStatus: true,
        currentIndex: null,
        currentItem: null,
        listNhanVienKho: state.listNhanVienKho?.filter((x) => x.id),
      });
    }
  };

  const showModaConfirmRemove = (item) => () => {
    refModalConfirm &&
      refModalConfirm.current &&
      refModalConfirm.current.show(
        {
          title: "",
          content: `Xác nhận xóa nhân viên ${item?.nhanVien?.ten}?`,
          cancelText: "Huỷ",
          okText: "Đồng ý",
          showBtnOk: true,
        },
        () => {
          deleteNhanVienKho({ id: item?.id })
            .then((s) => {})
            .catch((e) => {});
        },
        () => {}
      );
  };

  useEffect(() => {
    setState({
      listNhanVienKho: listData?.map((x) => ({
        ...x,
        dsNhanVienId: [x?.nhanVienId],
      })),
    });
  }, [listData]);

  useEffect(() => {
    khoId && onSearchNhanVienKho({ page: 0, size: 10, dataSearch: { khoId } });
  }, [khoId]);

  useEffect(() => {
    getListAllNhanVien({ page: "", size: "", active: true });
  }, []);

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 20,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (record, __, index) =>
        record ? `${Number.parseInt(record)}` : "",
    },
    {
      title: (
        <HeaderSearch
          title="Mã nhân viên"
          onClickSort={onClickSort}
          // dataSort={dataSortColumn["lieuDungId"] || 0}
          searchSelect={
            <Select
              data={listNhanVien}
              placeholder="Chọn tài khoản"
              onChange={onSearchInput("nhanVienId")}
              ten="ma"
            />
          }
        />
      ),
      width: 40,
      dataIndex: "dsMaNhanVien",
      key: "dsMaNhanVien",
      align: "left",
      render: (record, item, index) => {
        if (state.currentIndex === index) {
          return (
            <Select
              id="nhanVienId"
              ten="taiKhoan"
              mode="multiple"
              value={item?.dsNhanVienId}
              data={listNhanVien}
              placeholder="Chọn tài khoản"
              onChange={onChange("nhanVien", index)}
            />
          );
        } else {
          return (record || []).join(",");
        }
      },
    },
    {
      title: (
        <HeaderSearch
          title="Họ và tên"
          onClickSort={onClickSort}
          searchSelect={
            <Select
              data={listAllNhanVien}
              placeholder="Chọn họ và tên nhân viên"
              onChange={onSearchInput("nhanVienId")}
            />
          }
        />
      ),
      width: 60,
      dataIndex: "dsTenNhanVien",
      key: "dsTenNhanVien",
      align: "left",
      render: (record, item, index) => (record || []).join(","),
    },
    {
      title: (
        <HeaderSearch
          title="Action"
          // dataSort={dataSortColumn["active"] || 0}
        />
      ),
      width: 20,
      dataIndex: "index",
      key: "action",
      align: "center",
      render: (record, item, index) => {
        return record ? (
          <DeleteIcon onClick={showModaConfirmRemove(item)} />
        ) : (
          ""
        );
      },
    },
  ];

  return (
    <TabPanel>
      <EditWrapper
        title="Nhân viên quản lý"
        onCancel={() => {
          onOk(false);
        }}
        onSave={() => {
          onOk(true);
        }}
        onAddNewRow={handleClickedBtnAdded}
        isShowSaveButton={state.currentItem}
        isShowCancelButton={state.currentItem}
        showAdded={true}
      >
        <TableWrapper
          columns={columns}
          dataSource={handleData()}
          onRow={onRow}
          rowKey={(record) => record?.id}
        />
        {totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            listData={handleData()}
            total={totalElements}
            onShowSizeChange={onChangeSize}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : null}
      </EditWrapper>
      <ModalNotification2 ref={refModalConfirm} />
    </TabPanel>
  );
};

export default NhanVienQuanLy;
