import React, { useMemo } from 'react'
import GridItem, { IComponentProps as IGridItemProps } from './GridItem'
import styles from './styles.module.scss'

interface IComponentProps extends IGridItemProps {
  direction: 'horizontal' | 'vertical'
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
function GridDivider({ start, direction = 'horizontal', lineColor = 'gray', lineStyle = 'solid', lineWidth = '1px', className, ...leftProps }: IComponentProps) {
  const computedStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: direction === 'horizontal' ? '100%' : undefined,
      height: direction === 'vertical' ? '100%' : undefined,
      borderWidth: lineWidth,
      borderColor: lineColor,
      borderStyle: lineStyle,
    }
  }, [direction, lineColor, lineStyle, lineWidth])

  return (
    <GridItem
      className={`${styles.gridGutterItem} ${className ?? ''}`}
      start={start}
      {...leftProps}
    >
      <div style={computedStyle} />
    </GridItem>
  )
}

export default React.memo(GridDivider)
