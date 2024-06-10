import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { GridContainer, GridBorder, GridRowBorder, GridColBorder } from './../lib/main.js'

describe('GridBorder', () => {
  test('basic', () => {
    const { container } = render(
      <GridContainer row={10} col={5}>
        <GridBorder />
      </GridContainer>,
    )

    expect(container?.firstChild?.childNodes?.length).toEqual(15)
  })

  test('show', () => {
    const { container, rerender } = render(
      <GridContainer row={10} col={5}>
        <GridBorder showInner={false} />
      </GridContainer>,
    )

    expect(container?.firstChild?.childNodes?.length).toEqual(4)

    rerender(
      <GridContainer row={10} col={5}>
        <GridBorder showOuter={false} />
      </GridContainer>,
    )

    expect(container?.firstChild?.childNodes?.length).toEqual(15)

    rerender(
      <GridContainer row={10} col={5}>
        <GridBorder showOuter={false} showInner={false} />
      </GridContainer>,
    )

    expect(container?.firstChild?.childNodes?.length).toEqual(0)
  })

  test('lineColor', () => {
    const { container, rerender } = render(
      <GridContainer row={10} col={5}>
        <GridRowBorder lineColor="#000" />
      </GridContainer>,
    )

    container?.firstChild?.childNodes.forEach((node) => {
      expect(node).toHaveStyle({
        borderTop: '1px dashed #000',
      })
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridColBorder lineColor="#000" />
      </GridContainer>,
    )

    container?.firstChild?.childNodes.forEach((node) => {
      expect(node).toHaveStyle({
        borderLeft: '1px dashed #000',
      })
    })
  })

  test('lineStyle', () => {
    const { container, rerender } = render(
      <GridContainer row={10} col={5}>
        <GridRowBorder lineStyle="solid" />
      </GridContainer>,
    )

    container?.firstChild?.childNodes.forEach((node) => {
      expect(node).toHaveStyle({
        borderTop: '1px solid gray',
      })
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridColBorder lineStyle="solid" />
      </GridContainer>,
    )

    container?.firstChild?.childNodes.forEach((node) => {
      expect(node).toHaveStyle({
        borderLeft: '1px solid gray',
      })
    })
  })

  test('lineWidth', () => {
    const { container, rerender } = render(
      <GridContainer row={10} col={5}>
        <GridRowBorder lineWidth="2px" />
      </GridContainer>,
    )

    container?.firstChild?.childNodes.forEach((node) => {
      expect(node).toHaveStyle({
        borderTop: '2px dashed gray',
      })
    })

    rerender(
      <GridContainer row={10} col={5}>
        <GridColBorder lineWidth="2px" />
      </GridContainer>,
    )

    container?.firstChild?.childNodes.forEach((node) => {
      expect(node).toHaveStyle({
        borderLeft: '2px dashed gray',
      })
    })
  })
})
