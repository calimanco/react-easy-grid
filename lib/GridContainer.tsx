import React, { useCallback, useMemo, useState, useRef } from 'react'
import { GridContext, IGridContext, IGridItem } from './context'

export interface IComponentProps {
  row?: number
  col?: number
  style?: React.CSSProperties
  itemStyle?: React.CSSProperties
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
 * @param props.className 类名
 * @param props.children
 */
function GridContainer({ row, col, style, itemStyle = {}, className, children }: IComponentProps) {
  const itemsRef = useRef<IGridItem[]>([])
  const [maxRow, setMaxRow] = useState(0)
  const [maxCol, setMaxCol] = useState(0)

  const handleItemReady = useCallback((res: IGridItem) => {
    const idx = itemsRef.current.findIndex(i => i.ref?.current === res.ref?.current)
    if (idx === -1) {
      itemsRef.current.push(res)
    }
    else {
      if (res.start) {
        itemsRef.current[idx] = res
      }
      else {
        itemsRef.current.splice(idx, 1)
      }
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
    return { itemStyle, row: maxRow, col: maxCol, onItemReady: handleItemReady }
  }, [itemStyle, maxRow, maxCol, handleItemReady])

  const gridStyle = useMemo<React.CSSProperties>(() => {
    return {
      boxSizing: 'border-box',
      display: 'grid',
      gridAutoRows: 0,
      gridAutoColumns: 0,
      gridTemplateColumns: `repeat(${computedGrid.col}, 1fr)`,
      gridTemplateRows: `repeat(${computedGrid.row}, 1fr)`,
      ...style,
    }
  }, [computedGrid, style])

  return (
    <GridContext.Provider value={context}>
      <div style={gridStyle} className={className}>
        {children}
      </div>
    </GridContext.Provider>
  )
}

export default GridContainer
