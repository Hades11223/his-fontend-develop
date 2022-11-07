import { useHistory } from "react-router-dom";

function useChangeScreen() {
  const history = useHistory();

  const onChangeScreen = ({ loaiGiayGuiCongBHXH }) => {
    let nextRouter = "";

    switch (loaiGiayGuiCongBHXH) {
      case 1: //DS giấy ra viện
        nextRouter = "/giay-day-cong/nb-ra-vien";
        break;

      case 2: //DS tóm tắt HSBA
        nextRouter = null;
        break;

      case 3: //DS giấy chứng sinh
        nextRouter = null;
        break;

      case 4: //DS giấy chứng nhận nghỉ dưỡng thai
        nextRouter = null;
        break;

      case 5: //Danh sách người bệnh chứng nhận nghỉ hưởng bảo hiểm
        nextRouter = "/giay-day-cong/giay-nghi-huong";
        break;

      case 6: //DS NB tử vong
        nextRouter = "/giay-day-cong/nb-tu-vong";
        break;

      default:
        nextRouter = null;
        break;
    }

    if (nextRouter) history.push(nextRouter);
  };

  return { onChangeScreen };
}

export default useChangeScreen;
