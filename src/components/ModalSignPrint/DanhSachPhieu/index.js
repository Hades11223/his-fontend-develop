import React, { useState, forwardRef, useEffect, useMemo, useRef } from "react";
import { GlobalStyle, Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Dropdown, Menu, message, Popover } from "antd";
import { TableWrapper } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Button from "pages/kho/components/Button";
import EditIcon from "assets/svg/tiep-don/editIcon.svg";
import PrintIcon from "assets/svg/tiep-don/printIcon.svg";
import { printJS } from "data-access/print-provider";
import { ISOFH_TOOL_HOST } from "client/request";
import { useTranslation } from "react-i18next";
import { scroller } from "react-scroll";
import { flatten } from "lodash";
import { useLoading } from "hook";
import IcScanBieuMau from "assets/svg/hoSoBenhAn/ic-bieu-mau-scan.svg";

const DanhSachPhieu = (
  {
    showButtonPrint = true,
    data = {},
    showIconScan,
    handleClick = () => {},
    ...props
  },
  ref
) => {
  const { t } = useTranslation();
  const refDataRenderFirst = useRef(null);
  const [state, _setState] = useState({
    data: [],
    visible: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { hideLoading, showLoading } = useLoading();

  const { selectedIds, elementScrollingPdfKey, listPhieu } = useSelector(
    (state) => state.phieuIn
  );
  const {
    phieuIn: { updateData, getFilePhieuIn },
  } = useDispatch();

  const onChange = (type, value) => (e) => {
    if (type == "active") {
      const checked = e?.target?.checked;
      if (!checked) {
        updateData({
          selectedIds: selectedIds?.filter((x) => x != value) || [],
        });
      } else {
        updateData({ selectedIds: [...(selectedIds || []), value] });
      }
    }
  };

  const onCheckAll = (e) => {
    if (!e?.target?.checked) {
      updateData({ selectedIds: [] });
    } else {
      updateData({ selectedIds: dataIds });
    }
  };
  const handlePrint = async () => {
    if (!selectedIds?.length) {
      return message.error(t("phieuIn.vuiLongChonPhieu"));
    }
    try {
      showLoading();
      const { finalFile, dsPhieu } = await getFilePhieuIn({
        selectedIds,
        ...data,
      });
      printJS({
        printable: finalFile,
        type: "pdf",
      });
    } catch (error) {
    } finally {
      hideLoading();
    }

    // const dsPhieuPreview = listPhieu?.reduce((acc, item) => {
    //   if (Array.isArray(item?.item)) {
    //     let list = item.item.filter((itemChild) =>
    //       selectedIds.includes(itemChild.id)
    //     );
    //     acc = [...acc, [...list]];
    //     return acc;
    //   }
    //   let isOk = selectedIds.includes(item.id) ? item : [];
    //   acc = [...acc, isOk];
    //   return acc;
    // }, []);
    // const isInNhanh = state?.currentItem?.inNhanh;
    // const dsFilePdf = dsPhieuPreview?.reduce((acc, item) => {
    //   if (Array.isArray(item)) {
    //     // xử lý phiếu , có những phiếu có mảng con bên trong
    //     let list = item.map((itemChild) => itemChild.file.pdf);
    //     acc = [...acc, [...list]];
    //     return acc;
    //   }
    //   acc = [...acc, ...item.filePdf];
    //   return acc;
    // }, []);
    // getDataDanhSachPhieu({ dsFile: flatten(dsFilePdf), mode: 0 }).then((s) => {
    //   if (isInNhanh) {
    //     const requestOptions = {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(dsPhieuPreview),
    //     };
    //     fetch(`${ISOFH_TOOL_HOST}/api/his/v1/in-pdf/bao-cao`, requestOptions)
    //       .then((s) => {
    //         // resolve(s.data);
    //       })
    //       .catch((e) => {});
    //   } else {
    //     printJS({
    //       printable: s,
    //       type: "pdf",
    //     });
    //   }
    // });
  };
  useEffect(() => {
    if (
      refDataRenderFirst?.current == null ||
      refDataRenderFirst?.current == 0
    ) {
      refDataRenderFirst.current = flatten(listPhieu || []);
    }
  }, [listPhieu]);
  const dataSource = useMemo(() => {
    return flatten(listPhieu || []);
  }, [listPhieu]);
  const dataIds = useMemo(() => {
    return dataSource.map((item) => item?.key || item?.id);
  }, [dataSource]);
  const isCheckAll = useMemo(() => {
    return dataIds?.every((id) => selectedIds?.includes(id));
  }, [dataIds, selectedIds]);

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} sort_key="index" />,
      width: 30,
      dataIndex: "index",
      hideSearch: true,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <HeaderSearch title={t("phieuIn.tenPhieu")} sort_key="tenBaoCao" />
      ),
      width: 100,
      dataIndex: "ten",
      hideSearch: true,
      render: (item, itemAll) => {
        return item || itemAll?.item?.[0]?.tenBaoCao || itemAll?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("phieuIn.khoGiay")} sort_key="khoGiay" />,
      render: (item, itemAll) => {
        // return (
        //   (listkhoGiay || []).find((itemKhoGiay) => item === itemKhoGiay.id)
        //     ?.ten ||
        //   (listkhoGiay || []).find(
        //     (itemKhoGiay) => itemAll?.item?.[0]?.khoGiay === itemKhoGiay.id
        //   )?.ten
        // );
      },
      width: 50,
      dataIndex: "khoGiay",
      hideSearch: true,
      align: "left",
    },
    {
      title: (
        <HeaderSearch title={t("common.trangThai")} sort_key="trangThai" />
      ),
      width: 60,
      dataIndex: "trangThai",
      hideSearch: true,
      render: (item, itemAll) => {
        // return item || itemAll?.[0]?.trangThai;
      },
    },
    {
      title: (
        <HeaderSearch
          title={<Checkbox onClick={onCheckAll} checked={isCheckAll} />}
        />
      ),
      width: 30,
      dataIndex: "key",
      hideSearch: true,
      align: "center",
      fixed: "right",
      render: (value, item, index) => {
        return (
          <Checkbox
            onClick={onChange("active", value)}
            checked={selectedIds?.includes(value)}
            className="box-item"
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (listPhieu?.length > 0) {
      setState({
        currentItem: listPhieu?.[0],
      });
    }
  }, [listPhieu]);

  const setRowClassName = (record, index) => {
    return elementScrollingPdfKey == record.key ? "active" : "";
  };
  const handleClickItem = (item) => {
    setState({
      visible: false,
    });
    handleClick(item);
  };
  const menu = useMemo(() => {
    const list = [
      {
        key: 1,
        label: "Thêm biểu mẫu scan",
      },
      {
        key: 2,
        label: "Danh sách biểu mẫu scan",
      },
    ];
    return (
      <div className="list-action-upload">
        <GlobalStyle></GlobalStyle>
        {list.map((item, index) => {
          return (
            <p
              className="item"
              title={item.label}
              onClick={() => handleClickItem(item)}
              key={index}
            >
              {item.label}
            </p>
          );
        })}
      </div>
    );
  }, []);

  const onVisibleChange = () => {
    setState({
      visible: !state.visible,
    });
  };
  return (
    <Main
      title={t("common.danhSachPhieu")}
      subTitle={
        showIconScan ? (
          <Popover
            overlayClassName="popover-scan"
            content={menu}
            placement="rightBottom"
            trigger="click"
            visible={state.visible}
            onVisibleChange={onVisibleChange}
          >
            <IcScanBieuMau
              style={{ width: "20px", height: "20px" }}
            ></IcScanBieuMau>
          </Popover>
        ) : null
      }
    >
      <div className="__list">
        <TableWrapper
          scroll={{ y: 500, x: 0 }}
          rowKey={"key"}
          columns={columns}
          dataSource={dataSource}
          rowClassName={setRowClassName}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                scroller.scrollTo(record.key, {
                  duration: 500,
                  offset: 0,
                  smooth: "easeInOutQuint",
                  containerId: "containerElementPdf",
                });
                updateData({
                  // elementScrollingPdfKey: record.key,
                });
                setState({
                  currentItem: record,
                });
              },
            };
          }}
        />
      </div>
      {showButtonPrint && (
        <div className="__button">
          {/* <Button
          rightIcon={<EditIcon />}
          minWidth={140}
          type={"primary"}
          iconHeight={15}
        >
          {t("phieuIn.kyTrinhKy")}
        </Button> */}
          <Button
            rightIcon={<PrintIcon />}
            minWidth={120}
            onClick={handlePrint}
            type={"primary"}
            iconHeight={15}
          >
            {t("common.in")}
          </Button>
        </div>
      )}
    </Main>
  );
};

export default forwardRef(DanhSachPhieu);
