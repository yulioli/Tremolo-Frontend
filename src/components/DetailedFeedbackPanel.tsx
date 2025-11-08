interface FeedbackDetail {
  type: string
  issue: string
  suggestion: string
}

interface DetailedFeedbackPanelProps {
  selectedTimestamp: number | null
  feedbackData: Record<string, FeedbackDetail>
  formatTime: (seconds: number) => string
}

export default function DetailedFeedbackPanel({
  selectedTimestamp,
  feedbackData,
  formatTime,
}: DetailedFeedbackPanelProps) {
  const getFeedbackForTimestamp = (timestamp: number | null): FeedbackDetail | null => {
    if (timestamp === null) return null
    
    // Format timestamp as "M:SS" to match feedbackData keys
    const timeKey = formatTime(timestamp)
    
    // Try exact match first
    if (feedbackData[timeKey]) {
      return feedbackData[timeKey]
    }
    
    // If no exact match, find the closest feedback entry
    // Convert timestamp to seconds for comparison
    const timestampSeconds = timestamp
    let closestKey: string | null = null
    let minDiff = Infinity
    
    for (const key of Object.keys(feedbackData)) {
      // Parse "M:SS" format to seconds
      const [mins, secs] = key.split(':').map(Number)
      const keySeconds = mins * 60 + secs
      const diff = Math.abs(timestampSeconds - keySeconds)
      
      // Find feedback within 5 seconds
      if (diff < minDiff && diff <= 5) {
        minDiff = diff
        closestKey = key
      }
    }
    
    return closestKey ? feedbackData[closestKey] : null
  }

  const feedback = getFeedbackForTimestamp(selectedTimestamp)

  const getCategoryColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'speech':
        return 'bg-red-50 border-red-200 text-red-900'
      case 'body language':
        return 'bg-green-50 border-green-200 text-green-900'
      case 'vocal':
      case 'vocal/body mismatch':
        return 'bg-blue-50 border-blue-200 text-blue-900'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Feedback Details</h2>
      
      {selectedTimestamp === null || !feedback ? (
        <div className="text-gray-500 text-sm">
          Click a marker on the timeline or transcript to see details.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            Showing feedback for {formatTime(selectedTimestamp)}
          </div>
          
          <div className={`border-l-4 rounded p-4 ${getCategoryColor(feedback.type)}`}>
            <div className="mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide opacity-75">
                {feedback.type}
              </span>
            </div>
            
            <div className="mb-3">
              <h3 className="font-semibold text-base mb-1">Issue</h3>
              <p className="text-sm">{feedback.issue}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-base mb-1">Suggestion</h3>
              <p className="text-sm">{feedback.suggestion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

