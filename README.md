To install npm dependencies run
```js
 $ npm install
```
In the project directory, you can run:
```js
 $ npm start
```

```js
Arayüzü görmek için aşağıdaki komutlar ile node js projesi dışında react projesi kuruyoruz adımları aşağıda sırasıyla mevcuttur. Projede console a istek atılıp console dan dönen mesajları ekranda gösteriyoruz.

localhost:3001 ile listen edebilirsiniz değiştirmek isterseniz index.js üzerinden değişiklikleri yapabilirsiniz.
```

```js
$ create-react-app ssh-terminal-app
$ cd ssh-terminal-app
$ npm install --save websocket
```

```javascript
import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import './index.css';

const ws = new W3CWebSocket("ws://localhost:3001", 'exho-protocol');

const App = () => {
  const[command, setCommand] = useState('');
  const [commandList, setCommandList] = useState([]);

  useEffect(() => {
    ws.onmessage = msg => {
      console.log(msg)
      setCommandList(currentState => {
        const parsedData = JSON.parse(msg.data); // msg.data'yı analiz edip sonucu bir değişkene atıyoruz
        return [...currentState, parsedData]; // parsedData sonucunu kullanıyoruz
      });
      
    };
  }, []);

  const onSend = () => {
    let data = { method: 'command', command: command };
    ws.send(JSON.stringify(data));
    setCommand('')
  }

  return (
    <div className='App'>
      <div className="terminal">
        {commandList.map((list, i) => {
          return <div id="history" style={{ textAlign: "Left" }} key={i}>{list.data}</div>
        })}
        <div className="line">
          <span className='path' id="path">&nbsp; > &nbsp;</span>
          <input type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter your command"
            onKeyPress={event => {
              if (event.key === "Enter") {
                onSend()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App;
```
ìndex.css

```css
body {
  background-color: black;
}

.terminal {
  background-color: black;
  color: white;
  font: courier;
  padding: 10px;
  overflow: hidden;
}

.line {
  display: table;
  width: 100%;
}

.path {
  position: absolute;
  z-index: 1;
}

.terminal input {
  position: relative;
  left: 30px;
  display: table-cell;
  width: 100%;
  border: none;
  background: black;
  color: white;
  outline: none;
}
```