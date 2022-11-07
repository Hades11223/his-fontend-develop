import { Input, Row } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  memo,
} from "react";
import { Main } from "./styled";
import InfiniteScroll from "react-infinite-scroller";
import DragDropContext from "../DragDropContext";
import IcReload from "assets/svg/ic-reload.svg";
import IcSave from "assets/svg/ic-save.svg";
import cacheUtils from "utils/cache-utils";
import { useSelector } from "react-redux";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import { useTranslation } from "react-i18next";
import { Button, ModalTemplate } from "components";

const ModalCustomizeColumn = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const { columns, tableName, columnsDefault } = props;
  const [state, _setState] = useState({
    show: false,
    dataColumns: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const { auth } = useSelector((state) => state.auth);
  const refOk = useRef(null);
  useImperativeHandle(ref, () => ({
    show: ({}, onOk) => {
      setState({ show: true });
      refOk.current = onOk;
    },
  }));

  const onCancel = () => {
    setState({ show: false });
  };

  const onSave = async () => {
    var data = (state.items || columns).map((item, index) => {
      return {
        columnName: item.columnName,
        show: item.show,
        index: index,
        i18Name: item.i18Name,
      };
    });
    await cacheUtils.save(
      auth.nhanVienId,
      "DATA_CUSTOMIZE_COLUMN_" + tableName,
      data,
      false
    );
    refOk.current();
    setState({ dataColumns: data, show: false });
  };
  const onReset = async () => {
    var data = (columnsDefault || []).map((item, index) => {
      return {
        columnName: item.columnName,
        show: item.show,
        index: index,
        i18Name: item.i18Name,
      };
    });
    await cacheUtils.save(
      auth.nhanVienId,
      "DATA_CUSTOMIZE_COLUMN_" + tableName,
      data,
      false
    );
    refOk.current();
    setState({ items: data, show: false });
  };
  const onListSelectItem = (items) => {
    setState({ items });
  };
  useEffect(() => {
    setState({
      dataColumns: columns.map((i) => ({
        ...i,
        columnName: i.i18Name ? t(i.i18Name) : i.columnName,
      })),
    });
  }, [columns]);

  const onChangeColumns = (e) => {
    let value = e.target.value || "";
    let data = columns.filter((x) => {
      return x.columnName.toLowerCase().search(value.toLowerCase()) !== -1;
    });
    setState({ dataColumns: data });
  };
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  return (
    <ModalTemplate
      ref={refModal}
      width={640}
      onCancel={onCancel}
      title={t("common.caiDatHienThiBang")}
      actionRight={
        <>
          {" "}
          <Button
            type="default"
            minWidth={100}
            onClick={onReset}
            iconHeight={15}
            rightIcon={<IcReload />}
          >
            <span>{t("common.veMacDinh")}</span>
          </Button>
          <Button
            type="primary"
            minWidth={100}
            onClick={onSave}
            iconHeight={15}
            rightIcon={<IcSave />}
          >
            <span>{t("common.luuLai")}</span>
          </Button>
        </>
      }
    >
      <Main>
        <Row style={{ background: "#fff", padding: "20px" }}>
          <span style={{ fontWeight: "bold" }}>
            {t("common.noteKeoThaCot")}
          </span>
          <Input
            placeholder={t("common.timTen")}
            onChange={onChangeColumns}
            prefix={
              <img src={IconSearch} alt="IconSearch" className="ic-down" />
            }
          />

          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            useWindow={false}
            style={{ width: "100%" }}
            loadMore={() => {}}
          >
            <div className="content">
              <DragDropContext
                columns={state?.dataColumns}
                onListSelectItem={onListSelectItem}
              />
            </div>
          </InfiniteScroll>
        </Row>
      </Main>
    </ModalTemplate>
  );
};
export default memo(forwardRef(ModalCustomizeColumn));
