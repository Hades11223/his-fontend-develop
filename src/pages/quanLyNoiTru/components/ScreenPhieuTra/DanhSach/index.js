import { Checkbox, Tooltip } from "antd";
import {
  DatePicker,
  HeaderSearch,
  InputTimeout,
  Select,
  TableWrapper,
} from "components";
import Pagination from "components/Pagination";
import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useTranslation } from "react-i18next";
import Button from "pages/kho/components/Button";
import IcSend from "assets/images/kho/ic-send.svg";
import IcPrint from "assets/svg/ic-print.svg";
import IcDelete from "assets/svg/ic-delete.svg";
import moment from "moment";
import { WrapperPopup } from "../styled";

const DanhSach = (
  {
    buttonBottom,
    onRow,
    renderColumns = () => [],
    getDanhSach = () => {},
    dataSource = [],
    totalElements,
    tableName,

    // initState
    initParam = {
      page: 0,
      size: 10,
    },
  },
  ref
) => {
  const [state, _setState] = useState({
    dataSortColumn: {},
    listCheckId: [],
    param: initParam,
  });

  useImperativeHandle(ref, () => ({
    search: (data) => {
      onSearchInput(data);
    },
  }));

  const { dataSortColumn } = state;

  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const { t } = useTranslation();

  const refSettings = useRef(null);

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    setState({ dataSortColumn: sort });
  };

  const onSearchInput = (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (e) => {
        const newParam = {
          ...state.param,
          page: 0,
          ...e,
        };
        setState({ param: newParam });
        getDanhSach(newParam);
      },
      500,
      e?.target || e
    );
  };

  const refTimeOut = useRef();
  const onSearchInputByKey = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, e) => {
        let value = e?.hasOwnProperty("_d")
          ? moment(e._d).format("YYYY-MM-DD")
          : e?.value == ""
          ? ""
          : e?.value
          ? e?.value
          : e;
        const newParam = {
          ...state.param,
          page: 0,
          [key]: value,
        };
        setState({ param: newParam });
        getDanhSach(newParam);
      },
      500,
      key,
      e?.target || e
    );
  };

  // useEffect(() => {
  //   getDanhSach(state.param);
  // }, []);

  const onChangePage = (page) => {
    const newParam = {
      ...state.param,
      page: page - 1,
    };
    setState({ param: newParam });
    getDanhSach(newParam);
  };

  const onSizeChange = (size) => {
    const newParam = {
      ...state.param,
      page: 0,
      size,
    };
    setState({ param: newParam });
    getDanhSach(newParam);
  };

  const onSettings = () => {
    refSettings && refSettings.current.settings();
  };

  const clickCheckbox = (id) => (e) => {
    if (e.target.checked) {
      setState({ listCheckId: [...state.listCheckId, id] });
    } else {
      setState({ listCheckId: state.listCheckId.filter((i) => i != id) });
    }
  };

  const onClickAll = (e) => {
    if (e.target.checked) {
      setState({ listCheckId: dataSource.map((i) => i.id) });
    } else {
      setState({ listCheckId: [] });
    }
  };

  const renderTitlePop = (item) => (
    <WrapperPopup>
      <div className="title-pop">
        {item?.ma} - {item?.ten}
      </div>
      <div className="pop-content">
        <div className="item-pop">Số lượng khả dụng: {item.soLuong}</div>
        <div className="item-pop">Đường dùng: {item.tenDuongDung}</div>
        <div className="item-pop">Số lượng còn lại: {item.soLuongYeuCau}</div>
        <div className="item-pop">Nhà sản xuất: {item.tenNhaSanXuat}</div>
        <div className="item-pop">Hàm lượng: {item.hamLuong}</div>
        <div className="item-pop">Quy cách: {"Không có"}</div>
        <div className="item-pop">Tên hoạt chất: {item.tenHoatChat}</div>
      </div>
    </WrapperPopup>
  );

  const renderCheckbox = (item) => (
    <Checkbox checked={item} onClick={clickCheckbox(item?.id)}></Checkbox>
  );

  //column
  const columns = {
    checked: {
      title: (
        <HeaderSearch
          title={
            <Checkbox
              checked={state.listCheckId?.length === dataSource.length}
              onClick={onClickAll}
            ></Checkbox>
          }
          //   sort_key="soPhieuLinh"
          //   onClickSort={onClickSort}
          //   dataSort={dataSortColumn.soPhieuLinh || 0}
          //   search={<Input placeholder="Tìm kiếm" />}
        />
      ),
      dataIndex: "id",
      width: "50px",
      align: "center",
      render: (item) => (
        <Checkbox
          checked={state.listCheckId.includes(item)}
          onClick={clickCheckbox(item)}
        ></Checkbox>
      ),
    },
    stt: {
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      width: "50px",
      align: "center",
      render: (_, __, index) => state.param.page * state.param.size + index + 1,
    },
    stt2: ({ width = 50 }) => ({
      title: <HeaderSearch title="STT" />,
      dataIndex: "index",
      width,
      align: "center",
      render: (_, __, index) => state.param.page * state.param.size + index + 1,
    }),
    inputTimeout: ({
      title,
      dataIndex,
      sortKey = dataIndex,
      hideSearch,
      searchKey = dataIndex,
      width = 100,
      align = "left",
      render,
    }) => ({
      title: (
        <HeaderSearch
          title={title}
          sort_key={sortKey}
          onClickSort={onClickSort}
          dataSort={dataSortColumn[sortKey] || 0}
          search={
            !hideSearch && (
              <InputTimeout
                placeholder="Tìm kiếm"
                onChange={onSearchInputByKey(searchKey)}
              />
            )
          }
        />
      ),
      width,
      align,
      dataIndex,
      columnName: title,
      key: dataIndex,
      show: true,
      type: true,
      render,
    }),
    date: ({
      title,
      dataIndex,
      sortKey = dataIndex,
      searchKey = dataIndex,
      hideSearch,
      width = 100,
      align = "left",
      format = "DD/MM/YYYY",
    }) => ({
      title: (
        <HeaderSearch
          title={title}
          sort_key={sortKey}
          onClickSort={onClickSort}
          dataSort={dataSortColumn[sortKey] || 0}
          searchDate={
            !hideSearch && (
              <DatePicker
                format={format}
                placeholder="Chọn ngày"
                onChange={onSearchInputByKey(searchKey)}
              />
            )
          }
        />
      ),
      width,
      align,
      dataIndex,
      key: dataIndex,
      columnName: title,
      show: true,
      render: (value, _, __) => (value ? moment(value)?.format(format) : ""),
    }),
    enum: ({
      listEnum,
      title,
      dataIndex,
      sortKey = dataIndex,
      searchKey = dataIndex,
      width = 100,
      align = "left",
    }) => ({
      title: (
        <HeaderSearch
          title={title}
          sort_key={sortKey}
          onClickSort={onClickSort}
          dataSort={dataSortColumn[sortKey] || 0}
          search={
            <InputTimeout
              placeholder="Tìm kiếm"
              onChange={onSearchInputByKey(searchKey)}
            />
          }
        />
      ),
      width,
      align,
      dataIndex,
      key: dataIndex,
      type: true,
      hideSearch: false,
      columnName: title,
      show: true,
      render: (item) => listEnum?.find((i) => i.id === item)?.ten,
    }),
    checkbox: ({
      title,
      dataIndex,
      width = 100,
      sortKey = dataIndex,
      searchKey = dataIndex,
      dataSearch = [],
      render,
    }) => ({
      title: (
        <HeaderSearch
          title={title}
          sort_key={sortKey}
          onClickSort={onClickSort}
          dataSort={dataSortColumn[sortKey] || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={[
                {
                  id: "",
                  ten: "Tất cả",
                },
                {
                  id: true,
                  ten: dataSearch[0] || "Đã " + title,
                },
                {
                  id: false,
                  ten: dataSearch[1] || "Chưa " + title,
                },
              ]}
              onChange={onSearchInputByKey(searchKey)}
            />
          }
        />
      ),
      dataIndex,
      key: dataIndex,
      width,
      align: "center",
      columnName: title,
      show: true,
      render: render ? render : renderCheckbox,
    }),
    select: ({
      title,
      dataIndex,
      width = 100,
      sortKey = dataIndex,
      searchKey = dataIndex,
      dataSearch = [],
      render,
    }) => ({
      title: (
        <HeaderSearch
          title={title}
          sort_key={sortKey}
          onClickSort={onClickSort}
          dataSort={dataSortColumn[sortKey] || 0}
          searchSelect={
            <Select
              placeholder={"Tìm kiếm"}
              data={dataSearch}
              onChange={onSearchInputByKey(searchKey)}
            />
          }
        />
      ),
      width,
      align: "center",
      dataIndex,
      key: dataIndex,
      columnName: title,
      show: true,
      render: render ? render : (item) => item,
    }),
    tenDichVu: ({
      title = "Tên dịch vụ",
      dataIndex = "ten",
      width = 300,
      dataSort = dataIndex,
      dataSearch = dataIndex,
    } = {}) => ({
      title: (
        <HeaderSearch
          title={title}
          sort_key={dataSort}
          onClickSort={onClickSort}
          dataSort={dataSortColumn[dataSort] || 0}
          search={
            <InputTimeout
              placeholder="Tìm kiếm theo tên hàng hóa"
              onChange={onSearchInputByKey(dataSearch)}
            />
          }
        />
      ),
      width,
      dataIndex,
      key: dataIndex,
      show: true,
      type: true,
      hideSearch: false,
      render: (value, item) => (
        <Tooltip
          overlayInnerStyle={{ width: 400 }}
          overlay={renderTitlePop(item)}
          color={"white"}
        >
          {value}
        </Tooltip>
      ),
    }),
  };

  return (
    <>
      <TableWrapper
        columns={renderColumns({
          columns,
          onSettings,
        })}
        dataSource={dataSource}
        onRow={onRow}
        rowKey={(record) => `${record.id}`}
        scroll={{ x: 1000 }}
        tableName={tableName}
        ref={refSettings}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={state.param.page + 1}
          pageSize={state.param.size}
          listData={dataSource}
          total={totalElements}
          onShowSizeChange={onSizeChange}
        />
      )}
      {buttonBottom && state.listCheckId.length > 0 && (
        <div className="button-action">
          <Button
            className="btn_new"
            rightIcon={<IcDelete className="red" />}
            iconHeight={20}
            // onClick={
            //   refTimKiemPhieuNhap.current &&
            //   refTimKiemPhieuNhap.current.onCreateNew
            // }
          >
            <span>Xóa phiếu</span>
          </Button>
          <Button
            className="btn_new"
            rightIcon={<IcPrint className="blue" />}
            iconHeight={20}
            // onClick={
            //   refTimKiemPhieuNhap.current &&
            //   refTimKiemPhieuNhap.current.onCreateNew
            // }
          >
            <span>In phiếu</span>
          </Button>
          <Button
            className="btn_new"
            type="primary"
            rightIcon={<IcSend />}
            iconHeight={20}
            // onClick={
            //   refTimKiemPhieuNhap.current &&
            //   refTimKiemPhieuNhap.current.onCreateNew
            // }
          >
            <span>Gửi duyệt</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default forwardRef(DanhSach);
