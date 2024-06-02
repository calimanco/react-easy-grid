import React, { useMemo } from 'react'
import GridItem, { IComponentProps as IGridItemProps } from './GridItem'

interface IComponentProps extends Omit<IGridItemProps, 'span'> {
  direction: 'horizontal' | 'vertical'
  span?: number
  lineColor?: string
  lineStyle?: string
  lineWidth?: string
}

/**
 * 网格分割线
 * @extends GridItem
 * @param {object} props
 * @param props.start 开始坐标
 * @param props.direction 方向
 * @param props.lineColor 分割线颜色
 */
function GridDivider({ start, direction = 'horizontal', span = 1, lineColor = 'gray', lineStyle = 'solid', lineWidth = '1px', ...leftProps }: IComponentProps) {
  const computedStyle = useMemo<React.CSSProperties>(() => {
    return {
      position: 'absolute',
      top: direction === 'horizontal' ? `calc(50% - ${lineWidth} / 2)` : 0,
      left: direction === 'vertical' ? `calc(50% - ${lineWidth} / 2)` : 0,
      width: direction === 'horizontal' ? '100%' : undefined,
      height: direction === 'vertical' ? '100%' : undefined,
      borderWidth: lineWidth,
      borderColor: lineColor,
      borderStyle: lineStyle,
    }
  }, [direction, lineColor, lineStyle, lineWidth])

  return (
    <GridItem
      start={start}
      span={direction === 'vertical' ? [span, 1] : [1, span]}
      {...leftProps}
    >
      <div style={computedStyle} />
    </GridItem>
  )
}

export default React.memo(GridDivider)
