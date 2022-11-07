import React, { useRef, useState, useEffect, memo, useMemo } from "react";
import { Tag, Checkbox, Button, Row, Col } from "antd";
import { VariableSizeList as CustomVirtualizeList } from "react-window";
import { RightOutlined } from "@ant-design/icons";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import { BoxWrapper, BlankContentWrapper } from "./styled";
import { debounce } from "lodash";
import { Element, scroller, Link } from "react-scroll";
import arrowRight from "assets/images/khamBenh/next-arrrow.png"
import { useTranslation } from "react-i18next";

const TableLoaiDV = ({
  hasChildren = false,
  data = [],
  onSelected,
  thanhTien,
  checkAll,
  onSelectedAll,
  indeterminate,
  listGoiDv,
  getDvChiTiet,
  listSelected,
  disableChiDinh,
  handleCloseTag,
  dataNb,
  boChiDinh = {},
  boChiDinhSelected,
  onSelectedBoChiDinh
}) => {
  const { t } = useTranslation();
  const listRef = useRef();
  const [activeLink, setActiveLink] = useState(-1);
  const [state, _setState] = useState({
    scrollKey: 0,
    offset: 50
  });

  const setState = (data) => {
    _setState((state) => {
      return {
        ...state,
        ...data,
      };
    });
  };
  useEffect(() => {
    return () => {
      _setState({
        scrollKey: 0
      })
    }
  }, [])

  const getItemSize = () => 50;
  const onCloseTag = (value) => () => {
    const listUpdatedTag = listSelected.filter(
      (item) => item.dichVuId !== value
    );
    handleCloseTag(listUpdatedTag);
  };

  useEffect(() => {
    if (!listSelected.length) {
      setActiveLink(-1);
    }
  }, [listSelected]);

  const handleSelect = (idx) => (e) => {
    onSelected(idx, e.target.checked);
  };

  const RowItems = ({ index, style }) => {
    const currentRow = data[index];
    const giaKhongBaoHiem = (currentRow.giaKhongBaoHiem || 0).formatPrice();
    const giaBaoHiem = (currentRow.giaBaoHiem || 0).formatPrice();
    const giaPhuThu = (currentRow.giaPhuThu || 0).formatPrice();
    const donGia = `${giaKhongBaoHiem} | ${t("khamBenh.chiDinh.BH")}: ${giaBaoHiem} | ${t("khamBenh.chiDinh.phuThu")}: ${giaPhuThu}`;
    return (
      <div
        className={index % 2 ? "item-odd row-item" : "item-even row-item"}
        onClick={handleSelect(index)}
        style={style}
      >
        <div className="left-box">
          <Checkbox
            checked={
              !!listSelected.find(
                (item) => item.uniqueKey === currentRow.uniqueKey
              )
            }
          />
        </div>
        <div className="right-box">
          <div className="name">
            <b>{currentRow?.ten}</b>
          </div>
          <div className="desc">{donGia}</div>
        </div>
      </div>
    );
  };

  const onSelectDv = (dichVuId, idx) => (e) => {
    setActiveLink(idx);
    getDvChiTiet(dichVuId);
    e.preventDefault();
  };

  const onCheckAll = (e) => {
    onSelectedAll(
      e,
      data.map((item) => item.uniqueKey)
    );
  };

  return (
    <BoxWrapper>
      {hasChildren && (
        <div className="content-equal-w">
          <ul className="list-item">
            {listGoiDv.map((item, idx) => (
              <li
                className={`name-item ${
                  activeLink === idx ? `active-item` : ""
                  }`}
                onClick={onSelectDv(item.dichVuId, idx)}
                key={item.dichVuId}
              >
                {item.ten} <RightOutlined className="arrow-icon" />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="content-equal-w">
        {!hasChildren && (
          <Row>
            <Col span={1} className="navigation-left">
              <Link
                horizontal={true}
                containerId="containerElementBoChiDinh"
                className="navigation-left"
                to={"0"}
                // offset={state.offset}
                smooth={true}
                duration={500}
                onClick={(e) => {
                  setState({
                    scrollKey: state.scrollKey + -1,
                    offset: state.offset - 50,
                  })
                }}
              >
                {/* <span>&#62;</span> */}
                <img src={arrowRight} alt="btn-collapse" />
              </Link>
            </Col>
            <Col span={22}>
              <Element
                name="tableLoaiDV"
                className="element section-body group-service"
                id="containerElementBoChiDinh"
              >
                {boChiDinh && (boChiDinh?.data || []).map((item, index) => {
                  return (
                    <Element name={`${index}`} key={index}>
                      <Col>
                        <Button
                          key={item.id}
                          className={`button-group-service ${item.id === boChiDinhSelected.id ? "active" : ""}`}
                          onClick={debounce(() => {
                            onSelectedBoChiDinh(item)
                          }, 300)}
                        >
                          {item.ten}
                        </Button>
                      </Col>
                    </Element>
                  )
                })}
              </Element>

            </Col>
            <Col
              className="navigation-right"
              span={1}
            >
              <Link
                horizontal={true}
                containerId="containerElementBoChiDinh"
                className="navigation-right"
                to={`${boChiDinh?.data?.length - 1}`}
                // offset={state.offset}
                smooth={true}
                duration={500}
                onClick={(e) => {
                  setState({
                    scrollKey: state.scrollKey + 1,
                    offset: state.offset + 50,
                  })
                }}
              >
                {/* <span>&#62;</span> */}
                <img src={arrowRight} alt="btn-collapse" />
              </Link>
            </Col>
          </Row>
        )}
        <div className="title-table">{t("common.dichVu")}</div>
        <>
          <div className="checkall">
            {data.length > 0 && (
              <>
                <Checkbox
                  checked={checkAll}
                  onChange={onCheckAll}
                  indeterminate={indeterminate}
                />
                <span className="text">{t("common.chonTatCa")}</span>
              </>
            )}
          </div>

          <CustomVirtualizeList
            height={hasChildren ? 400 : 350}
            itemCount={data?.length || 0}
            itemSize={getItemSize}
            width={`calc(100% - 7px)`}
            ref={listRef}
            className="custom-list"
          >
            {RowItems}
          </CustomVirtualizeList>
        </>
      </div>
      <div className="content-equal-w">
        <div className="title">
          <div className="title__left">
            <img src={CircleCheck} alt="" /> {t("common.daChon")}
          </div>
          <div className="title__right">
            {t("khamBenh.chiDinh.tongTien")}: {(thanhTien || 0).formatPrice()} đ
          </div>
        </div>
        <div className="content-body">
          {!listSelected.length || listSelected.length === 0 ? (
            <BlankContentWrapper>
              <div>
                {!!dataNb && (dataNb.cdSoBo?.length > 0 || dataNb.dsCdChinhId.length > 0)
                  ? t("khamBenh.chiDinh.yeuCauNhapChiDinhDichVu")
                  : t("khamBenh.chiDinh.yeuCauNhapChanDoanTruocChiDinhDichVu")
                }
              </div>
            </BlankContentWrapper>
          ) : (
              <>
                {listSelected.map((item) => (
                  <Tag
                    key={item.uniqueKey}
                    className="custom-tag"
                    color="green"
                    closable
                    onClose={onCloseTag(item.dichVuId)}
                  >
                    {item.ten}
                  </Tag>
                ))}
              </>
            )}
        </div>
      </div>
    </BoxWrapper >
  );
};

export default memo(TableLoaiDV);
