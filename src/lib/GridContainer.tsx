import React, {ReactElement, useMemo} from "react";
import {generateGridStyle, GridReg} from "./utils.ts";
import GridItem from "./GridItem";

export interface IComponentProps {
  row?: number;
  col?: number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

function GridContainer({row, col, style, className, children}: IComponentProps) {

  const gridStyle = useMemo(() => {
    let maxX = 1
    let maxY = 1
    if (!row && !col && children) {
      const list = Array.isArray(children) ? children : [children]
      for(const child of list as ReactElement[]) {
        if (!child || child.type !== GridItem) {
          continue
        }
        const res = GridReg.exec((child?.props as Record<string, string>)?.start || '')
        if (res) {
          maxX = Math.max(maxX, Number(res[1]))
          maxY = Math.max(maxY, Number(res[2]))
        }
        if (child?.props?.end) {
          const res = GridReg.exec((child.props as Record<string, string>).end || '')
          if (res) {
            maxX = Math.max(maxX, Number(res[1]))
            maxY = Math.max(maxY, Number(res[2]))
          }
        }
      }
    }
    return {
      ...generateGridStyle({row: row ?? maxX, col: col ?? maxY}),
      ...style
    }
  }, [row, col, style, children])

  return <div style={gridStyle} className={className}>{children}</div>
}

export default GridContainer
