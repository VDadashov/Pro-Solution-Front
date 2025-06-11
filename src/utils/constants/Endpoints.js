export const MAIN_URL = "https://prosolution.runasp.net";

export const ENDPOINTS = {
  categories: `${MAIN_URL}/api/categories/all`,
  products: `${MAIN_URL}/api/products/getall`,
  productsSlug: `${MAIN_URL}/api/products/getbyslug`,
  getAllFiltered: `${MAIN_URL}/api/products/getallfiltered`,
  productsCreateReview: `${MAIN_URL}/api/products/createreview`,
  featureOptions: `${MAIN_URL}/api/featureoptions`,
  setting: `${MAIN_URL}/api/settings`,
  settings: `${MAIN_URL}/api/settings/all`,
  sliders: `${MAIN_URL}/api/sliders/all`,
  brand: `${MAIN_URL}/api/brand`,
  partners: `${MAIN_URL}/api/partners/all`,
  about: `${MAIN_URL}/about`,
  register: `${MAIN_URL}/api/auth/register`,
  blogs: `${MAIN_URL}/api/blogs/filtered`,
  blogsGetOne: `${MAIN_URL}/api/blogs`,

  blogsReviews: `${MAIN_URL}/api/blogs/reviews`,
  authors: `${MAIN_URL}/api/auth/filtered?take=10&page=1&order=5&isActivate=true`,
  contact: `${MAIN_URL}/api/contactus/contact`,
  basket: `${MAIN_URL}/api/baskets`,
// Authentication Endpoints
  register: `${MAIN_URL}/api/auth/register`,
  login: `${MAIN_URL}/api/auth/login`,
  logout: `${MAIN_URL}/api/auth/logout`,
  'is-authenticated': `${MAIN_URL}/api/auth/is-authenticated`,
  forgotpassword: `${MAIN_URL}/api/auth/forgot-password`,
  resetpassword: `${MAIN_URL}/api/auth/reset-password`,
};
  