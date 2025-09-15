import { Building2 } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Johnson & Johnson</h1>
              <p className="text-sm text-muted-foreground">Clinical Research Division</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
