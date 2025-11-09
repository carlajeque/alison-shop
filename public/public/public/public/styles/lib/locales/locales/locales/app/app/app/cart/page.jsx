'use client'
import { useEffect, useState } from 'react'
import { cart, currency, loadStrings } from '../../lib/utils'

export default function CartPage(){
  const [items,setItems]=useState([])
  const [t,setT]=useState({})

  useEffect(()=>{
    setItems(cart.get())
    const loc = localStorage.getItem('alison_locale')||'pt'
    loadStrings(loc).then(setT)
  },[])

  const total = items.reduce((s,i)=>s + i.price*i.qty, 0)

  return (
    <div style={{display:'grid',gap:12}}>
      
      <h1>🛒 {t.cart || 'Carrinho'}</h1>

      {items.length===0 ? (
        <div>{t.empty_cart || 'Seu carrinho está vazio.'}</div>
      ) : (
        <div className="grid">
          {items.map((i,idx)=>(
            <div className="card" key={idx}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <strong>{i.name}</strong>
                <span>x{i.qty}</span>
              </div>
              <div className="price">{currency(i.price*i.qty)}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:16}}>
        <div style={{fontWeight:800}}>
          Total: <span className="price">{currency(total)}</span>
        </div>

        <button 
          className="btn" 
          onClick={()=>alert('Pedido recebido! (demonstração)')}
        >
          {t.checkout || 'Finalizar compra'}
        </button>
      </div>

    </div>
  )
}
