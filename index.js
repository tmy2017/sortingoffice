/* const { parse } = require('url')

module.exports = (req, res) => {
  console.log('Request received')
  const { query } = parse(req.url, true)
  const data = query.data || null
  const headers = query.headers || null
  res.end(`Hello, World! ${query.url}`)
}

*/
const axios = require('axios')
const querystring = require('querystring')
const { parse } = require('url')

module.exports = async (req, res) => {
  console.log('Starting... received ' + req)
  const { query } = parse(req.url, true)
  const data = query.data || null
  const headers = query.headers || null
  
  let url = query.url || null

  if (!url) {
    res.end('You must specify a forwarding url')
  }

  let newQuery = query

  delete newQuery.data
  delete newQuery.headers
  delete newQuery.url

  let sep = Object.keys(newQuery).length > 0 ? "&" : "/?"

  url = url + sep + querystring.stringify(newQuery)

  await axios.post(url, data)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (err) {
  	res.end(error)
  })

  res.end(`<script>window.open('','_self').close()</script>`)
  
}
