import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// English translations
const en = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    reset: 'Reset',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    open: 'Open',
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember me',
    loginSuccess: 'Login successful',
    loginError: 'Login failed',
    logoutSuccess: 'Logout successful',
    invalidCredentials: 'Invalid email or password',
  },
  navigation: {
    home: 'Home',
    about: 'About',
    profile: 'Profile',
    settings: 'Settings',
    users: 'Users',
    dashboard: 'Dashboard',
    features: 'Features Demo'
  },
  user: {
    name: 'Name',
    email: 'Email',
    role: 'Role',
    avatar: 'Avatar',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    actions: 'Actions',
  },
  validation: {
    required: 'This field is required',
    emailInvalid: 'Please enter a valid email',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordsNotMatch: 'Passwords do not match',
  },
  errors: {
    generic: 'Something went wrong',
    network: 'Network error',
    unauthorized: 'Unauthorized access',
    forbidden: 'Access forbidden',
    notFound: 'Not found',
    serverError: 'Internal server error',
  },
}

// Chinese translations
const zh = {
  common: {
    loading: '加载中...',
    error: '错误',
    success: '成功',
    warning: '警告',
    info: '信息',
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    create: '创建',
    search: '搜索',
    filter: '过滤',
    reset: '重置',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    close: '关闭',
    open: '打开',
  },
  auth: {
    login: '登录',
    logout: '登出',
    register: '注册',
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    forgotPassword: '忘记密码？',
    rememberMe: '记住我',
    loginSuccess: '登录成功',
    loginError: '登录失败',
    logoutSuccess: '登出成功',
    invalidCredentials: '邮箱或密码错误',
  },
  navigation: {
    home: '首页',
    about: '关于',
    profile: '个人资料',
    settings: '设置',
    users: '用户',
    dashboard: '仪表板',
    features: '功能展示',
  },
  user: {
    name: '姓名',
    email: '邮箱',
    role: '角色',
    avatar: '头像',
    createdAt: '创建时间',
    updatedAt: '更新时间',
    actions: '操作',
  },
  validation: {
    required: '此字段为必填项',
    emailInvalid: '请输入有效的邮箱地址',
    passwordTooShort: '密码至少需要6个字符',
    passwordsNotMatch: '密码不匹配',
  },
  errors: {
    generic: '出现错误',
    network: '网络错误',
    unauthorized: '未经授权的访问',
    forbidden: '访问被禁止',
    notFound: '未找到',
    serverError: '内部服务器错误',
  },
}

const resources = {
  en: { translation: en },
  zh: { translation: zh },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
