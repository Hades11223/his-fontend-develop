import React from "react";
import { TableWrapper } from "components";
import Pagination from "components/Pagination";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { combineSort } from "../../../utils";
import utilColumns from "../../BaseDm/columns";

const ElementTable = ({
  updateData = () => {},
  /** gọi api lấy dữ liệu
   */
  getData = () => {},
  dataSearch = {}, // bắt buộc
  dataSort = {}, // bắt buộc

  totalElements,
  page,
  size,
  customOnSelectRow,
  layerId,
  layerIds,

  // các props header
  title,
  classNameHeader,
  buttonHeader,
  buttonLeft,
  styleContainerButtonHeader,

  // props table
  styleMain,
  scroll = {},
  rowClassName,
  roleSave,
  roleEdit,
  dataSource,
  rowKey,
  getColumns,
  dataEdit,
  other = {},
  titleMain = "",

  ...rest
}) => {
  const [state, _setState] = useState({});

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  // ------ phím tắt -------------
  const refClickBtnAdd = useRef();
  const refSelectRow = useRef();
  const { onRegisterHotkey, onRemoveLayer } = useDispatch().phimTat;
  const registerLayer = (_layerId) => {
    onRegisterHotkey({
      layerId: _layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAdd.current && refClickBtnAdd.current();
          },
        },
        {
          keyCode: 38, //up
          onEvent: (e) => {
            if (e.target.nodeName !== "INPUT")
              refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            if (e.target.nodeName !== "INPUT")
              refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
  };
  // register layerId
  useEffect(() => {
    if (layerId) {
      registerLayer(layerId);
    }
    if (layerIds) {
      for (let i = 0; i < layerIds.length; i++) {
        registerLayer(layerIds[i]);
      }
    }

    return () => {
      if (layerId) {
        onRemoveLayer({ layerId });
      }
      if (layerIds) {
        for (let i = 0; i < layerIds.length; i++) {
          onRemoveLayer({ layerId: layerIds[i] });
        }
      }
    };
  }, []);
  refSelectRow.current = (index) => {
    const indexNextItem =
      (dataSource?.findIndex((item) => item.id === dataEdit?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < dataSource.length) {
      if (onRow(dataSource[indexNextItem])?.onClick)
        onRow(dataSource[indexNextItem]).onClick();
      document
        .getElementsByClassName(
          `row-id-${layerId}_${dataSource[indexNextItem]?.id}`
        )[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };
  refClickBtnAdd.current =
    (buttonHeader || []).find((item) => item.type === "create")?.onClick ||
    (() => {});
  // -------

  //   refClickBtnSave.current = (e) => {
  //     const { activeKeyTab } = state;

  //     const _hotkey = hotKeys.find(
  //       (hotkey) =>
  //         hotkey.layerId === refLayerHotKey.current[state.activeKeyTab] &&
  //         hotkey.keyCode === 115
  //     );

  //     if (_hotkey && _hotkey.onEvent) {
  //       _hotkey.onEvent();
  //     }
  //   };

  const handleClickedBtnAdded = () => {
    // setState({
    //   mauBaoCao: null,
    //   defaultFileList: [],
    //   invalidMauBaoCao: false,
    // });
    // const _hotkey = hotKeys.find(
    //   (hotkey) =>
    //     hotkey.layerId === refLayerHotKey.current[state.activeKeyTab] &&
    //     hotkey.keyCode === 112
    // );
    // if (_hotkey && _hotkey.onEvent) {
    //   _hotkey.onEvent();
    // }
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const _onSelectColumn = (_dataEdit) => {
    updateData({ _dataEdit });
  };
  const handleShowRow = customOnSelectRow
    ? customOnSelectRow({ callback: _onSelectColumn })
    : _onSelectColumn;

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        handleShowRow(record);
      },
    };
  };

  // sắp xếp bản ghi
  const onClickSort = (key, value) => {
    updateData({
      _dataSort: {
        ...dataSort,
        [key]: value,
      },
    });
    const sort = { ...dataSort, [key]: value };
    delete sort.createdAt;
    const res = combineSort(sort);
    getData({
      ...dataSearch,
      page: 0,
      size,
      sort: res,
    });
  };

  // xử lý tìm kiếm bảng
  const refTimeOut = useRef(null);
  const onSearchInput2 = (e, key) => {
    onSearchInput(key)(e);
  };
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
        getData({
          ...dataSearch,
          page: 0,
          [key]: value,
        });
      },
      500,
      key,
      e?.target
    );
  };

  const handleChangePage = (page) => {
    getData({ ...dataSearch, page: page - 1 });
  };

  const handleChangeSize = (size) => {
    getData({ ...dataSort, page: 0, size });
  };

  const classNameCustom =
    rowClassName ||
    ((record) => {
      return record.id === dataEdit?.id
        ? `row-actived row-id-${layerId}_${record.id}`
        : `row-id-${layerId}_${record.id}`;
    });

  return (
    <>
      <TableWrapper
        layerId={layerId}
        classNameRow={classNameHeader}
        title={title}
        scroll={scroll || { x: 1000 }}
        buttonHeader={buttonHeader}
        columns={getColumns({
          onClickSort,
          onSearchInput,
          dataSort,
          page,
          size,
          baseColumns: utilColumns({
            onClickSort,
            dataSortColumn: dataSort,
            onSearchInput,
            page,
            size,
            titleMain,
          }),
          ...other,
        })}
        dataSource={dataSource}
        onRow={onRow}
        rowClassName={classNameCustom}
      />
      {totalElements ? (
        <Pagination
          listData={dataSource}
          onChange={handleChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleChangeSize}
          style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}
          className="dm-footer-table"
        />
      ) : null}
    </>
  );
};
export default ElementTable;
