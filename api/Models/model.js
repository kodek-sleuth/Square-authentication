const mongoose = require('mongoose');

//Creating Product Schema
const Users = mongoose.Schema({
    Full_Name:  {type: String, required: true},
    Email: {type: String, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    Password: {type: String, required: true},
    Birth_Date: {type: String, required: true},
    Sex: {type: String, required: true},
    Nationality: {type: String, required: true},
    Instagram_Account: {type: String, required: true},
    Phone_Number: {type: String, required: true},
    Mother_Agency: {type: String},
    Current_Agency: {type: String},
    Invitation_Code: {type: String}
});

//Exporting it as Model
module.exports=mongoose.model('Users', Users)