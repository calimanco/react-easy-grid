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
  const { itemStyle: contextStyle, onResize } = useContext(GridContext)
  const itemRef = useRef(null)
  const hasReady = useRef(false)

  const startP = useMemo(() => {
    if (typeof start === 'string') {
      return transformGridStrToArray(start)
    }
    if (typeof start === 'number' || (Array.isArray(start) && start?.length === 1)) {
      return [Number(start), Number(start)]
    }
    return [Number(start?.[0]) || 1, Number(start?.[1]) || 1]
  }, [JSON.stringify(start)])

  const endP = useMemo(() => {
    if (!!end || !!(Array.isArray(end) && end[0])) {
      if (typeof end === 'string') {
        return transformGridStrToArray(end)
      }
      if (typeof end === 'number' || (Array.isArray(end) && end?.length === 1)) {
        return [Number(end), Number(end)]
      }
      return [Number(end?.[0]) || 1, Number(end?.[1]) || 1]
    }
    if (!startP) {
      return null
    }
    const res = [...startP]
    if (Array.isArray(span)) {
      const tmp = span.map(i => Number(i))
      res[0] += (tmp?.[0] || 1) - 1
      res[1] += (tmp?.[1] || 1) - 1
    }
    else {
      res[0] += (span || 1) - 1
      res[1] += (span || 1) - 1
    }
    return res
  }, [JSON.stringify(end), JSON.stringify(span), startP])

  const itemStyle = useMemo<React.CSSProperties>(() => {
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
  }, [startP, endP, contextStyle, style])

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
