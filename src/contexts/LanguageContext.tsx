import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'ar' | 'en' | 'hi' | 'ur';

type Translations = {
  [key: string]: {
    ar: string;
    en: string;
    hi: string;
    ur: string;
  };
};

// Initial translations dictionary
const translations: Translations = {
  welcome: {
    ar: 'مرحبًا بك في موقع مهران للخدمات اللوجستية',
    en: 'Welcome to Mihran Logistics Services',
    hi: 'मिहरान लॉजिस्टिक्स सेवाओं में आपका स्वागत है',
    ur: 'مہران لوجسٹکس سروسز میں خوش آمدید',
  },
  admin: {
    ar: 'الإدارة',
    en: 'Admin',
    hi: 'प्रशासन',
    ur: 'ایڈمن',
  },
  managers: {
    ar: 'المدراء',
    en: 'Managers',
    hi: 'प्रबंधक',
    ur: 'مینیجرز',
  },
  supervisors: {
    ar: 'المشرفين',
    en: 'Supervisors',
    hi: 'पर्यवेक्षक',
    ur: 'سپروائزرز',
  },
  agents: {
    ar: 'المناديب',
    en: 'Agents',
    hi: 'एजेंट्स',
    ur: 'ایجنٹس',
  },
  login: {
    ar: 'تسجيل الدخول',
    en: 'Login',
    hi: 'लॉगिन',
    ur: 'لاگ ان',
  },
  username: {
    ar: 'اسم المستخدم',
    en: 'Username',
    hi: 'उपयोगकर्ता नाम',
    ur: 'صارف نام',
  },
  password: {
    ar: 'كلمة المرور',
    en: 'Password',
    hi: 'पासवर्ड',
    ur: 'پاس ورڈ',
  },
  submit: {
    ar: 'إرسال',
    en: 'Submit',
    hi: 'जमा करें',
    ur: 'جمع کرائیں',
  },
  dashboard: {
    ar: 'لوحة التحكم',
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    ur: 'ڈیش بورڈ',
  },
  users: {
    ar: 'المستخدمين',
    en: 'Users',
    hi: 'उपयोगकर्ता',
    ur: 'صارفین',
  },
  ticketTypes: {
    ar: 'أنواع التذاكر',
    en: 'Ticket Types',
    hi: 'टिकट प्रकार',
    ur: 'ٹکٹ کی اقسام',
  },
  reports: {
    ar: 'التقارير',
    en: 'Reports',
    hi: 'रिपोर्ट',
    ur: 'رپورٹس',
  },
  logout: {
    ar: 'تسجيل الخروج',
    en: 'Logout',
    hi: 'लॉगआउट',
    ur: 'لاگ آؤٹ',
  },
  firstName: {
    ar: 'الاسم',
    en: 'First Name',
    hi: 'पहला नाम',
    ur: 'پہلا نام',
  },
  lastName: {
    ar: 'اللقب',
    en: 'Last Name',
    hi: 'उपनाम',
    ur: 'آخری نام',
  },
  region: {
    ar: 'المنطقة',
    en: 'Region',
    hi: 'क्षेत्र',
    ur: 'علاقہ',
  },
  idNumber: {
    ar: 'رقم الهوية',
    en: 'ID Number',
    hi: 'पहचान संख्या',
    ur: 'شناختی نمبر',
  },
  addUser: {
    ar: 'إضافة مستخدم',
    en: 'Add User',
    hi: 'उपयोगकर्ता जोड़ें',
    ur: 'صارف شامل کریں',
  },
  role: {
    ar: 'الدور',
    en: 'Role',
    hi: 'भूमिका',
    ur: 'کردار',
  },
  status: {
    ar: 'الحالة',
    en: 'Status',
    hi: 'स्थिति',
    ur: 'حالت',
  },
  pending: {
    ar: 'قيد الانتظار',
    en: 'Pending',
    hi: 'लंबित',
    ur: 'زیر التواء',
  },
  approved: {
    ar: 'معتمد',
    en: 'Approved',
    hi: 'स्वीकृत',
    ur: 'منظور شدہ',
  },
  rejected: {
    ar: 'مرفوض',
    en: 'Rejected',
    hi: 'अस्वीकृत',
    ur: 'مسترد',
  },
  actions: {
    ar: 'إجراءات',
    en: 'Actions',
    hi: 'कार्रवाई',
    ur: 'اقدامات',
  },
  approve: {
    ar: 'قبول',
    en: 'Approve',
    hi: 'स्वीकार करें',
    ur: 'منظور کریں',
  },
  reject: {
    ar: 'رفض',
    en: 'Reject',
    hi: 'अस्वीकार',
    ur: 'مسترد کریں',
  },
  save: {
    ar: 'حفظ',
    en: 'Save',
    hi: 'सहेजें',
    ur: 'محفوظ کریں',
  },
  cancel: {
    ar: 'إلغاء',
    en: 'Cancel',
    hi: 'रद्द करें',
    ur: 'منسوخ کریں',
  },
  ticketId: {
    ar: 'رقم التذكرة',
    en: 'Ticket ID',
    hi: 'टिकट आईडी',
    ur: 'ٹکٹ آئی ڈی',
  },
  type: {
    ar: 'النوع',
    en: 'Type',
    hi: 'प्रकार',
    ur: 'قسم',
  },
  description: {
    ar: 'الوصف',
    en: 'Description',
    hi: 'विवरण',
    ur: 'تفصیل',
  },
  date: {
    ar: 'التاريخ',
    en: 'Date',
    hi: 'तारीख',
    ur: 'تاریخ',
  },
  time: {
    ar: 'الوقت',
    en: 'Time',
    hi: 'समय',
    ur: 'وقت',
  },
  addAgent: {
    ar: 'إضافة مندوب',
    en: 'Add Agent',
    hi: 'एजेंट जोड़ें',
    ur: 'ایجنٹ شامل کریں',
  },
  uploadExcel: {
    ar: 'تحميل ملف إكسل',
    en: 'Upload Excel',
    hi: 'एक्सेल अपलोड करें',
    ur: 'ایکسل اپ لوڈ کریں',
  },
  createTicket: {
    ar: 'إنشاء تذكرة',
    en: 'Create Ticket',
    hi: 'टिकट बनाएं',
    ur: 'ٹکٹ بنائیں',
  },
  selectTicketType: {
    ar: 'اختر نوع التذكرة',
    en: 'Select Ticket Type',
    hi: 'टिकट प्रकार चुनें',
    ur: 'ٹکٹ کی قسم منتخب کریں',
  },
  advance: {
    ar: 'سلفة',
    en: 'Advance',
    hi: 'अग्रिम',
    ur: 'پیشگی',
  },
  fewOrders: {
    ar: 'قلة طلبات',
    en: 'Few Orders',
    hi: 'कम ऑर्डर',
    ur: 'کم آرडرز',
  },
  salary: {
    ar: 'راتب',
    en: 'Salary',
    hi: 'वेतन',
    ur: 'تنخواہ',
  },
  other: {
    ar: 'أخرى',
    en: 'Other',
    hi: 'अन्य',
    ur: 'دیگر',
  },
  notes: {
    ar: 'ملاحظات',
    en: 'Notes',
    hi: 'नोट्स',
    ur: 'نوٹس',
  },
  attachments: {
    ar: 'المرفقات',
    en: 'Attachments',
    hi: 'अनुलग्नक',
    ur: 'منسلکات',
  },
  upload: {
    ar: 'تحميل',
    en: 'Upload',
    hi: 'अपलोड',
    ur: 'اپ لوڈ کریں',
  },
  myTickets: {
    ar: 'تذاكري',
    en: 'My Tickets',
    hi: 'मेरे टिकट',
    ur: 'میرے ٹکٹس',
  },
  newTicket: {
    ar: 'تذكرة جديدة',
    en: 'New Ticket',
    hi: 'नया टिकट',
    ur: 'نیا ٹکٹ',
  },
  openTickets: {
    ar: 'تذاكر مفتوحة',
    en: 'Open Tickets',
    hi: 'खुले टिकट',
    ur: 'کھلے ٹکٹ',
  },
  closedTickets: {
    ar: 'تذاكر مغلقة',
    en: 'Closed Tickets',
    hi: 'बंद टिकट',
    ur: 'بند ٹکٹ',
  },
  notifications: {
    ar: 'الإشعارات',
    en: 'Notifications',
    hi: 'सूचनाएं',
    ur: 'اطلاعات',
  },
  overview: {
    ar: 'نظرة عامة',
    en: 'Overview',
    hi: 'अवलोकन',
    ur: 'جائزہ',
  },
  regions: {
    ar: 'المناطق',
    en: 'Regions',
    hi: 'क्षेत्र',
    ur: 'علاقے',
  },
  regional: {
    ar: 'إقليمي',
    en: 'Regional',
    hi: 'क्षेत्रीय',
    ur: 'علاقائی',
  },
  regionalDistribution: {
    ar: 'التوزيع الإقليمي',
    en: 'Regional Distribution',
    hi: 'क्षेत्रीय वितरण',
    ur: 'علاقائی تقسیم',
  },
  userRegistration: {
    ar: 'تسجيل المستخدمين',
    en: 'User Registration',
    hi: 'उपयोगकर्ता पंजीकरण',
    ur: 'صارف کی رجسٹریشن',
  },
  usersByRole: {
    ar: 'المستخدمون حسب الدور',
    en: 'Users by Role',
    hi: 'भूमिका के अनुसार उपयोगकर्ता',
    ur: 'کردار کے مطابق صارفین',
  },
  ticketStats: {
    ar: 'إحصائيات التذاكر',
    en: 'Ticket Statistics',
    hi: 'टिकट आंकड़े',
    ur: 'ٹکٹ کے اعداد و شمار',
  },
  recentActivity: {
    ar: 'النشاط الأخير',
    en: 'Recent Activity',
    hi: 'हाल की गतिविधि',
    ur: 'حالیہ سرگرمی',
  },
  noRecentActivity: {
    ar: 'لا يوجد نشاط حديث',
    en: 'No recent activity',
    hi: 'कोई हालिया गतिविधि नहीं',
    ur: 'کوئی حالیہ سرگرمی نہیں',
  },
  selectRole: {
    ar: 'اختر الدور',
    en: 'Select Role',
    hi: 'भूमिका चुनें',
    ur: 'کردار منتخب کریں',
  },
  add: {
    ar: 'إضافة',
    en: 'Add',
    hi: 'जोड़ें',
    ur: 'شامل کریں',
  },
  update: {
    ar: 'تحديث',
    en: 'Update',
    hi: 'अपडेट',
    ur: 'اپ ڈیٹ کریں',
  },
  searchUsers: {
    ar: 'البحث عن مستخدمين',
    en: 'Search Users',
    hi: 'उपयोगकर्ता खोजें',
    ur: 'صارفین تلاش کریں',
  },
  allRoles: {
    ar: 'كل الأدوار',
    en: 'All Roles',
    hi: 'सभी भूमिकाएँ',
    ur: 'تمام کردار',
  },
  allStatuses: {
    ar: 'كل الحالات',
    en: 'All Statuses',
    hi: 'सभी स्थितियां',
    ur: 'تمام حالات',
  },
  noUsersFound: {
    ar: 'لم يتم العثور على مستخدمين',
    en: 'No users found',
    hi: 'कोई उपयोगकर्ता नहीं मिला',
    ur: 'کوئی صارف نہیں ملا',
  },
  addTicketType: {
    ar: 'إضافة نوع تذكرة',
    en: 'Add Ticket Type',
    hi: 'टिकट प्रकार जोड़ें',
    ur: 'ٹکٹ کی قسم شامل کریں',
  },
  editTicketType: {
    ar: 'تعديل نوع التذكرة',
    en: 'Edit Ticket Type',
    hi: 'टिकट प्रकार संपादित करें',
    ur: 'ٹکٹ کی قسم میں ترمیم کریں',
  },
  requiresApproval: {
    ar: 'يتطلب موافقة',
    en: 'Requires Approval',
    hi: 'अनुमोदन की आवश्यकता है',
    ur: 'منظوری کی ضرورت ہے',
  },
  active: {
    ar: 'نشط',
    en: 'Active',
    hi: 'सक्रिय',
    ur: 'فعال',
  },
  inactive: {
    ar: 'غير نشط',
    en: 'Inactive',
    hi: 'निष्क्रिय',
    ur: 'غیر فعال',
  },
  yes: {
    ar: 'نعم',
    en: 'Yes',
    hi: 'हाँ',
    ur: 'ہاں',
  },
  no: {
    ar: 'لا',
    en: 'No',
    hi: 'नहीं',
    ur: 'نہیں',
  },
  open: {
    ar: 'مفتوح',
    en: 'Open',
    hi: 'खुला',
    ur: 'کھلا',
  },
  loading: {
    ar: 'جار التحميل',
    en: 'Loading',
    hi: 'लोड हो रहा है',
    ur: 'لوڈ ہو رہا ہے',
  },
  createNewTicket: {
    ar: 'إنشاء تذكرة جديدة',
    en: 'Create New Ticket',
    hi: 'नया टिकट बनाएं',
    ur: 'نیا ٹکٹ بنائیں',
  },
  tickets: {
    ar: 'التذاكر',
    en: 'Tickets',
    hi: 'टिकट',
    ur: 'ٹکٹس',
  },
  pendingTickets: {
    ar: 'تذاكر قيد الانتظار',
    en: 'Pending Tickets',
    hi: 'लंबित टिकट',
    ur: 'زیر التواء ٹکٹس',
  },
  language: {
    ar: 'اللغة',
    en: 'Language',
    hi: 'भाषा',
    ur: 'زبان',
  },
  back: {
    ar: 'رجوع',
    en: 'Back',
    hi: 'वापस',
    ur: 'واپس',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
