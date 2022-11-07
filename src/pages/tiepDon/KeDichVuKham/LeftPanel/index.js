import React, { memo, Suspense } from "react";
import ThongTinBN from "./ThongTinBN";
// import TimKiemDichVu from "./TimKiemDichVu";
import { Main } from "./styled";
import { Fallback } from "components";

const TimKiemDichVu = React.lazy(() => import("./TimKiemDichVu"));

const LeftPanel = ({ layerId, ...props }) => {
  // const [show, setShow] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShow(true);
  //   }, 500);

  //   return () => {
  //     setShow(false);
  //   };
  // }, []);

  return (
    <Main {...props}>
      <ThongTinBN />
      {/* <TimKiemDichVu layerId={layerId} /> */}
      <Suspense fallback={<Fallback />}>
        {/* {show && <TimKiemDichVu layerId={layerId} />} */}
        <TimKiemDichVu layerId={layerId} />
      </Suspense>
    </Main>
  );
};

export default memo(LeftPanel);
