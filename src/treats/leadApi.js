// Lead delivery for the /treats campaign page.
// 1. The standard email server (same one every landing page uses) - sends the lead to Shiran's inbox.
// 2. A Make webhook - pushes the same lead (plus the optional photo) straight into her Monday leads board.

export const SERVER_URL = 'https://dynamic-server-dfc88e1f1c54.herokuapp.com/leads/newLead';
export const RECEIVER_EMAIL = 'Shalomshiran444@gmail.com';
export const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/8n43befds5arbpu82qgfk2dx7mkb785f';

export const WHATSAPP_NUMBER = '972509365362';
export const WHATSAPP_MESSAGE = 'היי שירן, הגעתי מדף פיגמנט השפתיים ואשמח לשמוע עוד על הטיפול';

export const openWhatsApp = () => {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    '_blank',
    'noopener'
  );
};

// Israeli mobile / landline, with or without +972 and separators.
export const isValidPhone = (raw) => {
  const digits = String(raw || '').replace(/\D/g, '');
  const local = digits.startsWith('972') ? `0${digits.slice(3)}` : digits;
  return /^0(5\d|[23489])\d{7}$/.test(local);
};

// "050-936-5362" / "+972509365362" -> "972509365362" (what Monday's phone column wants)
export const toInternational = (raw) => {
  const digits = String(raw || '').replace(/\D/g, '');
  if (digits.startsWith('972')) return digits;
  if (digits.startsWith('0')) return `972${digits.slice(1)}`;
  return digits;
};

// Campaign attribution from the ad URL (utm_* / fbclid) so Shiran can see which ad sent the lead.
export const getCampaignLabel = () => {
  try {
    const p = new URLSearchParams(window.location.search);
    const parts = ['utm_campaign', 'utm_content', 'utm_source', 'utm_medium']
      .map((k) => p.get(k))
      .filter(Boolean);
    const base = 'דף נחיתה - פיגמנט שפתיים (/treats)';
    return parts.length ? `${base} | ${parts.join(' | ')}` : base;
  } catch (e) {
    return 'דף נחיתה - פיגמנט שפתיים (/treats)';
  }
};

// Shrinks a phone photo before upload (keeps the webhook payload small, typically < 300kB).
export const compressImage = (file, maxSide = 1400, quality = 0.82) =>
  new Promise((resolve) => {
    if (!file || !file.type.startsWith('image/')) return resolve(file);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      if (scale === 1 && file.size < 600 * 1024) return resolve(file);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(file);
          const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
          resolve(new File([blob], name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };
    img.src = url;
  });

/**
 * Sends the lead everywhere it needs to go.
 * Resolves true when at least one destination accepted it, so a hiccup on one
 * side never loses a paid lead.
 */
export const sendLead = async ({ fullName, phone, clinic, bother, image }) => {
  const phoneIntl = toInternational(phone);
  const campaign = getCampaignLabel();

  const reason = [
    `מוכנה להגיע לקליניקה בלוד: ${clinic}`,
    `מה הכי מפריע לה בשפתיים: ${bother || '-'}`,
    image ? `צירפה תמונת שפתיים (נמצאת בלוח הלידים ב-Monday)` : 'לא צירפה תמונה',
    `מקור: ${campaign}`,
  ].join('\n');

  const emailRequest = fetch(SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: fullName,
      phone,
      email: '',
      reason,
      reciver: RECEIVER_EMAIL,
    }),
  }).then((r) => r.ok);

  const fd = new FormData();
  fd.append('name', fullName);
  fd.append('phone', phoneIntl);
  fd.append('phone_display', phone);
  fd.append('clinic', clinic);
  fd.append('bother', bother || '');
  fd.append('campaign', campaign);
  fd.append('page', window.location.href);
  if (image) fd.append('image', image, image.name);

  const makeRequest = fetch(MAKE_WEBHOOK_URL, { method: 'POST', body: fd }).then((r) => r.ok);

  const results = await Promise.allSettled([emailRequest, makeRequest]);
  const okCount = results.filter((r) => r.status === 'fulfilled' && r.value).length;
  results.forEach((r, i) => {
    if (r.status === 'rejected' || !r.value) {
      console.error(`lead destination ${i === 0 ? 'email' : 'make'} failed`, r.reason || '');
    }
  });
  return okCount > 0;
};
