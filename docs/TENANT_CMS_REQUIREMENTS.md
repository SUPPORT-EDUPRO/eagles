# Tenant CMS & Website Builder Requirements

## Overview
Every tenant (preschool) should have the ability to customize their own website and control marketing content through a dedicated CMS dashboard, similar to Young Eagles.

## Database Schema Requirements

### 1. Tenant Configuration Table
```sql
CREATE TABLE tenant_website_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id) NOT NULL,
  
  -- Branding
  logo_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#2563eb',
  secondary_color VARCHAR(7) DEFAULT '#ec4899',
  accent_color VARCHAR(7) DEFAULT '#f59e0b',
  
  -- Contact Information
  school_name TEXT NOT NULL,
  phone_number VARCHAR(20),
  email VARCHAR(255),
  whatsapp_number VARCHAR(20),
  address_line1 TEXT,
  address_line2 TEXT,
  city VARCHAR(100),
  province VARCHAR(100),
  postal_code VARCHAR(10),
  
  -- Social Media
  facebook_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  google_analytics_id TEXT,
  
  -- Features
  enable_gallery BOOLEAN DEFAULT true,
  enable_blog BOOLEAN DEFAULT false,
  enable_testimonials BOOLEAN DEFAULT true,
  enable_whatsapp_fab BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Tenant Pages Table
```sql
CREATE TABLE tenant_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id) NOT NULL,
  
  page_type VARCHAR(50) NOT NULL, -- 'home', 'about', 'programs', 'contact', 'custom'
  slug VARCHAR(100) NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  
  -- Content (JSON structure)
  sections JSONB DEFAULT '[]',
  -- Example section:
  -- {
  --   "type": "hero",
  --   "title": "Welcome to Our School",
  --   "subtitle": "Where learning meets love",
  --   "image_url": "/hero.jpg",
  --   "cta_text": "Enroll Now",
  --   "cta_link": "/registration"
  -- }
  
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(tenant_id, slug)
);
```

### 3. Tenant Gallery Table
```sql
CREATE TABLE tenant_gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id) NOT NULL,
  
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(50), -- 'activities', 'facilities', 'events', 'achievements'
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Tenant Testimonials Table
```sql
CREATE TABLE tenant_testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id) NOT NULL,
  
  parent_name TEXT NOT NULL,
  child_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  testimonial TEXT NOT NULL,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Tenant Programs Table
```sql
CREATE TABLE tenant_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id) NOT NULL,
  
  program_name TEXT NOT NULL,
  age_group TEXT, -- '6-12 months', '1-2 years', etc.
  description TEXT,
  features JSONB DEFAULT '[]',
  image_url TEXT,
  monthly_fee DECIMAL(10,2),
  
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 6. Tenant Promotions Table
```sql
CREATE TABLE tenant_promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES organizations(id) NOT NULL,
  
  title TEXT NOT NULL,
  description TEXT,
  promo_code VARCHAR(50) UNIQUE,
  discount_type VARCHAR(20), -- 'percentage', 'fixed'
  discount_value DECIMAL(10,2),
  max_uses INTEGER,
  uses_count INTEGER DEFAULT 0,
  
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## CMS Dashboard Features

### Content Management
- [ ] Visual page builder (drag-and-drop sections)
- [ ] Rich text editor for descriptions
- [ ] Image upload and management
- [ ] Color picker for branding
- [ ] Navigation menu editor
- [ ] Footer links management

### Marketing Tools
- [ ] Testimonials management
- [ ] Gallery management (categories, ordering)
- [ ] Programs/curriculum editor
- [ ] Promotions and pricing control
- [ ] Call-to-action button customization
- [ ] WhatsApp integration settings

### SEO & Analytics
- [ ] Meta tags editor
- [ ] Google Analytics integration
- [ ] Sitemap generation
- [ ] Social media preview

### Legal & Compliance
- [ ] Privacy Policy editor
- [ ] Terms of Service editor
- [ ] Cookie consent management
- [ ] POPIA compliance tools

## Website Builder Components

### Reusable Section Types
1. **Hero Section**
   - Background image/video
   - Title, subtitle
   - CTA buttons
   - Optional registration form

2. **Features Grid**
   - Icons/images
   - Titles and descriptions
   - 2, 3, or 4 column layouts

3. **Programs Showcase**
   - Program cards with images
   - Pricing display
   - Age groups
   - "Learn More" links

4. **Testimonials Carousel**
   - Parent reviews
   - Star ratings
   - Photos (optional)
   - Auto-scroll or manual

5. **Gallery Section**
   - Masonry or grid layout
   - Categories filter
   - Lightbox view
   - Upload interface

6. **Contact Section**
   - Contact form
   - Map integration
   - Contact details
   - WhatsApp button

7. **Stats/Numbers Section**
   - Countup animations
   - Success metrics
   - Icons

8. **CTA Banner**
   - Promotional offers
   - Countdown timers
   - Eye-catching design

## Implementation Phases

### Phase 1: Database Setup (Week 1)
- Create all tables
- Add RLS policies for tenant isolation
- Create seed data migration

### Phase 2: Admin CMS Dashboard (Week 2-3)
- Build admin UI in EduDash Pro web
- Create forms for each configuration section
- Image upload functionality
- Preview mode

### Phase 3: Website Renderer (Week 4)
- Dynamic route generation from tenant_pages
- Section rendering engine
- Theming system based on tenant_website_config
- Responsive design

### Phase 4: Advanced Features (Week 5-6)
- Blog/news system
- Events calendar
- Enrollment tracking
- Analytics dashboard

## Example: Dynamic Routing

```javascript
// In Young Eagles (or any tenant site)
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TenantSite() {
  const [config, setConfig] = useState(null);
  const [pages, setPages] = useState([]);
  const tenantSlug = 'young-eagles'; // Or get from URL

  useEffect(() => {
    async function loadTenantData() {
      // Get tenant config
      const { data: org } = await supabase
        .from('organizations')
        .select('id')
        .eq('slug', tenantSlug)
        .single();
      
      // Get website config
      const { data: siteConfig } = await supabase
        .from('tenant_website_config')
        .select('*')
        .eq('tenant_id', org.id)
        .single();
      
      // Get published pages
      const { data: sitePages } = await supabase
        .from('tenant_pages')
        .select('*')
        .eq('tenant_id', org.id)
        .eq('is_published', true)
        .order('display_order');
      
      setConfig(siteConfig);
      setPages(sitePages);
    }
    
    loadTenantData();
  }, [tenantSlug]);

  return (
    <ThemeProvider colors={config}>
      {pages.map(page => (
        <PageRenderer key={page.id} page={page} />
      ))}
    </ThemeProvider>
  );
}
```

## Security Considerations

1. **RLS Policies**: Ensure tenants can only edit their own content
2. **File Uploads**: Validate file types and sizes, scan for malware
3. **XSS Protection**: Sanitize all user inputs in rich text editors
4. **Rate Limiting**: Prevent abuse of API endpoints
5. **Backup**: Automatic backups of tenant configurations

## Future Enhancements

- A/B testing for different page versions
- Multi-language support
- Accessibility checker
- Mobile app preview
- Template marketplace
- White-label option for advanced tenants

---

**Note**: This system mirrors what Young Eagles has, making it replicable for all future tenants through the EduDash Pro platform.
