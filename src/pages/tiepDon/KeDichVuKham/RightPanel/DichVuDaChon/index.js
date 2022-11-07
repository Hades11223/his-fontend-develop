import React, { memo, useState, useEffect, useRef, useMemo } from "react";
import { ENUM, GIOI_TINH_BY_VALUE, LOAI_DICH_VU, ROLES } from "constants/index";
import { Main, GlobalStyle } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import {
  Checkbox,
  Select as SelectAntd,
  Tooltip,
  InputNumber,
  message,
} from "antd";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import moment from "moment";
import ModalDichVuBvE from "../ModalDichVuBvE";
import { Button, Pagination, Select, TableWrapper } from "components";
import IconHoanDv from "assets/images/khamBenh/icHoanDv.png";
import IcHuyHoan from "assets/images/xetNghiem/icHuyHoan.png";
import ModalHoanDichVu from "components/ModalHoanDichVu";
import ModalHuyHoanDichVu from "components/ModalHuyHoanDichVu";
import { useEnum, useStore } from "hook";
import { checkRole } from "utils/role-utils";
import { groupBy, cloneDeep } from "lodash";
import Box2 from "pages/tiepDon/components/Box2";
import IcDelete from "assets/svg/ic-delete.svg";
import Setting from "components/TableWrapper/Setting";
import { refConfirm } from "app";

