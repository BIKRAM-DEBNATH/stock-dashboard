# JarNox Stock Market Dashboard

A professional stock market dashboard built with Next.js, featuring real-time stock data visualization, interactive charts, and AI-powered price predictions.

## 🚀 Features

- **Interactive Dashboard**: Clean, responsive interface with company selection sidebar
- **Real-time Charts**: Interactive stock price and volume charts using Recharts
- **AI Price Prediction**: Machine learning-based next-day price forecasting
- **Professional UI**: Modern design with shadcn/ui components
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Mock Data**: Includes sample data for 12 major Indian companies

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts library
- **Icons**: Lucide React
- **Fonts**: DM Sans (Google Fonts)

## 📊 Dashboard Features

### Left Panel - Company List
- Scrollable list of 12+ companies
- Company details including sector and market cap
- Visual selection indicators
- Search and filter capabilities

### Main Panel - Chart Area
- Interactive area chart for stock price trends
- Volume analysis with line charts
- Real-time statistics cards (Current Price, 52W High/Low, Average Volume)
- Historical data table with OHLC values

### AI Prediction Panel
- Next-day price forecasting
- Confidence levels and prediction ranges
- Algorithm transparency with key factors
- Trend analysis and volatility metrics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd stock-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and run with Docker Compose**
   \`\`\`bash
   docker-compose up --build
   \`\`\`

2. **Access the application**
   Open [http://localhost:3000](http://localhost:3000)

### Using Docker directly

1. **Build the Docker image**
   \`\`\`bash
   docker build -t stock-dashboard .
   \`\`\`

2. **Run the container**
   \`\`\`bash
   docker run -p 3000:3000 stock-dashboard
   \`\`\`

## ☁️ Cloud Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Railway
1. Connect your GitHub repository
2. Railway will automatically detect Next.js and deploy

### Render
1. Create a new Web Service
2. Connect your repository
3. Use the following settings:
   - Build Command: `npm run build`
   - Start Command: `npm start`

## 🗄️ Database Setup (Optional)

The application currently uses mock data, but you can integrate with a real database:

### PostgreSQL Setup

1. **Install PostgreSQL** or use a cloud service (Supabase, Neon, etc.)

2. **Run the SQL scripts**
   \`\`\`bash
   # Create tables and seed data
   psql -d your_database -f scripts/01-create-tables.sql
   psql -d your_database -f scripts/02-seed-companies.sql
   psql -d your_database -f scripts/03-seed-stock-data.sql
   \`\`\`

3. **Update environment variables**
   \`\`\`env
   DATABASE_URL="postgresql://username:password@localhost:5432/stockdashboard"
   \`\`\`

4. **Update database functions** in `lib/database.ts` to use real database queries

## 🤖 AI Prediction Algorithm

The AI prediction system uses a hybrid approach:

- **Moving Average Analysis**: Simple and weighted moving averages
- **Trend Detection**: Comparing recent price movements
- **Volume Analysis**: Trading volume impact on price movements
- **Volatility Assessment**: Risk and confidence calculation

### Algorithm Components:
1. **Base Prediction**: Weighted moving average of last 10 days
2. **Trend Adjustment**: Recent price momentum analysis
3. **Volume Factor**: High volume impact consideration
4. **Confidence Scoring**: Based on price volatility

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── companies/     # Company and stock data endpoints
│   ├── globals.css        # Global styles and design tokens
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main dashboard page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Dashboard header
│   ├── company-list.tsx  # Company sidebar
│   ├── chart-area.tsx    # Main chart area
│   └── ai-prediction.tsx # AI prediction card
├── lib/                  # Utility functions
│   ├── api-client.ts     # API client and React hooks
│   ├── database.ts       # Database utilities
│   ├── mock-data.ts      # Sample data generation
│   └── utils.ts          # General utilities
├── scripts/              # Database scripts
│   ├── 01-create-tables.sql
│   ├── 02-seed-companies.sql
│   └── 03-seed-stock-data.sql
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
└── README.md            # This file
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: Deep gray (#1f2937) for stability and professionalism
- **Accent**: Purple (#8b5cf6) for highlights and important metrics
- **Neutrals**: White, light gray, medium gray for backgrounds and text
- **Status Colors**: Green for positive changes, red for negative changes

### Typography
- **Font Family**: DM Sans (Professional and readable)
- **Hierarchy**: Clear distinction between headings and body text
- **Responsive**: Scales appropriately across devices

## 📈 API Endpoints

- `GET /api/companies` - List all companies
- `GET /api/companies/[id]` - Get company details
- `GET /api/companies/[id]/prices` - Get stock price history
- `GET /api/companies/[id]/stats` - Get company statistics
- `GET /api/companies/[id]/predict` - Get AI price prediction

## 🧪 Development Approach

### Code Quality
- TypeScript for type safety
- Component-based architecture
- Responsive design principles
- Clean, maintainable code structure

### Performance
- Next.js optimizations (SSR, image optimization)
- Efficient data fetching with React hooks
- Optimized chart rendering
- Lazy loading where appropriate

### User Experience
- Intuitive navigation
- Interactive charts with tooltips
- Loading states and error handling
- Professional visual design

## 🚧 Challenges Encountered

1. **Chart Integration**: Implementing interactive charts with proper responsive behavior
2. **AI Algorithm**: Balancing prediction accuracy with computational efficiency
3. **Data Management**: Structuring mock data to simulate real market conditions
4. **UI/UX Design**: Creating a professional interface that's both functional and visually appealing

## 🔮 Future Enhancements

- Real-time data integration with stock market APIs
- Advanced technical indicators (RSI, MACD, Bollinger Bands)
- Portfolio management features
- User authentication and personalized watchlists
- Mobile app development
- Advanced ML models for better predictions

## 📝 Assignment Completion

This project fulfills all requirements of the JarNox Full Stack Development assignment:

✅ **UI Design**: Clean, responsive webpage with left panel and main chart area  
✅ **Data Handling**: Mock dataset with realistic stock market data  
✅ **Backend**: REST API using Next.js API routes  
✅ **Frontend**: React with interactive charts using Recharts  
✅ **Bonus Features**: 
- Deployed application ready
- Dockerized project
- AI-based price prediction
- 52-week high/low and volume metrics
- Comprehensive documentation

## 👨‍💻 Developer Notes

**Development Time**: ~8-10 hours  
**Key Technologies**: Next.js, TypeScript, Recharts, Tailwind CSS  
**Deployment**: Ready for Vercel, Railway, or Docker deployment  

This project demonstrates proficiency in full-stack development, modern React patterns, API design, data visualization, and deployment practices.

## 📞 Contact

For questions about this project or the assignment, please contact:
**Email**: shaktijarnox@outlook.com

---

**Built with ❤️ for JarNox Assignment**
