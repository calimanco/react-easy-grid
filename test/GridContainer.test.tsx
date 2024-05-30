import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import GridContainer from './../lib/GridContainer.js'
import GridItem from './../lib/GridItem.js'
import {testClassname, testStyle} from './common.test.js'

describe('GridContainer', () => {

  testStyle(GridContainer)
  testClassname(GridContainer)

  test('basic', () => {
    const wrapper = render(
      <GridContainer row={10} col={5}></GridContainer>,
    )

    expect(wrapper.container.firstChild).toHaveStyle({
      gridTemplateColumns: `repeat(5, 1fr)`,
      gridTemplateRows: `repeat(10, 1fr)`,
    })
  })

  test('auto grid', () => {
    let wrapper = render(
      <GridContainer>
        <GridItem start="r5c5" end="r10c10" />
      </GridContainer>,
    )

    expect(wrapper.container.firstChild).toHaveStyle({
      gridTemplateColumns: `repeat(10, 1fr)`,
      gridTemplateRows: `repeat(10, 1fr)`,
    })

    wrapper = render(
      <GridContainer>
        <GridItem start="r1c1" span={[5, 10]} />
      </GridContainer>,
    )

    expect(wrapper.container.firstChild).toHaveStyle({
      gridTemplateColumns: `repeat(10, 1fr)`,
      gridTemplateRows: `repeat(5, 1fr)`,
    })
  })

  test('itemStyle', () => {
    const {container} = render(
      <GridContainer itemStyle={{
        backgroundColor: '#000',
        color: '#ddd'
      }}>
        <GridItem start="r5c5" end="r10c10" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      backgroundColor: '#000',
      color: '#ddd'
    })
  })

  test('legacy', () => {
    const {container} = render(
      <GridContainer legacy>
        <GridItem start="r5c5" end="r10c10" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      position: 'absolute',
    })
  })
})
