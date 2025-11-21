import React from 'react';
import SEOManager from '../components/SEO/SEOManager';

const Terms = () => {
  return (
    <>
      <SEOManager 
        title="Terms of Service - Young Eagles Education Platform"
        description="Terms and conditions for using Young Eagles Education Platform services"
      />
      
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Young Eagles Education Platform, you accept and agree to be bound by 
                these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Provided</h2>
              <p className="text-gray-700 mb-4">Young Eagles provides:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Early childhood education and care (6 months - 6 years)</li>
                <li>STEM and Society 5.0 learning programs</li>
                <li>Parent communication platform (EduDash Pro)</li>
                <li>Progress tracking and reporting</li>
                <li>Educational resources and activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Registration and Enrollment</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Registration fee: R300 (50% off with WELCOME2026 promo code → R150)</li>
                <li>Registration is subject to availability</li>
                <li>Accurate information must be provided during registration</li>
                <li>Payment must be completed to secure enrollment</li>
                <li>Documents (birth certificate, clinic card, parent ID) must be uploaded within 7 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                All payments are processed securely through PayFast. Payment methods include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Credit/Debit cards</li>
                <li>EFT (Electronic Fund Transfer)</li>
                <li>Instant EFT</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>Refund Policy:</strong> Registration fees are non-refundable once enrollment is confirmed, 
                except in cases where we cannot provide the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Parent Responsibilities</h2>
              <p className="text-gray-700 mb-4">Parents/guardians agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and updated contact information</li>
                <li>Submit required documents within specified timeframes</li>
                <li>Pay fees on time</li>
                <li>Inform us of any medical conditions or allergies</li>
                <li>Pick up children at designated times</li>
                <li>Respect our staff and policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Health and Safety</h2>
              <p className="text-gray-700 mb-4">
                We maintain strict health and safety protocols. Parents must:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Keep sick children at home</li>
                <li>Provide emergency contact information</li>
                <li>Authorize medical treatment if necessary</li>
                <li>Follow our COVID-19 and hygiene protocols</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. EduDash Pro App Usage</h2>
              <p className="text-gray-700 mb-4">
                The EduDash Pro parent app is provided free of charge. Parents agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Maintain confidentiality of login credentials</li>
                <li>Use the app for legitimate educational purposes only</li>
                <li>Respect privacy of other families</li>
                <li>Not share content without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content, materials, and resources provided by Young Eagles are our intellectual property. 
                Unauthorized reproduction or distribution is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                While we take every precaution to ensure child safety, we are not liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Minor injuries during normal play activities</li>
                <li>Lost or damaged personal belongings</li>
                <li>Service interruptions due to circumstances beyond our control</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to terminate services if:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Fees are not paid on time</li>
                <li>Terms of service are violated</li>
                <li>Behavior is disruptive or harmful</li>
                <li>Required documents are not provided</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We may update these terms from time to time. Continued use of our services after changes 
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms are governed by the laws of South Africa. Any disputes will be resolved in 
                South African courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> info@youngeagles.org.za</p>
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

export default Terms;
