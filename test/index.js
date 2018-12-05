const { describe, it } = require('mocha');
const { expect } = require('chai');
const { readFileSync } = require('fs');
const { JSDOM } = require('jsdom');

const data = [];

function parseChildren(el) {
    console.log('parsing el', el);
    const title = el.getAttribute('title');
    const type = el.getAttribute('type');
    const nbChildren = el.children.length;
    console.log({ nbChildren });
    if (nbChildren > 0) {
        data.push({ title, type, nbChildren });
    }
    for (child of el.children) {
        parseChildren(child);
    }
}

describe('JSDOM', () => {
    it('should be true', () => {
        const xml = readFileSync('sample.xml', 'utf8');

        const dom = new JSDOM(xml, { contentType: 'application/xml' });
        const root = dom.window.document.querySelector('[type=productObject]');
        parseChildren(root);

        console.log(JSON.stringify(data));
        expect(true).to.be.true;
    });
});
