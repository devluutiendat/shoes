export interface CreateReviewDto {
    rating: number;
    comment: string;
    orderId: number;
    userId: number;
}

export interface ReviewDto{
    page:number;
    limit: number;
    productId:number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
  };
}
