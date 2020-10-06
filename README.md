# test

`test`

**test**

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  const [productList, setProductList] = useState([]) 

  const api = '192.168.223.2:82/api/Inv/Products/Products_List'

  useEffect(() => {
    const source = axios.CancelToken.source()
    const config = {
      headers: {
        Authorization: `bearer 12312324asdadnlklas`
      }
    }
    const loadProducts = async () => {
      try {
        const response = await axios.get(api, config, {
          cancelToken: source.token
        })
        setProductList(response.data.lists)
      } catch (err) {
        console.log('err', err)
      }
    }

    loadProducts()

    return () => source.cancel()
  }, [count])

  console.log('product', productList)

  return (
    <div className="App">
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>increase</button>
    </div>
  );
}

export default App;

```
