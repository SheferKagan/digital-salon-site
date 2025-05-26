/* script.js */
document.getElementById('leadForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const link = document.getElementById('link').value.trim();
    const extra = document.getElementById('extra').value.trim();
  
    if (!email.includes('@')) {
      alert('כתובת מייל לא תקינה. שכחת "@" אולי?');
      return;
    }
  
    const formData = new FormData();
    formData.append('שם', name);
    formData.append('אימייל', email);
    formData.append('קישור', link);
    formData.append('הערות', extra);
  
    try {
        await fetch('https://script.google.com/macros/s/AKfycbwAeCv7jySowQrJEmQ3mPpzCwHvRzStxELHciWBGiORFp__TKheOrSOsGPL8XevnKkaew/exec', {
            method: 'POST',
            body: formData
          });
      alert('הפרטים נשלחו בהצלחה! נחזור אליך בהקדם.');
      document.getElementById('leadForm').reset();
    } catch (error) {
      alert('הייתה שגיאה בשליחת הפרטים. נסה שוב.');
    }
  });
  