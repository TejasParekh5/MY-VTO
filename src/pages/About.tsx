import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Mail, Github, Linkedin, Users, Zap, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-20 pb-32 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-coral flex items-center justify-center shadow-xl">
              <Eye className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About MY VTO</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing eyewear shopping through cutting-edge virtual try-on technology
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 border-0 shadow-lg animate-slide-up">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that finding the perfect eyewear should be effortless, enjoyable, and accessible to everyone. 
              Our AI-powered virtual try-on technology bridges the gap between online convenience and in-store confidence, 
              helping you discover frames that truly complement your unique style and personality.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Zap,
              title: "Advanced AI",
              description: "State-of-the-art facial recognition and AR technology for realistic virtual try-ons."
            },
            {
              icon: Users,
              title: "User-Centric",
              description: "Designed with accessibility and user experience as our top priorities."
            },
            {
              icon: Heart,
              title: "Quality Focused",
              description: "Curated selection of premium eyewear from trusted brands and designers."
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent/10 to-coral/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Project Information */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Tailwind CSS", "AI/ML", "Computer Vision", "WebRTC"].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Real-time webcam virtual try-on</li>
                <li>• Photo upload functionality</li>
                <li>• AI-powered frame recommendations</li>
                <li>• Responsive design for all devices</li>
                <li>• Social sharing capabilities</li>
                <li>• Personalized user experience</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Future Enhancements</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 3D frame visualization</li>
                <li>• AR integration for mobile devices</li>
                <li>• Machine learning-based style recommendations</li>
                <li>• Virtual optometrist consultations</li>
                <li>• Integration with prescription services</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              We'd love to hear your feedback, suggestions, or answer any questions about the project.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4" />
                Email Us
              </Button>
              <Button variant="outline" size="sm">
                <Github className="w-4 h-4" />
                View Code
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="w-4 h-4" />
                Connect
              </Button>
            </div>
            
            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Built with ❤️ using Lovable • A capstone project showcasing modern web technologies
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;