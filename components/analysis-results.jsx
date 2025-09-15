import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Clock, Shield } from "lucide-react"

const AnalysisResults = ({ result }) => {
  const getDecisionIcon = () => {
    switch (result.decision) {
      case "go":
        return <CheckCircle className="h-6 w-6 text-accent" />
      case "no-go":
        return <XCircle className="h-6 w-6 text-destructive" />
      case "conditional":
        return <AlertTriangle className="h-6 w-6 text-amber-500" />
    }
  }

  const getDecisionColor = () => {
    switch (result.decision) {
      case "go":
        return "bg-accent text-accent-foreground"
      case "no-go":
        return "bg-destructive text-destructive-foreground"
      case "conditional":
        return "bg-amber-500 text-white"
    }
  }

  const getDecisionText = () => {
    switch (result.decision) {
      case "go":
        return "Proceed to Next Phase"
      case "no-go":
        return "Do Not Proceed"
      case "conditional":
        return "Conditional Approval"
    }
  }

  return (
    <div className="space-y-6">
      {/* Decision Summary */}
      <Alert className="border-primary/20 bg-primary/5">
        <div className="flex items-center gap-3">
          {getDecisionIcon()}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge className={getDecisionColor()}>{getDecisionText()}</Badge>
              <span className="text-sm text-muted-foreground">Confidence: {result.confidence}%</span>
            </div>
            <AlertDescription className="text-base">
              Based on comprehensive analysis of your clinical trial data, the recommendation is to{" "}
              <strong>
                {result.decision === "go" ? "proceed" : result.decision === "no-go" ? "halt" : "conditionally proceed"}
              </strong>{" "}
              with the trial progression.
            </AlertDescription>
          </div>
        </div>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Risk Score</span>
                  <span className="text-sm text-muted-foreground">{result.riskScore}/100</span>
                </div>
                <Progress value={result.riskScore} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                {result.riskScore <= 30 && "Low risk profile - favorable for progression"}
                {result.riskScore > 30 && result.riskScore <= 60 && "Moderate risk - manageable with proper oversight"}
                {result.riskScore > 60 && "High risk - requires careful consideration and mitigation strategies"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Data Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Completeness</span>
                  <span className="text-sm font-medium">{result.dataQuality.completeness}%</span>
                </div>
                <Progress value={result.dataQuality.completeness} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Consistency</span>
                  <span className="text-sm font-medium">{result.dataQuality.consistency}%</span>
                </div>
                <Progress value={result.dataQuality.consistency} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Accuracy</span>
                  <span className="text-sm font-medium">{result.dataQuality.accuracy}%</span>
                </div>
                <Progress value={result.dataQuality.accuracy} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Key Findings</CardTitle>
          <CardDescription>Critical insights from your clinical trial data analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.keyFindings.map((finding, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{finding}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Actionable steps for trial progression</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Current Phase</h4>
              <p className="text-sm text-muted-foreground">{result.timeline.phase}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Estimated Duration</h4>
              <p className="text-sm text-muted-foreground">{result.timeline.estimatedDuration}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Critical Path Items</h4>
              <ul className="space-y-1">
                {result.timeline.criticalPath.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalysisResults
