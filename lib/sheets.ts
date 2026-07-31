const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbysnIZK1L0zkH9ho7w7vKhgW9c9WIPGSrkNWBW-M_5bJWobEntvN_A9QFj4Bdhwwyrp/exec"

interface JobEntry {
  company: string
  link: string
  jobType: string
  jobTitle: string
  replied: boolean
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
    location: "Remote",
    jobType: entry.jobType,
    jobTitle: entry.jobTitle,
    replied: entry.replied,
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