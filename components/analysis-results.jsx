import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, BarChart3 } from "lucide-react"

const AnalysisResults = ({ result }) => {
  return (
    <div className="space-y-6">
      {/* P-Values Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Statistical Analysis Results
          </CardTitle>
          <CardDescription>P-values for all analyzed endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.pValues.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.endpoint}</h4>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-mono font-bold">
                    p = {item.pValue.toFixed(3)}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.significant ? (
                      <>
                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                          Significant
                        </Badge>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </>
                    ) : (
                      <>
                        <Badge variant="secondary">
                          Not Significant
                        </Badge>
                        <XCircle className="h-4 w-4 text-gray-400" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> P-values less than 0.05 are considered statistically significant at the 95% confidence level.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalysisResults
