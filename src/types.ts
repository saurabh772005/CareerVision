
export interface Feature {
  title: string;
  description: string;
  gradient: string;
  stat?: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
  color: string;
}

export interface Testimonial {
  name: string;
  college: string;
  quote: string;
  rating: number;
}
