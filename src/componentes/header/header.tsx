import React from 'react'
import '../../styles/Header.css'
// @ts-ignore
import logo from './image/logo.svg'

export default function Header() {
    return (
        <div  className="App-header">
            <img src={logo} title='logo' alt='logo' />
            <h1 className='Header-title'>Meus Contatos</h1>
        </div>
    )
} 