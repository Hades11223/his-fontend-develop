import React, {
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Main } from "./styled";
import { Table, Button as AntButton, Row, Tooltip, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./styled.css";
import ModalCustomizeColumn from "./ModalCustomizeColumn";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";
import { Button, Select, InputTimeout, DatePicker } from "components";
import ModalImport from "./ModalImport";
import { useTranslation } from "react-i18next";
import HeaderSearch from "./headerSearch";
import moment from "moment";

const TableWrapper = forwardRef(
  (
    {
      title,
      buttonHeader,
      buttonLeft,
      scroll = {},
      styleMain,
      classNameRow = "",
      styleContainerButtonHeader,
      rowClassName,
      dataSource = [],
      onRow = () => {},
      layerId,
      dataEditDefault,
      rowKey,
      showHeaderTable = true,
      headerMinHeight,
      tableName,
      isImport,
      onImport,
      onExport,
      styleWrap,
      maxheight,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();
    const refClickBtnAdd = useRef();
    const refSelectRow = useRef();
    const refModalImport = useRef(null);
    const { onRegisterHotkey } = useDispatch().phimTat;
    const { auth } = useSelector((state) => state.auth);
    const classNameCustom =
      rowClassName ||
      ((record, index) => {
        return record.id === dataEditDefault?.id
          ? `row-actived row-id-${layerId}_${record.id}`
          : `row-id-${layerId}_${record.id}`;
      });

    // register layerId
    const refCustomizeColumn = useRef(null);
    const [state, _setState] = useState({ load: false });
    const setState = (data) => {
      _setState((state) => {
        return { ...state, ...data };
      });
    };
    useImperativeHandle(ref, () => ({
      settings: () => {
        // console.log(state);
        refCustomizeColumn.current &&
          refCustomizeColumn.current.show("", () => {
            cacheUtils
              .read(
                auth.nhanVienId,
                "DATA_CUSTOMIZE_COLUMN_" + tableName,
                [],
                false
              )
              .then((s) => {
                setState({ columnsCacheCustomize: s });
              });
          });
      },
    }));

    const customColumnProp = useMemo(() => {
      // console.log(props);
      return props.columns?.map((i) => ({
        ...i,
        columnName: i?.i18Name ? t(i.i18Name) : i?.columnName,
      }));
    }, [props.columns]);

    const columns = useMemo(() => {
      let listShow = state?.columnsCacheCustomize
        ?.filter((item) => item.show)
        ?.map((item1) => item1.i18Name || item1.columnName);
      let columns = customColumnProp?.map((item) => {
        return {
          ...item,
          index:
            item.dataIndex === "index"
              ? 0
              : state?.columnsCacheCustomize?.find(
                  (item1) => item1.columnName === item.columnName
                )?.index,
        };
      });
      let dataColumns = (columns || []).filter(
        (item) =>
          !item.hidden &&
          ((listShow?.length
            ? listShow.includes(item.i18Name || item.columnName)
            : item) ||
            item.show === undefined)
      );

      return orderBy(dataColumns, "index", "asc");
    }, [props.columns, state.columnsCacheCustomize]);

    const columnsShow = useMemo(() => {
      let columns = (state.columnsCacheCustomize || []).map((item) => {
        return {
          ...item,
          index:
            item.dataIndex === "index" ? 0 : item?.show ? item?.index : null,
        };
      });
      let dataColumns = (columns || []).filter((item) => !item.hidden);

      return orderBy(dataColumns, "index", "asc");
    }, [state.columnsCacheCustomize]);
    useEffect(() => {
      cacheUtils
        .read(auth.nhanVienId, "DATA_CUSTOMIZE_COLUMN_" + tableName, [], false)
        .then((s) => {
          setState({ columnsCacheCustomize: s?.length ? s : customColumnProp });
        });
    }, [tableName]);
    useEffect(() => {
      if (layerId)
        onRegisterHotkey({
          layerId,
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
                console.log("down......", e.target?.nodeName);
                if (e.target?.nodeName !== "INPUT")
                  refSelectRow.current && refSelectRow.current(1);
              },
            },
          ],
        });
    }, []);
    refSelectRow.current = (index) => {
      const indexNextItem =
        (dataSource?.findIndex((item) => item.id === dataEditDefault?.id) ||
          0) + index;
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

    const dataSourceX = useMemo(() => {
      return (dataSource || []).map((item, index) => {
        if (!item.key) {
          item.key = "key" + index;
        }
        return item;
      });
    }, [dataSource]);
    const defaultOnRow = () => {};

    const _onExport = () => {
      if (onExport) {
        setState({ exportLoading: true });
        onExport().finally(() => setState({ exportLoading: false }));
      }
    };

    return (
      <Main
        className="main-table-wrapper"
        style={styleWrap}
        headerminheight={headerMinHeight}
        maxheight={maxheight && scroll.y ? scroll.y : null}
      >
        {showHeaderTable && (
          <Row className={`home-table-warrper ${classNameRow}`}>
            <div className="home-title">{!!title && title}</div>
            <div
              className={`${
                ((buttonHeader || []).some((item) => !!item.content) &&
                  "buttonHeader") ||
                ""
              } header-button`}
            >
              {onExport && (
                <Button
                  type="default"
                  classNameCustom="button-import"
                  onClick={_onExport}
                  height={35}
                  loading={state.exportLoading}
                >
                  {t("common.xuatDuLieu")}
                </Button>
              )}
              {(isImport || onImport) && (
                <Button
                  type="default"
                  classNameCustom="button-import"
                  onClick={() => {
                    refModalImport.current &&
                      refModalImport.current.show(
                        { isModalVisible: true },
                        ({ value }) => {
                          //submit
                          console.log("value: ", value);
                        }
                      );
                  }}
                  height={35}
                >
                  {t("common.import")}
                </Button>
              )}
              {buttonHeader &&
                !!buttonHeader.length &&
                buttonHeader.map((item, index) => {
                  let textTooltip = "";
                  if (
                    item.className &&
                    item.className.includes(`btn-change-full-table`)
                  ) {
                    if (item.className.includes("large")) {
                      textTooltip = "Mở rộng";
                    } else {
                      textTooltip = "Thu nhỏ";
                    }
                  } else if (
                    item.className &&
                    item.className.includes("btn-collapse")
                  ) {
                    textTooltip = "Thu gọn";
                  }
                  // let Wrapper = (item.className && item.className.includes(`btn-change-full-table`) && Tooltip ) || React.Fragment
                  if (item.content) {
                    return (
                      <React.Fragment key={index}>
                        {item.content}
                      </React.Fragment>
                    );
                  } else {
                    return (
                      <Tooltip title={textTooltip} key={index}>
                        <AntButton
                          className={item.className || "button-header"}
                          onClick={item.onClick}
                        >
                          {item.title}
                          {item?.buttonHeaderIcon}
                        </AntButton>
                      </Tooltip>
                    );
                  }
                })}
            </div>
            <div className="button-left">
              {buttonLeft &&
                buttonLeft.length &&
                buttonLeft.map((item, index) => {
                  return (
                    <AntButton
                      className={`item button-header `}
                      onClick={item.onClick}
                      key={index}
                    >
                      {item.title}
                      <img
                        src={require("assets/images/template/icImport.png")}
                        alt=""
                      />
                    </AntButton>
                  );
                })}
            </div>
          </Row>
        )}
        <div
          className="main__container"
          style={styleMain ? styleMain : undefined}
        >
          <Table
            {...props}
            columns={columns}
            dataSource={dataSourceX}
            onRow={onRow || defaultOnRow}
            rowClassName={classNameCustom}
            pagination={false}
            bordered
            scroll={{ y: scroll.y || 370, x: scroll.x || 500 }}
            rowKey={rowKey ? rowKey : (item) => item.key}
          />
        </div>
        <ModalCustomizeColumn
          columns={columnsShow.filter((item) => item.columnName)}
          columnsDefault={customColumnProp?.filter((item) => item.columnName)}
          tableName={tableName}
          ref={refCustomizeColumn}
        />
        <ModalImport onImport={onImport} ref={refModalImport} />
      </Main>
    );
  }
);
TableWrapper.Column = ({
  title,
  sort_key,
  dataSort,
  onClickSort,
  width = "100px",
  dataIndex,
  key,
  i18Name,
  show = true,
  ignore = false,
  render,
  selectSearch = false,
  renderSearch,
  ...params
}) => {
  const defaultRender = (value, record, index) => {
    return <div>{value}</div>;
  };
  return {
    title: (
      <HeaderSearch
        title={title}
        sort_key={sort_key}
        dataSort={dataSort}
        onClickSort={onClickSort}
        search={selectSearch ? null : renderSearch}
        searchSelect={selectSearch ? renderSearch : null}
      />
    ),
    width: width,
    dataIndex: dataIndex,
    key: key,
    // columnName: "Khoa đang điều trị",
    i18Name: i18Name,
    show: !ignore ? show : undefined,
    render: render || defaultRender,
    ...params,
  };
};

