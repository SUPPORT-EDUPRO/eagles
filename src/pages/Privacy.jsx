import React from 'react';
import SEOManager from '../components/SEO/SEOManager';

const Privacy = () => {
  return (
    <>
      <SEOManager 
        title="Privacy Policy - Young Eagles Education Platform"
        description="Our privacy policy explains how we collect, use, and protect your personal information"
      />
      
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                At Young Eagles Education Platform, we collect information to provide better services to our users:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Personal information (name, email, phone number)</li>
                <li>Child information (name, age, medical information for care purposes)</li>
                <li>Payment information (processed securely through PayFast)</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide and maintain our educational services</li>
                <li>Process registrations and payments</li>
                <li>Communicate with parents about their child's progress</li>
                <li>Send important notifications and updates</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Protection</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Encrypted data transmission (SSL/TLS)</li>
                <li>Secure database storage with Supabase</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">We use trusted third-party services:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Supabase</strong> - Database and authentication</li>
                <li><strong>PayFast</strong> - Payment processing</li>
                <li><strong>Firebase</strong> - Real-time notifications</li>
                <li><strong>Google Analytics</strong> - Usage analytics</li>
                <li><strong>Vercel</strong> - Web hosting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
              <p className="text-gray-700 mb-4">Under POPIA (Protection of Personal Information Act), you have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your information</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                We are committed to protecting children's privacy. We only collect information necessary for 
                educational purposes and with explicit parental consent. All child information is stored securely 
                and accessed only by authorized staff.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies to improve your experience on our website. You can control cookie settings 
                through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@youngeagles.org.za</p>
                <p className="text-gray-700"><strong>Phone:</strong> 081 523 6000</p>
                <p className="text-gray-700"><strong>Address:</strong> 7118 Section U Shabangu Street, Mamelodi, Pretoria 0122</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
