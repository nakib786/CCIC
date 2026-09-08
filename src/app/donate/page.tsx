import type { Metadata } from "next";
import Link from "next/link";
import CopyChip from "@/components/CopyChip";
import { getDonationTotal } from "@/lib/wix";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support the Central Cariboo Islamic Center via PayPal, Interac e-Transfer, or cheque/bank transfer.",
};

export default async function DonatePage() {
  const total = await getDonationTotal().catch(() => null);
  const pct = total && total.target > 0 ? Math.min(100, Math.round((total.raised / total.target) * 100)) : null;
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="h1">Donate</div>
          <div className="breadcrumb-nav"><Link href="/">Home</Link> <i className="fa-solid fa-angle-right"></i> Donate</div>
        </div>
      </section>

      <section className="our-causes pt-120">
        <div className="floating-img-1 bounce-y"><img src="/assets/images/obj-img-1.png" alt="" /></div>
        <div className="container">
          <div className="row"><div className="col-lg-7 mx-auto">
            <div className="sec-title text-center mb-60">
              <span className="sub-title section-eyebrow">Assalamu Alaikum</span>
              <div className="h2 title">Support Your Masjid</div>
              <p className="text mt-20">
                Your generous contributions help us continue our community programs and work toward building a
                permanent masjid and Islamic Learning Centre for the Cariboo region. Every donation, big or small,
                makes a difference.
              </p>
            </div>
            {pct !== null && total && (
              <div className="donation-bar mb-40">
                <div className="donation-progress">
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${pct}%` }}>
                      <span className="progress-thumb"></span>
                    </div>
                  </div>
                </div>
                <div className="donation-info">
                  <div className="fund-raise">
                    <div className="icon"><i className="fa-solid fa-hand-holding-dollar"></i></div>
                    <div className="text">Raised: <span className="value">${total.raised.toLocaleString()}</span></div>
                  </div>
                  <div className="fund-goal">
                    <div className="icon"><i className="fa-solid fa-bullseye"></i></div>
                    <div className="text">Goal: <span className="value">${total.target.toLocaleString()}</span></div>
                  </div>
                </div>
              </div>
            )}
          </div></div>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="causes-block give-block"><div className="inner-block">
                <div className="image-box logo-frame"><div className="image logo-badge"><img src="/assets/images/paypal-logo.svg" alt="PayPal" /></div></div>
                <div className="content-box">
                  <div className="tag"><i className="fa-solid fa-credit-card"></i> PayPal</div>
                  <div className="h4 title">Give securely online through our BCMA PayPal account</div>
                  <p className="text">One-time or recurring, any amount — processed directly by the BC Muslim Association.</p>
                  <a href="https://www.paypal.com/donate/?hosted_button_id=VD5SQYWVZGLWU" target="_blank" rel="noopener noreferrer" className="btn-style-six">Donate via PayPal</a>
                </div>
              </div></div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="causes-block give-block"><div className="inner-block">
                <div className="image-box logo-frame"><div className="image logo-badge"><img src="/assets/images/interac-logo.png" alt="Interac e-Transfer" /></div></div>
                <div className="content-box">
                  <div className="tag"><i className="fa-solid fa-money-bill-transfer"></i> Interac e-Transfer</div>
                  <div className="h4 title">Send your donation via e-Transfer</div>
                  <p className="text">Quick and secure — this method ensures your contribution reaches us safely.</p>
                  <CopyChip value="etransfer.cariboo@thebcma.com" />
                </div>
              </div></div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="causes-block give-block"><div className="inner-block">
                <div className="image-box logo-frame"><div className="image"><img src="/assets/images/donation-money-vector-flat-illustration.jpg" alt="Cheque" /></div></div>
                <div className="content-box">
                  <div className="tag"><i className="fa-solid fa-hand-holding-dollar"></i> Cash / Cheque / Bank Transfer</div>
                  <div className="h4 title">Prefer to give in person?</div>
                  <p className="text">Contact us for banking details or cheque mailing instructions.</p>
                  <a href="mailto:cariboo.secretary@thebcma.com?subject=Donation%20by%20cheque%20%2F%20bank%20transfer" className="btn-style-six">Email Us</a>
                </div>
              </div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="donation-section pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="donation-content text-center">
                <span className="sub-title section-eyebrow">Building Fund</span>
                <div className="h2 title mt-10">Help Us Build a Permanent Home</div>
                <p className="text mt-20">
                  Muslims in the Central Cariboo currently don&apos;t have a dedicated place of worship — Friday
                  prayers, Qur&apos;anic learning, weddings, funerals and community gatherings are all held in
                  borrowed or rented spaces. Whether it&apos;s Zakat, Sadaqah, or a gift toward our building fund,
                  your generosity brings us closer to a permanent masjid and Islamic Learning Centre. Jazakum Allahu
                  khairan — may Allah reward you with goodness.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="sec-bg"><img src="/assets/images/donation-bg.png" alt="" /></div>
        <div className="sec-shape"><img src="/assets/images/donation-shape.png" alt="" /></div>
      </section>
    </>
  );
}
