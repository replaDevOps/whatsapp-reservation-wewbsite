import { useState } from 'react'
import { Provider } from "react-redux";
import { store } from "./shared";
import { CustomRF } from './CustomRF'
import { ConfigProvider } from 'antd'
import { ApolloProvider } from '@apollo/client/react'
import {client} from "./config"

function App() {
  return (
    <>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </>
  )
}

export default App
