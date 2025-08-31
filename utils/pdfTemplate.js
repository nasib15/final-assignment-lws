// Booking receipt HTML template for server-side PDF rendering
// - Secure: Escapes all dynamic content and loads no external resources
// - Lightweight: Simple CSS, no images or webfonts, prints backgrounds only as needed

/** Escape HTML special characters to prevent injection */
export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function fmtCurrency(value) {
  const n = Number(value || 0);
  return n.toFixed(2);
}

function fmtDate(d) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return String(d);
  }
}

export function renderBookingHTML(booking = {}) {
  const nights = Number(booking?.nights || 1);
  const guests = Number(booking?.guests || 1);
  const pricePerNight = Number(booking?.pricePerNight || 0);
  const roomCost = nights * pricePerNight;
  // Use small static fees to keep totals familiar; if totalPrice provided, prefer it
  const cleaningFee = 17.5;
  const serviceFee = 51.31;
  const computedTotal = roomCost + cleaningFee + serviceFee;
  const total = Number(
    booking?.totalPrice !== undefined ? booking.totalPrice : computedTotal
  );

  const bookingId = (booking?.bookingId ?? "").toString().toUpperCase();
  const nowStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Booking Receipt</title>
      <style>
        :root {
          --brand: #2a7d7c; /* teal */
          --brand-dark: #1b5b59;
          --accent: #f5a623; /* amber */
          --ink: #222;
          --muted: #666;
          --line: #e5e5e5;
          --panel: #f7f7f7;
        }
        html, body { margin: 0; padding: 0; color: var(--ink); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .wrap { padding: 24px; }
        .hr { height: 1px; background: var(--line); margin: 18px 0; }
        .small { font-size: 11px; }
        .muted { color: var(--muted); }
        .h2 { font-size: 16px; font-weight: 700; color: var(--brand); margin: 18px 0 10px; }
        .p { font-size: 12px; margin: 0; line-height: 1.45; }

        /* Header */
        .header { background: var(--brand); color: #fff; padding: 16px 18px; border-radius: 10px 10px 0 0; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .header-left { display: flex; align-items: center; gap: 10px; }
        .logo { width: 28px; height: 28px; border-radius: 6px; background: var(--brand-dark); display: grid; place-items: center; font-weight: 800; }
        .brand { font-weight: 700; letter-spacing: .2px; }
        .title { font-size: 18px; font-weight: 800; }
        .accent { height: 3px; background: var(--accent); border-radius: 0 0 2px 2px; }
        .right { text-align: right; font-size: 11px; }

        /* Layout */
        .section { margin-bottom: 16px; }
        .panel { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px; }
        .row { display: flex; gap: 16px; align-items: flex-start; }
        .col { flex: 1; }
        .kv { display: grid; grid-template-columns: 110px 1fr; gap: 8px 12px; font-size: 12px; }
        .label { color: var(--muted); }

        /* Payment */
        .pay { background: var(--brand); color: #fff; border-radius: 10px; padding: 16px; }
        .payTitle { font-size: 15px; font-weight: 800; margin: 0 0 8px; }
        .payRow { display: flex; justify-content: space-between; font-size: 12px; padding: 5px 0; }
        .payLine { height: 1px; background: rgba(255,255,255,.8); margin: 8px 0; }
        .total { font-weight: 900; }

        /* Footer */
        .footLine { height: 1px; background: var(--line); margin: 14px 0; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <div class="logo">B</div>
            <div class="brand">Hotel Booking</div>
          </div>
          <div class="title">Booking Confirmation</div>
          <div class="right">
            <div>Booking ID: #${escapeHtml(bookingId)}</div>
            <div>Date: ${escapeHtml(nowStr)}</div>
          </div>
        </div>
        <div class="accent"></div>

        <div class="hr"></div>

        <!-- Hotel Name -->
        <div class="h2" style="margin-top:0;">${escapeHtml(
          booking?.hotelName || "Hotel"
        )}</div>

        <!-- Guest Information -->
        <div class="section">
          <div class="h2">Guest Information</div>
          <div class="panel">
            <div class="p"><strong>Name:</strong> ${escapeHtml(
              booking?.guestName || ""
            )}</div>
            <div class="p" style="margin-top:6px;"><strong>Email:</strong> ${escapeHtml(
              booking?.guestEmail || ""
            )}</div>
          </div>
        </div>

        <!-- Reservation Details -->
        <div class="section">
          <div class="h2">Reservation Details</div>
          <div class="panel">
            <div class="row">
              <div class="col">
                <div class="kv">
                  <div class="label">Check-in:</div>
                  <div>${escapeHtml(fmtDate(booking?.checkin))}</div>
                  <div class="label">Nights:</div>
                  <div>${escapeHtml(String(nights))}</div>
                </div>
              </div>
              <div class="col">
                <div class="kv">
                  <div class="label">Check-out:</div>
                  <div>${escapeHtml(fmtDate(booking?.checkout))}</div>
                  <div class="label">Guests:</div>
                  <div>${escapeHtml(String(guests))}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing Address -->
        <div class="section">
          <div class="h2">Billing Address</div>
          <div class="panel">
            <div class="row">
              <div class="col">
                <div class="p"><strong>Street:</strong> ${escapeHtml(
                  booking?.billingAddress?.streetAddress || ""
                )}</div>
                <div class="p" style="margin-top:6px;"><strong>City:</strong> ${escapeHtml(
                  booking?.billingAddress?.city || ""
                )}</div>
                <div class="p" style="margin-top:6px;"><strong>State:</strong> ${escapeHtml(
                  booking?.billingAddress?.state || ""
                )}</div>
              </div>
              <div class="col">
                <div class="p"><strong>ZIP Code:</strong> ${escapeHtml(
                  booking?.billingAddress?.zipCode || ""
                )}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Summary -->
        <div class="section">
          <div class="pay">
            <div class="payTitle">Payment Summary</div>
            <div class="payRow">
              <div>Room Rate (${escapeHtml(
                String(nights)
              )} nights × $${escapeHtml(fmtCurrency(pricePerNight))})</div>
              <div>$${escapeHtml(fmtCurrency(roomCost))}</div>
            </div>
            <div class="payRow"><div>Cleaning Fee</div><div>$${escapeHtml(
              fmtCurrency(cleaningFee)
            )}</div></div>
            <div class="payRow"><div>Service Fee</div><div>$${escapeHtml(
              fmtCurrency(serviceFee)
            )}</div></div>
            <div class="payLine"></div>
            <div class="payRow total"><div>Total Amount</div><div>$${escapeHtml(
              fmtCurrency(total)
            )}</div></div>
          </div>
        </div>

        <div class="footLine"></div>

        <!-- Footer -->
        <div class="p" style="font-weight:700;">${escapeHtml(
          booking?.hotelName || "Hotel"
        )}</div>
        <div class="small muted">${escapeHtml(
          booking?.hotelAddress || ""
        )}</div>
        <div class="small muted">Tel: ${escapeHtml(
          booking?.hotelPhone || ""
        )} | Email: ${escapeHtml(booking?.hotelEmail || "")}</div>
      </div>
    </body>
  </html>`;
}
