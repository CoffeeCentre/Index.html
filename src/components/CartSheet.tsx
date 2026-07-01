import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { buildShopifyCartUrl } from '@/data/products'
import type { Category } from '@/data/products'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Info } from 'lucide-react'

interface CartSheetProps {
  navigate: (page: 'home' | Category | 'about' | 'contact' | 'members') => void
}

export function CartSheet({ navigate }: CartSheetProps) {
  const { items, open, setOpen, updateQty, remove, total } = useCart()

  const checkoutUrl = buildShopifyCartUrl(items)
  const skippedItems = items.filter((i) => !i.variantId)
  const checkoutTotal = items
    .filter((i) => i.variantId)
    .reduce((sum, i) => sum + (i.salePrice ?? i.price) * i.quantity, 0)
  const shippingCost = checkoutTotal >= 40 ? 0 : 4.95

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="bg-background w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-sans-alt uppercase tracking-[0.18em] text-sm text-foreground">
            Your Basket
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
            <div className="w-16 h-16 rounded-full bg-secondary/60 flex items-center justify-center mb-4">
              <ShoppingBag className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1.5">Your basket is empty</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Add your first coffee or piece of kit to get going. Roasted fresh, shipped fast.
            </p>
            <Button
              onClick={() => setOpen(false)}
              className="mt-6 bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.16em] text-xs px-8"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-border/50 last:border-0">
                  <div className="w-16 h-20 bg-secondary/50 flex items-center justify-center shrink-0">
                    <div className="w-9 h-12 bg-coffee-bean rounded-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <h4 className="text-sm font-semibold leading-tight">{item.name}</h4>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {item.unit && (
                      <p className="text-xs text-muted-foreground mt-0.5">{item.unit}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        {item.salePrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            £{(item.price * item.quantity).toFixed(2)}
                          </span>
                        )}
                        <span className={`text-sm font-semibold ${item.salePrice ? 'text-destructive' : ''}`}>
                          £{((item.salePrice ?? item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="px-6 py-5 border-t border-border bg-card flex-col gap-3 sm:flex-col sm:space-x-0">
              {skippedItems.length > 0 && (
                <div className="flex gap-2 bg-secondary/40 border border-border px-3 py-2.5 text-[11px] leading-relaxed">
                  <Info className="w-3.5 h-3.5 text-copper shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    {skippedItems.length === 1 ? 'One item is' : `${skippedItems.length} items are`} booked
                    separately ({skippedItems.map((i) => i.name).join(', ')}). We'll be
                    in touch to schedule — Shopify checkout only includes shippable goods.
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">£{total.toFixed(2)}</span>
              </div>
              {checkoutUrl && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shippingCost === 0 ? 'Free' : `£${shippingCost.toFixed(2)}`}</span>
                </div>
              )}
              <div className="flex justify-between text-base pt-2 border-t border-border">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">£{(total + (checkoutUrl ? shippingCost : 0)).toFixed(2)}</span>
              </div>
              {checkoutUrl ? (
                <>
                  <Button
                    onClick={() => {
                      window.open(checkoutUrl, '_blank', 'noopener,noreferrer')
                    }}
                    className="w-full bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs py-6 mt-2"
                  >
                    Checkout on Shopify <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center font-sans-alt uppercase tracking-[0.16em] mt-1">
                    Your basket follows you to Shopify · Secure checkout
                  </p>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setOpen(false)
                      navigate('contact')
                    }}
                    className="w-full bg-primary hover:bg-copper text-primary-foreground rounded-none font-sans-alt uppercase tracking-[0.18em] text-xs py-6 mt-2"
                  >
                    Enquire to Book <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center font-sans-alt uppercase tracking-[0.16em] mt-1">
                    These items are booked directly with us
                  </p>
                </>
              )}
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
