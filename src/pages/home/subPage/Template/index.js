import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Row, Input } from "antd";
import Layout from "../../layout";
import { WrapperContentLeft } from "../../layout/divInner";
import { Mainfunc } from "../../styled";
import { WrapperContentTree } from "../../layout/divInner";
import { capitalize } from "lodash";
import { useTranslation } from "react-i18next";

const Template = ({
  title,
  i18n,
  icon,
  listFunctions = [],
  bgPageFunc,
  tree,
  props,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [state, _setState] = useState({
    data: listFunctions || [],
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const gotoPage = (value) => {
    history.push(value);
  };
  const onSearch = (value) => {
    const valueText = value?.trim().toLowerCase().unsignText();
    const dataSearch = listFunctions?.filter(
      (option) =>
        option?.title?.toLowerCase().unsignText().indexOf(valueText) >= 0
    );
    setState({ data: dataSearch || [] });
  };

  return (
    <Layout>
      <Mainfunc bgPageFunc={bgPageFunc}>
        <div className="list-category list-func">
          <div className="list-func--search">
            <div className="list-func--goback" onClick={() => gotoPage("/")}>
              <img
                src={require("assets/images/pagehome/icBack.png")}
                alt="iSofh"
              />
              <span>{t("common.quayLai")}</span>
            </div>
            <div className="list-func--cateogry">
              <img src={icon} alt="iSofh" />
              <span>{i18n ? t(i18n) : title}</span>
            </div>
            <div className="list-func--boxSearch">
              <img
                src={require("assets/images/his-core/iconSearch.png")}
                alt="iSofh"
              />
              <Input
                placeholder={t("common.timKiem")}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
          <Row className="list-func--home">
            {tree ? (
              <div className="height-auto">
                {(state.data || [])
                  .sort((a, b) =>
                    a?.title
                      ?.toLowerCase()
                      .localeCompare(b?.title?.toLowerCase())
                  )
                  .map((item, index) => {
                    const newItem = {
                      ...item,
                      title: capitalize(item?.title),
                    };
                    return (
                      // <Col xs={24} md={24} lg={24} key={index}>
                      //   <WrapperContentLeft
                      //     title={item.title}
                      //     bg={item.bg}
                      //     link={item.link}
                      //     {...props}
                      //   />
                      <WrapperContentTree
                        onSearch={state.searchTerm ? true : false}
                        item={newItem}
                        key={index}
                        history={history}
                      />
                      // </Col>
                    );
                  })}
              </div>
            ) : (
              state.data.map((item, index) => (
                <Col xs={24} md={12} lg={8} key={index}>
                  <Link to={item.link}>
                    <WrapperContentLeft
                      title={item.title}
                      i18n={item.i18n}
                      bg={item.bg}
                      link={item.link}
                      history={history}
                      {...props}
                    />
                  </Link>
                </Col>
              ))
            )}
          </Row>
        </div>
      </Mainfunc>
    </Layout>
  );
};

export default Template;
