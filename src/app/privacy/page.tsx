export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold font-display text-text-primary mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-text-muted mb-12">Effective: April 2026</p>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-bold font-display text-text-primary mb-3">
              Information We Collect
            </h2>
            <p>
              We collect information you provide directly, such as when you sign
              up for updates, join our community channels, or contact us. This
              may include your name, email address, and wallet address. We also
              collect usage data automatically through standard web analytics,
              including IP address, browser type, pages visited, and time spent
              on the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-text-primary mb-3">
              How We Use Information
            </h2>
            <p>
              We use collected information to operate and improve the QuarryChain
              website and services, communicate updates and announcements,
              respond to inquiries and support requests, and analyze usage
              patterns to improve user experience. We do not sell your personal
              information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-text-primary mb-3">
              Cookies
            </h2>
            <p>
              We use essential cookies to ensure the website functions properly.
              We may use analytics cookies to understand how visitors interact
              with the site. You can control cookie preferences through your
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-text-primary mb-3">
              Third-Party Services
            </h2>
            <p>
              We may use third-party services for analytics (such as Vercel
              Analytics), hosting, and communication. These services may collect
              information as described in their respective privacy policies. We
              do not share personal information with third parties for marketing
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-text-primary mb-3">
              Blockchain Data
            </h2>
            <p>
              Transactions on the QuarryChain network are publicly visible on
              the blockchain. Wallet addresses and transaction data are inherently
              public. We do not associate wallet addresses with personal identity
              information unless you voluntarily provide such association.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-text-primary mb-3">
              Data Security
            </h2>
            <p>
              We implement reasonable security measures to protect your
              information. However, no method of transmission over the internet
              is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-display text-text-primary mb-3">
              Contact
            </h2>
            <p>
              For questions about this privacy policy, contact us at{" "}
              <a
                href="mailto:privacy@quarrychain.network"
                className="text-qc-teal hover:underline"
              >
                privacy@quarrychain.network
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