TableWrapper.ColumnDm = ({ dataSortColumn, ...props }) => {
  const sort_key = props.sort_key || props.dataIndex;
  const dataSort = props.dataSort || dataSortColumn[sort_key];
  const key = props.key || props.dataIndex;

  return TableWrapper.Column({ ...props, key, dataSort, sort_key });
};

TableWrapper.ColumnSelect = ({
  onSearchInput,
  dataSelect,
  dataIndex,
  searchKey = dataIndex,
  render,
  ...props
}) => {
  const renderSearch = (
    <Select
      placeholder={"Tìm kiếm"}
      data={dataSelect}
      onChange={onSearchInput(searchKey)}
    />
  );

  const _render = render
    ? render
    : (item) => dataSelect.find((i) => i.id === item)?.ten || "";

  return TableWrapper.ColumnDm({
    ...props,
    dataIndex,
    renderSearch,
    selectSearch: true,
    render: _render,
  });
};

TableWrapper.ColumnCheckbox = ({
  onSearchInput,
  textSearch = [],
  dataIndex,
  searchKey = dataIndex,
  onClick = () => {},
  ...props
}) => {
  const renderSearch = (
    <Select
      placeholder="Tìm kiếm"
      data={[
        {
          id: "",
          ten: "Tất cả",
        },
        {
          id: true,
          ten: textSearch[0] || "Có",
        },
        {
          id: false,
          ten: textSearch[1] || "Không ",
        },
      ]}
      onChange={onSearchInput(searchKey)}
    />
  );

  const render = (item) => (
    <Checkbox checked={item} onClick={onClick(item)}></Checkbox>
  );

  return TableWrapper.ColumnDm({
    ...props,
    dataIndex,
    selectSearch: true,
    renderSearch,
    align: "center",
    render,
  });
};

