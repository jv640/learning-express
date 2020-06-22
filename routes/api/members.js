const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');



// Get All members
router.get('/', (req, res) => res.json(members));

// Get single members
router.get('/:id', (req, res) => {
    const found = members.some( member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else{
        res.status(400).json({msg : `member with ID ${req.params.id} not found`});
    }
});

// creating a new member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'active'
    };

    if(!newMember.name || !newMember.email){
        return res.status(400).json({ mag : 'Please include name and email '});
    }
    members.push(newMember);
    res.json(members);
})

// updating a member
router.put('/:id', (req, res) => {
    console.log('here in put');
    const found = members.some( member => member.id === parseInt(req.params.id));
    console.log(found);
    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.email : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({ msg : 'Member Updated ', member});
            }
        });
    } else{
        res.status(400).json({msg : `member with ID ${req.params.id} not found`});
    }
});

// delete member
router.delete('/:id', (req, res) => {
    const found = members.some( member => member.id === parseInt(req.params.id));
    if(found){
        res.json({
            msg : 'Member deleted ',
            members : members.filter(member => member.id !== parseInt(req.params.id))});
    } else{
        res.status(400).json({msg : `member with ID ${req.params.id} not found`});
    }
});

module.exports = router;