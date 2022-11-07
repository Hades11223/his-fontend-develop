import React from "react";
import Loading from "../Loading";
import EmptyChart from "../EmptyChart";
import { Card } from "./styled";

export default function ContainerCard({
  title,
  utilities,
  children,
  isLoading,
}) {
  return (
    <Card>
      {isLoading && <Loading type="chart" isAbsolute />}
      <div className="card-head d-flex justify-content-between">
        <span className="title">{title}</span>
        <div className="utilities">{utilities}</div>
      </div>
      <div className="card-body">{children}</div>
    </Card>
  );
}
