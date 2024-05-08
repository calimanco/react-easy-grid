import GridItem, { IComponentProps as GridItemProps } from './GridItem'
import React, { useMemo } from 'react'
import styles from './styles.module.scss'

interface IComponentProps extends GridItemProps {
  direction?: 'vertical' | 'horizontal'
  lineColor?: string
  lineStyle?: string
  lineWidth?: string
}

function GridGutter({ direction = 'horizontal', lineColor = 'gray', lineStyle = 'solid', lineWidth = '1px', ...leftProps }: IComponentProps) {
  const computedStyle = useMemo<React.CSSProperties>(() => {
    return {
      width: direction === 'horizontal' ? '100%' : undefined,
      height: direction === 'vertical' ? '100%' : undefined,
      borderWidth: lineWidth,
      borderColor: lineColor,
      borderStyle: lineStyle,
    }
  }, [direction, lineColor, lineStyle, lineWidth])

  return (
    <GridItem
      className={styles.gridGutter}
      {...leftProps}
    >
      <div style={computedStyle} />
    </GridItem>
  )
}

export default GridGutter
