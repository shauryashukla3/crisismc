import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useGetStoreProducts } from "@workspace/api-client-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export default function Store() {
  const { data: products, isLoading, isError } = useGetStoreProducts();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(products?.map(p => p.category) || []))];

  // Filter products
  const filteredProducts = products?.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Store Header */}
      <div className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/store-bg.png`}
            alt="Store background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-black font-display text-white mb-4 tracking-tighter text-glow">
              SERVER <span className="text-primary">STORE</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Support the server and get amazing perks in return. All purchases are processed securely and applied instantly in-game.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-10 w-24 rounded-full" />)
            ) : (
              categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-display tracking-widest uppercase font-bold transition-all duration-200 ${
                    activeCategory === cat 
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(22,163,74,0.3)]" 
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))
            )}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 bg-card border-white/10 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl h-[500px] border border-white/5 p-6 flex flex-col">
                <Skeleton className="h-6 w-20 mb-4" />
                <Skeleton className="h-10 w-48 mb-4" />
                <Skeleton className="h-16 w-full mb-8" />
                <Skeleton className="h-12 w-32 mb-8" />
                <div className="space-y-3 mt-auto">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
                <Skeleton className="h-12 w-full mt-8" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-card/50 rounded-2xl border border-white/5">
            <p className="text-destructive font-bold text-lg mb-2">Failed to load store products.</p>
            <p className="text-muted-foreground">Please try refreshing the page or check back later.</p>
          </div>
        ) : filteredProducts?.length === 0 ? (
          <div className="text-center py-20 bg-card/50 rounded-2xl border border-white/5">
            <p className="text-white font-bold text-xl mb-2">No products found</p>
            <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts?.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
