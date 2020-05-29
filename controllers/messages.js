//! Require
const User = require('../models/user')
const Message = require('../models/message')
const { unauthorized, notFound, cantMessageYourself } = require('../lib/errorMessages')

//! MESSAGES
//? Function for creating a message.
//* WORKING tested
//* ERROR tested
async function createMessage(req, res, next) {
  try {
    req.body.user = await User.findById(req.currentUser)
    req.body.owner = await User.findById(req.params.userid)
    if (!req.body.owner) throw new Error(notFound)
    if (req.body.user._id.equals(req.body.owner._id)) throw new Error(cantMessageYourself)
    const message = await Message.create(req.body)
    await message.save()
    res.status(201).json(message)
  } catch (err) {
    next(err)
  }
}

//? Function for sending response to intial Message
//* WORKING tested
//* ERROR tested
async function sendResponse(req, res, next) {
  try {
    req.body.user = req.currentUser
    const message = await Message.findById(req.params.id)
    if (!message) throw new Error(notFound)
    if (!message.user.equals(req.currentUser._id) && !message.owner.equals(req.currentUser._id)) throw new Error(unauthorized)
    const response = req.body
    message.response.push(response)
    await message.save()
    res.json(message)
  } catch (err) {
    next(err)
  }
}

//? Get single message with all responses
//* WORKING tested
//* ERROR tested
async function getMessage(req, res, next) {
  try {
    const message = await Message.findById(req.params.id)
    if (!message) throw new Error(notFound)
    if (!message.user.equals(req.currentUser._id) && !message.owner.equals(req.currentUser._id)) throw new Error(unauthorized)
    res.json(message)
  } catch (err) {
    next(err)
  }
}

//? Get all messages sent to rent
//* WORKING tested
//* ERROR tested
async function getMessageThread(req, res, next) {
  try {
    const messages = await Message.find().populate('user').populate('owner').populate('response.user')
    const filtered = await messages.filter(message => message.owner.equals(req.currentUser._id))
    const filteredtwo = await messages.filter(message => message.user.equals(req.currentUser._id))
    const full = filtered.concat(filteredtwo)
    res.status(201).json(full)
  } catch (err) {
    next(err)
  }
}

//! Export
module.exports = {
  createMessage,
  sendResponse,
  getMessage,
  getMessageThread
}