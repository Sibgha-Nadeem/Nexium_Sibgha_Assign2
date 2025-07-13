'use client'

import { useState } from 'react'

export default function BlogSummarizer() {
  const [url, setUrl] = useState('')
  const [summary, setSummary] = useState('')
  const [urdu, setUrdu] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!url.trim()) return
    setLoading(true)

    try {
      const res = await fetch('/api/summarizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const data = await res.json()
      setSummary(data.summary)
      setUrdu(data.translation)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* GLOBAL STYLES */}
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background-color: white;
          color: #1f3b73;
        }

        /* HEADER */
        .header {
          background-color: #2c3643;
          color: white;
          padding: 15px 20px;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 50;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          height: 80px;
          display: flex;
          align-items: center;
        }

        /* BANNER */
        .banner {
          margin-top: 90px;
          height: 300px;
          background-image: url('/marble.jpeg');
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          text-align: center;
        }

        .banner-overlay h2 {
          color: white;
          font-size: 46px;
          font-weight: bold;
          font-family: 'Playfair Display', serif;
          line-height: 1.4;
        }

        /* MAIN FORM SECTION */
        .main-content {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          text-align: center;
        }

        .main-content h2 {
          font-size: 36px;
          margin-bottom: 20px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
        }

        .form input {
          width: 100%;
          max-width: 400px;
          padding: 15px;
          font-size: 18px;
          border-radius: 10px;
          border: 1px solid #ccc;
        }

        .form button {
          padding: 15px 30px;
          font-size: 18px;
          border: none;
          border-radius: 10px;
          background-color: #1f3b73;
          color: white;
          cursor: pointer;
        }

        .form button:hover {
          background-color: #2e5092;
        }

        /* RESULTS */
        .results {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
        }

        .card {
          background-color: white;
          border: 1px solid #d0dff5;
          padding: 20px;
          border-radius: 16px;
          margin-bottom: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: left;
        }

        .card h2 {
          margin-bottom: 10px;
          font-size: 20px;
        }

        .card p {
          font-size: 16px;
          line-height: 1.6;
          color: #3d5b8d;
        }

        /* SHARED SECTIONS: about, how, tips, stats, footer */
        .about-modern, .how-it-works, .tips-section, .stats-section {
          padding: 80px 20px;
          text-align: center;
        }

        .about-title, .how-title, .tips-section h2, .stats-heading {
          font-size: 34px;
          font-family: 'Playfair Display', serif;
          color: #1f3b73;
        }

        .about-subtitle, .how-subtitle, .tips-intro, .stats-subheading {
          font-size: 18px;
          color: #3d5b8d;
          max-width: 800px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        .about-grid, .how-steps, .tips-grid, .stats-grid {
          display: grid;
          gap: 30px;
          margin: 0 auto;
        }

        .about-grid {
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          max-width: 1100px;
        }

        .how-steps {
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          max-width: 1000px;
        }

        .tips-grid {
          grid-template-columns: repeat(1, 1fr);
          max-width: 1100px;
        }

        @media (min-width: 600px) {
          .tips-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .tips-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .about-card, .how-card, .tip-card, .stat-box {
          background-color: white;
          border: 1px solid #d0dff5;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .about-card:hover, .how-card:hover, .tip-card:hover, .stat-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }

        .about-emoji {
          font-size: 34px;
          margin-bottom: 16px;
        }

        .about-card h3, .how-card h3, .tip-card h3, .stat-box h3 {
          font-size: 20px;
          color: #1f3b73;
          margin-bottom: 10px;
        }

        .tip-card p, .stat-box p, .how-card p, .about-card p {
          font-size: 16px;
          color: #3d5b8d;
          line-height: 1.5;
        }

        .footer {
          background-color: #2c3643;
          color: white;
          padding: 40px 20px;
          text-align: center;
          margin-top: 80px;
        }

        .footer-content h4 {
          font-size: 24px;
          font-family: 'Playfair Display', serif;
          margin-bottom: 10px;
        }

        .footer-content p {
          font-size: 16px;
          font-family: 'Segoe UI', sans-serif;
        }

        .small-text {
          font-size: 14px;
          color: #cccccc;
          margin-top: 10px;
        }
      `}</style>

      {/* HEADER */}
      <header className="header">
        <h1>BLOG SUMMARIZE</h1>
        
      </header>

      {/* HERO BANNER */}
      <div className="banner">
        <div className="banner-overlay">
          <h2>Empower Your Reading — Get Instant Blog Summaries</h2>
        </div>
      </div>

      {/* FORM SECTION */}
      <section className="main-content">
        <h2>Summarize any text with just a click.</h2>
        <div className="form">
          <input
            type="text"
            placeholder="https://example.com/blog-post"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleSubmit}>
            {loading ? 'Summarizing...' : 'Submit'}
          </button>
        </div>
      </section>

      {/* RESULTS */}
      {(summary || urdu) && (
        <section className="results">
          {summary && (
            <div className="card">
              <h2>Summary (English):</h2>
              <p>{summary}</p>
            </div>
          )}
          {urdu && (
            <div className="card">
              <h2>Translation (Urdu):</h2>
              <p>{urdu}</p>
            </div>
          )}
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2 className="how-title">How to Use the Blog Summarizer</h2>
        <p className="how-subtitle">
          Follow these three simple steps to get a summary in both English and Urdu.
        </p>

        <div className="how-steps">
          {[
            { step: 'Step 1', title: 'Paste Blog URL', desc: 'Copy the link to any blog or article you want to summarize and paste it into the input box.' },
            { step: 'Step 2', title: 'Click Submit', desc: 'Press the submit button and let the summarizer process the blog content instantly.' },
            { step: 'Step 3', title: 'Get Your Summary', desc: 'View the summary in English and its Urdu translation — clear, concise, and ready to use.' },
          ].map((item, idx) => (
            <div key={idx} className="how-card">
              <div className="how-step">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-modern">
        <h2 className="about-title">Why Use Blog Summarizer?</h2>
        <p className="about-subtitle">
          Designed for students, readers, and researchers who want instant clarity. Save time and digest blogs faster — now with bilingual support.
        </p>

        <div className="about-grid">
          {[
            { emoji: '⚡', title: 'Instant Summaries', desc: 'Generate clear, concise summaries of long-form blog content with one click.' },
            { emoji: '🌐', title: 'Bilingual Output', desc: 'Get summaries in both English and Urdu to reach a wider audience.' },
            { emoji: '🔓', title: 'No Sign-Up Required', desc: 'Use the tool freely — no account, no spam, just pure functionality.' },
            { emoji: '📱', title: 'Mobile-Friendly', desc: 'Optimized for any device. Summarize on the go, wherever you are.' },
            { emoji: '📚', title: 'Great for Research', desc: 'Perfect for students, journalists, and content creators.' },
            { emoji: '🧩', title: 'Simple UI', desc: 'Minimalist design that’s easy to use and distraction-free.' },
          ].map((item, idx) => (
            <div key={idx} className="about-card">
              <div className="about-emoji">{item.emoji}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <button
          style={{
            marginTop: '30px',
            padding: '14px 30px',
            fontSize: '18px',
            backgroundColor: '#1f3b73',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Try the Summarizer Now
        </button>
      </section>

      {/* TIPS SECTION */}
      <section className="tips-section">
        <h2>Tips for Better Summaries</h2>
        <p className="tips-intro">
          Get the most accurate and helpful summaries by following these quick suggestions.
        </p>

        <div className="tips-grid">
          {[
            { tip: 'Choose well-written blogs', desc: 'Articles with clear structure and good grammar produce better summaries.' },
            { tip: 'Avoid spammy websites', desc: 'Sites filled with ads or broken content may affect summary quality.' },
            { tip: 'Use short and direct URLs', desc: 'Long tracking URLs or redirect links can cause issues.' },
            { tip: 'Verify Urdu translations', desc: 'Machine translations work best with clear original content.' },
            { tip: 'Use it for research', desc: 'Extract insights quickly from blogs for writing or studying.' },
            { tip: 'Try different topics', desc: 'Works great for blogs on tech, education, health, and more.' },
          ].map((item, idx) => (
            <div key={idx} className="tip-card">
              <h3>{item.tip}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <h2 className="stats-heading">Trusted by Readers and Researchers</h2>
        <p className="stats-subheading">See how people are using Blog Summarizer every day</p>

        <div className="stats-grid">
          <div className="stat-box">
            <h3>10,000+</h3>
            <p>Summaries Generated</p>
          </div>
          <div className="stat-box">
            <h3>7,500+</h3>
            <p>Blog URLs Processed</p>
          </div>
          <div className="stat-box">
            <h3>2,000+</h3>
            <p>Translations to Urdu</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <h4>Blog Summarize</h4>
          <p>Summarize blogs instantly and get Urdu translations with a click.</p>
          <p className="small-text">© {new Date().getFullYear()} Made by Sibgha. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
