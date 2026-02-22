import { useState } from 'react';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { resolveTag } from '@/lib/tag-definitions';
import {
  Search, Flag, FileText,
  BookOpen as BookOpenIcon,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ================================ Types ================================

export interface PostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string | null;
  subposts: number;
  href: string;
}

// ================================ TagBadge ================================

function TagBadge({ tag }: { tag: string }) {
  const { color, icon: Icon, label } = resolveTag(tag);
  return (
    <Badge color={color}>
      <Icon size={12} />
      {label}
    </Badge>
  );
}

// ================================ Single PostCard ================================

function PostCard({ post }: { post: PostData }) {
  return (
    <article className="post-card">
      <div className="post-card-inner">
        <div className="post-card-meta">
          <span>{post.date}</span>
          {post.subposts > 0 && (
            <span className="subposts-badge">
              <BookOpenIcon size={12} strokeWidth={2} aria-hidden />
              {post.subposts} section{post.subposts > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <a href={post.href} className="post-card-title">{post.title}</a>
        <p className="post-card-desc">{post.description}</p>
        <div className="post-card-tags">
          {post.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
        </div>
      </div>
      {post.image && (
        <div className="post-card-image-wrap">
          <img src={post.image} alt={post.title} className="post-card-image" loading="lazy" />
        </div>
      )}
    </article>
  );
}

// ================================ PostList ================================

const POSTS_PER_PAGE = 5;

interface PostListProps {
  posts: PostData[];
  allTags: Array<{ tag: string; count: number }>;
  totalPosts: number;
}

export function PostList({ posts, allTags, totalPosts }: PostListProps) {
  const [currentTag, setCurrentTag] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = posts.filter(post => {
    const matchesTag = currentTag === 'all' || post.tags.includes(currentTag);
    const q = search.toLowerCase();
    const matchesSearch = !q ||
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some(t => t.toLowerCase().includes(q));
    return matchesTag && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  function selectTag(tag: string) { setCurrentTag(tag); setPage(1); }
  function handleSearch(val: string) { setSearch(val); setPage(1); }

  return (
    <div className="blog-layout" id="blog-layout">
      {/* Sidebar */}
      <aside className="blog-sidebar">
        {/* Mobile collapse toggle — hidden on desktop via CSS */}
        <button
          className="blog-sidebar-toggle"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(o => !o)}
        >
          <span className="blog-sidebar-toggle-label">
            <FileText size={13} strokeWidth={2} aria-hidden />
            Filters &amp; Tags
          </span>
          {sidebarOpen
            ? <ChevronUp size={16} strokeWidth={2} aria-hidden />
            : <ChevronDown size={16} strokeWidth={2} aria-hidden />
          }
        </button>

        <div className={cn('blog-sidebar-body', sidebarOpen && 'open')}>
          {/* Search */}
          <div>
            <div className="sidebar-section-title">
              <Search size={13} strokeWidth={2} aria-hidden />
              SEARCH
            </div>
            <div className="search-input-wrap">
              <Search size={14} className="search-icon" aria-hidden />
              <input
                type="text"
                className="search-input"
                placeholder="Search posts..."
                autoComplete="off"
                value={search}
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="sidebar-section-title">
              <Flag size={13} strokeWidth={2} aria-hidden />
              TAGS
            </div>
            <div className="tag-list">
              <div
                className={cn('tag-item', currentTag === 'all' && 'active')}
                role="button" tabIndex={0}
                onClick={() => selectTag('all')}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && selectTag('all')}
              >
                <span className="tag-name">all</span>
                <span className="tag-count">{totalPosts}</span>
              </div>
              {allTags.map(({ tag, count }) => (
                <div
                  key={tag}
                  className={cn('tag-item', currentTag === tag && 'active')}
                  role="button" tabIndex={0}
                  onClick={() => selectTag(tag)}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && selectTag(tag)}
                >
                  <TagBadge tag={tag} />
                  <span className="tag-count">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="sidebar-stats">
            <div className="stat-item">
              <span className="stat-value">{totalPosts}</span>
              <div className="stat-label">POSTS</div>
            </div>
            <div className="stat-item">
              <span className="stat-value">{allTags.length}</span>
              <div className="stat-label">TAGS</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Posts */}
      <main>
        {paginated.length === 0 ? (
          <div className="no-results">
            <Search size={40} strokeWidth={1.5} style={{ opacity: 0.4, display: 'block', margin: '0 auto 1rem' }} aria-hidden />
            <p>No posts found</p>
          </div>
        ) : (
          <>
            <div className="post-list">
              {paginated.map(post => <PostCard key={post.slug} post={post} />)}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className={cn('pagination-btn', page === 1 && 'disabled')}
                  onClick={() => { if (page > 1) { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                  aria-label="Previous"
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    className={cn('pagination-btn', n === page && 'active')}
                    onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >
                    {n}
                  </button>
                ))}
                <button
                  className={cn('pagination-btn', page === totalPages && 'disabled')}
                  onClick={() => { if (page < totalPages) { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                  aria-label="Next"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
