import { FileUploadSection } from "@/components/file-upload-section"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Clinical Trial Data Analysis</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Upload your clinical trial data files to receive comprehensive go/no-go decision analysis
            </p>
          </div>
          <FileUploadSection />
        </div>
      </main>
    </div>
  )
}
