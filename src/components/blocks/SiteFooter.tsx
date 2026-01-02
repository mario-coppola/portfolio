export function SiteFooter() {
    return (
      <footer className="border-t">
        <div className="mx-auto max-w-4xl px-4 py-8 text-sm text-neutral-600">
          <p>© {new Date().getFullYear()} Mario Coppola.</p>
        </div>
      </footer>
    );
  }