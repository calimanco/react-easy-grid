import React, { useCallback, useMemo, useState } from 'react'
import { GridContext, IGridContext, IItemReadyResp } from './context'
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

function GridContainer({ row, col, bordered, showAxios, borderStyle, style, itemStyle = {}, className, children }: IComponentProps) {
  const [maxRow, setMaxRow] = useState(0)
  const [maxCol, setMaxCol] = useState(0)

  const handleItemReady = useCallback((res: IItemReadyResp) => {
    const { start, end } = res
    setMaxRow((prevState) => {
      let max = prevState
      max = Math.max(max, start[0])
      if (end) {
        max = Math.max(max, end[0])
      }
      return max
    })
    setMaxCol((prevState) => {
      let max = prevState
      max = Math.max(max, start[1])
      if (end) {
        max = Math.max(max, end[1])
      }
      return max
    })
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
            className={styles.gridPlaceholder}
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
          className={styles.gridAxios}
          style={{
            gridArea,
          }}
        >
          <span style={{
            position: 'relative',
            right: '50%',
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
          className={styles.gridAxios}
          style={{
            gridArea,
          }}
        >
          <span style={{
            position: 'relative',
            bottom: '50%',
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
        {renderPlaceholder(computedGrid.row, computedGrid.col)}
        {showAxios && renderAxios(computedGrid.row, computedGrid.col)}
        {children}
      </div>
    </GridContext.Provider>
  )
}

export default GridContainer