const DichVuDaChon = (props) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const refModalDichVuBvE = useRef(null);
  const refModalHoanDichVu = useRef(null);
  const refHuyHoanDichVu = useRef(null);
  const [state, _setState] = useState({ dataSource: [] });
  const refSettings = useRef(null);

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { listDvChoose, totalElements, page, size } = useSelector(
    (state) => state.tiepDonDichVu
  );
  const { doiTuong, nbNgoaiVien, nbNguonNb, gioiTinh, tuoi, thangTuoi } =
    useSelector((state) => state.tiepDon);

  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const {
    tiepDonDichVu: { thayDoiThongTinDichVuDaChon, onDeleteDichVu, tamTinhTien },
    phongThucHien: { getListPhongTheoDichVu },
    tiepDonDichVu: { onSearchNbDv, updateData },
    nhanVien: { getListNhanVienTongHop },
  } = useDispatch();

  const isPermisionEditDv = useMemo(() => {
    return checkRole([ROLES["TIEP_DON"].SUA_DV], true);
  });
  const listDvDaTiepDon = useStore("tiepDonDichVu.listDvDaTiepDon", []);
  const listLoaiHinhThanhToanCuaDoiTuong = useStore(
    "loaiDoiTuongLoaiHinhTT.listLoaiHinhThanhToanCuaDoiTuong",
    []
  );
  const khoaTiepDonId = useStore("tiepDon.khoaTiepDonId", null);
  const listNhanVien = useStore("nhanVien.listNhanVien", []);

  useEffect(() => {
    let dvDaTiepDon = cloneDeep(listDvDaTiepDon);
    let listPhong = [];
    if (dvDaTiepDon.length) {
      async function fetchData() {
        try {
          listPhong = await getListPhongTheoDichVu({
            page: "",
            size: "",
            dsDichVuId: dvDaTiepDon.map((item) => item.dichVuId),
            khoaChiDinhId: khoaTiepDonId,
          });
        } catch (error) {
          listPhong = [];
        }
        const phongByDichVuId = groupBy(listPhong, "dichVuId");
        dvDaTiepDon.forEach((dichVu) => {
          dichVu.dsPhongThucHien = phongByDichVuId[dichVu?.dichVuId];
        });
        setState({ dvDaTiepDon });
      }
      fetchData();
    }
    setState({ dvDaTiepDon });
  }, [listDvDaTiepDon, khoaTiepDonId]);

  useEffect(() => {
    getListNhanVienTongHop({
      dsMaThietLapVanBang: "BAC_SI",
      page: "",
      size: "",
      active: true,
    });
  }, []);

  const listBacSi = useMemo(() => {
    return (listNhanVien || []).map((item) => ({
      id: item?.id,
      ten: `${item.taiKhoan ? `${item.taiKhoan} - ` : ""} ${
        item.ma ? `${item.ma} - ` : ""
      }  ${item?.ten ? `${item.ten}  ` : ""}`,
    }));
  }, [listNhanVien]);
  useEffect(() => {
    let data = [
      ...(listDvChoose?.length && page === 0 ? listDvChoose : []),
      ...(state.dvDaTiepDon || []),
    ]?.map((item, index) => {
      item.key = "item" + index;
      return item;
    });
    setState({ dataSource: data });
  }, [state.dvDaTiepDon, listDvChoose]);

  const listAllLoaiHinhThanhToan = useMemo(() => {
    return listLoaiHinhThanhToanCuaDoiTuong.map((item) => ({
      ...item.loaiHinhThanhToan,
    }));
  }, [listLoaiHinhThanhToanCuaDoiTuong]);
  const onDeleteIndex = (data, index, idDichVu) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: t("tiepDon.banCoMuonXoaDichVu"),
          cancelText: t("common.huy"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () =>
          onDeleteDichVu({
            id: idDichVu,
            loaiDichVu: data.loaiDichVu,
            data,
            index,
          }).then(() => {
            if (id) {
              onSearchNbDv({
                nbDotDieuTriId: id,
                dsChiDinhTuLoaiDichVu: [200, 230, 240],
                dsLoaiDichVu: [10, 20, 30, 40, 60].join(","),
              });
            } else {
              let indexLeft =
                listDvChoose?.findIndex(
                  (x) => x?.dichVuId === data?.dichVuId
                ) ?? -1;
              if (indexLeft >= 0) {
                listDvChoose.splice(index, 1);
                updateData({
                  listDvChoose: [...listDvChoose],
                });
              }
            }
          })
      );
  };

  const save = (data, index) => {
    if (!data.id) {
      let newDataSource = [...state.dataSource];
      let _updateItem = newDataSource.find((item) => item.newId === data.newId);
      if (_updateItem) {
        _updateItem.phongId = data.phongThucHienId || _updateItem.phongId;
        _updateItem.loaiDichVu = data.loaiDichVu;
      }
      setState({ dataSource: newDataSource });
    } else {
      let obj = {
        id: Number(data?.id),
        nbDotDieuTriId: data?.nbDotDieuTriId,
        bacSiKhamId: data?.bacSiKhamId,
        nbDvKyThuat: {
          phongThucHienId:
            state.phongThucHienId?.[data.id] || data?.phongThucHienId,
        },
        nbDichVu: {
          dichVuId: data?.dichVuId,
          loaiDichVu: data?.loaiDichVu,
          loaiHinhThanhToanId: data?.loaiHinhThanhToanId,
        },
      };
      thayDoiThongTinDichVuDaChon({
        data: obj,
        id: data?.id,
      }).then(() => {
        setState({
          [`showUpdate${index}`]: false,
        });
      });
    }
  };
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
    );
  };

  const onChangeSL = (item) => (e) => {
    let obj = {
      id: Number(item?.id),
      nbDotDieuTriId: item?.nbDotDieuTriId || id,
      nbDichVu: {
        dichVuId: item?.dichVuId,
        soLuong: e,
        loaiDichVu: item?.loaiDichVu,
        khoaChiDinhId: props.khoaTiepDonId,
      },
    };
    tamTinhTien({
      data: [obj],
      loaiDichVu: item?.loaiDichVu,
    }).then((s) => {
      let newListChoose = [...state.dataSource];
      let _updateItem = newListChoose.find((x) => {
        return x.id ? x.id === item.id : x.newId === item.newId;
      });
      if (_updateItem) {
        _updateItem.tinhTien = s.data[0]?.nbDichVu || {};
        _updateItem.thanhToan = false;
        _updateItem.soLuong = e;
      }
      setState({ dataSource: newListChoose });
      if (item?.id) {
        thayDoiThongTinDichVuDaChon({
          data: obj,
          id: obj?.id,
        });
      }
    });
  };

  const onShowDsDvBvE = () => {
    refModalDichVuBvE.current && refModalDichVuBvE.current.show();
  };

  const onHoanDv = (record) => {
    let gender = gioiTinh ? GIOI_TINH_BY_VALUE[gioiTinh] : "";

    let age =
      thangTuoi > 36 || tuoi
        ? `${tuoi} ${t("common.tuoi")}`
        : `${thangTuoi} ${t("common.thang")}`;
    const data = Array(record);
    if (data?.length) {
      data.forEach((itemLoop) => {
        itemLoop.gioiTinh = gender;
        itemLoop.tuoi = age;
      });

      refModalHoanDichVu.current &&
        refModalHoanDichVu.current.show(
          {
            data: data,
          },
          () => {
            onSearchNbDv({
              nbDotDieuTriId: id,
              dsChiDinhTuLoaiDichVu: [200, 230, 240],
              dsLoaiDichVu: [10, 20, 30, 40, 60].join(","),
            });
          }
        );
    } else {
      message.error(t("khamBenh.chiDinh.khongCoDichVuThoaManDieuKienDeHoan"));
    }
  };

  const onHuyHoan = (data) => {
    let gender = gioiTinh ? GIOI_TINH_BY_VALUE[gioiTinh] : "";

    let age =
      thangTuoi > 36 || tuoi
        ? `${tuoi} ${t("common.tuoi")}`
        : `${thangTuoi} ${t("common.thang")}`;
    data.gioiTinh = gender;
    data.tuoi = age;
    if (refHuyHoanDichVu.current)
      refHuyHoanDichVu.current.show(data, () => {
        onSearchNbDv({
          nbDotDieuTriId: id,
          dsChiDinhTuLoaiDichVu: [200, 230, 240],
          dsLoaiDichVu: [10, 20, 30, 40, 60].join(","),
        });
      });
  };
  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => {
        let _index = page * size + index + 1;
        return page === 0 || !listDvChoose?.length
          ? _index
          : _index + listDvChoose?.length;
      },
    },
    {
      title: <HeaderSearch title={t("common.tenDichVu")} />,
      width: "200px",
      dataIndex: "ten",
      hideSearch: true,
      i18Name: "common.tenDichVu",
      show: true,
      render: (item, list) => {
        let data =
          state.dataSource.filter((option) => {
            let check1 =
              option?.ten && item && option?.ten === item ? true : false;
            let check2 =
              option?.tenDichVu &&
              list?.tenDichVu &&
              option?.tenDichVu === list?.tenDichVu
                ? true
                : false;
            return check1 || check2;
          }) || [];
        let index = data.findIndex((x) => x?.id === list?.id);
        return (
          <div>
            {list?.ten || list?.tenDichVu}
            {index && index > -1 ? ` ${t("common.lan")} ${index + 1}` : ""}
          </div>
        );
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.sl")} />,
      width: "60px",
      dataIndex: "soLuong",
      hideSearch: true,
      align: "center",
      i18Name: "tiepDon.sl",
      show: true,
      render: (item, data, index) => {
        return (
          <InputNumber
            style={{ width: 50 }}
            value={item}
            min={1}
            onChange={onChangeSL(data)}
            readOnly={data.thanhToan || !isPermisionEditDv}
          />
        );
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.donGia")} />,
      width: "80px",
      dataIndex: "giaKhongBaoHiem",
      hideSearch: true,
      align: "right",
      i18Name: "tiepDon.donGia",
      show: true,
      render: (item, list) => {
        return (
          <div>
            {doiTuong === 1
              ? item
                ? item.formatPrice()
                : ""
              : doiTuong === 2
              ? list?.giaBaoHiem
                ? list?.giaBaoHiem.formatPrice()
                : item
                ? item.formatPrice()
                : ""
              : ""}
          </div>
        );
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.phong")} />,
      width: "150px",
      dataIndex: "phongThucHienId",
      hideSearch: true,
      i18Name: "tiepDon.phong",
      align: "center",
      show: true,
      render: (value, item, index) => {
     
        return (
          <SelectAntd
            dropdownClassName="tiep-don-select-1"
            showSearch
            style={{ width: "100%" }}
            value={item?.phongThucHienId || item.phongId}
            disabled={!isPermisionEditDv}
            onChange={(e) => {
              item.phongThucHienId = e;
              save(item, index);
            }}
            filterOption={filterOption}
          >
            {(item?.dsPhongThucHien || []).map((itemPhong, indexPhong) => {
              return (
                <SelectAntd.Option key={indexPhong} value={itemPhong?.phongId}>
                  {itemPhong?.ten}
                </SelectAntd.Option>
              );
            })}
          </SelectAntd>
        );
      },
    },
    {
      title: <HeaderSearch title={t("khamBenh.chiDinh.loaiHinhThanhToan")} />,
      width: "150px",
      dataIndex: "loaiHinhThanhToanId",
      hideSearch: true,
      i18Name: "khamBenh.chiDinh.loaiHinhThanhToan",
      show: true,
      align: "center",
      render: (item, data, index) => {
        return (
          <Select
            style={{ width: 130 }}
            value={item}
            data={listAllLoaiHinhThanhToan}
            onChange={(e) => {
              data.loaiHinhThanhToanId = e;
              save(data, index);
            }}
            disabled={data?.thanhToan || !isPermisionEditDv}
            readOnly={data.thanhToan || !isPermisionEditDv}
          />
        );
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.bacSi")} />,
      width: "230px",
      dataIndex: "bacSiKhamId",
      hideSearch: true,
      i18Name: "tiepDon.bacSi",
      align: "center",
      show: true,
      render: (item, data, index) => {
        return (
          <Select
            dropdownClassName="tiep-don-select-2"
            style={{ width: 200 }}
            value={item}
            data={listBacSi}
            onChange={(e) => {
              data.bacSiKhamId = e;
              save(data, index);
            }}
            disabled={
              data?.thanhToan ||
              !isPermisionEditDv ||
              data?.loaiDichVu !== LOAI_DICH_VU.KHAM
            }
          />
        );
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.thoiGianChiDinh")} />,
      width: "150px",
      dataIndex: "thoiGianChiDinh",
      hideSearch: true,
      align: "right",
      i18Name: "tiepDon.thoiGianChiDinh",
      show: true,
      render: (item, list) => {
        return item && moment(item).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.thoiGianThucHien")} />,
      width: "150px",
      dataIndex: "thoiGianThucHien",
      hideSearch: true,
      align: "right",
      i18Name: "tiepDon.thoiGianThucHien",
      render: (item, list) => {
        return item && moment(item).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: <HeaderSearch title={t("common.trangThai")} />,
      width: "100px",
      dataIndex: "trangThai",
      hideSearch: true,
      align: "right",
      i18Name: "common.trangThai",
      show: true,
      render: (item) => {
        return (listTrangThaiDichVu || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: <HeaderSearch title={t("tiepDon.daTT")} />,
      width: "80px",
      dataIndex: "thanhToan",
      hideSearch: true,
      align: "center",
      i18Name: "tiepDon.daTT",
      show: true,
      render: (item, list) => {
        return <Checkbox checked={item} disabled></Checkbox>;
      },
    },
    {
      title: <HeaderSearch title={<Setting refTable={refSettings} />} />,
      width: "80px",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "center",
      hideSearch: true,
      render: (item, list, index) => {
        return (
          <div className="col-action">
            <Tooltip title={t("tiepDon.xoaDichVu")} placement="bottom">
              <div className="btn-delete">
                {!list?.thanhToan && (
                  <IcDelete
                    onClick={() => onDeleteIndex(list, index, list?.id)}
                    className="ic-action"
                  />
                )}
              </div>
            </Tooltip>
            <Tooltip
              title={t("khamBenh.chiDinh.hoanDichVu")}
              placement="bottom"
            >
              <div className="btn-delete">
                {list?.thanhToan && list.trangThaiHoan === 0 && (
                  <img
                    onClick={() => onHoanDv(list)}
                    src={IconHoanDv}
                    alt=""
                    style={{ marginLeft: 10 }}
                  />
                )}
              </div>
            </Tooltip>
            <Tooltip
              title={t("khamBenh.chiDinh.huyYeuCauHoan")}
              placement="bottom"
            >
              <div className="btn-delete">
                {list.trangThaiHoan === 10 && (
                  <img
                    onClick={() => onHuyHoan(list)}
                    src={IcHuyHoan}
                    alt=""
                    style={{ marginLeft: 10 }}
                  />
                )}
              </div>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const onChangePage = (page) => {
    onSearchNbDv({
      page: page - 1,
      nbDotDieuTriId: id,
      dsChiDinhTuLoaiDichVu: [200, 230, 240],
      dsLoaiDichVu: [10, 20, 30, 40, 60].join(","),
    });
  };

  const handleSizeChange = (size) => {
    onSearchNbDv({
      size,
      nbDotDieuTriId: id,
      dsChiDinhTuLoaiDichVu: [200, 230, 240],
      dsLoaiDichVu: [10, 20, 30, 40, 60].join(","),
    });
  };
  return (
    <Main>
      <GlobalStyle />
      <Box2
        title={t("tiepDon.dichVuDaChon")}
        headerRight={
          nbNgoaiVien?.maHoSo && nbNguonNb?.nguonNbId === 2 ? (
            <Button.Text type="primary" onClick={onShowDsDvBvE}>
              Xem thêm
            </Button.Text>
          ) : null
        }
        noPadding={true}
      >
        <TableWrapper
          headerMinHeight={"35px"}
          ref={refSettings}
          showHeaderTable={false}
          scroll={{ y: 400, x: 1000 }}
          columns={columns}
          dataSource={state.dataSource}
          tableName="table_TIEPDON_DICH_VU_DA_CHON"
        ></TableWrapper>
        {!!state.dataSource?.length && (
          <Pagination
            listData={state.dataSource}
            onChange={onChangePage}
            current={(page || 0) + 1}
            pageSize={size}
            total={totalElements}
            onShowSiz
            onShowSizeChange={handleSizeChange}
          />
        )}
      </Box2>
      <ModalDichVuBvE ref={refModalDichVuBvE} />
      <ModalHoanDichVu ref={refModalHoanDichVu} />
      <ModalHuyHoanDichVu ref={refHuyHoanDichVu} />
    </Main>
  );
};

export default memo(DichVuDaChon);
