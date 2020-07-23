const express = require('express');
const app = express();
const cors = require('cors');
//midelware
app.use(cors());
app.use(express.json());
app.use('/users',require('./apis/users'));
app.use('/tweets',require('./apis/tweets'));
app.use('/token',require('./apis/token'));
//get

//post

//put

//delete

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT} 🔥`));