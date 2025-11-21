import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductionHome from './pages/ProductionHome';
import PublicRegistration from './pages/PublicRegistration';
import Programs from './pages/Programs';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Dashboard from './pages/ParentDashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Login from './auth/Login';
import TeacherLogin from './teacher/TeacherLogin';
import AdminLogin from './components/Admin/AdminLogin';
import Register from './components/Parents/Register';
import RegisterChild from './components/Parents/RegisterChild';
import Lessons from './pages/ParentDashboard/Lessons';
import Notifications from './pages/ParentDashboard/Notifications';
import Resources from './pages/ParentDashboard/Resources';
import Videos from './pages/ParentDashboard/Videos';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import TeacherChildrenList from './teacher/TeacherChildrenList';
import AttendancePage from "./teacher/AttendancePage";
import HomeworkList from './pages/HomeworkList';
import UploadHomework from './pages/TeacherDashboard/UploadHomework';
import SubmitWork from './pages/ParentDashboard/SubmitWork';
import { Toaster } from 'sonner';
import AOS from 'aos';
import NotificationPermission from './components/NotificationPermission';
import TeacherActivityBuilder from './pages/TeacherDashboard/TeacherActivityBuilder';
import FirebaseActionHandler from './components/FirebaseActionHandler';
import PasswordReset from './components/PasswordReset';
import PasswordlessLogin from './auth/PasswordlessLogin';
import PhoneLogin from './auth/PhoneLogin';
import NotificationManager from './components/NotificationManager';
import AuthTest from './auth/AuthTest';
import MessagingCenter from './components/Messaging/MessagingCenter';
import WhatsAppFloat from './components/WhatsAppFloat';
import FloatingElements from './components/FloatingElements';
import BubbleAnimation from './components/BubbleAnimation';
import './App.css';


function App() {
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Cleanup memory on unmount and page refresh
  useEffect(() => {
    const cleanup = () => {
      // Clear any cached data
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            if (name.includes('workbox') || name.includes('runtime')) {
              caches.delete(name);
            }
          });
        });
      }
      
      // Clear session storage (but keep localStorage for user preferences)
      sessionStorage.clear();
      
      // Force garbage collection if available (Chrome DevTools only)
      if (window.gc) {
        window.gc();
      }
    };

    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
    
    return () => {
      window.removeEventListener('beforeunload', cleanup);
      cleanup();
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            success: {
              className: 'bg-green-500 text-white',
              style: {
                backgroundColor: '#4CAF50',
                color: '#fff',
              },
            },
            error: {
              className: 'bg-red-500 text-white',
              style: {
                backgroundColor: '#F44336',
                color: '#fff',
              },
            },
          }}
          expand
        />
        
        <Routes>
{/* Public Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<ProductionHome />} />
              <Route path="/home" element={<ProductionHome />} />
              <Route path="/old-home" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/public-registration" element={<PublicRegistration />} />
            <Route path="/teacher/login" element={<TeacherLogin />} />
            <Route path="/teacher-login" element={<TeacherLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/passwordless-login" element={<PasswordlessLogin />} />
            <Route path="/phone-login" element={<PhoneLogin />} />
            <Route path="/auth/action" element={<FirebaseActionHandler />} />
            <Route path="/auth-test" element={<AuthTest />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/student/homework" element={<HomeworkList />} />
              <Route path="/submit-work" element={<SubmitWork />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/messages" element={<MessagingCenter />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route path="/view-attendance" element={<AttendancePage />} />
              <Route path="/teacher-children-list" element={<TeacherChildrenList />} />
              <Route path="/homework/upload" element={<UploadHomework />} />
              <Route path="/register-child" element={<RegisterChild />} />
              <Route path="/teacher-dashboard/activity-builder" element={<TeacherActivityBuilder />} />
            </Route>

            {/* Catch-all 404 */}
            <Route path="*" element={<div className="p-4 text-center">404 Not Found</div>} />
            <Route path="/unauthorized" element={<div className="p-4 text-center">You are not authorized to view this page.</div>} />
        </Routes>
        
        {/* Global Background Animations */}
        <FloatingElements />
        <BubbleAnimation />
        
        {/* Notification Components */}
        <NotificationPermission />
        
        {/* WhatsApp/Facebook-style Notifications */}
        <NotificationManager />
        
        {/* WhatsApp Floating Button */}
        <WhatsAppFloat />
        
      </Router>
    </HelmetProvider>
  );
}

export default App;
