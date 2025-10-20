"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"
import AnalysisResults from "./analysis-results"

export function FileUploadSection() {
  const [clinicalTrialFiles, setClinicalTrialFiles] = useState([])
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const onDropClinicalTrial = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: "uploading",
      progress: 0,
    }))

    setClinicalTrialFiles((prev) => [...prev, ...newFiles])

    newFiles.forEach((uploadedFile) => {
      simulateFileProcessing(uploadedFile.id)
    })
  }, [])

  const simulateFileProcessing = (fileId) => {
    const uploadInterval = setInterval(() => {
      setClinicalTrialFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "uploading") {
            const newProgress = Math.min(file.progress + Math.random() * 30, 100)
            if (newProgress >= 100) {
              clearInterval(uploadInterval)
              return { ...file, status: "processing", progress: 100 }
            }
            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 500)

    setTimeout(() => {
      setClinicalTrialFiles((prev) =>
        prev.map((file) => (file.id === fileId ? { ...file, status: "completed" } : file)),
      )
    }, 3000)
  }

  const analyzeData = async () => {
    setIsAnalyzing(true)

    setTimeout(() => {
      const mockResult = {
        pValues: [
          { test: "Primary Endpoint", value: 0.032 },
          { test: "Secondary Endpoint A", value: 0.045 },
          { test: "Secondary Endpoint B", value: 0.089 },
          { test: "Safety Parameter 1", value: 0.156 },
          { test: "Safety Parameter 2", value: 0.023 },
          { test: "Efficacy Measure", value: 0.012 },
        ],
      }

      setAnalysisResult(mockResult)
      setIsAnalyzing(false)
    }, 2000)
  }

  const clinicalTrialDropzone = useDropzone({
    onDrop: onDropClinicalTrial,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: true,
  })

  const allFilesCompleted =
    clinicalTrialFiles.length > 0 && clinicalTrialFiles.every((file) => file.status === "completed")

  const renderUploadArea = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Clinical Trial Data
        </CardTitle>
        <CardDescription>Upload your clinical trial data in CSV format for statistical analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...clinicalTrialDropzone.getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            clinicalTrialDropzone.isDragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
        >
          <input {...clinicalTrialDropzone.getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          {clinicalTrialDropzone.isDragActive ? (
            <p className="text-lg font-medium text-primary">Drop files here...</p>
          ) : (
            <div>
              <p className="text-lg font-medium mb-2">Drop CSV files here or click to browse</p>
              <p className="text-sm text-muted-foreground">CSV format only • Maximum file size: 50MB per file</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const renderUploadedFiles = () =>
    clinicalTrialFiles.length > 0 && (
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clinicalTrialFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === "uploading" && (
                    <>
                      <Progress value={file.progress} className="w-20" />
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </>
                  )}
                  {file.status === "processing" && (
                    <>
                      <Badge variant="secondary">Processing</Badge>
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </>
                  )}
                  {file.status === "completed" && (
                    <>
                      <Badge variant="default" className="bg-accent">
                        Completed
                      </Badge>
                      <CheckCircle className="h-4 w-4 text-accent" />
                    </>
                  )}
                  {file.status === "error" && (
                    <>
                      <Badge variant="destructive">Error</Badge>
                      <XCircle className="h-4 w-4 text-destructive" />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )

  return (
    <div className="space-y-6">
      {renderUploadArea()}
      {renderUploadedFiles()}

      {allFilesCompleted && !analysisResult && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Button onClick={analyzeData} disabled={isAnalyzing} size="lg" className="bg-primary hover:bg-primary/90">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Analyze Clinical Trial Data
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                This will process your data and generate statistical p-values
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {analysisResult && <AnalysisResults result={analysisResult} />}
    </div>
  )
}
