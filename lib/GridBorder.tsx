import React from 'react'
import GridRowBorder from './GridRowBorder'
import GridColBorder from './GridColBorder'

export interface IComponentProps {
  showInner?: boolean
  showOuter?: boolean
  lineColor?: React.CSSProperties['borderColor']
  lineStyle?: React.CSSProperties['borderStyle']
  lineWidth?: string
}

/**
 * 网格边框
 * @param {object} props
 * @param props.showInner 显式内边框
 * @param props.showOuter 显式外边框
 * @param props.lineColor 颜色
 * @param props.lineStyle 样式
 * @param props.lineWidth 线宽
 */
function GridBorder({ ...leftProps }: IComponentProps) {
  return (
    <>
      <GridRowBorder {...leftProps} />
      <GridColBorder {...leftProps} />
    </>
  )
}

export default React.memo(GridBorder)
