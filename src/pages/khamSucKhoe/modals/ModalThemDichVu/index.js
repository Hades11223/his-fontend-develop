import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Main } from "./styled";
import { Checkbox, Row, Col, List, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import DichVuDaChon from "../../components/DichVuDaChon";
import {
  SearchOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { formatDecimal } from "../../../../utils";
import { Button, ModalTemplate, InputTimeout, TableWrapper } from "components";
import { cloneDeep } from "lodash";
import { ENUM, LOAI_DICH_VU } from "constants/index";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";

const ModalThemMoiDichVu = (props, ref) => {
  const { refreshList, data, goiDV, hopDongKskId } = props;
  const { t } = useTranslation();
  const refModal = useRef(null);
  const [listloaiDichVu] = useEnum(ENUM.LOAI_DICH_VU, []);

  //state
  const [state, _setState] = useState({
    loaiDichVu: 10,
    checkAll: false,
    textSearchDv: "",
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
        checkAll: false,
        textSearchDv: "",
      });
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  //redux
  const {
    dichVuKSK: { listDVKSK, listChooseDV, listGoiDVKSK },
  } = useSelector((state) => state);

  const {
    auth: { auth = {} },
    dichVuKSK: { searchDvKSK, updateData, insertMultipleDichVuChiTiet },
  } = useDispatch();

  const [selectedGoiDV, setSelectedGoiDV] = useState(null);

  //effect
  useEffect(() => {
    if (state.show) {
      onGetListService({ loaiDichVu: state.loaiDichVu });
    }
  }, [state.show]);

  //memo
  const dataloaiDichVu = useMemo(() => {
    return [
      ...listloaiDichVu.filter((allItem) =>
        [
          LOAI_DICH_VU.KHAM,
          LOAI_DICH_VU.XET_NGHIEM,
          LOAI_DICH_VU.CDHA,
          LOAI_DICH_VU.BO_CHI_DINH,
          LOAI_DICH_VU.NGOAI_DIEU_TRI,
        ].includes(allItem.id)
      ),
      {
        ten: "Tất cả loại phiếu chỉ định",
        id: "",
      },
    ];
  }, [listloaiDichVu, auth]);

  const listDVKSKMemo = useMemo(() => {
    const searchTxt = state.textSearchDv?.toLowerCase().unsignText() || "";

    const _listDVKSKFilter =
      state.loaiDichVu === LOAI_DICH_VU.BO_CHI_DINH
        ? listDVKSK
        : listDVKSK.filter(
            (option) =>
              option?.ten?.toLowerCase().unsignText().indexOf(searchTxt) >= 0
          );

    return _listDVKSKFilter.map((item) => {
      const donGia = `${formatDecimal(
        item.giaKhongBaoHiem
      )} | BH: ${formatDecimal(item.giaBaoHiem)} | Phụ thu: ${formatDecimal(
        item.giaPhuThu
      )}`;
      return {
        ...item,
        donGia,
        uniqueKey: `${item.id || "dv"}-${item.dichVuId}`,
      };
    });
  }, [listDVKSK, listChooseDV, state.textSearchDv, state.loaiDichVu]);

  const isCheckedAll = useMemo(() => {
    if (!listDVKSKMemo || listDVKSKMemo.length === 0) return false;

    const found = listDVKSKMemo.every(
      (r) => listChooseDV.findIndex((x) => x.uniqueKey === r.uniqueKey) !== -1
    );

    return found;
  }, [listChooseDV, listDVKSKMemo]);

  const listGoiDVMemo = useMemo(() => {
    const searchTxt = state.textSearchDv?.toLowerCase().unsignText() || "";

    return state.loaiDichVu !== LOAI_DICH_VU.BO_CHI_DINH
      ? listGoiDVKSK
      : listGoiDVKSK.filter(
          (option) =>
            option?.ten?.toLowerCase().unsignText().indexOf(searchTxt) >= 0
        );
  }, [listGoiDVKSK, state.textSearchDv, state.loaiDichVu]);

  //function
  function onGetListService(payload = {}) {
    searchDvKSK({
      ...payload,
      sort: "ma",
      dsDoiTuongSuDung: [40],
    });
  }
  function onSelectService(item) {
    return async (e) => {
      const { checked } = e.target;
      let _listChooseDV = cloneDeep(listChooseDV);

      if (checked) {
        if (_listChooseDV.findIndex((x) => x.dichVuId == item.dichVuId) > -1) {
          message.error(`Dịch vụ ${item.ten} đã tồn tại.`);
        }

        _listChooseDV.push({
          ...item,
          soLuong: item.soLuong || 1,
          phongId: item.dsPhongThucHien && item.dsPhongThucHien[0]?.phongId,
        });
        setState({
          checkAll: _listChooseDV.length === listDVKSKMemo.length,
        });
      } else {
        setState({
          checkAll: false,
        });
        _listChooseDV = _listChooseDV.filter(
          (x) => x.uniqueKey !== item.uniqueKey
        );
      }
      updateData({
        listChooseDV: _listChooseDV,
      });
    };
  }

  function onChangeGroupService(value) {
    setState({ loaiDichVu: value });
    onGetListService({
      ...(value
        ? { loaiDichVu: value }
        : {
            dsLoaiDichVu: [
              LOAI_DICH_VU.KHAM,
              LOAI_DICH_VU.XET_NGHIEM,
              LOAI_DICH_VU.CDHA,
              LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
            ],
          }),
    });
  }

  function onClose() {
    updateData({
      listChooseDV: [],
    });

    setState({ show: false });
  }

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        const _findIndex = listChooseDV.findIndex(
          (x) => x.uniqueKey === record.uniqueKey
        );

        const e = { target: { checked: _findIndex === -1 } };
        onSelectService(record)(e);
      },
    };
  };

  const onSave = async () => {
    // let listDichVuId = (data || []).map((x) => x.dichVuId);
    let payload = (listChooseDV || [])
      // .filter((item) => !listDichVuId.includes(item.dichVuId))
      .map((item2) => {
        return {
          hopDongKskId,
          dichVuId: item2?.dichVuId,
          soLuong: item2.soLuong,
          phongId: item2.phongId,
        };
      });
    insertMultipleDichVuChiTiet(payload).then((s) => {
      onClose();
      refreshList({ trongGoi: false });
    });
  };

  useEffect(() => {
    state.show &&
      state.loaiDichVu === LOAI_DICH_VU.BO_CHI_DINH &&
      selectAllDV();
  }, [listDVKSK]);

  function selectAllDV(e) {
    const value = !e ? true : e.target.checked;

    if (value) {
      const _listChooseDV = [
        ...listDVKSKMemo
          .filter(
            (x1) =>
              listChooseDV.findIndex((x2) => x1.uniqueKey == x2.uniqueKey) == -1
          )
          .map((item) => ({
            ...item,
            soLuong: item.soLuong || 1,
            phongId: item.dsPhongThucHien && item.dsPhongThucHien[0]?.phongId,
          })),
        ...listChooseDV,
      ];

      updateData({
        listChooseDV: _listChooseDV,
      });
      e &&
        listDVKSKMemo.forEach((element) => {
          if (
            listChooseDV.findIndex((x) => element.dichVuId == x.dichVuId) > -1
          ) {
            message.error(`Dịch vụ ${element.ten} đã tồn tại.`);
          }
        });
    } else {
      updateData({
        listChooseDV: listChooseDV.filter(
          (x1) =>
            listDVKSKMemo.findIndex((x2) => x2.uniqueKey === x1.uniqueKey) ===
            -1
        ),
      });
    }
  }

  function onChangeChooseItem(key, item) {
    return (e) => {
      let _listChooseDV = cloneDeep(listChooseDV);
      const _findDvIndex = _listChooseDV.findIndex(
        (x) => x.dichVuId === item.dichVuId
      );

      if (_findDvIndex !== -1) {
        _listChooseDV[_findDvIndex][key] = e;

        updateData({
          listChooseDV: _listChooseDV,
        });
      }
    };
  }

  const columns = [
    {
      title: (
        <div>
          <Checkbox checked={isCheckedAll} onChange={selectAllDV} />
        </div>
      ),
      width: 46,
      dataIndex: "checked",
      hideSearch: true,
      align: "center",
      render: (value, item, index) => {
        const _findIndex = listChooseDV.findIndex(
          (x) => x.uniqueKey === item.uniqueKey
        );

        return (
          <Checkbox
            id={"checkbox_dv_" + item.dichVuId}
            className="box-item"
            // onChange={onSelectService(item)}
            checked={_findIndex !== -1 ? true : false}
          />
        );
      },
    },
    {
      width: 250,
      dataIndex: "ten",
      type: true,
      hideSearch: true,
    },
    // {
    //   dataIndex: "soLuong",
    //   width: 80,
    //   render: (value, item, index) => {
    //     const _findIndex = listChooseDV.findIndex(
    //       (x) => x.dichVuId === item.dichVuId
    //     );

    //     return _findIndex !== -1 ? (
    //       <div onClick={(event) => event.stopPropagation()}>
    //         <InputTimeout
    //           type="number"
    //           value={listChooseDV[_findIndex].soLuong || 1}
    //           style={{ width: 50 }}
    //           min={1}
    //           step={1}
    //           onChange={onChangeSoLuong(item)}
    //         />
    //       </div>
    //     ) : null;
    //   },
    // },
    {
      dataIndex: "donGia",
      type: true,
      width: 150,
      hideSearch: true,
    },
  ];

  function onSelectGoiDV(item) {
    return () => {
      setSelectedGoiDV(item);

      onGetListService({ boChiDinhId: item.dichVuId });
    };
  }

  function onDeleteItem(id) {
    updateData({
      listChooseDV: listChooseDV.filter((x) => x.uniqueKey !== id),
    });
  }

  const onSearchService = (e) => {
    setState({ textSearchDv: e?.toLowerCase().unsignText() || "" });
  };

  return (
    <ModalTemplate
      width="90%"
      ref={refModal}
      closable={false}
      onCancel={onClose}
      title={
        <div className="header-title">
          <div className="title">Thêm mới dịch vụ</div>
          <div className="title-goi">{goiDV?.ten}</div>
        </div>
      }
      actionLeft={
        <Button.Text
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={onClose}
        >
          Quay lại
        </Button.Text>
      }
      actionRight={
        <Button onClick={onSave} type="primary">
          Lưu <SaveOutlined />
        </Button>
      }
    >
      <Main>
        <div className="info-content">
          <div className="success-content">
            <Row>
              <Col md={8}>
                <Select
                  className="select__goiDichVu"
                  defaultValue=""
                  onChange={onChangeGroupService}
                  value={state.loaiDichVu}
                  placeholder={"Chọn gói dịch vụ"}
                  data={dataloaiDichVu}
                />
              </Col>

              <Col md={16}>
                <InputTimeout
                  className="searchDV"
                  placeholder="Nhập để thêm dịch vụ"
                  onChange={(e) => onSearchService(e)}
                  suffix={<SearchOutlined />}
                />
              </Col>
            </Row>
          </div>

          <Row>
            {state.loaiDichVu == LOAI_DICH_VU.BO_CHI_DINH && (
              <Col md={6}>
                <div className="header">{t("khamSucKhoe.boChiDinh")}</div>
                <div className="list-goi-dichvu">
                  <div>
                    <List
                      bordered
                      dataSource={listGoiDVMemo}
                      renderItem={(item) => (
                        <List.Item
                          className={
                            item.dichVuId === selectedGoiDV?.dichVuId
                              ? "select-goi-item"
                              : "goi-item"
                          }
                          onClick={onSelectGoiDV(item)}
                        >
                          <div>{item.ten}</div>
                        </List.Item>
                      )}
                    />
                  </div>
                </div>
              </Col>
            )}

            <Col md={state.loaiDichVu == LOAI_DICH_VU.BO_CHI_DINH ? 9 : 12}>
              <div className="header">{t("common.dichVu")}</div>
              <div className="table-service">
                <TableWrapper
                  className="table"
                  rowKey={(record, index) =>
                    `${index} - ${record.dichVuId} - ${record.phongId}`
                  }
                  onRow={onRow}
                  rowClassName={(record) =>
                    record?.checked
                      ? "background-checked"
                      : "checkbox_dv_" + record.dichVuId === state.idFocus
                      ? "background-hover"
                      : ""
                  }
                  columns={columns}
                  dataSource={listDVKSKMemo}
                  headerMinHeight="auto"
                ></TableWrapper>
              </div>
            </Col>

            <Col md={state.loaiDichVu == LOAI_DICH_VU.BO_CHI_DINH ? 9 : 12}>
              <DichVuDaChon
                data={listChooseDV}
                onDeleteItem={onDeleteItem}
                onChangeChooseItem={onChangeChooseItem}
              />
            </Col>
          </Row>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalThemMoiDichVu);
