import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { GridContext, IGridContext, IGridItem } from './context'
import { canGridSupport } from './utils'

export interface IComponentProps {
  row?: number
  col?: number
  style?: React.CSSProperties
  itemStyle?: React.CSSProperties
  legacy?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * 网格容器
 * @param {object} props
 * @param props.row 行
 * @param props.col 列
 * @param props.style 样式
 * @param props.itemStyle 子项样式
 * @param props.legacy 降级渲染
 * @param props.className 类名
 * @param props.children
 */
function GridContainer({ row, col, style, itemStyle, legacy, className, children }: IComponentProps) {
  const itemsRef = useRef<IGridItem[]>([])
  const [maxRow, setMaxRow] = useState(0)
  const [maxCol, setMaxCol] = useState(0)
  const [legacyRender, setLegacyRender] = useState(legacy ?? !canGridSupport())

  const handleResize = useCallback((res: IGridItem) => {
    const idx = itemsRef.current.findIndex(i => i.ref?.current === res.ref?.current)
    if (idx === -1) {
      itemsRef.current.push(res)
    }
    else {
      itemsRef.current[idx] = res
    }
    let maxRow = 0
    let maxCol = 0
    for (const item of itemsRef.current) {
      const { start, end } = item
      if (start) {
        maxRow = Math.max(maxRow, start[0])
        maxCol = Math.max(maxCol, start[1])
      }
      if (end) {
        maxRow = Math.max(maxRow, end[0])
        maxCol = Math.max(maxCol, end[1])
      }
    }
    setMaxRow(maxRow)
    setMaxCol(maxCol)
  }, [])

  const computedGrid = useMemo(() => {
    return {
      row: row ?? maxRow,
      col: col ?? maxCol,
    }
  }, [row, col, maxRow, maxCol])

  const context = useMemo<IGridContext>(() => {
    return { itemStyle, row: computedGrid.row, col: computedGrid.col, legacy: legacyRender, onResize: handleResize }
  }, [itemStyle, computedGrid.row, computedGrid.col, legacyRender, handleResize])

  const gridStyle = useMemo<React.CSSProperties>(() => {
    if (legacyRender) {
      return {
        position: 'relative',
        boxSizing: 'border-box',
        ...style,
      }
    }
    return {
      boxSizing: 'border-box',
      display: 'grid',
      gridAutoRows: 0,
      gridAutoColumns: 0,
      gridTemplateColumns: `repeat(${computedGrid.col}, 1fr)`,
      gridTemplateRows: `repeat(${computedGrid.row}, 1fr)`,
      ...style,
    }
  }, [computedGrid.col, computedGrid.row, legacyRender, style])

  useEffect(() => {
    if (typeof legacy === 'undefined') {
      return
    }
    setLegacyRender(legacy)
  }, [legacy])

  return (
    <GridContext.Provider value={context}>
      <div style={gridStyle} className={className}>
        {children}
      </div>
    </GridContext.Provider>
  )
}

export default GridContainer
