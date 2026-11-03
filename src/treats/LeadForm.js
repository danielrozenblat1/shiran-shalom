import React, { useRef, useState } from 'react';
import styles from './LeadForm.module.css';
import PrivacyPolicy from '../components/privacy/Privacy';
import { sendLead, isValidPhone, compressImage } from './leadApi';

const EMPTY = { fullName: '', phone: '', clinic: '', bother: '' };

const Icon = ({ d, className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    {d}
  </svg>
);

const icons = {
  user: (
    <>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  ),
  camera: (
    <>
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </>
  ),
  arrow: (
    <>
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </>
  ),
  x: (
    <>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </>
  ),
};

/**
 * Lead form for the /treats page. Rendered several times down the page,
 * each with its own state. `data-lead-form` lets the sticky CTA find the nearest one.
 */
const LeadForm = ({ title = 'רוצה שפתיים שנראות מושלם כל בוקר?', subtitle = 'השאירי פרטים ואחזור אלייך לשיחה קצרה' }) => {
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const fileRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const onFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((er) => ({ ...er, image: 'אפשר לצרף רק קובץ תמונה' }));
      return;
    }
    const small = await compressImage(file);
    setImage(small);
    setPreview(URL.createObjectURL(small));
    setErrors((er) => ({ ...er, image: '' }));
  };

  const clearFile = () => {
    setImage(null);
    setPreview('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const validate = () => {
    const next = {};
    if (data.fullName.trim().length < 2) next.fullName = 'איך קוראים לך?';
    if (!isValidPhone(data.phone)) next.phone = 'מספר טלפון לא תקין';
    if (!data.clinic) next.clinic = 'בחרי כן או לא';
    if (!agreed) next.agreed = 'צריך לאשר את מדיניות הפרטיות';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!validate()) return;
    setStatus('sending');
    const ok = await sendLead({ ...data, fullName: data.fullName.trim(), phone: data.phone.trim(), image });
    if (ok) {
      setStatus('sent');
      setData(EMPTY);
      clearFile();
      setAgreed(false);
    } else {
      setStatus('error');
    }
  };

  const busy = status === 'sending';

  return (
    <section className={styles.wrap} data-lead-form>
      <div className={styles.card}>
        {status === 'sent' ? (
          <div className={styles.success} role="status">
            <div className={styles.successMark} aria-hidden="true">
              <Icon d={icons.check} />
            </div>
            <h3 className={styles.successTitle}>קיבלתי, תודה!</h3>
            <p className={styles.successText}>אחזור אלייך בהקדם לשיחה קצרה ונתאם את הטיפול</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <div className={styles.head}>
              <span className={styles.diamond} aria-hidden="true" />
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>

            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.label}>שם מלא</span>
                <span className={`${styles.control} ${errors.fullName ? styles.invalid : ''}`}>
                  <Icon d={icons.user} className={styles.fieldIcon} />
                  <input
                    className={styles.input}
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    value={data.fullName}
                    onChange={onChange}
                    placeholder="איך קוראים לך?"
                    disabled={busy}
                  />
                </span>
                {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
              </label>

              <label className={styles.field}>
                <span className={styles.label}>מספר טלפון</span>
                <span className={`${styles.control} ${errors.phone ? styles.invalid : ''}`}>
                  <Icon d={icons.phone} className={styles.fieldIcon} />
                  <input
                    className={styles.input}
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    value={data.phone}
                    onChange={onChange}
                    placeholder="050-0000000"
                    disabled={busy}
                  />
                </span>
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
              </label>
            </div>

            <fieldset className={`${styles.field} ${styles.fieldset}`}>
              <legend className={styles.label}>מוכנה להגיע לקליניקה בשכונת אחיסמך החדשה, לוד?</legend>
              <div className={`${styles.segment} ${errors.clinic ? styles.invalid : ''}`}>
                {['כן', 'לא'].map((opt) => (
                  <label key={opt} className={`${styles.segmentItem} ${data.clinic === opt ? styles.segmentOn : ''}`}>
                    <input type="radio" name="clinic" value={opt} checked={data.clinic === opt} onChange={onChange} disabled={busy} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
              {errors.clinic && <span className={styles.error}>{errors.clinic}</span>}
            </fieldset>

            <label className={styles.field}>
              <span className={styles.label}>מה הכי מפריע לך בשפתיים היום?</span>
              <textarea
                className={styles.textarea}
                name="bother"
                rows={3}
                value={data.bother}
                onChange={onChange}
                placeholder="למשל: הן חיוורות, לא סימטריות, אני מתקנת אודם כל היום..."
                disabled={busy}
              />
            </label>

            <div className={styles.field}>
              <span className={styles.label}>
                תמונה של השפתיים <span className={styles.optional}>לא חובה</span>
              </span>
              {preview ? (
                <div className={styles.previewRow}>
                  <img src={preview} alt="תצוגה מקדימה של התמונה שצירפת" className={styles.preview} />
                  <div className={styles.previewText}>
                    <strong>התמונה צורפה</strong>
                    <span>זה יעזור לי להתאים לך את הגוון מראש</span>
                  </div>
                  <button type="button" className={styles.removeFile} onClick={clearFile} disabled={busy} aria-label="הסרת התמונה">
                    <Icon d={icons.x} />
                  </button>
                </div>
              ) : (
                <label className={styles.upload}>
                  <input ref={fileRef} type="file" accept="image/*" onChange={onFile} disabled={busy} />
                  <span className={styles.uploadIcon}>
                    <Icon d={icons.camera} />
                  </span>
                  <span className={styles.uploadText}>
                    <strong>צרפי תמונה של השפתיים</strong>
                    <span>עוזר לי להתאים לך את הגוון המדויק</span>
                  </span>
                </label>
              )}
              {errors.image && <span className={styles.error}>{errors.image}</span>}
            </div>

            <label className={`${styles.consent} ${errors.agreed ? styles.consentError : ''}`}>
              <input type="checkbox" checked={agreed} onChange={() => setAgreed((a) => !a)} disabled={busy} />
              <span className={styles.consentBox} aria-hidden="true">
                <Icon d={icons.check} />
              </span>
              <span className={styles.consentText}>
                קראתי ואני מאשרת את{' '}
                <span onClick={(e) => e.preventDefault()} className={styles.privacyLink}>
                  <PrivacyPolicy ownerName="שירן שלום" phone="+972 50-936-5362" domain="https://shiranshalomacademy.co.il/" />
                </span>
              </span>
            </label>

            <button type="submit" className={styles.submit} disabled={busy}>
              {busy ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  שולחת...
                </>
              ) : (
                <>
                  שירן, בואי נדבר
                  <Icon d={icons.arrow} className={styles.submitIcon} />
                </>
              )}
            </button>

            <p className={styles.trust}>
              <Icon d={icons.lock} className={styles.trustIcon} />
              שיחה קצרה, בלי התחייבות. הפרטים שלך נשארים אצלי בלבד
            </p>

            {status === 'error' && (
              <p className={styles.sendError} role="alert">
                משהו השתבש בשליחה. אפשר לנסות שוב או לכתוב לי ישירות בוואטסאפ.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default LeadForm;
