//! Consts
const port = process.env.PORT || 8001
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/clothes'
const secret = process.env.SECRET || 'KEBBforlife'

//! Exports
module.exports = {
  dbURI,
  port,
  secret
}