import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { transformGridStrToArray } from './utils'
import { GridContext } from './context'
import styles from './styles.module.scss'

export interface IComponentProps {
  start: string | number | number[]
  end?: string | number | number[] | null
  span?: number | number[]
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

/**
 * 网格基础子项
 * @param {object} props
 * @param props.start 开始坐标
 * @param props.end 结束坐标
 * @param props.span 跨区数
 * @param props.style 样式
 * @param props.className 类名
 * @param props.children
 */
function GridItem({ start, end, span = 1, style, className, children }: IComponentProps) {
  const { row, col, legacy, itemStyle: contextStyle, onResize } = useContext(GridContext)
  const itemRef = useRef(null)
  const hasReady = useRef(false)

  const startP = useMemo(() => {
    let result: number[] | null = null
    if (typeof start === 'string') {
      result = transformGridStrToArray(start)
    }
    if (typeof start === 'number') {
      result = [Number(start), Number(start)]
    }
    if (Array.isArray(start)) {
      result = [Number(start?.[0]) || 1, Number(start?.[1]) || Number(start?.[0]) || 1]
    }
    return result
  }, [JSON.stringify(start)])

  const endP = useMemo(() => {
    if (end) {
      let result: number[] | null = null
      if (typeof end === 'string') {
        result = transformGridStrToArray(end)
      }
      if (typeof end === 'number') {
        result = [Number(end), Number(end)]
      }
      if (Array.isArray(end)) {
        result = [Number(end?.[0]) || 1, Number(end?.[1]) || Number(end?.[0]) || 1]
      }
      if (legacy && Array.isArray(result)) {
        result = [result[0] < col ? result[0] : col, result[1] < row ? result[1] : row]
      }
      return result
    }
    else {
      if (!startP) {
        return null
      }
      const result = [...startP]
      if (Array.isArray(span)) {
        const tmp = span.map(i => Number(i))
        result[0] += (tmp?.[0] || 1) - 1
        result[1] += (tmp?.[1] || 1) - 1
      }
      else {
        result[0] += (span || 1) - 1
        result[1] += (span || 1) - 1
      }
      return result
    }
  }, [JSON.stringify(end), JSON.stringify(span), startP])

  const itemStyle = useMemo<React.CSSProperties>(() => {
    if (legacy && startP) {
      const unitR = 100 / row
      const unitC = 100 / col
      const offsetX = (endP ? Math.min(startP[1], endP[1]) : startP[1]) - 1
      const offsetY = (endP ? Math.min(startP[0], endP[0]) : startP[0]) - 1
      const height = endP ? Math.abs(startP[0] - endP[0]) + 1 : 1
      const limitHeight = offsetY + height > row ? (row - offsetY < 0 ? 0 : row - offsetY) : height
      const width = endP ? Math.abs(startP[1] - endP[1]) + 1 : 1
      const limitWidth = offsetX + width > col ? (col - offsetX < 0 ? 0 : col - offsetX) : width
      return {
        position: 'absolute',
        top: `${offsetY * unitR}%`,
        left: `${offsetX * unitC}%`,
        height: `${limitHeight * unitR}%`,
        width: `${limitWidth * unitC}%`,
        ...contextStyle,
        ...style,
      }
    }
    const result = []
    if (startP) {
      result.push(startP[0])
      result.push(startP[1])
    }
    if (startP && endP) {
      result.push(endP[0] <= startP[0] - 1 ? endP[0] : endP[0] + 1)
      result.push(endP[1] <= startP[1] - 1 ? endP[1] : endP[1] + 1)
    }
    return {
      ...contextStyle,
      gridArea: result.join('/'),
      ...style,
    }
  }, [legacy, startP, endP, contextStyle, style, row, col])

  useEffect(() => {
    if (!startP) {
      return
    }
    onResize?.({
      start: startP,
      end: endP,
      ref: itemRef,
    })
  }, [endP, onResize, startP])

  useEffect(() => {
    if (!hasReady.current) {
      hasReady.current = true
      return
    }
    return () => {
      onResize?.({
        start: null,
        end: null,
        ref: itemRef,
      })
    }
  }, [])

  return <div className={`${styles.gridItem} ${className ?? ''}`} style={itemStyle} ref={itemRef}>{children}</div>
}

export default GridItem
