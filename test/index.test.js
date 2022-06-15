import chai from 'chai';
import chaihttp from 'chai-http';
import config from '../config/default.js';

chai.use(chaihttp);

const { expect, request } = chai;
const port = config.port;
const host = `127.0.0.1:${port}`;

describe('CAMPUS CETRAL API TESTS ', () => {
  //The local server needs to be running for this test to pass
  it('base url should return a status code of 200', async () => {
    const res = await request(host)
      .get('/')
      .set('content-type', 'application/json');

    expect(res).to.have.status(200);
  }).timeout(20000);
});
