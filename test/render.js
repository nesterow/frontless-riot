import {JSDOM} from 'jsdom'
import * as riot from '..'
import ssr from '@riotjs/ssr/register'
import {expect, use} from 'chai'
import sinonChai from 'sinon-chai'

describe('test riot with DI', function () {
  
  before(() => {
    use(sinonChai)
    ssr()
  })

  it('renders components with different document contexts', () => {
    const Random = require('./components/random.riot').default
    const Noop = require('./components/noop.riot').default
    riot.register('random', Random)
    riot.register('noop', Noop)

    // First context
    const ctx1 = new JSDOM().window;
    const root1 = ctx1.document.createElement('div')
    ctx1.document.body.appendChild(root1)
    riot.di(ctx1).mount(root1, {}, 'random')
    
    

    // Second context
    const ctx2 = new JSDOM().window;
    const root2 = ctx2.document.createElement('div')
    ctx2.document.body.appendChild(root2)
    riot.di(ctx2).mount(root2, {}, 'random')

    expect(ctx1.document.body.innerHTML).to.be.not.equal(ctx2.document.body.innerHTML)

  })

})