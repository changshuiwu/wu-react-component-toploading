/** @jsx jsx */
import React from 'react'
import ReactDOM from 'react-dom'
import {jsx, css, keyframes } from '@emotion/core'

let spinRotate = keyframes`
    100% {
        transform: rotate(405deg);
    }
`
let topLoadingWrapper = css`
    position: fixed;
    top: 0;
    left: 0;
`
let topLoadingProgress = css`
    width: 100vw;
    height: 2px;
    & > div {
        width:50vw;
        height: 100%;
        background-color: #1890ff;
    }
`
let topLoadingIncon = css`
    position: absolute;
    right: 20px;
    top: 20px;
`
let topLoadingSpin = css`
    display: inline-block;
    width: 1em;
    height: 1em;
    font-size: 20px;
    transform: rotate(45deg);
    animation: ${spinRotate} 1.2s infinite linear;
`
let topLoadingSpinItem = css`
    position: absolute;
    display: block;
    width: 9px;
    height: 9px;
    background-color: #1890ff;
    border-radius: 100%;
    transform: scale(0.75);
    &:nth-of-type(1) {
        top: 0;
        left: 0;
    }
    &:nth-of-type(2){
        top: 0;
        right: 0; 
    }
    &:nth-of-type(3){
        bottom: 0;
        right: 0;
    }
    &:nth-of-type(4){
        bottom: 0;
        left: 0;
    }
`
class TopLoading extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isShowLoading: false,
            width: 0
        }
    }
    start = () => {
        this.startUpdateProgress()
    }
    stop = () => {
        this.stopUpdateProgress()
    }
    stopUpdateProgress = () => {
        cancelAnimationFrame(this.id || 0)
        let restWidth = document.body.clientWidth - this.state.width
        let currentWidth = this.state.width

        //剩余的长度1s执行完
        let updateProgressWidth = () => {
            
                this.setState((preState) => {
                    return {
                        width: preState.width + (restWidth * 60 / 1000)
                    }
                })    

            
            if (currentWidth < document.body.clientWidth) {
                　this.id = requestAnimationFrame(updateProgressWidth)
            }
            if (this.state.width >= document.body.clientWidth) {
               this.timer = setTimeout (() => {
                this.setState({
                    isShowLoading: false,
                    width: 0
                })
               }, 200) 
            }
        }
        updateProgressWidth()      
    }
   
    componentWillUnmount () {
        clearTimeout(this.timer)
    }
    startUpdateProgress = () => {
        cancelAnimationFrame(this.id || 0)
        this.setState({
            isShowLoading: true,
            width: 0
        })
        let clientWidth = document.body.clientWidth
        let progressWidth = clientWidth * 0.9
        // 60ms执行一次，2s中走完屏幕宽的十分之九
        // progressWidth / (3000 / 60 )
        let updateProgressWidth = () => {
            this.setState((preState) => {
                return {
                    width: preState.width + (progressWidth * 60 / 14000)
                }
            })

            if (this.state.width <　progressWidth) {
                　this.id = requestAnimationFrame(updateProgressWidth)
            }
        }
        updateProgressWidth()
    }
    render () {
        return (
            <div>
               {
                   this.state.isShowLoading && (
                    <div css={topLoadingWrapper}>
                        <div css={topLoadingProgress}>
                            <div style={{width: `${this.state.width}px`}}></div>
                        </div>
                        <div css={topLoadingIncon}>
                            <span css={topLoadingSpin}>
                                <i css={topLoadingSpinItem}></i>
                                <i css={topLoadingSpinItem}></i>
                                <i css={topLoadingSpinItem}></i>
                                <i css={topLoadingSpinItem}></i>
                            </span>
                        </div>
                    </div>
                   )
               }
            </div>
        )
    }
}
export default TopLoading