import "./globals.css";

export const metadata = {
  title: "Mi primer ToDo en Next.js",
  description: "Una lista de tareas simple para aprender React y Next.js desde cero.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
