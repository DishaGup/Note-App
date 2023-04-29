const express = require("express")
const { RegisterModel } = require("../Model/register.model")
const registerRouter = express.Router()
const bcrypt = require('bcrypt');
const { logger } = require("../looger.middleware")
const jwt = require("jsonwebtoken")
registerRouter.use(express.json())



registerRouter.get('/', async (req, res) => {
    let data = await RegisterModel.find()
    res.json({ msg: "user", data: data })

})

registerRouter.post('/register', async (req, res) => {
    try {
        const { age, name, password, email } = req.body
        bcrypt.hash(password, 3, async (err, hash) => {
            if (err) throw new Error("hashing not performed")
            let adduser = new RegisterModel({ age, name, email, password: hash })
            await adduser.save()
            res.json({ "msg": "user registered", data: req.body })
        });

    } catch (error) {
        res.send(error)
        res.send(error.msg)
    }
})


registerRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        let adduser = await RegisterModel.findOne({ email: email })
        bcrypt.compare(password, adduser.password, function (err, result) {
               if (result) {
                const token = jwt.sign({authorID:adduser._id,author:adduser.name}, "masai", { expiresIn: '1h' })
                res.status(200).json({ "msg": "user Authorized", "token": token })
            } else {
                res.status(200).json({ "msg": "Check the credentials" })
            }
        });
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }
})


registerRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        let user = await RegisterModel.findOne({ _id: id }, req.body)
        res.json({ msg: "user updated", user })
    } catch (error) {
        res.send(error.message)
    }

})

registerRouter.patch('/update/:id', logger, async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        await RegisterModel.findByIdAndUpdate({ _id: id }, req.body)
        res.json({ msg: "user updated" })
    } catch (error) {
        res.send(error.message)
    }

})


registerRouter.delete('/delete/:id', logger, async (req, res) => {
    try {
        const { id } = req.params
        await RegisterModel.findByIdAndDelete({ _id: id })
        res.json({ msg: "user deleted" })
    } catch (error) {
        res.send(error.message)
    }

})

module.exports = {
    registerRouter
}