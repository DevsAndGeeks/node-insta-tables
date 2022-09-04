import { Sequelize } from 'sequelize';
import {instaTables} from '../../src/core/utils'
const sequelize = new Sequelize('sqlite::memory:')


const Thing = sequelize.define('Thing', {
  name: {
    type: 'string',
    allowNull: false
  }
});


async function seedThings (names: string[]) {
  await Thing.sync({ force: true })
  return Promise.all(
   names.map((name:string) => Thing.create({ name }))
  )
}

describe('Insta-Tables POC', () => {
  test('It should limit the number of results', async () => {
    const names = ['Orange', 'Banana', 'Akuma', 'Guitar']
    await seedThings(names)
    const limit = 1
    const result = await instaTables(Thing, { limit })
    expect(result).toBeDefined()
    expect(result.length).toEqual(1)
    const [instance] = result
    expect(instance).toBeDefined()
    expect(instance.name).toBeDefined()
    expect(names.includes(instance.name)).toEqual(true)
  })
  test('Should short ascending by default', async function () {
    const names = ['Orange', 'Banana', 'Akuma', 'Guitar']
    await seedThings(names)
    const orderBy = 'name'
    const result = await instaTables(Thing, { orderBy })
    expect(result).toBeDefined()
    expect(result.length).toEqual(4)
    const [first, second, third, fourth] = result
    expect(first).toBeDefined()
    expect(second).toBeDefined()
    expect(third).toBeDefined()
    expect(fourth).toBeDefined()

    expect(first.name).toEqual('Akuma')
    expect(second.name).toEqual('Banana')
    expect(third.name).toEqual('Guitar')
    expect(fourth.name).toEqual('Orange')
  })
  test('Should sort descending when prefixed with a minus sign', async function () {
    const names = ['Orange', 'Banana', 'Akuma', 'Guitar']
    await seedThings(names)
    const orderBy = '-name'
    const result = await instaTables(Thing, { orderBy })
    expect(result).toBeDefined()
    expect(result.length).toEqual(4)
    const [first, second, third, fourth] = result
    expect(first).toBeDefined()
    expect(second).toBeDefined()
    expect(third).toBeDefined()
    expect(fourth).toBeDefined()

    expect(first.name).toEqual('Orange')
    expect(second.name).toEqual('Guitar')
    expect(third.name).toEqual('Banana')
    expect(fourth.name).toEqual('Akuma')
  })

  test('Should filter the search', async function () {
    const names = ['Orange', 'Banana', 'Akuma', 'Guitar']
    await seedThings(names)
    const searchBy = 'name'
    const searchValue = 'Orange'
    const result = await instaTables(Thing, { searchBy, searchValue })
    expect(result).toBeDefined()
    expect(result.length).toEqual(1)
    const [instance] = result
    expect(instance).toBeDefined()
    expect(instance.name).toBeDefined()
    expect(instance.name).toEqual('Orange')
  })
})
