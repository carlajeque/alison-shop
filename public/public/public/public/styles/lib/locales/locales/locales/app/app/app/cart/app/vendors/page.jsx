'use client'
import { useEffect, useState } from 'react'
import { loadStrings } from '../../lib/utils'

export default function VendorsPage(){
  const [t,setT]=useState({})

  useEffect(()=>{
    const loc = localStorage.getItem('alison_locale')||'pt'
    loadStrings(loc).then(setT)
  },[])

  return (
    <div style={{maxWidth:640, margin:'0 auto'}}>
      <h1>🧩 {t.vendor_signup || 'Cadastro de Vendedor'}</h1>

      <p style={{opacity:.8}}>
        Crie sua mini-loja dentro da Alison Shop.  
        Preencha o formulário e aguarde aprovação.
      </p>

      <form 
        name="vendor-signup" 
        method="POST" 
        data-netlify="true" 
        action="/vendors/sent"
      >
        <input type="hidden" name="form-name" value="vendor-signup"/>

        <div style={{display:'grid',gap:10}}>
          <input 
            className="search" 
            name="store" 
            placeholder={t.vendor_name || 'Nome da loja'} 
            required
          />

          <input 
            className="search" 
            name="email" 
            type="email" 
            placeholder={t.email || 'E-mail'} 
            required
          />

          <input 
            className="search" 
            name="phone" 
            placeholder={t.phone || 'Telefone'} 
            required
          />

          <button className="btn" type="submit">
            {t.submit || 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  )
}
