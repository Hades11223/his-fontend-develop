import React, { useState } from 'react'
import { Tabs } from "components"
import DanhSachPhongGiuong from './components/DanhSachPhongGiuong'

const ThongTinPhongGiuong = () => {
    const [state, _setState] = useState({})
    const setState = (data = {}) => _setState(state => ({ ...state, ...data }))

    return (
        <div>
            <Tabs
                defaultActiveKey={state?.activeTab}
                onChange={(tab) => {
                    setState({ activeTab: tab });
                }}
            >
                <Tabs.TabPane tab="Danh sách phòng giường" key={1}>
                    <DanhSachPhongGiuong />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default ThongTinPhongGiuong