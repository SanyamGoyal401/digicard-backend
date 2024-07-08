const express = require('express');
const multer = require('multer');
const Business = require('../models/business');
const { cloudinary, storage } = require('../config/cloudinary');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage });

router.get('/form',auth, async(req, res)=>{
    try{
        const response = await Business.find({});
        res.json(response);
    }
    catch(error){
        console.log(error);
        res.json(error);
    }
})

// Handle Form Submission
router.post('/form',auth, async (req, res) => {
    try {
        const newBusiness = await Business.create(req.body);
        res.json({data: newBusiness});
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.post('/form/photo',auth, upload.fields([{name: 'photo'}]), async (req, res)=>{
    try{
        const photo = req.files['photo'][0].path;
        return res.json({url: photo});
    }
    catch(error){
        console.log(error);
        res.json(error);
    }
});

router.delete('/form/photo',auth, async (req, res)=>{
    try{
        const {url} = req.body;
        const public_id = new URL(url).pathname.split('/').slice(5).join('/').split('.')[0];
        const response = await cloudinary.api.delete_resources([public_id],{
            type: 'upload',
            resource_type: 'image'
        });
        res.json({ 
            message: 'Image deleted successfully', 
            response: response
        });
    }
    catch(error){
        console.log(error);
        res.json({error: error.message});
    }
});

//Update Business Page
router.put('/form/:id',auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const newBusiness = await Business.findByIdAndUpdate(id, updateData, {new: true});
        res.json(newBusiness);
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});

// Delete Business Page
router.delete('/form/:id',auth, async (req, res) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);
        if (business) {
            res.json(business);
        } else {
            res.status(404).send('Business not found');
        }
    } catch (error) {
        console.log(error);
    }
});

// Display Business Page
router.get('/:route', async (req, res) => {
    try {
        const business = await Business.findOne({ route: req.params.route });
        if (business) {
            res.json(business);
        } else {
            res.status(404).send('Business not found');
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
