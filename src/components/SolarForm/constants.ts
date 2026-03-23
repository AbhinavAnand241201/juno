export interface Question {
  id: string;
  label: string;
  text: string;
  icon: string;
  type: 'text' | 'email' | 'tel' | 'select';
  options?: string[];
  placeholder?: string;
  color: string;
  planetBg: string;
}

const AGE_OPTIONS = Array.from({ length: 11 }, (_, i) => String(20 + i));

export const QUESTIONS: Question[] = [
  {
    id: 'name',
    label: 'Name',
    text: 'What should we call you?',
    icon: '👤',
    type: 'text',
    placeholder: 'Enter your full name',
    color: '#1b3b57',
    planetBg: 'rgba(27,59,87,0.13)',
  },
  {
    id: 'age',
    label: 'Age',
    text: 'Select your age (20-30)',
    icon: '📅',
    type: 'select',
    options: AGE_OPTIONS,
    color: '#e3a342',
    planetBg: 'rgba(227,163,66,0.16)',
  },
  {
    id: 'sex',
    label: 'Sex',
    text: 'How do you identify?',
    icon: '🧭',
    type: 'select',
    options: ['Male', 'Female', 'Other'],
    color: '#98a59c',
    planetBg: 'rgba(152,165,156,0.18)',
  },
  {
    id: 'email',
    label: 'Email',
    text: 'Where should we send your itinerary?',
    icon: '✉️',
    type: 'email',
    placeholder: 'you@example.com',
    color: '#1b3b57',
    planetBg: 'rgba(27,59,87,0.11)',
  },
  {
    id: 'phone',
    label: 'Phone',
    text: 'What is your contact number?',
    icon: '📞',
    type: 'tel',
    placeholder: '+91 98765 43210',
    color: '#e3a342',
    planetBg: 'rgba(227,163,66,0.16)',
  },
  {
    id: 'city',
    label: 'City',
    text: 'Which city are you traveling from?',
    icon: '🏙️',
    type: 'text',
    placeholder: 'Mumbai, Bengaluru, Delhi...',
    color: '#98a59c',
    planetBg: 'rgba(152,165,156,0.2)',
  },
  {
    id: 'tripStyle',
    label: 'Trip Style',
    text: 'Pick the journey style you want most',
    icon: '🧳',
    type: 'select',
    options: ['Culture and Craft', 'Adventure and Nature', 'Food and Wellness', 'Surprise Me'],
    color: '#1b3b57',
    planetBg: 'rgba(27,59,87,0.14)',
  },
];

/** Orbital radius in px (tripled from base 220 for a wide, cinematic orbit). */
export const ORBIT_RX = 660;
export const ORBIT_RY = 660;
export const TILT_DEG = 72;
export const TILT_RAD = (TILT_DEG * Math.PI) / 180;

/** NASA Solar Dynamics Observatory — real Sun disk (stock / public domain). */
export const SUN_IMAGE_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/800px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg';
