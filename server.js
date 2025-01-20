
const express = require('express')
const path = require('path');
const app = express()
const port = 3003


// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port http//localhost:${port}`)
})
      