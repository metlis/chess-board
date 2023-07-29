import React from "react";
import type { Color } from "types";

type RowProps = {
  number: number;
  children: React.ReactNode;
  colorOnTop: Color,
};

export default function Row({ number, children, colorOnTop }: RowProps) {
  const cellHeightPercent = 12.5;
  const rowAdjustment = `${
    (colorOnTop === "b" ? 9 - number : number) * cellHeightPercent - cellHeightPercent / 2
  }%`;
  return (
    <div className="row">
      <div className="row__number" style={{ top: rowAdjustment }}>
        {number}
      </div>
      <div className="row__cells">{children}</div>
    </div>
  );
}
