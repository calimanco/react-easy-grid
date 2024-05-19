import React, { useMemo } from 'react'
import { Button, Card, Form, InputNumber, Slider, Switch, type FormInstance } from 'antd'
import ControllerFormGridItem from './ControllerFormGridItem.tsx'
import styles from './App.module.scss'

interface IComponentProps {
  form: FormInstance
  style?: React.CSSProperties
  className?: string
}

/**
 * 表单
 */
function ControllerForm({ form, style, className }: IComponentProps) {
  const initialValues = useMemo(() => {
    return {
      legacy: false,
      width: 100,
      height: 80,
      border: {
        inner: false,
        outer: false,
        width: 1,
      },
      showAxios: false,
      items: [
        {
          type: 'endpoint',
          startR: 1,
          startC: 1,
          color: 'red',
        },
        {
          type: 'endpoint',
          startR: 1,
          startC: 2,
          endR: 5,
          endC: 5,
          color: 'blue',
        },
        {
          type: 'endpoint',
          startR: 7,
          startC: 2,
          endR: 9,
          endC: 5,
          color: 'green',
        },
        {
          type: 'endpoint',
          startR: 1,
          startC: 7,
          endR: 8,
          endC: 10,
          color: 'orange',
        },
        {
          type: 'span',
          startR: 10,
          startC: 1,
          spanR: 2,
          spanC: 11,
          color: 'lime',
        },
      ],
      dividers: [
        {
          type: 'span',
          startR: 6,
          startC: 1,
          spanR: 1,
          spanC: 11,
          direction: 'horizontal',
          color: 'gray',
        },
        {
          type: 'span',
          startR: 1,
          startC: 6,
          spanR: 11,
          spanC: 1,
          direction: 'vertical',
          color: '#ccc',
        },
      ],
    }
  }, [])

  return (
    <Form form={form} initialValues={initialValues} preserve style={style} className={className}>
      <Form.Item name="legacy" label="降级渲染">
        <Switch />
      </Form.Item>
      <Form.Item name="width" label="容器宽度(%)">
        <Slider min={10} max={100} step={10} />
      </Form.Item>
      <Form.Item name="height" label="容器高度(%)">
        <Slider min={10} max={100} step={10} />
      </Form.Item>
      <Form.Item name="row" label="行数" tooltip="不填则自动计算">
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item name="col" label="列数" tooltip="不填则自动计算">
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item name="showAxios" label="显示坐标轴">
        <Switch />
      </Form.Item>
      <Card title="边框" size="small" type="inner" className={styles.formCard}>
        <Form.Item name={['border', 'inner']} label="显示内框">
          <Switch />
        </Form.Item>
        <Form.Item name={['border', 'outer']} label="显示外框">
          <Switch />
        </Form.Item>
        <Form.Item name={['border', 'width']} label="边框宽度">
          <InputNumber min={1} />
        </Form.Item>
      </Card>
      <Card title="GridItem" size="small" type="inner" className={styles.formCard}>
        <Form.List name="items">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => {
                  return (
                    <ControllerFormGridItem key={index} form={form} field={field} onRemove={remove} />
                  )
                })}
                <Button block onClick={() => add({ startR: 1, startC: 1 })}>增加GridItem</Button>
              </>
            )
          }}
        </Form.List>
      </Card>
      <Card title="GridDivider" size="small" type="inner" className={styles.formCard}>
        <Form.List name="dividers">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => {
                  return (
                    <ControllerFormGridItem key={index} form={form} field={field} onRemove={remove} />
                  )
                })}
                <Button block onClick={() => add({ startR: 1, startC: 1, direction: 'horizontal', span: 1 })}>增加GridItem</Button>
              </>
            )
          }}
        </Form.List>
      </Card>
    </Form>
  )
}

export default React.memo(ControllerForm)
