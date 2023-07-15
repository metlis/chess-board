import React from "react";

type RowProps = {
  number: number;
  children: React.ReactNode;
};

export default function Row({ number, children }: RowProps) {
  return (
    <div className="row">
      <div className="row__number">{number}</div>
      <div className="row__cells">{children}</div>
    </div>
  );
}
