import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Row } from "antd";
import MultiLevelTab from "components/MultiLevelTab";
import { Main } from "./styled";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";
import fileUtils from "utils/file-utils";
import { HOST } from "client/request";
import { ModalTemplate } from "components";
import { useTranslation } from "react-i18next";

const ModalSystemInfo = ({}, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    utils: { getDb, getBranch, getLog },
  } = useDispatch();

  const {
    utils: { branchCode = {}, db = {}, listLog = [] },
    application: { buildInfo },
  } = useSelector((state) => state);
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));

  useEffect(() => {
    getDb();
    getBranch();
    getLog();
  }, []);

  const onSelectItem = (item) => {
    fileUtils
      .getFromUrl({
        url: HOST + "/api/his/v1/utils/log/" + item + "",
      })
      .then((s) => {
        const blob = new Blob([new Uint8Array(s)]);
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", item);
        document.body.appendChild(link);
        link.click();
      });
  };
  const listPanel = [
    {
      title: "Thông tin ",
      key: 1,
      render: () => {
        return (
          <div className="info">
            <label>
              <b>BranchBE</b>: {branchCode?.branch}
            </label>
            <label>
              <b>BranchFE</b>: {buildInfo?.branch}
            </label>
            <label>
              <b>HEADBE</b>: {branchCode?.commitId}
            </label>
            <label>
              <b>HEADFE</b>: {buildInfo?.message}
            </label>
            <label>
              <b>BuildDay</b>:{" "}
              {moment(buildInfo?.buildTime).format("HH:mm DD/MM/YYYY")}
            </label>
            <label>
              <b>Database 1</b>: {db?.firstDbName}
            </label>
            <label>
              <b>Database 2</b>: {db?.secondDbName}
            </label>
          </div>
        );
      },
    },
    {
      key: 2,
      title: "Log",
      render: () => {
        return (
          <div className="log">
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              useWindow={false}
              style={{ width: "100%", height: "100%" }}
              loadMore={() => {}}
            >
              <List
                dataSource={listLog}
                renderItem={(item) => (
                  <Row key={item.id} onClick={() => onSelectItem(item)}>
                    <a> {item}</a>
                  </Row>
                )}
              ></List>
            </InfiniteScroll>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  const onCancel = () => {
    setState({
      show: false,
    });
  };

  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onCancel}
      title="ISOFH - SAKURA"
      width={520}
      // closable={false}
      // maskClosable={false}
    >
      <Main>
        <MultiLevelTab
          listPanel={listPanel}
          isBoxTabs={true}
          activeKey={state.activeKeyTab}
          onChange={(activeKeyTab) => setState({ activeKeyTab })}
        ></MultiLevelTab>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalSystemInfo);
