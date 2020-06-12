const expect = require('chai').expect;
const encrypt = require('../encrypt.js');

it('test the encryption engine', async () => {
    const res = await encrypt('temp.txt', '12345');
    expect(res).to.be.be.true;
})