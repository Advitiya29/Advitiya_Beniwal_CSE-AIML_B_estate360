import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Estate 360",
  description: "Learn how Estate 360 collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-beige-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brown-900">Privacy Policy</h1>
                <p className="max-w-[700px] text-brown-700 md:text-xl">
                  How we collect, use, and protect your information.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="prose max-w-4xl mx-auto text-brown-700">
              <p>Last updated: May 4, 2025</p>

              <h2 className="text-brown-900">1. Introduction</h2>
              <p>
                Estate 360 ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our website, mobile
                applications, and services (collectively, the "Services").
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you
                have read, understood, and agree to be bound by this Privacy Policy.
              </p>

              <h2 className="text-brown-900">2. Information We Collect</h2>
              <p>We may collect information about you in various ways:</p>
              <h3 className="text-brown-800">2.1 Personal Information</h3>
              <p>When you register for an account, express interest in a property, or contact us, we may collect:</p>
              <ul>
                <li>Contact information (name, email address, phone number, postal address)</li>
                <li>Account credentials (username, password)</li>
                <li>Financial information (for transactions)</li>
                <li>Property preferences and search criteria</li>
              </ul>

              <h3 className="text-brown-800">2.2 Usage Information</h3>
              <p>
                We automatically collect certain information about your device and how you interact with our Services:
              </p>
              <ul>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage patterns (pages visited, time spent, clicks)</li>
                <li>Location data (with your permission)</li>
                <li>Cookies and similar technologies</li>
              </ul>

              <h2 className="text-brown-900">3. How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including:</p>
              <ul>
                <li>Providing and improving our Services</li>
                <li>Processing transactions and property inquiries</li>
                <li>Communicating with you about properties, services, and updates</li>
                <li>Personalizing your experience and showing relevant properties</li>
                <li>Analyzing usage patterns to improve our Services</li>
                <li>Protecting our Services and preventing fraud</li>
                <li>Complying with legal obligations</li>
              </ul>

              <h2 className="text-brown-900">4. Information Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul>
                <li>Property owners or agents when you express interest in a property</li>
                <li>Service providers who help us operate our business</li>
                <li>Business partners with your consent</li>
                <li>Legal authorities when required by law</li>
                <li>Other parties in connection with a merger, acquisition, or sale of assets</li>
              </ul>

              <h2 className="text-brown-900">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from
                unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over
                the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-brown-900">6. Your Rights and Choices</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information:</p>
              <ul>
                <li>Access and review your personal information</li>
                <li>Correct inaccuracies in your personal information</li>
                <li>Delete your personal information</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Data portability</li>
                <li>Withdraw consent (where processing is based on consent)</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>

              <h2 className="text-brown-900">7. Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver
                personalized content. You can control cookies through your browser settings, but disabling cookies may
                limit your ability to use certain features of our Services.
              </p>

              <h2 className="text-brown-900">8. Children's Privacy</h2>
              <p>
                Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal
                information from children. If you are a parent or guardian and believe your child has provided us with
                personal information, please contact us.
              </p>

              <h2 className="text-brown-900">9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by
                posting the updated policy on our website or by other means. Your continued use of our Services after
                such modifications constitutes your acceptance of the revised policy.
              </p>

              <h2 className="text-brown-900">10. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact
                us at:
              </p>
              <p>
                Email: advitya.sanyam.estate360@gmail.com
                <br />
                Address: Estate 360 Headquarters, Golf Course Road, Sector 54, Gurgaon, Haryana 122002
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
