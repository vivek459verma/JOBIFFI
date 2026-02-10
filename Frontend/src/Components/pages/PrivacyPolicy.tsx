const PrivacyPolicy = () => {
  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700 leading-relaxed">

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-10 text-center text-black">
          Privacy Policy
        </h1>

        {/* 1. Information We Collect */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            1. Information We Collect
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Job Seekers: Name, email, phone number, resume details,
              education, and work history.
            </li>
            <li>
              Recruiters/Employers: Company name, official email,
              contact information, and job postings.
            </li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            2. How We Use Your Information
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>To match job seekers with relevant recruiters.</li>
            <li>
              To send job alerts, application updates, and
              recruitment-related communications.
            </li>
            <li>
              To improve user experience and enhance platform features.
            </li>
          </ul>
        </section>

        {/* 3. Data Sharing */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            3. Data Sharing
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Information shared by users may be visible to recruiters,
              employers, and relevant third parties.
            </li>
            <li>
              We do not sell personal information to external marketing
              agencies.
            </li>
          </ul>
        </section>

        {/* 4. Data Protection */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            4. Data Protection
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              We use industry-standard security measures to protect user data.
            </li>
            <li>
              However, Jobiffi.com is not liable for breaches caused by
              third-party actions beyond our control.
            </li>
          </ul>
        </section>

        {/* 5. User Rights */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3 text-black">
            5. User Rights
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>You can update or delete your profile anytime.</li>
            <li>
              For account deletion requests, contact
              <span className="text-blue-600 ml-1">
                support@jobiffi.com
              </span>
            </li>
          </ul>
        </section>

        {/* Disclaimer */}
        <h2 className="text-2xl font-bold mb-6 text-black">
          Disclaimer
        </h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-black">
            1. Job Postings & Recruiters
          </h3>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Jobiffi.com acts only as a platform connecting job seekers
              and recruiters.
            </li>
            <li>
              We do not guarantee the authenticity of job postings or
              recruiter details.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-black">
            2. No Guarantee of Employment
          </h3>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Registration does not guarantee a job, interview,
              or employment.
            </li>
            <li>
              All hiring decisions rest with employers/recruiters.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-black">
            3. Fraud Prevention
          </h3>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Jobiffi.com never charges job seekers for opportunities.
            </li>
            <li>
              If anyone asks for money, report to
              <span className="text-blue-600 ml-1">
                support@jobiffi.com
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-black">
            4. Third Party Links
          </h3>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              External links/services are not controlled by Jobiffi.com.
            </li>
            <li>
              We are not responsible for their content or security.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-3 text-black">
            5. Limitation of Liability
          </h3>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Jobiffi.com is not liable for financial loss, fraud,
              or inconvenience caused by interactions between users.
            </li>
            <li>
              Users agree to use the platform at their own risk.
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="border-t border-gray-300 pt-6">

          <h2 className="text-xl font-semibold mb-3 text-black">
            Contact Us
          </h2>

          <p className="mb-2">
            For questions or concerns regarding this Legal Policy:
          </p>

          <p>
            📧 Email:
            <a
              href="mailto:support@jobiffi.com"
              className="text-blue-600 ml-2"
            >
              support@jobiffi.com
            </a>
          </p>

          <p>
            🌐 Website:
            <a
              href="https://www.jobiffi.com"
              className="text-blue-600 ml-2"
            >
              www.jobiffi.com
            </a>
          </p>

          {/* Close Window */}
          <div className="mt-8 text-center">
            <button
              onClick={() => window.close()}
              className="text-blue-600 underline text-sm"
            >
            
            </button>
          </div>
        </section>
{/* Close Window */}
<div className="mt-10 text-center">
  <button
    onClick={() => window.close()}
    className="text-blue-600 hover:underline text-sm"
  >
    Close Window
  </button>
</div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


