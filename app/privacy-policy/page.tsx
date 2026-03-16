import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Yellowhammer Hospitality and rentyellowhammer.com.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 font-heading text-3xl font-bold text-dark-bg">
        Privacy Policy
      </h1>
      <p className="mb-8 text-sm text-gray-medium">
        Website: www.rentyellowhammer.com | Effective Date: 9/10/2024
      </p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-dark">
        <h2 className="font-heading text-xl font-bold text-dark-bg">Introduction</h2>
        <p>
          Welcome to Yellowhammer Hospitality (&quot;Yellowhammer,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website (the &quot;Site&quot;) or use our services. By accessing or using our Site, you agree to the terms of this Privacy Policy.
        </p>

        <h2 className="font-heading text-xl font-bold text-dark-bg">1. Information We Collect</h2>
        <p>We may collect and process the following types of information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personal Information:</strong> This includes, but is not limited to, your name, email address, phone number, mailing address, payment information, and any other information you provide when you book a stay, fill out forms, or contact us.</li>
          <li><strong>Transactional Information:</strong> Details of reservations, bookings, and other transactions you carry out through our Site and of the fulfillment of your orders.</li>
          <li><strong>Usage Data:</strong> Information about how you use our Site, including your IP address, browser type, operating system, referring URLs, pages visited, and other usage statistics.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience on our Site, such as remembering your preferences and tracking site usage.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-dark-bg">2. How We Use Your Information</h2>
        <p>We use your information for various purposes, including:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Booking and Reservations:</strong> To process and manage your bookings, reservations, and other services requested through our Site.</li>
          <li><strong>Improving Our Services:</strong> To understand how users interact with our Site and improve our services and offerings.</li>
          <li><strong>Communications:</strong> To send you updates about your reservations, promotional offers, and other information related to our services. You can opt-out of receiving marketing communications at any time.</li>
          <li><strong>Customer Support:</strong> To respond to your inquiries, provide customer support, and resolve any issues you may encounter.</li>
          <li><strong>Legal Compliance:</strong> To comply with legal obligations, resolve disputes, and enforce our agreements.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-dark-bg">3. How We Share Your Information</h2>
        <p>We do not share your data with third parties for marketing or promotional purposes. We may share your information in the following circumstances:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>With Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our Site, processing transactions, managing reservations, and performing other functions on our behalf.</li>
          <li><strong>For Legal Reasons:</strong> If required by law or to protect our rights, property, or safety, or that of our users or others.</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of all or a portion of our business, your information may be transferred as part of that transaction.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-dark-bg">4. Data Security</h2>
        <p>We implement reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

        <h2 className="font-heading text-xl font-bold text-dark-bg">5. Your Choices and Rights</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Access and Update:</strong> You can access and update your personal information by contacting us directly.</li>
          <li><strong>Opt-Out:</strong> You can opt-out of receiving marketing communications from us by following the unsubscribe instructions included in those communications or contacting us.</li>
          <li><strong>Deletion:</strong> You may request the deletion of your personal information, subject to legal and contractual obligations.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-dark-bg">6. Cookies and Tracking Technologies</h2>
        <p>Our Site uses cookies and similar technologies to enhance your browsing experience. You can manage your cookie preferences through your browser settings. Note that disabling cookies may affect the functionality of our Site.</p>

        <h2 className="font-heading text-xl font-bold text-dark-bg">7. Third-Party Links</h2>
        <p>Our Site may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.</p>

        <h2 className="font-heading text-xl font-bold text-dark-bg">8. Children&apos;s Privacy</h2>
        <p>Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.</p>

        <h2 className="font-heading text-xl font-bold text-dark-bg">9. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our Site. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h2 className="font-heading text-xl font-bold text-dark-bg">10. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:</p>
        <p>
          Yellowhammer Hospitality<br />
          751 Dauphin Street<br />
          Mobile, AL 36602<br />
          <a href="mailto:info@rentyellowhammer.com" className="text-gold hover:text-gold-dark">info@rentyellowhammer.com</a><br />
          251-333-7368
        </p>
      </div>
    </div>
  );
}
