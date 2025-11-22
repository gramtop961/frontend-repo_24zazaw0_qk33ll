function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-colors">
      <div className="aspect-[4/3] overflow-hidden bg-slate-900">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold truncate">{product.title}</h3>
        <p className="text-blue-300/80 text-sm truncate">{product.category}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-blue-400 font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="text-sm px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
