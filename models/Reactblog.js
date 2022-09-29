import mongoose from 'mongoose';
const Scheme = mongoose.Schema;

const reactblogSchema = new Scheme({
    title: {
        type: String,
        required: true
    }, 
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true });

// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, Blog model look for blogs collection.
const Reactblog = mongoose.model('Reactblog', reactblogSchema);

export default Reactblog;