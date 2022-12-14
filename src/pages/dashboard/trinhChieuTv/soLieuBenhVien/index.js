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
                    title: "NGO???I TR??",
                    unit: "(L?????t ????ng k??)",
                    mappingFields: (_data = {}) => [
                      {
                        key: "tongBhyt",
                        label: "BHYT",
                        value: _data.bhyt,
                      },
                      {
                        key: "tongDv",
                        label: "KH??NG BHYT",
                        value: _data.khongBhyt,
                      },
                    ],
                  },
                  {
                    key: "chuyenvien",
                    dataSource: chuyenVien,
                    miniLoading: loading.chuyenvien,
                    loading: firstLoading.chuyenvien,
                    title: "CHUY???N VI???N",
                    unit: "(Ng?????i)",
                    mappingFields: (_data = {}) => [
                      {
                        key: "tongBhyt",
                        label: "BHYT",
                        value: _data.bhyt,
                      },
                      {
                        key: "tongDv",
                        label: "KH??NG BHYT",
                        value: _data.khongBhyt,
                      },
                    ],
                  },
                  {
                    key: "cap_cuu",
                    dataSource: capCuu,
                    miniLoading: loading.capcuu,
                    loading: firstLoading.capcuu,
                    title: "C???P C???U",
                    unit: "(Ng?????i)",
                    mappingFields: (_data = {}) => [
                      {
                        key: "tongBhyt",
                        label: "BHYT",
                        value: _data.bhyt,
                      },
                      {
                        key: "tongDv",
                        label: "KH??NG BHYT",
                        value: _data.khongBhyt,
                      },
                    ],
                  },
                  {
                    key: "phau_thuat",
                    dataSource: phauThuat,
                    miniLoading: loading.phauthuat,
                    loading: firstLoading.phauthuat,
                    title: "PH???U THU???T",
                    unit: "(Ca)",
                    isSurgery: true,
                    mappingFields: (_data = {}) => [
                      {
                        key: "tongCapCuu",
                        label: "M??? C???P C???U",
                        value: _data.capCuu,
                      },
                      {
                        key: "tongMoPhien",
                        label: "M??? PHI??N",
                        value: _data.thuong,
                      },
                    ],
                  },
                  {
                    key: "nhap_vien",
                    dataSource: nhapVien,
                    miniLoading: loading.noitru,
                    loading: firstLoading.noitru,
                    title: "NH???P VI???N",
                    unit: "(Ng?????i)",
                    mappingFields: (_data = {}) => [
                      {
                        key: "tongBhyt",
                        label: "BHYT",
                        value: _data.bhyt,
                      },
                      {
                        key: "tongDv",
                        label: "KH??NG BHYT",
                        value: _data.khongBhyt,
                      },
                    ],
                  },
                  {
                    key: "trong_vien",
                    dataSource: trongVien,
                    miniLoading: loading.trongvien,
                    loading: firstLoading.trongvien,
                    title: "TRONG VI???N",
                    unit: "(Ng?????i)",
                    mappingFields: (_data = {}) => [
                      {
                        key: "dieuTriNgoaiTru",
                        label: "??T NGO???I TR??",
                        value: _data.ngoaiTru,
                      },
                      {
                        key: "dieuTriNoiTru",
                        label: "??T N???I TR??",
                        value: _data.noiTru,
                      },
                    ],
                  },

                  {
                    key: "don_thuoc",
                    dataSource: donThuoc,
                    miniLoading: loading.donthuoc,
                    loading: firstLoading.donthuoc,
                    title: "????N THU???C",
                    unit: "(????n ???? ph??t)",
                    mappingFields: (_data = {}) => {
                      return [
                        {
                          key: "bhyt",
                          label: "BHYT",
                          value: _data.bhyt,
                        },
                        {
                          key: "khongBhyt",
                          label: "KH??NG BHYT",
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
                  title: "TH???NG K?? L?????T TI???P ????N",
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
                    title: "D???CH V??? KH??M CH???A B???NH",
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
                    title: "NG?????I B???NH N???I TR??",
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
                        tenKhoa: "TO??N VI???N",
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
                        title: "Hi???n c??",
                        width: "4.58333333333vw",
                        className: "number",
                      },
                      {
                        dataIndex: "vaoKhoa",
                        title: "V??o vi???n",
                        width: "4.390625vw",
                        className: "number",
                      },
                      {
                        dataIndex: "raKhoa",
                        title: "Ra vi???n",
                        width: "4.390625vw",
                        className: "number",
                      },
                      {
                        dataIndex: "giuongThucKe",
                        title: "Gi?????ng th???c k??",
                        width: "4.390625vw",
                        className: "number",
                      },
                      {
                        dataIndex: "congSuat",
                        title: "C??ng su???t",
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
                        title: "DOANH THU NG??Y",
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
                          title: "C?? C???U DOANH THU",
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
                          title: "DOANH THU THEO ?????I T.G",
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
        pageTitle="S??? li???u b???nh vi???n"
      >
        {dataSource.map(({ render, ...item }) => render(item))}
      </LayoutTV>
    </>
  );
};

export default React.memo(HospitalDataTVShow);
