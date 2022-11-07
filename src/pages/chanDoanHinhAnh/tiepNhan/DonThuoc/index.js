import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Input, message, Collapse } from "antd";
import TextField from "components/TextField";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import Header from "./components/header";
import Table from "./components/table";
import { StickyWrapper } from "pages/chanDoanHinhAnh/tiepNhan/StepWrapper/styled";
import { Main, MainTextFiled, CollapseWrapper } from "./styled";
import Select from "components/Select";
import { useSelector, useDispatch } from "react-redux";
import { ALL_DON_THUOC } from "pages/chanDoanHinhAnh/configs";
import imgSearch from "assets/images/template/icSearch.png";
import CustomPopover from "pages/chanDoanHinhAnh/tiepNhan/CustomPopover";
import TableDonThuoc from "../components/TableDonThuoc";
import ThongTinThuoc from "./components/ThongTinThuoc";
import { groupBy } from "lodash";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;
const DonThuoc = ({ elementKey, dataNbChiDinh, dataKho }) => {
  const { t } = useTranslation();
  const boChiDinh = useSelector((state) => state.boChiDinh.boChiDinh);
  const {
    auth: { auth },
    chiDinhDichVuTuTruc: {
      listDvKho,
      listGoiDv,
      dataNb,
      listDvTonKho,
      listDvThuoc,
    },
    utils: { listloaiDonThuoc },
    lieuDung: { listAllLieuDung },
  } = useSelector((state) => state);

  const {
    duongDung: { getListAllDuongDung },
    chiDinhDichVuTuTruc: {
      searchDv,
      tamTinhTien,
      chiDinhDichVu,
      updateData,
      getListDichVuTonKho,
      getListDichVuThuoc,
    },
    quanTriKho: { getData },
    utils: { getUtils },
    donViTinh: { getListAllDonViTinh },
  } = useDispatch();

  const ThongTinThuocRef = useRef(null);
  const [state, _setState] = useState({
    visible: false,
    listDichVu: [],
    listSelectedDv: [],
    listGoiDv: [],
    isCheckAll: false,
    indeterminate: false,
    loadingChiDinh: false,
    isGoiDichVu: false,
    thanhTien: 0,
    listAllDichVu: [],
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const refScrollThisElement = useRef(null);

  useEffect(() => {
    getData({ size: 999 });
    getUtils({ name: "loaiDonThuoc" });
    getListAllDonViTinh({ page: "", size: "" });
    getListAllDuongDung({ page: "", size: "" });
  }, []);

  useEffect(() => {
    if (elementKey === 1) {
      searchDv({ loaiDichVu: 90 });
    }
  }, [elementKey]);
  const listPanel = useMemo(() => {
    const grouped = groupBy(listDvThuoc, "loaiDonThuoc");
    return Object.keys(grouped).map((key) => {
      let groupByIdArr = grouped[key];
      return {
        header: (
          <Header
            title={(listloaiDonThuoc || []).find((x) => x.id == key)?.ten}
            listDvThuoc={groupByIdArr}
            nbDotDieuTriId={dataNbChiDinh?.nbDotDieuTriId}
            chiDinhTuDichVuId={dataNbChiDinh?.id}
          />
        ),
        content: (
          <Table
            title={t("khamBenh.donThuoc.thuocDieuTri")}
            listDvThuoc={groupByIdArr}
            nbDotDieuTriId={dataNbChiDinh?.nbDotDieuTriId}
            listloaiDonThuoc={key}
            chiDinhTuDichVuId={dataNbChiDinh?.id}
          />
        ),
        key,
      };
    });
  }, [listDvThuoc]);

  //Select Component ChiDinh  ------------------------------------------------------------------------------------
  const listGoiDvFilter = useMemo(() => {
    if (!listGoiDv) return [];
    if (!state.filterText) return listGoiDv;
    return listGoiDv.filter(
      (item) =>
        item.ten.toLowerCase().unsignText().indexOf(state.filterText) >= 0
    );
  }, [state.filterText, listGoiDv, state.loaiDichVu]);

  useEffect(() => {
    getListDichVuThuoc({
      nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
      chiDinhTuDichVuId: dataNbChiDinh?.id,
    });
  }, [dataNbChiDinh?.nbDotDieuTriId, dataNbChiDinh?.id]);

  useEffect(() => {
    const { listSelectedDv } = state;
    const listSelectedUniqueKey = listSelectedDv.map((item) => item.uniqueKey);

    let arr = [];
    let arrAll = [];
    switch (state.loaiDonThuoc) {
      case 10: {
        arr = listDvKho;
        break;
      }
      default: {
        arr = listDvTonKho;
        break;
      }
    }

    let listDichVu = [];

    const result = arr.map((item, index) => ({
      ...item,
      key: index,
      uniqueKey: `${item.id}-${item.dichVuId}`,
    }));
    listDichVu = result;

    setState({
      listDichVu,
      listAllDichVu: arrAll,
      isCheckAll: listDichVu.every((item) =>
        listSelectedUniqueKey.includes(item.uniqueKey)
      ),
    });
  }, [listDvKho, listDvTonKho]);

  const onSelectedAll = (e, currentListDataKey) => {
    const { listDichVu, listSelectedDv } = state;
    if (!listDichVu.length) return;
    const { checked } = e.target;
    let updatedListDv = [];
    if (checked) {
      updatedListDv = [...listSelectedDv, ...listDichVu];
    } else {
      updatedListDv = listSelectedDv.filter(
        (item) => !currentListDataKey.includes(item.uniqueKey)
      );
    }
    updatedListDv = updatedListDv.filter((item, index, self) => {
      return (
        self.findIndex((item2) => item2.dichVuId === item.dichVuId) === index
      );
    });
    onTamTinhTien(updatedListDv, checked);
  };

  const onTamTinhTien = (listSelected, isCheckAll) => {
    const payload = listSelected.map((item) => ({
      nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
      nbDichVu: {
        dichVuId: item?.dichVuId,
        soLuong: item.soLuong,
        dichVu: {
          id: item?.id,
          ma: item?.ma,
          ten: item?.ten,
          hamLuong: item?.hamLuong,
          tenHoatChat: item?.tenHoatChat,
        },
        khoaChiDinhId: dataNbChiDinh?.khoaChiDinhId,
      },
    }));
    tamTinhTien(payload).then((s) => {
      const thanhTien = (s || []).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.nbDichVu.thanhTien,
        0
      );

      const listSelectedUniqueKey = listSelected.map((item) => item.uniqueKey);
      setState({
        visible: true,
        thanhTien: thanhTien,
        listSelectedDv: listSelected,
        indeterminate:
          listSelected.length && listSelected.length < state.listDichVu.length,
        isCheckAll:
          isCheckAll ||
          state.listDichVu.every((item) =>
            listSelectedUniqueKey.includes(item.uniqueKey)
          ),
      });
    });
  };
  const onSelected = (data) => {
    onTamTinhTien(data);
  };

  const onSelectedBoChiDinh = (itemSelected) => {
    let item = {};
    let obj = {
      loaiDichVu: 90,
      notCallBoChiDinh: true,
    };

    if (itemSelected.id !== state.boChiDinhSelected?.id) {
      //nếu item không giống thì sẽ thêm vào
      item = itemSelected;
    }
    if (!!item.id) {
      obj.boChiDinhId = item.id;
    }
    getListDichVuTonKho({ ...obj, khoId: state.khoId });
  };

  const {
    listDichVu,
    listSelectedDv,
    thanhTien,
    isCheckAll,
    indeterminate,
    isGoiDichVu,
    loaiDonThuoc,
  } = state;
  const renderContent = useCallback(() => {
    return (
      <TableDonThuoc
        dataNb={dataNb}
        data={listDichVu}
        listSelected={listSelectedDv}
        thanhTien={thanhTien}
        onSelected={onSelected}
        checkAll={isCheckAll}
        onSelectedAll={onSelectedAll}
        boChiDinh={boChiDinh}
        boChiDinhSelected={state.boChiDinhSelected}
        onSelectedBoChiDinh={onSelectedBoChiDinh}
        listAllLieuDung={listAllLieuDung}
        khoId={state?.khoId}
        loaiDonThuoc={state?.loaiDonThuoc}
        loaiDichVu={90}
      />
    );
  }, [
    elementKey,
    listDichVu,
    listSelectedDv,
    thanhTien,
    isCheckAll,
    indeterminate,
    isGoiDichVu,
    listGoiDvFilter,
    loaiDonThuoc,
    boChiDinh,
    listAllLieuDung,
    state?.khoId,
  ]);
  const disableChiDinh = useMemo(() => {
    return !dataNb?.dsCdChinh?.length && !dataNb?.cdSoBo;
  }, [dataNb?.id, dataNb?.cdSoBo, dataNb?.dsCdChinh]);
  useEffect(() => {
    if (elementKey !== 1) return;
    if (!!dataNb?.cdSoBo || dataNb?.dsCdChinhId.length > 0) {
      searchDv({});
    } else {
      updateData({
        listDvKho: [],
      });
    }
  }, [disableChiDinh, elementKey]);

  const onSelectServiceStorage = (value) => {
    setState({
      khoId: value,
      indeterminate: false,
    });
    getListDichVuTonKho({ khoId: value, loaiDichVu : 90 });
  };

  const handleVisible = (e) => {
    setState({
      visible: true,
    });
  };

  const onSubmit = () => {
    const { listSelectedDv } = state;
    if (!listSelectedDv.length) {
      message.error(t("khamBenh.chiDinh.yeuCauNhapChiDinhDichVu"));
      return;
    }
    setState({
      loadingChiDinh: true,
    });
    const dataTable = listSelectedDv.map((item) => {
      return {
        nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
        lieuDungId: item.lieuDungId,
        nbDichVu: {
          dichVuId: item?.dichVuId,
          soLuong: item.soLuong,
          chiDinhTuDichVuId: dataNbChiDinh?.id,
          chiDinhTuLoaiDichVu: dataNbChiDinh?.loaiDichVu,
          khoaChiDinhId: dataNbChiDinh?.khoaChiDinhId,
          loaiDichVu: item?.loaiDichVu,
          dichVu: {
            id: item?.id,
            ma: item?.ma,
            ten: item?.ten,
            hamLuong: item?.hamLuong,
            tenHoatChat: item?.tenHoatChat,
          },
        },
        nbDvKho: {
          khoId: state.khoId,
        },
      };
    });
    chiDinhDichVu(dataTable)
      .then((s) => {
        setState({
          loadingChiDinh: false,
          listSelectedDv: [],
        });
        if (s?.code === 0) {
          getListDichVuThuoc({
            nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
            chiDinhTuDichVuId: dataNbChiDinh?.id,
          });
          onClosePopup();
        }
        let newTable = s?.neededUpdateRecord.filter((x) => {
          return x.code === 8501;
        });
        if (newTable.length > 0)
          ThongTinThuocRef.current &&
            ThongTinThuocRef.current.show({ newTable });
      })
      .catch(() => {
        setState({
          loadingChiDinh: false,
        });
      });
  };

  const onClosePopup = () => {
    setState({
      visible: false,
      thanhTien: 0,
      listDichVu: state.listDichVu,
      isCheckAll: false,
      indeterminate: false,
      loadingChiDinh: false,
      listSelectedDv: [],
    });
  };
  const handleSearch = (e) => {
    const { loaiDichVu } = state;
    const valueText = e.target.value?.trim().toLowerCase().unsignText();
    setState({
      filterText: valueText,
    });
    if (loaiDichVu === 200) return;
    const listDichVu = state.listAllDichVu
      .filter(
        (option) =>
          option?.ten?.toLowerCase().unsignText().indexOf(valueText) >= 0
      )
      .map((item, idx) => ({
        ...item,
        key: idx,
      }));
    setState({
      listDichVu,
    });
  };
  //End Select Component ChiDinh

  return (
    <Main>
      <div
        onClick={(e) => e.target.scrollIntoView()}
        ref={refScrollThisElement}
      ></div>
      <StickyWrapper>
        <MainTextFiled>
          <TextField label={t("khamBenh.donThuoc.bacSiChiDinh")} html={auth.full_name} />

          <div className="select-box">
            <div>{t("khamBenh.donThuoc.themChiDinh")} &nbsp;</div>
            <div className="wrapper-select">
              <Select value={30} data={ALL_DON_THUOC} disabled />
            </div>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <div>
              <Select
                data={dataKho}
                style={{ width: "200px" }}
                onChange={onSelectServiceStorage}
              />
            </div>
            <div className="addition-box">
              <div className="input-box">
                <img src={imgSearch} alt="imgSearch" />
                <CustomPopover
                  width={1500}
                  icon={null}
                  onSubmit={onSubmit}
                  onCancel={onClosePopup}
                  isDisabledSubmitButton={listSelectedDv.length <= 0}
                  text={
                    <Input placeholder={t("khamBenh.donThuoc.chonThuoc")} onChange={handleSearch} disabled={state.visible}/>
                  }
                  contentPopover={renderContent()}
                  visible={state.visible}
                  handleVisible={handleVisible}
                  placement="bottom"
                  loadingBtn={state.loadingChiDinh}
                />
              </div>
            </div>
          </div>
        </MainTextFiled>
      </StickyWrapper>
      <div className="collapse-content">
        <CollapseWrapper
          bordered={false}
          defaultActiveKey={["1", "2"]}
          expandIcon={({ isActive }) => (
            <IcArrow
              style={
                isActive
                  ? { transform: "rotate(90deg)" }
                  : { transform: "unset" }
              }
            />
          )}
          className="site-collapse-custom-collapse"
        >
          {listPanel.map((panel) => (
            <Panel key={panel.key} header={panel.header}>
              {panel.content}
            </Panel>
          ))}
        </CollapseWrapper>
      </div>
      <ThongTinThuoc ref={ThongTinThuocRef} khoId={state.khoId}></ThongTinThuoc>
    </Main>
  );
};

export default DonThuoc;
