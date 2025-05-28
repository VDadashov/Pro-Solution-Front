export const MAIN_URL = "https://prosolution.runasp.net";

export const ENDPOINTS = {
  categories: `${MAIN_URL}/api/categories/all`,
  products: `${MAIN_URL}/api/products/getall`,
  // productsSlug: `${MAIN_URL}/api/products/getbySlug?slug=${slug}  `,
  productsSlug: `${MAIN_URL}/api/products/getbyslug`,
  getAllFiltered: `${MAIN_URL}/api/products/getallfiltered`,

  productsCreateReview: `${MAIN_URL}/api/products/createreview`,
  featureOptions: `${MAIN_URL}/api/featureoptions`,
  sliders: `${MAIN_URL}/api/sliders/all`,
  brand: `${MAIN_URL}/api/brand`,
  partners: `${MAIN_URL}/api/partners/all`,
  about: `${MAIN_URL}/about`,
  register: `${MAIN_URL}/api/auth/register`,
  blogs: `${MAIN_URL}/api/blogs`,
  blogsReviews: `${MAIN_URL}/api/blogs/reviews`,
  authors: `${MAIN_URL}/api/auth/filtered?take=10&page=1&order=5&isActivate=true`,
};
  