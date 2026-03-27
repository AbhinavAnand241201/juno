import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from 'lucide-react';
import { blogsData } from '../data/blogs';

export default function BlogPostDetail() {
  const { id } = useParams();
  const post = blogsData.find(b => b.id === id);

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-juno-bg p-6">
        <h1 className="text-3xl font-display font-bold text-juno-navy mb-4">Story Not Found</h1>
        <Link to="/blogs" className="text-juno-ochre font-bold uppercase tracking-widest text-xs">Return to Journal</Link>
      </div>
    );
  }

  return (
    <div className="bg-juno-bg min-h-screen">
      {/* Article Header */}
      <header className="relative pt-40 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-juno-navy/60 hover:text-juno-navy transition-colors text-xs font-bold uppercase tracking-widest mb-12">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Link>
          
          <div className="flex items-center gap-3 text-juno-ochre font-bold text-[10px] uppercase tracking-[0.3em] mb-8">
            <span className="px-4 py-1.5 bg-juno-ochre/10 rounded-full">{post.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime} Read</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-juno-navy leading-[1.1] mb-12" style={{ fontFamily: '"Playfair Display", serif' }}>
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 pt-10 border-t border-juno-navy/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-juno-navy flex items-center justify-center text-juno-bg font-display font-bold text-xl">J</div>
              <div>
                <div className="text-base font-bold text-juno-navy">Juno Editorial</div>
                <div className="text-[10px] uppercase tracking-widest text-juno-navy/40">{post.date}</div>
              </div>
            </div>
            
            <div className="ml-auto flex items-center gap-4">
              <button className="p-3 rounded-full border border-juno-navy/10 hover:bg-juno-navy/5 transition-colors">
                <Share2 className="w-4 h-4 text-juno-navy" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-20 md:mb-32">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-[16/8]">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto pb-32 px-6">
        <article 
          className="blog-content text-juno-navy/80 font-light"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <style>{`
          .blog-content p {
            font-size: 1.125rem;
            line-height: 2;
            margin-bottom: 1.75rem;
            letter-spacing: 0.01em;
          }
          .blog-content h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.75rem;
            font-weight: 700;
            color: #1a1a2e;
            margin-top: 3rem;
            margin-bottom: 1.25rem;
            letter-spacing: -0.01em;
          }
          .blog-content em {
            font-style: italic;
            opacity: 0.85;
          }
          .blog-content a {
            text-decoration: underline;
            text-underline-offset: 3px;
          }
          .blog-content > p:first-child {
            font-size: 1.25rem;
            line-height: 1.9;
            color: rgba(26,26,46,0.75);
          }
        `}</style>
        
        <footer className="mt-24 pt-16 border-t border-juno-navy/10">
          <div className="bg-juno-navy text-juno-bg p-12 rounded-[2.5rem] text-center">
            <h3 className="text-2xl font-display font-bold mb-6">Want more stories from the edge of craft?</h3>
            <p className="text-juno-bg/60 font-light mb-8 max-w-md mx-auto">Join our private list for infrequent, deeply-researched dispatches on culture, craft, and slow living.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white outline-none focus:border-juno-sand transition-colors"
              />
              <button className="px-8 py-4 bg-juno-sand text-juno-navy rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
