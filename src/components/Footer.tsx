export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} PDFKit — Online PDF Tools</p>
        <p>Built client-side with pdf-lib. Your files never leave your browser.</p>
      </div>
    </footer>
  );
}
