import mongoose from "mongoose"
import {config} from 'dotenv'

config()

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', _ => console.log("Database is synced"))
mongoose.connection.on('error', _ => console.log("Database error"))

const {Schema, model}=mongoose;

const invoiceSchema = Schema({
    ip:{type:String},
    invoice:{type:String,required:true}
});

const historySchema = Schema({
    invoice:{type:String}
})

const invoiceModel = model('invoiceModel',invoiceSchema);
const historyModel =  model('historyModel',historySchema);
export {invoiceModel,historyModel}