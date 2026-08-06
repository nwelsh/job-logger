import { Crafty_Girls } from "next/font/google"
import { useState } from "react"

import { logJob } from "./lib/sheets"

const craftyGirls = Crafty_Girls({
  weight: "400",
  subsets: ["latin"]
})

// TODO:
// make pretty
// auto fill
// search the spreadsheet for this place
// make job title a radio button: fed, swe, other

function IndexPopup() {
  const [company, setCompany] = useState("")
  const [jobType, setJobType] = useState("Remote")
  const [jobTitle, setJobTitle] = useState("Frontend Developer")
  const [replied, setReplied] = useState(false)
  const [unlimitedPto, setUnlimitedPto] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    if (!tab.url) return

    setSaving(true)
    setSaved(false)

    try {
      await logJob({
        company,
        link: tab.url,
        jobType,
        jobTitle,
        replied,
        unlimitedPto
      })
      setSaved(true)
    } catch (err) {
      console.error(err)
      alert("Failed to save job")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      style={{
        width: 300,
        padding: 16,
        fontFamily: "Arial",
        background: "#ffe5f1"
      }}>
      <h2 style={{ marginBottom: 4 }} className={craftyGirls.className}>
        Job Log-HER
      </h2>
      <p style={{ marginTop: 0, color: "#555", fontSize: 13 }}>
        Save this job to your job logger!
      </p>

      <label
        style={{
          display: "block",
          fontSize: 12,
          marginTop: 8
        }}>
        Company
      </label>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="e.g. Vultr"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: 4,
          borderRadius: 12,
          borderColor: "#fe19c5"
        }}
      />

      <label
        style={{
          display: "block",
          fontSize: 12,
          marginTop: 8,
          borderRadius: 12
        }}>
        Location
      </label>
      <input
        type="text"
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        placeholder="e.g. Remote"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: 4,
          borderRadius: 12,
          borderColor: "#fe19c5"
        }}
      />

      <label style={{ display: "block", fontSize: 12, marginTop: 8 }}>
        Job Title
      </label>
      <input
        type="text"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="e.g. Software Engineer"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: 4,
          borderRadius: 12,
          borderColor: "#fe19c5"
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 10,
          borderRadius: 12
        }}>
        <input
          type="checkbox"
          id="replied"
          checked={replied}
          onChange={(e) => setReplied(e.target.checked)}
        />
        <label htmlFor="replied" style={{ margin: 0, fontSize: 13 }}>
          Replied
        </label>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 6,
          borderRadius: 12
        }}>
        <input
          type="checkbox"
          id="unlimitedPto"
          checked={unlimitedPto}
          onChange={(e) => setUnlimitedPto(e.target.checked)}
        />
        <label htmlFor="unlimitedPto" style={{ margin: 0, fontSize: 13 }}>
          Unlimited PTO
        </label>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          padding: "8px 16px",
          cursor: saving ? "not-allowed" : "pointer",
          marginTop: 14,
          width: "100%",
          borderRadius: 12,
          borderColor: "#fe19c5"
        }}>
        {saving ? "Saving..." : "Save Job"}
      </button>

      {saved && <p>✅ Saved!</p>}

      <p>quick links</p>
      <p>https://www.linkedin.com/in/nicole--welsh/</p>
      <p>https://github.com/nwelsh</p>
      <p>https://nwelsh.github.io/</p>
      <a href="https://docs.google.com/document/d/18CtbIVSnbW4Joqaj0lmPwC_nXjPqpp1pIKLYBO6hXyg/edit?tab=t.0">
        resume/cover letter
      </a>
    </div>
  )
}

export default IndexPopup
