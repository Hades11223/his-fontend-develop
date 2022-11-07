import EditWrapper from "components/MultiLevelTab/EditWrapper";
import TableWrapper from "components/TableWrapper";
import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { HeaderSearch, Select } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Checkbox, message } from "antd";
import { LoaiDoiTuongCpn } from "../styled";

const LoaiHinhThanhToan = (props, ref) => {
    const { t } = useTranslation()

    const { refLoaiHinhTT, refLayerHotKey } = ref.current;
    const {
        loaiHinhThanhToan: { listAllLoaiHinhThanhToan = [] },
        loaiDoiTuongLoaiHinhTT: {
            listLoaiHinhThanhToanCuaDoiTuong = []
        },
        loaiDoiTuong: {
            dataEditDefault,
        },
    } = useSelector(state => state)


    const {
        loaiHinhThanhToan: { getListAllLoaiHinhThanhToan },
        loaiDoiTuongLoaiHinhTT: { createOrUpdate, getListLoaiDoiTuongTT }
    } = useDispatch()
    const formatDataTable = () => listLoaiHinhThanhToanCuaDoiTuong?.length
        ? listLoaiHinhThanhToanCuaDoiTuong?.map((item, index) => ({
            stt: index + 1,
            loaiHinhThanhToan: item.loaiHinhThanhToan,
            macDinh: item.macDinh,
            active: item.active,
            key: `key${index + 1}`,
            id: item.id
        })) : []

    const [state, _setState] = useState({
        dataTable: formatDataTable(),
        newData: [],
        editData: [],
        currentIndex: null,
    })
    const setState = (data = {}) => _setState(state => ({ ...state, ...data }))



    const allDataTable = [...state.dataTable, ...state.newData]

    useImperativeHandle(
        refLoaiHinhTT,
        () => ({
            handleResetData: () => {
                setState({
                    newData: [],
                    editData: [],
                })
            },
            handleCancelDataTable: () => {
                const dataTable = formatDataTable()
                setState({ dataTable, currentIndex: null, newData: [], editData: [] })
            },
            handleSaveDataTable: ({ loaiDoiTuongId }) => {
                const handlePostPutData = (key) => {
                    if (state[key].length) {
                        state[key].filter(item => item.hasOwnProperty("loaiHinhThanhToan")).forEach(item => {
                            const obj = {
                                loaiDoiTuongId,
                                loaiHinhThanhToanId: item.loaiHinhThanhToan.id,
                                active: item.active,
                                macDinh: item.macDinh
                            }

                            if (key === "editData") {
                                obj.id = item.id
                            }

                            createOrUpdate(obj).then(res => {
                                setState({ currentIndex: null, [key]: [] })
                            }).catch(err => console.log("err", err))

                        })
                    } 
                }

                handlePostPutData("newData")
                handlePostPutData("editData")
            }
        })
    )

    useEffect(() => {
        getListAllLoaiHinhThanhToan()
    }, [])

    useEffect(() => {
        setState({ dataTable: formatDataTable(), currentIndex: null })
    }, [listLoaiHinhThanhToanCuaDoiTuong]);

    const handleAddNewRow = () => {
        const initDataNewRow = {
            stt: state.dataTable.length + state.newData.length + 1,
            macDinh: false,
            active: true,
            key: `key${state.dataTable.length + state.newData.length + 1}`
        }

        setState({
            newData: [...state.newData, initDataNewRow],
            currentIndex: state.dataTable.length + state.newData.length
        })
    }

    const onRow = (record = {}, index) => {
        return {
            onClick: (event) => {
                const obj = { currentIndex: index }
                if (index < state.dataTable.length && state.editData.findIndex(item => item.stt === index + 1) === -1) {
                    obj.editData = [...state.editData, record]
                }
                setState(obj)
            },
        };
    };

    const onChange = (key, selector) => (e) => {
        let value = "";

        if (e?.target) {
            if (e.target.hasOwnProperty("checked")) value = e.target.checked;
            else value = e.target.value;
        } else if (e?._d) value = e._d;
        else value = e;

        if (selector) {
            allDataTable[key][selector] = value;
        } else allDataTable[key] = value;
    };


    const onSelect = ({ index, selector }) => (value, option) => {
        const { newData, editData } = state;
        const lengthDataTable = state.dataTable.length
        if (index < lengthDataTable) {
            const itemIndex = editData.findIndex(item => item.stt === index + 1)
            if (itemIndex >= 0) {
                editData[itemIndex][selector] = option?.lists || value
                setState({ editData })
            }
        } else {
            const itemIndex = newData.findIndex(item => item.stt === index + 1)

            if (itemIndex >= 0) {
                newData[itemIndex].loaiHinhThanhToan = option?.lists || value
                setState({ newData })
            }          
        }
    }

    const columns = [
        {
            title: <HeaderSearch title={t("common.stt")} />,
            width: 10,
            dataIndex: "stt",
            key: "stt",
            align: "center",
        },
        {
            title: <HeaderSearch title={t("danhMuc.loaiHinhThanhToan")} />,
            width: 40,
            dataIndex: "loaiHinhThanhToan",
            key: "loaiHinhThanhToan",
            align: "center",
            render: (item, list, index) => {
                if (index === state.currentIndex) {
                    return (
                        <Select
                            data={listAllLoaiHinhThanhToan}
                            onChange={onSelect({ index, selector: "loaiHinhThanhToan" })}
                            style={{ width: "100%" }}
                            defaultValue={item && item.id}
                        />
                    );
                } else return item && item.ten;
            },
        },
        {
            title: <HeaderSearch title={t("danhMuc.macDinh")} />,
            width: 20,
            dataIndex: "macDinh",
            key: "macDinh",
            align: "center",
            render: (item, list, index) => {
                if (index === state.currentIndex) {
                    return (
                        <Checkbox defaultChecked={item} onChange={onChange(index, "macDinh")} />
                    );
                } else return <Checkbox checked={item} />;
            },
        },
        {
            title: <HeaderSearch title={t("danhMuc.coHieuLuc")} />,
            width: 20,
            dataIndex: "active",
            key: "active",
            align: "center",
            render: (item, list, index) => {
                if (index === state.currentIndex) {
                    return (
                        <Checkbox defaultChecked={item} onChange={onChange(index, "active")} />
                    );
                } else return <Checkbox checked={item} />;
            },
        }
    ]

    return (
        <LoaiDoiTuongCpn>
            <EditWrapper
                // onCancel={onCancel}
                // onSave={() => handleSaveDataTable({ dataTable: state.dataTable })}
                actionHeaderClass={"table-header-custom"}
                onAddNewRow={handleAddNewRow}
                // isShowSaveButton={false}
                // isShowCancelButton={true}
                showAdded={true}
            // roleSave={props.roleSave}
            // roleEdit={props.roleEdit}
            // editStatus={state?.pressButtonAdded ? false : editStatus}
            // forceShowButtonSave={
            //   (state?.pressedRow && checkRole(.roleEdit) && true) || false
            // }
            // forceShowButtonCancel={
            //   (state?.pressedRow && checkRole(props.roleEdit) && true) || false
            // }
            // isHiddenButtonAdd={true}
            >
                <>
                    <TableWrapper
                        columns={columns}
                        dataSource={allDataTable}
                        onRow={onRow}
                        rowClassName={((record, index) => {
                            return record.key === allDataTable[state.currentIndex]?.key
                                ? `row-actived row-id-${refLayerHotKey.current}_${record.id}`
                                : `row-id-${refLayerHotKey.current}_${record.id}`;
                        })}
                    // summary={renderSumaryTable}
                    />
                    {/* {totalElements && (
                    <Pagination
                        listData={state?.data}
                        onChange={onChangePage}
                        current={pageNumber + 1}
                        pageSize={pageSize}
                        total={totalElements}
                        onShowSizeChange={onChangeSize}
                    />
                )} */}
                </>
            </EditWrapper>
        </LoaiDoiTuongCpn>
    )
}

export default React.forwardRef(LoaiHinhThanhToan)