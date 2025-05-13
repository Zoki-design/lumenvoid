// Mock data for the app

export const moods = [
  { id: '1', image: require('@/assets/icons/happy1.png'), label: 'Happy', count: '14'},
  { id: '2', image: require('@/assets/icons/meh1.png'), label: 'Neutral', count: '20'},
  { id: '3', image: require('@/assets/icons/mad1.png'), label: 'Angry', count: '37' },
  { id: '4', image: require('@/assets/icons/sad1.png'), label: 'Sad', count: '12' },
  { id: '5', image: require('@/assets/icons/anxious1.png'), label: 'Anxious', count:'18' },
  { id: '6', image: require('@/assets/icons/depressed1.png'), label: 'Depressed', count: '5' },
  { id: '7', image: require('@/assets/icons/None.png'), label: 'None', count: '0' },

];

export const dates = [
  { id: '1', month: 'Apr', day: '14', week: 'Mon' },
  { id: '2', month: 'Apr', day: '15', week: 'Tue' },
  { id: '3', month: 'Apr', day: '16', week: 'Wed' },
  { id: '4', month: 'Apr', day: '17', week: 'Thu' },
  { id: '5', month: 'Apr', day: '18', week: 'Fri' },
  { id: '6', month: 'Apr', day: '19', week: 'Sat' },
  { id: '7', month: 'Apr', day: '20', week: 'Sun' },
]

export const meditations = [
  {
    id: '1',
    title: 'Morning Calm',
    description: 'Start your day with clarity and peace',
    duration: '10 min',
    imageUrl: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Mindfulness',
  },
  {
    id: '2',
    title: 'Anxiety Relief',
    description: 'Guided breathing to reduce anxiety',
    duration: '15 min',
    imageUrl: 'https://images.pexels.com/photos/1447092/pexels-photo-1447092.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Stress',
  },
  {
    id: '3',
    title: 'Deep Sleep',
    description: 'Fall asleep faster and improve sleep quality',
    duration: '20 min',
    imageUrl: 'https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Sleep',
  },
  {
    id: '4',
    title: 'Focus & Clarity',
    description: 'Enhance your concentration and mental clarity',
    duration: '12 min',
    imageUrl: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Focus',
  },
  {
    id: '5',
    title: 'Self-Compassion',
    description: 'Cultivate kindness towards yourself',
    duration: '18 min',
    imageUrl: 'https://images.pexels.com/photos/3560168/pexels-photo-3560168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Self-care',
  },
];

export const progressStats = [
  {
    id: '1',
    title: 'Meditation',
    value: 45,
    target: 60,
    unit: ' min',
    description: 'Weekly meditation goal',
  },
  {
    id: '2',
    title: 'Mood Tracking',
    value: 5,
    target: 7,
    unit: ' days',
    description: 'Days tracked this week',
  },
  {
    id: '3',
    title: 'Journaling',
    value: 3,
    target: 5,
    unit: ' entries',
    description: 'Weekly journaling goal',
  },
];

export const therapists = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Anxiety & Depression',
    rating: 4.9,
    reviewCount: 124,
    imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Trauma & PTSD',
    rating: 4.8,
    reviewCount: 98,
    imageUrl: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: true,
  },
  {
    id: '3',
    name: 'Dr. Amelia Patel',
    specialty: 'Relationship Counseling',
    rating: 4.7,
    reviewCount: 87,
    imageUrl: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: false,
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Stress Management',
    rating: 4.9,
    reviewCount: 112,
    imageUrl: 'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    available: true,
  },
];

export const resources = [
  {
    id: '1',
    title: 'Understanding Anxiety',
    description: 'Learn about the causes, symptoms, and management strategies for anxiety disorders.',
    category: 'Education',
    imageUrl: 'https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    title: 'The Science of Sleep',
    description: 'Discover how sleep affects mental health and practical tips for better sleep hygiene.',
    category: 'Education',
    imageUrl: 'https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    title: 'Crisis Hotlines',
    description: 'A comprehensive list of emergency mental health resources available 24/7.',
    category: 'Support',
    imageUrl: 'https://images.pexels.com/photos/4226215/pexels-photo-4226215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    title: 'Nutrition & Mental Health',
    description: 'How diet influences mood and mental wellbeing, with practical nutritional advice.',
    category: 'Lifestyle',
    imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const communityPosts = [
  {
    id: '1',
    author: 'Sarah K.',
    title: 'How I overcame social anxiety',
    content: 'After years of struggling with social anxiety, I wanted to share my journey and the strategies that helped me...',
    likes: 42,
    comments: 13,
    timeAgo: '2 hours ago',
  },
  {
    id: '2',
    author: 'Michael T.',
    title: 'Daily gratitude practice changed my life',
    content: 'I started a simple gratitude practice 3 months ago, and I can\'t believe the difference it\'s made in my outlook...',
    likes: 35,
    comments: 8,
    timeAgo: '5 hours ago',
  },
  {
    id: '3',
    author: 'Jamie L.',
    title: 'Looking for breathing exercise recommendations',
    content: 'I\'ve been trying different breathing techniques for anxiety. What has worked best for you?',
    likes: 20,
    comments: 23,
    timeAgo: '1 day ago',
  },
  {
    id: '4',
    author: 'Alex R.',
    title: 'My experience with therapy',
    content: 'I was hesitant to start therapy, but it\'s been one of the best decisions I\'ve made. Here\'s what helped me take that first step...',
    likes: 67,
    comments: 19,
    timeAgo: '2 days ago',
  },
];