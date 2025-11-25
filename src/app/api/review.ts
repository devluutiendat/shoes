// review.api.ts
import Api from './axiosClient';
import { ReviewDto } from '@/interface/reviewDto';
import { CreateReviewDto } from '@/interface/reviewDto';
const REVIEW_API_URL = '/reviews';

export const getReviews = async (reviewDto: ReviewDto) => {
  try {
    const response = await Api.get(`${REVIEW_API_URL}`, { params: reviewDto });
    return response.data;
  } catch (error) {
    console.error('Failed to get reviews:', error);
    throw error;
  }
};

export const createReview = async (createReviewDto: CreateReviewDto) => {
  try {
    const response = await Api.post(`${REVIEW_API_URL}`, createReviewDto);
    return response.data;
  } catch (error) {
    console.error('Failed to create review:', error);
    throw error;
  }
};

export const deleteReview = async (id: number) => {
  try {
    const response = await Api.delete(`${REVIEW_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete review:', error);
    throw error;
  }
};


