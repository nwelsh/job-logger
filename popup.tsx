import { useState } from "react"

import { logJob } from "./lib/sheets"

function IndexPopup() {
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    console.log(tab.url)

    setSaved(true)
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

      {saved && <p>✅ Saved (for now)</p>}
    </div>
  )
}

export default IndexPopup
