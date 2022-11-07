import { Button, Row, List } from "antd";
import React, { useRef } from "react";
import { Main } from "./styled";
import IcCreate from "assets/images/qms/IcCreate.png";
import Modal from "pages/qms/qmsNgang/thietLap/Modal";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

const MiddleContent = (props) => {
  const refInfo = useRef(null);
  const { loaiQms, phongId } = props;
  const { listAllKiosk } = useSelector((state) => state.kiosk);

  const onCreate = () => {
    refInfo.current && refInfo.current.show({loaiQms, phongId });
  };

  const onSelectItem = (item) => {
    refInfo.current && refInfo.current.show({item, loaiQms, phongId });
  };
  return (
    <Main>
      <Row>
        <span className="first">
          Chọn một thiết lập thông số có sẵn dưới đây
        </span>
        <br />
        <span className="second">
          hoặc
          <Button onClick={onCreate}>
            <span>Thêm mới</span>
            <img src={IcCreate} alt="..." />
          </Button>
        </span>
      </Row>
      <Row>
        <div className="content">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            useWindow={false}
            // loadMore={handleInfiniteOnLoad}
          >
            <List
              dataSource={listAllKiosk}
              renderItem={(item) => (
                <Row key={item.id} onClick={() => onSelectItem(item)}>
                  <span> {item.ten}</span>
                </Row>
              )}
            ></List>
          </InfiniteScroll>
        </div>
      </Row>
      <Modal ref={refInfo}></Modal>
    </Main>
  );
};

export default MiddleContent;
