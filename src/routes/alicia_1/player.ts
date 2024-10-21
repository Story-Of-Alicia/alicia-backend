import express from 'express';
import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../../constants/envs'
import { federationClient } from '../../federationClient';
import { Player, Gender, AgeGroup } from '../../models/alicia_1/Player';

const router = express.Router();

// sample player data
const samplePlayer: Player = {
  lobbyTime: Date.now(),
  selfUid: 12345,
  nickName: "Alicia",
  profileGender: Gender.Boy,
  level: 10,
  carrots: 100,
  characterEquipment: [
    { uid: 1, tid: 1001, val: 0, count: 1 },
    { uid: 2, tid: 1002, val: 0, count: 1 }
  ],
  horseEquipment: [
    { uid: 3, tid: 2001, val: 0, count: 1 }
  ],
  ageGroup: AgeGroup.Adult
};

router.get('/:id', (req, res) => {
  // for now, return the sample player
  res.json(samplePlayer);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // request authentication to federation api
  const federation = new federationClient();
  const isAuthenticated = await federation.authenticateUser(username, password);

  if (isAuthenticated) {
    // TODO: generate JWT based on federation api
    const token = jwt.sign({ username }, ENV_VARS.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router;