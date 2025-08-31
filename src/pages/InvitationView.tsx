import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Phone, Share2, Copy, MessageSquare, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvitationData {
  id: string;
  eventType: string;
  templateId?: string;
  hostName: string;
  eventTitle: string;
  date: string;
  time: string;
  venue: string;
  rsvpContact: string;
  customMessage: string;
  brideName?: string;
  groomName?: string;
  parentNames?: string;
  babyGender?: string;
  companyName?: string;
  eventCategory?: string;
  createdAt: string;
}

const InvitationView = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem(`invitation_${id}`);
      if (stored) {
        setInvitation(JSON.parse(stored));
      }
      setLoading(false);
    }
  }, [id]);

  const shareUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied!",
      description: "Invitation link has been copied to your clipboard.",
    });
  };

  const shareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: invitation?.eventTitle,
        text: `You're invited to ${invitation?.eventTitle}!`,
        url: shareUrl,
      });
    } else {
      copyToClipboard();
    }
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      wedding: "bg-gradient-to-r from-pink-500 to-rose-500",
      birthday: "bg-gradient-to-r from-purple-500 to-pink-500", 
      anniversary: "bg-gradient-to-r from-red-500 to-pink-500",
      "baby-shower": "bg-gradient-to-r from-blue-400 to-pink-400",
      corporate: "bg-gradient-to-r from-blue-600 to-indigo-600",
      graduation: "bg-gradient-to-r from-yellow-500 to-orange-500"
    };
    return colors[type as keyof typeof colors] || colors.birthday;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="text-white text-xl">Loading invitation...</div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Invitation Not Found</h2>
            <p className="text-muted-foreground">The invitation you're looking for doesn't exist or has been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderEventSpecificContent = () => {
    switch (invitation.eventType) {
      case "wedding":
        return (
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-2">
              <h2 className="text-2xl font-semibold text-white">{invitation.brideName}</h2>
              <Heart className="w-6 h-6 text-pink-300" />
              <h2 className="text-2xl font-semibold text-white">{invitation.groomName}</h2>
            </div>
            <p className="text-white/80">are getting married!</p>
          </div>
        );
      
      case "baby-shower":
        return (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">{invitation.parentNames}</h2>
            <p className="text-white/80">
              are celebrating their upcoming {invitation.babyGender === 'surprise' ? 'little one' : `baby ${invitation.babyGender}`}
            </p>
          </div>
        );
        
      case "corporate":
        return (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">{invitation.companyName}</h2>
            <Badge variant="secondary" className="mb-2">
              {invitation.eventCategory}
            </Badge>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Invitation Card */}
        <Card className={`overflow-hidden shadow-glow ${getEventTypeColor(invitation.eventType)} p-1`}>
          <div className="bg-white rounded-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4 capitalize">
                {invitation.eventType.replace('-', ' ')}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {invitation.eventTitle}
              </h1>
              
              {renderEventSpecificContent()}
              
              <p className="text-gray-600 mb-6">
                Hosted by <span className="font-semibold text-gray-800">{invitation.hostName}</span>
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-gray-800">{formatDate(invitation.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-gray-800">{formatTime(invitation.time)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-gray-800">{invitation.venue}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-gray-600">RSVP</p>
                  <p className="font-medium text-gray-800">{invitation.rsvpContact}</p>
                </div>
              </div>
            </div>

            {invitation.customMessage && (
              <div className="mb-8 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border-l-4 border-primary">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-gray-700 italic">"{invitation.customMessage}"</p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              <p className="text-gray-500 text-sm mb-6">
                We hope to see you there! ✨
              </p>
            </div>
          </div>
        </Card>

        {/* Share Section */}
        <Card className="mt-6 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
              Share this Invitation
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={shareInvitation}
                className="flex-1 bg-primary-gradient hover:shadow-soft"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="outline" 
                onClick={copyToClipboard}
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Created with EventCraft Pro
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvitationView;