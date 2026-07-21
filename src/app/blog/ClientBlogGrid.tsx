"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BlogPost } from "@/lib/blogData";
import { ArrowUpLeft, MagnifyingGlass } from "@phosphor-icons/react";

interface ClientBlogGridProps {
  posts: BlogPost[];
}

export default function ClientBlogGrid({ posts }: ClientBlogGridProps) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  // Sync with URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch = post.title.includes(searchQuery) || post.excerpt.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Filters & Search - Brutalist */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-[var(--border-subtle)] pb-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(9);
              }}
              className={`relative px-5 py-2 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "text-black bg-accent font-bold"
                  : "text-[var(--text-muted-light)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-transparent"
              }`}
            >
              <span className="relative z-10">{cat === "All" ? "الكل" : cat}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="ابحث في المقالات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 px-1 text-[var(--text-primary)] font-mono text-sm focus:outline-none focus:border-[#d4e616] transition-colors placeholder:text-zinc-700"
          />
          <MagnifyingGlass size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600" />
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
        <AnimatePresence mode="popLayout">
          {visiblePosts.map((post, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: (i % 9) * 0.05 }}
              key={post.id}
            >
              <Link href={`/blog/${post.id}`} className="group block h-full flex flex-col">
                <article className="h-full flex flex-col">
                  {/* Content */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[#0066FF] font-mono text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-1 border border-[#0066FF]/20">
                        {post.category}
                      </span>
                      <span className="text-zinc-600 font-mono text-[9px] tracking-wider uppercase">{post.date}</span>
                    </div>

                    <h3 className="font-heading text-xl md:text-2xl text-[var(--text-primary)] font-bold mb-4 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="font-sans text-[var(--text-muted-light)] text-sm leading-[1.8] mb-6 line-clamp-3 font-light flex-grow group-hover:text-[var(--text-tertiary)] transition-colors">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--border-subtle)] group-hover:border-[#d4e616]/20 transition-colors">
                      <span className="text-[var(--text-tertiary)] font-mono text-[10px] tracking-widest uppercase">
                        {post.readTime}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[#d4e616]/50 group-hover:bg-accent/5 transition-all">
                        <ArrowUpLeft size={14} className="text-[var(--text-muted-light)] group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="py-32 text-center border-t border-[var(--border-subtle)]">
          <p className="text-zinc-600 font-mono text-sm tracking-widest uppercase">No articles found</p>
        </div>
      )}

      {/* Load More */}
      {visibleCount < filteredPosts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="group px-8 py-4 bg-transparent border border-[var(--border-medium)] text-[var(--text-primary)] font-mono text-[10px] tracking-[0.2em] uppercase hover:border-[#d4e616] hover:text-accent transition-colors flex items-center gap-3"
          >
            <span>تحميل المزيد</span>
            <div className="w-4 h-[1px] bg-[var(--border-strong)] group-hover:bg-accent/50 transition-colors" />
          </button>
        </div>
      )}
    </div>
  );
}
