import { CityService, BusRoute, NewsItem } from './types';

export const CITY_SERVICES: CityService[] = [
  {
    id: 'medelement',
    name: 'MedElement',
    icon: 'Stethoscope',
    description: 'Book medical appointments and access records.',
    category: 'health',
  },
  {
    id: 'avtobys',
    name: 'Bus Tracker',
    icon: 'Bus',
    description: 'Real-time GPS tracking and e-tickets.',
    category: 'transport',
  },
  {
    id: 'reports',
    name: 'City Reports',
    icon: 'AlertTriangle',
    description: 'Report potholes, lighting, or cleanup needs.',
    category: 'infrastructure',
  },
  {
    id: 'utilities',
    name: 'Utility Alerts',
    icon: 'Zap',
    description: 'Real-time notifications for outages.',
    category: 'utility',
  },
];

export const MOCK_ROUTES: BusRoute[] = [
  { id: '1', number: '10A', from: 'Central Market', to: 'University', status: 'on_time', nextArrival: '5 mins' },
  { id: '2', number: '21', from: 'Old Town', to: 'Satpayev St', status: 'delayed', nextArrival: '12 mins' },
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'New Eco-Park Opening',
    summary: 'Join us this Saturday for the inauguration of the Zhezqazgan Green Zone.',
    date: '2026-05-01',
    category: 'event',
  },
  {
    id: 'n2',
    title: 'Water Utility Maintenance',
    summary: 'Planned maintenance in the North District from 10 PM to 4 AM.',
    date: '2026-04-30',
    category: 'alert',
  },
];
