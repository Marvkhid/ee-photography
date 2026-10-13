'use client'

/** Last-resort error screen for failures in the root layout itself. Self-contained on purpose. */
const GlobalError = ({ reset }: { reset: () => void }) => (
  <html lang="en">
    <body style={{ background: '#080808', color: '#f4f0e9', fontFamily: 'Georgia, serif', textAlign: 'center', padding: '20vh 1.5rem' }}>
      <h1 style={{ fontWeight: 400, fontSize: '2.5rem' }}>Something went wrong</h1>
      <p style={{ color: '#b8b1a7' }}>Please try again in a moment.</p>
      <button
        onClick={reset}
        style={{ marginTop: '1.5rem', padding: '0.8rem 1.6rem', background: 'none', color: '#f4f0e9', border: '1px solid #666', borderRadius: '999px', cursor: 'pointer' }}
        type="button"
      >
        Try again
      </button>
    </body>
  </html>
)

export default GlobalError
