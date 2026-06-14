# Currency Exchange Management System

This Currency Exchange Management System is a complete frontend solution that enables users to manage currencies, exchange rates, transactions, customers, and generate reports. It features a responsive admin dashboard with dark/light mode, real-time currency conversion, interactive charts, and full CRUD operations using React state and localStorage. No backend required – all data is stored locally in the browser.

## Features

### Authentication
- Login / Register with localStorage user persistence
- Profile management with image upload
- Change password functionality

### Dashboard
- Statistics cards (total transactions, revenue, customers, etc.)
- Interactive charts (transaction trends, revenue, currency rates, daily exchange)
- Latest transactions table
- Currency rates table

### Currency Management
- Add, edit, delete currencies
- Search, sort, paginate currency table
- Set buy/sell rates and status

### Exchange Rate Management
- Update exchange rates for all currencies
- Real-time rate updates with notifications

### Currency Converter
- Convert between any two currencies
- Auto-calculation with fees (1%)
- Swap currencies with one click

### Exchange Transactions
- Create new exchange transactions
- View transaction history with search and filter
- Status management (Completed, Pending, Cancelled)
- Fee calculation and total amount display

### Customer Management
- Add, edit, delete customers
- Store customer details (name, email, phone, address, country)
- Registration date tracking

### Reports
- Daily, weekly, monthly, annual reports
- Revenue and transaction charts
- Most exchanged currency analysis
- Export to PDF/Excel (UI placeholders)

### Notifications
- Real-time notifications for transactions, rate updates, customers
- Mark as read / delete / mark all as read

### Settings
- Theme settings (dark/light mode)
- Language, currency, timezone preferences
- Notification and email alert toggles

### General UI/UX
- Responsive design (mobile, tablet, desktop)
- Sticky header and collapsible sidebar
- Loading skeletons and empty states
- Toast notifications for all actions
- Modal forms and confirmation dialogs
- Sortable, searchable, paginated data tables

## Tech Stack

- **React 18** – UI library
- **Vite** – Build tool and development server
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – Styling with dark mode support
- **React Icons** – Icon library
- **Chart.js & react-chartjs-2** – Charts and graphs
- **Axios** – Promise-based HTTP client (for mock API structure)
- **React Hot Toast** – Toast notifications
- **date-fns** – Date formatting
- **Context API** – State management
- **localStorage** – Data persistence


