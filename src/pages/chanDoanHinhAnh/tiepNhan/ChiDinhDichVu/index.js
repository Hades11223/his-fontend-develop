import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Collapse, message, Input } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { groupBy, orderBy } from "lodash";
import DanhSachDichVu from "./DanhSachDichVu";
import { CollapseWrapper, StickyWrapper } from "./styled";
import { TRANG_THAI_DICH_VU, LOAI_DICH_VU } from "constants/index";
import { canEditOrUpdate } from "./utils";
import Select from "components/Select";
import imgSearch from "assets/images/template/icSearch.png";
import goiDichVuChiTietProvider from "data-access/categories/dm-goi-dich-vu-chi-tiet";
import { openInNewTab } from "utils";
import CustomPopover from "pages/chanDoanHinhAnh/tiepNhan/CustomPopover";
import TableLoaiDV from "pages/chanDoanHinhAnh/tiepNhan/components/TableLoaiDV";
import { LOAI_DICH_VU_CHI_DINH } from "../../configs";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import { refConfirm } from "app";

const { Panel } = Collapse;

const ChiDinhDichVu = (props) => {
  const { t } = useTranslation();
  const { elementKey } = props;
  const boChiDinh = useSelector((state) => state.boChiDinh.boChiDinh);
  const dataNb = useSelector((state) => state.chiDinhDichVuCls.dataNb);
  const listGoiDv = useSelector((state) => state.chiDinhDichVuCls.listGoiDv);
  const listDvKham = useSelector(
    (state) => state.chiDinhDichVuCls.listDvKham || []
  );
  const { dsDichVuChiDinhXN, dsDichVuChiDinhKham, dsDichVuChiDinhCls } =
    useSelector((state) => state.chiDinhDichVuCls);
  const trangThaiKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai
  );
  const { dataNbChiDinh = {} } = props;
  const {
    chiDinhDichVuCls: {
      getDsDichVuChiDinhXN,
      getDsDichVuChiDinhKham,
      getDsDichVuChiDinhCLS,
      onDeleteDichVu,
      updateData,
      searchDv,
      chiDinhDichVu,
      tamTinhTien,
    },
    benhPham: { getListAllBenhPham },
  } = useDispatch();

  const refScrollThisElement = useRef(null);
  const inputRef = useRef(null);
  const [state, _setState] = useState({
    deletingRecordName: "",
    deletingRecordLoaiDichVu: "",
    listDeletingId: [],
    activeKey: [],
    indeterminate: false,
    isGoiDichVu: false,
    visible: false,
    loadingChiDinh: false,
    listSelectedDv: [],
    listDichVu: [],
    isCheckAll: false,
    thanhTien: 0,
    boChiDinhSelected: {},
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
    if (dataNbChiDinh) {
      const payload = {
        chiDinhTuDichVuId: dataNbChiDinh?.id,
        nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
        chiDinhTuLoaiDichVu: dataNbChiDinh?.loaiDichVu,
      };
      getDsDichVuChiDinhXN(payload);
      getDsDichVuChiDinhKham(payload);
      getDsDichVuChiDinhCLS(payload);
      getListAllBenhPham({});
      // getListAllBenhPham({});
    }
  }, [dataNbChiDinh]);

  const onCollapsed = (value) => {
    setState({
      activeKey: value,
    });
  };
  const onDeletePhieu = (data) => () => {
    const listDichVuId = data
      .filter((item) => canEditOrUpdate(item.trangThai, item.loaiDichVu))
      .map((dichVu) => dichVu.id);

    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content:
            t("common.banCoChacMuonXoaPhieu") + data[0].tenPhieuChiDinh
              ? data[0].tenPhieuChiDinh
              : data[0].tenNhomDichVuCap1 + "?",
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeleteDichVu({
            listDeletingId: listDichVuId,
            loaiDichVu: data[0].loaiDichVu,
          }).then((s) => {
            if (s.code === 0) {
              getDsDichVu(data[0].loaiDichVu);
            }
          });
        }
      );
  };

  const getDsDichVu = (type) => {
    const payload = {
      chiDinhTuDichVuId: dataNbChiDinh?.id,
      nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
      chiDinhTuLoaiDichVu: dataNbChiDinh?.loaiDichVu,
    };
    switch (type) {
      case LOAI_DICH_VU.KHAM:
        getDsDichVuChiDinhKham(payload);
        break;
      case LOAI_DICH_VU.XET_NGHIEM:
        getDsDichVuChiDinhXN(payload);
        break;
      case LOAI_DICH_VU.CDHA:
        getDsDichVuChiDinhCLS(payload);
        break;
      default:
        break;
    }
  };

  const groupAndOrderItem = (items, groupkey, orderKey) => {
    const groupData = groupBy(items, "trangChiDinh");
    const data = {};
    Object.keys(groupData).forEach((trangChiDinh) => {
      data[`${trangChiDinh}-${groupkey}`] = orderBy(
        groupData[trangChiDinh],
        orderKey,
        "asc"
      );
    });
    return data;
  };

  const dataChiDinhXN = useMemo(() => {
    return groupAndOrderItem(dsDichVuChiDinhXN, "xn", [
      "tenPhieuChiDinh",
      "benhPham",
      "phongThucHien",
    ]);
  }, [dsDichVuChiDinhXN]);

  const dataChiDinhCLS = useMemo(() => {
    return groupAndOrderItem(dsDichVuChiDinhCls, "cls", [
      "tenPhieuChiDinh",
      "benhPham",
      "phongThucHien",
    ]);
  }, [dsDichVuChiDinhCls]);

  const dataChiDinhKham = useMemo(() => {
    return groupAndOrderItem(dsDichVuChiDinhKham, "kham", [
      "tenNhomDichVuCap1",
      "benhPham",
      "phongThucHien",
    ]);
  }, [dsDichVuChiDinhKham]);

  const dataSource = useMemo(
    () => ({
      ...dataChiDinhKham,
      ...dataChiDinhXN,
      ...dataChiDinhCLS,
    }),
    [dataChiDinhKham, dataChiDinhXN, dataChiDinhCLS]
  );

  useEffect(() => {
    const keys = Object.keys(dataSource || {});
    setState({
      activeKey: keys,
    });
  }, [dataChiDinhKham, dataChiDinhXN, dataChiDinhCLS]);

  const listPanel = useMemo(() => {
    const list = [];
    Object.keys(dataSource).forEach((key) => {
      const { soPhieu, tenPhieuChiDinh, diaDiemPhongThucHien } =
        dataSource[key][0];
      dataSource[key].forEach((item) => {
        list.push({
          ...item,
          keyDefine: `${soPhieu}-${tenPhieuChiDinh}-${diaDiemPhongThucHien}`,
        });
      });
    });
    const grouped = groupBy(list, "keyDefine");
    return Object.keys(grouped).map((key) => {
      const { tenPhieuChiDinh, tenNhomDichVuCap1, loaiDichVu } =
        (grouped && grouped[key][0]) || {};
      const listTrangThai = grouped[key].map((item) => item.trangThai);
      return {
        header: (
          <Header
            title={tenPhieuChiDinh || tenNhomDichVuCap1}
            listTrangThai={listTrangThai}
            loaiDichVu={loaiDichVu}
            nbDotDieuTriId={dataNbChiDinh?.nbDotDieuTriId}
            isCollapsed={state.activeKey.includes(key)}
            dataSource={grouped}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            phieuChiDinhId={grouped[key]?.[0]?.phieuChiDinhId}
            key={key}
            onDelete={onDeletePhieu(grouped[key], key)}
          />
        ),
        content: (
          <DanhSachDichVu
            dataGroup={grouped[key]}
            getDsDichVu={getDsDichVu}
            getListAllBenhPham={getListAllBenhPham}
            onDeleteDichVu={onDeleteDichVu}
          />
        ),
        key,
      };
    });
  }, [dataChiDinhKham, dataChiDinhXN, dataChiDinhCLS, state.activeKey]);

  const chanDoan = useMemo(() => {
    const { dsCdChinh = [], cdSoBo } = dataNb || {};
    if (dsCdChinh.length) {
      return dsCdChinh.map((item) => item.ten).join();
    }
    return cdSoBo;
  }, [dataNb]);

  //Select Component ChiDinh  ------------------------------------------------------------------------------------
  const listGoiDvFilter = useMemo(() => {
    if (state.loaiDichVu !== 150 || !listGoiDv) return [];
    if (!state.filterText) return listGoiDv;
    return listGoiDv.filter(
      (item) =>
        item.ten.toLowerCase().unsignText().indexOf(state.filterText) >= 0
    );
  }, [state.filterText, listGoiDv, state.loaiDichVu]);
  const getDsDichVuChiDinh = (data) => {
    getDsDichVuChiDinhKham(data);
    getDsDichVuChiDinhXN(data);
    getDsDichVuChiDinhCLS(data);
  };

  useEffect(() => {
    const { listSelectedDv } = state;
    const listSelectedUniqueKey = listSelectedDv.map((item) => item.uniqueKey);
    const listDichVu = listDvKham
      .map((item, index) => ({
        ...item,
        key: index,
        uniqueKey: `${item.id}-${item.dichVuId}`,
      }))
      .filter((itemFilter) => !itemFilter.hanCheKhoaChiDinh);
    setState({
      listDichVu,
      listAllDichVu: listDichVu,
      isCheckAll: listDichVu.every((item) =>
        listSelectedUniqueKey.includes(item.uniqueKey)
      ),
    });
  }, [listDvKham]);

  const handleCloseTag = (data) => {
    setState({
      listSelectedDv: data,
    });
    onTamTinhTien(data);
  };
  const getDvChiTiet = (goiDvId) => {
    goiDichVuChiTietProvider
      .search({
        page: 0,
        goiDvId,
      })
      .then((res) => {
        const { listSelectedDv } = state;
        const listSelectedUniqueKey = listSelectedDv.map(
          (item) => item.uniqueKey
        );
        const listDichVu = res.data.map((item) => {
          const {
            dichVu: {
              ma,
              ten,
              loaiDichVu,
              giaKhongBaoHiem,
              giaBaoHiem,
              giaPhuThu,
            } = {},
          } = item;
          return {
            ma,
            ten,
            loaiDichVu,
            giaKhongBaoHiem,
            giaBaoHiem,
            giaPhuThu,
            ...item,
            uniqueKey: `${item.id}-${item.dichVuId}`,
          };
        });

        setState({
          listDichVu,
          isCheckAll: listDichVu.every((item) =>
            listSelectedUniqueKey.includes(item.uniqueKey)
          ),
        });
      });
  };
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
        self.findIndex((item2) => item2.dichVuId == item.dichVuId) == index
      );
    });
    onTamTinhTien(updatedListDv, checked);
  };
  const onTamTinhTien = (listSelected, isCheckAll) => {
    const payload = listSelected.map((item) => ({
      nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
      nbDichVu: {
        dichVu: {
          ten: item.ten,
          ma: item.ma,
        },
        dichVuId: item?.dichVuId,
        soLuong: 1,
        loaiDichVu: item?.loaiDichVu,
        khoaChiDinhId: dataNbChiDinh.khoaChiDinhId,
      },
      chiDinhTuDichVuId: dataNbChiDinh?.id,
      chiDinhTuLoaiDichVu: dataNbChiDinh?.loaiDichVu,
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
  const onSelected = (idx) => {
    const { listSelectedDv, listDichVu } = state;
    let updatedListDv = [];
    let checked = (listSelectedDv || [])
      .map((item) => item.uniqueKey)
      .includes(listDichVu[idx].uniqueKey);
    if (!checked) {
      updatedListDv = [listDichVu[idx], ...listSelectedDv];
    } else {
      updatedListDv = listSelectedDv.filter(
        (item) => item.uniqueKey !== listDichVu[idx].uniqueKey
      );
    }

    onTamTinhTien(updatedListDv);
  };

  const onSelectedBoChiDinh = (itemSelected) => {
    let item = {};
    let obj = {
      khoaChiDinhId: dataNbChiDinh.khoaChiDinhId,
      loaiDichVu: state.loaiDichVu,
    };

    if (itemSelected.id !== state.boChiDinhSelected.id) {
      //nếu item không giống thì sẽ thêm vào
      item = itemSelected;
    }
    if (!!item.id) {
      obj.boChiDinhId = item.id;
    }
    searchDv(obj);
    setState({ boChiDinhSelected: item });
  };
  // useEffect(() => {
  //   if(!!state.boChiDinhSelected.id){
  //     searchDv({boChiDinhId : state.boChiDinhSelected.id})
  //   }
  // },[state.boChiDinhSelected])

  const {
    listDichVu,
    listSelectedDv,
    thanhTien,
    isCheckAll,
    indeterminate,
    isGoiDichVu,
  } = state;
  console.log("listDichVu", listDichVu);
  const renderContent = useCallback(() => {
    switch (elementKey) {
      case 0: {
        return (
          <TableLoaiDV
            dataNb={dataNb}
            data={listDichVu}
            listGoiDv={listGoiDvFilter}
            listSelected={listSelectedDv}
            thanhTien={thanhTien}
            onSelected={onSelected}
            checkAll={isCheckAll}
            indeterminate={indeterminate}
            onSelectedAll={onSelectedAll}
            hasChildren={isGoiDichVu}
            getDvChiTiet={getDvChiTiet}
            disableChiDinh={disableChiDinh}
            handleCloseTag={handleCloseTag}
            boChiDinh={boChiDinh}
            boChiDinhSelected={state.boChiDinhSelected}
            onSelectedBoChiDinh={onSelectedBoChiDinh}
          />
        );
      }
      default:
        return null;
    }
  }, [
    elementKey,
    listDichVu,
    listSelectedDv,
    thanhTien,
    isCheckAll,
    indeterminate,
    isGoiDichVu,
    listGoiDvFilter,
    state.boChiDinhSelected,
  ]);
  const disableChiDinh = useMemo(() => {
    return !dataNb?.dsCdChinh?.length && !dataNb?.cdSoBo;
  }, [dataNb?.id, dataNb?.cdSoBo, dataNb?.dsCdChinh]);
  useEffect(() => {
    if (elementKey !== 1) return;
    if (!!dataNb?.cdSoBo || dataNb?.dsCdChinhId.length > 0) {
      searchDv({ khoaChiDinhId: dataNbChiDinh.khoaChiDinhId });
      // getBoChiDinh({})
    } else {
      updateData({
        listDvKham: [],
      });
    }
  }, [disableChiDinh, elementKey]);

  const onSelectServiceType = (value) => {
    inputRef.current.state.value = "";
    updateData({
      listLoaiDichVu: value ? [value] : [],
    });
    inputRef.current.input.value = "";

    setState({
      loaiDichVu: value,
      indeterminate: false,
      isGoiDichVu: value === 150,
    });

    searchDv({ loaiDichVu: value, khoaChiDinhId: dataNbChiDinh.khoaChiDinhId });
    // getBoChiDinh({ dsLoaiDichVu: value })
  };
  useEffect(() => {
    if (state.visible) refScrollThisElement.current.click();
  }, [state.visible]);
  const handleVisible = (e) => {
    setState({
      visible: true,
    });
    if (state.loaiDichVu == 150) {
      searchDv({ loaiDichVu: 150, khoaChiDinhId: dataNbChiDinh.khoaChiDinhId });
      // getBoChiDinh({ dsLoaiDichVu: 150 })
    }
  };

  const onSubmit = () => {
    const { loaiDichVu, listSelectedDv } = state;
    if (!listSelectedDv.length) {
      message.error(t("khamBenh.chiDinh.yeuCauNhapChiDinhDichVu"));
      return;
    }
    setState({
      loadingChiDinh: true,
    });
    const payload = {
      chiDinhTuDichVuId: dataNbChiDinh?.id,
      nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
      chiDinhTuLoaiDichVu: dataNbChiDinh?.loaiDichVu,
    };
    chiDinhDichVu()
      .then(({ code, listLoaiDichVu }) => {
        setState({
          loadingChiDinh: false,
          listSelectedDv: [],
          listDichVu: loaiDichVu === 150 ? [] : loaiDichVu,
        });
        if (code === 0) {
          onClosePopup();
          getDsDichVuChiDinh(payload);
        }
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
      listDichVu: state.loaiDichVu === 150 ? [] : state.listDichVu,
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
    if (loaiDichVu === 150) return;

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
  const renderSticky = useMemo(() => {
    return (
      <StickyWrapper>
        <div className="info">
          <div className="info__left">
            <p>
              {t("khamBenh.donThuoc.chanDoan")}: <span>{chanDoan}</span>
              {t("common.ac")}
            </p>
            <p>
              {t("khamBenh.chiDinh.bacSiChiDinh")}:{" "}
              <span>{dataNbChiDinh?.tenBacSiChiDinh}</span>
            </p>
          </div>
          <div className="info__right">
            {t("khamBenh.hanhTrinhKham.chanDoanKemTheo")}:
            <span>
              {(dataNb?.dsCdKemTheo || []).map((item) => item.ten).join()}
            </span>
          </div>
        </div>
        {elementKey === 0 && trangThaiKham != TRANG_THAI_DICH_VU.DA_KET_LUAN && (
          <div className="select-box">
            <div
              className="pointer"
              onClick={() => {
                let path = "/danh-muc/dich-vu-kham-benh";
                if (state.loaiDichVu == 10)
                  path = "/danh-muc/dich-vu-kham-benh";
                else if ((state.loaiDichVu = 20))
                  path = "/danh-muc/dich-vu-xet-nghiem";
                else if ((state.loaiDichVu = 30))
                  path = "/danh-muc/dich-vu-cdha-tdcn";
                else if ((state.loaiDichVu = 150))
                  path = "/goi-dich-vu/danh-muc";
                openInNewTab(path);
                return;
              }}
            >
              {t("khamBenh.chiDinh.themChiDinh")} &nbsp;
            </div>
            <div>
              <Select
                defaultValue=""
                className="select-box_select"
                data={LOAI_DICH_VU_CHI_DINH}
                placeholder={t("khamBenh.chiDinh.chonLoaiDV")}
                onChange={onSelectServiceType}
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
                  text={
                    <Input
                      placeholder={t("khamBenh.chiDinh.chonDichVu")}
                      onChange={handleSearch}
                      ref={inputRef}
                    />
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
        )}
      </StickyWrapper>
    );
  }, [
    chanDoan,
    dataNb,
    elementKey,
    state.visible,
    state.loadingChiDinh,
    listDichVu,
    listSelectedDv,
    thanhTien,
    isCheckAll,
    indeterminate,
    isGoiDichVu,
    listGoiDvFilter,
    state.boChiDinhSelected,
    trangThaiKham,
  ]);
  return (
    <>
      <div
        onClick={(e) => e.target.scrollIntoView()}
        ref={refScrollThisElement}
      ></div>
      {renderSticky}
      <div className="collapse-content">
        <CollapseWrapper
          bordered={false}
          activeKey={state.activeKey}
          // accordion
          onChange={onCollapsed}
        >
          {listPanel.map((panel, idx) => (
            <Panel showArrow={false} key={panel.key} header={panel.header}>
              {panel.content}
            </Panel>
          ))}
        </CollapseWrapper>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listDvKham: state.chiDinhDichVuCls.listDvKham || [],
    selectedLoaiDichVu: state.chiDinhDichVuCls.loaiDichVu,
    nbDotDieuTriId: state.choTiepDonDV?.nbDotDieuTriId,
    listGoiDv: state.chiDinhDichVuCls.listGoiDv,
    dataNb: state.chiDinhDichVuCls.dataNb,
  };
};
const mapDispatchToProps = ({
  chiDinhDichVuCls: {
    searchDv,
    tamTinhTien,
    chiDinhDichVu,
    getDsDichVuChiDinhXN,
    getDsDichVuChiDinhKham,
    getDsDichVuChiDinhCLS,
    updateData,
  },
}) => ({
  searchDv,
  tamTinhTien,
  chiDinhDichVu,
  getDsDichVuChiDinhXN,
  getDsDichVuChiDinhKham,
  getDsDichVuChiDinhCLS,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChiDinhDichVu);
