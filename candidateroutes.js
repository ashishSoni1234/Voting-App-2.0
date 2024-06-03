
const express = require('express');
const router = express.Router();
const Candidate = require('./candidate'); // Make sure the model is properly named and imported
 const User=require('./user');
const { jwtauthmiddleware, generatetoken } = require('./jwt');

const checkadminrole = async (userid) => {
    try {
        const user = await User.findById(userid); // Correct the variable name for User model
        return user.role === 'admin';
    } catch (err) {
        return false;
    }
};

router.post('/', jwtauthmiddleware, async (req, res) => {
    try {
        if (!await checkadminrole(req.user.id)) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }
        const data = req.body;
        const newCandidate = new Candidate(data);
        const response = await newCandidate.save();
        console.log('Data saved');
        res.status(200).json({ response: response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:candidateid', jwtauthmiddleware, async (req, res) => {
    try {
        if (!await checkadminrole(req.user.id)) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }
        const candidateId = req.params.candidateid;
        const updatedCandidateData = req.body;
        const response = await Candidate.findByIdAndUpdate(candidateId, updatedCandidateData, {
            new: true,
            runValidators: true,
        });
        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        console.log('Data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:candidateid', jwtauthmiddleware, async (req, res) => {
    try {
        if (!await checkadminrole(req.user.id)) {
            return res.status(403).json({ message: 'User does not have admin role' });
        }
        const candidateId = req.params.candidateid;
        const response = await Candidate.findByIdAndDelete(candidateId);

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        console.log('Candidate deleted');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/vote/:candidateid', jwtauthmiddleware, async (req, res) => {
    // no admin can vote
    // user can only vote once
    const candidateId = req.params.candidateid;
    const userId = req.user.id;
    try {
        const candidate = await Candidate.findById(candidateId); // Use Candidate instead of candidate
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        const user = await User.findById(userId); // Use User instead of user
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.isvoted) {
            return res.status(400).json({ message: 'You have already voted' });
        }
        if (user.role == 'admin') {
            return res.status(403).json({ message: 'Admin is not allowed to vote' });
        }
        candidate.votes.push({ user: userId });
        candidate.votecount++;
        await candidate.save();
        user.isvoted = true;
        await user.save();
        res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/vote/count', async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ votecount: 'desc' });
        const record = candidates.map((data) => {
            return {
                party: data.party,
                count: data.votecount
            };
        });

        return res.status(200).json(record);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;