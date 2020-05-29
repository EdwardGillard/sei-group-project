//! Required
const User = require('../models/user')
const { notFound } = require('../lib/errorMessages')

//! MAP PINS
//? Function to get all Map Pins of current user
//* WORKING tested
//* ERROR tested
async function getPins(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id)
    res.status(201).json(user.pins)
  } catch (err) {
    next(err)
  }
}

//? Function to create a Map Pin
//* WORKING tested
//* ERROR tested
async function mapPinsCreate(req, res, next) {
  req.body.user = req.currentUser
  try {
    const user = await User.findById(req.currentUser._id)
    user.pins.push(req.body)
    await user.save()
    res.status(201).json(user.pins)
  } catch (err) {
    next(err)
  }
}

//? Function to get Single Map Pin
//* WORKING tested
//* ERROR tested 
async function mapPinShow(req, res, next) {
  req.body.user = req.currentUser
  try {
    const pinId = req.params.pinId
    const user = await User.findById(req.currentUser)
    const mapped = user.pins.id(pinId)
    if (!mapped) throw new Error(notFound)
    res.status(200).json(mapped)
  } catch (err) {
    next(err)
  }
}

//? Function to Update a Map Pin
//* WORKING tested
//* ERROR tested
async function mapPinUpdate(req, res, next) {
  req.body.user = req.currentUser
  try {
    const pinId = req.params.pinId
    const user = await User.findById(req.currentUser)
    const pinToUpdate = user.pins.id(pinId)
    if (!pinToUpdate) throw new Error(notFound)
    Object.assign(pinToUpdate, req.body)
    await user.save()
    res.status(202).json(pinToUpdate)
  } catch (err) {
    next(err)
  }
}

//? Function to Delete a Map Pin
//* WORKING tested
//* ERROR tested
async function mapPinDelete(req, res, next) {
  try {
    const pinId = req.params.pinId
    const user = await User.findById(req.currentUser)
    const pinDelete = user.pins.id(pinId)
    if (!user.pins.includes(pinDelete)) throw new Error(notFound)
    await pinDelete.remove()
    await user.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

//! Exports
module.exports = {
  getPins,
  create: mapPinsCreate,
  single: mapPinShow,
  update: mapPinUpdate,
  delete: mapPinDelete
}