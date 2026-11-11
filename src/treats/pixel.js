// Meta Pixel helpers. The pixel itself is loaded in public/index.html and fires
// PageView on the first load; SPA navigations and the Lead event go through here.

const THANKS_PATH = '/thanks';
const LEAD_KEY = 'treats_lead';

const fbq = (...args) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq(...args);
};

export const trackPageView = () => fbq('track', 'PageView');

// One visit = at most one Lead, whether it came from the form or from a WhatsApp click.
// The ticket lives in sessionStorage: { id, fired }.
const readTicket = () => {
  try {
    return JSON.parse(sessionStorage.getItem(LEAD_KEY) || 'null');
  } catch (e) {
    return null;
  }
};

const writeTicket = (ticket) => {
  try {
    sessionStorage.setItem(LEAD_KEY, JSON.stringify(ticket));
  } catch (e) {
    /* storage unavailable - the router state still carries the id for the form flow */
  }
};

const newId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const sendLeadEvent = (id, source) => {
  fbq('track', 'Lead', { content_name: 'פיגמנט שפתיים', content_category: 'treats', lead_source: source }, { eventID: id });
};

// Created when the form lead is actually sent. The thank-you page redeems it
// exactly once, so the Lead event never fires on a refresh, a bookmark, a typed
// URL, or a second submission from the same visit. If this visit already
// reported a Lead (e.g. a WhatsApp click), the ticket is issued already spent.
export const issueLeadTicket = () => {
  const prev = readTicket();
  const id = newId('lead');
  writeTicket({ id, fired: !!(prev && prev.fired) });
  return id;
};

// Fires Lead for a WhatsApp click, unless this visit already reported one.
export const trackWhatsAppLead = () => {
  const prev = readTicket();
  if (prev && prev.fired) return false;
  const id = newId('wa');
  sendLeadEvent(id, 'whatsapp');
  writeTicket({ id, fired: true });
  return true;
};

export const redeemLeadTicket = (idFromState) => {
  const ticket = readTicket();
  const id = (ticket && ticket.id) || idFromState;
  if (!id) return false; // no lead was sent in this session
  if (ticket && ticket.fired) return false; // already reported
  if (ticket && idFromState && ticket.id !== idFromState) return false; // stale state from an old visit

  sendLeadEvent(id, 'form');
  writeTicket({ id, fired: true });
  return true;
};

export { THANKS_PATH };
