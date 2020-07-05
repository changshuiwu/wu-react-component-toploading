
import React from 'react'
import { render } from 'react-dom'
import topLoding from 'wu-react-component-toploading' // 引入组件


const start = () => topLoding.start()
const stop = () => topLoding.stop()
const App = () => {
        return (
            <>
            <button onClick={start}>open</button>
            <button onClick={stop}>stop</button>
            </>
    )
   
}

render(<App />, document.getElementById('root'))
