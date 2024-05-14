import React, { RefObject } from 'react'

export interface IGridItem {
  start: number[] | null
  ref: RefObject<HTMLDivElement>
  end?: number[] | null
}

export interface IGridContext {
  row: number
  col: number
  itemStyle?: React.CSSProperties
  onResize?: ((res: IGridItem) => void)
}

export const GridContext = React.createContext<IGridContext>({
  row: 0,
  col: 0,
  itemStyle: {},
})
