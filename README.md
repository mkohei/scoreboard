# scoreboard
## release

dev2

## 構成

webページ
- index.html
  - css/main.css
  - .../jquery.min.js
  - .../jquery.mixitup.min.js
  - js/react.mi.js
  - js/react-dom.min.js
  - js/browser.js
  - js/main.jsx
- edit.html
  - css/edit.css
  - js/jquery-3.3.1.min.js
  - js/react.min.js
  - js/react-dom.min.js
  - js/browser.js
  - js/edit.3.jdx

server(only json)
- score.jsonをどこかに置く
- json-server & ngrok

```
$ json-server score.json
$ ngrok http 3000
```
