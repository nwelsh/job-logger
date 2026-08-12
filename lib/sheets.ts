const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzyfhT314amArhgNgG8D-kMOwT9hzjm0ViJyPi99oIIEfkLd0yGvB8o5ctMGkL_WWbj/exec"

interface JobEntry {
  company: string
  link: string
  jobTitle: string
  unlimitedPto: boolean
}

export async function logJob(entry: JobEntry) {
  const date = new Date().toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric"
  }) // e.g. "7/31"

  const job = {
    date,
    source: entry.company,
    link: entry.link,
    jobTitle: entry.jobTitle,
    replied: false,
    unlimitedPto: entry.unlimitedPto
  }

  const response = await fetch(SHEET_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(job)
  })

  console.log("Status:", response.status)
  console.log("Response:", await response.text())
}