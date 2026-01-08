export function saveLastLogin() {
    const now = new Date()
  
    let browser = "Bilinmeyen"
  
    if (navigator.userAgent.includes("Chrome")) {
      browser = "Chrome"
    } else if (navigator.userAgent.includes("Firefox")) {
      browser = "Firefox"
    } else if (navigator.userAgent.includes("Safari")) {
      browser = "Safari"
    }
  
    const lastLogin = {
      time: now.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: now.toLocaleDateString("tr-TR"),
      browser,
    }
  
    localStorage.setItem("lastLogin", JSON.stringify(lastLogin))
  }
  
  export function getLastLogin() {
    const data = localStorage.getItem("lastLogin")
    return data ? JSON.parse(data) : null
  }
  