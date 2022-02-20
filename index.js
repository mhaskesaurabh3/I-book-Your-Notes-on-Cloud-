const connectToMongo = () => { require('./db') };
const express = require('express')
var cors = require('cors')
connectToMongo();
// const path = require('path')
const dotenv = require('dotenv')
dotenv.config();

const app = express()
// app.use(cors())
app.use(cors({
  origin: "*",
}));
const port = process.env.PORT || 5000
https://runkit.com/

app.use(express.json())


app.use('/api/auth/', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// Deployment
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV == 'production') {
//   // Set static folder
//   app.use(express.static(path.join(__dirname1, "/Frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "Frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running successfully")
//   })
// }


app.listen(port, () => {
  console.log(`i-book backend app listening at http://${port}`)
})

