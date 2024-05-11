import React, { useCallback, useMemo, useState, useRef } from 'react'
import { GridContext, IGridContext, IGridItem } from './context'
import styles from './styles.module.scss'

export interface IComponentProps {
  row?: number
  col?: number
  bordered?: boolean
  showAxios?: boolean
  style?: React.CSSProperties
  borderStyle?: React.CSSProperties['border']
  itemStyle?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

/**
 * 网格容器
 * @param {object} props
 * @param props.row 行
 * @param props.col 列
 * @param props.bordered 显示边框
 * @param props.showAxios 显示坐标
 * @param props.borderStyle 边框样式
 * @param props.style 样式
 * @param props.itemStyle 子项样式
 * @param props.className 类名
 * @param props.children
 */
function GridContainer({ row, col, bordered, showAxios, borderStyle, style, itemStyle = {}, className, children }: IComponentProps) {
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

  const computedBorderStyle = useMemo(() => {
    return bordered ? (borderStyle ?? 'grey 1px dashed') : 'transparent 1px dashed'
  }, [borderStyle, bordered])

  const context = useMemo<IGridContext>(() => {
    return { itemStyle, onItemReady: handleItemReady }
  }, [itemStyle, handleItemReady])

  const gridStyle = useMemo<React.CSSProperties>(() => {
    return {
      boxSizing: 'border-box',
      borderTop: computedBorderStyle,
      borderLeft: computedBorderStyle,
      display: 'grid',
      gridAutoRows: 0,
      gridAutoColumns: 0,
      gridTemplateColumns: `repeat(${computedGrid.col}, 1fr)`,
      gridTemplateRows: `repeat(${computedGrid.row}, 1fr)`,
      ...style,
    }
  }, [computedBorderStyle, computedGrid, style])

  const renderPlaceholder = useCallback((row: number, col: number) => {
    const result: React.ReactElement[] = []
    for (let i = 1; i <= row; i++) {
      for (let j = 1; j <= col; j++) {
        const gridArea = `${i}/${j}`
        result.push(
          <div
            key={`placeholder-${gridArea}`}
            style={{
              boxSizing: 'border-box',
              gridArea,
              borderRight: computedBorderStyle,
              borderBottom: computedBorderStyle,
            }}
          />,
        )
      }
    }
    return result
  }, [computedBorderStyle])

  const renderAxios = useCallback((row: number, col: number) => {
    const result: React.ReactElement[] = []
    for (let i = 1; i <= row; i++) {
      const gridArea = `${i}/1`
      result.push(
        <div
          key={`axios-y-${gridArea}`}
          className={styles.gridAxiosItem}
          style={{
            gridArea,
          }}
        >
          <span style={{
            position: 'absolute',
            right: '103%',
            zIndex: 999,
          }}
          >
            {i}
          </span>
        </div>,
      )
    }
    for (let j = 1; j <= col; j++) {
      const gridArea = `1/${j}`
      result.push(
        <div
          key={`axios-x-${gridArea}`}
          className={styles.gridAxiosItem}
          style={{
            gridArea,
          }}
        >
          <span style={{
            position: 'absolute',
            bottom: '100%',
            zIndex: 999,
          }}
          >
            {j}
          </span>
        </div>,
      )
    }
    return result
  }, [])

  return (
    <GridContext.Provider value={context}>
      <div style={gridStyle} className={className}>
        {bordered && renderPlaceholder(computedGrid.row, computedGrid.col)}
        {showAxios && renderAxios(computedGrid.row, computedGrid.col)}
        {children}
      </div>
    </GridContext.Provider>
  )
}

export default GridContainer
