import { Metadata } from 'next';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import { ReviewForm } from '@/components/ReviewForm';
import { SITE_CONFIG } from '@/lib/config';

export const revalidate = 60;

interface Review {
  _id: string;
  name: string;
  content: string;
  rating: number;
  reviewDate?: string;
}

async function getApprovedReviews(): Promise<Review[]> {
  return client.fetch(
    groq`*[_type == "review" && approved == true] | order(reviewDate desc, _createdAt desc){
      _id,
      name,
      content,
      rating,
      reviewDate
    }`
  );
}

async function getAverageRating(): Promise<{ average: number; count: number }> {
  const result = await client.fetch(
    groq`{
      "count": count(*[_type == "review" && approved == true]),
      "total": math::sum(*[_type == "review" && approved == true].rating)
    }`
  );
  return {
    count: result.count || 0,
    average: result.count > 0 ? result.total / result.count : 0
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { average, count } = await getAverageRating();
  const ratingText =
    count > 0 ? `${average.toFixed(1)}/5 (${count} értékelés)` : '';

  return {
    title: `Vélemények | ${SITE_CONFIG.name}`,
    description: `Olvasd el ügyfeleim véleményét és oszd meg a saját tapasztalataidat. ${ratingText}`,
    openGraph: {
      title: `Vélemények | ${SITE_CONFIG.name}`,
      description: `Olvasd el ügyfeleim véleményét és oszd meg a saját tapasztalataidat.`,
      type: 'website'
    }
  };
}

export default async function ReviewsPage() {
  const [reviews, stats] = await Promise.all([
    getApprovedReviews(),
    getAverageRating()
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
      {/* Header Section */}
      <section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Vélemények
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Olvasd el, mit mondanak rólam az ügyfeleim, és oszd meg te is a
              tapasztalataidat!
            </p>

            {/* Average Rating Display */}
            {stats.count > 0 && (
              <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(stats.average)
                          ? 'text-yellow-400'
                          : 'text-gray-200'
                      }
                    />
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.average.toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {stats.count} értékelés alapján
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Reviews List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Ügyfeleim véleményei
            </h2>

            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="relative bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <FaQuoteLeft className="absolute top-6 right-6 text-pink-100 text-3xl" />
                    <div className="relative">
                      {/* Rating Stars */}
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < review.rating
                                ? 'text-yellow-400'
                                : 'text-gray-200'
                            }
                          />
                        ))}
                      </div>

                      {/* Review Content */}
                      <p className="text-gray-700 italic mb-4 leading-relaxed">
                        &quot;{review.content}&quot;
                      </p>

                      {/* Reviewer Info */}
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900">
                          - {review.name}
                        </p>
                        {review.reviewDate && (
                          <p className="text-sm text-gray-400">
                            {new Date(review.reviewDate).toLocaleDateString(
                              'hu-HU',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500">
                  Még nincsenek vélemények. Légy te az első, aki értékel!
                </p>
              </div>
            )}
          </div>

          {/* Review Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Írj véleményt
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  Oszd meg velünk a tapasztalataidat! A véleményed segít
                  másoknak a döntésben.
                </p>
                <ReviewForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
