import type { Metadata, ReactElement } from "react";

export const metadata: Metadata = {
  title: "Terms | Tommie's Plumbing",
  robots: { index: false, follow: false },
};

export default function TermsPage(): ReactElement {
  return (
    <main className="bg-white px-6 py-16 text-ink">
      <article className="mx-auto max-w-3xl space-y-6 font-body text-body leading-relaxed">
        <h1 className="text-display-2 font-bold">Terms</h1>
        <p>Last updated: October 13, 2026</p>
        <p>
          These terms apply to https://tommiesplumbing.com and https://book.tommiesplumbing.com, operated by Tommie&apos;s Plumbing, 1665 East Andrew Johnson Highway Suite 1, Greeneville, TN 37745. By using either site or submitting a service request, you agree to these terms.
        </p>

        <h2 className="text-display-3 font-bold">Services</h2>
        <p>
          Tommie&apos;s Plumbing provides plumbing services in Northeast Tennessee. A form submission is a request for the team to follow up about scheduling a visit. It is not a confirmed appointment until the team confirms the time with you. Information on the sites is general and may change.
        </p>

        <h2 className="text-display-3 font-bold">Service requests</h2>
        <p>
          You agree that the name, email, phone number, and homeowner answer you submit are accurate. The phone number is required so the team can respond to the request. Submitting the form does not by itself agree to text messages.
        </p>

        <h2 className="text-display-3 font-bold">Website use</h2>
        <p>
          You may use the sites for information about Tommie&apos;s Plumbing and to request service. You may not misuse the sites, attempt to disrupt them, or submit information you are not allowed to provide. The sites may link to other websites. Those sites have their own terms.
        </p>

        <h2 className="text-display-3 font-bold">SMS / Text Messaging</h2>
        <p>
          Tommie&apos;s Plumbing may send customer-care text messages to people who submit the form at https://book.tommiesplumbing.com and check the optional SMS consent box. Messages may include appointment scheduling and confirmations, reminders, and service-related communications about the request. Messages identify Tommie&apos;s Plumbing and include HELP and STOP instructions. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help.
        </p>
        <p>
          The checkbox is optional and unchecked by default. Consent is not a condition of purchase. Providing a phone number, or submitting the form without checking the box, does not opt you in to text messages. Calling 423-638-3662 does not opt you in to text messages. This text program does not include promotional offers.
        </p>
        <p>
          We will not sell or share your mobile information or text-message opt-in with third parties for promotional or marketing purposes. We will not share text-message originator opt-in data with third parties. START and YES only resubscribe someone who already opted in on this form and later texted STOP. They are not a way for a new subscriber to join. For help, call 423-638-3662.
        </p>
        <p>
          Privacy Policy: https://book.tommiesplumbing.com/privacy-policy
        </p>

        <h2 className="text-display-3 font-bold">Contact</h2>
        <p>
          Tommie&apos;s Plumbing, 1665 East Andrew Johnson Highway Suite 1, Greeneville, TN 37745. Phone 423-638-3662.
        </p>
      </article>
    </main>
  );
}
