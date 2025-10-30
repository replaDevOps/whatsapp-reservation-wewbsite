import { useState } from 'react'
import { Provider } from "react-redux";
import { store } from "./shared";
import { CustomRF } from './CustomRF'
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
function App() {
  return (
    <>
      <Provider store={store}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#07938F',
                colorError: '#BC302F',
              },
              components:{
                Timeline: {
                  dotBg: 'transparent',
                },
              }
            }}
          >
            <CustomRF />
          </ConfigProvider>
      </Provider>
    </>
  )
}

export default App
