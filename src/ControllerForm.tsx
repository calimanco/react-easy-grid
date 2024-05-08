import React, { useMemo } from 'react'
import styles from './App.module.css'
import { Button, Card, ColorPicker, Select, Flex, Form, InputNumber, Popover, Slider, Switch, type FormInstance } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

interface IComponentProps {
  form: FormInstance
}

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

function ControllerForm({ form }: IComponentProps) {
  const initialValues = useMemo(() => {
    return {
      width: 100,
      height: 80,
      bordered: false,
      showAxios: false,
      items: [
        {
          startR: 1,
          startC: 1,
          color: 'red',
        },
        {
          startR: 1,
          startC: 2,
          endR: 3,
          endC: 5,
          color: 'blue',
        },
        {
          startR: 5,
          startC: 2,
          endR: 8,
          endC: 5,
          color: 'green',
        },
        {
          startR: 1,
          startC: 7,
          endR: 8,
          endC: 10,
          color: 'orange',
        },
        {
          startR: 9,
          startC: 1,
          endR: 10,
          endC: 10,
          color: 'lime',
        },
      ],
      gutters: [
        {
          startR: 4,
          startC: 1,
          endR: 4,
          endC: 5,
          direction: 'horizontal',
          color: 'gray',
        },
        {
          startR: 1,
          startC: 6,
          endR: 8,
          endC: 6,
          direction: 'vertical',
          color: '#ccc',
        },
      ],
    }
  }, [])

  return (
    <Form className={styles.form} form={form} initialValues={initialValues}>
      <Form.Item name="width" label="容器宽度(%)">
        <Slider min={10} max={100} step={10} />
      </Form.Item>
      <Form.Item name="height" label="容器高度(%)">
        <Slider min={10} max={100} step={10} />
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
                    <div key={field.key}>
                      <Flex align="center" style={{ marginBottom: '10px' }} justify="space-between">
                        <span>{index}</span>
                        <Form.Item name={[field.name, 'color']} style={{ marginBottom: 0 }}>
                          <ColorPicker disabledAlpha />
                        </Form.Item>
                        <Popover
                          placement="right"
                          content={(
                            <>
                              <Form.Item name={[field.name, 'startR']} label="开始行">
                                <InputNumber min={1} />
                              </Form.Item>
                              <Form.Item name={[field.name, 'startC']} label="开始列">
                                <InputNumber min={1} />
                              </Form.Item>
                              <Form.Item name={[field.name, 'endR']} label="结束行">
                                <InputNumber />
                              </Form.Item>
                              <Form.Item name={[field.name, 'endC']} label="结束列">
                                <InputNumber />
                              </Form.Item>
                            </>
                          )}
                        >
                          <Button>位置</Button>
                        </Popover>
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      </Flex>
                    </div>
                  )
                })}
                <Button block onClick={() => add({ startR: 1, startC: 1 })}>增加GridItem</Button>
              </>
            )
          }}
        </Form.List>
      </Card>
      <Card title="GridGutter" size="small" type="inner">
        <Form.List name="gutters">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => {
                  return (
                    <div key={field.key}>
                      <Flex align="center" style={{ marginBottom: '10px' }} justify="space-between">
                        <span>{index}</span>
                        <Form.Item name={[field.name, 'color']} style={{ marginBottom: 0 }}>
                          <ColorPicker disabledAlpha />
                        </Form.Item>
                        <Form.Item name={[field.name, 'direction']} style={{ marginBottom: 0 }}>
                          <Select options={directionOptions} />
                        </Form.Item>
                        <Popover
                          placement="right"
                          content={(
                            <>
                              <Form.Item name={[field.name, 'startR']} label="开始行">
                                <InputNumber min={1} />
                              </Form.Item>
                              <Form.Item name={[field.name, 'startC']} label="开始列">
                                <InputNumber min={1} />
                              </Form.Item>
                              <Form.Item name={[field.name, 'endR']} label="结束行">
                                <InputNumber />
                              </Form.Item>
                              <Form.Item name={[field.name, 'endC']} label="结束列">
                                <InputNumber />
                              </Form.Item>
                            </>
                          )}
                        >
                          <Button>位置</Button>
                        </Popover>
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      </Flex>
                    </div>
                  )
                })}
                <Button block onClick={() => add({ startR: 1, startC: 1, direction: 'horizontal' })}>增加GridItem</Button>
              </>
            )
          }}
        </Form.List>
      </Card>
    </Form>
  )
}

export default React.memo(ControllerForm)
