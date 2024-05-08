import { Layout, Form, Flex, type ColorPickerProps } from 'antd'
import styles from './App.module.css'
import reactLogo from './assets/react.svg'
import { GridContainer, GridItem, GridGutter } from '../lib/main'
import ControllerForm from './ControllerForm'

type Color = ColorPickerProps['value']

interface IItem {
  startR: number
  startC: number
  color: Color
  endR?: number
  endC?: number
}

interface IGutter extends IItem {
  direction: 'vertical' | 'horizontal'
  lineWidth?: number
}

function App() {
  const [form] = Form.useForm()
  const formWidth = Form.useWatch('width', form)
  const formHeight = Form.useWatch('height', form)
  const formBordered = Form.useWatch('bordered', form)
  const formShowAxios = Form.useWatch('showAxios', form)
  const formItems: IItem[] = Form.useWatch('items', form)
  const formGutters: IGutter[] = Form.useWatch('gutters', form)

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
          bordered={formBordered}
          showAxios={formShowAxios}
          style={{ width: `${formWidth}%`, height: `${formHeight}%`, background: '#fff' }}
          itemStyle={{ color: 'white', fontSize: '30px' }}
        >
          {formGutters?.map((item, index) => {
            return (
              <GridGutter
                key={index}
                start={`r${item.startR}c${item.startC}`}
                end={`r${item.endR}c${item.endC}`}
                lineColor={typeof item.color === 'string' ? item.color : item?.color?.toHexString()}
                lineWidth={item.lineWidth ? `${item.lineWidth}px` : undefined}
                direction={item.direction}
              />
            )
          })}
          {formItems?.map((item, index) => {
            return (
              <GridItem
                key={index}
                start={`r${item.startR}c${item.startC}`}
                end={`r${item.endR}c${item.endC}`}
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
