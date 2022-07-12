// const actions = require('../../models/contacts')
const Contact = require('../../models/newContacts')

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { page = 1, limit = 100, favorite } = req.query
    console.log('favorite:', favorite)
    const skip = (page - 1) * limit
    let result = await Contact
      .find({ owner: _id }, "", { skip, limit: +limit })
      .populate("owner", "_id email")
    if (favorite) {
      result = result.filter(item => item.favorite === true)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}
module.exports = getAll