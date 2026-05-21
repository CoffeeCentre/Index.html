import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '@/data/products'

export interface CartItem extends Product {
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  add: (product: Product) => void
  remove: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  total: number
  count: number
  open: boolean
  setOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)

  const add = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setOpen(true)
  }

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id))

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return remove(id)
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)))
  }

  const clear = () => setItems([])

  const total = items.reduce(
    (sum, i) => sum + (i.salePrice ?? i.price) * i.quantity,
    0,
  )
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, add, remove, updateQty, clear, total, count, open, setOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
