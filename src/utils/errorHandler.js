/**
 * Utility functions for error handling
 */

/**
 * Format error message for user display
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export const formatErrorMessage = (error) => {
  if (!error) return 'Đã xảy ra lỗi không xác định.';

  // Network errors
  if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network')) {
    return 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.';
  }

  // Timeout errors
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return 'Request quá thời gian chờ. Vui lòng thử lại.';
  }

  // HTTP errors
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.message;

    switch (status) {
      case 400:
        return message || 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.';
      case 401:
        return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
      case 403:
        return 'Bạn không có quyền thực hiện thao tác này.';
      case 404:
        return 'Không tìm thấy dữ liệu.';
      case 500:
        return 'Lỗi server. Vui lòng thử lại sau.';
      case 503:
        return 'Server đang bảo trì. Vui lòng thử lại sau.';
      default:
        return message || `Lỗi ${status}. Vui lòng thử lại.`;
    }
  }

  // Generic error message
  return error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';
};

/**
 * Log error for debugging (only in development)
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 */
export const logError = (error, context = '') => {
  if (import.meta.env.DEV) {
    const timestamp = new Date().toISOString();
    const errorInfo = {
      timestamp,
      context,
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    };
    console.error(`[${timestamp}] Error in ${context}:`, errorInfo);
  }
  // In production, send to error tracking service (Sentry, LogRocket, etc.)
  // Example: Sentry.captureException(error, { tags: { context } });
};

/**
 * Handle API error and return user-friendly message
 * @param {Error} error - Error object
 * @param {string} defaultMessage - Default message if error cannot be parsed
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error, defaultMessage = 'Đã xảy ra lỗi. Vui lòng thử lại.') => {
  logError(error, 'API Call');
  return formatErrorMessage(error) || defaultMessage;
};

