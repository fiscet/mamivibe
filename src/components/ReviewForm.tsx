'use client';

import { useActionState, useState } from 'react';
import { FaStar, FaPaperPlane } from 'react-icons/fa';
import { submitReview, ReviewFormState } from '@/app/reviews/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const initialState: ReviewFormState = {
  success: false,
  message: ''
};

export function ReviewForm() {
  const [state, formAction, isPending] = useActionState(
    submitReview,
    initialState
  );
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Reset form on success
  const handleSubmit = (formData: FormData) => {
    formData.set('rating', rating.toString());
    formAction(formData);
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="review-name" className="text-gray-700 font-medium">
          Neved <span className="text-pink-500">*</span>
        </Label>
        <Input
          id="review-name"
          name="name"
          type="text"
          placeholder="Írd be a neved"
          required
          minLength={2}
          className="border-gray-200 focus:border-pink-400 focus:ring-pink-400"
          disabled={isPending || state.success}
        />
      </div>

      {/* Star Rating */}
      <div className="space-y-2">
        <Label className="text-gray-700 font-medium">
          Értékelés <span className="text-pink-500">*</span>
        </Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              disabled={isPending || state.success}
              className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 rounded disabled:opacity-50"
              aria-label={`${star} csillag`}
            >
              <FaStar
                className={`text-3xl transition-colors ${
                  star <= (hoverRating || rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
        {rating > 0 && (
          <p className="text-sm text-gray-500">
            {rating === 1 && 'Gyenge'}
            {rating === 2 && 'Elfogadható'}
            {rating === 3 && 'Jó'}
            {rating === 4 && 'Nagyon jó'}
            {rating === 5 && 'Kiváló'}
          </p>
        )}
      </div>

      {/* Review Content */}
      <div className="space-y-2">
        <Label htmlFor="review-content" className="text-gray-700 font-medium">
          Véleményed <span className="text-pink-500">*</span>
        </Label>
        <Textarea
          id="review-content"
          name="content"
          placeholder="Oszd meg velünk a tapasztalataidat..."
          required
          minLength={10}
          rows={4}
          className="border-gray-200 focus:border-pink-400 focus:ring-pink-400 resize-none"
          disabled={isPending || state.success}
        />
      </div>

      {/* Status Message */}
      {state.message && (
        <div
          className={`p-4 rounded-lg ${
            state.success
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {state.message}
        </div>
      )}

      {/* Submit Button */}
      {!state.success && (
        <Button
          type="submit"
          disabled={isPending || rating === 0}
          className="w-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-semibold py-3 rounded-full shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Küldés...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FaPaperPlane />
              Értékelés küldése
            </span>
          )}
        </Button>
      )}
    </form>
  );
}
