
import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">

        <Header />

        <main className="min-h-screen px-4 md:px-8">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}