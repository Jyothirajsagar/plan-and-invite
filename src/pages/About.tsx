import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Zap, Users, Calendar, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Beautiful Templates",
      description: "Choose from our professionally designed templates for every occasion"
    },
    {
      icon: Heart,
      title: "Personal Touch",
      description: "Customize every detail to make your invitation uniquely yours"
    },
    {
      icon: Zap,
      title: "Quick Creation", 
      description: "Create stunning invitations in minutes, not hours"
    },
    {
      icon: Users,
      title: "Easy Sharing",
      description: "Share your invitations instantly with shareable links"
    },
    {
      icon: Calendar,
      title: "All Events",
      description: "Perfect for weddings, birthdays, corporate events, and more"
    },
    {
      icon: Share2,
      title: "Mobile Friendly",
      description: "Your invitations look perfect on any device"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent mb-6">
            About EventCraft Pro
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe every celebration deserves a beautiful beginning. EventCraft Pro is your all-in-one platform 
            for creating stunning, professional invitations that capture the joy and excitement of your special moments.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-16 shadow-soft bg-card-gradient border-border">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              To make event planning effortless and beautiful for everyone. Whether you're planning an intimate 
              gathering or a grand celebration, we provide the tools and templates you need to create invitations 
              that reflect your style and bring people together.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose EventCraft Pro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 bg-card-gradient border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary-gradient rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <Card className="mb-16 shadow-soft bg-card-gradient border-border">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  EventCraft Pro was born from a simple idea: everyone deserves beautiful invitations for their 
                  special moments, regardless of their design experience or budget.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We've helped thousands of hosts create memorable invitations for weddings, birthdays, 
                  corporate events, and celebrations of all kinds. Our platform combines professional design 
                  with user-friendly tools to make invitation creation accessible to everyone.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From intimate dinner parties to grand celebrations, we're here to help you make every 
                  invitation as special as the event itself.
                </p>
              </div>
              <div className="text-center">
                <div className="w-64 h-64 bg-primary-gradient rounded-2xl mx-auto flex items-center justify-center shadow-glow">
                  <div className="text-white text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-2xl font-bold">1000+</p>
                    <p className="text-lg">Happy Hosts</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="inline-block shadow-glow bg-primary-gradient p-1">
            <CardContent className="bg-background rounded-lg p-8 m-0">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Create Your Perfect Invitation?
              </h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of happy hosts who have made their events memorable with EventCraft Pro
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/templates">
                  <Button size="lg" className="bg-primary-gradient hover:shadow-glow">
                    Browse Templates
                  </Button>
                </Link>
                <Link to="/create">
                  <Button size="lg" variant="outline">
                    Start Creating
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;