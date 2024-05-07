import GridItem, {IComponentProps as GridItemProps} from './GridItem'
import React, {useMemo} from "react";

interface IComponentProps extends GridItemProps {
  direction?: 'vertical' | 'horizontal',
  borderStyle?: React.CSSProperties['border'];
}

function GridGutter({direction = 'horizontal', borderStyle, style, ...leftProps}: IComponentProps) {

  const computedStyle = useMemo<React.CSSProperties>(() => {
    return direction === 'horizontal' ? {
      width: '100%',
      borderBottom: borderStyle ?? '1px solid gray'
    }:{
      height: '100%',
      borderRight: borderStyle ?? '1px solid gray'
    }
  }, [direction, borderStyle])

  return <GridItem style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style
  }} {...leftProps}>
    <div style={computedStyle} />
  </GridItem>
}

export default GridGutter;
