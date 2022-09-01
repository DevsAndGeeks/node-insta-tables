// create an init test where class exists

import { InstantTable } from '../../src/index'

describe('Instatable', () => {
  it('should be callable', () => {
    const table = new InstantTable()
    expect(table).toBeInstanceOf(InstantTable)
  })

})