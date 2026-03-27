import blogImage from '../asset/Vlogs.jpg';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

export const blogsData: BlogPost[] = [
  {
    id: 'khurja-the-ceramic-capital',
    title: 'Khurja: The Ceramic Capital Two Hours from Delhi That Most People Drive Past',
    excerpt: 'Uttar Pradesh that produces a quiet fraction of the cups you\'ve drunk chai from, the plates your office canteen uses...',
    content: `
      <p>Khurja is a town in Uttar Pradesh that produces a quiet fraction of the cups you've drunk chai from, the plates your office canteen uses, the ceramic tiles lining countless Delhi bathrooms. Most people have never heard of it. Fewer have been.</p>
      <p>Khurja doesn't announce itself. There are no billboards on the highway. No travel influencer has made it famous yet. And that, honestly, is most of its charm.</p>

      <h3>A City Built on Clay</h3>
      <p>About 85 kilometres from Delhi, Khurja has been a centre of ceramic and pottery production for centuries — some accounts trace the craft back to the Mughal period, when artisans from Central Asia are said to have settled here and shaped its distinct blue-and-white aesthetic. Today, it produces an estimated 60% of India's crockery, alongside fine decorative ceramics, glazed tiles, and traditional pottery.</p>
      <p>Walk through the older quarters and the evidence is everywhere — walls stacked with drying pieces, workshops open to the street, the particular chalky smell of unfired clay in the air. It is not a heritage installation. The craft here is alive because it is economic, not because it has been preserved for visitors.</p>
      <p>That distinction matters. It changes how an experience feels.</p>

      <h3>What a Real Visit Looks Like</h3>
      <p>Most people who "visit" Khurja do so by accident — a pit stop on the way to Agra, a quick look before getting back on the highway. But the town rewards slowness in a way that a 45-minute stopover simply cannot deliver.</p>
      <p>The family workshops — several of which have been operating for three or four generations — are where the real encounter happens. Here, you're not watching a demonstration. You're in a working space where someone has been at this wheel since early morning, where the rhythms of the day are set by kiln temperatures and drying times, not tourist schedules.</p>
      <p>Spending a few hours here — watching, attempting, asking questions, failing gracefully at the wheel — produces the kind of memory that doesn't fade. The specific resistance of wet clay. The quiet correction from someone who has done this ten thousand times. The moment something almost takes shape.</p>

      <h3>The Comfort Question</h3>
      <p>The assumption that "authentic" means "rough" is one that thoughtful travel has been dismantling for a while now. You don't need to sacrifice comfort to have a genuine experience — and in fact, arriving tired and underfed tends to make you less present, not more.</p>
      <p>This is something JUNO has thought carefully about in designing their artisan trips out of Delhi. The approach is simple: everything logistical is handled — good transport, quality stays, meals that reflect the region — so that when you arrive at a Khurja workshop, the only thing left to do is be there. For many people, this is exactly the right kind of trip.</p>

      <h3>Why Now</h3>
      <p>Khurja is not undiscovered forever. The combination of proximity to Delhi, extraordinary craft density, and a growing appetite for meaningful weekend travel means it is only a matter of time before it becomes a fixture on every "hidden gems near Delhi" list.</p>
      <p>The version of Khurja that exists right now — unhurried, unperfomed, genuinely itself — is worth experiencing before the signage goes up.</p>
      <p>Two hours from Delhi. A world away from it.</p>
      
      <p><em>Interested in experiencing Khurja the right way? JUNO's upcoming artisan trips are designed for exactly this — deep, comfortable, and carefully considered. &rarr; Join the waitlist at <a href="https://junoxp.com" target="_blank" rel="noopener noreferrer" style="color: #E8A94A; text-decoration: underline;">junoxp.com</a></em></p>
    `,
    image: blogImage,
    date: 'March 27, 2026',
    category: 'Experiential Travel',
    readTime: '4 min read',
    author: 'the JUNO Editorial Team'
  }
];
