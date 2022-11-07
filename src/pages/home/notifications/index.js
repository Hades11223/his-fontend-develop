import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "antd";
import { WrapperPanel } from "../layout/divInner";
import { MainNotifi } from "../styled";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;
const Index = (props) => {
  const { t } = useTranslation();
  const { listThongBaoHangNgay, totalElements20 } = useSelector(
    (state) => state.thongBao
  );
  const {
    thongBao: { searchThongBao },
  } = useDispatch();

  useEffect(() => {
    searchThongBao({
      page: 0,
      size: 5,
      active: true,
      loaiThongBao: 20,
      isLoadMore: false,
      sort: "createdAt,desc",
    });
  }, []);

  const [page, setPage] = useState(0);
  const onScroll = (e) => {
    let obj = e.target;
    if (obj.scrollTop === obj.scrollHeight - obj.offsetHeight) {
      onLoadMore(true);
    }
  };

  function onLoadMore(isLoadMore) {
    if (listThongBaoHangNgay.length >= totalElements20) {
      return;
    }
    searchThongBao({
      page: page + 1,
      size: 5,
      active: true,
      loaiThongBao: 20,
      isLoadMore: isLoadMore,
      sort: "createdAt,desc",
    });
    setPage(page + 1);
  }

  const [activeKey, setActiveKey] = useState(0);
  const onViewIcon = (item) => {
    if (item === 0) {
      return require("assets/images/pagehome/icNotifi.png");
    } else if (item === 1) {
      return require("assets/images/pagehome/icSuccess.png");
    } else if (item === 2) {
      return require("assets/images/pagehome/icWarn.png");
    }
  };
  const thongBaoComponent = listThongBaoHangNgay?.map((info, index) => {
    return (
      <Panel
        header={
          <WrapperPanel
            title={`${t("common.tinNhan")} ` + (index + 1)}
            description={info.noiDung}
            link=""
            icon={onViewIcon(index % 2)}
          />
        }
        key={index}
        className={
          index % 2 === 0 ? "content-right-panel" : "content-right-success"
        }
      ></Panel>
    );
  });

  return (
    <MainNotifi>
      <div className="content-right">
        <div className="title">{t("common.thongBao")}</div>
        <div id="notification" style={{ overflow: "auto" }} onScroll={onScroll}>
          <Collapse
            defaultActiveKey={[activeKey]}
            onChange={(e) => {
              setActiveKey(e);
            }}
            expandIconPosition={"right"}
            className="content-right-wrapper"
          >
            {thongBaoComponent}
          </Collapse>
        </div>
      </div>
    </MainNotifi>
  );
};

export default Index;
