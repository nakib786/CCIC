import { NextResponse } from "next/server";
import { submitTaxReceiptRequest, type TaxReceiptRequestInput } from "@/lib/wix";
import { isValidPostalCode } from "@/lib/address";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const input = (body ?? {}) as Partial<TaxReceiptRequestInput>;
  const address = input.address ?? ({} as Partial<TaxReceiptRequestInput["address"]>);

  if (
    !input.firstName?.trim() ||
    !input.lastName?.trim() ||
    !input.email?.trim() ||
    !address.addressLine?.trim() ||
    !address.city?.trim() ||
    !address.subdivision?.trim() ||
    !address.postalCode?.trim() ||
    !address.country?.trim() ||
    !input.donationDate?.trim() ||
    !input.donationAmount ||
    !input.donationMethod?.trim()
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isValidPostalCode(address.postalCode, address.country)) {
    return NextResponse.json(
      { error: "That postal/zip code doesn't look right for the selected country." },
      { status: 400 }
    );
  }

  try {
    await submitTaxReceiptRequest({
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      email: input.email.trim(),
      phone: input.phone?.trim(),
      address: {
        addressLine: address.addressLine.trim(),
        addressLine2: address.addressLine2?.trim(),
        city: address.city.trim(),
        subdivision: address.subdivision.trim(),
        postalCode: address.postalCode.trim(),
        country: address.country.trim(),
      },
      donationDate: input.donationDate.trim(),
      donationAmount: Number(input.donationAmount),
      donationMethod: input.donationMethod.trim(),
      referenceNumber: input.referenceNumber?.trim(),
      notes: input.notes?.trim(),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Tax receipt request submission failed", err);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 502 });
  }
}
