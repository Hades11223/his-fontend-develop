import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
  useMemo,
} from "react";
import { Main } from "./styled";
import { Input, Checkbox, Row, Col, List, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import DichVuDaChon from "../../components/DichVuDaChon";
import {
  SearchOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { cloneDeep, groupBy } from "lodash";
import { formatDecimal } from "../../../../utils";
import {
  Button,
  ModalTemplate,
  InputTimeout,
  Select,
  TableWrapper,
} from "components";
import { ENUM, LOAI_DICH_VU } from "constants/index";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";

const ModalThemMoiGoiDichVu = (props, ref) => {
  const refFuncSubmit = useRef(null);
  const refInputTenGoi = useRef(null);
  const { refreshList, goiDV, hopDongKskId } = props;
  const { t } = useTranslation();
  const refModal = useRef(null);
  const [listloaiDichVu] = useEnum(ENUM.LOAI_DICH_VU, []);
  //state
  const [state, _setState] = useState({
    loaiDichVu: LOAI_DICH_VU.BO_CHI_DINH,
    textSearchDv: "",
    defaultChooseDv: [],
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const [formState, setFormState] = useState({
    ma: "",
    ten: "",
  });

  const [selectedGoiDV, setSelectedGoiDV] = useState(null);

  //redux
  const {
    dichVuKSK: {
      listDVKSK,
      listChooseDV,
      ttGoi,
      validGoi,
      listGoiDVKSK,
      dsGoi,
    },
  } = useSelector((state) => state);

  const {
    auth: { auth = {} },
    dichVuKSK: {
      searchDvKSK,
      updateData,
      postGoiDichVu,
      validateTTGoi,
      deleteMultiDichVuChiTiet,
      updateGoiDichVu,
      insertMultipleDichVuChiTiet,
      updateDichVuChiTiet,
    },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        loaiDichVu: LOAI_DICH_VU.BO_CHI_DINH,
        textSearchDv: "",
      });

      updateData({
        ttGoi: {
          ma: "",
          ten: "",
        },
      });
    },
  }));

  //effect
  useEffect(() => {
    if (state.show) {
      onGetListService({ loaiDichVu: state.loaiDichVu });
    }
  }, [state.show]);

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  useEffect(() => {
    if (goiDV.id) {
      const groupGoi = groupBy(dsGoi, "boChiDinhId");
      if (!groupGoi[goiDV.id]) {
        updateData({
          listChooseDV: [],
        });
        setState({
          defaultChooseDv: [],
        });

        return;
      }
      updateData({
        listChooseDV: groupGoi[goiDV.id].map((x) => ({
          ...x,
          ten: x.tenDichVu,
          uniqueKey: `${x.id || "dv"}-${x.dichVuId}`,
        })),
      });
      setState({
        defaultChooseDv: groupGoi[goiDV.id].map((x) => ({
          ...x,
          uniqueKey: `${x.id || "dv"}-${x.dichVuId}`,
        })),
      });

      setFormState({
        ...formState,
        ma: groupGoi[goiDV.id][0]?.maBoChiDinh,
        ten: groupGoi[goiDV.id][0]?.tenBoChiDinh,
      });

      updateData({
        ttGoi: {
          ma: groupGoi[goiDV.id][0]?.maBoChiDinh,
          ten: groupGoi[goiDV.id][0]?.tenBoChiDinh,
        },
      });
    }
  }, [goiDV, dsGoi]);

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

  const isThemMoi = useMemo(() => {
    if (goiDV.id) return false;

    return true;
  }, [goiDV]);

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
  const onGetListService = (payload = {}) => {
    searchDvKSK({
      ...payload,
      sort: "ma",
      dsDoiTuongSuDung: [40],
    });
  };

  const onSelectService = (item) => (e) => {
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
    } else {
      _listChooseDV = _listChooseDV.filter(
        (x) => x.uniqueKey !== item.uniqueKey
      );
    }

    updateData({
      listChooseDV: _listChooseDV,
    });
  };

  const onChangeGroupService = (value) => {
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
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  refFuncSubmit.current = onSubmit;

  const onClose = () => {
    updateData({
      listChooseDV: [],
      listDVKSK: [],
    });

    setSelectedGoiDV(null);
    setFormState({ ma: "", ten: "" });
    setState({ show: false, textSearchDv: "" });
  };

  function onRow(record, index) {
    return {
      onClick: (event) => {
        const _findIndex = listChooseDV.findIndex(
          (x) => x.uniqueKey === record.uniqueKey
        );

        const e = { target: { checked: _findIndex === -1 } };
        onSelectService(record)(e);
      },
    };
  }

  function handleChangeData(value, variables) {
    setFormState({ ...formState, [`${variables}`]: value });
  }

  function onBlur(value, variables) {
    updateData({
      ttGoi: {
        ...ttGoi,
        [`${variables}`]: value,
      },
    });
  }

  async function onSave() {
    if (listChooseDV && listChooseDV.length === 0) {
      message.error("Vui lòng chọn dịch vụ trong gói!");
      return;
    }
    validateTTGoi().then(async () => {
      if (isThemMoi) {
        postGoiDichVu({
          hopDongKskId,
          ...ttGoi,
        }).then((data) => {
          insertDichVu(data.id);
        });
      } else {
        //sửa thông tin gói
        await updateGoiDichVu({
          id: goiDV.id,
          hopDongKskId,
          ...{
            ten: ttGoi.ten,
            ma: ttGoi.ma,
          },
        });

        //add những dịch vụ mới
        const _addDv = listChooseDV.filter(
          (x1) =>
            state.defaultChooseDv.findIndex(
              (x2) => x2.uniqueKey === x1.uniqueKey
            ) == -1
        );
        if (_addDv && _addDv.length > 0) {
          await insertMultipleDichVuChiTiet(
            _addDv.map((item) => ({
              boChiDinhId: goiDV.id,
              dichVuId: item.dichVuId,
              soLuong: item.soLuong || 1,
              phongId: item.dsPhongThucHien && item.dsPhongThucHien[0]?.phongId,
            }))
          );
        }

        //xóa những dịch vụ cũ
        const _deleteDv = state.defaultChooseDv.filter(
          (x1) =>
            listChooseDV.findIndex((x2) => x2.uniqueKey === x1.uniqueKey) == -1
        );
        if (_deleteDv && _deleteDv.length > 0) {
          await deleteMultiDichVuChiTiet(_deleteDv.map((x) => x.id));
        }

        //update những dịch vụ có thay đổi
        const _updateDv = listChooseDV.filter((x) => x.isNeedUpdate);
        await Promise.all(
          (_updateDv || []).map(async (x) => {
            await updateDichVuChiTiet({
              id: x.id,
              soLuong: x.soLuong,
              phongId: x.phongId,
            });
          })
        );

        //refresh list dịch vụ
        onClose();
        refreshList({ trongGoi: true });
      }
    });
  }

  async function insertDichVu(goiDichVuId) {
    const payload = listChooseDV.map((x) => ({
      hopDongKskId,
      boChiDinhId: goiDichVuId,
      dichVuId: x.dichVuId,
      soLuong: x.soLuong || 1,
      phongId: x.phongId,
    }));
    insertMultipleDichVuChiTiet(payload).then((s) => {
      onClose();
      refreshList({ trongGoi: true });
    });
  }

  function onSelectGoiDV(item) {
    return () => {
      setSelectedGoiDV(item);
      onGetListService({ boChiDinhId: item.dichVuId });
    };
  }

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

  const isCheckedAll = useMemo(() => {
    if (!listDVKSKMemo || listDVKSKMemo.length === 0) return false;

    const found = listDVKSKMemo.every(
      (r) => listChooseDV.findIndex((x) => x.uniqueKey === r.uniqueKey) !== -1
    );

    return found;
  }, [listChooseDV, listDVKSKMemo]);

  function onChangeChooseItem(key, item) {
    return (e) => {
      let _listChooseDV = cloneDeep(listChooseDV);
      const _findDvIndex = _listChooseDV.findIndex(
        (x) => x.dichVuId === item.dichVuId
      );

      if (_findDvIndex !== -1) {
        _listChooseDV[_findDvIndex][key] = e;
        _listChooseDV[_findDvIndex].isNeedUpdate = true;

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
    {
      dataIndex: "donGia",
      type: true,
      width: 150,
      hideSearch: true,
    },
  ];

  function onDeleteItem(id) {
    let _listChooseDV = listChooseDV.filter((x) => x.uniqueKey !== id);

    updateData({
      listChooseDV: _listChooseDV,
    });
  }

  const onSearchService = (e) => {
    setState({ textSearchDv: e });
  };

  const { ma, ten } = formState;

  return (
    <ModalTemplate
      ref={refModal}
      width="90%"
      closable={false}
      onCancel={onClose}
      title={
        <div className="title">
          {isThemMoi ? "Thêm mới gói dịch vụ" : "Chỉnh sửa gói dịch vụ"}
        </div>
      }
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
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
              <Col className="noPadding" md={6}>
                <div className="input__wrapper">
                  Mã gói:
                  <Input
                    className="input-goi ma-disable"
                    value={ma}
                    disabled={true}
                    readOnly={true}
                    onChange={(e) => handleChangeData(e.target.value, "ma")}
                    onBlur={(e) => onBlur(e.target.value, "ma")}
                  />
                  {/* {!validGoi.ma && (
                      <div className="error">Vui lòng nhập mã gói!</div>
                    )} */}
                </div>
              </Col>

              <Col className="noPadding" md={18}>
                <div className="input__wrapper input__wrapper-2">
                  Tên gói:<span style={{ color: "red" }}>*</span>
                  <Input
                    ref={refInputTenGoi}
                    className="input-goi"
                    value={ten}
                    onChange={(e) => handleChangeData(e.target.value, "ten")}
                    onBlur={(e) => onBlur(e.target.value, "ten")}
                  />
                  {!validGoi.ten && (
                    <div className="error">Vui lòng nhập tên gói!</div>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="noPadding" md={6}>
                <Select
                  onChange={onChangeGroupService}
                  defaultValue=""
                  value={state.loaiDichVu}
                  placeholder={"Chọn gói dịch vụ"}
                  data={dataloaiDichVu}
                  className="select__goiDichVu"
                />
              </Col>

              <Col className="noPadding" md={18}>
                <InputTimeout
                  className="searchDV"
                  placeholder="Nhập để thêm dịch vụ"
                  value={state.textSearchDv}
                  onChange={onSearchService}
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
                  rowKey={(record, index) => record.id || record.dichVuId}
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

export default forwardRef(ModalThemMoiGoiDichVu);
