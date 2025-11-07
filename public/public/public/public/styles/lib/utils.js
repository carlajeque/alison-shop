export async function loadStrings(locale='pt'){
  const res = await fetch('/locales/strings.json');
  const all = await res.json();
  return all[locale] || all['pt'];
}

export async function loadProducts(){
  const res = await fetch('/products.json');
  return await res.json();
}

export const cart = {
  key:'alison_cart_v1',

  get(){
    try{
      return JSON.parse(localStorage.getItem(this.key)||'[]')
    }catch(e){
      return [];
    }
  },

  set(items){
    localStorage.setItem(this.key, JSON.stringify(items));
  },

  add(item){
    const items = this.get();
    const exists = items.find(x=>x.id===item.id);
    if(exists){ exists.qty += 1; }
    else { items.push({...item, qty:1}); }
    this.set(items);
  },

  clear(){
    this.set([]);
  }
}

export function currency(v){
  return (v/100).toLocaleString(undefined,{
    style:'currency',
    currency:'MZN'
  });
}
