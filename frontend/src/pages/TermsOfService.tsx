import { Leaf } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-full bg-[#7fcf5f] flex items-center justify-center text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Terms of Service</h1>
        </div>

        {/* Last Updated */}
        <p className="text-sm text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              Welcome to NutriGuard. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.
            </p>
          </section>

          {/* Definitions */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Definitions</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>"Service"</strong> refers to the NutriGuard platform and all its features</p>
              <p><strong>"User"</strong> refers to any individual or entity using our Service</p>
              <p><strong>"Content"</strong> refers to all information and materials available on our platform</p>
              <p><strong>"Data"</strong> refers to any information collected or processed through our Service</p>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
            <div className="space-y-4">
              <p className="text-gray-700">When creating an account, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any security breaches</li>
                <li>Not share your account with others</li>
              </ul>
            </div>
          </section>

          {/* Service Usage */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Service Usage</h2>
            <div className="space-y-4">
              <p className="text-gray-700">Users agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use the Service only for its intended purpose</li>
                <li>Not attempt to access unauthorized areas of the Service</li>
                <li>Not interfere with the proper working of the Service</li>
                <li>Not use the Service for any illegal purposes</li>
                <li>Not upload malicious software or content</li>
                <li>Not attempt to reverse engineer the Service</li>
              </ul>
            </div>
          </section>

          {/* Healthcare Worker Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Healthcare Worker Responsibilities</h2>
            <div className="space-y-4">
              <p className="text-gray-700">Healthcare workers using our platform must:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Maintain professional standards of care</li>
                <li>Keep patient information confidential</li>
                <li>Use the platform in accordance with medical ethics</li>
                <li>Verify their credentials and maintain them</li>
                <li>Report any concerns about child welfare</li>
                <li>Follow local healthcare regulations</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Intellectual Property</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                All content, features, and functionality of NutriGuard are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-700">
                Users may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Copy or reproduce any part of the Service</li>
                <li>Modify or create derivative works</li>
                <li>Use our trademarks or branding</li>
                <li>Remove any copyright notices</li>
                <li>Use the Service for commercial purposes without permission</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Limitation of Liability</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                NutriGuard shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Service interruptions or technical issues</li>
                <li>Third-party actions or content</li>
                <li>User-generated content or actions</li>
                <li>Medical advice or treatment outcomes</li>
              </ul>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Termination</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Terminate or suspend access to our Service</li>
                <li>Remove or edit content</li>
                <li>Discontinue the Service</li>
                <li>Modify these terms at any time</li>
              </ul>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Governing Law</h2>
            <p className="text-gray-700">
              These terms shall be governed by and construed in accordance with the laws of Rwanda. Any disputes shall be subject to the exclusive jurisdiction of the courts in Kigali.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Us</h2>
            <div className="space-y-2 text-gray-700">
              <p>For questions about these terms, please contact:</p>
              <p>Email: legal@nutriguard.rw</p>
              <p>Phone: +250 785 609 006</p>
              <p>Address: Kicukiro - Kigali, Rwanda</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 