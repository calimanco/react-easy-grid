import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { testClassname, testStyle } from './common.test.js'
import { GridContainer, GridItem } from '../lib/main.ts'
import React from 'react'

describe('GridItem', () => {
  testStyle(GridContainer as React.FunctionComponent<any>)
  testClassname(GridContainer as React.FunctionComponent<any>)

  test('string start', () => {
    const { container, rerender } = render(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c2" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/2/2/3',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r3c4" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '3/4/4/5',
    })
  })

  test('number start', () => {
    const { container } = render(
      <GridContainer row={10} col={5}>
        <GridItem start={2} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '2/2/3/3',
    })
  })

  test('array start', () => {
    const { container, rerender } = render(
      <GridContainer row={10} col={5}>
        <GridItem start={[2, 3]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '2/3/3/4',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start={[2]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '2/2/3/3',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start={[]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/2/2',
    })
  })

  test('string end', () => {
    const { container, rerender } = render(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end="r2c3" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/3/4',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end="r3c2" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/4/3',
    })
  })

  test('number end', () => {
    const { container } = render(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end={3} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/4/4',
    })
  })

  test('array end', () => {
    const { container, rerender } = render(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end={[2, 3]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/3/4',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end={[3, 2]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/4/3',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end={[4]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/5/5',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end={[]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/2/2',
    })
  })

  test('wrong end', () => {
    const { container, rerender } = render(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end="r2" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/2/2',
    })
  })

  test('span', () => {
    const { container, rerender } = render(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" span={[2, 3]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/3/4',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" span={[3, 2]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/4/3',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" span={[4]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/5/2',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" span={[null, 4]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/2/5',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" span={5} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/6/6',
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" span={null} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/2/2',
    })
  })

  test('children', () => {
    render(
      <GridContainer row={10} col={5}>
        <GridItem start="r3c3">
          <div>123</div>
        </GridItem>
      </GridContainer>,
    )

    expect(screen.getByText('123')).toHaveTextContent('123')
  })

  test('legacy', () => {
    const row = 10
    const col = 5
    const unitR = 100 / row
    const unitC = 100 / col

    const { container, rerender } = render(
      <GridContainer legacy row={row} col={col}>
        <GridItem start="r2c2" end="r5c5" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      position: 'absolute',
      left: `${unitC}%`,
      top: `${unitR}%`,
    })

    rerender(
      <GridContainer legacy row={row} col={col}>
        <GridItem start="r2c2" end="r10" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      position: 'absolute',
    })

    rerender(
      <GridContainer legacy row={row} col={col}>
        <GridItem start="r1c1" end="r20c20" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      position: 'absolute',
    })
  })
})
