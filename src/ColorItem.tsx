import { useCallback } from 'react'
import { Popover } from 'antd'
import { SketchPicker, ColorResult } from 'react-color'
import styles from './App.module.scss'

interface IComponentProps {
  value?: string
  onChange?: (res: string) => void
}

/**
 * 颜色选择器
 */
function ColorItem({ value, onChange }: IComponentProps) {
  const handleChangeComplete = useCallback((color: ColorResult) => {
    if (!color) {
      return
    }
    onChange?.(color.hex)
  }, [onChange])

  return (
    <Popover content={<SketchPicker disableAlpha color={value} onChangeComplete={handleChangeComplete} />}>
      <div className={styles.ColorItem}>
        <div className={styles.ColorItem__color} style={{ backgroundColor: value }} />
      </div>
    </Popover>
  )
}

export default ColorItem
