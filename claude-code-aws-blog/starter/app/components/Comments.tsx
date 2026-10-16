'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

interface CommentsProps {
  postId: string;
}

/**
 * Get comment count for a post (for use in PostCard)
 * This function can be called from server components
 */
export function getCommentCount(postId: string): number {
  if (typeof window === 'undefined') return 0;

  const key = `blog-comments-${postId}`;
  const stored = localStorage.getItem(key);

  if (!stored) return 0;

  try {
    const comments: Comment[] = JSON.parse(stored);
    return comments.length;
  } catch {
    return 0;
  }
}

/**
 * Comments section component with AWS-themed styling
 * Client component - uses localStorage for comment persistence
 */
export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load comments from localStorage on mount
  useEffect(() => {
    const key = `blog-comments-${postId}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        const parsed: Comment[] = JSON.parse(stored);
        setComments(parsed);
      } catch (error) {
        console.error('Failed to parse comments:', error);
      }
    }
  }, [postId]);

  // Save comments to localStorage
  const saveComments = (newComments: Comment[]) => {
    const key = `blog-comments-${postId}`;
    localStorage.setItem(key, JSON.stringify(newComments));
    setComments(newComments);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    const updatedComments = [newComment, ...comments];
    saveComments(updatedComments);

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className="comments-section">
      <style jsx>{`
        .comments-section {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 2px solid var(--aws-light-gray);
        }

        .comments-header {
          font-size: 2rem;
          font-weight: 700;
          color: var(--aws-dark);
          margin-bottom: 0.5rem;
        }

        .comments-count {
          color: var(--aws-dark-gray);
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .comment-form {
          background: var(--aws-light-gray);
          padding: 2rem;
          border-radius: 0.75rem;
          margin-bottom: 3rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: var(--aws-dark);
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.3s ease;
          background: white;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--aws-orange);
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .submit-button {
          background: var(--aws-orange);
          color: white;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .submit-button:hover:not(:disabled) {
          background: var(--aws-blue);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 153, 0, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .comment-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: border-color 0.3s ease;
        }

        .comment-card:hover {
          border-color: var(--aws-orange);
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .comment-author {
          font-weight: 700;
          color: var(--aws-dark);
          font-size: 1.125rem;
        }

        .comment-date {
          color: var(--aws-dark-gray);
          font-size: 0.875rem;
        }

        .comment-message {
          color: var(--aws-dark);
          line-height: 1.6;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .no-comments {
          text-align: center;
          padding: 3rem 2rem;
          color: var(--aws-dark-gray);
          font-style: italic;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .comments-section {
            margin-top: 3rem;
            padding-top: 2rem;
          }

          .comments-header {
            font-size: 1.5rem;
          }

          .comment-form {
            padding: 1.5rem;
          }

          .form-group {
            margin-bottom: 1rem;
          }

          .submit-button {
            width: 100%;
          }

          .comment-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      {/* Section Header */}
      <h2 className="comments-header">Comments</h2>
      <p className="comments-count">
        {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
      </p>

      {/* Comment Form */}
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name *
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message *
          </label>
          <textarea
            id="message"
            className="form-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts..."
            required
            disabled={isSubmitting}
          />
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <span className="comment-author">{comment.name}</span>
                <span className="comment-date">{formatDate(comment.timestamp)}</span>
              </div>
              <p className="comment-message">{comment.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-comments">
          No comments yet. Be the first to share your thoughts!
        </div>
      )}
    </section>
  );
}
