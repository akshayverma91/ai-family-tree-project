import { LifeStory } from '@/types/lifeStory';

export const sampleLifeStories: LifeStory[] = [
  // John Smith's stories
  {
    id: 'story-1',
    title: 'Building Our First Home',
    content: 'In 1978, Mary and I saved every penny for three years to build our first home. I remember working double shifts at the factory while Mary taught evening classes. We did most of the interior work ourselves - painting, laying floors, even installing the kitchen cabinets. It took six months of weekends, but when we finally moved in with baby Michael, it felt like we had built a castle. The proudest moment was when Mary planted our first rose bush in the front yard.',
    category: 'achievement',
    date: '1978-09-15',
    emotion: 'proud',
    createdAt: '2024-01-15T10:00:00Z',
    isShared: true
  },
  {
    id: 'story-2',
    title: 'The Great Blackout of 1977',
    content: 'When the lights went out across the entire city, our neighborhood came together like never before. Mrs. Henderson from next door brought candles, the Johnsons shared their battery radio, and we all gathered in our backyard with camping chairs. I fired up the old charcoal grill and we cooked everything from our freezer before it spoiled. The kids played games by candlelight while us adults shared stories and laughed until midnight. Sometimes the best memories come from the most unexpected moments.',
    category: 'memory',
    date: '1977-07-13',
    emotion: 'nostalgic',
    createdAt: '2024-01-10T14:30:00Z',
    isShared: true
  },
  
  // Mary Smith's stories
  {
    id: 'story-3',
    title: 'My First Day Teaching',
    content: 'September 1974 - I was 22 years old and terrified. Twenty-eight second-graders stared at me as I introduced myself as "Miss Johnson" (this was before I married John). Little Tommy in the front row asked if I was scared, and I honestly told him "Yes, but we\'ll figure it out together." That honesty became my teaching philosophy. Over 35 years, I learned that showing vulnerability made me a better teacher. Those children taught me as much as I taught them.',
    category: 'career',
    date: '1974-09-05',
    emotion: 'inspiring',
    createdAt: '2024-01-12T09:15:00Z',
    isShared: true
  },
  {
    id: 'story-4',
    title: 'Sarah\'s First Steps',
    content: 'It was a rainy Tuesday afternoon in April 1979. Sarah was 13 months old and had been cruising along the furniture for weeks. I was folding laundry when I heard John gasp from the kitchen. There was Sarah, wobbling but determined, taking her first independent steps toward him with the biggest smile. We both started crying happy tears. I called my mother immediately, and she drove over just to see Sarah walk across the living room again and again. Such a simple moment, but it felt like pure magic.',
    category: 'family',
    date: '1979-04-17',
    emotion: 'happy',
    createdAt: '2024-01-08T16:45:00Z',
    isShared: true
  },

  // Michael Smith's stories  
  {
    id: 'story-5',
    title: 'Dad Teaching Me to Drive',
    content: 'Summer of 1991, I was 16 and convinced I knew everything. Dad took me to the empty mall parking lot every Sunday after church in his old blue Chevy. He was so patient, even when I stalled the engine twelve times in a row or when I accidentally drove over those concrete parking barriers. "Confidence comes with practice, son," he\'d always say. The day I finally parallel parked perfectly, he bought me a milkshake and said he was proud. That old car is long gone, but I still hear his voice every time I teach someone else to drive.',
    category: 'youth',
    date: '1991-07-20',
    emotion: 'nostalgic',
    createdAt: '2024-01-05T11:20:00Z',
    isShared: true
  },
  {
    id: 'story-6',
    title: 'Starting My First Company',
    content: 'In 2001, right after the dot-com crash, I thought I was crazy to start a tech company. I had $3,000 in savings and a garage. Jennifer was pregnant with Emma, and everyone told me to get a stable job. But I had this idea for a small business management software. I coded 16 hours a day for six months, living on ramen noodles and coffee. The day our first customer paid $99 for our software, I called Dad crying. He said, "I always knew you had it in you." That company eventually sold for enough to buy our house in San Francisco.',
    category: 'career',
    date: '2001-03-15',
    emotion: 'proud',
    createdAt: '2024-01-03T13:10:00Z',
    isShared: true
  },

  // Sarah Johnson's stories
  {
    id: 'story-7',
    title: 'Medical School Struggles',
    content: 'Third year of medical school nearly broke me. I was doing my pediatric rotation, working 80-hour weeks, and I had failed my first exam. I called Mom crying, ready to quit. She drove four hours to Boston just to have dinner with me. Over Chinese takeout in my tiny apartment, she reminded me why I wanted to become a doctor - to help children like my little brother who had severe asthma. "The hardest roads lead to the most beautiful destinations," she said. I framed that fortune cookie message and kept it on my desk through residency.',
    category: 'struggle',
    date: '2003-11-12',
    emotion: 'challenging',
    createdAt: '2024-01-07T08:30:00Z',
    isShared: true
  },
  {
    id: 'story-8',
    title: 'Olivia\'s Birth Day',
    content: 'August 18, 2010 - after 14 hours of labor, our daughter Olivia finally arrived at 3:47 AM. David had been coaching me through contractions, and both our families were waiting in the hall. When the doctor placed her on my chest, this tiny perfect human with David\'s nose and my stubborn chin, everything else disappeared. Mom was the first to meet her granddaughter, and seeing her hold Olivia while crying happy tears made me understand the full circle of love that connects generations.',
    category: 'family',
    date: '2010-08-18',
    emotion: 'happy',
    createdAt: '2024-01-09T07:20:00Z',
    isShared: true
  }
];

export const lifeStoryCategories = [
  { key: 'childhood', label: 'Childhood', icon: '🧸', color: 'bg-pink-100 text-pink-800' },
  { key: 'youth', label: 'Youth', icon: '🌟', color: 'bg-purple-100 text-purple-800' },
  { key: 'career', label: 'Career', icon: '💼', color: 'bg-blue-100 text-blue-800' },
  { key: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', color: 'bg-green-100 text-green-800' },
  { key: 'achievement', label: 'Achievement', icon: '🏆', color: 'bg-yellow-100 text-yellow-800' },
  { key: 'struggle', label: 'Challenge', icon: '💪', color: 'bg-red-100 text-red-800' },
  { key: 'memory', label: 'Memory', icon: '💭', color: 'bg-indigo-100 text-indigo-800' },
  { key: 'other', label: 'Other', icon: '📝', color: 'bg-gray-100 text-gray-800' }
];