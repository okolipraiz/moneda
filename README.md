# Moneda Procurement Management System

A modern Vue.js-based procurement transaction management system designed for awarding companies and suppliers to manage procurement workflows efficiently.

## 📁 Project Link

https://moneda-fe.netlify.app/

## 📁 Project Structure

```
moneda-test/
├── public/                          # Static assets
│   ├── images/                      # Image assets
│   │   └── icons/                   # Icon files
│   ├── logo.svg                     # Application logo
│   └── favicon.ico                  # Browser favicon
├── src/
│   ├── components/                  # Reusable Vue components
│   │   ├── icons/                   # Icon components
│   │   │   ├── DashboardIcon.vue
│   │   │   └── TransactionIcon.vue
│   │   ├── DashboardCard.vue        # Dashboard metric cards
│   │   ├── DashboardChart.vue       # Chart visualization
│   │   ├── DashboardCompanies.vue   # Companies listing
│   │   ├── Navbar.vue               # Top navigation bar
│   │   ├── Sidebar.vue              # Left sidebar navigation
│   │   └── NewTransactionModal.vue  # New transaction modal
│   ├── composables/                 # Vue 3 composables
│   │   └── useSidebar.ts            # Sidebar state management
│   ├── utils/                       # Utility functions
│   │   └── index.ts                 # Base URL configuration
│   ├── views/                       # Page components
│   │   ├── Dashboard.vue            # Main dashboard view
│   │   ├── Transactions.vue         # Transaction creation view
│   │   └── NotFound.vue             # 404 error page
│   ├── App.vue                      # Root application component
│   ├── main.js                      # Application entry point
│   └── router.js                    # Vue Router configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # Project Overview
```

## 🛠️ Technologies Used

- **Frontend Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Iconsax icon library
- **State Management**: Vue 3 reactive refs
- **Routing**: Vue Router 4
- **HTTP Client**: Native Fetch API
- **Notifications**: Vue Sonner (toast notifications)
- **TypeScript**: For type safety (composables)

## 🔧 Core Components

### 1. **Dashboard.vue**
- **Purpose**: Main dashboard displaying procurement metrics and analytics
- **Features**:
  - Top OEMs/Suppliers summary
  - Transaction metrics (count, value, costs, profitability)
  - Transaction type charts
  - Awarding companies overview
- **Error Handling**: Comprehensive error cards for failed API calls with retry functionality

### 2. **Transactions.vue**
- **Purpose**: Two-step wizard for creating new procurement transactions
- **Step 1 - Awarding Company**:
  - Company selection
  - Contract details (value, terms, incoterms)
  - File uploads (Purchase Order, Previous Invoice, Bank Statement)
- **Step 2 - Suppliers**:
  - Supplier information and selection criteria
  - Cost breakdown (items, logistics, other costs)
  - Pro-Forma invoice upload
- **Features**:
  - Form validation
  - File upload with size/type restrictions
  - Multi-step navigation
  - Automatic form clearing on successful submission

### 3. **NotFound.vue**
- **Purpose**: 404 error page for unmatched routes
- **Features**:
  - User-friendly error messaging
  - Navigation back to dashboard
  - Smart back button with browser history support
  - Responsive design matching brand aesthetics

### 4. **Navigation Components**
- **Navbar.vue**: Top navigation with mobile menu toggle
- **Sidebar.vue**: Left sidebar with navigation links and mobile overlay

### 5. **Dashboard Components**
- **DashboardCard.vue**: Metric display cards
- **DashboardChart.vue**: Transaction type visualization
- **DashboardCompanies.vue**: Awarding companies listing

## 🌍 Environment Variables

Create a `.env.development` file in the root directory:

```env
VITE_API_BASE_URL=https://musa-mock-production.up.railway.app
```

The application uses this base URL for all API calls through the `@/utils` configuration.

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moneda-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API base URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🔌 API Integration

### Endpoints Used
- `GET /summary` - Dashboard metrics and summary data
- `GET /awarding-company` - List of awarding companies
- `POST /transaction` - Submit new procurement transaction

### Transaction Submission Format
The system submits multipart form data with:
- **JSON payload**: Transaction details and supplier information
- **File attachments**: Purchase orders, invoices, bank statements, pro-forma invoices
- **Supplier-specific files**: Named by supplier identifier

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Moneda brand colors (orange, black, gray)
- **Typography**: Consistent font sizing and weights
- **Spacing**: Tailwind-based spacing system
- **Responsive**: Mobile-first design with desktop enhancements

### User Experience
- **Step-by-step wizard**: Clear progression through transaction creation
- **Real-time validation**: Form validation with immediate feedback
- **Error handling**: User-friendly error messages with retry options
- **File management**: Drag-and-drop file uploads with validation
- **Mobile optimization**: Responsive sidebar and navigation

## 🔒 Security Features

- **File validation**: 2MB size limit and allowed file types
- **Input sanitization**: Form input validation and sanitization
- **Error boundaries**: Graceful error handling without exposing sensitive data

## 📱 Mobile Responsiveness

- **Responsive grid layouts**: Adapts to different screen sizes
- **Mobile sidebar**: Collapsible navigation for mobile devices
- **Touch-friendly**: Optimized for touch interactions
- **Progressive enhancement**: Core functionality works on all devices

## 🧪 Development Notes

### Code Organization
- **Composition API**: Modern Vue 3 patterns for better code organization
- **Composables**: Reusable logic in `useSidebar.ts`
- **Component structure**: Single responsibility principle for components
- **Error handling**: Centralized error management with user feedback

### Performance Considerations
- **Lazy loading**: Components loaded as needed
- **Optimized images**: SVG icons and optimized image assets
- **Efficient state management**: Minimal reactive state for better performance

### Testing Strategy
- **Component testing**: Individual component validation
- **Integration testing**: API integration testing
- **User flow testing**: End-to-end transaction creation flow

## 🚧 Known Issues & Limitations

- **File upload size**: Limited to 2MB per file
- **Supported formats**: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX only
- **Browser compatibility**: Modern browsers with ES6+ support required

## 🔮 Long-term Vision

### Phase 1: Core Functionality ✅
- [x] Basic procurement transaction creation
- [x] Dashboard with metrics
- [x] File upload system
- [x] Mobile-responsive design

### Phase 2: Enhanced Features 🚧
- [ ] User authentication and authorization
- [ ] Role-based access control
- [ ] Advanced reporting and analytics
- [ ] Bulk transaction processing
- [ ] Email notifications

### Phase 3: Enterprise Features 📋
- [ ] Multi-tenant architecture
- [ ] Advanced workflow management
- [ ] Integration with ERP systems
- [ ] Advanced analytics dashboard
- [ ] API rate limiting and monitoring

### Phase 4: AI & Automation 🤖
- [ ] Intelligent form validation
- [ ] Automated document processing
- [ ] Predictive analytics
- [ ] Smart supplier recommendations
- [ ] Automated approval workflows

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the project documentation

---

**Built with ❤️ by the Praise**
