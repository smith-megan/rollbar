const express = require('express')
const path= require('path')
// const Rollbar = require('rollbar')

const app = express()

app.use(express.json())

// var rollbar = new Rollbar({
//   accessToken: '48919cbac623421f8c4d079e8e09fe2e',
//   captureUncaught: true,
//   captureUnhandledRejections: true
// });

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'index.html'))
  // rollbar.info('html file served successfully.')
  })

const port=process.env.PORT || 5545

app.listen(port, ()=>{console.log(`up and running on ${port}`)})