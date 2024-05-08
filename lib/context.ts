import React from 'react'

export interface IItemReadyResp {
  start: number[]
  end?: number[] | null
}

export interface IGridContext {
  itemStyle: React.CSSProperties
  onItemReady?: ((res: IItemReadyResp) => void)
}

export const GridContext = React.createContext<IGridContext>({
  itemStyle: {},
})
