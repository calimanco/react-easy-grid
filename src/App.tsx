import React, {useMemo} from "react";
import {Button, Card, Layout, Switch, Form, Slider, Flex, InputNumber, ColorPicker,Popover, type ColorPickerProps} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import styles from './App.module.css'
import reactLogo from './assets/react.svg'
import {GridContainer, GridItem, GridGutter} from "../lib/main";

type Color = ColorPickerProps['value']

const commonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}

interface IItem {
  startR: number,
  startC: number,
  color: Color,
  endR?: number,
  endC?: number,
}

function App() {
  const [form] = Form.useForm()
  const formWidth = Form.useWatch('width', form)
  const formHeight = Form.useWatch('height', form)
  const formBordered = Form.useWatch('bordered', form)
  const formShowAxios = Form.useWatch('showAxios', form)
  const formItems: IItem[] = Form.useWatch('items', form)

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
          color: 'red'
        },
        {
          startR: 1,
          startC: 2,
          endR: 3,
          endC: 5,
          color: 'blue'
        },
        {
          startR: 5,
          startC: 2,
          endR: 8,
          endC: 5,
          color: 'green'
        },
        {
          startR: 1,
          startC: 7,
          endR: 8,
          endC: 10,
          color: 'orange'
        },
        {
          startR: 9,
          startC: 1,
          endR: 10,
          endC: 10,
          color: 'lime'
        }
      ]
    }
  }, [])

  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <Flex align="center">
          <img className={styles.logo} src={reactLogo} alt="logo"/>
          <span>react-easy-grid</span>
        </Flex>
        <a href="https://github.com/calimanco/react-easy-grid" target="_blank" rel="noreferrer">
          <img decoding="async" width="140" height="140"
               src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149"
               className={styles.fork}
               loading="lazy" data-recalc-dims="1" alt="forkMe"/>
        </a>
      </Layout.Header>
      <Layout>
        <Layout.Sider theme="light" className={styles.sider}>
          <Form className={styles.form} form={form} initialValues={initialValues}>
            <Form.Item name="width" label="容器宽度(%)">
              <Slider min={10} max={100} step={10}/>
            </Form.Item>
            <Form.Item name="height" label="容器高度(%)">
              <Slider min={10} max={100} step={10}/>
            </Form.Item>
            <Form.Item name="bordered" label="显式边框">
              <Switch />
            </Form.Item>
            <Form.Item name="showAxios" label="显式坐标轴">
              <Switch />
            </Form.Item>
            <Card title="GridItem" size="small" type="inner">
              <Form.List name="items">
                {(fields, {add, remove}) => {
                  return <>
                    {fields.map((field, index) => {
                      return <div key={field.key}>
                        <Flex align='center' style={{marginBottom: '10px'}} justify="space-between">
                          <span>{index}</span>
                          <Form.Item name={[field.name, 'color']} style={{marginBottom: 0}}>
                            <ColorPicker disabledAlpha />
                          </Form.Item>
                          <Popover placement="right" content={<>
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
                          </>}>
                            <Button>位置</Button>
                          </Popover>
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </Flex>
                      </div>
                    })}
                    <Button block onClick={() => add({startR: 1, startC: 1})}>增加GridItem</Button>
                  </>
                }}
              </Form.List>
            </Card>
          </Form>
        </Layout.Sider>
        <Layout.Content className={styles.content}>
          <div style={{height: '100%'}}>
            <GridContainer bordered={formBordered} showAxios={formShowAxios} style={{width: `${formWidth}%`, height: `${formHeight}%`, background: '#fff'}}
                           itemStyle={{ color: 'white', fontSize: '30px'}}>
              <GridGutter start="r4c1" end="r4c5" borderStyle='2px solid #ccc' />
              <GridGutter start="r1c6" end="r8c6" direction="vertical" />
              {formItems?.map((item, index) => {
                return <GridItem key={index} start={`r${item.startR}c${item.startC}`} end={`r${item.endR}c${item.endC}`}>
                  <div style={{backgroundColor: typeof item.color === 'string' ? item.color : item?.color?.toHexString(), ...commonStyle}}>{index}</div>
                </GridItem>
              })}
            </GridContainer>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default App
