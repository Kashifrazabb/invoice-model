import {Router} from "express"
import {invoiceModel,historyModel} from "./db.js"

const route = Router()
const count = 0
const remain = 0

const total = (res) => {
    invoiceModel.count({},(err,count)=>{
        invoiceModel.count({ip:""},(err,remain)=>{
            res.render('after-login',{count,remain})
        })
    })
}


route.get('/',(req,res)=>{
    const invoice = ""
    res.render('index',{invoice})
})

route.post('/send',(req,res)=>{
    const ip = req.header('x-forwarded-for') || req.ip
    // req.socket.remoteAddress = req.ip
    invoiceModel.findOne({ip}).then(user => {
        if (!user) {
            invoiceModel.findOneAndUpdate({ip:""},{ip}).then(user => {
                res.render('index',{invoice:user.invoice})
            })
        } else{
        res.render('index',{invoice:user.invoice})
    }
    })
})

route.get('/login',(req,res)=>{
    res.render('login')
})

route.post('/after-login',(req,res)=>{
    const {username, password} = req.body
    if (!username || !password){
        res.redirect('/login')
    } else if (username!=='kashif786' || password!=='kashif786') {
        res.redirect('/login')
    } else{
        total(res)
    }
})


route.post('/add-invoice',(req,res) => {
    const invoice = req.body.invoice
    invoiceModel.create({ip:"",invoice}).then(user => {
        historyModel.create({invoice:user.invoice}).then(_ => {
            total(res)
        })
        
    })
})

route.post('/refresh',(req,res)=>total(res))


export default route