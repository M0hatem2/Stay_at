/**
 * Registration API and File Configuration
 */

export const API_CONFIG = {
  // User registration endpoints
  REGISTER: '/api/auth/register',
  VALIDATE_EMAIL: '/api/auth/validate-email',
  VALIDATE_USERNAME: '/api/auth/validate-username',
  SEND_OTP: '/api/auth/send-otp',
  VERIFY_OTP: '/api/auth/verify-otp',
  
  // Account type specific endpoints
  BROKER_REGISTER: '/api/auth/register/broker',
  DEVELOPER_REGISTER: '/api/auth/register/developer',
  OWNER_REGISTER: '/api/auth/register/owner',
  SEEKER_REGISTER: '/api/auth/register/seeker',
} as const;

export const FILE_CONFIG = {
  // Maximum file sizes (in bytes)
  MAX_PROFILE_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_DOCUMENT_SIZE: 10 * 1024 * 1024, // 10MB
  
  // Allowed file types
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  
  // Upload endpoints
  UPLOAD_PROFILE_IMAGE: '/api/upload/profile-image',
  UPLOAD_DOCUMENT: '/api/upload/document',
} as const;
