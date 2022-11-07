import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useImperativeHandle,
} from "react";
import { Button, Input, Popover, Checkbox } from "antd";
import { Main, InputSearch2 } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import IcFilter from "assets/images/kho/icFilter.png";
import { TRANG_THAI_PHIEU, LOAI_PHIEU_NHAP } from "constants/index";
import IcDown from "assets/images/xetNghiem/icDown.png";
import CustomPopover from "../../components/CustomPopover";
import { useHistory } from "react-router-dom";
import { ModalChonKho, ModalChonPhieuNhap } from "../../components/ModalKho";
import { forwardRef } from "react";
import TimKiem from "../../components/TimKiem";
import cacheUtils from "utils/cache-utils";
import ModalPhieuLinhBu from "../ModalPhieuLinhBu";

const TimKiemPhieuNhap = forwardRef((props, ref) => {
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    kho: { getAllTongHop: getAllKhoTongHop },
    nhapKho: { onChangeInputSearch, clearPhieuNhap },
    doiTac: { getListAllDoiTac },
    phieuNhapXuat: { updateData: updateDataPhieuNhapXuat },
  } = useDispatch();

  const {
    kho: { listKhoUser },
    quyetDinhThau: { listAllQuyetDinhThau },
  } = useSelector((state) => state);

  useEffect(() => {
    getAllKhoTongHop({});
    getListAllDoiTac({ page: "", size: "" });
  }, []);
  const dsKhoUserId = useMemo(() => {
    return (listKhoUser || []).map((item) => item.id);
  }, [listKhoUser]);
  const dsNhanVienKho = useMemo(() => {
    return (listKhoUser || []).map((item) => item);
  }, [listKhoUser]);

  useEffect(() => {
    cacheUtils.read("DATA_NHAP_KHO", "", "", false).then((s) => {
      setState({ loaiNhapXuat: s });
    });
  }, []);

  useEffect(() => {
    const search = {};
    if (state.dsKhoNhapId?.length) {
      search.dsKhoNhapId = state.dsKhoNhapId;
    } else {
      if (dsKhoUserId?.length) search.dsKhoNhapId = dsKhoUserId;
      else search.dsKhoNhapId = null;
    }
    search.thangDuTru = state.thangDuTru;
    search.dsTrangThai = state.dsTrangThai;
    search.nhaCungCapId = state.nhaCungCapId;
    search.loaiNhapXuat = state?.loaiNhapXuat;
    if (state?.loaiNhapXuat === 30) {
      search.dsTrangThai = [20, 30];
    }
    onChangeInputSearch({
      ...search,
    });
  }, [
    listKhoUser,
    state.dsKhoNhapId,
    state.thangDuTru,
    state.dsTrangThai,
    state.nhaCungCapId,
    state.loaiNhapXuat,
  ]);

  useImperativeHandle(ref, () => ({
    onCreateNew,
  }));

  const refShow = useRef(null);
  const refModalChonKho = useRef(null);
  const refModalChonPhieuNhap = useRef(null);
  const refModalPhieuLinhBu = useRef(null);
  const history = useHistory();

  const handleRefShow = () => {
    if (refShow.current) refShow.current.show();
  };

  const group = () => (
    <Checkbox.Group
      options={TRANG_THAI_PHIEU}
      onChange={onSearchInput("dsTrangThai")}
    />
  );

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e.length > 0) {
      value = e;
    }

    if (key === "dsTrangThai") {
      onChangeInputSearch({ dsTrangThai: value });
    }
  };

  const onSelectPhieuNhap = (data, showLinhBu) => {
    refModalChonPhieuNhap.current &&
      refModalChonPhieuNhap.current.show(
        { data , showLinhBu },
        () => {
          updateDataPhieuNhapXuat({
            thongTinPhieu: {
              khoId: data?.id,
            },
          });
          history.push(
            `/kho/nhap-kho/phieu-nhap-nha-cung-cap/them-moi?khoId=${data?.id}`
          );
        },
        () => {
          updateDataPhieuNhapXuat({
            thongTinPhieu: {
              khoId: data?.id,
            },
          });
          history.push(`/kho/phieu-nhap-du-tru/them-moi?khoId=${data?.id}`);
        }
      );
  };

  const onSelectPhieuLinhBu = (payload) => {
    if (refModalPhieuLinhBu.current) {
      refModalPhieuLinhBu.current.show(payload);
    }
  };

  const onSelectKho = (khoId, showLinhBu) => {
    let data = dsNhanVienKho.find((x) => x.id == (state.dsKho || khoId));
    const duTru = data?.dsCoCheDuTru?.some((item) => item === 10);
    const linhBu = data?.dsCoCheDuTru?.some((item) => item === 20);
    updateDataPhieuNhapXuat({
      thongTinPhieu: {
        khoId: data?.id,
      },
    });
    if (data?.nhapTuNcc && !data?.khoTrucThuoc) {
      history.push(
        `/kho/nhap-kho/phieu-nhap-nha-cung-cap/them-moi?khoId=${data?.id}`
      );
    } else if (!data?.nhapTuNcc && data?.khoTrucThuoc && duTru && !linhBu) {
      history.push(`/kho/phieu-nhap-du-tru/them-moi?khoId=${data?.id}`);
    } else if (!data?.nhapTuNcc && data?.khoTrucThuoc && !duTru && linhBu) {
      onSelectPhieuLinhBu({ khoId: data?.id });
    } else {
      onSelectPhieuNhap(data, showLinhBu);
    }
  };

  const onCreateNew = () => {
    clearPhieuNhap();
    if (state?.dsKho?.length === 1) {
      onSelectKho();
    } else {
      refModalChonKho.current &&
        refModalChonKho.current.show(
          { listKhoUser: dsNhanVienKho },
          (khoId, showLinhBu) => {
            updateDataPhieuNhapXuat({
              thongTinPhieu: { khoId },
            });
            onSelectKho(khoId, showLinhBu);
          }
        );
    }
  };

  const filters = [
    {
      flex: "110px",
      component: (
        <>
          <CustomPopover ref={refShow}></CustomPopover>
          <Button className="filter" onClick={() => handleRefShow()}>
            <img src={IcFilter} alt="..." />
            <span> Lọc phiếu </span>
          </Button>
        </>
      ),
    },
    {
      flex: "220px",
      data: dsNhanVienKho,
      fieldName: "dsKhoNhapId",
      showTag: true,
      showSearch: true,
      placeholder: "Tên kho",
    },
    {
      flex: "190px",
      data: LOAI_PHIEU_NHAP,
      fieldName: "loaiNhapXuat",
      placeholder: "Chọn loại phiếu",
      type: "select",
    },
    {
      flex: "164px",
      component: (
        <Popover placement="bottom" content={group} trigger="click">
          <InputSearch2>
            <Input
              value="Trạng thái phiếu"
              disabled
              style={{ fontWeight: 650 }}
            ></Input>
            <img src={IcDown} alt="IcDown" className="ic-down" />
          </InputSearch2>
        </Popover>
      ),
    },
    {
      flex: "145px",
      data: listAllQuyetDinhThau.map((item) => ({
        ...item,
        ten: item.quyetDinhThau,
      })),
      nameSelect: "quyetDinhThau",
      fieldName: "dsQuyetDinhThauId",
      showSearch: true,
      placeholder: "Quyết định thầu",
    },
    {
      flex: "240px",
      type: "input",
      placeholder: "Nhập để tìm kiếm số phiếu",
      fieldName: "soPhieu",
    },
    {
      flex: "350px",
      className: "date",
      showSearch: true,
      fieldName: "TaoPhieu",
      type: "date",
      label: "Ngày tạo phiếu",
    },
    {
      flex: "350px",
      className: "date",
      showSearch: true,
      fieldName: "Duyet",
      type: "date",
      label: "Ngày duyệt phiếu",
    },
  ];
  return (
    <Main>
      <TimKiem filters={filters} onSearch={onChangeInputSearch} />
      <ModalChonKho ref={refModalChonKho} />
      <ModalChonPhieuNhap
        ref={refModalChonPhieuNhap}
        onSelectPhieuLinhBu={onSelectPhieuLinhBu}
        showLinhBu={state.showLinhBu}
      />
      <ModalPhieuLinhBu ref={refModalPhieuLinhBu} />
    </Main>
  );
});

export default TimKiemPhieuNhap;
