import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { GridReg } from './utils'
import { GridContext } from './context'
import styles from './styles.module.scss'

export interface IComponentProps {
  start: string
  end?: string
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

function GridItem({ start, end, style, className, children }: IComponentProps) {
  const { itemStyle: contextStyle, onItemReady } = useContext(GridContext)
  const itemRef = useRef(null)

  const startP = useMemo(() => {
    const res = GridReg.exec(start)?.slice(1, 3)
    return res?.map(i => Number(i)) ?? null
  }, [start])

  const endP = useMemo(() => {
    if (!end) {
      return null
    }
    const res = GridReg.exec(end)?.slice(1, 3)
    return res?.map(i => Number(i)) ?? null
  }, [end])

  const itemStyle = useMemo<React.CSSProperties>(() => {
    const result = []
    if (startP) {
      result.push(startP[0])
      result.push(startP[1])
    }
    if (endP) {
      result.push(endP[0] + 1)
      result.push(endP[1] + 1)
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
    onItemReady?.({
      start: startP,
      end: endP,
      ref: itemRef,
    })
  }, [endP, onItemReady, startP])

  useEffect(() => {
    return () => {
      onItemReady?.({
        start: null,
        end: null,
        ref: itemRef,
      })
    }
  }, [onItemReady])

  return <div className={`${styles.gridItem} ${className ?? ''}`} style={itemStyle} ref={itemRef}>{children}</div>
}

export default GridItem
