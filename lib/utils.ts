export const GridReg = /^r(\d+)c(\d+)$/i

export function transformGridStrToArray(str: string) {
  const res = GridReg.exec(str)?.slice(1, 3)
  return res?.map(i => Number(i)) ?? null
}

