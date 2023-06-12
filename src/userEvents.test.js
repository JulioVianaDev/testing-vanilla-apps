import { fireEvent, getByText,getByTestId } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

const script = fs.readFileSync(path.resolve(__dirname, './script.js'), 'utf8');

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
    
    dom.window.eval(script);
  })

  it('renders a new paragraph via JavaScript when the button is clicked', async () => {
    const button = getByText(container, 'Clique aqui!');
    const nome = getByTestId(container, 'nome-anime');
    const desc = getByTestId(container, 'desc-anime');
    nome.value = "digitei algo"
    desc.value = "opa"
    fireEvent.click(button)
    let generatedParagraphs = container.querySelectorAll('#tbody tr')
    expect(generatedParagraphs.length).toBe(1)
    expect(generatedParagraphs[0].lastChild.innerHTML).toBe("opa")
  })
})
