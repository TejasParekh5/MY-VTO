import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Share2, Trash2, ShoppingBag, Clock, ArrowUpRight, Sparkles } from "lucide-react";
import { useFrames } from "@/context/FramesContext";
import { hasRealAsset } from '@/utils/loadRealFrameAssets';
import glasses1 from "@/assets/glasses-1.jpg";
import glasses2 from "@/assets/glasses-2.jpg";
import glasses3 from "@/assets/glasses-3.jpg";

const MyCloset = () => {
  const { frames, wishlist, closet, removeFromCloset, toggleWishlist } = useFrames();
  const savedFrames = frames.filter(f => closet[f.id]);

  const recentActivity = [
    { action: "Tried on Classic Rectangle", time: "2 hours ago" },
    { action: "Added Vintage Round to favorites", time: "1 day ago" },
    { action: "Shared Coral Cat-Eye", time: "3 days ago" }
  ];

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Closet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your saved frames, favorites, and virtual try-on history all in one place.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">{savedFrames.length}</div>
                  <p className="text-muted-foreground">Saved Frames</p>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">7</div>
                  <p className="text-muted-foreground">Virtual Try-Ons</p>
                </CardContent>
              </Card>
              <Card className="text-center border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">2</div>
                  <p className="text-muted-foreground">Shared Photos</p>
                </CardContent>
              </Card>
            </div>

            {/* Saved Frames */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Saved Frames</h2>
                <Button variant="outline" size="sm">
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedFrames.map((frame: any, index) => (
                  <Card 
                    key={frame.id}
                    className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-square">
                        <img 
                          src={frame.imageUrl} 
                          alt={frame.name} 
                          className="w-full h-full object-contain p-4 bg-white" 
                          loading="lazy"
                          onError={(e)=>{
                            const el = e.currentTarget as HTMLImageElement;
                            if (el.dataset.fallback === 'final') return;
                            if (!el.dataset.triedPng && /\.svg$/i.test(frame.imageUrl)) {
                              el.dataset.triedPng = '1';
                              el.src = frame.imageUrl.replace(/\.svg$/i, '.png');
                              return;
                            }
                            console.warn('Closet image missing', frame.id, frame.imageUrl, 'using placeholder');
                            el.src = '/placeholder.svg';
                            el.dataset.fallback='final';
                          }}
                        />
                        <Badge className="absolute top-3 left-3 bg-accent/90 text-white flex items-center gap-1">
                          Saved <ArrowUpRight className="w-3 h-3" />
                        </Badge>
                        {hasRealAsset(frame) && (
                          <Badge className="absolute top-3 left-20 bg-emerald-600 text-white">Real</Badge>
                        )}
                        {wishlist.has(frame.id) && <Badge className="absolute top-3 right-3 bg-pink-600 text-white flex items-center gap-1">Wish <Sparkles className="w-3 h-3" /></Badge>}
                        
                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="secondary" className="w-7 h-7" onClick={()=>toggleWishlist(frame.id)}>
                            <Heart className="w-3 h-3" />
                          </Button>
                          <Button size="icon" variant="secondary" className="w-7 h-7" onClick={()=>removeFromCloset(frame.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{frame.name}</h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <span>${frame.price}</span>
                          <span>{new Date(closet[frame.id].savedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="coral" size="sm" className="flex-1">
                            <Eye className="w-3 h-3" />
                            Try On
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <ShoppingBag className="w-3 h-3" />
                            Buy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {savedFrames.length === 0 && (
                <div className="text-center py-16">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No saved frames yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start browsing and save your favorite frames to see them here
                  </p>
                  <Button variant="coral">
                    Browse Frames
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="border-b border-border last:border-0 pb-3 last:pb-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your saved frames and try-on history
                </p>
                <div className="space-y-3">
                  <div className="p-3 border border-border rounded-lg">
                    <div className="w-full h-20 bg-muted rounded mb-2" />
                    <p className="text-sm font-medium">Similar to Classic Rectangle</p>
                    <p className="text-xs text-muted-foreground">$159 • Rectangle</p>
                  </div>
                  <div className="p-3 border border-border rounded-lg">
                    <div className="w-full h-20 bg-muted rounded mb-2" />
                    <p className="text-sm font-medium">Trending Now</p>
                    <p className="text-xs text-muted-foreground">$189 • Cat-Eye</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View All Recommendations
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCloset;