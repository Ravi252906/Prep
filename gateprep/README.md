# GATEPrep - Premium GATE CS/IT Preparation Platform

A modern, production-quality frontend-only GATE CS/IT preparation dashboard built with React.js, Vite, and Tailwind CSS.

## 🎨 Design Philosophy

GATEPrep features a premium, professional EdTech SaaS design inspired by modern platforms like Notion, Linear, and Vercel. The interface is clean, elegant, and minimal with:

- **Deep navy/blue primary theme** with white and light-gray surfaces
- **Subtle gradients and soft shadows** for depth
- **Large rounded corners** and excellent whitespace
- **Modern typography** using Inter font
- **Strong visual hierarchy** with clear information grouping
- **Smooth animations** and micro-interactions

## 🚀 Features

### Core Pages
- **Dashboard** - Hero section with countdown, statistics, subject progress, weekly charts, tasks, and insights
- **Subjects** - Track progress across all 6 GATE subjects with detailed metrics
- **Practice** - Topic-wise question practice with difficulty levels and completion tracking
- **Mock Tests** - Full-length and subject-wise mock tests with detailed analytics
- **Analytics** - Performance charts, subject-wise analysis, and progress tracking
- **Study Planner** - Weekly schedule, deadlines, and study goals with timeline view
- **Notes** - Organize and access study notes with subject categorization
- **Settings** - Account management, notifications, and preferences
- **Profile** - User profile with achievements and GATE information

### UI Components
- **Sidebar** - Collapsible navigation with groups, tooltips, and active indicators
- **Navbar** - Search, notifications, and profile menu with dropdowns
- **StatCard** - Statistics with trend indicators and micro-interactions
- **CountdownCard** - Premium GATE exam countdown with gradient design
- **SubjectCard** - Progress bars, difficulty badges, and topic counts
- **TaskCard** - Interactive tasks with categories, time estimates, and animations
- **QuickActionCard** - Action cards with descriptions and hover effects
- **InsightCard** - Preparation insights with meaningful icons
- **Button** - Primary, secondary, ghost, and danger variants
- **Badge** - Color-coded badges for status and categories
- **ChartCard** - Reusable chart container

### Design System
- **Colors** - Primary (navy/blue), semantic colors (success, warning, error)
- **Typography** - Inter font family with consistent scale
- **Spacing** - 8px base spacing system
- **Shadows** - Premium card shadows with hover states
- **Borders** - Consistent border radius and colors
- **Animations** - Fade-in, slide-in, scale-in, and hover transitions

## 📦 Tech Stack

- **React.js** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **Recharts** - Chart library

## 🛠️ Installation

```bash
cd gateprep
npm install
```

## 🏃 Running the Application

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or the next available port).

## 📁 Project Structure

```
gateprep/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   └── Badge.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── StatCard.jsx
│   │   ├── CountdownCard.jsx
│   │   ├── SubjectCard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── QuickActionCard.jsx
│   │   ├── InsightCard.jsx
│   │   ├── ChartCard.jsx
│   │   └── ProgressBar.jsx
│   ├── data/                # Mock data files
│   │   ├── dashboard.js
│   │   ├── subjects.js
│   │   ├── questions.js
│   │   └── planner.js
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Subjects.jsx
│   │   ├── Practice.jsx
│   │   ├── MockTests.jsx
│   │   ├── Analytics.jsx
│   │   ├── Planner.jsx
│   │   ├── Notes.jsx
│   │   ├── Settings.jsx
│   │   └── Profile.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── package.json
```

## 🎯 Key Highlights

### Responsive Design
- **Desktop** - Fixed sidebar with collapse functionality
- **Tablet** - Adaptive grid layouts
- **Mobile** - Collapsible sidebar with overlay drawer

### Interactions
- Smooth page transitions
- Card hover effects with shadow changes
- Button feedback states
- Sidebar collapse/expand animations
- Task completion animations
- Progress bar animations

### Accessibility
- Semantic HTML elements
- Accessible color contrast
- Keyboard-friendly navigation
- Focus states on interactive elements
- Screen reader friendly

## 🔧 Customization

### Change GATE Exam Date
Edit `src/data/dashboard.js`:
```javascript
export const GATE_EXAM_DATE = new Date('2027-02-06');
```

### Modify Colors
Edit `tailwind.config.js` to customize the color palette.

### Update Mock Data
All mock data is organized in `src/data/` directory for easy replacement with real data.

## 🚧 Future Enhancements

- Backend API integration
- Real authentication system
- Database persistence
- Real-time analytics
- Actual MCQ engine
- Advanced mock test features
- Note editor with rich text
- Study timer and focus mode
- Social features and leaderboards

## 📝 Notes

- This is a **frontend-only** application using mock data
- No backend, database, or external API integration
- All data is stored in React state
- Perfect for portfolio projects and hackathons
- Ready for backend integration when needed

## 🎨 Design Credits

Design inspired by modern EdTech platforms including:
- Notion (clean, minimal interface)
- Linear (sophisticated navigation)
- Vercel (premium visual design)
- Professional learning dashboards

## 📄 License

This project is open source and available for educational purposes.
