import 'antd/dist/antd.css'
import { Layout, Form, Space } from 'antd'
import styles from './App.module.scss'
import reactLogo from './assets/react.svg'
import { GridContainer, GridItem, GridDivider, GridAxios, GridBorder } from '../lib/main'
import ControllerForm from './ControllerForm'
import { useMemo } from 'react'

interface IItem {
  startR: number
  startC: number
  color: string
  type: 'endpoint' | 'span'
  endR?: number
  endC?: number
  spanR?: number
  spanC?: number
  span?: number
}

interface IDivider extends IItem {
  direction: 'vertical' | 'horizontal'
  lineWidth?: number
}

function App() {
  const [form] = Form.useForm()
  const formLegacy = Form.useWatch('legacy', form)
  const formWidth = Form.useWatch('width', form)
  const formHeight = Form.useWatch('height', form)
  const formRow = Form.useWatch('row', form)
  const formCol = Form.useWatch('col', form)
  const formBorder = Form.useWatch('border', form)
  const formShowAxios = Form.useWatch('showAxios', form)
  const formItems: IItem[] = Form.useWatch('items', form)
  const formDividers: IDivider[] = Form.useWatch('dividers', form)

  const gridContainerStyle = useMemo(() => {
    return { width: `${formWidth}%`, height: `${formHeight}%`, background: '#fff' }
  }, [formWidth, formHeight])

  const gridItemStyle = useMemo(() => {
    return { color: 'white', fontSize: '30px' }
  }, [])

  return (
    <Layout className={styles.layout}>
      <a href="https://github.com/calimanco/react-happy-grid" target="_blank" rel="noreferrer">
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
      <Layout.Sider theme="light" width={300}>
        <div className={styles.sider}>
          <Space align="center" className={styles.title}>
            <img className={styles.logo} src={reactLogo} alt="logo" />
            <span>react-happy-grid</span>
          </Space>
          <ControllerForm form={form} className={styles.form} />
        </div>
      </Layout.Sider>
      <Layout.Content className={styles.content}>
        <GridContainer
          row={formRow}
          col={formCol}
          style={gridContainerStyle}
          itemStyle={gridItemStyle}
          legacy={formLegacy}
        >
          {formBorder && <GridBorder showInner={formBorder.inner} showOuter={formBorder.outer} lineWidth={`${formBorder.width}px`} />}
          {formShowAxios && <GridAxios />}
          {formDividers?.map((item, index) => {
            return (
              <GridDivider
                key={`divider-${index}`}
                start={`r${item.startR}c${item.startC}`}
                end={item.type === 'endpoint' && item.endR && item.endC ? [item.endR, item.endC] : null}
                span={item.span}
                direction={item.direction}
                lineColor={item?.color}
                lineWidth={item.lineWidth ? `${item.lineWidth}px` : undefined}
              />
            )
          })}
          {formItems?.map((item, index) => {
            return (
              <GridItem
                key={`item-${index}`}
                start={`r${item.startR}c${item.startC}`}
                end={item.type === 'endpoint' && item.endR && item.endC ? [item.endR, item.endC] : null}
                span={item.type === 'span' ? [item.spanR ?? 1, item.spanC ?? 1] : undefined}
              >
                <div
                  className={styles.item}
                  style={{ backgroundColor: item?.color }}
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
