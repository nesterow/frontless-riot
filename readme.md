[![Build Status](https://travis-ci.org/nesterow/frontless-riot.svg?branch=master)](https://travis-ci.org/nesterow/frontless-riot)
## frontless-riot
Riot.JS build with dependency injection for globals like `document` or `Node`. 
Main purpose is to avoid concurent access to global variables when rendering components on the server side inside async functions or promises.

#### References
Cases when concurrent access happens on backend: 
  1. [Concurrency in Node.JS](https://medium.com/platformer-blog/node-js-concurrency-with-async-await-and-promises-b4c4ae8f4510)
  2. [Async/Await Hell](https://www.freecodecamp.org/news/avoiding-the-async-await-hell-c77a0fb71c4c/)

For frontend guys : [Wait don't touch that](https://medium.engineering/wait-dont-touch-that-a211832adc3a)

## Usage
```bash
  npm i @frontless/riot
```
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
