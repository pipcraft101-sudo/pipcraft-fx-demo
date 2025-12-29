```javascript
class FBSBanner extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin: 2rem 0;
        }
        .fbs-banner {
          background: linear-gradient(135deg, #1e3a8a, #3b82f6);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .fbs-banner::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          opacity: 0.3;
        }
        .fbs-banner h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }
        .fbs-banner p {
          color: #dbeafe;
          margin-bottom: 1.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .fbs-banner .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: white;
          color: #1e3a8a;
          font-weight: 600;
          padding: 0
___METADATA_START___
{"repoId":"Xlordsmith/pipcraft-fx-free-premium-forex-terminal-academy","isNew":false,"userName":"Xlordsmith"}
___METADATA_END___