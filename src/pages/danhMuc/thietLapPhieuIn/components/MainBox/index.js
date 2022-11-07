import React, { useEffect, useState, useCallback, useRef } from "react";
import { Row, Col, Input, Checkbox } from "antd";
import { Main, GlobalStyle } from "./styled";
import { InputSearch } from "../../styled";
import { useSelector, useDispatch } from "react-redux";
import { Tree, Select } from "antd";
import { CarryOutOutlined, FormOutlined } from "@ant-design/icons";
import { cloneDeep } from "lodash";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import { Button } from "components";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const MainBox = (props) => {
  const { t } = useTranslation();

  const refOptionBaoCao = useRef(null);
  const { listData } = useSelector((state) => state.thietLapPhieuIn);
  const { listAllBaoCao } = useSelector((state) => state.baoCao);
  const postDanhSachPhieuIn = useDispatch().thietLapPhieuIn.postDanhSachPhieuIn;
  const getListAllBaoCao = useDispatch().baoCao.getListAllBaoCao;
  const [state, _setState] = useState({ expandGroup: {}, checkedGroup: {} });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getListAllBaoCao({ page: "", size: "" });
  }, []);
  useEffect(() => {
    //default chọn select box
    let listSelectedAll = {};

    listData.forEach((item, index) => {
      item["dsViTri"].forEach((itemListMainChildren) => {
        let listValue = itemListMainChildren?.dsPhieu
          ?.filter((itemLast) => itemLast.hieuLuc)
          .map((e) => e.ma);
        let selectedAll = itemListMainChildren?.dsPhieu?.every(
          (itemLast) => itemLast.hieuLuc
        );
        //check bên trái , nếu cột phải được check hết
        if (selectedAll) {
          listValue.push(itemListMainChildren.ma);
        }

        //end check bên trái , nếu cột phải được check hết
        listSelectedAll = {
          ...listSelectedAll,
          [index]: listSelectedAll?.[index]
            ? [...listSelectedAll?.[index], ...listValue]
            : listValue,
        };
      });
    });

    setState({
      checkedGroup: listSelectedAll,
    });
  }, [listData]);

  const onSelect = (selectedKeys, info) => {
    console.log("info: ", info);
    console.log("selectedKeys: ", selectedKeys);
  };

  const onExpand = (stt) => {
    return (expandedKeysValue) => {
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      setState({
        expandGroup: {
          ...state.expandGroup,
          [stt]: expandedKeysValue,
        },
      });
      // setAutoExpandParent(false);
    };
  };

  const onCheck = (stt) => {
    return (checkedKeysValue) => {
      setState({
        checkedGroup: {
          ...state.checkedGroup,
          [stt]: checkedKeysValue,
        },
      });
    };
  };

  const onChange = (e) => {
    const { value } = e.target;
    let expandGroup = {
      0: [],
    };
    listData.forEach((item, index) => {
      if (
        item.ten.toLowerCase().trim().indexOf(value.toLowerCase().trim()) > -1
      ) {
        expandGroup = {
          ...expandGroup,
          [index]: [item.ma],
        };
      }
      item.dsViTri.forEach((itemViTri) => {
        if (
          itemViTri.ten
            .toLowerCase()
            .trim()
            .indexOf(value.toLowerCase().trim()) > -1
        ) {
          expandGroup = {
            ...expandGroup,
            [index]: expandGroup[index]
              ? [...expandGroup[index], itemViTri.ma]
              : [itemViTri.ma],
          };
        }

        itemViTri.dsPhieu.forEach((itemPhieu) => {
          if (
            itemPhieu.ten
              .toLowerCase()
              .trim()
              .indexOf(value.toLowerCase().trim()) > -1
          ) {
            expandGroup = {
              ...expandGroup,
              [index]: expandGroup[index]
                ? [...expandGroup[index], itemViTri.ma]
                : [itemViTri.ma],
            };
          }
        });
      });
    });
    setState({
      expandGroup,
    });
  };
  const handleChange = (itemPhieu) => (value) => {
    listData.forEach((item, index) => {
      item.dsViTri.forEach((itemViTri) => {
        itemViTri.dsPhieu.forEach((itemPhieuOri) => {
          if (
            itemPhieuOri.ma === itemPhieu.ma &&
            itemPhieu.maDsPhieu === itemViTri.ma
          ) {
            itemPhieuOri.dsBaoCaoId = value;
            itemPhieu.dsBaoCaoId = value;
          }
        });
      });
    });
  };

  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.children?.props?.children?.props?.children
        ?.toLowerCase()
        ?.createUniqueText()
        ?.indexOf(input) >= 0
    );
  };

  const onSave = async () => {
    let listSelectedAll = [...listData];
    const result = await (() => {
      listSelectedAll.forEach((item, index) => {
        item["dsViTri"].forEach((itemListMainChildren) => {
          let listValue = itemListMainChildren?.dsPhieu?.map((itemLast) => {
            if (state?.checkedGroup[index]?.includes(itemListMainChildren.ma)) {
              itemLast.hieuLuc = true;
              return itemLast;
            }
            if (state?.checkedGroup[index]?.includes(itemLast.ma)) {
              itemLast.hieuLuc = true;
            } else {
              itemLast.hieuLuc = false;
            }
            return itemLast;
          });
        });
      });
      return listSelectedAll;
    })();
    let objToArr = Object.values(result);
    postDanhSachPhieuIn(objToArr);
  };
  const children = useCallback(
    (itemPhieu) => {
      const list =
        listAllBaoCao.length > 0 &&
        listAllBaoCao.map((item, indexC) => {
          return (
            <Option
              key={indexC}
              value={item.id}
              className={`${
                indexC % 2 === 0 ? "table-row-even" : "table-row-odd"
              }`}
            >
              <Checkbox
                checked={itemPhieu?.dsBaoCaoId?.indexOf(item.id) >= 0}
                style={{ pointerEvents: "none" }}
              >
                <span className="title-option-checkbox">{item.ten}</span>
              </Checkbox>
            </Option>
          );
        });
      refOptionBaoCao.current = list;
      return list;
      // }
    },
    [listAllBaoCao]
  );
  const renderTree = () => {
    return (cloneDeep(listData) || []).map((item, index) => {
      // ---------------------------------------------------------------- Cột trái
      const listMainChildren = item["dsViTri"].map((itemListMainChildren) => {
        //con cấp 1 của cột trái
        itemListMainChildren.key = itemListMainChildren.ma;
        itemListMainChildren.title = () => {
          return (
            <>
              <div>
                <span style={{ marginRight: 10 }}>
                  {itemListMainChildren.ten}
                </span>
                {!!state?.checkedGroup[index]?.length && (
                  <span
                    style={{
                      width: 17,
                      height: 20,
                      background: "#ececec",
                      display: "inline-block",
                      textAlign: "center",
                    }}
                  >
                    {state?.checkedGroup[index]?.includes(
                      itemListMainChildren.ma
                    )
                      ? itemListMainChildren.dsPhieu.length
                      : state?.checkedGroup[index]?.length}
                  </span>
                )}
              </div>
              {state.expandGroup[index]?.includes(itemListMainChildren.ma) &&
                itemListMainChildren.dsPhieu.map((itemHidden, indexHidden) => (
                  // dùng để làm tiều đề con cột trái ngang hàng khi mở cột phải
                  <div
                    key={indexHidden}
                    style={{ paddingTop: 12, visibility: "hidden" }}
                  >
                    <span style={{ marginRight: 10 }}>
                      {itemListMainChildren.ten}
                    </span>
                  </div>
                ))}
            </>
          );
        };
        return itemListMainChildren;
      });
      let listMain = [
        // tiêu đề cột trái
        {
          ...item,
          key: item.ma,
          title: () => {
            return (
              <div>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginRight: 10,
                    width: "fit-content",
                  }}
                >
                  {item.ten}
                </span>
                {!!listMainChildren.length && (
                  <span
                    style={{
                      width: 17,
                      height: 20,
                      background: "#ececec",
                      display: "inline-block",
                      textAlign: "center",
                    }}
                  >
                    {listMainChildren.length}
                  </span>
                )}
              </div>
            );
          },
          checkable: false,
          icon: <CarryOutOutlined />,
          children: listMainChildren,
        },
      ];

      // ---------------------------------------------------------------- Cột phải
      const arr = [];
      let renderFirstTatCaCheckBox = false;
      item.dsViTri.forEach((itemRight, index) => {
        let keyChildrenAll = "";
        let listPhieu = itemRight["dsPhieu"].map((itemPhieu) => {
          console.log("itemPhieu", itemPhieu);
          // con cuối cùng cột phải
          itemPhieu.maDsPhieu = itemRight.ma;
          itemPhieu.key = itemPhieu.ma;
          itemPhieu.title = () => {
            return (
              <div>
                <Row align="space-between" style={{ width: 875 }}>
                  <div>{itemPhieu.ten}</div>
                  {/* ----------------------------------------------------------------  input cột báo cáo */}
                  <div>
                    <Select
                      dropdownClassName="dropdown-select-mainbox"
                      mode="multiple"
                      placeholder="Vui lòng chọn báo cáo"
                      style={{ width: "405px" }}
                      onChange={handleChange(itemPhieu)}
                      filterOption={filterOption}
                      defaultValue={
                        (itemPhieu?.dsBaoCao || []).map((x) => x?.id) ||
                        undefined
                      }
                      autoClearSearchValue={false}
                      showArrow
                    >
                      {/* {children} */}
                      {children(itemPhieu)}
                    </Select>
                  </div>
                  {/* ---------------------------------------------------------------- end input cột báo cáo */}
                </Row>
              </div>
            );
          };
          itemPhieu.icon = <CarryOutOutlined />;
          keyChildrenAll = itemPhieu[0] + "-All";
          return itemPhieu;
        });
        if (!renderFirstTatCaCheckBox) {
          renderFirstTatCaCheckBox = true; // chỉ render tất cả 1 lần cho cả 2 giá trị bên phải
          arr.push({
            title: () => {
              return (
                <div>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      marginRight: 10,
                      width: "fit-content",
                    }}
                  >
                    {" "}
                    Tất cả
                  </span>
                </div>
              );
            },
            key: item.ma,
            icon: <CarryOutOutlined />,
            children: [
              {
                title: () => {
                  return (
                    <div>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          marginRight: 10,
                          width: "fit-content",
                        }}
                      >
                        {" "}
                        Tất cả
                      </span>
                    </div>
                  );
                },
                key: itemRight.ma,
                icon: <CarryOutOutlined />,
                children: listPhieu,
              },
            ],
          });
        } else {
          arr[0].children.push({
            title: () => {
              return (
                <div>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      marginRight: 10,
                      width: "fit-content",
                    }}
                  >
                    {" "}
                    Tất cả
                  </span>
                </div>
              );
            },
            key: itemRight.ma,
            children: listPhieu,
            icon: <CarryOutOutlined />,
          });
        }
      });

      return (
        <div key={index}>
          <Row>
            <Col span={6}>
              <Tree
                showLine={{ showLeafIcon: false }}
                showIcon={false}
                checkable
                onExpand={onExpand(index)}
                expandedKeys={state?.expandGroup[index]}
                autoExpandParent={true}
                onCheck={onCheck(index)}
                checkedKeys={state?.checkedGroup[index]}
                onSelect={onSelect(index)}
                // selectedKeys={selectedKeys}
                treeData={listMain}
              />
            </Col>
            <Col span={18}>
              <Tree
                showLine={{ showLeafIcon: false }}
                showIcon={false}
                checkable
                onExpand={onExpand(index)}
                expandedKeys={state?.expandGroup[index]}
                autoExpandParent={true}
                onCheck={onCheck(index)}
                checkedKeys={state?.checkedGroup[index]}
                onSelect={onSelect(index)}
                // selectedKeys={selectedKeys}
                treeData={arr}
              />
            </Col>
          </Row>
          <hr />
        </div>
      );
    });
  };
  return (
    <>
      <GlobalStyle />
      <InputSearch>
        <img src={IconSearch} alt="IconSearch" className="icon-search" />
        <Input
          placeholder="Nhập để tìm tên màn hình hoặc vị trí"
          autoFocus
          onChange={onChange}
        />
      </InputSearch>
      <Main>
        <div className="info">
          <div className="header">
            <div className="left">Tên màn hình, vị trí</div>
            <div className="right">
              <Row align="middle">
                <div className="title">Tên phiếu in</div>
                <span style={{ margin: "0px 6px", color: "#cecece" }}>|</span>
                <u
                  className="text"
                  onClick={() => {
                    let listSelectedAll = {};
                    listData.forEach((item, index) => {
                      item["dsViTri"].forEach((itemListMainChildren) => {
                        let listValue = itemListMainChildren?.dsPhieu?.map(
                          (itemLast) => itemLast.ma
                        );
                        //check bên trái
                        listValue.push(itemListMainChildren.ma);
                        listSelectedAll = {
                          ...listSelectedAll,
                          [index]: listSelectedAll?.[index]
                            ? [...listSelectedAll?.[index], ...listValue]
                            : listValue,
                        };
                      });
                    });
                    setState({
                      checkedGroup: listSelectedAll,
                    });
                  }}
                >
                  Chọn tất cả
                </u>
                <span style={{ margin: "0px 6px", color: "#cecece" }}>|</span>
                <u
                  className="text"
                  onClick={() => {
                    setState({
                      checkedGroup: [],
                    });
                  }}
                >
                  Bỏ chọn tất cả
                </u>
              </Row>
            </div>
            <div className="right">
              <Row align="middle">
                <div className="title">Mã báo cáo</div>
              </Row>
            </div>
          </div>

          <div
            style={{
              paddingLeft: 10,
              marginTop: 16,
              overflowY: "scroll",
              height: "calc(100vh - 350px)",
            }}
          >
            {renderTree()}
          </div>
          <Row justify="end">
            <Button
              minWidth={100}
              rightIcon={
                <img
                  style={{ marginLeft: 6 }}
                  src={require("assets/images/kho/save.png")}
                  alt=""
                ></img>
              }
              onClick={onSave}
              type={"primary"}
              iconHeight={15}
            >
              {t("common.luu")}
            </Button>
          </Row>
        </div>
      </Main>
    </>
  );
};
export default MainBox;
