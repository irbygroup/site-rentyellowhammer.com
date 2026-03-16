import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for Yellowhammer Hospitality and rentyellowhammer.com.",
};

export default function TermsOfUsePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 font-heading text-3xl font-bold text-dark-bg">
        Terms of Use
      </h1>
      <p className="mb-8 text-sm text-gray-medium">Effective Date: 9/10/2024</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-dark">
        <h2 className="font-heading text-xl font-bold text-dark-bg">1. Introduction</h2>
        <p>
          Welcome to Yellowhammer Hospitality (&quot;Yellowhammer,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of our website www.rentyellowhammer.com (the &quot;Site&quot;) and any services provided through it. By accessing or using our Site, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our Site.
        </p>

        <h2 className="font-heading text-xl font-bold text-dark-bg">2. Use of Our Site</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Eligibility:</strong> You must be at least 18 years old or have parental consent to use our Site.</li>
          <li><strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</li>
          <li><strong>Prohibited Activities:</strong> You agree not to use our Site for any unlawful purposes or in any way that could damage, disable, overburden, or impair the Site or interfere with any other party&apos;s use and enjoyment of the Site.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-dark-bg">3. Booking and Reservations</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Accuracy of Information:</strong> We make every effort to ensure that the information provided on our Site is accurate and up-to-date. However, we do not warrant that all information is error-free or complete.</li>
          <li><strong>Reservation Policies:</strong> All bookings and reservations are subject to our specific policies, which may include cancellation and modification terms. Please review these policies carefully before making a reservation.</li>
          <li><strong>Payment:</strong> Payments for reservations must be made through our approved payment methods. You agree to provide accurate and complete payment information.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-dark-bg">4. Intellectual Property</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Ownership:</strong> All content, features, and functionality on our Site, including text, graphics, logos, and images, are owned by or licensed to Yellowhammer and are protected by intellectual property laws.</li>
          <li><strong>Limited License:</strong> You are granted a limited, non-exclusive, non-transferable license to access and use our Site for personal, non-commercial purposes. You may not reproduce, modify, distribute, or otherwise exploit any content from our Site without our prior written consent.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-dark-bg">5. Disclaimer of Warranties</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Site Availability:</strong> Our Site is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We do not guarantee that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.</li>
          <li><strong>No Warranties:</strong> To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-dark-bg">6. Limitation of Liability</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Exclusion of Liability:</strong> In no event shall Yellowhammer be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising out of or in connection with your use of our Site or services.</li>
          <li><strong>Maximum Liability:</strong> Our maximum liability to you for any claims arising out of your use of our Site or services shall be limited to the amount paid by you for the reservation or service giving rise to the claim.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-dark-bg">7. Indemnification</h2>
        <p>You agree to indemnify, defend, and hold harmless Yellowhammer, its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses, including reasonable attorneys&apos; fees, arising out of or related to your use of our Site, your violation of these Terms, or your infringement of any rights of another party.</p>

        <h2 className="font-heading text-xl font-bold text-dark-bg">8. Changes to These Terms</h2>
        <p>We reserve the right to modify these Terms at any time. Any changes will be posted on this page with an updated effective date. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.</p>

        <h2 className="font-heading text-xl font-bold text-dark-bg">9. Governing Law</h2>
        <p>These Terms are governed by and construed in accordance with the laws of the state of Alabama, without regard to its conflict of law principles. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Mobile County, Alabama.</p>

        <h2 className="font-heading text-xl font-bold text-dark-bg">10. Contact Us</h2>
        <p>If you have any questions or concerns about these Terms of Service, please contact us at:</p>
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
