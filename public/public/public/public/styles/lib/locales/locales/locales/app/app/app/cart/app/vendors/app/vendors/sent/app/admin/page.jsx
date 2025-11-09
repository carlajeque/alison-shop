export default function Admin(){
  return (
    <div style={{display:'grid',gap:16}}>
      <h1>⚙️ Admin (Alison Shop)</h1>

      <p>Use o painel da Netlify para ver:</p>

      <ul>
        <li>
          <strong>Forms → Submissions</strong>  
          para ver cadastros de vendedores
        </li>

        <li>
          <strong>Analytics</strong>  
          (se ativado)
        </li>

        <li>
          Este painel é estático.  
          Para relatórios automáticos, será necessário conectar um banco (Supabase).
        </li>
      </ul>
    </div>
  )
}
