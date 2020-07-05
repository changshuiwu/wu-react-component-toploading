import React from 'react'
import ReactDOM from 'react-dom'
import TopLoading from './components/TopLoading.js'


class TopLoadingClass {
    constructor () {
        this.myRef = {current: null}
        const div = document.createElement('div')
        div.className = 'wwww'
        document.body.append(div)
        ReactDOM.render(<TopLoading ref={e => this.myRef = e} />, div)
    }
}


TopLoadingClass.getInstance = (function() {
    let instance = null;
    return function () {
        if (!instance) {
            instance = new TopLoadingClass()
        }
        return instance
    }
})()

export default (TopLoadingClass.getInstance()).myRef