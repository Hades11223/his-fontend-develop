import React, { memo } from 'react';
import { connect } from 'react-redux';

export default connect(state => {
  return {
    data: state.vitalSigns.data || {},
    disease: state.vitalSigns.disease || {},
    bed: state.vitalSigns.bed || {},
    room: state.vitalSigns.room || {},
  };
}, {})(
  memo(function UserInfo({ data, disease, bed, room }) {
    return (
      <>
        <div style={{ flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>
            <div>CỤC HẬU CẦN QUÂN KHU I</div>
            <div style={{ fontWeight: 'bold' }}>BỆNH VIỆN QUÂN Y 110</div>
          </div>
          <div style={{ marginRight: 10 }}>
            <div>Mã HS: {data.patientDocument}</div>
            <div>MS: 01/BV-01</div>
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 10,
          }}
        >
          PHIẾU THEO DÕI CHỨC NĂNG SỐNG
        </div>
        <div style={{ marginTop: 20 }}>
          <div>
            Họ tên bệnh nhân:{' '}
            <div style={{ fontWeight: 'bold' }}>{data.patientName}</div>
          </div>
          {/* <div style={{ marginTop: 10 }}>
          Tuổi:{' '}
          <div style={{ fontWeight: 'bold',marginRight:10}}>
            {data.birthday.toDateObject().getAge()}
          </div>{' '}
          Giới:{' '}
          <div style={{ fontWeight: 'bold', marginRight:10 }}>
            {data.gender === 1 ? 'Nam' : 'Nữ'}
          </div>{' '}
          Ngày vào viện:{' '}
          <div style={{ fontWeight: 'bold' }}>
            {new Date(data.timeGoIn).format('dd/MM/yyyy')}
          </div>
        </div> */}
          <div style={{ flexDirection: 'row', marginTop: 10 }}>
            <div style={{ flexDirection: 'row', marginRight: 20 }}>
              <div>Tuổi: </div>
              <div style={{ fontWeight: 'bold' }}>
                {data.birthday.toDateObject().getAge()}
              </div>
            </div>
            <div style={{ flexDirection: 'row', marginRight: 20 }}>
              <div>Giới: </div>
              <div style={{ fontWeight: 'bold' }}>
                {data.gender === 1 ? 'Nam' : 'Nữ'}
              </div>
            </div>
            <div style={{ flexDirection: 'row' }}>
              <div>Ngày vào viện: </div>
              <div style={{ fontWeight: 'bold' }}>
                {new Date(data.timeGoIn).format('dd/MM/yyyy')}
              </div>
            </div>
          </div>
          {/* {(room || bed) && (
            <div style={{ marginTop: 10 }}>
              {bed ? `Giường: ${(bed || {}).name}    ` : ''}
              {room ? `Phòng: ${(room || {}).name}` : ''}
            </div>
          )}
          {disease.length && data.dischargeDisease ? (
            <>
              <div style={{ marginTop: 10 }}>Chẩn đoán:</div>
              <div style={{ marginLeft: 10, flex: 1 }}>
                {disease.map((item, index) => {
                  return <div key={index}>- {item.name}</div>;
                })}
              </div>
            </>
          ) : null} */}
        </div>
      </>
    );
  }),
);
