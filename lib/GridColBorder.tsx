import React, { useContext, useMemo } from 'react'
import GridItem from './GridItem'
import { type IComponentProps as IBaseProps } from './GridBorder'
import { GridContext } from './context'
import styles from './styles.module.scss'

type IComponentProps = IBaseProps

/**
 * 列边框
 * @extends GridBorder
 */
function GridColBorder({ showInner = true, showOuter = true, lineColor = 'gray', lineStyle = 'dashed', lineWidth = '1px' }: IComponentProps) {
  const { row, col } = useContext(GridContext)

  const borderStyle = useMemo(() => {
    return `${lineWidth} ${lineStyle} ${lineColor}`
  }, [lineColor, lineStyle, lineWidth])

  const result: React.ReactElement[] = []
  for (let i = 1; i <= col; i++) {
    const start = `r1c${i}`
    const style: React.CSSProperties = {
      left: `calc(${lineWidth} / -2)`,
      width: i === col ? `calc(100% + ${lineWidth})` : '100%',
      borderLeft: borderStyle,
    }
    if (i === col && !showInner) {
      style.borderLeft = undefined
    }
    if (i === col && showOuter) {
      style.borderRight = borderStyle
    }
    if (i === 1 && !showOuter) {
      style.borderLeft = undefined
    }
    result.push(
      <GridItem
        className={styles.GridBorder}
        start={start}
        span={[row, 1]}
        key={`border-col-${start}`}
        style={style}
      />,
    )
  }
  if (!showInner) {
    result.splice(1, result.length - 2)
  }
  return (
    <GridContext.Provider value={{ row, col }}>
      {result}
    </GridContext.Provider>
  )
}

export default React.memo(GridColBorder)
