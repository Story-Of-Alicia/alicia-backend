import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('Player API', () => {
  it('should return a sample player', async () => {
    const res = await request(app)
      .get('/api/player/1')
      .expect(200);

    expect(res.body).to.have.property('nickName');
    expect(res.body).to.have.property('level');
    expect(res.body.characterEquipment).to.be.an('array');
  });
});