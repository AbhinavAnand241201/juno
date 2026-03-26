import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { blogsData } from '../data/blogs';

export default function Blogs() {
  return (
    <div className="bg-juno-bg min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.5em] uppercase text-juno-navy/60 mb-6 block">
            The Journal
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-juno-navy leading-tight max-w-4xl" style={{ fontFamily: '"Playfair Display", serif' }}>
            Stories of Craft, <br />
            <span className="italic text-juno-ochre">Culture & Connection.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogsData.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-juno-sand/20"
            >
              <Link to={`/blog/${post.id}`} className="block relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-juno-navy text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="flex flex-col flex-grow p-8">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-juno-navy/40 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>

                <h2 className="text-xl md:text-2xl font-display font-bold text-juno-navy mb-4 group-hover:text-juno-ochre transition-colors leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {post.title}
                </h2>

                <p className="text-juno-navy/60 font-light text-sm mb-8 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-juno-navy/5">
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-juno-navy group-hover:gap-4 transition-all">
                    Read Story <ArrowRight className="w-4 h-4 text-juno-ochre" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
