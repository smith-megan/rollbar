const express = require('express')
const path= require('path')
const Rollbar = require('rollbar')

const app = express()

app.use(express.json())
app.use('/style', express.static('./public/styles.css'))

let track=[]

// include and initialize the rollbar library with your access token
var rollbar = new Rollbar({
  accessToken: '48919cbac623421f8c4d079e8e09fe2e',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar


app.get('/', (req, res)=>{
res.sendFile(path.join(__dirname, 'public/index.html'))
rollbar.info('html file served successfully.')
})

app.post('/api/t', (req, res)=>{
  let {name} = req.body
  name = name.trim()

  const index = track.findIndex(studentName=> studentName === name)

  if(index === -1 && name !== ''){
      track.push(name)
      rollbar.log('student added successfully', {author: 'Scott'})
      res.status(200).send(track)
  } else if (name === ''){
      rollbar.error('no name given', {author: 'megan'})
      res.status(400).send('must provide a name.')
  } else {
      rollbar.error('student already exists', {author: 'megan'})
      res.status(400).send('that student already exists')
  }

})


app.post('/api/r', (req, res)=>{
  try{
  mistake()} catch (err) {
    rollbar.error("function doesn't exist", {author: 'megan'})
  }

})

const port=process.env.PORT || 4545

rollbar.log("Hello world!");

app.listen(port, ()=> console.log(`take us to a port of ${port}`))