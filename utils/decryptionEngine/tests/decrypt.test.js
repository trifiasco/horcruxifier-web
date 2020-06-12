const expect = require('chai').expect;
const decrypt = require('../decrypt');

it.only('test the encryption engine', async () => {
    const res = await decrypt('horcruxes', '12345');
    expect(res).to.be.be.true;
})