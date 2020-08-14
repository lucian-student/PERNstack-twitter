const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');
//midelware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/users', require('./apis/users'));
app.use('/tweets', require('./apis/tweets'));
app.use('/comments', require('./apis/comments'));
app.use('/token', require('./apis/token'));
app.use('/tweet_queries', require('./apis/tweetQueries'));
app.use('/comment_queries', require('./apis/commentQueries'));
// socket io 
io.on('connection', () => {
    console.log('socket connected');
});
//get

//post

//put

//delete

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT} 🔥`));