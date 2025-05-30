
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FeedbackRatingSection = () => {
  const { t, isRTL } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { rating, feedback });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <Star
          key={index}
          size={32}
          className={`cursor-pointer transition-colors ${
            starValue <= (hoveredRating || rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300 hover:text-yellow-400'
          }`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
        />
      );
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            Share Your Feedback
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            Help us improve SmartLine by sharing your experience and rating our service
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div className="text-center">
              <label className={`block text-lg font-medium text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                Rate Your Experience
              </label>
              <div className="flex justify-center space-x-2 mb-2">
                {renderStars()}
              </div>
              {rating > 0 && (
                <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              )}
            </div>

            {/* Feedback Text */}
            <div>
              <label htmlFor="feedback" className={`block text-lg font-medium text-gray-900 mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                Your Feedback
              </label>
              <textarea
                id="feedback"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience with SmartLine..."
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={rating === 0 || !feedback.trim()}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitted ? 'Thank You!' : 'Submit Feedback'}
              </button>
            </div>

            {submitted && (
              <div className="text-center">
                <p className={`text-green-600 font-medium ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  Thank you for your feedback! We appreciate your input.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className={`text-gray-500 text-sm ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            Your feedback helps us provide better service to all our users
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeedbackRatingSection;
