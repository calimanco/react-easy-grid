import React, { RefObject } from 'react'

export interface IGridItem {
  start: number[] | null
  ref: RefObject<HTMLDivElement>
  end?: number[] | null
}

export interface IGridContext {
  itemStyle: React.CSSProperties
  onItemReady?: ((res: IGridItem) => void)
}

export const GridContext = React.createContext<IGridContext>({
  itemStyle: {},
})
