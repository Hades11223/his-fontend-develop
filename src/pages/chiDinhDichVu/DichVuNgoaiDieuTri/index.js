import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { Button, InputTimeout, ModalTemplate } from "components";
import { Main } from "./styled";
import { Checkbox, message } from "antd";
import { useTranslation } from "react-i18next";
import TableWrapper from "components/TableWrapper";
import { HeaderSearch, Pagination } from "components";
import { useDispatch, useSelector } from "react-redux";
import CircleCheck from "assets/images/khamBenh/circle-check.png";
import ModalBoSungThongTinDichVu from "./ModalBoSungThongTinDichVu";
import { refConfirm } from "app";

const DichVuNgoaiDieuTri = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refOption = useRef({});
  const refIsSubmit = useRef(null);
  const refModalBoSungThongTinDichVu = useRef(null);

  const {
    getDsDvNgoaiDieuTri,
    chiDinhNgoaiDieuTri,
    tamTinhTien,
    onChangeInputSearch,
    updateData,
  } = useDispatch().chiDinhNgoaiDieuTri;
  const { dsDvNgoaiDieuTri, dataTamTinhTien, totalElements, page, size } =
    useSelector((state) => state.chiDinhNgoaiDieuTri);
  const [state, _setState] = useState({
    listSelectedDv: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      const {
        nbDotDieuTriId,
        khoaChiDinhId,
        dsDoiTuongSuDung,
        gioiTinh,
        chiDinhTuDichVuId,
        chiDinhTuLoaiDichVu,
      } = data;
      setState({ item: data, chiDinhTuDichVuId, chiDinhTuLoaiDichVu });
      updateData({ listChooseDv: [] });
      onChangeInputSearch({
        gioiTinh,
        khoaChiDinhId,
        dsDoiTuongSuDung,
      });

      refOption.current = {
        nbDotDieuTriId,
        khoaChiDinhId,
        dsDoiTuongSuDung,
      };
      refIsSubmit.current = false;

      refModal.current && refModal.current.show();
    },
  }));

  useEffect(() => {
    const listDichVu = (dsDvNgoaiDieuTri || []).map((item, index) => ({
      ...item,
      key: index,
      uniqueKey: `${item.id || "dv"}-${item.dichVuId}`,
    }));
    setState({
      listDichVu,
    });
  }, [dsDvNgoaiDieuTri]);

  const onCancel = () => {
    setState({
      show: false,
      thanhTien: 0,
      listSelectedDv: [],
      filterText: "",
      indeterminate: false,
    });
    refModal.current && refModal.current.hide();
  };

  const onChangeSoLuong = (_uniqueKey, key) => {
    return (value) => {
      let _listSelectedDv = Object.assign([], listSelectedDv);
      const _findDvIndex = _listSelectedDv.findIndex(
        (x) => x.uniqueKey === _uniqueKey
      );
      if (_findDvIndex !== -1) {
        _listSelectedDv[_findDvIndex][key] = value;
        setState({ listSelectedDv: _listSelectedDv });

        onTamTinhTien(_listSelectedDv);
      }
    };
  };

  const onRemoveItem = (value) => () => {
    const listUpdatedTag = listSelectedDv.filter(
      (item) => item.uniqueKey !== value
    );

    setState({
      listSelectedDv: listUpdatedTag,
    });
    onTamTinhTien(listUpdatedTag);
  };

  const listDvColumns = [
    {
      title: <HeaderSearch title="Mã dịch vụ" />,
      width: "100%",
      dataIndex: "ma",
      render: (value, currentRow, index) => {
        const giaKhongBaoHiem = (currentRow.giaKhongBaoHiem || 0).formatPrice();
        const giaBaoHiem = (currentRow.giaBaoHiem || 0).formatPrice();
        const giaPhuThu = (currentRow.giaPhuThu || 0).formatPrice();

        const donGia = `${giaKhongBaoHiem} | ${t(
          "khamBenh.chiDinh.BH"
        )}: ${giaBaoHiem} | ${t("khamBenh.chiDinh.phuThu")}: ${giaPhuThu}`;

        return (
          <div className="row-item">
            <div className="left-box">
              <Checkbox
                checked={
                  !!listSelectedDv.find(
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
      },
    },
  ];

  const chooseColumns = [
    {
      title: <HeaderSearch title="Chọn" />,
      key: "key",
      width: 40,
      align: "center",
      render: (item, list, index) => (
        <Checkbox checked onChange={onRemoveItem(list.uniqueKey)} />
      ),
    },
    {
      title: <HeaderSearch isTitleCenter={true} title={t("common.stt")} />,
      dataIndex: "stt",
      key: "stt",
      width: 40,
      align: "center",
    },
    {
      title: (
        <HeaderSearch isTitleCenter={true} title={t("common.tenDichVu")} />
      ),
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: <HeaderSearch isTitleCenter={true} title={t("common.soLuong")} />,
      dataIndex: "soLuong",
      key: "soLuong",
      width: 80,
      render: (item, list, index) => {
        const soLuong = item || 1;

        return (
          <div className="soluong" onClick={(event) => event.stopPropagation()}>
            <InputTimeout
              type="number"
              value={soLuong}
              style={{ width: 65 }}
              min={1}
              step={1}
              onChange={onChangeSoLuong(list.uniqueKey, "soLuong")}
            />
          </div>
        );
      },
    },
  ];

  const onShowDichVuBoSung = (dsDichVuCanBoSung) => {
    refModalBoSungThongTinDichVu.current &&
      dsDichVuCanBoSung?.length &&
      refModalBoSungThongTinDichVu.current.show({
        dataSource: dsDichVuCanBoSung,
        isHiddenTyLett: state.isHiddenTyLett,
        isPhauThuat: state.isPhauThuat,
      });
  };

  const onSubmit = async () => {
    try {
      if (refIsSubmit.current) return; //nếu đang submit thì bỏ qua
      const { listSelectedDv } = state;

      if (!listSelectedDv.length) {
        message.error(t("khamBenh.chiDinh.yeuCauNhapChiDinhDichVu"));
        return;
      }
      setState({
        filterText: "",
      });
      let dsDichVuCanBoSung = [];
      let dsDichVuThoaDieuKien = [];
      listSelectedDv.filter((item) => {
        if (item?.dsPhongThucHien?.length > 1 || item?.yeuCauBenhPham) {
          dsDichVuCanBoSung.push(item);
        } else {
          dsDichVuThoaDieuKien.push(item?.dichVuId);
        }
      });
      //lấy ra ds dịch vụ đủ điều kiện và ds dịch vụ cần bổ sung

      dsDichVuCanBoSung = dsDichVuCanBoSung.map((item, index) => ({
        yeuCauBenhPham: item?.yeuCauBenhPham,
        dsPhongThucHien: item?.dsPhongThucHien,
        nbDichVu: {
          chiDinhTuDichVuId: state.chiDinhTuDichVuId,
          chiDinhTuLoaiDichVu: state.chiDinhTuLoaiDichVu,
          dichVu: {
            ten: item?.ten,
          },
          dichVuId: item?.dichVuId,
          soLuong: item.soLuong || 1,
          loaiDichVu: item?.loaiDichVu,
          khoaChiDinhId: refOption.current.khoaChiDinhId,
        },
        nbDotDieuTriId: refOption.current.nbDotDieuTriId,
        phongThucHienId: item?.phongThucHienId,
        key: index,
        stt: index + 1,
      }));

      if (dsDichVuThoaDieuKien.length > 0) {
        // tạo dịch vụ nếu đủ điều kiện
        let dataTamTinhTienDichVuDuThoaDieuKien = dataTamTinhTien
          .filter((item) =>
            dsDichVuThoaDieuKien.some(
              (dichVuId) => dichVuId == item.nbDichVu.dichVuId
            )
          )
          .map((item) => {
            const _findIndex = listSelectedDv.findIndex(
              (x) => x.dichVuId == item.nbDichVu.dichVuId
            );
            if (_findIndex > -1) {
              const _findItem = listSelectedDv[_findIndex];
              //nếu ds phòng thực hiện chỉ có 1 thì set phòng thực hiện vào payload gửi lên
              if (
                _findItem.dsPhongThucHien &&
                _findItem.dsPhongThucHien.length == 1
              ) {
                return {
                  ...item,
                  phongThucHienId: _findItem.dsPhongThucHien[0].phongId,
                };
              }
            }

            return item;
          });
        refIsSubmit.current = true;

        const res = await chiDinhNgoaiDieuTri({
          dataTamTinhTien: dataTamTinhTienDichVuDuThoaDieuKien,
          dsDichVuCanBoSung,
        });
        setState({
          listSelectedDv: [],
        });
        if (res.code == 0) {
          props.refreshList();
          onCancel();
        } else {
          refIsSubmit.current = false;
        }
        dsDichVuCanBoSung = res.dsDichVuCanBoSung;
        //ở đây dùng res.dsDichVuCanBoSung bởi vì đã merge với ds trả về lỗi, nếu chỉ dùng dsDichVuCanBoSung thì sẽ bị thiếu những dịch vụ kê bị lỗi
        onShowDichVuBoSung(dsDichVuCanBoSung);

        const response = res.response || [];
        if (!dsDichVuCanBoSung?.length && response?.length) {
          let item = response.filter((x) => x.data).map((x1) => x1.data);
          let messageWarning = item[item.length - 1].filter((x) => x.message);
          let content = messageWarning[messageWarning?.length - 1]?.message;
          content &&
            refConfirm.current &&
            refConfirm.current.show(
              {
                title: t("common.canhBao"),
                content: content,
                cancelText: t("common.dong"),
                classNameOkText: "button-error",
                showImg: true,
                typeModal: "warning",
              },
              () => {}
            );
        }
      } else {
        onCancel();
        onShowDichVuBoSung(dsDichVuCanBoSung);
      }
    } catch (error) {
      refIsSubmit.current = false;
    }
  };

  const onChangePage = (page) => {
    getDsDvNgoaiDieuTri({ page: page - 1 });
  };

  const handleSizeChange = (size) => {};

  const onSearch = (key) => (e) => {
    onChangeInputSearch({ [key]: e });
  };

  const onTamTinhTien = (listSelectedDv) => {
    const payload = listSelectedDv.map((item) => ({
      nbDotDieuTriId: refOption.current.nbDotDieuTriId,
      nbDichVu: {
        dichVu: {
          ten: item.ten,
          ma: item.ma,
        },
        dichVuId: item?.dichVuId,
        soLuong: item.soLuong || 1,
        loaiDichVu: item?.loaiDichVu,
        khoaChiDinhId: refOption.current.khoaChiDinhId,
      },
      phongThucHienId: item.phongId,
    }));

    tamTinhTien({
      khoaChiDinhId: refOption.current.khoaChiDinhId,
      chiDinhTuDichVuId: state.chiDinhTuDichVuId,
      nbDotDieuTriId: refOption.current.nbDotDieuTriId,
      chiDinhTuLoaiDichVu: state.chiDinhTuLoaiDichVu,
      dsDichVu: payload,
    }).then((s) => {
      const thanhTien = (s || []).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.nbDichVu.thanhTien,
        0
      );
      setState({
        thanhTien: thanhTien,
        listSelectedDv: listSelectedDv,
      });
    });
  };

  const onSelectDichVu = (record) => (e) => {
    if (e.target.hasAttribute("type")) {
      const checked = e.target.checked;

      const { listSelectedDv } = state;
      let updatedListDv = [];
      if (checked) {
        updatedListDv = [
          { ...record, soLuong: record?.soLuongMacDinh || record.soLuong || 1 },
          ...listSelectedDv,
        ];

        //check và hiện thị cảnh báo nếu dịch vụ đã tồn tại
        const _searchIndex = (listSelectedDv || []).findIndex(
          (x) => x.dichVuId == record.dichVuId
        );
        if (_searchIndex != -1) {
          message.error(`Dịch vụ ${record.ten} đã tồn tại!`);
        }
      } else {
        updatedListDv = listSelectedDv.filter(
          (item) => item.uniqueKey !== record.uniqueKey
        );
      }

      onTamTinhTien(updatedListDv);
    } else {
      e.currentTarget.firstElementChild.firstElementChild.firstElementChild.firstElementChild.click();
    }
  };

  const { listDichVu, listSelectedDv, thanhTien } = state;

  return (
    <ModalTemplate
      ref={refModal}
      width={"85%"}
      title="Chỉ định dịch vụ ngoài điều trị"
      onCancel={onCancel}
      actionRight={
        <>
          <Button
            minWidth={100}
            type="default"
            onClick={onCancel}
            iconHeight={15}
          >
            {t("common.huy")}
          </Button>
          <Button minWidth={100} type="primary" onClick={onSubmit}>
            {t("common.dongY")}
          </Button>
        </>
      }
    >
      <Main>
        <div className="filter-box">
          <InputTimeout
            className="filter-item"
            placeholder={t("common.maDv")}
            onChange={onSearch("ma")}
          />

          <InputTimeout
            className="filter-item"
            placeholder={t("common.tenDichVu")}
            onChange={onSearch("ten")}
          />
        </div>

        <div className="list-services">
          <div className="content-equal-w">
            <div className="title-table">{t("common.dichVu")}</div>
            <div className="danh-sach-dich-vu">
              <TableWrapper
                columns={listDvColumns}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: onSelectDichVu(record),
                  };
                }}
                dataSource={listDichVu}
                showHeader={false}
                rowKey={(record) => record?.dichVuId}
                rowClassName={(record, index) => {
                  return index % 2 === 0 ? "table-row-even" : "table-row-odd";
                }}
                scroll={{ y: 350 }}
              />

              {!!totalElements && (
                <Pagination
                  onChange={onChangePage}
                  current={page + 1}
                  pageSize={size}
                  listData={listDichVu}
                  total={totalElements}
                  onShowSizeChange={handleSizeChange}
                  stylePagination={{
                    justifyContent: "flex-start",
                  }}
                />
              )}
            </div>
          </div>

          <div className="content-equal-w">
            <div className="title">
              <div className="title__left">
                <img src={CircleCheck} alt="" /> {t("common.daChon")}
              </div>
              <div className="title__right">
                {t("khamBenh.chiDinh.tongTien")}:{" "}
                {(thanhTien || 0).formatPrice()} đ
              </div>
            </div>

            <div className="content-body">
              <TableWrapper
                rowKey={(record) => {
                  return record.uniqueKey;
                }}
                columns={chooseColumns}
                dataSource={(listSelectedDv || []).map((x, idx) => ({
                  ...x,
                  stt: idx + 1,
                }))}
                scroll={{ x: 450 }}
              />
            </div>
          </div>
        </div>
      </Main>
      <ModalBoSungThongTinDichVu
        ref={refModalBoSungThongTinDichVu}
        refreshList={props.refreshList}
      />
    </ModalTemplate>
  );
};
export default forwardRef(DichVuNgoaiDieuTri);
