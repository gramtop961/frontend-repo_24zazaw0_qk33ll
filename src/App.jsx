import { useEffect, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [placing, setPlacing] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/products`)
      if (!res.ok) throw new Error('Failed to fetch products')
      const data = await res.json()
      setProducts(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addToCart = (product) => {
    setCartOpen(true)
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id)
      if (found) {
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const checkout = async () => {
    try {
      setPlacing(true)
      const items = cart.map((c) => ({ product_id: c.id, quantity: c.quantity }))
      const subtotal = cart.reduce((s, c) => s + c.price * c.quantity, 0)
      const payload = {
        items,
        subtotal,
        shipping: 0,
        total: subtotal,
        currency: 'USD',
        status: 'pending',
        customer: {
          name: 'Guest',
          email: 'guest@example.com',
          address: '123 Main St',
          city: 'Metropolis',
          country: 'USA',
          postal_code: '00000',
        },
      }
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Checkout failed')
      await res.json()
      setCart([])
      setCartOpen(false)
      alert('Order placed successfully!')
    } catch (e) {
      alert(e.message)
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <Header onCartOpen={() => setCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 pt-10 pb-20">
        <section className="text-center mb-10">
          <p className="text-blue-300/80 uppercase tracking-widest text-xs">Vistro</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-1">Elevate your everyday</h2>
          <p className="text-slate-300 mt-3 max-w-2xl mx-auto">Premium comfort pieces engineered for movement. Shop our latest drops and staples built to last.</p>
        </section>

        {loading ? (
          <p className="text-slate-300">Loading products...</p>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onCheckout={checkout}
        placing={placing}
      />
    </div>
  )
}

export default App
