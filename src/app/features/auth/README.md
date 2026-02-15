# Registration System

نظام التسجيل المتقدم الذي يدعم 5 أنواع مختلفة من الحسابات مع validation ديناميكي وإرسال البيانات المناسبة فقط.

## الميزات الرئيسية

- ✅ دعم 5 أنواع حسابات مختلفة
- ✅ Reactive Forms مع Conditional Validation
- ✅ إرسال البيانات المناسبة فقط لكل نوع حساب
- ✅ رفع الملفات مع validation للنوع والحجم
- ✅ FormData handling للـ API
- ✅ Type Safety مع TypeScript interfaces
- ✅ Angular Best Practices

## أنواع الحسابات المدعومة

### 1. Real Estate Broker
**الحقول الخاصة:**
- `licenseNumber`: رقم الترخيص
- `companyName`: اسم الشركة
- `yearsOfExperience`: سنوات الخبرة
- `brokerSpecialization`: التخصص (residential/commercial/both)

### 2. Real Estate Developer
**الحقول الخاصة:**
- `commercialRegisterNumber`: رقم السجل التجاري
- `website`: موقع الشركة
- `establishedYear`: سنة التأسيس
- `numberOfCompletedProjects`: عدد المشاريع المكتملة

### 3. Property Owner
**الحقول الخاصة:**
- `id`: الرقم القومي (14 رقم)
- `numberOfPropertiesOwned`: عدد العقارات المملوكة
- `registrationPurpose`: الغرض من التسجيل (rent/sell/both)

### 4. Property Seeker
**الحقول الخاصة:**
- `expectedBudget`: الميزانية المتوقعة
- `preferredArea`: المنطقة المفضلة
- `propertyType`: نوع العقار (apartment/villa/office/shop/land)
- `purposeOfSearch`: الغرض من البحث (rent/buy)

### 5. System Admin
**الحقول الخاصة:**
- `adminCode`: كود الإدارة
- `department`: القسم

## الحقول الأساسية (لجميع الأنواع)

```typescript
{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: AccountRole;
  password: string;
  confirmPassword: string;
  attachment?: File; // اختياري
}
```

## كيفية الاستخدام

### 1. استيراد الـ Component

```typescript
import { RegisterPopComponent } from './features/auth';

@Component({
  imports: [RegisterPopComponent],
  // ...
})
```

### 2. استخدام الـ Component في الـ Template

```html
<app-register-pop 
  [isVisible]="showRegistrationPopup"
  (close)="showRegistrationPopup = false">
</app-register-pop>
```

### 3. استخدام الـ Service

```typescript
import { RegistrationService, RegistrationData } from './features/auth';

constructor(private registrationService: RegistrationService) {}

async register(data: RegistrationData) {
  try {
    const response = await this.registrationService.register(data).toPromise();
    if (response.success) {
      // نجح التسجيل
    }
  } catch (error) {
    // خطأ في التسجيل
  }
}
```

## API Endpoint

**URL:** `/auth/signup`  
**Method:** `POST`  
**Content-Type:** `multipart/form-data`

### مثال على البيانات المرسلة (Real Estate Broker)

```javascript
FormData {
  firstName: "John",
  lastName: "Doe", 
  email: "john.doe@example.com",
  phoneNumber: "201234567890",
  role: "real_estate_broker",
  password: "Password123!",
  confirmPassword: "Password123!",
  licenseNumber: "BR-123456",
  companyName: "Dream Properties",
  yearsOfExperience: "5",
  brokerSpecialization: "both",
  attachment: File // إذا تم رفع ملف
}
```

## Validation Rules

### الحقول الأساسية
- **firstName/lastName**: مطلوب، أقل شيء حرفين
- **email**: مطلوب، صيغة email صحيحة
- **phoneNumber**: مطلوب، 12 رقم
- **password**: مطلوب، 8 أحرف على الأقل، يحتوي على حروف كبيرة وصغيرة ورقم ورمز خاص
- **confirmPassword**: مطلوب، يجب أن يطابق كلمة المرور

### رفع الملفات
- **الأنواع المسموحة**: .jpg, .jpeg, .png
- **الحد الأقصى للحجم**: 5MB

## الهيكل التقني

```
src/app/features/auth/
├── types/
│   └── registration.types.ts     # TypeScript interfaces
├── services/
│   └── registration.service.ts   # API service
├── components/
│   └── register-pop/
│       ├── register-pop.ts       # Main component
│       ├── register-pop.html     # Template
│       └── components/
│           ├── base-registration/           # Shared base form
│           ├── real-estate-broker/         # Broker specific form
│           ├── real-estate-developer/      # Developer specific form
│           ├── property-owner/             # Owner specific form
│           ├── property-seeker/            # Seeker specific form
│           └── system-admin/               # Admin specific form
└── index.ts                      # Exports
```

## المميزات التقنية

- **Type Safety**: استخدام TypeScript interfaces لضمان type safety
- **Conditional Validation**: validation مختلف حسب نوع الحساب
- **Dynamic Forms**: عرض الحقول المناسبة فقط
- **FormData Handling**: تحضير البيانات بالشكل المناسب للـ API
- **File Upload**: دعم رفع الملفات مع validation
- **Error Handling**: معالجة الأخطاء وعرضها للمستخدم
- **State Management**: حفظ واستعادة حالة التسجيل
- **Responsive Design**: تصميم متجاوب لجميع الشاشات

## ملاحظات مهمة

1. **إرسال البيانات المناسبة فقط**: النظام يرسل فقط الحقول المناسبة لنوع الحساب المختار
2. **FormData**: جميع البيانات ترسل كـ FormData لدعم رفع الملفات
3. **Validation**: كل نوع حساب له validation خاص به
4. **Step-by-step**: عملية التسجيل مقسمة على خطوات لتحسين UX
5. **State Persistence**: حفظ حالة التسجيل في localStorage