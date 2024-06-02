import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import {testClassname, testStyle} from "./common.test.js";
import {GridContainer, GridDivider} from "../lib/main.ts";
import React from "react";

describe('GridDivider', () => {

  testStyle(GridContainer as React.FunctionComponent<any>)
  testClassname(GridContainer as React.FunctionComponent<any>)

  test('string start', () => {
    const {container, rerender} = render(
      <GridContainer row={10} col={5}>
        <GridDivider start="r1c2" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/2/2/3'
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridDivider start="r3c4" />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '3/4/4/5'
    })
  })

  test('array start', () => {
    const {container, rerender} = render(
      <GridContainer row={10} col={5}>
        <GridDivider start={[2,3]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '2/3/3/4'
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridDivider start={[2]} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '2/2/3/3'
    })
  })

  test('span', () => {
    const {container} = render(
      <GridContainer row={10} col={5}>
        <GridDivider start="r1c1" span={5} />
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '1/1/2/6'
    })
  })

  test('direction', () => {
    const {container, rerender} = render(
      <GridContainer row={10} col={5}>
        <GridDivider start="r3c3" span={2} direction="vertical"/>
      </GridContainer>,
    )

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '3/3/5/4',
    })

    expect(container?.firstElementChild?.firstElementChild?.firstChild).toHaveStyle({
      position: 'absolute',
      height: '100%',
      width: undefined
    })

    rerender(<GridContainer row={10} col={5}>
      <GridDivider start="r3c3" span={2} direction="horizontal"/>
    </GridContainer>)

    expect(container?.firstElementChild?.firstChild).toHaveStyle({
      gridArea: '3/3/4/5',
    })

    expect(container?.firstElementChild?.firstElementChild?.firstChild).toHaveStyle({
      position: 'absolute',
      width: '100%',
      height: undefined
    })
  })
})
