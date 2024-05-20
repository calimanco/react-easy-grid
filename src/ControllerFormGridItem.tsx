import {
  Button,
  InputNumber,
  Popover,
  Form,
  Select,
  type FormListFieldData,
} from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import ColorItem from './ColorItem'
import styles from './App.module.scss'

const directionOptions = [
  {
    label: '横向',
    value: 'horizontal',
  },
  {
    label: '竖向',
    value: 'vertical',
  },
]

const endTypeOptions = [
  {
    label: '设结束点',
    value: 'endpoint',
  },
  {
    label: '设跨区数',
    value: 'span',
  },
]

interface IComponentProps {
  field: FormListFieldData
  mode?: 'item' | 'divider'
  onRemove?: (index: number | number[]) => void
}

/**
 * 表格项
 */
function ControllerFormGridItem({ field, mode = 'item', onRemove }: IComponentProps) {
  const form = Form.useFormInstance()
  const endType = Form.useWatch([`${mode}s`, field.name, 'type'], form)

  return (
    <div className={styles.ControllerFormGridItem}>
      <div>{field.name}</div>
      <Form.Item name={[field.name, 'color']} style={{ marginBottom: 0 }}>
        <ColorItem />
      </Form.Item>
      <Form.Item name={[field.name, 'type']} style={{ marginBottom: 0 }} hidden={mode === 'divider'}>
        <Select options={endTypeOptions} />
      </Form.Item>
      {mode === 'divider' && (
        <Form.Item name={[field.name, 'direction']} style={{ marginBottom: 0 }}>
          <Select options={directionOptions} />
        </Form.Item>
      )}
      <Popover
        destroyTooltipOnHide={false}
        placement="right"
        content={() => {
          return (
            <>
              <Form.Item name={[field.name, 'startR']} label="开始行">
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item name={[field.name, 'startC']} label="开始列">
                <InputNumber min={1} />
              </Form.Item>
              {mode === 'divider' && (
                <Form.Item name={[field.name, 'span']} label="跨区数">
                  <InputNumber min={1} />
                </Form.Item>
              )}
              {mode === 'item' && (
                <>
                  {endType === 'endpoint' && (
                    <>
                      <Form.Item name={[field.name, 'endR']} label="结束行">
                        <InputNumber min={1} />
                      </Form.Item>
                      <Form.Item name={[field.name, 'endC']} label="结束列">
                        <InputNumber min={1} />
                      </Form.Item>
                    </>
                  )}
                  {endType === 'span' && (
                    <>
                      <Form.Item name={[field.name, 'spanR']} label="跨行">
                        <InputNumber min={1} />
                      </Form.Item>
                      <Form.Item name={[field.name, 'spanC']} label="跨列">
                        <InputNumber min={1} />
                      </Form.Item>
                    </>
                  )}
                </>
              )}
            </>
          )
        }}
      >
        <Button>位置</Button>
      </Popover>
      <CloseOutlined
        onClick={() => {
          onRemove?.(field.name)
        }}
      />
    </div>
  )
}

export default ControllerFormGridItem
