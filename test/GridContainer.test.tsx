import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import {GridContainer, GridItem} from './../lib/main.js'
import {testClassname, testStyle} from './common.test.js'
import React from "react";

describe('GridContainer', () => {

  testStyle(GridContainer as React.FunctionComponent<any>)
  testClassname(GridContainer as React.FunctionComponent<any>)

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
    const {container, rerender} = render(
      <GridContainer>
        <GridItem start="r5c5" end="r10c10" />
      </GridContainer>,
    )

    expect(container.firstChild).toHaveStyle({
      gridTemplateColumns: `repeat(10, 1fr)`,
      gridTemplateRows: `repeat(10, 1fr)`,
    })

    rerender(<GridContainer>
      <GridItem start="r5c5" end="r10c10" />
      <GridItem start="r1c1" end="r11c11" />
    </GridContainer>)

    expect(container.firstChild).toHaveStyle({
      gridTemplateColumns: `repeat(11, 1fr)`,
      gridTemplateRows: `repeat(11, 1fr)`,
    })

    rerender(<GridContainer>
      <GridItem start="r1c1" end="r11c11" />
    </GridContainer>)

    expect(container.firstChild).toHaveStyle({
      gridTemplateColumns: `repeat(11, 1fr)`,
      gridTemplateRows: `repeat(11, 1fr)`,
    })

    rerender(<GridContainer>
      <GridItem start="" />
    </GridContainer>)

    expect(container.firstChild).toHaveStyle({
      gridTemplateColumns: `repeat(11, 1fr)`,
      gridTemplateRows: `repeat(11, 1fr)`,
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
