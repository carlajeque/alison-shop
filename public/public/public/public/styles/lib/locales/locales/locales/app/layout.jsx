import './globals.css'
import { useEffect, useState } from 'react'

export const metadata = {
  title: 'Alison Shop – Tudo que você precisa em um só lugar',
  description: 'Tudo que você precisa em um só lugar.'
}

export default function RootLayout({ children }){
  return (
    <html lang="pt">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#d4af37" />
      </head>
      <body>
        <Header/>
        <main className="wrap" style={{paddingTop:16}}>{children}</main>
        <Footer/>
        <WhatsAppButton/>
        <MusicToggle/>
        <ChatWidget/>
        <ServiceWorkerRegister/>
      </body>
    </html>
  )
}

function Header(){
  return (
    <header className="header">
      <div className="wrap nav">
        <a className="brand" href="/">
          <img src="/logo.svg" alt="Alison Shop"/>
          <div>
            <div>Alison Shop</div>
            <div className="badge">Tudo que você precisa em um só lugar.</div>
          </div>
        </a>

        <a className="btn ghost" href="/cart">🛒 Carrinho</a>
        <a className="btn ghost" href="/vendors">🧩 Vendedores</a>
        <a className="btn ghost" href="/admin">⚙️ Admin</a>
        
        <LanguageSwitcher/>
      </div>
    </header>
  )
}

function LanguageSwitcher(){
  const [locale, setLocale] = useState('pt');

  useEffect(()=>{
    const saved = localStorage.getItem('alison_locale') || 'pt';
    setLocale(saved);
    document.documentElement.lang = saved;
  },[]);

  function change(e){
    const val = e.target.value;
    setLocale(val);
    localStorage.setItem('alison_locale', val);
    document.documentElement.lang = val;
    location.reload();
  }

  return (
    <select className="lang" value={locale} onChange={change}>
      <option value="pt">Português</option>
      <option value="en">English</option>
      <option value="zh">中文</option>
      <option value="fr">Français</option>
    </select>
  )
}

function Footer(){
  return (
    <footer className="footer">
      <div className="wrap" style={{display:'flex',justifyContent:'space-between',padding:'18px 0'}}>
        <div>© {new Date().getFullYear()} Alison Shop</div>
        <div style={{opacity:.8}}>Design preto + dourado · Fundo abstrato · PWA</div>
      </div>
    </footer>
  )
}

function WhatsAppButton(){
  const number = '+258829300939';
  const url = `https://wa.me/${number.replace(/\\D/g,'')}?text=${encodeURIComponent('Olá 👋, vi um produto na Alison Shop e gostaria de saber mais detalhes.')}`;
  
  return (
    <a className="float-wa" href={url} target="_blank">
      💬 WhatsApp
    </a>
  )
}

function MusicToggle(){
  const [on,setOn]=useState(false);

  useEffect(()=>{
    const saved = localStorage.getItem('alison_music')==='1';
    setOn(saved);
  },[]);

  useEffect(()=>{
    const audio = document.getElementById('bg-music');
    if(!audio) return;

    if(on){ audio.play().catch(()=>{}); }
    else { audio.pause(); }

    localStorage.setItem('alison_music', on?'1':'0');
  },[on]);

  return (
    <div className="music">
      <audio id="bg-music" loop src="https://cdn.pixabay.com/download/audio/2022/10/24/audio_2e0f54a9fe.mp3?filename=chill-ambient-124008.mp3"></audio>
      <button className="btn" onClick={()=>setOn(v=>!v)}>
        {on ? '⏸ Pausar música' : '▶️ Música lounge'}
      </button>
    </div>
  )
}

function ChatWidget(){
  const [open,setOpen]=useState(false);
  const [messages,setMessages]=useState([]);
  const [text,setText]=useState('');

  useEffect(()=>{
    try{
      const m = JSON.parse(localStorage.getItem('alison_chat')||'[]');
      setMessages(m);
    }catch(e){}
  },[]);

  function send(){
    if(!text.trim()) return;

    const m = [...messages, {from:'me', text, ts:Date.now()}];
    setMessages(m);
    localStorage.setItem('alison_chat', JSON.stringify(m));
    setText('');

    if(Notification.permission==='granted'){
      new Notification('Nova mensagem enviada');
    }
  }

  return (
    <>
      <button className="btn" style={{position:'fixed',right:16,bottom:120,zIndex:60}} onClick={()=>setOpen(o=>!o)}>
        {open ? 'Fechar chat' : '💬 Chat'}
      </button>

      {open && (
        <div className="chat">
          <div className="chat-header">Chat interno</div>

          <div className="chat-body">
            {messages.map((m,i)=>(
              <div key={i} style={{
                alignSelf: m.from==='me' ? 'flex-end' : 'flex-start',
                background:'#1a1a1a',
                padding:'8px 10px',
                borderRadius:12,
                maxWidth:'80%'
              }}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input value={text} onChange={e=>setText(e.target.value)} placeholder="Escreva sua mensagem..." />
            <button onClick={send}>Enviar</button>
          </div>
        </div>
      )}
    </>
  )
}

function ServiceWorkerRegister(){
  useEffect(()=>{
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('/sw.js');
    }
    if(Notification.permission==='default'){
      Notification.requestPermission();
    }
  },[]);

  return null;
          }
