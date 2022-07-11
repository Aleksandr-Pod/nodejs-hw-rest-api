// const actions = require('../../models/contacts')
const Contact = require('../../models/newContacts')
const createError = require('../../helpers/error')
const mongoose = require('mongoose')

const getById = async (req, res, next) => {
  try {
      if(!mongoose.isValidObjectId(req.params.contactId)){
      throw createError(400, "wrong Id");
    };
    const result = await Contact.findById(req.params.contactId)
      if (!result) {
      throw createError(404)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = getById