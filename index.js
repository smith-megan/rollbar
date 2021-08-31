const express = require('express')
const path= require('path')
const Rollbar = require('rollbar')

const app = express()

app.use(express.json())
app.use('/style', express.static('./public/styles.css'))

let students=[]

// include and initialize the rollbar library with your access token
var rollbar = new Rollbar({
  accessToken: '5520cd4cf12a4fe48fa8a32e60b9ee10',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar


app.get('/', (req, res)=>{
res.sendFile(path.join(__dirname, 'public/index.html'))
rollbar.info('html file served successfully.')
})

app.post('/api/student', (req, res)=>{
  let {name} = req.body
  name = name.trim()

  const index = students.findIndex(studentName=> studentName === name)

  if(index === -1 && name !== ''){
      students.push(name)
      rollbar.log('student added successfully', {author: 'Scott'})
      res.status(200).send(students)
  } else if (name === ''){
      rollbar.error('no name given', {author: 'megan'})
      res.status(400).send('must provide a name.')
  } else {
      rollbar.error('student already exists', {author: 'megan'})
      res.status(400).send('that student already exists')
  }

})

const port=process.env.PORT || 4545

rollbar.log("Hello world!");

app.listen(port, ()=> console.log(`take us to a port of ${port}`))