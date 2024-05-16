import React, { useContext, useMemo } from 'react'
import GridItem from './GridItem'
import { type IComponentProps as IBaseProps } from './GridBorder'
import { GridContext } from './context'
import styles from './styles.module.scss'

type IComponentProps = IBaseProps

/**
 * 行边框
 * @extends GridBorder
 */
function GridRowBorder({ showInner = true, showOuter = true, lineColor = 'gray', lineStyle = 'dashed', lineWidth = '1px' }: IComponentProps) {
  const { row, col, legacy } = useContext(GridContext)

  const borderStyle = useMemo(() => {
    return `${lineWidth} ${lineStyle} ${lineColor}`
  }, [lineColor, lineStyle, lineWidth])

  const result: React.ReactElement[] = []
  for (let i = 1; i <= row; i++) {
    const start = `r${i}c1`
    const style: React.CSSProperties = {
      borderTop: borderStyle,
    }
    if (i === row && !showInner) {
      style.borderTop = undefined
    }
    if (i === row && showOuter) {
      style.borderBottom = borderStyle
    }
    if (i === 1 && !showOuter) {
      style.borderTop = undefined
    }
    result.push(
      <GridItem
        className={styles.GridBorder}
        start={start}
        span={[1, col]}
        key={`border-row-${start}`}
        style={style}
      />,
    )
  }
  if (!showInner) {
    result.splice(1, result.length - 2)
  }
  return (
    <GridContext.Provider value={{ row, col, legacy }}>
      {showOuter || showInner ? result : null}
    </GridContext.Provider>
  )
}

export default React.memo(GridRowBorder)
