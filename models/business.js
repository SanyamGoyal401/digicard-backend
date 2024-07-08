const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    route: {
        type: String,
        required: true,
        unique: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    businessPhoto: {
        type: String,
        default: null
    },
    ownerPhoto: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    aboutUs: {
        type: String,
        default: null
    },
    instagram: {
        type: String,
        default: null
    },
    facebook: {
        type: String,
        default: null
    },
    twitter: {
        type: String,
        default: null
    },
    youtube: {
        type: String,
        default: null
    },
    justdial: {
        type: String,
        default: null
    },
    expireTime: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);