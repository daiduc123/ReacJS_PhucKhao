// API Service cho đăng nhập theo role
import { apiClientNoAuth } from './apiClient';

/**
 * Đăng nhập Sinh viên
 */
export const loginSinhVien = async (username, password) => {
  try {
    const response = await apiClientNoAuth.post('/sinhvien/login', {
      username,
      password
    });
    
    // Lưu token
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    // Map role từ backend (SINHVIEN) sang frontend (Sinh viên)
    const roleMap = {
      'SINHVIEN': 'Sinh viên',
      'ADMIN': 'Admin',
      'CVKT': 'Chuyên viên khảo thí',
      'TROLY': 'Trợ lý đào tạo'
    };
    
    return {
      success: true,
      token: response.data.token,
      user: {
        username: response.data.username,
        fullName: response.data.fullName,
        role: roleMap[response.data.role] || response.data.role || 'Sinh viên'
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Đăng nhập thất bại'
    };
  }
};

/**
 * Đăng nhập Admin
 */
export const loginAdmin = async (username, password) => {
  try {
    const response = await apiClientNoAuth.post('/admin/login', {
      username,
      password
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    const roleMap = {
      'SINHVIEN': 'Sinh viên',
      'ADMIN': 'Admin',
      'CVKT': 'Chuyên viên khảo thí',
      'TROLY': 'Trợ lý đào tạo'
    };
    
    return {
      success: true,
      token: response.data.token,
      user: {
        username: response.data.username,
        fullName: response.data.fullName,
        role: roleMap[response.data.role] || response.data.role || 'Admin'
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Đăng nhập thất bại'
    };
  }
};

/**
 * Đăng nhập Chuyên viên khảo thí
 */
export const loginCVKT = async (username, password) => {
  try {
    const response = await apiClientNoAuth.post('/cvkt/login', {
      username,
      password
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    const roleMap = {
      'SINHVIEN': 'Sinh viên',
      'ADMIN': 'Admin',
      'CVKT': 'Chuyên viên khảo thí',
      'TROLY': 'Trợ lý đào tạo'
    };
    
    return {
      success: true,
      token: response.data.token,
      user: {
        username: response.data.username,
        fullName: response.data.fullName,
        role: roleMap[response.data.role] || response.data.role || 'Chuyên viên khảo thí'
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Đăng nhập thất bại'
    };
  }
};

/**
 * Đăng nhập Trợ lý đào tạo
 */
export const loginTroLy = async (username, password) => {
  try {
    const response = await apiClientNoAuth.post('/troly/login', {
      username,
      password
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    const roleMap = {
      'SINHVIEN': 'Sinh viên',
      'ADMIN': 'Admin',
      'CVKT': 'Chuyên viên khảo thí',
      'TROLY': 'Trợ lý đào tạo'
    };
    
    return {
      success: true,
      token: response.data.token,
      user: {
        username: response.data.username,
        fullName: response.data.fullName,
        role: roleMap[response.data.role] || response.data.role || 'Trợ lý đào tạo'
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Đăng nhập thất bại'
    };
  }
};


/**
 * Đăng nhập tự động phát hiện role (cho trang đăng nhập cán bộ)
 * Thử đăng nhập với tất cả các role cán bộ
 */
export const loginCanBo = async (username, password) => {
  // Thử đăng nhập với từng role
  const roles = [
    { name: 'Admin', loginFn: loginAdmin },
    { name: 'Chuyên viên khảo thí', loginFn: loginCVKT },
    { name: 'Trợ lý đào tạo', loginFn: loginTroLy }
  ];

  for (const role of roles) {
    const result = await role.loginFn(username, password);
    if (result.success) {
      return result;
    }
  }

  return {
    success: false,
    message: 'Tên đăng nhập hoặc mật khẩu không đúng'
  };
};

