import { useState } from "react"

import { logJob } from "./lib/sheets"

function IndexPopup() {
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    if (!tab.url) return

    try {
      await logJob(tab.url)
      setSaved(true)
    } catch (err) {
      console.error(err)
      alert("Failed to save job")
    }
  }

  return (
    <div
      style={{
        width: 300,
        padding: 16,
        fontFamily: "Arial"
      }}>
      <h2>Job Logger</h2>

      <p>Save the current Jobright job.</p>

      <button
        onClick={handleSave}
        style={{
          padding: "8px 16px",
          cursor: "pointer"
        }}>
        Save Job
      </button>

      {saved && <p>✅ Saved!</p>}
    </div>
  )
}

export default IndexPopup
