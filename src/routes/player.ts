import express from 'express';
import { Player, Gender, AgeGroup } from '../models/Player';

const router = express.Router();

// Sample player data
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
  // For now, always return the sample player
  res.json(samplePlayer);
});

export default router;