const TermsConditions = () => {
  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700 leading-relaxed">

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-10 text-center text-black">
          Terms & Conditions
        </h1>

        {/* 1. Eligibility */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            1. Eligibility
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>Users must be at least 15 years old to register.</li>
            <li>
              By creating an account, you confirm that all provided information
              is true, accurate, and complete.
            </li>
          </ul>
        </section>

        {/* 2. Account Responsibility */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            2. Account Responsibility
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Users are responsible for maintaining confidentiality of login
              details.
            </li>
            <li>
              Any activity under your account is deemed to be conducted by you.
            </li>
          </ul>
        </section>

        {/* 3. Use Of Platform */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            3. Use of Platform
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Job seekers may use the platform to search and apply for jobs.
            </li>
            <li>
              Recruiters/employers may use the platform to post jobs and connect
              with candidates.
            </li>
            <li>
              Misuse, spamming, or posting fraudulent information is strictly
              prohibited.
            </li>
          </ul>
        </section>

        {/* 4. Prohibited Activities */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-black">
            4. Prohibited Activities
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Uploading false resumes, fake job postings, or misleading company
              details.
            </li>
            <li>
              Harassment, abuse, or inappropriate communication with other users.
            </li>
            <li>
              Any activity that violates local, national, or international laws.
            </li>
          </ul>
        </section>

        {/* 5. Termination */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3 text-black">
            5. Termination
          </h2>

          <p>
            Jobiffi.com reserves the right to suspend or terminate accounts that
            violate policies.
          </p>
        </section>

        {/* Contact Section */}
        <section className="border-t border-gray-300 pt-6">
          <h2 className="text-xl font-semibold mb-3 text-black">
            Contact Us
          </h2>

          <p className="mb-3">
            For questions or concerns regarding these Terms & Conditions:
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

export default TermsConditions;

