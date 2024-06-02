import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import {GridContainer, GridAxios} from './../lib/main.js'

describe('GridAxios', () => {

  test('fontSize', () => {
    const {container} = render(
      <GridContainer row={10} col={5}>
        <GridAxios fontSize="30px"/>
      </GridContainer>,
    )

    container?.firstChild?.childNodes[0]?.childNodes.forEach(item => {
      expect(item).toHaveStyle({
        fontSize: '30px'
      })
    })
  })

  test('fontColor', () => {
    const {container} = render(
      <GridContainer row={10} col={5}>
        <GridAxios fontColor="#ccc"/>
      </GridContainer>,
    )

    container?.firstChild?.childNodes[0]?.childNodes.forEach(item => {
      expect(item).toHaveStyle({
        color: '#ccc'
      })
    })
  })

  test('basic', () => {
    const {container} = render(
      <GridContainer row={10} col={5}>
        <GridAxios />
      </GridContainer>,
    )

    const [xNodes, yNodes] = Array.from(container?.firstChild?.childNodes ?? [])

    expect(xNodes?.childNodes?.length).toEqual(5)

    xNodes?.childNodes.forEach((node) => {
      expect(node).toHaveStyle({
        position: 'absolute',
      })
    })


    expect(yNodes?.childNodes?.length).toEqual(10)

    yNodes?.childNodes.forEach((node) => {
      expect(node).toHaveStyle({
        position: 'absolute',
      })
    })
  })
})
