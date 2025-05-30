
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Car, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  rating: number;
  total_rides: number;
  is_verified: boolean;
}

interface Ride {
  id: string;
  pickup_address: string;
  destination_address: string;
  status: string;
  estimated_fare: number;
  created_at: string;
  vehicle_type: string;
}

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchRides();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    }
  };

  const fetchRides = async () => {
    try {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('passenger_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRides(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load rides",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!profile) {
    return <div className="flex justify-center items-center h-64">Profile not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{profile.full_name}</CardTitle>
              <p className="text-gray-600">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={profile.role === 'driver' ? 'default' : 'secondary'}>
                  {profile.role}
                </Badge>
                {profile.is_verified && (
                  <Badge variant="outline" className="text-green-600">
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>{profile.rating}/5.0 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-500" />
              <span>{profile.total_rides} Total Rides</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span>Member since 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Rides</CardTitle>
        </CardHeader>
        <CardContent>
          {rides.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No rides yet</p>
          ) : (
            <div className="space-y-4">
              {rides.map((ride) => (
                <div key={ride.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{ride.pickup_address}</span>
                    </div>
                    <Badge variant={
                      ride.status === 'completed' ? 'default' :
                      ride.status === 'cancelled' ? 'destructive' :
                      'secondary'
                    }>
                      {ride.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <span>to</span>
                    <span>{ride.destination_address}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{ride.vehicle_type} • ${ride.estimated_fare}</span>
                    <span>{new Date(ride.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
