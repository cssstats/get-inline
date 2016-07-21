'use strict'

const nightmare = require('nightmare')()
const getInlineStyles = require('get-inline-styles')
const isUrl = require('is-url')

module.exports = url => {
  return new Promise((resolve, reject) => {
    if (typeof url !== 'string' || !isUrl(url)) {
      reject({ error: 'get-inline expected a url' })
    }

    nightmare
      .goto(url)
      .wait()
      .evaluate(() => document.documentElement.innerHTML)
      .end()
      .then(getInlineStyles)
      .then(resolve)
      .catch(reject)
  })
}
