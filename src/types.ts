
export type CityService = {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'health' | 'transport' | 'infrastructure' | 'utility';
};

export type BusRoute = {
  id: string;
  number: string;
  from: string;
  to: string;
  status: 'on_time' | 'delayed';
  nextArrival: string;
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'official' | 'event' | 'alert';
};

export type UserProfile = {
  uid: string;
  name: string;
  points: number;
  avatar: string;
};
