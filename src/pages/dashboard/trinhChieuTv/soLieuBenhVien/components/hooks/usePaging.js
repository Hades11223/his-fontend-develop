import { useState, useEffect, useCallback, useMemo } from "react";

const usePaging = ({
  recordPerPage,
  autoIncreasePageTime,
  dataSource,
  useTotalAt0 = false,
}) => {
  const nestedDataSource = useMemo(() => {
    if (useTotalAt0) {
      return dataSource.filter((_, index) => index > 0);
    } else {
      return dataSource;
    }
  }, [dataSource, useTotalAt0]);

  const [paging, setPaging] = useState({
    size: recordPerPage,
    total: nestedDataSource?.length,
    current: 1,
  });
  const [showingData, setShowingData] = useState([]);

  useEffect(() => {
    setPaging((prev) => ({
      ...prev,
      size: recordPerPage,
      total: nestedDataSource?.length,
      current: 1,
    }));
  }, [nestedDataSource, recordPerPage]);

  useEffect(() => {
    let dataShowing = [];
    if (useTotalAt0) {
      dataShowing.push(dataSource[0]);
    }

    const pagingData = (nestedDataSource || []).filter(
      (item, index) =>
        index >= paging.size * (paging.current - 1) &&
        index < paging.size * paging.current
    );
    setShowingData([...dataShowing, ...pagingData]);
  }, [nestedDataSource, paging, useTotalAt0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPaging((prev) => ({
        ...prev,
        current: prev.current >= prev.total / prev.size ? 1 : prev.current + 1,
      }));
    }, autoIncreasePageTime);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handlePageChange = useCallback((page, pageSize) => {
    setPaging((prev) => ({
      ...prev,
      current: page,
    }));
  }, []);

  return {
    showingData,
    handlePageChange,
    paging,
  };
};

export default usePaging;
