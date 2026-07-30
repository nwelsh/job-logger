const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbysnIZK1L0zkH9ho7w7vKhgW9c9WIPGSrkNWBW-M_5bJWobEntvN_A9QFj4Bdhwwyrp/exec"

export async function logJob(url: string) {
  const job = {
    date: new Date().toLocaleDateString(),
    source: "Jobright",
    link: url,
    location: "Remote",
    jobType: "Full-time",
    jobTitle: "Software Engineer",
    replied: false,
    unlimitedPto: false
  }

  const response = await fetch(SHEET_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(job)
  })

  console.log("Status:", response.status)
  console.log("Response:", await response.text())
}