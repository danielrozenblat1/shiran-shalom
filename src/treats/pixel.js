// Meta Pixel helpers. The pixel itself is loaded in public/index.html and fires
// PageView on the first load; SPA navigations and the Lead event go through here.

const THANKS_PATH = '/thanks';
const LEAD_KEY = 'treats_lead';

const fbq = (...args) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq(...args);
};

export const trackPageView = () => fbq('track', 'PageView');

// A one-time ticket created when a lead is actually sent. The thank-you page
// redeems it exactly once, so the Lead event never fires on a refresh, a
// bookmark, a typed URL, or a second submission from the same visit.
export const issueLeadTicket = () => {
  const id = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  try {
    sessionStorage.setItem(LEAD_KEY, JSON.stringify({ id, fired: false }));
  } catch (e) {
    /* storage unavailable - the router state below still carries the id */
  }
  return id;
};

export const redeemLeadTicket = (idFromState) => {
  let ticket = null;
  try {
    ticket = JSON.parse(sessionStorage.getItem(LEAD_KEY) || 'null');
  } catch (e) {
    ticket = null;
  }
  const id = (ticket && ticket.id) || idFromState;
  if (!id) return false; // no lead was sent in this session
  if (ticket && ticket.fired) return false; // already reported
  if (ticket && idFromState && ticket.id !== idFromState) return false; // stale state from an old visit

  fbq('track', 'Lead', { content_name: 'פיגמנט שפתיים', content_category: 'treats' }, { eventID: id });
  try {
    sessionStorage.setItem(LEAD_KEY, JSON.stringify({ id, fired: true }));
  } catch (e) {
    /* ignore */
  }
  return true;
};

export { THANKS_PATH };
