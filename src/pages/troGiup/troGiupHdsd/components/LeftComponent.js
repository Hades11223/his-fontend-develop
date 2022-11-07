import { Col, Input, Row } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import React, { useEffect, useRef, useState } from "react";
import { listView } from "../../constant";
import { LeftStyled } from "../styled";
import Card from "./Card";

const LeftComponent = (props) => {
  const refTimoutSearch = useRef();
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    setListItem(listView);
  }, []);

  const handleSearch = (value) => {
    if (refTimoutSearch.current) {
      clearTimeout(refTimoutSearch.current);
    }
    refTimoutSearch.current = setTimeout(() => {
      const newList =
        value === ""
          ? listView
          : listView.filter(
              (item) =>
                item.title.toLowerCase().indexOf(value?.toLowerCase()) !== -1
            );
      setListItem(newList);
    }, 200);
  };
  return (
    <LeftStyled>
      <div className="input-search">
        <div className="icon-search">
          <img src={IconSearch} className="icon-search" />
        </div>

        <Input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Tìm kiếm tài liệu hướng dẫn sử dụng"
        />
      </div>
      <div className="list-item">
        <Row>
          {listItem.map((item, index) => (
            <Col span={4} key={index}>
              <Card {...item} />
            </Col>
          ))}
        </Row>
      </div>
    </LeftStyled>
  );
};

export default LeftComponent;
