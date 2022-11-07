import React, { useEffect, useState, useMemo, useRef } from "react";
import { Radio } from "antd";
import { Pagination, TableWrapper, HeaderSearch } from "components";
import { useDispatch, useSelector } from "react-redux";
import { ContentTable, Main, InputCustom } from "./styled";
import { map, merge, find } from "lodash";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { data } from "./config";

const DsTrieuChung = (props) => {
  const { totalElements, match } = props;

  const [state, _setState] = useState({
    selected: {},
    updateNgayHomNay: false,
  });
  const refTimeout = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { listChiTietTheoDoiNguoiBenh } = useSelector(
    (state) => state.chiTietTheoDoiNguoiBenh
  );

  const {
    chiTietTheoDoiNguoiBenh: {
      searchByParams,
      themThongTinNgayDieuTri,
      updateThongTin,
    },
    danhSachCovid: { updateData },
    nbDocThuocCovid: { getListDichVuThuoc, updateData: updateDataDonThuoc },
  } = useDispatch();

  const initState = useMemo(() => {
    let obj = {};
    let filterDays = listChiTietTheoDoiNguoiBenh.filter((item, index) => {
      //tạo dữ liệu state mặc định ban đầu
      obj = {
        ...obj,
        [item.ngayThu]: {
          ...item,
        },
      };
      // item.days = index + 1
      return item;
    });
    return obj;
  }, [listChiTietTheoDoiNguoiBenh]);

  const listChiTietTheoDoiNguoiBenhCustom = useMemo(() => {
    let list = [];
    let obj = initState;

    //thêm giá trị ngày cho từng item để phân biệt đang là ngày thứ mấy
    let filterDays = [...listChiTietTheoDoiNguoiBenh];

    // khi dữ liệu chưa đủ 12 ngày sẽ tạo thêm số ngày cho đử 12 để chọn radio
    if (filterDays.length < 12) {
      let j = 1;
      let initNumberDisplay = [];
      while (j <= 12) {
        initNumberDisplay.push({
          // days: j,
          ngayThu: j,
        });
        ++j;
      }
      const result = map(initNumberDisplay, function (item) {
        return merge(item, find(filterDays, { ngayThu: item.ngayThu }));
      });
      filterDays = result;
    }

    //thêm tất cả các ngày vào item
    data.forEach((item, index) => {
      item.listItemDay = filterDays;
      list.push(item);
    });
    //set giá trị mặc định các radio
    if (obj) {
      setState({ selected: obj });
    }
    return list;
  }, [listChiTietTheoDoiNguoiBenh, initState]);

  const search = window.location.pathname.split("/");
  const nbDotDieuTriId = search[search.length - 1];
  // const [state, setState] = useState({
  //   page: 1,
  //   size: 10,
  //   data: [],
  // });
  useEffect(() => {
    // searchByParams({ nbDotDieuTriId: "11603", sort: "ngayTheoDoi" })
    searchByParams({ nbDotDieuTriId: match?.params?.id, sort: "ngayTheoDoi" });
    updateData({ selectedId: match?.params?.id });
  }, []);
  useEffect(() => {
    if (state?.selected && state?.ngayThu) {
      if (state?.updateNgayHomNay) {
        updateThongTin({
          ...state.selected[state.ngayThu],
          nbDotDieuTriId: match?.params?.id,
          ngayTheoDoi: moment().toDate(),
          ngayThu: state.ngayThu,
        });
      } else {
        themThongTinNgayDieuTri({
          ...state.selected[state.ngayThu],
          nbDotDieuTriId: match?.params?.id,
          ngayTheoDoi: moment().toDate(),
          ngayThu: state.ngayThu,
        });
      }
    }
  }, [state.selected]);

  const handleSort = (isString) => (key, value) => {
    // const newDataRender = Object.assign([], state.data);
    // if (value != 0) {
    //   if (isString) {
    //     newDataRender.sort(sortString(key, value));
    //   } else {
    //     newDataRender.sort((a, b) =>
    //       value === 1 ? a[key] - b[key] : b[key] - a[key]
    //     );
    //   }
    // }
    // setState({ ...state, dataRender: newDataRender, sort: { key, value } });
  };
  const onRadioChange = (key, days, itemDay, isDayCurrent) => (e) => {
    let updateNgayHomNay = false;

    if (
      itemDay?.ngayTheoDoi &&
      moment(itemDay?.ngayTheoDoi).format("DD/MM/YYYY") ===
        moment().format("DD/MM/YYYY")
    ) {
      //ngày hiện tại đã có khai báo nên sẽ chuyển sang PUT
      updateNgayHomNay = true;
    } else if (
      listChiTietTheoDoiNguoiBenh[listChiTietTheoDoiNguoiBenh.length - 1]
        ?.ngayThu +
        1 ===
        days &&
      moment(
        listChiTietTheoDoiNguoiBenh[listChiTietTheoDoiNguoiBenh.length - 1]
          ?.ngayTheoDoi
      )
        .add(1, "days")
        .format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")
    ) {
      // nếu chọn , mà có ngày kế tiếp trong list === với ngày hôm nay thì cho chọn
    } else if (listChiTietTheoDoiNguoiBenh.length === 0) {
      //nếu list chưa có ngày nào sẽ chỉ được chọn ngày 1
      if (days === 1) {
        //nếu list chưa có ngày nào sẽ chỉ được chọn ngày 1
      } else {
        // nếu list chưa có không phải ngày 1 sẽ không được chọn
        return null;
      }
    } else if (isDayCurrent) {
      // nếu ngày hôm nay là ngày được click , mà không cần liên tiếp các ngày trước, chỉ cần ngày hôm nay, là được click
    } else {
      return null;
    }

    let name = e.target.name;
    let value = e.target.value;
    setState({
      selected: {
        ...state.selected,
        [days]: {
          ...(state?.selected && state?.selected[days]),
          [key]: value,
        },
      },
      ngayThu: days,
      updateNgayHomNay,
    });
  };
  const onHandleInputTable = (key, days, itemDay, isDayCurrent) => (e) => {
    let value = e.target.value;
    let updateNgayHomNay = false;

    if (key === "nhietDo") {
      if (
        itemDay?.ngayTheoDoi &&
        moment(itemDay?.ngayTheoDoi).format("DD/MM/YYYY") ===
          moment().format("DD/MM/YYYY")
      ) {
        //ngày hiện tại đã có khai báo nên sẽ chuyển sang PUT
        updateNgayHomNay = true;
      } else if (
        listChiTietTheoDoiNguoiBenh[listChiTietTheoDoiNguoiBenh.length - 1]
          ?.ngayThu +
          1 ===
          days &&
        moment(
          listChiTietTheoDoiNguoiBenh[listChiTietTheoDoiNguoiBenh.length - 1]
            ?.ngayTheoDoi
        )
          .add(1, "days")
          .format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")
      ) {
        // nếu chọn , mà có ngày kế tiếp trong list === với ngày hôm nay thì cho chọn
      } else if (listChiTietTheoDoiNguoiBenh.length === 0) {
        //nếu list chưa có ngày nào sẽ chỉ được chọn ngày 1
        if (days === 1) {
          //nếu list chưa có ngày nào sẽ chỉ được chọn ngày 1
        } else {
          // nếu list chưa có không phải ngày 1 sẽ không được chọn
          return null;
        }
      } else if (isDayCurrent) {
        // nếu ngày hôm nay là ngày được click , mà không cần liên tiếp các ngày trước, chỉ cần ngày hôm nay, là được click
      } else {
        return null;
      }
      if (refTimeout.current) {
        clearTimeout(refTimeout.current);
        refTimeout.current = null;
      }
      refTimeout.current = setTimeout(
        (obj = "") => {
          setState({
            selected: {
              ...state.selected,
              [obj?.days]: {
                ...(state?.selected && state?.selected[obj?.days]),
                [obj?.key]: obj?.value,
              },
            },
            ngayThu: obj?.days,
            updateNgayHomNay: obj?.updateNgayHomNay,
          });
        },
        1,
        {
          key,
          days,
          value: e.target.value,
          updateNgayHomNay,
        }
      );
    }
  };
  let sameKey;
  let activeCurrentDay = (day) => {
    const ngayTheoDoiDauTien = listChiTietTheoDoiNguoiBenh[0]?.ngayTheoDoi;
    if (!ngayTheoDoiDauTien && day === 0) {
      // nếu chưa có dữ liệu , sẽ active border d1 là ngày hiện tại
      return true;
    }
    return (
      moment(moment(ngayTheoDoiDauTien, "YYYY/MM/DD"))
        .add(day, "days")
        .format("DD/MM/YYYY") === moment().format("DD/MM/YYYY") || false
    );
  };

  const onSearch = (item) => {
    updateDataDonThuoc({ nbTheoDoiCovidId: item });
    getListDichVuThuoc({
      nbTheoDoiCovidId: item,
      nbDotDieuTriId: match?.params?.id,
    });
  };
  // const columns = [
  //   {
  //     width: 200,
  //     title: <HeaderSearch title="Triệu chứng/Mức độ" />,
  //     children: [
  //       {
  //         dataIndex: "titleHeaderLeft",
  //         key: 1,
  //         width: 100,
  //         render: (value) => {
  //           const obj = {
  //             children: value,
  //             props: {}
  //           };
  //           if (!(sameKey !== value)) {
  //             obj.props.rowSpan = 0;
  //             return obj;
  //           }
  //           const count = data.filter(item => item.titleHeaderLeft === value).length;
  //           sameKey = value;
  //           obj.props.rowSpan = count;
  //           return obj;
  //         }
  //       },
  //       {
  //         width: 100,
  //         dataIndex: "state_name",
  //         key: 2
  //       },
  //     ],
  //   },
  //   {
  //     title: (e) => {
  //       return (
  //         <HeaderSearch
  //           title="D1"
  //           sort_key="d1"
  //           onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[0].id)}
  //           className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(0) ? "active" : ""}`}
  //           // onClickSort={handleSort(true)}
  //         // dataSort={(state.sort?.key === "d1" && state.sort?.value) || 0}
  //         />
  //       )
  //     },
  //     className: `${activeCurrentDay(0) ? "active" : ""}`,
  //     align: "center",
  //     render: (item) => {
  //       let itemDay = item?.listItemDay && item?.listItemDay[0]
  //       let days = item?.listItemDay && item?.listItemDay[0] && item?.listItemDay[0]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       if (item.keyDefine === "nhietDo") {
  //         if ((itemDay?.nhietDo && (moment(itemDay?.ngayTheoDoi).format("DD/MM/YYYY") !== moment().format("DD/MM/YYYY")))) {
  //           return (<InputCustom
  //             disabled={true}
  //             value={itemDay?.nhietDo}
  //           />)
  //         }
  //         return (<InputCustom
  //           // defaultValue={item.listItemDay[0].nhietDo}
  //           value={state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine]}
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //         // return (<InputCustom
  //         //   disabled={itemDay?.nhietDo}
  //         //   value={state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine]}
  //         //   onChange={onHandleInputTable(item.keyDefine, days,itemDay)}
  //         // />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //       return (
  //         <input
  //           // checked={(state?.selected && state?.selected[item.keyDefine] === value) || item.value === value}
  //           checked={(state?.selected && state?.selected[item.keyDefine] == item.value)}
  //           type="radio"
  //           value={item.value}
  //           name={item.keyDefine}
  //           onChange={onRadioChange(item.keyDefine)} />
  //       )
  //     },
  //     // dataIndex: "d1",
  //     key: "d1",
  //     width: 90,
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="D2"
  //         sort_key="d2"
  //         onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[1].id)}
  //         dataSort={(state.sort?.key === "d2" && state.sort?.value) || 0}
  //         className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(1) ? "active" : ""}`}
  //         // onClickSort={handleSort(false)}
  //       />
  //     ),
  //     className: `${activeCurrentDay(1) ? "active" : ""}`,
  //     key: "d2",
  //     align: "center",
  //     width: 90,
  //     render: (item) => {
  //       let days = item?.listItemDay && item?.listItemDay[1] && item?.listItemDay[1]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       let itemDay = item?.listItemDay && item?.listItemDay[1]
  //       if (item.keyDefine === "nhietDo") {
  //         // if (itemDay?.nhietDo) {
  //         //   return (<InputCustom
  //         //     // disabled={itemDay?.nhietDo}
  //         //     value={itemDay?.nhietDo}
  //         //   />)
  //         // }
  //         return (<InputCustom
  //           value={state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine]}
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //     },
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="D3"
  //         sort_key="d3"
  //         dataSort={(state.sort?.key === "d3" && state.sort?.value) || 0}
  //         onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[2].id)}
  //         // onClickSort={handleSort(false)}
  //         className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(2) ? "active" : ""}`}
  //       />
  //     ),
  //     align: "center",
  //     className: `${activeCurrentDay(2) ? "active" : ""}`,
  //     // dataIndex: "d3",
  //     key: "d3",
  //     width: 90,
  //     render: (item) => {
  //       let days = item?.listItemDay && item?.listItemDay[2] && item?.listItemDay[2]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       let itemDay = item?.listItemDay && item?.listItemDay[2]
  //       if (item.keyDefine === "nhietDo") {
  //         if (itemDay?.nhietDo) {
  //           return (<InputCustom
  //             disabled={itemDay?.nhietDo}
  //             value={itemDay?.nhietDo}
  //           />)
  //         }
  //         return (<InputCustom
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //     },
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="D4"
  //         sort_key="d4"
  //         className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(3) ? "active-header" : ""}`}
  //         onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[3].id)}
  //         // onClickSort={handleSort(false)}
  //         dataSort={(state.sort?.key === "d4" && state.sort?.value) || 0}
  //       />
  //     ),
  //     className: `${activeCurrentDay(3) ? "active" : ""}`,
  //     key: "d4",
  //     width: 90,
  //     align: "center",
  //     key: "d3",
  //     width: 90,
  //     render: (item) => {
  //       let days = item?.listItemDay && item?.listItemDay[3] && item?.listItemDay[3]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       let itemDay = item?.listItemDay && item?.listItemDay[3]
  //       if (item.keyDefine === "nhietDo") {
  //         if (itemDay?.nhietDo) {
  //           return (<InputCustom
  //             disabled={itemDay?.nhietDo}
  //             value={itemDay?.nhietDo}
  //           />)
  //         }
  //         return (<InputCustom
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //     },
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="D5"
  //         sort_key="d5"
  //         onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[4].id)}
  //         // onClickSort={handleSort(false)}
  //         className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(4) ? "active-header" : ""}`}
  //         dataSort={
  //           (state.sort?.key === "d5" && state.sort?.value) || 0
  //         }
  //       />
  //     ),
  //     className: `${activeCurrentDay(4) ? "active" : ""}`,
  //     // dataIndex: "d5",
  //     key: "d5",
  //     width: 90,
  //     align: "center",
  //     render: (item) => {
  //       let days = item?.listItemDay && item?.listItemDay[4] && item?.listItemDay[4]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       let itemDay = item?.listItemDay && item?.listItemDay[4]
  //       if (item.keyDefine === "nhietDo") {
  //         if (itemDay?.nhietDo) {
  //           return (<InputCustom
  //             disabled={itemDay?.nhietDo}
  //             value={itemDay?.nhietDo}
  //           />)
  //         }
  //         return (<InputCustom
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //     },
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="D6"
  //         sort_key="d6"
  //         onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[5].id)}
  //         // onClickSort={handleSort(true)}
  //         className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(5) ? "active-header" : ""}`}
  //         dataSort={
  //           (state.sort?.key === "d6" && state.sort?.value) || 0
  //         }
  //       />
  //     ),
  //     className: `${activeCurrentDay(5) ? "active" : ""}`,
  //     key: "d6",
  //     width: 90,
  //     align: "center",
  //     render: (item) => {
  //       let days = item?.listItemDay && item?.listItemDay[5] && item?.listItemDay[5]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       let itemDay = item?.listItemDay && item?.listItemDay[5]
  //       if (item.keyDefine === "nhietDo") {
  //         if (itemDay?.nhietDo) {
  //           return (<InputCustom
  //             disabled={itemDay?.nhietDo}
  //             value={itemDay?.nhietDo}
  //           />)
  //         }
  //         return (<InputCustom
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //     },
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="D7"
  //         sort_key="d7"
  //         onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[6].id)}
  //         // onClickSort={handleSort(true)}
  //         className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(6) ? "active-header" : ""}`}
  //         dataSort={
  //           (state.sort?.key === "d7" && state.sort?.value) || 0
  //         }
  //       />
  //     ),
  //     className: `${activeCurrentDay(6) ? "active" : ""}`,
  //     key: "d7",
  //     width: 90,
  //     align: "center",
  //     render: (item) => {
  //       let days = item?.listItemDay && item?.listItemDay[6] && item?.listItemDay[6]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       let itemDay = item?.listItemDay && item?.listItemDay[6]
  //       if (item.keyDefine === "nhietDo") {
  //         if (itemDay?.nhietDo) {
  //           return (<InputCustom
  //             disabled={itemDay?.nhietDo}
  //             value={itemDay?.nhietDo}
  //           />)
  //         }
  //         return (<InputCustom
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //     },
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="D8"
  //         sort_key="d8"
  //         onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[7].id)}
  //         // onClickSort={handleSort(true)}
  //         className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(7) ? "active-header" : ""}`}
  //         dataSort={
  //           (state.sort?.key === "d8" && state.sort?.value) || 0
  //         }
  //       />
  //     ),
  //     className: `${activeCurrentDay(7) ? "active" : ""}`,
  //     key: "d8",
  //     width: 90,
  //     align: "center",
  //     render: (item) => {
  //       let days = item?.listItemDay && item?.listItemDay[7] && item?.listItemDay[7]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       let itemDay = item?.listItemDay && item?.listItemDay[7]
  //       if (item.keyDefine === "nhietDo") {
  //         if (itemDay?.nhietDo) {
  //           return (<InputCustom
  //             disabled={itemDay?.nhietDo}
  //             value={itemDay?.nhietDo}
  //           />)
  //         }
  //         return (<InputCustom
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //     },
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="D9"
  //         sort_key="d9"
  //         onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[8].id)}
  //         // onClickSort={handleSort(false)}
  //         className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(8) ? "active-header" : ""}`}
  //         dataSort={(state.sort?.key === "d9" && state.sort?.value) || 0}
  //       />
  //     ),
  //     className: `${activeCurrentDay(8) ? "active" : ""}`,
  //     key: "d9",
  //     width: 90,
  //     align: "center",
  //     render: (item) => {
  //       let days = item?.listItemDay && item?.listItemDay[8] && item?.listItemDay[8]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       let itemDay = item?.listItemDay && item?.listItemDay[8]
  //       if (item.keyDefine === "nhietDo") {
  //         if (itemDay?.nhietDo) {
  //           return (<InputCustom
  //             disabled={itemDay?.nhietDo}
  //             value={itemDay?.nhietDo}
  //           />)
  //         }
  //         return (<InputCustom
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //     },
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="D10"
  //         sort_key="d10"
  //         className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(9) ? "active-header" : ""}`}
  //         onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[9].id)}
  //         // onClickSort={handleSort(false)}
  //         dataSort={
  //           (state.sort?.key === "d10" && state.sort?.value) || 0
  //         }
  //       />
  //     ),
  //     className: `${activeCurrentDay(9) ? "active" : ""}`,
  //     key: "d10",
  //     width: 90,
  //     align: "center",
  //     render: (item) => {
  //       let days = item?.listItemDay && item?.listItemDay[9] && item?.listItemDay[9]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       let itemDay = item?.listItemDay && item?.listItemDay[9]
  //       if (item.keyDefine === "nhietDo") {
  //         if (itemDay?.nhietDo) {
  //           return (<InputCustom
  //             disabled={itemDay?.nhietDo}
  //             value={itemDay?.nhietDo}
  //           />)
  //         }
  //         return (<InputCustom
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //     },
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="D11"
  //         sort_key="d11"
  //         className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(10) ? "active-header" : ""}`}
  //         onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[10].id)}
  //         // onClickSort={handleSort(false)}
  //         dataSort={
  //           (state.sort?.key === "d11" && state.sort?.value) || 0
  //         }
  //       />
  //     ),
  //     className: `${activeCurrentDay(10) ? "active" : ""}`,
  //     key: "d11",
  //     width: 90,
  //     align: "center",
  //     render: (item) => {
  //       let days = item?.listItemDay && item?.listItemDay[10] && item?.listItemDay[10]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       let itemDay = item?.listItemDay && item?.listItemDay[10]
  //       if (item.keyDefine === "nhietDo") {
  //         if (itemDay?.nhietDo) {
  //           return (<InputCustom
  //             disabled={itemDay?.nhietDo}
  //             value={itemDay?.nhietDo}
  //           />)
  //         }
  //         return (<InputCustom
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //     },
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="D12"
  //         sort_key="d12"
  //         onClickSort={() => onSearch(listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[11].id)}
  //         // onClickSort={handleSort(false)}
  //         className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(11) ? "active-header" : ""}`}
  //         dataSort={
  //           (state.sort?.key === "d12" && state.sort?.value) || 0
  //         }
  //       />
  //     ),
  //     className: `${activeCurrentDay(11) ? "active" : ""}`,
  //     key: "d12",
  //     width: 90,
  //     align: "center",
  //     render: (item) => {
  //       let days = item?.listItemDay && item?.listItemDay[11] && item?.listItemDay[11]?.days
  //       let checked = (state?.selected && state?.selected[days] && state?.selected[days][item.keyDefine] == item.value) || false
  //       let itemDay = item?.listItemDay && item?.listItemDay[11]
  //       if (item.keyDefine === "nhietDo") {
  //         if (itemDay?.nhietDo) {
  //           return (<InputCustom
  //             disabled={itemDay?.nhietDo}
  //             value={itemDay?.nhietDo}
  //           />)
  //         }
  //         return (<InputCustom
  //           onChange={onHandleInputTable(item.keyDefine, days, itemDay)}
  //         />)
  //       }
  //       return (
  //         <Radio
  //           type="radio"
  //           value={item.value}
  //           checked={checked}
  //           name={`${item.keyDefine}${days}`}
  //           onChange={onRadioChange(item.keyDefine, days, itemDay)}></Radio>
  //       )
  //     },
  //   },
  //   {
  //     title: (
  //       <HeaderSearch
  //         title="Ghi chú"
  //         sort_key="ghiChu"
  //         onClickSort={handleSort(false)}
  //         dataSort={
  //           (state.sort?.key === "ghiChu" && state.sort?.value) || 0
  //         }
  //       />
  //     ),
  //     key: "ghiChu",
  //     width: 200,
  //     align: "center",
  //     render: (item) => {
  //       return (<InputCustom onChange={onHandleInputTable(item.keyDefine, null, null, "ghiChu")} />)
  //     },
  //   },
  // ];
  // const data = listChiTietTheoDoiNguoiBenhCustom
  const columnsCustom = useMemo(() => {
    // let arrMax = cloneDeep(listChiTietTheoDoiNguoiBenh)
    // // ---------------------------------------------------------------- xử lý mảng hiển thị bao nhiu ngày
    // if (listChiTietTheoDoiNguoiBenh?.length < 12) {
    //   let i = cloneDeep(listChiTietTheoDoiNguoiBenh.length) + 1
    //   while (i <= 12) {
    //     arrMax.push({
    //       ngayThu: i
    //     })
    //     ++i
    //   }
    // }
    let initNumberDisplay = [];
    let j = 1;
    while (j <= 12) {
      initNumberDisplay.push({
        // days: j,
        ngayThu: j,
      });
      ++j;
    }
    const result = map(initNumberDisplay, function (item) {
      return merge(
        item,
        find(listChiTietTheoDoiNguoiBenh, { ngayThu: item.ngayThu })
      );
    });
    // ---------------------------------------------------------------- các ngày hiển thị như thế nào
    let arr = result?.reduce(
      (init, itemParent, index) => {
        init.push({
          title: (e) => {
            return (
              <HeaderSearch
                title={`D${index + 1}`}
                sort_key={`d${index + 1}`}
                onClickSort={() =>
                  onSearch(
                    listChiTietTheoDoiNguoiBenhCustom[0]?.listItemDay[index].id
                  )
                }
                dataSort={
                  (state.sort?.key === `d${index + 1}` && state.sort?.value) ||
                  0
                }
                // className={`title-box d-flex justify-content-center mn-sortable ${activeCurrentDay(0) ? "active" : ""}`}
                // onClickSort={handleSort(true)}
                // dataSort={(state.sort?.key === "d1" && state.sort?.value) || 0}
              />
            );
          },
          className: `${activeCurrentDay(index) ? "active" : ""}`,
          align: "center",
          render: (item) => {
            let itemDay = item?.listItemDay && item?.listItemDay[index];
            let ngayThu =
              item?.listItemDay &&
              item?.listItemDay[index] &&
              item?.listItemDay[index]?.ngayThu;
            let checked =
              (state?.selected &&
                state?.selected[ngayThu] &&
                state?.selected[ngayThu][item.keyDefine] == item.value) ||
              false;
            if (item.keyDefine === "nhietDo") {
              if (
                (itemDay?.nhietDo &&
                  moment(itemDay?.ngayTheoDoi).format("DD/MM/YYYY") !==
                    moment().format("DD/MM/YYYY")) ||
                !activeCurrentDay(index)
              ) {
                return <InputCustom disabled={true} value={itemDay?.nhietDo} />;
              }
              return (
                <InputCustom
                  onKeyDown={(evt) => {
                    let checkReg =
                      /[a-zA-Z\?\>\<\`\~\\\[\]\;\'!@#\$%\^\&*\)\(+=,_-]/g.test(
                        evt.key
                      );
                    if (evt.key === "Backspace") {
                    } else if (evt.target.value.length > 4 && !checkReg) {
                      return evt.preventDefault();
                    } else {
                      return checkReg && evt.preventDefault();
                    }
                  }}
                  value={
                    state?.selected &&
                    state?.selected[ngayThu] &&
                    state?.selected[ngayThu][item.keyDefine]
                  }
                  onChange={onHandleInputTable(
                    item.keyDefine,
                    ngayThu,
                    itemDay,
                    activeCurrentDay(index)
                  )}
                />
              );
            }
            return (
              <Radio
                type="radio"
                value={item.value}
                checked={checked}
                name={`${item.keyDefine}${ngayThu}`}
                onChange={onRadioChange(
                  item.keyDefine,
                  ngayThu,
                  itemDay,
                  activeCurrentDay(index)
                )}
              ></Radio>
            );
          },
          // dataIndex: "d1",
          key: "d1",
          width: 90,
        });
        return init;
      },
      [
        {
          // ---------------------------------------------------------------- các table bên trái
          width: 200,
          title: <HeaderSearch title="Triệu chứng/Mức độ" />,
          children: [
            {
              dataIndex: "titleHeaderLeft",
              key: 1,
              width: 100,
              render: (value) => {
                const obj = {
                  children: (
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{value}</div>
                  ),
                  props: {
                    style: { verticalAlign: "middle" },
                  },
                };
                if (!(sameKey !== value)) {
                  obj.props.rowSpan = 0;
                  return obj;
                }
                const count = data.filter(
                  (item) => item.titleHeaderLeft === value
                ).length;
                sameKey = value;
                obj.props.rowSpan = count;
                return obj;
              },
            },
            {
              width: 100,
              // dataIndex: "state_name",
              key: 2,
              render: (item) => {
                return (
                  <div style={{ fontWeight: 700, fontSize: 14 }}>
                    {item?.state_name}
                  </div>
                );
              },
            },
          ],
        },
      ]
    );
    // ---------------------------------------------------------------- Ghi chú column
    arr.push({
      title: (
        <HeaderSearch
          title="Ghi chú"
          sort_key="ghiChu"
          onClickSort={handleSort(false)}
          dataSort={(state.sort?.key === "ghiChu" && state.sort?.value) || 0}
        />
      ),
      key: "ghiChu",
      width: 200,
      align: "center",
      render: (item) => {
        return (
          <InputCustom
            onChange={onHandleInputTable(item.keyDefine, null, null, "ghiChu")}
          />
        );
      },
    });
    return arr;
  });
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columnsCustom}
          dataSource={listChiTietTheoDoiNguoiBenhCustom}
          bordered={false}
          //   onRow={onRow}
          rowKey={(record) => record.id}
          //   rowClassName={setRowClassName}
        />
        <Pagination
          onChange={(page) => setState({ ...state, page })}
          current={state.page}
          pageSize={state.size}
          total={totalElements}
          onShowSizeChange={(size) => setState({ ...state, size, page: 1 })}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
    </Main>
  );
};

export default withRouter(React.memo(DsTrieuChung));
