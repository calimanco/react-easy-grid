import { Layout, Form, Flex, type ColorPickerProps } from 'antd'
import styles from './App.module.css'
import reactLogo from './assets/react.svg'
import { GridContainer, GridItem, GridGutter } from '../lib/main'
import ControllerForm from './ControllerForm'
import { useMemo } from 'react'

type Color = ColorPickerProps['value']

interface IItem {
  startR: number
  startC: number
  color: Color
  endR?: number
  endC?: number
  spanR?: number
  spanC?: number
}

interface IGutter extends IItem {
  direction: 'vertical' | 'horizontal'
  span?: number
  lineWidth?: number
}

function App() {
  const [form] = Form.useForm()
  const formWidth = Form.useWatch('width', form)
  const formHeight = Form.useWatch('height', form)
  const formRow = Form.useWatch('row', form)
  const formCol = Form.useWatch('col', form)
  const formBordered = Form.useWatch('bordered', form)
  const formShowAxios = Form.useWatch('showAxios', form)
  const formItems: IItem[] = Form.useWatch('items', form)
  const formGutters: IGutter[] = Form.useWatch('gutters', form)

  console.log(formItems)

  const gridContainerStyle = useMemo(() => {
    return { width: `${formWidth}%`, height: `${formHeight}%`, background: '#fff' }
  }, [formWidth, formHeight])

  const gridItemStyle = useMemo(() => {
    return { color: 'white', fontSize: '30px' }
  }, [])

  return (
    <Layout className={styles.layout}>
      <a href="https://github.com/calimanco/react-easy-grid" target="_blank" rel="noreferrer">
        <img
          decoding="async"
          width="140"
          height="140"
          src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149"
          className={styles.fork}
          loading="lazy"
          data-recalc-dims="1"
          alt="forkMe"
        />
      </a>
      <Layout.Sider theme="light" className={styles.sider} width={250}>
        <Flex align="center" className={styles.title}>
          <img className={styles.logo} src={reactLogo} alt="logo" />
          <span>react-easy-grid</span>
        </Flex>
        <ControllerForm form={form} />
      </Layout.Sider>
      <Layout.Content className={styles.content}>
        <GridContainer
          row={formRow}
          col={formCol}
          bordered={formBordered}
          showAxios={formShowAxios}
          style={gridContainerStyle}
          itemStyle={gridItemStyle}
        >
          {formGutters?.map((item, index) => {
            return (
              <GridGutter
                key={index}
                start={`r${item.startR}c${item.startC}`}
                end={(item.endC && item.endR) ? [item.endC, item.endR] : null}
                span={[item.spanR ?? 1, item.spanC ?? 1]}
                direction={item.direction}
                lineColor={typeof item.color === 'string' ? item.color : item?.color?.toHexString()}
                lineWidth={item.lineWidth ? `${item.lineWidth}px` : undefined}
              />
            )
          })}
          {formItems?.map((item, index) => {
            return (
              <GridItem
                key={index}
                start={`r${item.startR}c${item.startC}`}
                end={(item.endR && item.endC) ? [item.endR, item.endC] : null}
                span={[item.spanR ?? 1, item.spanC ?? 1]}
              >
                <div
                  className={styles.item}
                  style={{ backgroundColor: typeof item.color === 'string' ? item.color : item?.color?.toHexString() }}
                >
                  {index}
                </div>
              </GridItem>
            )
          })}
        </GridContainer>
      </Layout.Content>
    </Layout>
  )
}

export default App
