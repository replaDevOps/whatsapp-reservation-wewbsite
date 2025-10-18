import { useState } from 'react'
import { Provider } from "react-redux";
import { store } from "./shared";
import { CustomRF } from './CustomRF'
function App() {
  return (
    <>
      <Provider store={store}>
        <CustomRF />
      </Provider>
    </>
  )
}

export default App
