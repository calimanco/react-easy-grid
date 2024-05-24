import React, { FunctionComponent, ComponentClass } from 'react'
import { render } from '@testing-library/react'
import { expect } from 'vitest'

export function testStyle(component: string | FunctionComponent<any> | ComponentClass<any>) {
  const { container } = render(React.createElement(component, {
    style: {
      visibility: 'hidden',
    },
  }))

  expect(container.firstChild).not.toBeNull()

  expect(container.firstChild).not.toBeVisible()
}
