import { createContext, useContext, useState, ReactNode } from 'react';
import { Review } from '@/types/review';
import { mockReviews } from '@/data/reviews';

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'upvotes' | 'likedBy'>) => void;
  updateReview: (id: string, review: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  toggleLike: (id: string, userId: string) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const addReview = (newReview: Omit<Review, 'id' | 'createdAt' | 'upvotes' | 'likedBy'>) => {
    const review: Review = {
      ...newReview,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      upvotes: 0,
      likedBy: [],
    };
    setReviews(prev => [review, ...prev]);
  };

  const updateReview = (id: string, updatedReview: Partial<Review>) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === id ? { ...review, ...updatedReview } : review
      )
    );
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(review => review.id !== id));
  };

  const toggleLike = (id: string, userId: string) => {
    setReviews(prev =>
      prev.map(review => {
        if (review.id === id) {
          const hasLiked = review.likedBy.includes(userId);
          const newLikedBy = hasLiked
            ? review.likedBy.filter(id => id !== userId)
            : [...review.likedBy, userId];
          
          return {
            ...review,
            likedBy: newLikedBy,
            upvotes: hasLiked ? review.upvotes - 1 : review.upvotes + 1,
          };
        }
        return review;
      })
    );
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, updateReview, deleteReview, toggleLike }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
}