# Units Card - API Response Support

## Overview
تم تحديث مكون `units-card` لدعم البيانات القادمة من الـ API الجديد مع الحفاظ على التوافق مع البيانات القديمة.

## API Response Structure

### الاستجابة الجديدة من `/property` endpoint:

```json
{
  "message": "تم جلب نتايج البحث بنجاح",
  "results": {
    "data": [
      {
        "_id": "69a385e6639e4e90ec0160e0",
        "targetId": "69a382701e7c4ac111d07c88",
        "area": 150,
        "bathrooms": 2,
        "bedrooms": 2,
        "createdAt": "2026-03-01T00:18:47.250Z",
        "currency": "EGP",
        "displayPrice": 10000000,
        "furnished": true,
        "isFeatured": false,
        "isTrusted": false,
        "location": {
          "country": "مصر",
          "city": "القاهرة",
          "area": "Maadi",
          "address": "شارع 9، عمارة رقم 15، الدور الرابع، شقة 42",
          "coordinates": {
            "type": "Point",
            "coordinates": [31.2585, 29.9602]
          }
        },
        "priceType": "total",
        "purpose": "sale",
        "rating": 0,
        "slug": "a303",
        "targetType": "unit",
        "thumbnail": {
          "secure_url": "https://res.cloudinary.com/..."
        },
        "title": "ثالث وحدة",
        "type": "شقة"
      }
    ],
    "pages": 1,
    "currentPage": 1,
    "totalItems": 3,
    "itemsPerPage": 3
  }
}
```

## التحديثات المطبقة

### 1. دعم الصور (Images)

**قبل:**
```typescript
get image(): string {
  return this.property.gallery?.[0]?.secure_url || '';
}
```

**بعد:**
```typescript
get image(): string {
  // دعم thumbnail من API الجديد
  if (this.property.thumbnail && 'secure_url' in this.property.thumbnail) {
    return this.property.thumbnail.secure_url;
  }
  // دعم gallery القديم
  if (this.property.gallery && this.property.gallery.length > 0) {
    return this.property.gallery[0].secure_url || '';
  }
  return '';
}
```

### 2. دعم العنوان (Title)

**قبل:**
```typescript
get title(): string {
  return this.property.name || '';
}
```

**بعد:**
```typescript
get title(): string {
  // دعم title من API الجديد
  if ('title' in this.property && this.property.title) {
    return this.property.title;
  }
  // دعم name القديم
  return this.property.name || '';
}
```

### 3. دعم المساحة (Area)

**قبل:**
```typescript
get area(): string {
  return this.property.area || '';
}
```

**بعد:**
```typescript
get area(): string {
  if ('area' in this.property) {
    if (typeof this.property.area === 'number') {
      return `${this.property.area} sqm`;
    }
    if (typeof this.property.area === 'string') {
      return this.property.area;
    }
  }
  return '';
}
```

### 4. دعم السعر (Price)

**قبل:**
```typescript
get price(): string {
  return String(this.property.price);
}
```

**بعد:**
```typescript
get price(): string {
  // دعم displayPrice من API الجديد
  if ('displayPrice' in this.property && typeof this.property.displayPrice === 'number') {
    const currency = 'currency' in this.property ? this.property.currency : 'EGP';
    return `${this.property.displayPrice.toLocaleString()} ${currency}`;
  }
  return String(this.property.price);
}
```

### 5. دعم التحقق (Verification)

**قبل:**
```typescript
get verified(): boolean {
  return this.property.verified || false;
}
```

**بعد:**
```typescript
get verified(): boolean {
  // دعم isTrusted من API الجديد
  if ('isTrusted' in this.property && typeof this.property.isTrusted === 'boolean') {
    return this.property.isTrusted;
  }
  return this.property.verified || false;
}
```

### 6. دعم التقييم (Rating)

**بعد:**
```typescript
get rating(): number | undefined {
  // دعم rating من API الجديد
  if ('rating' in this.property && typeof this.property.rating === 'number') {
    return this.property.rating;
  }
  return this.property.rating;
}
```

### 7. دعم الأثاث (Furnished)

**جديد:**
```typescript
get furnished(): boolean {
  // دعم furnished من API الجديد
  if ('furnished' in this.property && typeof this.property.furnished === 'boolean') {
    return this.property.furnished;
  }
  return false;
}
```

## تحديث نموذج ApiProperty

تم تحديث `src/app/core/models/api-property.model.ts` لإضافة الحقول الجديدة:

```typescript
export interface ApiProperty {
  _id: string;
  slug: string;
  targetId?: string;
  targetType?: 'unit' | 'project';
  location: PropertyLocation;
  isFeatured: boolean;
  isTrusted?: boolean;
  gallery?: GalleryItem[];
  thumbnail?: {
    secure_url: string;
  };
  name?: string;
  title?: string;
  description?: string;
  type: string;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  displayPrice?: number;
  currency?: string;
  priceType?: 'total' | 'monthly' | 'daily';
  purpose?: 'sale' | 'rent';
  rating?: number;
  createdAt?: string;
  // ... other fields
}
```

## الحقول المدعومة

| الحقل | API القديم | API الجديد | الحالة |
|------|-----------|-----------|--------|
| الصورة | `gallery[0].secure_url` | `thumbnail.secure_url` | ✅ مدعوم |
| العنوان | `name` | `title` | ✅ مدعوم |
| المساحة | `area` (string) | `area` (number) | ✅ مدعوم |
| السعر | `price` | `displayPrice` + `currency` | ✅ مدعوم |
| التحقق | `verified` | `isTrusted` | ✅ مدعوم |
| التقييم | - | `rating` | ✅ مدعوم |
| الأثاث | - | `furnished` | ✅ مدعوم |
| الغرف | `bedrooms` | `bedrooms` | ✅ مدعوم |
| الحمامات | `bathrooms` | `bathrooms` | ✅ مدعوم |
| النوع | `type` | `type` | ✅ مدعوم |
| الموقع | `location` | `location` | ✅ مدعوم |

## الاختبار

### 1. عرض الكروت من API
```typescript
// في all-properties.ts
this.propertyService.getProperties(page, itemsPerPage).subscribe({
  next: (response) => {
    this.properties = response.properties.data;
    // الكروت ستعرض البيانات بشكل صحيح
  }
});
```

### 2. التحقق من البيانات
- ✅ الصور تظهر من `thumbnail.secure_url`
- ✅ العناوين تظهر من `title`
- ✅ الأسعار تظهر بتنسيق صحيح مع العملة
- ✅ المساحة تظهر بوحدة sqm
- ✅ عدد الغرف والحمامات يظهر بشكل صحيح

## التوافق العكسي

المكون يحافظ على التوافق مع البيانات القديمة:
- إذا كان `thumbnail` غير موجود، يستخدم `gallery[0]`
- إذا كان `title` غير موجود، يستخدم `name`
- إذا كان `displayPrice` غير موجود، يستخدم `price`

## الملفات المتأثرة

1. `src/app/shared/components/units-card/units-card.ts` - المكون الرئيسي
2. `src/app/core/models/api-property.model.ts` - نموذج البيانات
3. `src/app/features/all-properties/components/all-properties/all-properties.ts` - استخدام المكون

## المشاكل المحلولة

- ✅ الصور لا تظهر → تم إضافة دعم `thumbnail`
- ✅ العناوين فارغة → تم إضافة دعم `title`
- ✅ الأسعار غير منسقة → تم إضافة تنسيق مع العملة
- ✅ المساحة بدون وحدة → تم إضافة `sqm`