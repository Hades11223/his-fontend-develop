import React, { useCallback, useEffect, useMemo, useState } from "react";
import LayoutTV from "./layout";
import {
  makeVerticalBarChartCard,
  makeGroupTransparent,
  makeCardInfo,
  makeTableCard,
  makeCircleChartCard,
  makeGroupNoPaging,
  makeLineChartCard,
  makeTwoCardMini,
  makePercentageChartCard,
} from "./helper";
import moment from "moment";
import { GlobalStyle } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import {
  CO_CAU_DOANH_THU,
  DATA_THE_SO_LIEU,
  DOANH_THU_THEO_DOI_TUONG,
} from "./constant";

const HospitalDataTVShow = (props) => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState({});
  const [firstLoading, setFirstLoading] = useState({});
  const [firstTimeLoading, setFirstTimeLoading] = useState(true);
  const {
    soLieuBenhVien: { getDataSoLieu },
  } = useDispatch();

  const {
    inpatient,
    chuyenVien,
    capCuu,
    phauThuat,
    nhapVien,
    trongVien,
    donThuoc,
    ngoaiTru,
    dataDoanhThu,
    luotTiepDon,
    dataDoanhThuBieuDo,
  } = useSelector((state) => state.soLieuBenhVien) || [];

  const handleChangeDate = useCallback((value) => {
    setSelectedDate(moment(value).format("YYYY-MM-DD"));
  }, []);

  const dataCircleChart = useMemo(() => {
    if (!dataDoanhThu) return [];
    delete dataDoanhThu.thoiGianVaoVien;
    return {
      coCauDoanhThu: CO_CAU_DOANH_THU.map((item) => {
        return {
          ...item,
          value: dataDoanhThu[item.key],
        };
      }),
      doanhThuTheoDoiTuong: DOANH_THU_THEO_DOI_TUONG.map((item) => {
        return {
          ...item,
          value: dataDoanhThu[item.key],
        };
      }),
    };
  }, [dataDoanhThu]);

  useEffect(() => {
    DATA_THE_SO_LIEU.map((item) => getDataSoLieu({ ...item, selectedDate }));
  }, [selectedDate]);

  const dataSource = useMemo(() => {
    return [
      {
        key: "row-1",
        grow: 0,
        groups: [
          ...[
            {
              key: "group-1",
              grow: 2,
              cards: [
                ...[
                  {
                    key: "ngoai_tru",
                    dataSource: ngoaiTru,
                    miniLoading: loading.ngoaitru,
                    loading: firstLoading.ngoaitru,
                    title: "NGOẠI TRÚ",
                    unit: "(Lượt đăng ký)",
                    mappingFields: (_data = {}) => [
                      {
                        key: "tongBhyt",
                        label: "BHYT",
                        value: _data.bhyt,
                      },
                      {
                        key: "tongDv",
                        label: "KHÔNG BHYT",
                        value: _data.khongBhyt,
                      },
                    ],
                  },
                  {
                    key: "chuyenvien",
                    dataSource: chuyenVien,
                    miniLoading: loading.chuyenvien,
                    loading: firstLoading.chuyenvien,
                    title: "CHUYỂN VIỆN",
                    unit: "(Người)",
                    mappingFields: (_data = {}) => [
                      {
                        key: "tongBhyt",
                        label: "BHYT",
                        value: _data.bhyt,
                      },
                      {
                        key: "tongDv",
                        label: "KHÔNG BHYT",
                        value: _data.khongBhyt,
                      },
                    ],
                  },
                  {
                    key: "cap_cuu",
                    dataSource: capCuu,
                    miniLoading: loading.capcuu,
                    loading: firstLoading.capcuu,
                    title: "CẤP CỨU",
                    unit: "(Người)",
                    mappingFields: (_data = {}) => [
                      {
                        key: "tongBhyt",
                        label: "BHYT",
                        value: _data.bhyt,
                      },
                      {
                        key: "tongDv",
                        label: "KHÔNG BHYT",
                        value: _data.khongBhyt,
                      },
                    ],
                  },
                  {
                    key: "phau_thuat",
                    dataSource: phauThuat,
                    miniLoading: loading.phauthuat,
                    loading: firstLoading.phauthuat,
                    title: "PHẪU THUẬT",
                    unit: "(Ca)",
                    isSurgery: true,
                    mappingFields: (_data = {}) => [
                      {
                        key: "tongCapCuu",
                        label: "MỔ CẤP CỨU",
                        value: _data.capCuu,
                      },
                      {
                        key: "tongMoPhien",
                        label: "MỔ PHIÊN",
                        value: _data.thuong,
                      },
                    ],
                  },
                  {
                    key: "nhap_vien",
                    dataSource: nhapVien,
                    miniLoading: loading.noitru,
                    loading: firstLoading.noitru,
                    title: "NHẬP VIỆN",
                    unit: "(Người)",
                    mappingFields: (_data = {}) => [
                      {
                        key: "tongBhyt",
                        label: "BHYT",
                        value: _data.bhyt,
                      },
                      {
                        key: "tongDv",
                        label: "KHÔNG BHYT",
                        value: _data.khongBhyt,
                      },
                    ],
                  },
                  {
                    key: "trong_vien",
                    dataSource: trongVien,
                    miniLoading: loading.trongvien,
                    loading: firstLoading.trongvien,
                    title: "TRONG VIỆN",
                    unit: "(Người)",
                    mappingFields: (_data = {}) => [
                      {
                        key: "dieuTriNgoaiTru",
                        label: "ĐT NGOẠI TRÚ",
                        value: _data.ngoaiTru,
                      },
                      {
                        key: "dieuTriNoiTru",
                        label: "ĐT NỘI TRÚ",
                        value: _data.noiTru,
                      },
                    ],
                  },

                  {
                    key: "don_thuoc",
                    dataSource: donThuoc,
                    miniLoading: loading.donthuoc,
                    loading: firstLoading.donthuoc,
                    title: "ĐƠN THUỐC",
                    unit: "(Đơn đã phát)",
                    mappingFields: (_data = {}) => {
                      return [
                        {
                          key: "bhyt",
                          label: "BHYT",
                          value: _data.bhyt,
                        },
                        {
                          key: "khongBhyt",
                          label: "KHÔNG BHYT",
                          value: _data.khongBhyt,
                        },
                      ];
                    },
                  },
                ].map((card) => makeCardInfo(card)),
              ],
            },
          ].map((group) => makeGroupTransparent(group)),
          ...[
            {
              key: "thongKeLuotTiepDon",
              grow: 1,
              style: {
                padding:
                  "0.41666666666vw 0.41666666666vw 0.41666666666vw 0.41666666666vw",
              },
              cards: [
                {
                  key: "luotTiepDon",
                  dataSource: luotTiepDon,
                  loading: firstLoading.luotTiepDon || loading.luotTiepDon,
                  title: "THỐNG KÊ LƯỢT TIẾP ĐÓN",
                  isCurrencyFormat: false,
                  isCurrencyRounded: true,
                  ignoreLabel: true,
                },
              ].map((card) => makeLineChartCard(card)),
            },
          ].map((group) => makeGroupNoPaging(group)),
        ],
        render: ({ key, grow, groups }) => (
          <div key={key} className="tv-row" style={{ flexGrow: grow || 0 }}>
            {groups.map(({ render, ...item }) => render(item))}
          </div>
        ),
      },
      {
        key: "row-2",
        grow: 1,
        groups: [
          ...[
            {
              key: "group-1",
              grow: 0,
              style: {
                padding: "0 0.41666666666vw",
              },
              cards: [
                ...[
                  {
                    key: "statisticalByServices",
                    dataSource: datas.statisticalByServices,
                    loading:
                      firstLoading.statisticalByServices ||
                      loading.statisticalByServices,
                    title: "DỊCH VỤ KHÁM CHỮA BỆNH",
                    useCurrencyFormat: false,
                    barPerPage: 7,
                    maxLengthLabel: 22,
                    id: "dich-vu-kham-chua-benh",
                  },
                ].map((card) => makePercentageChartCard(card)),
              ],
            },
            {
              key: "group-2",
              grow: 1,
              style: {
                padding: "0",
              },
              cards: [
                ...[
                  {
                    key: "inpatient",
                    dataSource: inpatient,
                    loading: firstLoading.inpatient || loading.inpatient,
                    title: "NGƯỜI BỆNH NỘI TRÚ",
                    recordPerPage: 6,
                    id: "inpatient-table",
                    makeSummaryRow: (_dataSource = []) => {
                      let congSuat = 0;
                      const giuongThucKe = _dataSource.reduce(
                        (prev, current) => prev + current.giuongThucKe || 0,
                        0
                      );
                      const hienCo = _dataSource.reduce(
                        (prev, current) => prev + current.hienCo || 0,
                        0
                      );
                      if (giuongThucKe > 0) {
                        congSuat = hienCo / giuongThucKe;
                      }
                      return {
                        id: "summary-row",
                        tenKhoa: "TOÀN VIỆN",
                        hienCo,
                        vaoVien: _dataSource.reduce(
                          (prev, current) => prev + current.vaoKhoa || 0,
                          0
                        ),
                        raVien: _dataSource.reduce(
                          (prev, current) => prev + current.raKhoa || 0,
                          0
                        ),
                        giuongThucKe,
                        congSuat,
                      };
                    },
                    formatColumns: () => [
                      {
                        dataIndex: "tenKhoa",
                        title: "Khoa",
                        width: "15.3020833333vw",
                        render: (_value, rec, index) => {
                          return (
                            <div
                              title={_value}
                              className="text limited-content text-elipsis"
                              style={{ maxWidth: "calc(14vw)" }}
                            >
                              {_value}
                            </div>
                          );
                        },
                      },
                      {
                        dataIndex: "hienCo",
                        title: "Hiện có",
                        width: "4.58333333333vw",
                        className: "number",
                      },
                      {
                        dataIndex: "vaoKhoa",
                        title: "Vào viện",
                        width: "4.390625vw",
                        className: "number",
                      },
                      {
                        dataIndex: "raKhoa",
                        title: "Ra viện",
                        width: "4.390625vw",
                        className: "number",
                      },
                      {
                        dataIndex: "giuongThucKe",
                        title: "Giường thực kê",
                        width: "4.390625vw",
                        className: "number",
                      },
                      {
                        dataIndex: "congSuat",
                        title: "Công suất",
                        width: "4.96354166667vw",
                        className: "number",
                        render: (_value, rec, index) => {
                          if (index === 0) {
                            const congSuat = Math.round(_value * 100);
                            return (
                              <div
                                className={`number ${
                                  congSuat > 100 ? "red" : "blue"
                                }`}
                              >
                                {congSuat}&nbsp;
                                {typeof congSuat === "number" && "%"}
                              </div>
                            );
                          }
                          let congSuat = Math.round(
                            ((rec.hienCo || 0) / (rec.giuongThucKe || 1)) * 100
                          );
                          if (!rec.giuongThucKe) {
                            congSuat = null;
                          }
                          return (
                            <div
                              className={`number ${
                                congSuat > 100 ? "red" : "blue"
                              }`}
                            >
                              {congSuat}&nbsp;
                              {typeof congSuat === "number" && "%"}
                            </div>
                          );
                        },
                      },
                    ],
                  },
                ].map((card) => makeTableCard(card)),
              ],
            },
          ].map((group) => makeGroupNoPaging(group)),

          ...[
            {
              key: "group-31",
              grow: 1,
              isVertical: true,
              style: { padding: "0 0.41666666666vw" },
              cards: [
                ...[
                  //code here

                  {
                    key: "group-2",
                    grow: 0,
                    paddingBottom: "0.3rem",
                    style: { flexBasis: "40%" },
                    cards: [
                      {
                        key: "actualRevenue",
                        dataSource: datas.actualRevenue,
                        loading:
                          firstLoading.actualRevenue || loading.actualRevenue,
                        title: "DOANH THU NGÀY",
                        isCurrencyFormat: false,
                        isCurrencyRounded: true,
                        lamTronTy: true,
                      },
                    ].map((card) => makeLineChartCard(card)),
                  },
                ].map((group) => makeGroupNoPaging(group)),
                ...[
                  {
                    key: "group-32",
                    grow: 1,
                    isVertical: false,
                    numCard: 1,
                    cards: [
                      ...[
                        {
                          key: "reportByPatient",
                          dataSource: dataCircleChart.coCauDoanhThu,
                          loading:
                            firstLoading.reportByPatient ||
                            loading.reportByPatient,
                          title: "CƠ CẤU DOANH THU",
                          useCurrencyFormat: true,
                          cyPercent: "47%",
                          useBackground: true,
                        },
                      ].map((card) => makeCircleChartCard(card)),
                      ...[
                        {
                          key: "reportByDoiTuong",
                          dataSource: dataCircleChart.doanhThuTheoDoiTuong,
                          loading:
                            firstLoading.reportByDoiTuong ||
                            loading.reportByDoiTuong,
                          title: "DOANH THU THEO ĐỐI T.G",
                          useCurrencyFormat: true,
                          useBackground: true,
                        },
                      ].map((card) => makeCircleChartCard(card)),
                    ],
                  },
                ].map((group) => makeTwoCardMini(group)),
              ],
            },
          ].map((group) => makeGroupTransparent(group)),
        ],
        render: ({ key, grow, groups }) => {
          return (
            <div key={key} className="tv-row" style={{ flexGrow: grow || 0 }}>
              {groups.map(({ render, ...item }) => render(item))}
            </div>
          );
        },
      },
    ];
  }, [
    datas,
    loading,
    firstLoading,
    inpatient,
    donThuoc,
    chuyenVien,
    capCuu,
    trongVien,
    phauThuat,
    nhapVien,
    ngoaiTru,
    luotTiepDon,
    dataDoanhThu,
  ]);

  return (
    <>
      <GlobalStyle />
      <LayoutTV
        date={selectedDate}
        onChangeDate={handleChangeDate}
        // getData={getAllData}
        // onRefresh={handleRefreshData}
        pageTitle="Số liệu bệnh viện"
      >
        {dataSource.map(({ render, ...item }) => render(item))}
      </LayoutTV>
    </>
  );
};

export default React.memo(HospitalDataTVShow);
