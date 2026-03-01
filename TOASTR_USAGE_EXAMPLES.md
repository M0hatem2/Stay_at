# أمثلة استخدام ngx-toastr في المشروع

## ✅ التثبيت تم بنجاح

تم تثبيت وإعداد ngx-toastr في المشروع بالكامل.

## 📝 كيفية الاستخدام في أي Component

### 1️⃣ Import في Component

```typescript
import { ToastrService } from 'ngx-toastr';
```

### 2️⃣ Inject في Constructor

```typescript
constructor(private toastr: ToastrService) {}
```

### 3️⃣ أمثلة الاستخدام

#### ✅ Success Toast
```typescript
this.toastr.success('تم الحفظ بنجاح', 'نجاح');
this.toastr.success('Unit created successfully', 'Success');
```

#### ❌ Error Toast
```typescript
this.toastr.error('حدث خطأ ما', 'خطأ');
this.toastr.error('Something went wrong', 'Error');
```

#### ⚠️ Warning Toast
```typescript
this.toastr.warning('تحقق من المدخلات', 'تحذير');
this.toastr.warning('Check your inputs', 'Warning');
```

#### ℹ️ Info Toast
```typescript
this.toastr.info('تحديث جديد متاح', 'معلومة');
this.toastr.info('New update available', 'Info');
```

## 🔥 مثال حقيقي مع API Call

```typescript
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './services/api.service';

export class MyComponent {
  constructor(
    private toastr: ToastrService,
    private api: ApiService
  ) {}

  createUnit(data: any) {
    this.api.createUnit(data).subscribe({
      next: (response) => {
        this.toastr.success('تم إنشاء الوحدة بنجاح', 'نجاح');
      },
      error: (error) => {
        this.toastr.error('فشل في إنشاء الوحدة', 'خطأ');
      }
    });
  }

  saveForm() {
    if (this.form.valid) {
      this.api.save(this.form.value).subscribe({
        next: () => this.toastr.success('تم الحفظ'),
        error: () => this.toastr.error('فشل الحفظ')
      });
    } else {
      this.toastr.warning('يرجى ملء جميع الحقول المطلوبة');
    }
  }
}
```

## ⚙️ الإعدادات المطبقة

```typescript
provideToastr({
  positionClass: 'toast-bottom-right',  // الموقع: أسفل اليمين
  timeOut: 3000,                        // المدة: 3 ثواني
  preventDuplicates: true,              // منع التكرار
  progressBar: true,                    // شريط التقدم
  closeButton: true,                    // زر الإغلاق
})
```

## 🎨 تخصيص الاستايل

### 1️⃣ تم إضافة استايلات مخصصة في `src/styles.scss`

الاستايلات الحالية تتضمن:
- ✅ Gradient backgrounds للألوان
- ✅ Border جانبي ملون
- ✅ Animations سلسة
- ✅ Backdrop blur effect
- ✅ دعم RTL للعربي

### 2️⃣ تغيير الألوان

يمكنك تعديل الألوان في `styles.scss`:

```scss
/* مثال: تغيير لون Success */
.toast-success {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%) !important;
  border-left: 4px solid #your-border-color;
}
```

### 3️⃣ تغيير الموقع

في `app.config.ts`:

```typescript
provideToastr({
  positionClass: 'toast-top-right',    // أعلى اليمين
  // أو
  positionClass: 'toast-top-left',     // أعلى اليسار
  // أو
  positionClass: 'toast-bottom-left',  // أسفل اليسار
  // أو
  positionClass: 'toast-top-center',   // أعلى الوسط
  // أو
  positionClass: 'toast-bottom-center' // أسفل الوسط
})
```

### 4️⃣ تغيير المدة والإعدادات

```typescript
provideToastr({
  timeOut: 5000,              // 5 ثواني
  extendedTimeOut: 2000,      // وقت إضافي عند hover
  progressBar: true,          // إظهار شريط التقدم
  progressAnimation: 'decreasing', // نوع الأنيميشن
  closeButton: true,          // زر الإغلاق
  enableHtml: false,          // السماح بـ HTML
  tapToDismiss: true,         // الإغلاق بالضغط
  preventDuplicates: true,    // منع التكرار
  maxOpened: 5,               // أقصى عدد مفتوح
  autoDismiss: true,          // الإغلاق التلقائي
  newestOnTop: true,          // الأحدث في الأعلى
})
```

### 5️⃣ استايلات بديلة جاهزة

في `styles.scss` يوجد استايلات معلقة يمكنك تفعيلها:

- **Minimal Style**: استايل بسيط بخلفية بيضاء
- **Dark Mode**: استايل للوضع الداكن
- **Large Icons**: أيقونات أكبر

فقط قم بإزالة `/* */` من حول الكود المطلوب.

### 6️⃣ تخصيص لكل Toast على حدة

```typescript
// مع خيارات مخصصة
this.toastr.success('رسالة', 'عنوان', {
  timeOut: 5000,
  progressBar: true,
  closeButton: true,
  positionClass: 'toast-top-center',
  toastClass: 'custom-toast-class' // كلاس مخصص
});
```

### 7️⃣ إضافة كلاس CSS مخصص

```typescript
this.toastr.success('رسالة', 'عنوان', {
  toastClass: 'my-custom-toast'
});
```

ثم في `styles.scss`:

```scss
.my-custom-toast {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  font-size: 16px;
}
```

## 🎨 أمثلة استايلات إضافية

### استايل Glassmorphism

```scss
.toast-container .ngx-toastr {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### استايل مع Shadow كبير

```scss
.toast-container .ngx-toastr {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
```

### استايل Rounded أكثر

```scss
.toast-container .ngx-toastr {
  border-radius: 24px;
}
```

## 🚀 جاهز للاستخدام!

الآن يمكنك استخدام ToastrService في أي component في المشروع مع استايلات مخصصة وجميلة.

