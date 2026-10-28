import { headers } from "next/headers";

// Force dynamic rendering on every request (no caching)
export const dynamic = "force-dynamic";

const quotes = [
  "The best way to predict the future is to invent it. – Alan Kay",
  "Talk is cheap. Show me the code. – Linus Torvalds",
  "Any sufficiently advanced technology is indistinguishable from magic. – Arthur C. Clarke",
  "Simplicity is the ultimate sophistication. – Leonardo da Vinci",
  "First, solve the problem. Then, write the code. – John Johnson",
  "The most dangerous phrase in the language is: We've always done it this way. – Grace Hopper",
  "Programs must be written for people to read. – Harold Abelson",
  "Make it work, make it right, make it fast. – Kent Beck",
];

export default async function Home() {
  const headersList = await headers();
  const timestamp = new Date().toISOString();
  const randomNumber = Math.random();
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Collect some interesting headers
  const interestingHeaders: Record<string, string | null> = {
    "x-forwarded-for": headersList.get("x-forwarded-for"),
    "x-forwarded-proto": headersList.get("x-forwarded-proto"),
    host: headersList.get("host"),
    "user-agent": headersList.get("user-agent"),
    "accept-language": headersList.get("accept-language"),
  };

  return (
    <main style={{ fontFamily: "monospace", padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🚀 Minimal SSR App – Amplify Compute Test - lala PR</h1>
      <p style={{ color: "#666" }}>
        This page is server-rendered on every request. Refresh to see new values.
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2>⏱️ Server Timestamp</h2>
        <pre style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "4px" }}>
          {timestamp}
        </pre>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>🎲 Random Number</h2>
        <pre style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "4px" }}>
          {randomNumber}
        </pre>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>💬 Random Quote</h2>
        <blockquote style={{ background: "#f9f9f9", padding: "1rem", borderLeft: "4px solid #333", margin: 0 }}>
          {randomQuote}
        </blockquote>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>📡 Request Headers</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "2px solid #333", padding: "0.5rem" }}>Header</th>
              <th style={{ textAlign: "left", borderBottom: "2px solid #333", padding: "0.5rem" }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(interestingHeaders).map(([key, value]) => (
              <tr key={key}>
                <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{key}</td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem", wordBreak: "break-all" }}>
                  {value || <em style={{ color: "#999" }}>not present</em>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer style={{ marginTop: "3rem", borderTop: "1px solid #ddd", paddingTop: "1rem", color: "#999" }}>
        <p>
          ✅ If timestamp and random number change on each refresh, SSR compute is working.
        </p>
        <p>
          Also test the API route: <a href="/api/time" style={{ color: "#0070f3" }}>/api/time</a>
        </p>
      </footer>
    </main>
  );
}
