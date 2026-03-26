import exp1 from '../asset/Experience_1.png';
import exp2 from '../asset/Experience_2.jpg';
import exp3 from '../asset/Exp_3.png';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogsData: BlogPost[] = [
  {
    id: 'the-art-of-slow-travel',
    title: 'The Art of Slow Travel: Why We Choose Depth Over Distance',
    excerpt: 'In a world obsessed with seeing everything, we advocate for seeing one thing deeply.',
    content: `
      <p>We live in an age of the 'check-list' traveler. Ten cities in twelve days. Four hundred photos that will never be looked at again. A frantic race to prove we were there, without ever actually being present.</p>
      <p>At JUNO, we believe travel should be an act of reclamation. Reclaiming our time, our curiosity, and our connection to the world around us.</p>
      <p>Slow travel isn't about the speed of your transport. It's about the quality of your attention. It's about spending four hours watching an artisan shape a single piece of clay, and realizing that those four hours told you more about a culture than any museum ever could.</p>
      <h3>The Integrity of Craft</h3>
      <p>When you sit across from someone who has spent forty years mastering a single movement of the hand, the noise of the world falls away. You begin to understand the patience required for beauty. You begin to understand that maybe, just maybe, the things worth having are the things that take time.</p>
    `,
    image: exp1,
    date: 'March 15, 2026',
    category: 'Philosophy',
    readTime: '5 min'
  },
  {
    id: 'khurja-beyond-the-kiln',
    title: 'Khurja: Beyond the Kiln',
    excerpt: 'Exploring the hidden stories of India\'s ceramic heartland.',
    content: `
      <p>Khurja is often dismissed as just an industrial cluster. But if you look past the chimneys, you find a rhythm that hasn't changed in centuries.</p>
      <p>It's a place where the earth itself is the primary language. Every family has a story tied to the clay. Every workshop is a repository of ancestral knowledge.</p>
      <p>Our recent journey to Khurja wasn't just about pottery. It was about witnessing the resilience of a community that chooses to keep making things by hand in a machine-made world.</p>
    `,
    image: exp2,
    date: 'February 28, 2026',
    category: 'Journeys',
    readTime: '4 min'
  },
  {
    id: 'why-we-make-things',
    title: 'Why We Make Things: The Psychology of the Handmade',
    excerpt: 'Digital lives crave tactile experiences. Here is why working with your hands feels so good.',
    content: `
      <p>We spend most of our lives touching glass. We swipe, we tap, we click. Our hands were designed for so much more than this.</p>
      <p>There is a documented psychological shift that happens when you engage in tactile craft. Your heart rate slows. Your focus narrows. You enter a state of 'flow' that is increasingly rare in our notification-driven existence.</p>
      <p>When you hold a piece of clay, there is no 'undo' button. There is only you, the material, and the moment. It forces a level of honesty that our digital avatars don't require.</p>
    `,
    image: exp3,
    date: 'February 10, 2026',
    category: 'Insight',
    readTime: '6 min'
  }
];
