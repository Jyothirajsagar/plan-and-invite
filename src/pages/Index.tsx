import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, Share2, Heart, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.png";

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Beautiful Templates",
      description: "Professional designs for every occasion"
    },
    {
      icon: Calendar,
      title: "Quick Creation", 
      description: "Create invitations in minutes"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share with unique links instantly"
    },
    {
      icon: Heart,
      title: "Personal Touch",
      description: "Customize every detail perfectly"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      event: "Wedding",
      text: "EventCraft Pro made our wedding invitations absolutely stunning!",
      rating: 5
    },
    {
      name: "Michael Chen", 
      event: "Corporate Event",
      text: "Professional and easy to use. Our clients were impressed!",
      rating: 5
    },
    {
      name: "Emma Davis",
      event: "Birthday Party",
      text: "Created beautiful invitations in under 10 minutes. Amazing!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
                ✨ All-in-One Event Planning
              </Badge>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                Create Stunning Event 
                <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Invitations
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                EventCraft Pro makes it easy to beautiful for weddings, birthdays, corporate events, and more. 
                No design experience required!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/templates">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-soft group">
                    START PLANNING
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                    BROWSE TEMPLATES
                  </Button>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <img 
                src={heroImage}
                alt="Person juggling celebration items - weddings, birthdays, events"
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make event planning effortless and beautiful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 bg-card-gradient border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary-gradient rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Loved by Event Hosts
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our users say about EventCraft Pro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-soft bg-card-gradient border-border">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.event}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Create Your Perfect Invitation?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of happy hosts who have made their events memorable
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/templates">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-soft">
                Get Started Free
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
