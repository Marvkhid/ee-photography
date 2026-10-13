# Automatic WhatsApp notifications (WhatsApp Business Cloud API)

When a visitor submits the enquiry form, the server sends an approved WhatsApp **template message** to Ebere's number
(09017444836 → `2349017444836`) with the visitor's details, in the format:

> Good evening Ebere, I am Ada Obi. I have just filled the enquiry form on your website. Type of photography: Weddings. …

Email through Resend is sent at the same time. Each channel works independently: if one fails the other still goes out.
The form shows success only when at least one provider has accepted the message.

> WhatsApp only allows a business to start a conversation with an **approved template**. Free-form text is allowed only
> within 24 hours after the person last messaged the business number, which cannot be relied on here. That is why a
> template is used.

## 1. Meta setup (about 30–60 minutes, once)

1. Create or sign in to a **Meta Business portfolio** at business.facebook.com.
2. Go to developers.facebook.com → **My Apps → Create App** → type **Business** → add the **WhatsApp** product.
3. In **WhatsApp → API Setup** you get a free **test phone number** and its **Phone number ID**. Under "To", add
   **Ebere's number (+234 901 744 4836)** as a recipient and enter the code WhatsApp sends to it.
   (While testing, Meta only delivers to numbers you verify here.)
4. **Go live later:** complete Meta **Business Verification**, then add your own sending number (a number that is not
   currently registered on a normal WhatsApp account) and get its display name approved. Meta charges per template
   message; check current pricing in the WhatsApp Business Platform docs.

## 2. Create the message template (once)

WhatsApp Manager → **Message templates → Create template**

| Setting | Value |
| --- | --- |
| Category | **Utility** |
| Name | `new_enquiry` |
| Language | English (`en`) |

**Body** (paste exactly; the variables must be in this order):

```
New website enquiry. {{1}} Ebere, I am {{2}}. I have just filled the enquiry form on your website. Type of photography: {{3}}. Preferred date: {{4}}. Location: {{5}}. Phone or WhatsApp: {{6}}. Email: {{7}}. Preferred contact method: {{8}}. Found you through: {{9}}. My vision: {{10}}. Please get back to me when you can.
```

Sample values Meta asks for: 1 `Good evening`, 2 `Ada Obi`, 3 `Weddings`, 4 `2026-12-12`, 5 `Lekki, Lagos`,
6 `+234 800 000 0000`, 7 `ada@example.com`, 8 `WhatsApp`, 9 `Instagram`, 10 `Traditional and white wedding`.

Submit it. Approval is usually minutes to a few hours. The code sends `Not provided` for any field the visitor left empty.

## 3. Get the access token (never share it in chat or commit it)

Business Settings → **Users → System users** → create a system user (Admin) → **Add assets** (your WhatsApp app and
account, full control) → **Generate token** with `whatsapp_business_messaging` and `whatsapp_business_management`,
token expiry **Never**. (The temporary token on the API Setup page expires in 24 hours and is only for a first test.)

## 4. Environment variables

Put these in `.env.local` locally and in **Vercel → Settings → Environment Variables**:

```
WHATSAPP_ACCESS_TOKEN=            # the system-user token
WHATSAPP_PHONE_NUMBER_ID=         # from API Setup (the ID, not the phone number)
WHATSAPP_TEMPLATE_NAME=new_enquiry
WHATSAPP_TEMPLATE_LANGUAGE=en
WHATSAPP_RECIPIENT=2349017444836  # optional; defaults to the number in src/config/brand.ts
WHATSAPP_API_VERSION=v23.0        # optional; raise it when Meta retires old versions
```

Redeploy after adding them.

## 5. Test

Submit the Contact form on the live site. Ebere's WhatsApp should receive the template within seconds. If not, check
the Vercel function log for `/api/enquiry` and WhatsApp Manager → template status (must be **Approved**), the
recipient being verified (test mode), and that the token belongs to a system user with access to the WhatsApp account.

## Notes

- The sending number is a *business* number set up in Meta. Ebere's personal WhatsApp receives the messages from it.
- Messages from the form are plain text with line breaks removed, as the template format requires.
