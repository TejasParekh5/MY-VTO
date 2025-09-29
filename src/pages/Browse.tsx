import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Eye, Heart, ShoppingBag, SortAsc, X, Sparkles } from "lucide-react";
import { useFrames } from "@/context/FramesContext";
import { hasRealAsset } from '@/utils/loadRealFrameAssets';

const Browse = () => {
  const { frames, wishlist, toggleWishlist, addToCloset, loadingAssets } = useFrames();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'price-asc'|'price-desc'|'name'|'popular'>('popular');
  const [openFrame, setOpenFrame] = useState<any | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: "all", label: "All Frames" },
    ...Array.from(new Set(frames.map(f=>f.style))).map(style => ({ id: style, label: style.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) }))
  ];

  const filteredFrames = useMemo(() => {
    const base = frames.filter(frame => {
      const matchesFilter = selectedFilter === 'all' || frame.style === selectedFilter;
      const matchesSearch = frame.name.toLowerCase().includes(searchQuery.toLowerCase()) || frame.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    const sorted = [...base];
    switch (sortBy) {
      case 'price-asc': sorted.sort((a,b)=>a.price-b.price); break;
      case 'price-desc': sorted.sort((a,b)=>b.price-a.price); break;
      case 'name': sorted.sort((a,b)=>a.name.localeCompare(b.name)); break;
      case 'popular': default: sorted.sort((a,b)=> (b.price - a.price));
    }
    return sorted;
  }, [frames, selectedFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Styles</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of premium eyewear designed for every style and occasion.
          </p>
          {loadingAssets && <p className="text-sm text-muted-foreground mt-2 animate-pulse">Loading high‑res product images…</p>}
          {!loadingAssets && frames.some(f=>f.assets) && <p className="text-xs text-accent mt-2">Real product imagery loaded.</p>}
        </div>

        {/* Search and Filters */}
        <div className="mb-12 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search for frames..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="md:w-auto" onClick={()=>setShowFilters(s=>!s)}>
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Advanced Filters'}
            </Button>
            <Button variant="outline" className="md:w-auto" onClick={()=> setSortBy(sortBy==='price-asc'?'price-desc': sortBy==='price-desc'?'name': sortBy==='name'?'popular':'price-asc')}>
              <SortAsc className="w-4 h-4" /> Sort: {sortBy}
            </Button>
          </div>
          {showFilters && (
            <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-muted/30">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="rounded-full capitalize"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredFrames.length} frame{filteredFrames.length !== 1 ? 's' : ''}
            {selectedFilter !== "all" && ` in ${filters.find(f => f.id === selectedFilter)?.label}`}
          </p>
        </div>

        {/* Frames Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {filteredFrames.map((frame: any, index) => (
            <Card 
              key={frame.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={frame.imageUrl}
                    alt={frame.name}
                    className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-500 p-4"
                    loading="lazy"
                    onError={(e)=>{
                      const el = e.currentTarget as HTMLImageElement;
                      if (el.dataset.fallback === 'final') return; // already used placeholder
                      // First attempt: if svg failed, try png variant
                      if (!el.dataset.triedPng && /\.svg$/i.test(frame.imageUrl)) {
                        el.dataset.triedPng = '1';
                        el.src = frame.imageUrl.replace(/\.svg$/i, '.png');
                        return;
                      }
                      // Second (final) fallback: placeholder
                      console.warn('Image missing for frame id', frame.id, '->', frame.imageUrl, 'using placeholder');
                      el.src = '/placeholder.svg';
                      el.dataset.fallback = 'final';
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  
                  {/* Popular Badge */}
                  {(index < 4) && (
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                      New
                    </Badge>
                  )}
                  {hasRealAsset(frame) && (
                    <Badge className="absolute top-3 left-16 bg-emerald-600 text-white">
                      Real
                    </Badge>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant={wishlist.has(frame.id) ? 'default':'secondary'} className="w-8 h-8" onClick={()=>toggleWishlist(frame.id)}>
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="w-8 h-8" onClick={()=>setOpenFrame(frame)}>
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Try On Button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button variant="coral" className="w-full" onClick={()=>{ addToCloset(frame.id); setOpenFrame(frame); }}>
                      <Eye className="w-4 h-4" /> Try / Details
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                    {frame.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 capitalize flex items-center gap-1">
                    {frame.brand} • {frame.style}
                    {wishlist.has(frame.id) && <Sparkles className="w-3 h-3 text-accent" />}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl">${frame.price}</span>
                    <Button variant="ghost" size="sm" onClick={()=>setOpenFrame(frame)}>View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredFrames.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No frames found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setSelectedFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredFrames.length > 0 && (
          <div className="text-center space-y-4">
            <Button variant="outline" size="lg" onClick={()=>setSortBy('popular')}>Reset Sorting</Button>
            <p className="text-xs text-muted-foreground">Showing {filteredFrames.length} results • Sort mode: {sortBy}</p>
          </div>
        )}

        <Dialog open={!!openFrame} onOpenChange={()=>setOpenFrame(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{openFrame?.name}</span>
                <Button size="icon" variant="ghost" onClick={()=>setOpenFrame(null)}><X className="w-4 h-4" /></Button>
              </DialogTitle>
            </DialogHeader>
            {openFrame && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
                  <img src={openFrame.imageUrl} alt={openFrame.name} className="max-h-72 object-contain" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Brand</p>
                    <p className="font-medium">{openFrame.brand}</p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Style</p>
                      <p className="font-medium capitalize">{openFrame.style}</p>
                    </div>
                    {openFrame.lensColor && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Lens</p>
                        <p className="font-medium">{openFrame.lensColor}</p>
                      </div>
                    )}
                  </div>
                  <div className="text-3xl font-bold">${openFrame.price}</div>
                  <div className="flex gap-3">
                    <Button className="flex-1" onClick={()=>toggleWishlist(openFrame.id)}>
                      <Heart className="w-4 h-4 mr-2" /> {wishlist.has(openFrame.id)?'Wishlisted':'Add to Wishlist'}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={()=>{ addToCloset(openFrame.id); }}>
                      <ShoppingBag className="w-4 h-4 mr-2" /> Add to Closet
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">ID: {openFrame.id}</div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Browse;