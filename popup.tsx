import { useState } from "react"

import { logJob } from "./lib/sheets"

function IndexPopup() {
  const [company, setCompany] = useState("")
  const [jobType, setJobType] = useState("")
  const [jobTitle, setJobTitle] = useState("")
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
        fontFamily: "Arial"
      }}>
      <h2 style={{ marginBottom: 4 }}>Job Logger</h2>
      <p style={{ marginTop: 0, color: "#555", fontSize: 13 }}>
        Save the current job.
      </p>

      <label style={{ display: "block", fontSize: 12, marginTop: 8 }}>
        Company
      </label>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="e.g. Vultr"
        style={{ width: "100%", boxSizing: "border-box", padding: 4 }}
      />

      <label style={{ display: "block", fontSize: 12, marginTop: 8 }}>
        Location
      </label>
      <input
        type="text"
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        placeholder="e.g. Remote"
        style={{ width: "100%", boxSizing: "border-box", padding: 4 }}
      />

      <label style={{ display: "block", fontSize: 12, marginTop: 8 }}>
        Job Title
      </label>
      <input
        type="text"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="e.g. Software Engineer"
        style={{ width: "100%", boxSizing: "border-box", padding: 4 }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
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

      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
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
          width: "100%"
        }}>
        {saving ? "Saving..." : "Save Job"}
      </button>

      {saved && <p>✅ Saved!</p>}
    </div>
  )
}

export default IndexPopup