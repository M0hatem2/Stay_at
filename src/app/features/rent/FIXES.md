# Rent Component - Type Fixes

## المشاكل التي تم إصلاحها

### 1. خطأ نوع المساحة (Area Type Error)

**المشكلة:**
```typescript
area: `${unit.unitArea} م²`,  // ❌ string
```

**الخطأ:**
```
Type 'string' is not assignable to type 'undefined'.
The expected type comes from property 'area' which is declared here on type 'ApiProperty'
  area?: number;
```

**الحل:**
```typescript
area: unit.unitArea,  // ✅ number
```

**السبب:**
- نموذج `ApiProperty` يتوقع `area` أن يكون `number`
- مكون `units-card` يتعامل مع التنسيق تلقائياً
- إذا كان `area` رقماً، يضيف `sqm` تلقائياً

### 2. خطأ نوع السعر (Price Type Error)

**المشكلة الأولى:**
```typescript
private mapRentPeriodToPriceType(rentPeriod: string): 'monthly' | 'daily' | 'sale' {
  // ...
  return 'monthly';
}
```

**الخطأ:**
```
Type '"monthly" | "daily" | "sale"' is not assignable to type '"monthly" | "daily" | undefined'.
Type '"sale"' is not assignable to type '"monthly" | "daily" | undefined'.
```

**الحل:**
```typescript
private mapRentPeriodToPriceType(rentPeriod: string): 'monthly' | 'daily' {
  switch (rentPeriod.toLowerCase()) {
    case 'day':
    case 'daily':
      return 'daily';
    case 'month':
    case 'monthly':
    default:
      return 'monthly';
  }
}
```

**المشكلة الثانية:**
```typescript
price: unit.listingPrice.rentPrice.toLocaleString('ar-EG'),  // ❌ string
```

**الخطأ:**
```
Object literal may only specify known properties, and 'price' does not exist in type 'ApiProperty'.
```

**الحل:**
```typescript
displayPrice: unit.listingPrice.rentPrice,  // ✅ number
currency: 'EGP',
```

**السبب:**
- `ApiProperty` يستخدم `displayPrice` (number) وليس `price` (string)
- مكون `units-card` يقوم بالتنسيق تلقائياً مع العملة

### 3. خطأ نوع الإرجاع (Return Type Error)

**المشكلة:**
```typescript
convertUnitToApiProperty(unit: Unit): ApiProperty & {
  bedrooms?: number;
  bathrooms?: number;
  area?: string;  // ❌ تعارض مع ApiProperty.area?: number
  price?: string;  // ❌ غير موجود في ApiProperty
  priceType?: 'monthly' | 'daily' | 'sale';
}
```

**الحل:**
```typescript
convertUnitToApiProperty(unit: Unit): ApiProperty {
  // الآن نستخدم ApiProperty مباشرة
  // جميع الحقول متوافقة مع النموذج
}
```

## التحديثات المطبقة

### قبل التحديث:
```typescript
convertUnitToApiProperty(unit: Unit): ApiProperty & {
  bedrooms?: number;
  bathrooms?: number;
  area?: string;  // ❌
  price?: string;  // ❌
  priceType?: 'monthly' | 'daily' | 'sale';  // ❌
} {
  return {
    // ...
    bedrooms: unit.bedrooms,
    bathrooms: unit.bathrooms,
    area: `${unit.unitArea} م²`,  // ❌ string
    price: unit.listingPrice.rentPrice.toLocaleString('ar-EG'),  // ❌ string
    priceType: this.mapRentPeriodToPriceType(unit.listingPrice.rentPeriod)
  };
}

private mapRentPeriodToPriceType(rentPeriod: string): 'monthly' | 'daily' | 'sale' {
  // ...
}
```

### بعد التحديث:
```typescript
convertUnitToApiProperty(unit: Unit): ApiProperty {
  return {
    // ...
    bedrooms: unit.bedrooms,
    bathrooms: unit.bathrooms,
    area: unit.unitArea,  // ✅ number
    displayPrice: unit.listingPrice.rentPrice,  // ✅ number
    currency: 'EGP',  // ✅ string
    priceType: this.mapRentPeriodToPriceType(unit.listingPrice.rentPeriod)
  };
}

private mapRentPeriodToPriceType(rentPeriod: string): 'monthly' | 'daily' {
  switch (rentPeriod.toLowerCase()) {
    case 'day':
    case 'daily':
      return 'daily';
    case 'month':
    case 'monthly':
    default:
      return 'monthly';
  }
}
```

## كيف يعمل مكون units-card مع البيانات

### المساحة (Area):
```typescript
get area(): string {
  if ('area' in this.property) {
    if (typeof this.property.area === 'number') {
      return `${this.property.area} sqm`;  // ✅ يضيف الوحدة تلقائياً
    }
  }
  return '';
}
```

**مثال:**
- إذا كان `area: 150` → يعرض `"150 sqm"`

### السعر (Price):
```typescript
get price(): string {
  if ('displayPrice' in this.property && typeof this.property.displayPrice === 'number') {
    const currency = 'currency' in this.property ? this.property.currency : 'EGP';
    return `${this.property.displayPrice.toLocaleString()} ${currency}`;  // ✅ ينسق السعر مع العملة
  }
  return '';
}
```

**مثال:**
- إذا كان `displayPrice: 5000, currency: 'EGP'` → يعرض `"5,000 EGP"`

## الفوائد

1. **توافق الأنواع**: لا مزيد من أخطاء TypeScript
2. **استخدام النموذج الصحيح**: `ApiProperty` مباشرة بدون تعديلات
3. **مرونة العرض**: المكون يتعامل مع التنسيق
4. **كود أنظف**: لا حاجة لتكرار التنسيق في كل مكان
5. **دقة البيانات**: `priceType` يعكس الواقع (إيجار فقط)
6. **أداء أفضل**: تنسيق الأرقام يتم مرة واحدة في المكون

## الملفات المتأثرة

- ✅ `src/app/features/rent/components/rent/rent.ts`
- ✅ `src/app/shared/components/units-card/units-card.ts` (يدعم displayPrice)
- ✅ `src/app/core/models/api-property.model.ts` (النموذج الأساسي)

## الاختبار

### قبل:
```
❌ Build Error: Type 'string' is not assignable to type 'undefined'
❌ Build Error: Type '"sale"' is not assignable to type '"monthly" | "daily"'
❌ Build Error: Object literal may only specify known properties, and 'price' does not exist
```

### بعد:
```
✅ Build Success
✅ الكروت تعرض المساحة بشكل صحيح: "150 sqm"
✅ الكروت تعرض السعر بشكل صحيح: "5,000 EGP"
✅ نوع السعر صحيح: "monthly" أو "daily"
```