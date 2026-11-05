/**
 * VEXDYN contact form → Gmail
 *
 * 1. Paste this into script.google.com (signed in as hellovexdyn@gmail.com)
 * 2. Set SECRET below to the same value as Cloudflare CONTACT_SECRET
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the web app URL into Cloudflare CONTACT_SCRIPT_URL
 *
 * Gmail address stays only inside this script / your Google account.
 * It is never exposed on the website.
 */
const SECRET = 'replace-with-a-long-random-string'; // must match CONTACT_SECRET

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data || data.token !== SECRET) {
      return json_({ ok: false, error: 'Unauthorized.' });
    }

    const name = String(data.name || 'Visitor').slice(0, 80);
    const email = String(data.email || '').slice(0, 120);
    const message = String(data.message || '').slice(0, 4000);

    if (!email || message.length < 5) {
      return json_({ ok: false, error: 'Invalid message.' });
    }

    const subject = 'New VEXDYN Website Message';
    const body =
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      'Message:\n' + message;

    // Sends to the Google account that owns this script (hellovexdyn@gmail.com)
    GmailApp.sendEmail(
      Session.getActiveUser().getEmail(),
      subject,
      body,
      { replyTo: email, name: 'VEXDYN Website' }
    );

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'Could not send right now. Please try again.' });
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: open the web app URL in a browser to confirm deployment
function doGet() {
  return json_({ ok: true, service: 'VEXDYN contact' });
}
