import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Input, Tooltip } from "antd";
import {
  Button,
  TableWrapper,
  Select,
  Pagination,
  HeaderSearch,
} from "components";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import {
  Main,
  PopoverStyled,
  GlobalStyle,
  WrapperInput,
  WrapperSelect,
} from "./styled";
import { debounce } from "lodash";
import { openInNewTab, sortString } from "utils";
import { useDispatch, useSelector } from "react-redux";
import PopoverThemThuocKeNgoai from "./PopoverThemThuocKeNgoai";
import { useTranslation } from "react-i18next";

const TableThuocKeNgoai = ({
  onSelectedNoPayment,
  loaiDonThuoc,
  visible,
  keyword,
  ...props
}) => {
  const { t } = useTranslation();
  const refInput = useRef(null);
  const { listThuocKeNgoai, page, size, totalElements, isLoading } =
    useSelector((state) => state.thuocKeNgoai);
  const { boChiDinh } = useSelector((state) => state.boChiDinh);
  const { listAllLieuDung } = useSelector((state) => state.lieuDung);

  const {
    thuocKeNgoai: { onSizeChange: onSizeChangeThuocKeNgoai },
  } = useDispatch();
  const listAllBoChiDinh = useMemo(() => {
    const listAllBoChiDinh = (boChiDinh?.data || []).map((item) => {
      item.id = item.dichVuId;
      return item;
    });
    return listAllBoChiDinh;
  }, [boChiDinh]);

  const [state, _setState] = useState(() => {
    let selectedRowKeysCustom = [];
    let listServiceSelectedCustom = [];
    return {
      isVisiblePopupThemThuoc: false,
      visiblePopupThemLieuDung: false,
      listServiceSelected: listServiceSelectedCustom, // listServiceSelectedCustom
      selectedRowKeys: selectedRowKeysCustom, //selectedRowKeysCustom
      keySelected: [],
      dataSelected: [],
    };
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (visible) {
      //khi bật lên thì mặc đinh reset popup
      setState({
        selectedRowKeys: [],
        listServiceSelected: [],
        dataSelected: [],
        keySelected: [],
        boChiDinhSelected: null,
      });
      // getDataThuoc();
    }
  }, [loaiDonThuoc, visible]); // khi thay đổi về visible hoặc loại đơn thuốc thì load lại bộ chỉ định, reset lại thông tin filter

  const getDataThuoc = (value = "", boChiDinhId = "", page = 0, size = 10) => {
    onSizeChangeThuocKeNgoai({
      page: page,
      size: size,
      ten: value,
      boChiDinhId,
      active: true,
      dataSortColumn: { ten: 1 },
      fromTongHop: true,
    });
  };

  const debounceFunc = useCallback(debounce(getDataThuoc, 500), []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        refInput.current && refInput.current.focus();
      }, 500);
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      debounceFunc(keyword, state.boChiDinhSelected?.id);
    }
  }, [keyword, visible, state.boChiDinhSelected]);

  const onSelectChangeLeft = (selectedRowKeys, data) => {
    setState({
      selectedRowKeys: selectedRowKeys,
      listServiceSelected: data,
      keySelected: selectedRowKeys,
      dataSelected: data,
    });
    onSelectedNoPayment(data);
  };
  const onSelectChangeRight = (selectedRowKeys, data) => {
    setState({
      listServiceSelected: data,
      keySelected: selectedRowKeys,
      dataSelected: data,
    });
    onSelectedNoPayment(data);
  };

  const onChangePage = (page) => {
    getDataThuoc(keyword, state.boChiDinhSelected?.id, page - 1, size);
  };
  const onSizeChange = (value) => {
    getDataThuoc(keyword, state.boChiDinhSelected?.id, 1, value);
  };

  const rowSelectionLeft = {
    columnTitle: <HeaderSearch title={t("common.chon")} />,
    columnWidth: 50,
    onChange: onSelectChangeLeft,
    selectedRowKeys: state.keySelected,
    preserveSelectedRowKeys: true,
  };
  const rowSelectionRight = {
    columnTitle: <HeaderSearch title={t("common.chon")} />,
    columnWidth: 50,
    onChange: onSelectChangeRight,
    selectedRowKeys: state.keySelected,
    preserveSelectedRowKeys: true,
  };

  const onChangeInput = (type, data) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e._d.format("MM/dd/yyyy");
    else value = e;
    state.dataSelected.map((item) => {
      if (item.id == data.id) {
        if (type === "soLuong" && Number(value) <= 0 && value) {
          item.soLuong = 0;
        } else {
          item[type] = value;
        }
      }
    });
    onSelectedNoPayment(state.dataSelected);
  };
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const columnsTableLeft = [
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={t("khamBenh.donThuoc.tenThuocHamLuong")}
        />
      ),
      dataIndex: "",
      key: "",
      width: "100%",
      render: (item, data) => {
        return `${data.ten} ${
          data.tenHoatChat ? " (" + data.tenHoatChat + ")" : " "
        } ${data.hamLuong ? " - " + data.hamLuong : ""}`;
      },
    },
  ];
  const columnsTableRight = [
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/thuoc")}
            >
              {t("khamBenh.donThuoc.tenThuocHamLuong")}
            </div>
          }
        />
      ),
      dataIndex: "",
      key: "",
      width: "47%",
      render: (item, data) => {
        return (
          <div clickcheckbox="true">{`${data?.ten} ${
            data.tenHoatChat ? " (" + data.tenHoatChat + ")" : " "
          } ${data.hamLuong ? " - " + data.hamLuong : ""}`}</div>
        );
      },
    },
    {
      title: <HeaderSearch title={t("common.soLuong")} isTitleCenter={true} />,
      dataIndex: "soLuong",
      key: "soLuong",
      width: "25%",
      align: "right",
      render: (item, data, index) => {
        return (
          <WrapperInput className="form-item">
            <Input
              value={item}
              // defaultValue="1"
              style={{
                border: !data.soLuong ? "1px solid red" : "unset",
                marginRight: 5,
              }}
              type="number"
              onChange={onChangeInput("soLuong", data)}
              onKeyDown={blockInvalidChar}
            ></Input>
            <Tooltip title={data?.tenDonViTinh}>
              <span>{data?.tenDonViTinh}</span>
            </Tooltip>
          </WrapperInput>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          isTitleCenter={true}
          title={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/lieu-dung")}
            >
              {t("khamBenh.donThuoc.lieuDungCachDung")}
            </div>
          }
        />
      ),
      dataIndex: "lieuDung",
      key: "lieuDung",
      width: "45%",
      render: (item, data, index) => {
        const newDataRender = Object.assign([], listAllLieuDung);
        newDataRender.sort(sortString("ten", 1));

        return (
          <WrapperSelect>
            <Select
              bordered={false}
              showSearch={true}
              data={newDataRender}
              defaultValue={item}
              onChange={onChangeInput("lieuDungId", data)}
            ></Select>
          </WrapperSelect>
        );
      },
    },
    {
      title: <HeaderSearch title={t("common.luuY")} isTitleCenter={true} />,
      width: 150,
      align: "center",
      dataIndex: "ghiChu",
      render: (item, data, index) => {
        return (
          <Input onChange={onChangeInput("ghiChu", data)} value={item}></Input>
        );
      },
    },
  ];
  const onAddNewThuoc = (item) => {
    item.soLuong = 1;
    item.key = item.id;
    setState({
      listServiceSelected: [...state.listServiceSelected, item],
      selectedRowKeys: [...state.selectedRowKeys, item.key],
      isVisiblePopupThemThuoc: false,
      dataSelected: [...state.dataSelected, item],
      keySelected: [...state.keySelected, item.key],
    });
  };
  const renderEmptyTextLeftTable = () => {
    return (
      !isLoading && (
        <div className="empty-table">
          <label>{t("common.khongCoDuLieuPhuHop")}</label>
          <PopoverStyled
            overlayClassName="popover-table-thuoc-ke-ngoai"
            overlayInnerStyle={{
              width: 640,
              height: "fit-content",
              padding: "0px !important",
            }}
            content={
              <PopoverThemThuocKeNgoai
                onAddNewItem={onAddNewThuoc}
                visible={state.isVisiblePopupThemThuoc}
                onCancel={() => {
                  setState({ isVisiblePopupThemThuoc: false });
                }}
              />
            }
            // trigger="click"
            visible={state.isVisiblePopupThemThuoc}
            placement="bottom"
          >
            <Button
              trigger="click"
              onClick={() =>
                setState({
                  isVisiblePopupThemThuoc: !state.isVisiblePopupThemThuoc,
                })
              }
            >
              {t("khamBenh.donThuoc.themMoiThuocKeNgoai")}
            </Button>
          </PopoverStyled>
        </div>
      )
    );
  };

  const dataSource = useMemo(() => {
    return listThuocKeNgoai.map((item) => {
      item.key = item.id;
      return item;
    });
  }, [listThuocKeNgoai]);
  const onChangeBoChiDinh = (value, item) => {
    if (value && item?.lists?.id !== state.boChiDinhSelected?.id) {
      setState({ boChiDinhSelected: item.lists });
      //nếu item không giống thì sẽ thêm vào
    } else {
      setState({ boChiDinhSelected: null });
    }
  };
  return (
    <Main>
      <GlobalStyle />
      <div className="content-left">
        <div className="content-left-header-table">
          <Select
            placeholder={t("khamBenh.donThuoc.chonBoChiDinh")}
            data={listAllBoChiDinh}
            onChange={onChangeBoChiDinh}
          ></Select>
          <TableWrapper
            rowKey={(record) => {
              return record.key;
            }}
            locale={{
              emptyText: renderEmptyTextLeftTable(),
            }}
            rowClassName={(record, index) => {
              return index % 2 === 0 ? "table-row-even" : "table-row-odd";
            }}
            columns={columnsTableLeft}
            dataSource={dataSource}
            rowSelection={rowSelectionLeft}
            showHeader={false}
            onRow={() => {
              return {
                onClick: (row) => {
                  row.currentTarget.firstChild.firstElementChild.firstElementChild.firstElementChild.click();
                },
              };
            }}
          />
          {dataSource?.length > 0 ? (
            <Pagination
              listData={dataSource}
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={onSizeChange}
              stylePagination={{ justifyContent: "flex-start" }}
            />
          ) : (
            <div style={{ height: 38 }} />
          )}
        </div>
      </div>
      <div className="content-right">
        <div className="title">
          <div className="title__left">
            <img src={CircleCheck} alt="" />
            {t("common.daChon")}
          </div>
          <div className="title__right">
            {/* Tổng tiền: {(thanhTien || 0).formatPrice()} đ */}
          </div>
        </div>
        <div className="content-right_table">
          <TableWrapper
            rowKey={(record) => {
              return record.key;
            }}
            rowClassName={(record, index) => {
              return index % 2 === 0
                ? `table-row-even ${
                    index == state.listServiceSelected?.length - 1
                      ? "add-border"
                      : ""
                  }`
                : `table-row-odd ${
                    index == state.listServiceSelected?.length - 1
                      ? "add-border"
                      : ""
                  }`;
            }}
            rowSelection={rowSelectionRight}
            className="table-right"
            columns={columnsTableRight}
            // dataSource={state.listServiceSelected}
            dataSource={
              state.dataSelected?.length > 0 ? state.dataSelected : []
            }
            locale={{
              emptyText: (
                <div style={{ height: 297 }}>
                  <div style={{ color: "#c3c3c3", lineHeight: "297px" }}>
                    {t("khamBenh.donThuoc.khongCoDuLieuThuocDaChon")}
                  </div>
                </div>
              ),
            }}
            onRow={() => {
              return {
                onClick: (row) => {
                  if (
                    row?.target?.firstElementChild?.hasAttribute(
                      "clickcheckbox"
                    ) ||
                    row?.target?.hasAttribute("clickcheckbox")
                  ) {
                    row.currentTarget.firstChild.firstElementChild.firstElementChild.firstElementChild.click();
                  }
                },
              };
            }}
          />
        </div>
      </div>
    </Main>
  );
};

export default TableThuocKeNgoai;
