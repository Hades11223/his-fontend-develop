import { Input, Row } from "antd";
import { checkRole } from "utils/role-utils";
import { capitalize } from "lodash";
import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "../../layout";
import { ListNhomDanhMuc } from "../../layout/configData";
import { WrapperContentTree } from "../../layout/divInner";
import { Mainfunc } from "../../styled";
const TemplateCollapse = ({
  title,
  listGroup = [],
  listFunctions,
  bgPageFunc,
  icon,
  ...props
}) => {
  const history = useHistory();
  const [state, _setState] = useState({
    data: [],
    searchTerm: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  // const { data } = state;

  const gotoPage = (value) => {
    history.push(value);
  };
  const onSearch = (value) => {
    let searchTerm = value?.trim()?.toLowerCase().unsignText();
    let categories = mappingCategory(searchTerm);
    setState({ data: [...categories], searchTerm });
  };

  const mappingCategory = (searchTerm = "") => {
    let subCategories =
      listFunctions?.filter((option) => {
        if (!checkRole(option.accessRoles) || option.group == null)
          return false;
        return true;
      }) || [];

    if ("" != searchTerm) {
      subCategories = subCategories?.filter(
        (item) =>
          item.title?.toLowerCase().unsignText().indexOf(searchTerm) >= 0
      );
    }

    let categories = listGroup.map((parent) => {
      let children = subCategories.filter(
        (child) => child.group == parent.group
      );
      return {
        ...parent,
        children,
      };
    });

    categories = categories?.filter((item) => item?.children.length > 0);

    return categories;
  };

  useLayoutEffect(() => {
    let categories = mappingCategory();
    setState({ data: [...categories] });
  }, []);

  return (
    <Layout>
      <Mainfunc bgPageFunc={require("assets/images/pagehome/bgDanhMuc.png")}>
        <div className="list-category list-func">
          <div className="list-func--search">
            <div className="list-func--goback" onClick={() => gotoPage("/")}>
              <img
                src={require("assets/images/pagehome/icBack.png")}
                alt="iSofh"
              />
              <span>Quay lại</span>
            </div>
            <div className="list-func--cateogry">
              <img
                src={require("assets/images/pagehome/icDMChucNang.png")}
                alt="iSofh"
              />
              <span>{title}</span>
            </div>
            <div className="list-func--boxSearch">
              <img
                src={require("assets/images/his-core/iconSearch.png")}
                alt="iSofh"
              />
              <Input
                placeholder="Tìm kiếm"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
          <Row className="list-func--home">
            <div className="height-auto">
              {(state.data || [])
                .sort((a, b) =>
                  a?.title?.toLowerCase().localeCompare(b?.title?.toLowerCase())
                )
                .map((item, index) => {
                  const newItem = {
                    ...item,
                    title: capitalize(item?.title),
                  };
                  return (
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
          </Row>
        </div>
      </Mainfunc>
    </Layout>
  );
};
const mapState = (state) => ({
  auth: state.auth.auth,
});
const mapDispatch = ({ auth: { onLogout } }) => ({
  onLogout,
});

export default connect(mapState, mapDispatch)(TemplateCollapse);
