import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { BLOG_POSTS } from './HealthBlog';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(post => post.id === id);

  if (!post) {
    return (
      <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold">Blog Post Not Found</h2>
          <p className="text-neutral-600 dark:text-neutral-300 mt-4">Sorry, we couldn't find that blog post.</p>
          <Link
            to="/health-blog"
            className="inline-flex items-center px-4 py-2 mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex justify-center items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm">
            <BookOpenIcon className="w-5 h-5 mr-2" />
            <span>{post.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 bg-clip-text text-transparent leading-tight">
            {post.title}
          </h1>
          <div className="flex justify-center items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
            <ClockIcon className="w-4 h-4 text-indigo-500" />
            <span className="font-medium">Published {new Date(post.publicationDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xl rounded-3xl border border-blue-100/50 dark:border-neutral-700/50 shadow-2xl p-8">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl mb-6"
          />
          <div
            className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <Link
            to="/health-blog"
            className="inline-flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;