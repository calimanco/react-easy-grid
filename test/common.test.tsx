import React, { FunctionComponent, ComponentClass } from 'react'
import { render } from '@testing-library/react'
import { expect, test } from 'vitest'

export function testStyle(component: string | FunctionComponent<any> | ComponentClass<any>) {
  test('style test', () => {
    const { container } = render(React.createElement(component, {
      style: {
        visibility: 'hidden',
      },
    }))

    expect(container.firstChild).not.toBeNull()

    expect(container.firstChild).not.toBeVisible()
  })
}

export function testClassname(component: string | FunctionComponent<any> | ComponentClass<any>) {
  test('className test', () => {
    const { container } = render(React.createElement(component, {
      className: 'abc',
    }))

    expect(container.firstChild).not.toBeNull()

    expect(container?.firstElementChild?.classList).toContain('abc')
  })
}
