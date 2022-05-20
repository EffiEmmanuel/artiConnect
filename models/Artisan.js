const mongoose = require('mongoose')

const artisanSchema = new mongoose.Schema({    
    contactName: {
        type: String,
        required: true
    },
    
    contactPhone: {
        type: String,
        required: true
    },

    contactEmail: {
        type: String,
        required: true
    },

    businessName: {
        type: String,
        required: true
    },
 
    cacStatus: {
        type: String,
        required: true,
        default: 'false'
    },
    
    jobTitle: {
        type: String,
        required: true
    },

    staffStrength: {
        type: String,
        required: true
    },

    contactAddress: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },
 
    website: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    profilePicture: {
        type: String,
        required: true
    },
    
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now
    }

})

module.exports = mongoose.model('Artisan', artisanSchema)