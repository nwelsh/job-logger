const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwiD94esHpGZqfTOnT2Jj_yAABW9F080qv4mKKCjpsFTlMaN7aVrD0LpEXfsMjqMtaa/exec"


export async function logJob() {

  const job = {
    date: new Date().toLocaleDateString(),
    source: "Jobright",
    link: window.location.href,
    location: "Remote",
    jobType: "Full-time",
    jobTitle: "Software Engineer",
    replied: false,
    unlimitedPto: false
  }


  await fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify(job)
  })

}