import React, { useState, useMemo } from "react";
import T from "prop-types";
import { Main, MainPagination, PopoverVersion2 } from "./styled";
import { Select, Button, Popover, Tooltip } from "antd";
import IcSetting from "assets/svg/ic-setting.svg";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

const { Option, OptGroup } = Select;
const AppPagination = (props) => {
  const {
    current,
    total,
    onChange = () => {},
    pageSizeOptions,
    onShowSizeChange = () => {},
    pageSize = 10,
    defaultPageSize,
    styleVersion = 1,
    className = "",
    listData = [],
  } = props;
  const [pageInput, setPageInput] = useState(1);
  const [state, _setState] = useState({ size: 10 });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  // let currentPage = current * pageSize;
  // currentPage = Math.min(currentPage, total);
  let totalPage = parseInt(total / pageSize);
  if (totalPage * pageSize < total) totalPage += 1;
  if (current !== pageInput) {
    setPageInput(current);
  }
  const selectItem = (item) => () => {
    onShowSizeChange(item);
    setState({
      size: item,
    });
  };
  const styleOptions = {
    display: "block",
    fontSize: 15,
    cursor: "pointer",
  };
  const onChangePage = (value) => {
    setPageInput(value);
    onChange(value);
  };
  let countStart = (current - 1) * pageSize + 1;
  let countEnd = useMemo(() => {
    if (listData?.length === pageSize) {
      return current * pageSize;
    } else {
      return pageSize * current + listData?.length - pageSize;
    }
  });
  const handleStyleVersion = () => {
    let jsx = <></>;
    switch (styleVersion) {
      case 2:
        jsx = (
          <div className="select-size">
            Số hàng hiển thị:
            <Select value={pageSize}>
              {(props.options || pageSizeOptions).map((item, key) => {
                return (
                  <Option key={key} value={+item}>
                    <span onClick={selectItem(+item)} style={styleOptions}>
                      {item}
                    </span>
                  </Option>
                );
              })}
            </Select>
            / {total}
          </div>
        );

        break;
      default:
        jsx = (
          <div className="select-size flex">
            {countStart}-{countEnd} trên tổng {total}
            <Tooltip title="Số hàng hiển thị" placement="bottom">
              <PopoverVersion2>
                <Popover
                  getPopupContainer={(trigger) => trigger.parentNode}
                  overlayClassName={"popover-version2"}
                  content={() => {
                    return (props.options || pageSizeOptions).map(
                      (item, key) => {
                        return (
                          <span
                            key={key}
                            onClick={selectItem(+item)}
                            style={{
                              ...styleOptions,
                              background: state.size == item ? "#EBECF0" : "",
                            }}
                          >
                            {item} hàng
                          </span>
                        );
                      }
                    );
                  }}
                  title={
                    <div
                      style={{
                        fontSize: 14,
                        fontStyle: "normal",
                        fontWeight: 700,
                      }}
                    >
                      Số hàng hiển thị
                    </div>
                  }
                  trigger="click"
                >
                  <IcSetting className="ic-setting" />
                </Popover>
              </PopoverVersion2>
            </Tooltip>
          </div>
        );
        break;
    }
    return jsx;
  };
  return (
    <MainPagination
      style={props.stylePagination}
      className={`pagination style-version${styleVersion} ${className}`}
    >
      <div className="pagination-current">
        <Button
          className="current-page"
          onClick={() => {
            onChangePage(1);
          }}
          disabled={current === 1}
        >
          <DoubleLeftOutlined fill={current === 1 ? "#c4c4c4" : "black"} />
        </Button>
        <Main
          current={current}
          className="patient-paging"
          pageSize={pageSize}
          defaultPageSize={defaultPageSize}
          pageSizeOptions={pageSizeOptions}
          total={total}
          onChange={onChange}
          showLessItems={true}
        />
        <Button
          className="current-page"
          onClick={() => {
            onChangePage(totalPage);
          }}
          disabled={current >= totalPage}
        >
          <DoubleRightOutlined
            fill={current >= totalPage ? "#c4c4c4" : "black"}
          />
        </Button>
      </div>
      {handleStyleVersion()}
    </MainPagination>
  );
};

AppPagination.defaultProps = {
  pageSizeOptions: ["10", "20", "50", "100"],
};

AppPagination.propTypes = {
  pageSizeOptions: T.array,
};

export default AppPagination;
