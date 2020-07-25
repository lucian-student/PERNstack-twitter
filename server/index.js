const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
//midelware
app.use(cors({
    origin:'http://localhost:3000/',
    credentials:true
}));
app.use(cookieParser());
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