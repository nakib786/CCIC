import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { ADDRESS_LINE, CONTACT_EMAIL } from "@/lib/site";
import { getSiteSettings } from "@/lib/wix";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the Central Cariboo Islamic Center collects, uses and protects personal information from our mailing list, contact form, Arabic Classes registration and donations.",
  alternates: { canonical: "/privacy-policy/" },
};

const LAST_UPDATED = "September 16, 2026";

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings().catch(() => ({ email: null, address: null }));
  const contactEmail = settings.email ?? CONTACT_EMAIL;
  const address = settings.address ?? ADDRESS_LINE;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Privacy Policy" }]} />
      <section className="page-banner">
        <div className="container">
          <h1 className="h1">Privacy Policy</h1>
          <div className="breadcrumb-nav"><Link href="/">Home</Link> <i className="fa-solid fa-angle-right"></i> Privacy Policy</div>
        </div>
      </section>

      <section className="our-causes pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <p className="text"><em>Last updated: {LAST_UPDATED}</em></p>

              <p className="text mt-20">
                The Central Cariboo Islamic Center (CCIC), a chapter of the BC Muslim Association (BCMA), respects
                your privacy. We&apos;re a small, volunteer-run community non-profit in Williams Lake, BC, and we
                collect only the personal information we need to run our programs, keep in touch with our community,
                and process donations. This policy explains what we collect on this website, why, how we use and
                protect it, and how to reach us with questions or requests.
              </p>
              <p className="text mt-20">
                This policy is written to meet our obligations under Canada&apos;s Personal Information Protection
                and Electronic Documents Act (PIPEDA) and Canada&apos;s Anti-Spam Legislation (CASL).
              </p>

              <h2 className="h3 title mt-50 mb-15">Information We Collect</h2>
              <ul className="text" style={{ listStyle: "disc", paddingLeft: "1.2em" }}>
                <li className="mb-10"><strong>Mailing list signups</strong> — your email address, when you subscribe via the sign-up form in our website footer.</li>
                <li className="mb-10"><strong>Contact form</strong> (<Link href="/contact/">/contact/</Link>) — your name, email address, and the message (and phone/subject, if provided).</li>
                <li className="mb-10"><strong>Arabic Classes registration</strong> (linked from <Link href="/about/#arabic-classes">/about/#arabic-classes</Link>) — your name, email address, and whether you prefer online or in-person classes.</li>
                <li className="mb-10"><strong>Tax receipt requests</strong> (<Link href="/tax-receipt/">/tax-receipt/</Link>) — your name, email, optional phone number, mailing address, and details of your donation (date, amount, method), used only to issue an official donation receipt.</li>
                <li className="mb-10"><strong>Donations</strong> — we do not collect or store payment card, bank account, or e-Transfer security-question details on this website. Donations are processed entirely by PayPal or sent directly via Interac e-Transfer; those transactions are covered by PayPal&apos;s and your own bank&apos;s privacy policies, not this one.</li>
              </ul>
              <p className="text mt-10">
                We don&apos;t require an account to use this site, and we don&apos;t collect personal information
                from visitors who are just browsing.
              </p>

              <h2 className="h3 title mt-50 mb-15">How We Use Your Information</h2>
              <ul className="text" style={{ listStyle: "disc", paddingLeft: "1.2em" }}>
                <li className="mb-10">To respond to messages sent through our contact form.</li>
                <li className="mb-10">To register you for Arabic classes and send schedule and logistics details.</li>
                <li className="mb-10">To send occasional newsletter and community updates to mailing list subscribers.</li>
                <li className="mb-10">To issue an official donation tax receipt when requested.</li>
                <li className="mb-10">To operate, maintain and improve this website and our programs.</li>
              </ul>
              <p className="text mt-10">
                We only use your personal information for the purpose you gave it to us, and we never sell, rent or
                trade it.
              </p>

              <h2 className="h3 title mt-50 mb-15">Your Consent, Including Under CASL</h2>
              <p className="text">
                Mailing list signups are opt-in only — we add your email to our mailing list only when you tick the
                consent checkbox on the subscribe form yourself. Submitting the contact form or an Arabic Classes
                registration does not add you to the mailing list on its own. Every newsletter email we send includes
                a way to unsubscribe, and you can also unsubscribe at any time by emailing{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>

              <h2 className="h3 title mt-50 mb-15">Who We Share Information With</h2>
              <ul className="text" style={{ listStyle: "disc", paddingLeft: "1.2em" }}>
                <li className="mb-10">
                  <strong>Wix.com, Inc.</strong> — our website platform and forms provider. Mailing list signups,
                  contact form messages, Arabic Classes registrations and tax receipt requests are submitted through
                  Wix&apos;s forms and contacts systems, which is how we store and manage this information day to
                  day. Wix acts as our data processor and has its own privacy and security practices.
                </li>
                <li className="mb-10">
                  <strong>PayPal</strong> and <strong>our bank</strong> (for Interac e-Transfer) — process donations
                  made through those methods. We only see the donor name/email and amount needed for our own records
                  and receipting; we never receive your card or bank account details.
                </li>
                <li className="mb-10">
                  <strong>BC Muslim Association (BCMA)</strong> — CCIC is a chapter of the BCMA, and information
                  related to donations, tax receipts, or our shared PayPal account may be shared internally between
                  CCIC and BCMA for administrative and charitable-registration purposes.
                </li>
                <li className="mb-10">
                  We don&apos;t share your personal information with any other third party, and we may disclose it
                  if required by law (for example, in response to a valid court order).
                </li>
              </ul>

              <h2 className="h3 title mt-50 mb-15">Cookies &amp; Website Analytics</h2>
              <p className="text">
                This site doesn&apos;t use advertising or third-party tracking cookies, and we don&apos;t run
                analytics scripts such as Google Analytics. The only thing stored in your browser is a small,
                temporary marker (using your browser&apos;s <code>sessionStorage</code>) that remembers you closed
                our donation pop-up, so it doesn&apos;t reappear during the same visit. It isn&apos;t personal
                information, it isn&apos;t shared with anyone, and it clears itself when you close the browser tab.
                If this ever changes — for example, if we add analytics — we&apos;ll update this policy first.
              </p>

              <h2 className="h3 title mt-50 mb-15">Data Retention</h2>
              <ul className="text" style={{ listStyle: "disc", paddingLeft: "1.2em" }}>
                <li className="mb-10"><strong>Mailing list:</strong> kept for as long as you&apos;re subscribed, and removed promptly once you unsubscribe.</li>
                <li className="mb-10"><strong>Contact form &amp; Arabic Classes registrations:</strong> kept only as long as reasonably needed to respond to you or run the program, then deleted or archived.</li>
                <li className="mb-10"><strong>Tax receipt requests &amp; donation records:</strong> kept for at least the period required by the Canada Revenue Agency for charitable donation records, and sometimes longer for audit purposes.</li>
              </ul>

              <h2 className="h3 title mt-50 mb-15">Your Rights &amp; How to Reach Us</h2>
              <p className="text">
                Under PIPEDA, you can ask what personal information we hold about you, ask us to correct it, or ask
                us to delete it or withdraw your consent (subject to legal record-keeping requirements, such as CRA
                donation receipts). To unsubscribe from our mailing list, use the unsubscribe link in any email we
                send, or email us directly. For any privacy question, or to request access, correction or deletion of
                your information, contact us at{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a> or write to us at {address}. We&apos;ll respond
                within a reasonable time, generally within 30 days.
              </p>

              <h2 className="h3 title mt-50 mb-15">Children&apos;s Privacy</h2>
              <p className="text">
                Arabic classes are open to learners of all ages, and a parent or guardian may register a minor. By
                registering a minor, you confirm you&apos;re their parent or guardian and accept this policy on their
                behalf. We don&apos;t knowingly collect personal information directly from children without a parent
                or guardian&apos;s involvement.
              </p>

              <h2 className="h3 title mt-50 mb-15">Changes to This Policy</h2>
              <p className="text">
                We may update this policy from time to time — for example, if we add a new form, change service
                providers, or add cookies/analytics. The &ldquo;Last updated&rdquo; date at the top reflects the
                latest version, and significant changes will be announced here and, where appropriate, to our
                mailing list.
              </p>

              <h2 className="h3 title mt-50 mb-15">Contact Us</h2>
              <p className="text mb-0">
                Questions about this policy or how we handle your personal information? Email us at{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a> or{" "}
                <Link href="/contact/">visit our Contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
