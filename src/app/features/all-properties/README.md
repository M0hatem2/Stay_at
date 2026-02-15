# All Properties Feature

## الملفات المنشأة

### 1. Property Service
**المسار:** `services/property.service.ts`

السيرفيس مسؤول عن:
- جلب قائمة العقارات من API
- البحث والفلترة
- التعامل مع Pagination

**الاستخدام:**
```typescript
this.propertyService.getProperties(page, limit).subscribe(response => {
  this.properties = response.properties.data;
});
```

### 2. Language Integration
الكومبوننت يستخدم `LanguageService` لإعادة تحميل البيانات عند تغيير اللغة تلقائياً.

### 3. API Endpoint
- **URL:** `/property`
- **Method:** GET
- **Parameters:** 
  - `page`: رقم الصفحة
  - `limit`: عدد العناصر في الصفحة

### 4. Response Structure
```json
{
  "message": "تم جلب العقارات بنجاح",
  "properties": {
    "data": [...],
    "pages": 1,
    "currentPage": 1,
    "totalItems": 10,
    "itemsPerPage": 10,
    "nextPage": null,
    "previousPage": null
  }
}
```

## المميزات
- ✅ جلب البيانات من API
- ✅ دعم اللغة العربية والإنجليزية
- ✅ إرسال اللغة والتوكن تلقائياً في كل request
- ✅ Pagination
- ✅ Loading states
- ✅ Err