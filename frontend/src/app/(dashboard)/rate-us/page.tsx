'use client';
import { useState } from 'react';
import { Star, Send, CheckCircle, Loader2 } from 'lucide-react';

const ratingLabels = ['', 'Very Bad', 'Bad', 'Okay', 'Good', 'Excellent'];

export default function RateUsPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const feedbackCategories = ['Job Matching', 'Payment Speed', 'App Experience', 'Customer Support', 'Task Quality', 'Earnings'];

  const toggleCategory = (cat: string) => {
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="text-yellow-500 fill-yellow-400" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You! ⭐</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Your feedback helps us improve AdSky for everyone. We truly appreciate your time!</p>
        <div className="flex justify-center gap-1 mb-4">
          {[1,2,3,4,5].map(i => <Star key={i} size={24} className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />)}
        </div>
        <p className="text-lg font-bold text-gray-700 dark:text-gray-300">{ratingLabels[rating]}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
          <Star size={20} className="text-yellow-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rate Us</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Share your experience with AdSky</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-7 shadow-sm space-y-7">
        {/* Star Rating */}
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">How would you rate your experience?</p>
          <div className="flex justify-center gap-3 mb-2">
            {[1, 2, 3, 4, 5].map(i => (
              <button
                key={i} type="button"
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)}
                onClick={() => setRating(i)}
                className="transition-all hover:scale-110"
              >
                <Star
                  size={40}
                  className={`transition-all ${(hover || rating) >= i ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                />
              </button>
            ))}
          </div>
          {(hover || rating) > 0 && (
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{ratingLabels[hover || rating]}</p>
          )}
        </div>

        {/* Category Tags */}
        <div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">What are you rating? (optional)</p>
          <div className="flex flex-wrap gap-2">
            {feedbackCategories.map(cat => (
              <button key={cat} type="button" onClick={() => toggleCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  categories.includes(cat) 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Text */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tell us more (optional)</label>
          <textarea
            value={feedback} onChange={e => setFeedback(e.target.value)}
            rows={4} placeholder="What did you love? What can we improve?"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm transition-all resize-none"
          />
        </div>

        <button type="submit" disabled={rating === 0 || isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg disabled:opacity-50 transition-all"
        >
          {isLoading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><Send size={16} /> Submit Feedback</>}
        </button>

        {rating === 0 && <p className="text-center text-xs text-gray-400">Please select a star rating to submit</p>}
      </form>
    </div>
  );
}
