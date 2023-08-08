import { useState } from "react";
import type { ComponentRefresh } from "types";

/*
  Used to trigger component update from object instance
*/
export default function useComponentRefresh(
  componentRefresh: ComponentRefresh
) {
  const [val, setVal] = useState(true);
  componentRefresh.val = val;
  componentRefresh.setVal = setVal;
}
