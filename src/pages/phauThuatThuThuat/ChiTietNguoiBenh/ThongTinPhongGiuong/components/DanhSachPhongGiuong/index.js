import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { HeaderSearch, TableWrapper } from "components";
import { Main } from "./styled"
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from "moment"

const DanhSachPhongGiuong = () => {
    const { t } = useTranslation();

    const { dsGiuongCuaNB, dataSortColumn } = useSelector(
        (state) => state.phanPhongGiuong
    );
    const { phanPhongGiuong: { getPhongGiuongTheoNB, onChangeInputSearch, onSortChange } } = useDispatch()
    const { dataDetail } =
        useSelector((state) => state.pttt);

    const [state, _setState] = useState({
        dataSortColumn: {},
    })
    const setState = (data = {}) => _setState(state => ({ ...state, ...data }))

    const onSearchInput = (key) => (e) => {
        // let value = "";
        // if (e?.target) {
        //     if (e.target.hasOwnProperty("checked")) value = e.target.checked;
        //     else value = e.target.value;
        // } else if (e?._d) value = e._d.format("MM/dd/yyyy");
        // else value = e;
        // onChangeInputSearch({
        //     [key]: value,
        // }, {
        //     nbDotDieuTriId: params.id,
        //     page: 0,
        //     size: 10,
        // });
    };


    const onClickSort = (key, value) => {
        const sort = { ...state.dataSortColumn, [key]: value };
        setState({ dataSortColumn: sort });
    };


    const columns = [
        {
            title: <HeaderSearch title={t("common.stt")} />,
            width: "25px",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (item, data, index) => {
                return index + 1;
            },
        },
        {
            title: (
                <HeaderSearch
                    title={t("common.phong")}
                    sort_key="tenPhong"
                    // dataSort={dataSortColumn["maHoSo"] || 0}
                    onClickSort={onClickSort}
                    search={
                        <Input placeholder="Tìm phòng" onChange={onSearchInput("phong")} />
                    }
                />
            ),
            width: "50px",
            dataIndex: "tenPhong",
            key: "tenPhong",
        },
        {
            title: (
                <HeaderSearch
                    title={t("pttt.soHieuGiuong")}
                    sort_key="soHieuGiuong"
                    search={
                        <Input placeholder="Tìm số hiệu giường" onChange={onSearchInput("soHieuGiuong")} />
                    }
                // dataSort={dataSortColumn["tenNb"] || 0}
                // onClickSort={onClickSort}
                />
            ),
            width: "80px",
            dataIndex: "soHieuGiuong",
            key: "soHieuGiuong",
            render: (item, data) => {
                return (
                    <div className="item-info">
                        <span>{item}</span>
                    </div>
                );
            },
        },
        {
            title: (
                <HeaderSearch
                    title={t("pttt.khoaNBnam")}
                    sort_key="tenKhoa"
                    // dataSort={dataSortColumn["tenNb"] || 0}
                    // onClickSort={onClickSort}
                    search={
                        <Input placeholder="Tìm khoa NB nằm" onChange={onSearchInput("tenKhoa")} />
                    }
                />
            ),
            width: "80px",
            dataIndex: "tenKhoa",
            key: "tenKhoa",
            render: (item, data) => {
                return (
                    <div className="item-info">
                        <span>{item}</span>
                    </div>
                );
            },
        },
        {
            title: (
                <HeaderSearch
                    title={t("pttt.namTuNgay")}
                    sort_key="namTuNgay"
                // dataSort={dataSortColumn["tenNb"] || 0}
                // onClickSort={onClickSort}
                />
            ),
            width: "80px",
            dataIndex: "namTuNgay",
            key: "namTuNgay",
            render: (item, data) => {
                return (
                    <div className="item-info">
                        <span>{item}</span>
                    </div>
                );
            },
        },
        {
            title: (
                <HeaderSearch
                    title={t("pttt.namDenNgay")}
                    sort_key="namDenNgay"
                // dataSort={dataSortColumn["tenNb"] || 0}
                // onClickSort={onClickSort}
                />
            ),
            width: "80px",
            dataIndex: "namDenNgay",
            key: "namDenNgay",
            render: (item, data) => {
                return (
                    <div className="item-info">
                        <span>{item}</span>
                    </div>
                );
            },
        },
        {
            title: (
                <HeaderSearch
                    title={t("pttt.soNgayGiuong")}
                    sort_key="soNgayGiuong"
                // dataSort={dataSortColumn["maHoSo"] || 0}
                // onClickSort={onClickSort}
                />
            ),
            width: "50px",
            dataIndex: "soNgayGiuong",
            key: "soNgayGiuong",
        },
    ];

    const handleFormatResponseData = (response) => {
        const arr = []
        response.forEach(giuongCuaNB => {
            const { id, tenPhong, soHieuGiuong, tenKhoa, tuThoiGian, denThoiGian, soNgay } = giuongCuaNB
            arr.push({
                id,
                tenPhong,
                soHieuGiuong,
                tenKhoa,
                namTuNgay: tuThoiGian ? moment(tuThoiGian).format("DD-MM-YYYY HH:mm:ss") : "",
                namDenNgay: denThoiGian ? moment(denThoiGian).format("DD-MM-YYYY HH:mm:ss") : "",
                soNgayGiuong: soNgay || ""
            })
        })
        return arr
    }



    useEffect(() => {
        getPhongGiuongTheoNB({ nbDotDieuTriId: dataDetail.nbDotDieuTriId })
    }, [])

    return (
        <Main>
            <TableWrapper
                columns={columns}
                dataSource={handleFormatResponseData(dsGiuongCuaNB)}
            ></TableWrapper>
        </Main>
    )
}

export default DanhSachPhongGiuong