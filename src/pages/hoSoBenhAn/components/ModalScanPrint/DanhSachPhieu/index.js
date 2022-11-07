import React, { useState, forwardRef, useEffect, useMemo, useRef } from "react";
import { Main } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Dropdown, Menu, message } from "antd";
import { TableWrapper } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Button from "pages/kho/components/Button";
import EditIcon from "assets/svg/tiep-don/editIcon.svg";
import PrintIcon from "assets/svg/tiep-don/printIcon.svg";
import printProvider, { printJS } from "data-access/print-provider";
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
    handleClick,
    listPhieu,
    selectedIds,
    onChangeKey,
    elementScrollingPdfKey,
    setSelectId,
    ...props
  },
  ref
) => {
  const { t } = useTranslation();
  const refDataRenderFirst = useRef(null);
  const [state, _setState] = useState({
    data: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { hideLoading, showLoading } = useLoading();

  const onChange = (type, value) => (e) => {
    if (type == "active") {
      const checked = e?.target?.checked;
      if (!checked) {
        setSelectId(selectedIds?.filter((x) => x != value));
      } else {
        setSelectId([...(selectedIds || []), value]);
      }
    }
  };

  const onCheckAll = (e) => {
    if (!e?.target?.checked) {
      setSelectId([]);
    } else {
      setSelectId(dataIds);
    }
  };
  const handlePrint = async () => {
    if (!selectedIds?.length) {
      return message.error(t("phieuIn.vuiLongChonPhieu"));
    }
    try {
      showLoading();
      const link = listPhieu
        .filter((item) => selectedIds.some((el) => el === item.key))
        .map((item) => item.data.filePdf);
      const file = await printProvider.getMergePdf(link);
      printJS({
        printable: file,
        type: "pdf",
      });
    } catch (error) {
      console.log("e", error);
      debugger;
    } finally {
      hideLoading();
    }
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
  return (
    <Main title={t("common.danhSachPhieu")}>
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
                scroller.scrollTo(record?.key, {
                  duration: 500,
                  offset: 0,
                  smooth: "easeInOutQuint",
                  containerId: "containerElementPdf2",
                });
                onChangeKey(record.key);
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
