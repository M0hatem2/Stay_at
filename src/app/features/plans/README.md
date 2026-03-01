# Plans Feature - API Integration

## Overview
تم تحديث صفحة الخطط لاستخدام API بدلاً من البيانات الثابتة مع دعم كامل للترجمة.

## Changes Made

### 1. Plans API Service (`services/plans-api.service.ts`)
- سيرفيس جديد للتعامل مع API الخطط
- يستخدم `/plan/public/all` endpoint
- يستخدم `HttpClient` مباشرة بدلاً من `ApiService`
- يحصل على اللغة الحالية من `LanguageService`
- يرسل اللغة في headers متعددة (نفس طريقة UnitService):
  - `Accept-Language`
  - `Content-Language`
  - `X-Language`
- يطبع logs للتأكد من إرسال اللغة الصحيحة

### 2. Plans Component (`plans.ts`)
- تم إضافة `PlansApiService` و `LanguageService`
- تم إضافة حالات التحميل والأخطاء (`isLoading`, `error`)
- تم إضافة `loadPlans()` لجلب البيانات من API
- تم إضافة `mapApiPlansToCards()` لتحويل بيانات API إلى الشكل المطلوب
- تم إزالة جميع البيانات الوهمية (fake data)
- الكومبوننت يعتمد بالكامل على API
- تم إضافة الاستماع لتغييرات اللغة وإعادة تحميل البيانات تلقائياً
- تم تنفيذ `OnDestroy` لتنظيف الـ subscriptions
- تم إضافة `translations` getter للنصوص الثابتة
- تم إضافة `currentLanguage` للتتبع اللغة الحالية

### 3. Plans Template (`plans.html`)
- تم إضافة حالة التحميل (Loading State)
- تم إضافة حالة الخطأ (Error State)
- استخدام `@if` بدلاً من `*ngIf` للتوافق مع Angular الحديث
- جميع النصوص الثابتة تستخدم `translations` getter

### 4. Plans Styles (`plans.scss`)
- تم إضافة أنماط لحالات التحميل والأخطاء
- تم إضافة animation للـ spinner

### 5. Plan Model (`models/plan.model.ts`)
- تم تعديل نوع `id` من union type إلى `string` لدعم IDs من API

## API Response Structure

```json
{
  "results": 1,
  "plans": [
    {
      "_id": "698e84f54e2017394984fe1b",
      "category": "owners",
      "basePrice": 199,
      "isPopular": true,
      "yearlyDiscountPercentage": 17,
      "isActive": true,
      "yearlyPrice": 1982.04,
      "title": "standard",
      "features": [
        {
          "name": "units",
          "value": 3,
          "isEnabled": true
        }
      ]
    }
  ]
}
```

## Category Mapping

- `owner` → `owners`
- `broker` → `brokers`
- `developer` → `developers`

## Language Support

اللغة يتم إرسالها في headers متعددة مباشرة من السيرفيس (نفس طريقة UnitService):
- `Accept-Language`: اللغة المطلوبة
- `Content-Language`: لغة المحتوى
- `X-Language`: header إضافي للغة

### آلية عمل الترجمة:

عند تغيير اللغة من الـ navbar:
1. يتم تحديث `LanguageService`
2. الكومبوننت يستمع للتغيير عبر `currentLanguage$`
3. يتم تحديث `currentLanguage` في الكومبوننت
4. يتم إعادة تحميل البيانات تلقائياً من API
5. السيرفيس يحصل على اللغة الجديدة من `LanguageService`
6. يتم إرسال اللغة في headers مع الـ request
7. API يرجع البيانات باللغة الجديدة
8. النصوص الثابتة في HTML تتغير تلقائياً عبر `translations` getter

### النصوص المترجمة:

#### من Frontend (translations getter):
- عناوين الأقسام (Owner Plans, Broker Plans, Developer Plans)
- خيارات الفوترة (Monthly, Yearly, Save)
- أزرار الإجراءات (Choose Plan, Contact Sales)
- رسائل الحالة (Loading, Error)
- الأسئلة الشائعة (FAQs)
- جميع النصوص الثابتة في الصفحة

#### من Backend (API):
- `plan.title`: عنوان الخطة
- `plan.features[].name`: أسماء الميزات
- جميع البيانات الديناميكية

## Testing

للاختبار، تأكد من:
1. الـ API endpoint متاح على `/plan/public/all`
2. الـ API يدعم headers اللغة (`Accept-Language`, `Content-Language`, `X-Language`)
3. الـ `LanguageService` يعمل بشكل صحيح
4. تغيير اللغة من الـ navbar يؤدي لإعادة تحميل البيانات
5. النصوص الثابتة والديناميكية تتغير عند تغيير اللغة
