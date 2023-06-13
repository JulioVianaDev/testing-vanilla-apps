import { fireEvent, getByText,getByTestId } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

const script = fs.readFileSync(path.resolve(__dirname, './script.js'), 'utf8');

let dom
let container

describe('User events things', () => {
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
  describe('input checks',()=>{
    it('check if the input sum new things', async () => {
        const button = getByText(container, 'Clique aqui!');
        const nome = getByTestId(container, 'nome-anime');
        const desc = getByTestId(container, 'desc-anime');
    
        nome.value = "digitei algo"
        desc.value = "opa"
        
        fireEvent.click(button)
    
        let qtdTrs = container.querySelectorAll('#tbody tr')
        expect(qtdTrs.length).toBe(1)
        
        nome.value = "digitei algo de novo"
        desc.value = "opa segunda tentativa"
        fireEvent.click(button)
        
        qtdTrs = container.querySelectorAll('#tbody tr')
        expect(qtdTrs.length).toBe(2)
        
        nome.value = "digitei algo de novo again"
        desc.value = "opa terceira tentativa"
        fireEvent.click(button)
        
        qtdTrs = container.querySelectorAll('#tbody tr')
        expect(qtdTrs.length).toBe(3)
      })
      
    
      it('check if the have values correctly', async () => {
        const button = getByText(container, 'Clique aqui!');
        const nome = getByTestId(container, 'nome-anime');
        const desc = getByTestId(container, 'desc-anime');
    
        nome.value = "digitei algo"
        desc.value = "opa"
        
        fireEvent.click(button)
        
        let qtdTrs = container.querySelectorAll('#tbody tr')
        expect(qtdTrs[0].children[2].innerHTML).toBe("opa")
        expect(qtdTrs[0].children[1].innerHTML).toBe("digitei algo")
      })
    
      it('check if after i click in button reset the values',async()=>{
        const button = getByText(container, 'Clique aqui!');
        const nome = getByTestId(container, 'nome-anime');
        const desc = getByTestId(container, 'desc-anime');
    
        nome.value = "digitei algo"
        desc.value = "opa"
        
        fireEvent.click(button)
        expect(nome.value).toBe('')
        expect(desc.value).toBe('')
      })
  })
  describe('deleting the last item',()=>{
    it('when clicked on delete button check the length of tr',()=>{
        const button = getByText(container, 'Clique aqui!');
        const nome = getByTestId(container, 'nome-anime');
        const desc = getByTestId(container, 'desc-anime');
        nome.value = "digitei algo"
        desc.value = "opa"
        fireEvent.click(button)
        let qtdTrs = container.querySelectorAll('#tbody tr')
        nome.value = "digitei algo de novo"
        desc.value = "opa segunda tentativa"
        fireEvent.click(button)
        const lastTr = qtdTrs[qtdTrs.length - 1]; 
        const buttonDelete = lastTr.querySelector('.buttonDelete'); 
        fireEvent.click(buttonDelete);
        qtdTrs = container.querySelectorAll('#tbody tr');
        expect(qtdTrs.length).toBe(1)
    })
  })
  describe('creating 3 tags delete the first and check if the others were kept',()=>{
    it('creating the 3 and delete',()=>{
      const button = getByText(container, 'Clique aqui!');
      const nome = getByTestId(container, 'nome-anime');
      const desc = getByTestId(container, 'desc-anime');
      nome.value = "Mashle"
      desc.value = "Saitama no universo do harry potter"
      fireEvent.click(button)
      nome.value = "One Piece"
      desc.value = "Melhor anime do mundo!"
      fireEvent.click(button)
      nome.value = "Vinland Saga"
      desc.value = "Um garoto viking em busca de sua honra"
      fireEvent.click(button)
      let qtdTrs = container.querySelectorAll('#tbody tr');
      expect(qtdTrs.length).toBe(3);
      let firstItem = qtdTrs[0];
      let buttonDeleteFirst = firstItem.querySelector('.buttonDelete');
      fireEvent.click(buttonDeleteFirst);
      qtdTrs = container.querySelectorAll('#tbody tr');
      expect(qtdTrs.length).toBe(2);
      let newFirstItem = qtdTrs[0];
      let nomeCampo = newFirstItem.querySelector('.nomeCampo');
      let descCampo = newFirstItem.querySelector('.descCampo');
      let textoNomeCampo = nomeCampo.textContent
      let textoDescCampo = descCampo.textContent
      expect(textoNomeCampo).toBe('One Piece')
      expect(textoDescCampo).toBe('Melhor anime do mundo!')
      
    })
  })
})
