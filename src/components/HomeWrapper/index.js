import React from "react";
import { Row } from "antd";
import { Main } from "./styled";
import { useHistory } from "react-router-dom";

/**
 * listLink= [{link:"/",title:"danh mục"}]
 */
const Index = ({ listLink, change, ...props }) => {
  const history = useHistory();
  const gotoPage = (value) => {
    history.push(value);
  };
  const link = props.title?.toLowerCase().unsignText().split(" ").join("-");
  return (
    <Main change={change}>
      <div className="container">
        <Row className="home">
          <div className="home-breadcrumbs">
            <span onClick={() => gotoPage("/")}>Trang chủ</span>
            {listLink ? (
              listLink.map((item, index) => (
                <span className="item-link" key={index}>
                  <span>/</span>
                  <label onClick={() => gotoPage(item.link)}>
                    {item.title}
                  </label>
                </span>
              ))
            ) : (
              <>
                <span>/</span>
                <label onClick={() => gotoPage(`/${(link && link) || ""}`)}>
                  {props.title}
                </label>
              </>
            )}
          </div>
        </Row>
        <Row className="home-child">{props.children}</Row>
      </div>
    </Main>
  );
};

export default Index;
