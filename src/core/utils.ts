// random function
import {FindOptions} from 'sequelize'
export function random (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}


type queryConfig = {
  searchBy?: string,
  searchValue?: string,
  limit?: number,
  orderBy?: string,
}
export function instaTables (model:any, configuration:queryConfig):any {

  const options:FindOptions<any> = {}
  if (configuration.searchBy) {
    const where = {
      [configuration.searchBy]: configuration.searchValue
    }
    options.where = where
  }
  if (configuration.limit) {
    options.limit = configuration.limit
  }
  if (configuration.orderBy) {
    let sortOrder = 'ASC'
    let sortName = configuration.orderBy
    if (configuration.orderBy[0] === '-') {
      sortOrder = 'DESC'
      sortName = sortName.slice(1)
    }
    const order:any = [sortName, sortOrder]
    options.order = [
      order
    ]
  }
  return model.findAll(options)
}