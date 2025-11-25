const router = require('express').Router()
const Note = require('../model/note')
const User = require('../model/user')

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router