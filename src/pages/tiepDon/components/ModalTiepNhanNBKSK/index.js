import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Row, Checkbox, message, Col, AutoComplete } from "antd";
import { Main, ModalStyled } from "./styled";
import IcClose from "assets/images/kho/icClose.png";
import TableWrapper from "components/TableWrapper";
import { HeaderSearch, Button, InputTimeout, Select } from "components";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Pagination from "components/Pagination";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useLoading } from "hook";
import { debounce, uniqBy } from "lodash";
import dmHopDongKskProvider from "data-access/dm-hop-dong-ksk-provider";

const ModalTiepNhanNBKSK = (props, ref) => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const refCallback = useRef(null);

  const [state, _setState] = useState({
    show: false,
    checkAll: false,
    maHopDongKsk: "",
    tenHopDongKsk: "",
    tenDoiTac: "",
    maHDOptions: [],
    tenHDOptions: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  //redux
  const {
    danhSachNbKSK: {
      getListNguoiBenhKSK,
      getAllListNbKSK,
      updateData,
      onSizeChange,
      onChangeInputSearch,
      clearData,
    },
    nbKSK: { tiepDonNBKSK },
    doiTac: { getListAllDoiTac },
  } = useDispatch();

  const {
    danhSachNbKSK: {
      listNguoiBenhKSK,
      listChooseNbKSK = [],
      page,
      size,
      totalElements,
    },
    doiTac: { listAllDoiTac },
  } = useSelector((state) => state);

  const onClose = () => {
    clearData();
    updateData({ listChooseNbKSK: [] });
    setState({
      show: false,
      checkAll: false,
      maHopDongKsk: "",
      tenHopDongKsk: "",
      tenDoiTac: "",
    });
  };

  useEffect(() => {
    getListAllDoiTac({ dsLoaiDoiTac: 40, active: true });
  }, []);

  const listDoiTacMemo = useMemo(() => {
    return uniqBy(listAllDoiTac, (x) => x.id);
  }, [listAllDoiTac]);

  useImperativeHandle(ref, () => ({
    show: (data = {}, callback) => {
      setState({
        show: true,
        currentItem: data,
      });

      onChangeInputSearch({
        khamSucKhoe: true,
        active: true,
        trangThaiKsk: 10,
      });

      refCallback.current = callback;
    },
  }));

  const onSubmit = () => {
    if (listChooseNbKSK?.length > 0) {
      showLoading();

      const nBIds = listChooseNbKSK?.map((x) => x.id);

      tiepDonNBKSK(nBIds)
        .then(() => {
          if (refCallback.current) refCallback.current();

          hideLoading();
          onClose();
        })
        .catch(() => {
          hideLoading();
        });
    } else {
      message.error(t("tiepDon.vuiLongChonNguoiBenh"));
    }
  };

  //function
  function selectNbKSK(item) {
    return (e) => {
      const value = e.target.checked;
      if (value) {
        let _listChooseNbKSK = listChooseNbKSK;
        let _index = listChooseNbKSK?.findIndex((x) => x.id === item.id);
        if (_index === -1) {
          _listChooseNbKSK.push(item);
          setState({
            checkAll: _listChooseNbKSK.length === totalElements,
          });
          updateData({ listChooseNbKSK: _listChooseNbKSK });
        }
      } else {
        let _listChooseNbKSK = listChooseNbKSK.filter((x) => x.id !== item.id);
        setState({
          checkAll: false,
        });
        updateData({ listChooseNbKSK: _listChooseNbKSK });
      }
    };
  }

  function selectAllNbKSK(e) {
    const value = e.target.checked;

    setState({ checkAll: value });
    if (value) {
      getAllListNbKSK().then((res) => {
        updateData({ listChooseNbKSK: res });
      });
    } else {
      updateData({ listChooseNbKSK: [] });
    }
  }

  function onChange(key) {
    return (e) => {
      const value = e?.target ? e.target?.value : e;

      updateData({ listChooseNbKSK: [] });
      setState({ checkAll: false, [key]: value });

      onChangeInputSearch({
        [key]: value,
      });
    };
  }

  const onChangePage = (page) => {
    getListNguoiBenhKSK({ page: page - 1 });
    // updateData({ listChooseNbKSK: [] });
    // setState({ checkAll: false });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  const columns = [
    {
      title: (
        <HeaderSearch
          title={
            <Checkbox checked={state.checkAll} onChange={selectAllNbKSK} />
          }
        />
      ),
      width: 50,
      align: "center",
      render: (item) => {
        const checked =
          listChooseNbKSK?.findIndex((x) => x.id === item.id) !== -1;
        return <Checkbox onChange={selectNbKSK(item)} checked={checked} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã hồ sơ"
          search={
            <InputTimeout
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={onChange("maHoSo")}
            />
          }
        />
      ),
      dataIndex: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title="Tên người bệnh"
          search={
            <InputTimeout
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={onChange("tenNb")}
            />
          }
        />
      ),
      dataIndex: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title="Mã người bệnh"
          search={
            <InputTimeout
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={onChange("maNb")}
            />
          }
        />
      ),
      dataIndex: "maNb",
    },
    {
      title: (
        <HeaderSearch
          title="Mã hợp đồng"
          search={
            <InputTimeout
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              onChange={onChange("maHopDongKsk")}
            />
          }
        />
      ),
      dataIndex: "maHopDongKsk",
    },
    {
      title: <HeaderSearch title="Công ty" />,
      dataIndex: "tenDoiTac",
    },
  ];

  const searchHopDong = debounce((key, searchText) => {
    dmHopDongKskProvider
      .searchAll({
        active: true,
        [key]: searchText,
      })
      .then((res) => {
        setState({
          [`${key}HDOptions`]: (res?.data || []).map((item) => ({
            value: key == "ma" ? item.ma : item.ten,
          })),
        });
      });
  }, 1000);

  const onKeyDown = (key) => (e) => {
    if (e.keyCode === 13) {
      onChange(key)(e);
    }
  };

  return (
    <ModalStyled
      width={"75%"}
      visible={state.show}
      footer={null}
      closable={false}
      onCancel={onClose}
    >
      <Main>
        <Row className="header">
          <div className="header__left">
            <span>Tiếp nhận NB KSK</span>
            <span style={{ fontWeight: "bold" }}>{state.item?.tenDichVu}</span>
          </div>
          <div className="header__right" onClick={onClose}>
            <img src={IcClose} alt="..." />
          </div>
        </Row>
        <Row className="content">
          <Row>
            <Col span={12}>
              <div className="company-search">
                <label>Mã hợp đồng</label>
                <div className="search-input">
                  <AutoComplete
                    placeholder="Nhập để tìm kiếm mã hợp đồng"
                    onSelect={onChange("maHopDongKsk")}
                    onBlur={onChange("maHopDongKsk")}
                    onKeyDown={onKeyDown("maHopDongKsk")}
                    options={state.maHDOptions}
                    allowClear={true}
                    onSearch={(searchText) => searchHopDong("ma", searchText)}
                  />
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="company-search">
                <label>Tên hợp đồng</label>
                <div className="search-input">
                  <AutoComplete
                    placeholder="Nhập để tìm kiếm tên hợp đồng"
                    onSelect={onChange("tenHopDongKsk")}
                    onBlur={onChange("tenHopDongKsk")}
                    onKeyDown={onKeyDown("tenHopDongKsk")}
                    options={state.tenHDOptions}
                    allowClear={true}
                    onSearch={(searchText) => searchHopDong("ten", searchText)}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div className="company-search">
                <label>Tên Công ty</label>
                <div className="search-input">
                  <Select
                    placeholder="Chọn công ty"
                    data={listDoiTacMemo}
                    onChange={onChange("doiTacId")}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <div>
            Đã chọn <b>{listChooseNbKSK?.length} NB</b> cần tiếp nhận KSK
          </div>

          <div className="info">
            <TableWrapper
              bordered
              columns={columns}
              dataSource={listNguoiBenhKSK || []}
              rowKey={(record) => `${record.id}`}
            />

            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              listData={listNguoiBenhKSK}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
            />
          </div>
          <div className="footer-action">
            <Button.Text
              type="primary"
              leftIcon={<IcArrowLeft />}
              onClick={onClose}
            >
              {t("common.quayLai")}
            </Button.Text>

            <Button type="primary" onClick={() => onSubmit()}>
              Tiếp nhận NB KSK
            </Button>
          </div>
        </Row>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalTiepNhanNBKSK);
