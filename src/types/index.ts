import React from "react";

export type ComponentRefresh = {
  val?: boolean;
  setVal?: React.Dispatch<React.SetStateAction<boolean>>;
};

export * from "types/board";
export * from "types/game";
