import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import TaxReceiptForm from "@/components/TaxReceiptForm";
import { CONTACT_EMAIL } from "@/lib/site";
import { getSiteSettings } from "@/lib/wix";

export const metadata: Metadata = {
  title: "Claim Your Tax Receipt",
  description:
    "Donated to the Central Cariboo Islamic Center by cash, cheque, e-Transfer, bank transfer or PayPal? Request your official charitable tax receipt here.",
  alternates: { canonical: "/tax-receipt/" },
};

export default async function TaxReceiptPage() {
  const settings = await getSiteSettings().catch(() => ({ email: null, address: null }));
  const contactEmail = settings.email ?? CONTACT_EMAIL;
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Tax Receipt" }]} />
      <section className="page-banner">
        <div className="container">
          <h1 className="h1">Claim Your Tax Receipt</h1>
          <div className="breadcrumb-nav"><Link href="/">Home</Link> <i className="fa-solid fa-angle-right"></i> Tax Receipt</div>
        </div>
      </section>

      <section className="our-causes pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="sec-title text-center mb-40">
                <span className="sub-title section-eyebrow">Sadaqah &amp; Zakat</span>
                <h2 className="h2 title">Request Your Official Donation Receipt</h2>
                <p className="text mt-20">
                  The Central Cariboo Islamic Center is a chapter of the BC Muslim Association, a registered Canadian
                  charity. If you&apos;ve donated by cash, cheque, Interac e-Transfer, bank transfer or PayPal and need
                  an official receipt for tax purposes, let us know the details below and we&apos;ll email it to you.
                </p>
              </div>
              <TaxReceiptForm contactEmail={contactEmail} />
              <p className="text text-center mt-30 mb-0">
                Questions about your receipt? <a href={`mailto:${contactEmail}`}>Email us</a> or{" "}
                <Link href="/contact/">visit our Contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
