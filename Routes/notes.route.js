const express = require("express")
const {NotesModel} =require("../Model/Notes.module")
const NotesRouter = express.Router()
NotesRouter.use(express.json())



NotesRouter.get('/', async (req, res) => {

    let data = await NotesModel.find({authorId:req.body.authorID})
    res.json({ msg: "user", data: data })

})

NotesRouter.post('/create', async (req, res) => {
    try {
        
            let adduser = new NotesModel(req.body)
            await adduser.save()
            res.json({ "msg": "notes registered", data: req.body })
      
    } catch (error) {
        res.send(error)
        res.send(error.msg)
    }
})


NotesRouter.patch('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        await NotesModel.findByIdAndUpdate({ _id: id }, req.body)
        res.json({ msg: `notes with ${id} updated` })
    } catch (error) {
        res.send(error.message)
    }

})


NotesRouter.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await NotesModel.findByIdAndDelete({ _id: id })
        res.json({ msg: `notes with ${id} deleted` })
    } catch (error) {
        res.send(error.message)
    }

})


module.exports={
    NotesRouter
}