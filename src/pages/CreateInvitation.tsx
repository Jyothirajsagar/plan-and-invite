import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Phone, MessageSquare, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const templateId = searchParams.get("template");
  
  const [eventType, setEventType] = useState("birthday");
  const [formData, setFormData] = useState({
    hostName: "",
    eventTitle: "",
    date: "",
    time: "",
    venue: "",
    rsvpContact: "",
    customMessage: "",
    // Wedding specific
    brideName: "",
    groomName: "",
    // Baby shower specific
    parentNames: "",
    babyGender: "",
    // Corporate specific
    companyName: "",
    eventCategory: "",
  });

  useEffect(() => {
    if (templateId) {
      // Set event type based on template
      const templates = {
        "1": "wedding",
        "2": "birthday", 
        "3": "baby-shower",
        "4": "corporate",
        "5": "anniversary",
        "6": "graduation"
      };
      setEventType(templates[templateId as keyof typeof templates] || "birthday");
    }
  }, [templateId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate unique ID for invitation
    const invitationId = Math.random().toString(36).substring(2, 15);
    
    // Store invitation data in localStorage
    const invitationData = {
      id: invitationId,
      eventType,
      templateId,
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(`invitation_${invitationId}`, JSON.stringify(invitationData));
    
    toast({
      title: "Invitation Created!",
      description: "Your beautiful invitation is ready to share.",
    });
    
    navigate(`/invitation/${invitationId}`);
  };

  const renderEventSpecificFields = () => {
    switch (eventType) {
      case "wedding":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brideName">Bride's Name</Label>
                <Input
                  id="brideName"
                  value={formData.brideName}
                  onChange={(e) => setFormData({...formData, brideName: e.target.value})}
                  placeholder="Enter bride's name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groomName">Groom's Name</Label>
                <Input
                  id="groomName"
                  value={formData.groomName}
                  onChange={(e) => setFormData({...formData, groomName: e.target.value})}
                  placeholder="Enter groom's name"
                  required
                />
              </div>
            </div>
          </>
        );
      
      case "baby-shower":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentNames">Parent Names</Label>
                <Input
                  id="parentNames"
                  value={formData.parentNames}
                  onChange={(e) => setFormData({...formData, parentNames: e.target.value})}
                  placeholder="e.g., Sarah & Michael"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="babyGender">Baby Gender</Label>
                <Select value={formData.babyGender} onValueChange={(value) => setFormData({...formData, babyGender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boy">Boy</SelectItem>
                    <SelectItem value="girl">Girl</SelectItem>
                    <SelectItem value="surprise">Surprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
        
      case "corporate":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventCategory">Event Category</Label>
                <Select value={formData.eventCategory} onValueChange={(value) => setFormData({...formData, eventCategory: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="launch">Product Launch</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Create Your Invitation
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Fill in the details below to create a beautiful, personalized invitation
          </p>
        </div>

        <Card className="shadow-glow bg-card-gradient border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Event Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="baby-shower">Baby Shower</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="graduation">Graduation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderEventSpecificFields()}

              <div className="space-y-2">
                <Label htmlFor="hostName">Host Name</Label>
                <Input
                  id="hostName"
                  value={formData.hostName}
                  onChange={(e) => setFormData({...formData, hostName: e.target.value})}
                  placeholder="Enter host name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  value={formData.eventTitle}
                  onChange={(e) => setFormData({...formData, eventTitle: e.target.value})}
                  placeholder="e.g., Sarah's 25th Birthday Celebration"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Venue
                </Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({...formData, venue: e.target.value})}
                  placeholder="Enter event venue"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rsvpContact" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  RSVP Contact
                </Label>
                <Input
                  id="rsvpContact"
                  value={formData.rsvpContact}
                  onChange={(e) => setFormData({...formData, rsvpContact: e.target.value})}
                  placeholder="Phone number or email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customMessage" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Custom Message
                </Label>
                <Textarea
                  id="customMessage"
                  value={formData.customMessage}
                  onChange={(e) => setFormData({...formData, customMessage: e.target.value})}
                  placeholder="Add a personal message for your guests..."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full bg-primary-gradient hover:shadow-glow text-lg py-6">
                Create Invitation
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateInvitation;