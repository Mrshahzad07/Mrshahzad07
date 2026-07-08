export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 mt-12">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by <a href="https://mdshahzad.netlify.app" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4 hover:text-primary transition-colors">Md Shahzad</a>. 
          The source code is available on <a href="https://github.com/Mrshahzad07" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4 hover:text-primary transition-colors">GitHub</a>.
        </p>
      </div>
    </footer>
  )
}
