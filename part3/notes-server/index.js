const http = require('http')//it import the http package,  no need to install it's build in package

const app = http.createServer((request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/notplain' })
  response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)