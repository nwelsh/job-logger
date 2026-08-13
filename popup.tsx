import { useEffect, useState } from "react"

import "./style.css"

import { logJob } from "./lib/sheets"

// TODO:
// auto fill
// search the spreadsheet for this place

const JOB_TITLE_OPTIONS = [
  "Frontend Developer",
  "Frontend Software Engineer",
  "Web Developer"
]

function getTodayKey() {
  const today = new Date()
  return `jobCount-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
}

function IndexPopup() {
  const [company, setCompany] = useState("")
  const [jobTitleOption, setJobTitleOption] = useState(JOB_TITLE_OPTIONS[0])
  const [customJobTitle, setCustomJobTitle] = useState("")
  const [unlimitedPto, setUnlimitedPto] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [todayCount, setTodayCount] = useState(0)

  useEffect(() => {
    const key = getTodayKey()
    chrome.storage.local.get([key], (result) => {
      setTodayCount(result[key] || 0)
    })
  }, [])

  const incrementTodayCount = () => {
    const key = getTodayKey()
    chrome.storage.local.get([key], (result) => {
      const newCount = (result[key] || 0) + 1
      chrome.storage.local.set({ [key]: newCount }, () => {
        setTodayCount(newCount)
      })
    })
  }

  const resolvedJobTitle =
    jobTitleOption === "Other" ? customJobTitle : jobTitleOption

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
        jobTitle: resolvedJobTitle,
        unlimitedPto
      })
      setSaved(true)
      incrementTodayCount()
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
      <h2 style={{ marginBottom: 4, fontFamily: "cursive", fontSize: 32 }}>
        Nicole's Job Log-HER
      </h2>
      <p style={{ marginTop: 0, color: "#555", fontSize: 13 }}>
        Save this job to your job logger!
      </p>
      <label
        style={{
          display: "block",
          fontSize: 12,
          marginTop: 8,
          fontWeight: "bold"
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
          marginTop: 16,
          fontWeight: "bold"
        }}>
        Job Title
      </label>
      <div style={{ marginTop: 4 }}>
        {JOB_TITLE_OPTIONS.map((option) => (
          <div
            key={option}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 4
            }}>
            <input
              type="radio"
              id={option}
              name="jobTitle"
              value={option}
              checked={jobTitleOption === option}
              onChange={(e) => setJobTitleOption(e.target.value)}
            />
            <label htmlFor={option} style={{ margin: 0, fontSize: 13 }}>
              {option}
            </label>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 4
          }}>
          <input
            type="radio"
            id="Other"
            name="jobTitle"
            value="Other"
            checked={jobTitleOption === "Other"}
            onChange={(e) => setJobTitleOption(e.target.value)}
          />
          <label htmlFor="Other" style={{ margin: 0, fontSize: 13 }}>
            Other
          </label>
        </div>

        {jobTitleOption === "Other" && (
          <input
            type="text"
            value={customJobTitle}
            onChange={(e) => setCustomJobTitle(e.target.value)}
            placeholder="Enter job title"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: 4,
              borderRadius: 12,
              borderColor: "#fe19c5",
              marginTop: 4
            }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 16,
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
      {saved && (
        <p style={{ color: "#fe19c5", textAlign: "center", fontSize: 16 }}>
          ✅ Saved!
        </p>
      )}
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#555",
          marginTop: 8
        }}>
        You've applied to {todayCount}/4 jobs today!
      </p>
      <p style={{ fontWeight: "bold" }}>Quick links/helpers</p>
      <p>https://www.linkedin.com/in/nicole--welsh/</p>
      <p>https://github.com/nwelsh</p>
      <p>https://nwelsh.github.io/</p>
      <a
        href="https://docs.google.com/document/d/18CtbIVSnbW4Joqaj0lmPwC_nXjPqpp1pIKLYBO6hXyg/edit?tab=t.0"
        target="_blank">
        resume/cover letter
      </a>
    </div>
  )
}

export default IndexPopup
