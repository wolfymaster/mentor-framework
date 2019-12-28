let { auth, redirectURI, webpage_submit, createUser } = require('./hubspot')
let { subscription } = require('./pubsub')
let {linkedinAuth, linkedinRedirectURI} = require('./linkedin')
let { api } = require('./transpiled/api')
const path = require("path")

exports.load = (req,res) => {
  res.status(200).send("<html><head><title>My Webpage</title><script src=\"https://us-central1-young-erie-professionals.cloudfunctions.net/script\"></script></head><body>Original Webpage <div id=\"root\"></div></body></html>");
}

exports.script = (req, res) => {
  res.setHeader('content-type', 'text/javascript')
  res.status(200).sendFile(path.join(__dirname,'script.js'))
}

// hubspot.js
exports.auth = auth;
exports.redirectURI = redirectURI;
exports.webpage_submit = webpage_submit;
exports.createUser = createUser;

// pubsub.js
exports.subscription = subscription;

// linkedin.js
exports.linkedinRedirectURI = linkedinRedirectURI;
exports.linkedinAuth = linkedinAuth;

// API
exports.websiteApi = api;


//exports = {load, script, auth, redirectURI, webpage_submit, subscription};