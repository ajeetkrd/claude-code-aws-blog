'use client';

import { useState, useEffect } from 'react';

interface CommentCountProps {
  postId: string;
}

/**
 * CommentCount - Client component to display comment count from localStorage
 * Displays as an AWS-themed badge next to reading time
 */
export default function CommentCount({ postId }: CommentCountProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const key = `blog-comments-${postId}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        const comments = JSON.parse(stored);
        setCount(comments.length);
      } catch {
        setCount(0);
      }
    }
  }, [postId]);

  // Don't render if no comments
  if (count === 0) return null;

  return (
    <>
      <style jsx>{`
        .comment-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: var(--aws-orange);
          color: white;
          padding: 0.375rem 0.75rem;
          border-radius: 1.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
        }

        .comment-count-badge:hover {
          background: var(--aws-blue);
          transform: translateY(-1px);
        }

        .comment-icon {
          font-size: 0.875rem;
        }
      `}</style>
      <span className="comment-count-badge">
        <span className="comment-icon">💬</span>
        <span>{count}</span>
      </span>
    </>
  );
}
