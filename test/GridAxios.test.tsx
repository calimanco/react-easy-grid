import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import GridContainer from './../lib/GridContainer.js'
import GridAxios from './../lib/GridAxios.js'

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

    expect(container?.firstChild?.childNodes[0]?.childNodes.length).toEqual(5)
    expect(container?.firstChild?.childNodes[1]?.childNodes.length).toEqual(10)
  })
})
