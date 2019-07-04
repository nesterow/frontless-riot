## frontless-riot
Riot.JS with dependency injection for globals like `document` or `Node`. 
Main purpose is to avoid using globals when rendering components on the server side.

## Usage
```javascript
import * as riot from '@frontless/riot'
import {JSDOM} from 'jsdom'
import MyTag from 'mytag.riot'

riot.register('mytag', MyTag)

async render(){
  const {document, Node} = new JSDOM().window;
  const root1 = document.createElement('div')
  document.body.appendChild(root1)
  const result = riot.di({document, Node}).mount(root1, {}, 'random')
}


```