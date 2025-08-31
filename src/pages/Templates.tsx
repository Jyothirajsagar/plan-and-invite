import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = {
    religion: ["Hindu", "Muslim", "Christian", "Jewish", "Buddhist"],
    theme: ["Modern", "Classic", "Minimal", "Elegant", "Fun"],
    event: ["Wedding", "Birthday", "Anniversary", "Baby Shower", "Corporate", "Graduation"]
  };

  const templates = [
    {
      id: 1,
      name: "Elegant Wedding",
      category: "Wedding",
      theme: "Classic",
      religion: "Hindu",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      colors: ["#FFB6C1", "#FFF", "#D4AF37"]
    },
    {
      id: 2,
      name: "Modern Birthday",
      category: "Birthday",
      theme: "Modern",
      religion: "Christian",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      colors: ["#FF69B4", "#87CEEB", "#FFF"]
    },
    {
      id: 3,
      name: "Baby Shower Bliss",
      category: "Baby Shower",
      theme: "Minimal",
      religion: "Muslim",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      colors: ["#FFB6C1", "#E6E6FA", "#FFF"]
    },
    {
      id: 4,
      name: "Corporate Excellence",
      category: "Corporate",
      theme: "Professional",
      religion: "All",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      colors: ["#4169E1", "#FFF", "#C0C0C0"]
    },
    {
      id: 5,
      name: "Anniversary Romance",
      category: "Anniversary",
      theme: "Elegant",
      religion: "Christian",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      colors: ["#DC143C", "#FFB6C1", "#FFF"]
    },
    {
      id: 6,
      name: "Graduation Pride",
      category: "Graduation",
      theme: "Modern",
      religion: "All",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
      colors: ["#FFD700", "#000080", "#FFF"]
    }
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilters.length === 0) return matchesSearch;
    
    const matchesFilter = selectedFilters.some(filter =>
      template.category === filter ||
      template.theme === filter ||
      template.religion === filter ||
      template.religion === "All"
    );
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent mb-4">
            Beautiful Templates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of professionally designed invitation templates for every occasion
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 backdrop-blur-sm border-border"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filters:</span>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            {Object.entries(filters).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-sm font-medium text-foreground capitalize">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Badge
                      key={item}
                      variant={selectedFilters.includes(item) ? "default" : "secondary"}
                      className="cursor-pointer hover:shadow-soft transition-all"
                      onClick={() => toggleFilter(item)}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group overflow-hidden hover:shadow-glow transition-all duration-300 bg-card-gradient border-border">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  <div className="flex gap-1">
                    {template.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {template.theme}
                  </Badge>
                </div>
                
                <Link to={`/create?template=${template.id}`}>
                  <Button className="w-full bg-primary-gradient hover:shadow-soft">
                    Use Template
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No templates found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedFilters([]);
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;