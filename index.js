const express = require('express')
const path= require('path')
const Rollbar = require('rollbar')

const app = express()

app.use(express.json())

let traces=[]

var rollbar = new Rollbar({
  accessToken: '48919cbac623421f8c4d079e8e09fe2e',
  captureUncaught: true,
  captureUnhandledRejections: true
});

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public/index.html'))
  rollbar.info('html file served successfully.')
  })


app.post('/api/trace', (req, res)=>{
 let {trace} = req.body
 
  const index = traces.findIndex(traceName=> traceName === trace)

  if(index===-1 && trace !==""){
      traces.push(" "+trace)
      rollbar.log('trace added successfully', {author: 'Megan'})
      res.status(200).send(traces)
  } else if (trace===''){
    rollbar.error('no trace given')
    res.status(400).send('provide trace')
  } else {
    rollbar.error('already exists')
    res.status(400).send('already exists')
  }
})

const port=process.env.PORT || 5545

app.listen(port, ()=>{console.log(`up and running on ${port}`)})