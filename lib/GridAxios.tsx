import React, { useContext } from 'react'
import { GridContext } from './context.ts'
import styles from './styles.module.scss'

function GridAxios() {
  const { row, col } = useContext(GridContext)
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
}

export default React.memo(GridAxios)
