import React from "react";
import styles from "./styles";
import { connect } from "react-redux";
function PatientInformation(props) {
  return (
    <div style={{ margin: 20 }}>
      <div style={styles.header}>
        <span>THÔNG TIN NB</span>
      </div>
      {props.patient && (
        <div style={styles.patientInformation}>
          <span>
            {props.patient.tenNb} ({props.patient.gioiTinh},{" "}
            {props.patient.ngaySinh.toDateObject().format("yyyy")}-{" "}
            {props.patient.tuoi} tuổi)
          </span>
          <div style={{ flexDirection: "row" }}>
            <div style={{ flex: 1 }}>
              <div style={styles.item}>
                <span style={styles.label}>Mã HS</span>
                <span style={styles.content}>{props.patient.maHoSo}</span>
              </div>
              <div style={styles.item}>
                <span style={styles.label}>Phòng</span>
                <span style={styles.content}>
                  {((patient) => {
                    let text = "";
                    if (patient.phong) text += patient.phong;
                    if (patient.giuong) {
                      if (text) text += " - ";
                      text += patient.giuong;
                    }
                    return text;
                  })(props.patient)}
                </span>
              </div>
              {props.patient.bacSyDieuTri && (
                <div style={styles.item}>
                  <span style={styles.label}>BS Điều trị</span>
                  <span style={styles.content}>
                    {props.patient.bacSyDieuTri}
                  </span>
                </div>
              )}
              {props.patient.khoa && (
                <div style={styles.item}>
                  <span style={styles.label}>Khoa</span>
                  <span style={styles.content}>{props.patient.khoa}</span>
                </div>
              )}
              {props.patient.chanDoan && (
                <div style={styles.item}>
                  <span style={styles.label}>Chẩn đoán</span>
                  <span style={styles.content}>{props.patient.chanDoan}</span>
                </div>
              )}
            </div>
            <div style={{ width: 220 }}>
              {props.patient.maBenhAn && (
                <div style={styles.item}>
                  <span style={[styles.label]}>Mã BA</span>
                  <span style={styles.content}>{props.patient.maBenhAn}</span>
                </div>
              )}
              <div style={styles.item}>
                <span>Ngày vào viện:</span>
                <span style={styles.content}>
                  {((patient) => {
                    return patient.createdAt
                      .toDateObject()
                      .format("dd/MM/yyyy");
                  })(props.patient)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect((state) => {
  return {
    patient: state.patient.patient,
    ngayYLenh: state.patient.ngayYLenh || new Date(),
  };
}, {})(PatientInformation);
