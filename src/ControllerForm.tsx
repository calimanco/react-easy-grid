import React, { useMemo } from 'react'
import styles from './App.module.css'
import { Button, Card, Form, InputNumber, Slider, Switch, type FormInstance } from 'antd'
import ControllerFormGridItem from './ControllerFormGridItem.tsx'

interface IComponentProps {
  form: FormInstance
}

function ControllerForm({ form }: IComponentProps) {
  const initialValues = useMemo(() => {
    return {
      width: 100,
      height: 80,
      bordered: false,
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
          endR: 3,
          endC: 5,
          color: 'blue',
        },
        {
          type: 'endpoint',
          startR: 5,
          startC: 2,
          endR: 8,
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
          startR: 9,
          startC: 1,
          spanR: 2,
          spanC: 10,
          color: 'lime',
        },
      ],
      gutters: [
        {
          type: 'span',
          startR: 4,
          startC: 1,
          spanR: 1,
          spanC: 5,
          direction: 'horizontal',
          color: 'gray',
        },
        {
          type: 'span',
          startR: 1,
          startC: 6,
          spanR: 8,
          spanC: 1,
          direction: 'vertical',
          color: '#ccc',
        },
      ],
    }
  }, [])

  return (
    <Form className={styles.form} form={form} initialValues={initialValues} preserve={false}>
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
      <Form.Item name="bordered" label="显式边框">
        <Switch />
      </Form.Item>
      <Form.Item name="showAxios" label="显式坐标轴">
        <Switch />
      </Form.Item>
      <Card title="GridItem" size="small" type="inner">
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
      <Card title="GridDivider" size="small" type="inner">
        <Form.List name="gutters">
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
