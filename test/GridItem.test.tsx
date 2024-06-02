import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import {testClassname, testStyle} from "./common.test.js";
import {GridContainer, GridItem} from "../lib/main.ts";
import React from "react";

describe('GridItem', () => {

  testStyle(GridContainer as React.FunctionComponent<any>)
  testClassname(GridContainer as React.FunctionComponent<any>)

  test('string start', () => {
    const {container, rerender} = render(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c2" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/2/2/3'
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r3c4" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '3/4/4/5'
    })
  })

  test('array start', () => {
    const {container, rerender} = render(
      <GridContainer row={10} col={5}>
        <GridItem start={[2,3]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '2/3/3/4'
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start={[2]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '2/2/3/3'
    })
  })

  test('string end', () => {
    const {container, rerender} = render(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end="r2c3" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/3/4'
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end="r3c2"  />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/4/3'
    })
  })

  test('array end', () => {
    const {container, rerender} = render(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end={[2, 3]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/3/4'
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end={[3, 2]}  />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/4/3'
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" end={[4]}  />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/5/5'
    })
  })

  test('span', () => {
    const {container, rerender} = render(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" span={[2,3]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/3/4'
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" span={[3, 2]}  />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/4/3'
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" span={[4]}  />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/5/2'
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridItem start="r1c1" span={5}  />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/6/6'
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
})