TableWrapper.ColumnInput = ({
  onSearchInput,
  textSearch = [],
  dataIndex,
  searchKey = dataIndex,
  onClick = () => {},
  formatPrice,
  type,
  render,
  ...props
}) => {
  const renderSearch = (
    <InputTimeout
      placeholder="Tìm kiếm"
      onChange={onSearchInput(searchKey)}
      type={type}
      {...(formatPrice ? { formatPrice: true, type: "number" } : {})}
    />
  );

  const _render = render
    ? render
    : formatPrice
    ? (item) => (item ? (item + "").formatPrice() : "")
    : undefined;

  return TableWrapper.ColumnDm({
    ...props,
    dataIndex,
    // selectSearch: true,
    renderSearch,
    align: "center",
    render: _render,
  });
};

TableWrapper.ColumnDate = ({
  onSearchInput,
  textSearch = [],
  dataIndex,
  searchKey = dataIndex,
  onClick = () => {},
  format = "DD/MM/YYYY",
  ...props
}) => {
  const renderSearch = (
    <DatePicker
      format={format}
      placeholder="Chọn ngày"
      onChange={(value) =>
        onSearchInput(searchKey)(value ? value.format("YYYY-MM-DD") : null)
      }
    />
  );

  const _render = (value) => (value ? moment(value)?.format(format) : "");

  return TableWrapper.ColumnDm({
    ...props,
    dataIndex,
    selectSearch: true,
    renderSearch,
    align: "center",
    render: _render,
  });
};

export default TableWrapper;
