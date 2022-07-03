import * as puppeteer from 'puppeteer';
const { createText } = require('../helpers/utils');

test('create text test', () => {
    const text = createText('arghun', 27);
    expect(text).toBe('Hi I am arghun and I am 27 years old');
});

test('create text without age', () => {
    const text = createText('arghun', null);
    expect(text).toBe('Hi I am arghun');
});

test('create text without name', () => {
    const text = createText(null, 27);
    expect(text).toBe('I am 27 years old');
});

test('should add todo properly', async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
    });

    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.click("#todo-input");
    await page.type("#todo-input", 'Arghun You will be successfull');
    await page.click("#todo-button");
    const finalText = await page.$eval('.todo-item', el => el.textContent);
    expect(finalText).toBe('Arghun You will be successfull');
}, 20000)