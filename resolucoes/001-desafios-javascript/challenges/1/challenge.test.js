const MDC = require('./challenge')

describe('Challenge 1', () => {
  test(`It should return 6
  [INPUT]: 12, 18`, () => {
    expect(MDC(12, 18)).toBe(6)
  })

  test(`It should return 1
  [INPUT]: 20, 33`, () => {
    expect(MDC(20, 33)).toBe(1)
  })

  test(`It should return 23
  [INPUT]: 368, 391`, () => {
    expect(MDC(368, 391)).toBe(23)
  })

  test(`It should return 92
  [INPUT]: 1380, 1472`, () => {
    expect(MDC(1380, 1472)).toBe(92)
  })

  test(`It should return 1
  [INPUT]: 28, 29`, () => {
    expect(MDC(28, 29)).toBe(1)
  })

  test(`It should return 10
  [INPUT]: 50, 20`, () => {
    expect(MDC(50, 20)).toBe(10)
  })
})
