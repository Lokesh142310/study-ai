export const metadata = {
  title: "MAX AI Study System",
  description: "Advanced AI Study Generator"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        minHeight: "100vh",
        color: "white"
      }}>
        {children}
      </body>
    </html>
  );
}
