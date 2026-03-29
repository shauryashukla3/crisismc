import { StoreProduct } from "@workspace/api-client-react";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";

interface ProductCardProps {
  product: StoreProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  // Map API colors to tailwind classes if needed, or use inline styles for dynamic colors
  const borderColorStyle = product.color ? { borderColor: product.color } : {};
  const shadowColorStyle = product.color ? { boxShadow: `0 0 20px ${product.color}20` } : {};
  
  return (
    <div 
      className={cn(
        "group relative flex flex-col bg-card rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1",
        product.featured ? "border-primary shadow-[0_0_30px_rgba(22,163,74,0.15)] scale-[1.02]" : "hover:border-white/20"
      )}
      style={product.featured && product.color ? { ...borderColorStyle, ...shadowColorStyle } : {}}
    >
      {/* Featured Ribbon */}
      {product.featured && (
        <div className="absolute top-0 right-0">
          <div className="w-32 h-8 absolute top-4 -right-8 bg-primary text-primary-foreground text-xs font-bold font-display tracking-widest uppercase flex items-center justify-center rotate-45 shadow-lg">
            Best Value
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-6 pb-0">
        <Badge variant={product.featured ? "default" : "outline"} className="mb-4">
          {product.category}
        </Badge>
        <h3 
          className="text-3xl font-black font-display tracking-tight text-white mb-2"
          style={product.color ? { color: product.color, textShadow: `0 0 10px ${product.color}40` } : {}}
        >
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm h-10 line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Price */}
      <div className="p-6 flex items-baseline">
        <span className="text-4xl font-black font-display text-white">
          {formatCurrency(product.price)}
        </span>
        <span className="text-muted-foreground ml-2">/ lifetime</span>
      </div>

      {/* Perks */}
      <div className="px-6 flex-1">
        <div className="w-full h-px bg-white/5 mb-6" />
        <ul className="space-y-3 mb-6">
          {product.perks.map((perk, i) => (
            <li key={i} className="flex items-start text-sm text-gray-300">
              <Check className="w-5 h-5 text-primary shrink-0 mr-3 mt-0.5" />
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action */}
      <div className="p-6 pt-0 mt-auto">
        <Button 
          className="w-full" 
          variant={product.featured ? "default" : "secondary"}
          onClick={() => {
            // In a real app, this would add to cart or open checkout
            alert(`Added ${product.name} to cart!`);
          }}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Purchase Rank
        </Button>
      </div>
    </div>
  );
}
