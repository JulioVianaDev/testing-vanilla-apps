import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    // https://github.com/jsdom/jsdom#executing-scripts
    const options = {
      resources: 'usable',
      runScripts: 'dangerously',
    };
    dom = new JSDOM(html,options)
    container = dom.window.document.body
  })

  it('renders a heading element', () => {
    let h1Element = container.querySelector('h1')
    expect(h1Element).not.toBeNull()
    let textH1Element = getByText(container,'Testando Apps')
    expect(textH1Element).toBeInTheDocument()
  })
})
