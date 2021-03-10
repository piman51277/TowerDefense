const express = require('express')
const app = express();
app.use(express.static('src'))
app.listen(process.send.PORT || 80, () => {
    console.log(`server online`)
})