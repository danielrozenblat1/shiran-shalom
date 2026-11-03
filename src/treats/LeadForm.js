import React, { useRef, useState } from 'react';
import styles from './LeadForm.module.css';
import PrivacyPolicy from '../components/privacy/Privacy';
import { sendLead, isValidPhone, compressImage } from './leadApi';

const EMPTY = { fullName: '', phone: '', clinic: '', bother: '' };

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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className={styles.successTitle}>קיבלתי, תודה!</h3>
            <p className={styles.successText}>אחזור אלייך בהקדם לשיחה קצרה ונתאם את הטיפול</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>

            <label className={styles.field}>
              <span className={styles.label}>שם מלא</span>
              <input
                className={`${styles.input} ${errors.fullName ? styles.invalid : ''}`}
                type="text"
                name="fullName"
                autoComplete="name"
                value={data.fullName}
                onChange={onChange}
                placeholder="איך קוראים לך?"
                disabled={busy}
              />
              {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
            </label>

            <label className={styles.field}>
              <span className={styles.label}>מספר טלפון</span>
              <input
                className={`${styles.input} ${errors.phone ? styles.invalid : ''}`}
                type="tel"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                value={data.phone}
                onChange={onChange}
                placeholder="050-0000000"
                disabled={busy}
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </label>

            <fieldset className={`${styles.field} ${styles.fieldset}`}>
              <legend className={styles.label}>האם את מוכנה להגיע לקליניקה שנמצאת בשכונת אחיסמך החדשה, לוד?</legend>
              <div className={styles.choices}>
                {['כן', 'לא'].map((opt) => (
                  <label key={opt} className={`${styles.choice} ${data.clinic === opt ? styles.choiceOn : ''}`}>
                    <input
                      type="radio"
                      name="clinic"
                      value={opt}
                      checked={data.clinic === opt}
                      onChange={onChange}
                      disabled={busy}
                    />
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
                תמונה של השפתיים <span className={styles.optional}>(לא חובה, עוזר לי להתאים לך את הגוון)</span>
              </span>
              {preview ? (
                <div className={styles.previewRow}>
                  <img src={preview} alt="תצוגה מקדימה של התמונה שצירפת" className={styles.preview} />
                  <button type="button" className={styles.removeFile} onClick={clearFile} disabled={busy}>
                    הסרה
                  </button>
                </div>
              ) : (
                <label className={styles.upload}>
                  <input ref={fileRef} type="file" accept="image/*" onChange={onFile} disabled={busy} />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <path d="M17 8l-5-5-5 5" />
                    <path d="M12 3v12" />
                  </svg>
                  <span>לחצי לצירוף תמונה</span>
                </label>
              )}
              {errors.image && <span className={styles.error}>{errors.image}</span>}
            </div>

            <label className={`${styles.consent} ${errors.agreed ? styles.consentError : ''}`}>
              <input type="checkbox" checked={agreed} onChange={() => setAgreed((a) => !a)} disabled={busy} />
              <span>
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
                'שירן, בואי נדבר'
              )}
            </button>

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
