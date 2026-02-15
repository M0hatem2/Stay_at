 
mkdir -p app/core/services/api
touch app/core/services/api/properties-api.service.ts
touch app/core/services/api/auth-api.service.ts
touch app/core/services/api/projects-api.service.ts
touch app/core/services/translation.service.ts
touch app/core/services/local-storage.service.ts
mkdir -p app/core/interceptors
touch app/core/interceptors/auth.interceptor.ts
touch app/core/interceptors/error.interceptor.ts
mkdir -p app/core/guards
touch app/core/guards/auth.guard.ts
touch app/core/guards/login.guard.ts
mkdir -p app/core/models
touch app/core/models/property.model.ts
touch app/core/models/user.model.ts
touch app/core/models/project.model.ts
touch app/core/models/api-response.model.ts
mkdir -p app/core/utils
touch app/core/utils/helpers.ts
touch app/core/utils/constants.ts
touch app/core/core.module.ts
touch app/core/index.ts

mkdir -p app/shared/components/navbar
mkdir -p app/shared/components/footer
mkdir -p app/shared/components/property-card
mkdir -p app/shared/components/button
mkdir -p app/shared/components/select
mkdir -p app/shared/components/loader
mkdir -p app/shared/directives
mkdir -p app/shared/pipes
touch app/shared/shared.module.ts
touch app/shared/index.ts

mkdir -p app/features/home/pages
mkdir -p app/features/home/components
touch app/features/home/pages/home.page.ts
touch app/features/home/pages/home.page.html
touch app/features/home/pages/home.page.scss
touch app/features/home/home.module.ts

mkdir -p app/features/all-properties/pages
mkdir -p app/features/all-properties/components
touch app/features/all-properties/all-properties.module.ts

mkdir -p app/features/rent/pages
mkdir -p app/features/rent/components
touch app/features/rent/rent.module.ts

mkdir -p app/features/buy/pages
mkdir -p app/features/buy/components
touch app/features/buy/buy.module.ts

mkdir -p app/features/projects/pages
mkdir -p app/features/projects/components
touch app/features/projects/projects.module.ts

mkdir -p app/features/about/pages
mkdir -p app/features/about/components
touch app/features/about/about.module.ts

mkdir -p app/features/auth/login
mkdir -p app/features/auth/register
touch app/features/auth/login/login.page.ts
touch app/features/auth/login/login.page.html
touch app/features/auth/login/login.page.scss
touch app/features/auth/register/register.page.ts
touch app/features/auth/register/register.page.html
touch app/features/auth/register/register.page.scss
touch app/features/auth/auth.module.ts

mkdir -p app/layout/main-layout
touch app/layout/main-layout/main-layout.component.ts
touch app/layout/main-layout/main-layout.component.html
touch app/layout/main-layout/main-layout.component.scss

mkdir -p app/layout/auth-layout
touch app/layout/auth-layout/auth-layout.component.ts
touch app/layout/auth-layout/auth-layout.component.html
touch app/layout/auth-layout/auth-layout.component.scss

mkdir -p app/state/property
touch app/state/property/property.actions.ts
touch app/state/property/property.reducer.ts
touch app/state/property/property.effects.ts
touch app/state/property/property.selector.ts

mkdir -p app/state/user
touch app/state/user/user.actions.ts
touch app/state/user/user.reducer.ts
touch app/state/user/user.selector.ts
touch app/state/app.state.ts

mkdir -p app/i18n
touch app/i18n/en.json
touch app/i18n/ar.json

touch app/app-routing.module.ts
touch app/app.component.ts
touch app/app.component.html
touch app/app.component.scss
touch app/app.module.ts
