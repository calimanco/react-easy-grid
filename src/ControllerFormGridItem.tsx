import {
  Button,
  Space,
  InputNumber,
  Popover,
  Form,
  Tabs,
  Select,
  type FormInstance,
  type FormListFieldData,
} from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import ColorItem from './ColorItem'

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

interface IComponentProps {
  form: FormInstance
  field: FormListFieldData
  type?: 'item' | 'divider'
  onRemove?: (index: number | number[]) => void
}

/**
 * 表格项
 */
function ControllerFormGridItem({ field, type = 'item', onRemove }: IComponentProps) {
  return (
    <Space align="center" style={{ marginBottom: '10px', width: '100%', justifyContent: 'space-between' }}>
      <span>{field.name}</span>
      <Form.Item name={[field.name, 'color']} style={{ marginBottom: 0 }}>
        <ColorItem />
      </Form.Item>
      {type === 'divider' && (
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
              <Form.Item name={[field.name, 'type']} noStyle>
                <TypeItem field={field} />
              </Form.Item>
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
    </Space>
  )
}

function TypeItem({ value, onChange, field }: { field: FormListFieldData, value?: string, onChange?: (res: string) => void }) {
  return (
    <Tabs
      size="small"
      style={{ width: '100%' }}
      items={[
        {
          key: 'endpoint',
          label: '设置结束点',
          children: (
            <div>
              <Form.Item name={[field.name, 'endR']} label="结束行">
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item name={[field.name, 'endC']} label="结束列">
                <InputNumber min={1} />
              </Form.Item>
            </div>
          ),
        },
        {
          key: 'span',
          label: '设置跨区',
          children: (
            <div>
              <Form.Item name={[field.name, 'spanR']} label="跨行">
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item name={[field.name, 'spanC']} label="跨列">
                <InputNumber min={1} />
              </Form.Item>
            </div>
          ),
        },
      ]}
      activeKey={value}
      onTabClick={(res) => {
        console.log(res)
        onChange?.(res)
      }}
    />
  )
}

export default ControllerFormGridItem
