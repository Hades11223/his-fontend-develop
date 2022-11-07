import React, { useMemo } from "react";
import Loading from "../../common/Loading";
import { TimeLineGroupStyled } from "./styled";

const TimeLineGroup = ({
  grow,
  loading,
  dataList,
  recordPerPage = 8,
  firstLoading,
  renderCard = () => "",
}) => {
  return (
    <TimeLineGroupStyled
      style={{
        flexGrow: grow || 1,
      }}
    >
      <div className="time-line-group-content">
        {/* <div className='time-line-items-wrap'>
            {loading && <Loading type='chart' isAbsolute whiteLoading noSub/>}
            <div className='line-1'>
              {dataList.map((item, index) => renderCard(item, index, recordPerPage))}
            </div>
            <div className='line-2'>
              {dataList.map((item, index) => renderCard(item, index, recordPerPage, true))}
            </div>
          </div> */}
        {firstLoading ? (
          <Loading
            skeletons={2}
            skeletonStyle={{
              x: (window.innerWidth * 80) / 3840,
              y: (window.innerWidth * 60) / 3840,
              r: (window.innerWidth * 20) / 3840,
              width: (window.innerWidth * 240) / 3840,
              height: (window.innerWidth * 240) / 3840,
            }}
          />
        ) : (
          <div className="time-line-items-wrap">
            {loading && <Loading type="chart" isAbsolute whiteLoading noSub />}
            <div className="line-1">
              {dataList.map((item, index) =>
                renderCard(item, index, recordPerPage)
              )}
            </div>
            <div className="line-2">
              {dataList.map((item, index) =>
                renderCard(item, index, recordPerPage, true)
              )}
            </div>
          </div>
        )}
      </div>
    </TimeLineGroupStyled>
  );
};

export default React.memo(TimeLineGroup);
