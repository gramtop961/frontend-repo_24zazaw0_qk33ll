import { ShoppingCart, Shirt } from 'lucide-react'

function Header({ onCartOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-400/20">
            <Shirt className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-300/70">Clothing</p>
            <h1 className="text-white text-xl font-bold tracking-tight">Vistro</h1>
          </div>
        </div>
        <button onClick={onCartOpen} className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
        </button>
      </div>
    </header>
  )
}

export default Header
