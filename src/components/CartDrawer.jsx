import { X } from 'lucide-react'

function CartDrawer({ open, items, onClose, onCheckout }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)

  return (
    <div className={`fixed inset-0 z-40 transition ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-slate-900 border-l border-slate-800 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-white font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X /></button>
        </div>
        <div className="p-4 space-y-3 max-h-[calc(100%-170px)] overflow-auto">
          {items.length === 0 ? (
            <p className="text-slate-300/80">Your cart is empty.</p>
          ) : (
            items.map((it, idx) => (
              <div key={idx} className="flex gap-3 items-center bg-slate-800/40 border border-slate-700 rounded-lg p-3">
                <img src={it.images?.[0]} alt={it.title} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-white font-medium">{it.title}</p>
                  <p className="text-slate-400 text-sm">Qty: {it.quantity}</p>
                </div>
                <p className="text-white font-semibold">${(it.price * it.quantity).toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-300">Subtotal</span>
            <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 text-white font-semibold py-2 rounded-lg"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
