import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | Estate 360",
  description: "Terms and conditions for using Estate 360's services and website.",
}

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-beige-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brown-900">Terms of Use</h1>
                <p className="max-w-[700px] text-brown-700 md:text-xl">
                  Please read these terms carefully before using our services.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="prose max-w-4xl mx-auto text-brown-700">
              <p>Last updated: May 4, 2025</p>

              <h2 className="text-brown-900">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Estate 360 website, mobile applications, or any other services provided by
                Estate 360 (collectively, the "Services"), you agree to be bound by these Terms of Use. If you do not
                agree to these terms, please do not use our Services.
              </p>

              <h2 className="text-brown-900">2. Description of Services</h2>
              <p>
                Estate 360 provides an online platform that connects real estate buyers, sellers, and renters with
                properties and real estate professionals in Gurgaon. Our Services include property listings, 360°
                virtual tours, property information, and communication tools.
              </p>

              <h2 className="text-brown-900">3. User Accounts</h2>
              <p>
                To access certain features of our Services, you may need to create an account. You are responsible for
                maintaining the confidentiality of your account information and for all activities that occur under your
                account. You agree to provide accurate and complete information when creating your account and to update
                your information to keep it accurate and current.
              </p>

              <h2 className="text-brown-900">4. User Conduct</h2>
              <p>You agree not to use our Services to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe the rights of others</li>
                <li>Post or transmit unauthorized commercial communications</li>
                <li>Upload viruses or other malicious code</li>
                <li>Collect users' information without their consent</li>
                <li>Interfere with the proper working of the Services</li>
              </ul>

              <h2 className="text-brown-900">5. Property Listings</h2>
              <p>
                Estate 360 strives to provide accurate and up-to-date property listings. However, we do not guarantee
                the accuracy, completeness, or availability of any listing. Property details, including prices,
                availability, and features, are subject to change without notice.
              </p>

              <h2 className="text-brown-900">6. Intellectual Property</h2>
              <p>
                All content on our Services, including text, graphics, logos, images, audio clips, digital downloads,
                and data compilations, is the property of Estate 360 or its content suppliers and is protected by Indian
                and international copyright laws. The compilation of all content on our Services is the exclusive
                property of Estate 360 and is protected by Indian and international copyright laws.
              </p>

              <h2 className="text-brown-900">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Estate 360 shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from
                your access to or use of or inability to access or use the Services.
              </p>

              <h2 className="text-brown-900">8. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Estate 360, its officers, directors, employees,
                agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities,
                costs, or debt, and expenses arising from your use of the Services or your violation of these Terms of
                Use.
              </p>

              <h2 className="text-brown-900">9. Modifications to Terms</h2>
              <p>
                Estate 360 reserves the right to modify these Terms of Use at any time. We will provide notice of
                significant changes by posting the updated terms on our website. Your continued use of the Services
                after such modifications constitutes your acceptance of the revised terms.
              </p>

              <h2 className="text-brown-900">10. Governing Law</h2>
              <p>
                These Terms of Use shall be governed by and construed in accordance with the laws of India, without
                regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the
                exclusive jurisdiction of the courts in Gurgaon, Haryana.
              </p>

              <h2 className="text-brown-900">11. Contact Information</h2>
              <p>If you have any questions about these Terms of Use, please contact us at:</p>
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
