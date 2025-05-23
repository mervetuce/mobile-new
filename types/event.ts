export interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  description: string;
  type: 'tourist' | 'business';
  image: string;
}