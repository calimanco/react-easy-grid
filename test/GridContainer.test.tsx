import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import GridContainer from '../lib/GridContainer.jsx'
import { testStyle } from './common.test.js'

describe('GridContainer', () => {
  test('basic render', () => {
    const wrapper = render(
      <GridContainer row={10} col={5}></GridContainer>,
    )

    expect(wrapper.container.firstChild).toHaveStyle({
      gridTemplateColumns: `repeat(5, 1fr)`,
      gridTemplateRows: `repeat(10, 1fr)`,
    })
  })

  testStyle(GridContainer)
})
