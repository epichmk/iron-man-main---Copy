import { blogData } from "@/lib/blogData";
import { HubNavbar } from "@/components/ui/HubNavbar";
import { HubFooter } from "@/components/sections/HubFooter";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

// Generate static routes for all blog posts at build time (SSG)
export async function generateStaticParams() {
  return blogData.map((post) => ({
    id: post.id,
  }));
}

// Generate dynamic metadata for each post for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogData.find((p) => p.id === resolvedParams.id);
  
  if (!post) {
    return { title: 'Post Not Found | إخصاب وإنجاب' };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = blogData.find((p) => p.id === resolvedParams.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] selection:bg-[#0066FF]/30" dir="rtl">
      <HubNavbar />
      
      {/* Article Hero Section (No Image) */}
      <section className="relative w-full pt-40 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="relative z-10 w-full max-w-[800px] mx-auto px-6 md:px-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <span className="text-[#0066FF] font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold px-4 py-2 border border-[#0066FF]/30 bg-[#0066FF]/10 backdrop-blur-md rounded-sm">
                {post.category}
              </span>
              <span className="text-[var(--text-muted)] font-mono text-xs border-r border-[var(--border-subtle)] pr-4">
                {post.date}
              </span>
              <span className="text-[var(--text-muted)] font-mono text-xs border-r border-[var(--border-subtle)] pr-4">
                {post.readTime}
              </span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-[1.2] tracking-tight text-balance">
              {post.title}
            </h1>
            
            <p className="font-sans text-[var(--text-secondary)] text-xl md:text-2xl leading-[1.8] font-light mt-4 max-w-3xl border-r-4 border-[#0066FF] pr-6">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Article Content Area */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 w-full flex justify-center">
        <article 
          className="prose prose-invert prose-lg md:prose-xl max-w-4xl w-full font-sans leading-[2.2] text-justify [text-justify:kashida]
                     prose-headings:font-heading prose-headings:font-bold prose-headings:text-[var(--text-primary)] prose-headings:mt-20 prose-headings:mb-8 prose-headings:tracking-tight prose-headings:text-right
                     prose-p:text-[#A1A1AA] prose-p:mb-8 prose-p:text-justify prose-p:[text-justify:kashida]
                     prose-a:text-[#0066FF] prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-[var(--text-primary)] prose-strong:font-bold
                     prose-ul:list-disc prose-ul:pr-6 prose-ul:mb-8
                     prose-li:text-[#A1A1AA] prose-li:marker:text-[#0066FF] prose-li:text-justify prose-li:[text-justify:kashida]
                     
                     /* Impeccable Typography Polish for Arabic */
                     /* 1. The Lead Paragraph (Editorial Intro) */
                     prose-p:first-of-type:text-2xl md:prose-p:first-of-type:text-3xl prose-p:first-of-type:font-light prose-p:first-of-type:leading-relaxed prose-p:first-of-type:text-[var(--text-primary)] prose-p:first-of-type:border-r-4 prose-p:first-of-type:border-[#0066FF] prose-p:first-of-type:pr-6 prose-p:first-of-type:my-12
                     
                     /* 2. Blockquotes (if any exist naturally) */
                     prose-blockquote:border-r-4 prose-blockquote:border-l-0 prose-blockquote:border-[#0066FF] prose-blockquote:pr-6 prose-blockquote:text-[var(--text-primary)] prose-blockquote:font-light prose-blockquote:text-2xl prose-blockquote:my-16 prose-blockquote:bg-[#0066FF]/5 prose-blockquote:py-6 prose-blockquote:rounded-l-lg
                     
                     /* 3. Smooth Spacing Rhythm */
                     [&>p]:opacity-90 hover:[&>p]:opacity-100 [&>p]:transition-opacity [&>p]:duration-500"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>

      <HubFooter />
    </main>
  );
}
