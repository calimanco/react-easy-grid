import React, {useMemo} from "react";
import {generateGridArea} from "./utils.ts";

interface IComponentProps {
  start: string;
  end?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

function GridItem({start, end, style, className, children}: IComponentProps) {

  const itemStyle = useMemo(() => {
    return {
      gridArea: generateGridArea(start, end),
      ...style
    }
  }, [start, end, style])

  return <div style={itemStyle} className={className}>{children}</div>
}

export default GridItem;
