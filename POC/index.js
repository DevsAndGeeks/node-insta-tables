
function instaTables (model, configuration) {

  const options = {}
  if (configuration.searchBy) {
    const where = {
      [configuration.searchBy]: configuration.searchValue
    }
    console.trace(where)
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
    const order = [sortName, sortOrder]
    options.order = [
      order
    ]
  }
  return model.findAll(options)
}

module.exports = {
  instaTables
}