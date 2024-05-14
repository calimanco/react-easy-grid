import React, { useContext, useMemo } from 'react'
import { GridContext } from './context'
import GridItem from './GridItem'
import styles from './styles.module.scss'

function GridAxios() {
  const { row, col } = useContext(GridContext)

  const XPointList = useMemo(() => {
    const result: React.ReactElement[] = []
    const tmp = 100 / col
    for (let i = 1; i <= col; i++) {
      result.push((
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${tmp * i - tmp / 2}%`,
            bottom: 0,
            transform: 'translateX(-50%)',
          }}
        >
          {i}
        </span>
      ))
    }
    return result
  }, [col])

  const YPointList = useMemo(() => {
    const result: React.ReactElement[] = []
    const tmp = 100 / row
    for (let i = 1; i <= row; i++) {
      result.push((
        <span
          key={i}
          style={{
            position: 'absolute',
            right: '3px',
            top: `${tmp * i - tmp / 2}%`,
            transform: 'translateY(-50%)',
          }}
        >
          {i}
        </span>
      ))
    }
    return result
  }, [row])

  return (
    <GridContext.Provider value={{ row, col }}>
      <GridItem
        start="r1c1"
        span={[1, col]}
        key="axios-x"
        className={styles.gridAxiosItem}
        style={{
          top: '-100%',
        }}
      >
        {XPointList}
      </GridItem>
      <GridItem
        start="r1c1"
        span={[row, 1]}
        key="axios-y"
        className={styles.gridAxiosItem}
        style={{
          left: '-100%',
        }}
      >
        {YPointList}
      </GridItem>
    </GridContext.Provider>
  )
}

export default React.memo(GridAxios)
