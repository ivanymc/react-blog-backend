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

app.get('/', (req, res) => {
  res.send("OK");
});

// For React Blog
app.get('/reactblogs', (req, res) => {
  Reactblog.find().sort( { createdAt: 0 } )
    .then( result => res.send(result))
    .catch( err => console.log(err));
});

app.get('/reactblogs/:id', (req, res) => {  
  const id = req.params.id;
  Reactblog.findById(id)
    .then( result => res.send(result))
    .catch( err => res.status(404).send('404'));
})

app.post('/reactblogs', (req, res) => {
  const reactblog = new Reactblog(req.body);
  reactblog.save()
    .then( result => res.send("hello"))
    .catch( err => console.log(err));
});

app.delete('/reactblogs/:id', (req, res) => {
  const id = req.params.id;
  Reactblog.findByIdAndDelete(id)
    .then( result => res.json({ redirect: '/' }))
    .catch( err => console.log(err) );
})

app.use( (req, res) => {
  res.status(404).send('404');
});


