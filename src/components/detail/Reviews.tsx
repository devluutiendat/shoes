import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { Review } from "@/interface/reviewDto";

interface ReviewListProps {
  productId: number;
}

export default function Reviews({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          `/api/reviews?productId=${productId}&page=${page}&pageSize=${pageSize}`
        );
        const data = await response.json();
        setReviews(data.reviews);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    fetchReviews();
  }, [productId, page]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="border-b py-2">
              <p className="font-semibold">{review.user.name}</p>
              <p>Rating: {review.rating} / 5</p>
              <p>{review.comment}</p>
              <p className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
