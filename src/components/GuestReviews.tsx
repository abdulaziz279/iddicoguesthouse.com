import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Plus, Sparkles, Filter, X } from 'lucide-react';
import { useGuestHouse } from '../context/GuestHouseContext';

export const GuestReviews: React.FC = () => {
  const { reviews, addReview } = useGuestHouse();
  const [filterRoom, setFilterRoom] = useState<string>('all');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Form State
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerOrigin, setReviewerOrigin] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerRoom, setReviewerRoom] = useState('The Standard Haven');
  const [reviewerComment, setReviewerComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredReviews = reviews.filter(rev => {
    if (filterRoom === 'all') return true;
    return rev.roomType.toLowerCase().includes(filterRoom.toLowerCase());
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    addReview({
      name: reviewerName.trim(),
      origin: reviewerOrigin.trim() || 'Guest from Ghana',
      rating: reviewerRating,
      roomType: reviewerRoom,
      comment: reviewerComment.trim()
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsWriteReviewOpen(false);
      setReviewerName('');
      setReviewerOrigin('');
      setReviewerComment('');
      setReviewerRating(5);
    }, 1500);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
              Verified Guest Experiences
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
              Guest Reviews & Testimonials
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Authentic stories from guests who found rest, peace, and reliable comfort at Iddico Guest House.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Average Rating Scorecard */}
            <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 rounded-2xl border border-amber-200">
              <div className="text-3xl font-display font-bold text-amber-800">
                4.9
              </div>
              <div>
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                  ))}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Over {reviews.length * 15}+ Happy Stays
                </div>
              </div>
            </div>

            {/* Write a Review Button */}
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="px-4 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Share Your Review</span>
            </button>
          </div>
        </div>

        {/* Room Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-amber-600" />
            Filter by:
          </span>
          <button
            onClick={() => setFilterRoom('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterRoom === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setFilterRoom('Standard')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterRoom === 'Standard'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            The Standard Room (GH₵ 100)
          </button>
          <button
            onClick={() => setFilterRoom('Deluxe')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filterRoom === 'Deluxe'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            The Deluxe Executive Room (GH₵ 170)
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 font-bold font-display flex items-center justify-center text-sm shadow-xs">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-stone-900 text-base leading-tight">
                        {rev.name}
                      </h4>
                      <p className="text-xs text-stone-500">{rev.origin}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-emerald-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Guest</span>
                  </div>
                </div>

                {/* Stars and Room tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-400 stroke-amber-500'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                    Stayed in {rev.roomType}
                  </span>
                </div>

                <p className="text-stone-700 text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/80 text-[11px] text-stone-400 text-right">
                Reviewed on {rev.date}
              </div>
            </div>
          ))}
        </div>

        {/* Write a Review Modal */}
        {isWriteReviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 text-stone-800 animate-in zoom-in-95">
              <button
                onClick={() => setIsWriteReviewOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-2xl font-bold text-stone-900 mb-1">
                Share Your Experience
              </h3>
              <p className="text-xs text-stone-600 mb-5">
                We value your honest feedback to keep our Ghanaian hospitality standards high.
              </p>

              {submitSuccess ? (
                <div className="py-8 text-center text-emerald-700 space-y-2">
                  <CheckCircle className="w-12 h-12 mx-auto text-emerald-600" />
                  <h4 className="font-display font-bold text-lg">Medaase! Thank You!</h4>
                  <p className="text-xs text-stone-600">Your review has been successfully posted.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="e.g. Ama Serwaa"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Where are you visiting from?</label>
                    <input
                      type="text"
                      value={reviewerOrigin}
                      onChange={(e) => setReviewerOrigin(e.target.value)}
                      placeholder="e.g. Tema, Ghana or Atlanta, USA"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Rating</label>
                      <select
                        value={reviewerRating}
                        onChange={(e) => setReviewerRating(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                        <option value={3}>⭐⭐⭐ (3 - Average)</option>
                        <option value={2}>⭐⭐ (2 - Needs Work)</option>
                        <option value={1}>⭐ (1 - Poor)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Room Stayed</label>
                      <select
                        value={reviewerRoom}
                        onChange={(e) => setReviewerRoom(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500"
                      >
                        <option value="The Standard Room">Standard Room (GH₵ 100)</option>
                        <option value="The Deluxe Executive Room">Deluxe Executive Room (GH₵ 170)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Feedback / Review *</label>
                    <textarea
                      required
                      rows={4}
                      value={reviewerComment}
                      onChange={(e) => setReviewerComment(e.target.value)}
                      placeholder="Tell future guests about your stay, room cleanliness, Wi-Fi, front desk support..."
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
