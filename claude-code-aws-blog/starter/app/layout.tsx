import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AWS Claude Code Blog",
  description: "A blog about building AI-powered applications with Claude Code on AWS",
  keywords: ["AWS", "Claude Code", "AI", "Machine Learning", "Bedrock", "Development"],
  authors: [{ name: "AWS Workshop" }],
  openGraph: {
    title: "AWS Claude Code Blog",
    description: "Learn to build AI-powered applications with Claude Code on AWS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* AWS Theme Variables - Inline to bypass MIME type issues with CloudFront proxy */
            :root {
              --aws-orange: #FF9900;
              --aws-dark: #232F3E;
              --aws-blue: #146EB4;
              --aws-light-gray: #F2F3F3;
              --aws-dark-gray: #545B64;
            }

            * { box-sizing: border-box; margin: 0; padding: 0; }

            /* Keyframe Animations */
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes fadeInScale {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            /* Animation Utility Classes */
            .animate-fadeInScale {
              animation: fadeInScale 0.6s ease-out forwards;
              opacity: 0;
            }

            .animate-fadeInUp {
              animation: fadeInUp 0.8s ease-out forwards;
              opacity: 0;
            }

            .animate-fadeInUp-delay-1 {
              animation: fadeInUp 0.8s ease-out 0.2s forwards;
              opacity: 0;
            }

            .animate-fadeInUp-delay-2 {
              animation: fadeInUp 0.8s ease-out 0.4s forwards;
              opacity: 0;
            }

            /* Accessibility: Disable animations for users who prefer reduced motion */
            @media (prefers-reduced-motion: reduce) {
              .animate-fadeInScale,
              .animate-fadeInUp,
              .animate-fadeInUp-delay-1,
              .animate-fadeInUp-delay-2 {
                animation: none;
                opacity: 1;
              }
            }

            body {
              font-family: ui-sans-serif, system-ui, sans-serif;
              background: #ffffff;
              color: #232F3E;
              line-height: 1.6;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
            }

            .bg-aws-orange { background-color: var(--aws-orange); }
            .bg-aws-dark { background-color: var(--aws-dark); }
            .bg-aws-blue { background-color: var(--aws-blue); }
            .bg-gradient-aws {
              background: linear-gradient(135deg, #FF9900 0%, #FFB84D 100%);
            }
            .text-white { color: white; }
            .text-aws-dark-gray { color: var(--aws-dark-gray); }
            .text-aws-light-gray { color: var(--aws-light-gray); }

            .container { max-width: 1200px; margin: 0 auto; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
            .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
            .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
            .p-12 { padding: 3rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-8 { margin-bottom: 2rem; }
            .mb-16 { margin-bottom: 4rem; }
            .mt-auto { margin-top: auto; }

            .text-center { text-align: center; }
            .text-5xl { font-size: 3rem; line-height: 1.2; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }

            .rounded-lg { border-radius: 0.5rem; }
            .rounded-2xl { border-radius: 1rem; }
            .flex-1 { flex: 1 1 0%; }
            .inline-block { display: inline-block; }

            button, .btn {
              cursor: pointer;
              border: none;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              text-decoration: none;
              display: inline-block;
            }

            button.bg-aws-dark:hover, .btn.bg-aws-dark:hover {
              background-color: var(--aws-blue);
              transform: translateY(-2px) scale(1.02);
              box-shadow: 0 6px 20px rgba(20, 110, 180, 0.4);
            }

            button.bg-aws-dark:active, .btn.bg-aws-dark:active {
              transform: translateY(0) scale(0.98);
              box-shadow: 0 2px 8px rgba(35, 47, 62, 0.2);
            }

            button.bg-aws-dark:focus, .btn.bg-aws-dark:focus {
              outline: 3px solid rgba(255, 153, 0, 0.5);
              outline-offset: 2px;
            }

            @media (max-width: 768px) {
              .text-5xl { font-size: 2rem; line-height: 1.2; }
              .text-xl { font-size: 1.125rem; line-height: 1.75rem; }
              .py-12 { padding-top: 2rem; padding-bottom: 2rem; }
            }

            @media (max-width: 480px) {
              .text-5xl { font-size: 1.75rem; line-height: 1.2; }
              .text-xl { font-size: 1rem; line-height: 1.6; }
              .px-8 { padding-left: 1rem; padding-right: 1rem; }
              .py-12 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
              .mb-6 { margin-bottom: 1rem; }
              .mb-8 { margin-bottom: 1.5rem; }
            }
          `
        }} />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-aws-dark text-aws-light-gray py-6 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              Built with Claude Code on AWS | Workshop Exercise
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
