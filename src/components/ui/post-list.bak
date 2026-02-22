import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Cpu, Code, Globe, Zap, Flag, Shield, Bug, Crosshair,
  Search, Lock, Eye, Wifi, Terminal, Monitor, Server,
  BookOpen, Hash, Database, Binary, Layers, Wrench,
  FileText, Network, Key, Skull, Target, Loader2,
  FlaskConical, Swords, Trophy,
  BookOpen as BookOpenIcon, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
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

// ================================ Tag definitions (keep in sync with Badge.astro) ================================

const TAG_DEFS: Array<{ keywords: string[]; label: string; color: string; icon: React.ComponentType<any> }> = [
  { keywords: ['rust'],                    label: 'Rust',       color: 'bg-orange-950/40 text-orange-300 border-orange-700',   icon: Cpu       },
  { keywords: ['python'],                  label: 'Python',     color: 'bg-blue-950/40   text-blue-300   border-blue-700',     icon: Code      },
  { keywords: ['c'],                       label: 'C',          color: 'bg-purple-950/40 text-purple-300 border-purple-700',   icon: Binary    },
  { keywords: ['cpp', 'c++'],              label: 'C++',        color: 'bg-purple-950/40 text-purple-300 border-purple-700',   icon: Binary    },
  { keywords: ['go'],                      label: 'Go',         color: 'bg-cyan-950/40   text-cyan-300   border-cyan-700',     icon: Code      },
  { keywords: ['javascript', 'js'],        label: 'JS',         color: 'bg-yellow-950/40 text-yellow-300 border-yellow-700',  icon: Code      },
  { keywords: ['typescript', 'ts'],        label: 'TS',         color: 'bg-blue-950/40   text-blue-300   border-blue-700',    icon: Code      },
  { keywords: ['web'],                     label: 'Web',        color: 'bg-cyan-950/40   text-cyan-300   border-cyan-700',    icon: Globe     },
  { keywords: ['sqli'],                    label: 'SQLi',       color: 'bg-red-950/40    text-red-300    border-red-700',     icon: Database  },
  { keywords: ['xss'],                     label: 'XSS',        color: 'bg-yellow-950/40 text-yellow-300 border-yellow-700', icon: Code      },
  { keywords: ['ssrf'],                    label: 'SSRF',       color: 'bg-orange-950/40 text-orange-300 border-orange-700', icon: Network   },
  { keywords: ['lfi'],                     label: 'LFI',        color: 'bg-orange-950/40 text-orange-300 border-orange-700', icon: FileText  },
  { keywords: ['rfi'],                     label: 'RFI',        color: 'bg-orange-950/40 text-orange-300 border-orange-700', icon: Globe     },
  { keywords: ['rce'],                     label: 'RCE',        color: 'bg-red-950/40    text-red-300    border-red-700',    icon: Skull     },
  { keywords: ['pwn'],                     label: 'Pwn',        color: 'bg-red-950/40    text-red-300    border-red-700',    icon: Zap       },
  { keywords: ['rop'],                     label: 'ROP',        color: 'bg-red-950/40    text-red-300    border-red-700',    icon: Layers    },
  { keywords: ['bof'],                     label: 'BoF',        color: 'bg-orange-950/40 text-orange-300 border-orange-700', icon: Zap      },
  { keywords: ['rev', 're'],               label: 'RE',         color: 'bg-purple-950/40 text-purple-300 border-purple-700', icon: Search   },
  { keywords: ['ctf'],                     label: 'CTF',        color: 'bg-green-950/40  text-green-300  border-green-700',  icon: Flag     },
  { keywords: ['htb', 'hackthebox'],       label: 'HTB',        color: 'bg-green-950/40  text-green-300  border-green-700',  icon: Server   },
  { keywords: ['thm', 'tryhackme'],        label: 'THM',        color: 'bg-red-950/40    text-red-300    border-red-700',    icon: Server   },
  { keywords: ['picoctf'],                 label: 'picoCTF',    color: 'bg-blue-950/40   text-blue-300   border-blue-700',   icon: Flag     },
  { keywords: ['nahamcon'],                label: 'NahamCon',   color: 'bg-cyan-950/40   text-cyan-300   border-cyan-700',   icon: Trophy   },
  { keywords: ['pentest'],                 label: 'Pentest',    color: 'bg-emerald-950/40 text-emerald-300 border-emerald-700', icon: Crosshair },
  { keywords: ['red-team'],                label: 'Red Team',   color: 'bg-red-950/40    text-red-300    border-red-700',    icon: Target   },
  { keywords: ['osint'],                   label: 'OSINT',      color: 'bg-cyan-950/40   text-cyan-300   border-cyan-700',   icon: Eye      },
  { keywords: ['network'],                 label: 'Network',    color: 'bg-blue-950/40   text-blue-300   border-blue-700',   icon: Wifi     },
  { keywords: ['crypto'],                  label: 'Crypto',     color: 'bg-purple-950/40 text-purple-300 border-purple-700', icon: Lock     },
  { keywords: ['forensics'],               label: 'Forensics',  color: 'bg-yellow-950/40 text-yellow-300 border-yellow-700', icon: Search  },
  { keywords: ['malware'],                 label: 'Malware',    color: 'bg-red-950/40    text-red-300    border-red-700',    icon: Bug      },
  { keywords: ['steganography', 'stego'],  label: 'Stego',      color: 'bg-indigo-950/40 text-indigo-300 border-indigo-700', icon: Eye     },
  { keywords: ['linux'],                   label: 'Linux',      color: 'bg-orange-950/40 text-orange-300 border-orange-700', icon: Terminal },
  { keywords: ['windows'],                 label: 'Windows',    color: 'bg-blue-950/40   text-blue-300   border-blue-700',   icon: Monitor  },
  { keywords: ['active-directory', 'ad'],  label: 'AD',         color: 'bg-blue-950/40   text-blue-300   border-blue-700',   icon: Server   },
  { keywords: ['privesc'],                 label: 'PrivEsc',    color: 'bg-yellow-950/40 text-yellow-300 border-yellow-700', icon: Key     },
  { keywords: ['recon'],                   label: 'Recon',      color: 'bg-cyan-950/40   text-cyan-300   border-cyan-700',   icon: Search  },
  { keywords: ['persistence'],             label: 'Persistence',color: 'bg-orange-950/40 text-orange-300 border-orange-700', icon: Wrench  },
  { keywords: ['evasion'],                 label: 'Evasion',    color: 'bg-indigo-950/40 text-indigo-300 border-indigo-700', icon: Shield  },
  { keywords: ['exfiltration'],            label: 'Exfil',      color: 'bg-red-950/40    text-red-300    border-red-700',    icon: FileText },
  { keywords: ['cve'],                     label: 'CVE',        color: 'bg-red-950/40    text-red-300    border-red-700',    icon: Bug     },
  { keywords: ['in progress', 'in-progress'], label: 'In Progress', color: 'bg-amber-950/40 text-amber-300 border-amber-600', icon: Loader2 },
  { keywords: ['completed'],               label: 'Completed',  color: 'bg-green-950/40  text-green-300  border-green-700',  icon: Trophy  },
  { keywords: ['archived'],                label: 'Archived',   color: 'bg-neutral-900   text-neutral-400 border-neutral-700', icon: FileText },
  { keywords: ['misc'],                    label: 'Misc',       color: 'bg-neutral-900   text-neutral-400 border-neutral-700', icon: Layers  },
  { keywords: ['tool'],                    label: 'Tool',       color: 'bg-neutral-900   text-neutral-400 border-neutral-700', icon: Wrench  },
  { keywords: ['writeup', 'write-up'],     label: 'Write-up',   color: 'bg-green-950/40  text-green-300  border-green-700',   icon: BookOpenIcon },
  { keywords: ['bludit'],                  label: 'Bludit',     color: 'bg-blue-950/40   text-blue-300   border-blue-700',    icon: BookOpenIcon },
  { keywords: ['passive'],                 label: 'Passive',    color: 'bg-neutral-900   text-neutral-400 border-neutral-700', icon: Eye    },
  { keywords: ['lab'],                     label: 'Lab',        color: 'bg-purple-950/40 text-purple-300 border-purple-700',  icon: FlaskConical },
  { keywords: ['challenge'],               label: 'Challenge',  color: 'bg-yellow-950/40 text-yellow-300 border-yellow-700',  icon: Swords  },
];

function TagBadge({ tag }: { tag: string }) {
  const key = tag.toLowerCase().trim();
  const match = TAG_DEFS.find(d => d.keywords.includes(key));
  const Icon = match?.icon ?? Hash;
  return (
    <Badge color={match?.color}>
      <Icon size={12} />
      {match?.label ?? tag}
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

// React import needed for JSX
import * as React from 'react';
