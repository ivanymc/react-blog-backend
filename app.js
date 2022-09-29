import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

// React Blogs
import Reactblog from './models/Reactblog.js';

const app = express();

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// connect to mongodb
mongoose.connect(process.env.DB_URL)
  .then(result => app.listen(8000))
  .catch(err => console.log(err));


// cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"]  
  })
);


// For React Blog
app.get('/reactblogs', (req, res) => {
  Reactblog.find().sort( { createdAt: 0 } )
    .then( result => res.send(result))
    .catch( err => console.log(err));
});

app.post('/reactblogs', (req, res) => {
  const reactblog = new Reactblog(req.body);
  reactblog.save()
    .then( result => res.send("hello"))
    .catch( err => console.log(err));
});


