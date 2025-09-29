import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, Camera, Sparkles, Zap } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 bg-gradient-to-br from-background via-background to-muted overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(40deg,transparent_25%,hsl(var(--primary))_50%,transparent_75%)] opacity-5" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent to-coral flex items-center justify-center shadow-2xl">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-accent/20 to-coral/20 blur-xl animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
                Try On Glasses
              </span>
              <br />
              <span className="text-foreground">Virtually</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of eyewear shopping with our AI-powered virtual try-on technology. 
              Find your perfect frames from the comfort of your home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="lg" asChild className="px-12 py-4 text-lg">
                <Link to="/try-on">
                  <Camera className="w-5 h-5" />
                  Start Virtual Try-On
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="px-8 py-4 text-lg">
                <Link to="/browse">
                  Browse Styles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-6">Why Choose MY VTO?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our cutting-edge technology makes finding your perfect eyewear effortless and accurate.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "AI-Powered Detection",
                description: "Advanced facial recognition technology ensures perfect frame positioning and realistic try-on experience."
              },
              {
                icon: Zap,
                title: "Real-Time Results",
                description: "Instant virtual try-on with live camera feed or uploaded photos. See how you look immediately."
              },
              {
                icon: Sparkles,
                title: "Personalized Recommendations",
                description: "Get frame suggestions based on your face shape, style preferences, and lifestyle needs."
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent/10 to-coral/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary to-primary-light text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Frames?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their ideal eyewear with our virtual try-on technology.
          </p>
          <Button variant="secondary" size="lg" asChild className="px-12 py-4 text-lg">
            <Link to="/try-on">
              <Eye className="w-5 h-5" />
              Try On Glasses Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;