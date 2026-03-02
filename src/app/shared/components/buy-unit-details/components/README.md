# Buy Unit Details Components

تم تقسيم مكون `buy-unit-details` إلى مكونات فرعية منفصلة لتحسين القابلية للصيانة وإعادة الاستخدام.

## المكونات المنشأة:

### 1. ImageGalleryComponent
- **الملف**: `image-gallery.component.ts`
- **الوظيفة**: عرض معرض الصور الرئيسي مع إمكانية التنقل
- **المدخلات**: galleryImages, heroImage, displayTitle, currentImageIndex
- **المخرجات**: imageClick, previousImage, nextImage, selectImage

### 2. PropertyDetailsComponent
- **الملف**: `property-details.component.ts`
- **الوظيفة**: عرض تفاصيل العقار الأساسية (العنوان، الموقع، المواصفات)
- **المدخلات**: propertyData

### 3. DescriptionComponent
- **الملف**: `description.component.ts`
- **الوظيفة**: عرض وصف العقار
- **المدخلات**: description

### 4. FeaturesComponent
- **الملف**: `features.component.ts`
- **الوظيفة**: عرض مميزات الشقة
- **المدخلات**: features

### 5. CompoundFeaturesComponent
- **الملف**: `compound-features.component.ts`
- **الوظيفة**: عرض مميزات المجمع السكني
- **المدخلات**: compoundFeatures, compoundName

### 6. PaymentPlansComponent
- **الملف**: `payment-plans.component.ts`
- **الوظيفة**: عرض خطط الدفع المتاحة
- **المدخلات**: selectedPlan

### 7. InvestmentAnalysisComponent
- **الملف**: `investment-analysis.component.ts`
- **الوظيفة**: عرض تحليل الاستثمار والأسعار

### 8. DocumentsTaxesComponent
- **الملف**: `documents-taxes.component.ts`
- **الوظيفة**: عرض الوثائق المتاحة والضرائب والرسوم

### 9. NearbyPlacesComponent
- **الملف**: `nearby-places.component.ts`
- **الوظيفة**: عرض الأماكن القريبة من العقار

### 10. SimilarPropertiesComponent
- **الملف**: `similar-properties.component.ts`
- **الوظيفة**: عرض العقارات المشابهة

### 11. SidebarComponent
- **الملف**: `sidebar.component.ts`
- **الوظيفة**: الشريط الجانبي مع معلومات السعر والوكيل
- **المدخلات**: propertyData, agentInitial

### 12. ImageModalComponent
- **الملف**: `image-modal.component.ts`
- **الوظيفة**: النافذة المنبثقة لعرض الصور بحجم كامل
- **المدخلات**: isOpen, galleryImages, selectedImageIndex
- **المخرجات**: close, previousImage, nextImage

## الاستخدام:

جميع المكونات تم استيرادها في الملف الرئيسي `buy-unit-details.ts` ويتم استخدامها في `buy-unit-details.html`.

## المزايا:

1. **قابلية الصيانة**: كل مكون مسؤول عن جزء محدد من الواجهة
2. **إعادة الاستخدام**: يمكن استخدام المكونات في أماكن أخرى
3. **اختبار أسهل**: كل مكون يمكن اختباره بشكل منفصل
4. **تطوير متوازي**: فرق متعددة يمكنها العمل على مكونات مختلفة
5. **تحميل أفضل**: Angular يمكنه تحسين التحميل للمكونات المستقلة