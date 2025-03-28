import { Leaf, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/welcome" className="text-xl font-bold text-[#7fcf5f] flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#7fcf5f] flex items-center justify-center text-white">
                  <Leaf className="h-4 w-4" />
                </div>
                <span className="hidden sm:inline">NutriGuard</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-[#7fcf5f]"
              asChild
            >
              <Link to="/welcome">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-full bg-[#7fcf5f] flex items-center justify-center text-white">
              <Leaf className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Privacy Policy & Terms of Service</h1>
          </div>

          {/* Last Updated */}
          <p className="text-sm text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
              <p className="text-gray-700">
                NutriGuard is committed to protecting your privacy and ensuring the ethical use of data in our mission to improve child nutrition in Rwanda. This document outlines our privacy policy, terms of service, and ethical frameworks.
              </p>
            </section>

            {/* Data Collection and Use */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Collection and Use</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We collect and process the following types of data:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Personal information (name, contact details)</li>
                  <li>Child health records and measurements</li>
                  <li>Photographic data for malnutrition assessment</li>
                  <li>Usage data and analytics</li>
                </ul>
                <p className="text-gray-700">
                  All data collection follows the principles of:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Minimal data collection</li>
                  <li>Purpose limitation</li>
                  <li>Data accuracy</li>
                  <li>Storage limitation</li>
                  <li>Integrity and confidentiality</li>
                </ul>
              </div>
            </section>

            {/* Ethical Framework */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ethical Framework</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Core Principles</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Beneficence:</strong> Maximizing benefits while minimizing risks</li>
                  <li><strong>Non-maleficence:</strong> Preventing harm to children and families</li>
                  <li><strong>Autonomy:</strong> Respecting individual and family choices</li>
                  <li><strong>Justice:</strong> Ensuring fair and equitable access to services</li>
                  <li><strong>Transparency:</strong> Clear communication about data use and policies</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mt-4">Research Ethics</h3>
                <p className="text-gray-700">
                  Our platform adheres to the following research ethics guidelines:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Informed consent for data collection and use</li>
                  <li>Protection of vulnerable populations</li>
                  <li>Data anonymization and security</li>
                  <li>Regular ethical review of practices</li>
                  <li>Compliance with local and international regulations</li>
                </ul>
              </div>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Protection</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We implement robust security measures to protect your data:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Encryption of sensitive data</li>
                  <li>Secure data storage and transmission</li>
                  <li>Regular security audits</li>
                  <li>Access control and authentication</li>
                  <li>Data backup and recovery procedures</li>
                </ul>
              </div>
            </section>

            {/* Copyright Agreement */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Copyright Agreement</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  All content on NutriGuard, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Text, graphics, and images</li>
                  <li>Software and algorithms</li>
                  <li>Research findings and methodologies</li>
                  <li>User interface and design</li>
                </ul>
                <p className="text-gray-700">
                  is protected by copyright law. Users may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Copy or reproduce any content without permission</li>
                  <li>Modify or create derivative works</li>
                  <li>Distribute or publicly display content</li>
                  <li>Use content for commercial purposes</li>
                </ul>
              </div>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  NutriGuard provides the following disclaimers:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>The information provided is for educational purposes only</li>
                  <li>Our assessment tools are aids and should not replace professional medical advice</li>
                  <li>We do not guarantee the accuracy of predictions or recommendations</li>
                  <li>Users are responsible for their interpretation and use of the information</li>
                  <li>We are not liable for any damages arising from the use of our services</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <div className="space-y-2 text-gray-700">
                <p>For questions about our privacy policy or terms of service, please contact:</p>
                <p>Email: privacy@nutriguard.rw</p>
                <p>Phone: +250 785 609 006</p>
                <p>Address: Kicukiro - Kigali, Rwanda</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#7fcf5f] flex items-center justify-center text-white">
                  <Leaf className="h-4 w-4" />
                </div>
                <span className="font-bold text-gray-800">NutriGuard</span>
              </div>
              <p className="text-sm text-gray-600">
                Empowering healthy futures for every child in Rwanda.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/welcome" className="text-sm text-gray-600 hover:text-[#7fcf5f] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="text-sm text-gray-600 hover:text-[#7fcf5f] transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-gray-600 hover:text-[#7fcf5f] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-gray-600 hover:text-[#7fcf5f] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-gray-600 hover:text-[#7fcf5f] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-gray-600 hover:text-[#7fcf5f] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-sm text-gray-600 hover:text-[#7fcf5f] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">
                  Email: support@nutriguard.rw
                </li>
                <li className="text-sm text-gray-600">
                  Phone: +250 785 609 006
                </li>
                <li className="text-sm text-gray-600">
                  Address: Kicukiro - Kigali, Rwanda
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} NutriGuard. All rights reserved.
              </div>
              <div className="flex gap-6">
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-[#7fcf5f] transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-[#7fcf5f] transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy; 