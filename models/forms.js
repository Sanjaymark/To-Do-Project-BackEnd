import mongoose,{ mongo } from "mongoose";

const formSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
});

const Form = mongoose.model("form", formSchema);

export default Form;
