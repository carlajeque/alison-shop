'use client'
import { useEffect, useState } from 'react'
import { loadStrings, loadProducts, cart, currency } from '../lib/utils'

export default function Page(){
  const [t,setT]=useState({})
  const [items,setItems]=useState([])
  const [q,setQ]=useState('')
  const [locale,setLocale]=useState('pt')

  useEffect(()=>{
    const loc = localStorage.getItem('alison_locale')||'pt'
    setLocale(loc)

    loadStrings(loc).then(setT)
    loadProducts().then(setItems)
  },[])

  const filtered = items.filter(p => {
    const name = p.name[locale] || p.name['pt']
    return name.toLowerCase().includes(q.toLowerCase())
  })

  function add(p){
    const name = p.name[locale] || p.name['pt']
    cart.add({id:p.id, name, price:p.price, img:p.img})
    alert('Adicionado ao carrinho!')
  }

  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      
      <input 
        className="search" 
        placeholder={t.search||'Buscar produtos'} 
        value={q} 
        onChange={e=>setQ(e.target.value)} 
      />

      <div className="grid">
        {filtered.map(p=>{
          const name = p.name[locale] || p.name['pt']

          return (
            <div className="card" key={p.id}>
              <img 
                src={p.img} 
                alt={name} 
                style={{
                  width:'100%',
                  aspectRatio:'1/1',
                  objectFit:'cover',
                  borderRadius:12,
                  background:'#111'
                }}
              />

              <div style={{fontWeight:800}}>{name}</div>
              <div className="price">{currency(p.price)}</div>

              <button className="btn" onClick={()=>add(p)}>
                {t.add_to_cart || 'Adicionar ao carrinho'}
              </button>
            </div>
          )
        })}
      </div>

    </div>
  )
    }
