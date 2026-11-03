import React, { useRef, useState } from 'react';
import styles from './LeadForm.module.css';
import PrivacyPolicy from '../components/privacy/Privacy';
import LottieIcon from '../components/lottie/LottieIcon';
import { sendLead, isValidPhone, compressImage } from './leadApi';

const EMPTY = { fullName: '', phone: '', clinic: '', bother: '' };

// Lordicon animations, loaded lazily (module scope keeps the identity stable).
const iconName = () => import('../Icons/form-name.json');
const iconPhone = () => import('../Icons/form-phone.json');
const iconLocation = () => import('../Icons/form-location.json');
const iconEdit = () => import('../Icons/form-edit.json');
const iconCamera = () => import('../Icons/form-camera.json');
const iconGuarantee = () => import('../Icons/form-guarantee.json');
const iconHeart = () => import('../Icons/form-heart.json');
const iconArrow = () => import('../Icons/form-arrow.json');
const iconRemove = () => import('../Icons/form-remove.json');

const ACCENT = '#9b4c62';
const INK = '#141010';

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
            <div className={styles.successMark}>
              <LottieIcon loadIcon={iconHeart} size="44px" colorize="#ffffff" once />
            </div>
            <h3 className={styles.successTitle}>קיבלתי, תודה!</h3>
            <p className={styles.successText}>אחזור אלייך בהקדם לשיחה קצרה ונתאם את הטיפול</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <div className={styles.head}>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>

            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.label}>שם מלא</span>
                <span className={`${styles.control} ${errors.fullName ? styles.invalid : ''}`}>
                  <LottieIcon loadIcon={iconName} size="22px" colorize={ACCENT} once className={styles.fieldIcon} />
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
                  <LottieIcon loadIcon={iconPhone} size="22px" colorize={ACCENT} once className={styles.fieldIcon} />
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
              <legend className={styles.label}>
                <LottieIcon loadIcon={iconLocation} size="20px" colorize={ACCENT} once className={styles.labelIcon} />
                מוכנה להגיע לקליניקה בשכונת אחיסמך החדשה, לוד?
              </legend>
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
              <span className={styles.label}>
                <LottieIcon loadIcon={iconEdit} size="20px" colorize={ACCENT} once className={styles.labelIcon} />
                מה הכי מפריע לך בשפתיים היום?
              </span>
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
                    <LottieIcon loadIcon={iconRemove} size="22px" colorize={INK} once />
                  </button>
                </div>
              ) : (
                <label className={styles.upload}>
                  <input ref={fileRef} type="file" accept="image/*" onChange={onFile} disabled={busy} />
                  <span className={styles.uploadIcon}>
                    <LottieIcon loadIcon={iconCamera} size="28px" colorize={ACCENT} once />
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
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
                  <LottieIcon loadIcon={iconArrow} size="24px" colorize="#ffffff" className={styles.submitIcon} />
                </>
              )}
            </button>

            <p className={styles.trust}>
              <LottieIcon loadIcon={iconGuarantee} size="18px" colorize={INK} once className={styles.trustIcon} />
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
