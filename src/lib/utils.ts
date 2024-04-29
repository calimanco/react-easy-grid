
export const GridReg = /^r(\d+)c(\d+)$/i

export function generateGridStyle(girdConfig: {row: number; col: number }) {

  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${girdConfig.col}, 1fr)`,
    gridTemplateRows: `repeat(${girdConfig.row}, 1fr)`,
  }
}

export function generateGridArea(start: string, end?: string) {
  const result = []

  const res = GridReg.exec(start)

  if (res) {
    result.push(Number(res[1]))
    result.push(Number(res[2]))
  }

  if (end) {
    const res = GridReg.exec(end)
    if (res){
      result.push(Number(res[1]) + 1)
      result.push(Number(res[2]) + 1)
    }
  }

  return result.join('/')
}
