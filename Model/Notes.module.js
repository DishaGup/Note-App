const mongoose = require("mongoose")

const NotesSchema = mongoose.Schema({
    Title: { type: String, required: true },
    Desc: { type: String, required: true, lowercase: true },
    Price: { type: Number },
    },{
    versionKey:false
})

const NotesModel = mongoose.model("note", NotesSchema)

module.exports = {
    NotesModel
}

/*
{
  "Title": "Tony Man 2",
  "Desc": "Hi, I ma Iron man 2",
  "Price": 2452
}
*/