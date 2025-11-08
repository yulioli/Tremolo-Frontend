import { useState, useRef } from 'react'
import { FeedbackMarker, CategoryToggle } from '../types'

interface TranscriptProps {
  transcript: string
  markers: FeedbackMarker[]
  videoDuration: number
  toggles: CategoryToggle
  onWordClick: (time: number) => void
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'body-language':
      return 'bg-green-100 text-green-900 border-green-400'
    case 'vocal':
      return 'bg-blue-100 text-blue-900 border-blue-400'
    case 'speech':
      return 'bg-red-100 text-red-900 border-red-400'
    default:
      return 'bg-gray-200 text-gray-800'
  }
}

export default function Transcript({
  transcript,
  markers,
  videoDuration,
  toggles,
  onWordClick,
}: TranscriptProps) {
  const transcriptRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(16) // Default font size in pixels

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24)) // Max 24px
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12)) // Min 12px
  }

  const resetFontSize = () => {
    setFontSize(16) // Reset to default
  }

  // Estimate timestamp for a given character position in the transcript
  const estimateTimestamp = (charIndex: number): number => {
    if (markers.length === 0 || videoDuration === 0) {
      // If no markers, estimate uniformly based on transcript position
      return (charIndex / transcript.length) * videoDuration
    }

    // Sort markers by transcript position
    const sortedMarkers = [...markers].sort(
      (a, b) => a.transcriptStartIndex - b.transcriptStartIndex
    )

    // Find the markers before and after this position
    let beforeMarker = null
    let afterMarker = null

    for (let i = 0; i < sortedMarkers.length; i++) {
      if (sortedMarkers[i].transcriptStartIndex <= charIndex) {
        beforeMarker = sortedMarkers[i]
      } else {
        afterMarker = sortedMarkers[i]
        break
      }
    }

    // If before first marker, estimate based on position relative to first marker
    if (!beforeMarker && afterMarker) {
      const ratio = charIndex / afterMarker.transcriptStartIndex
      return ratio * afterMarker.timestamp
    }

    // If after last marker, estimate based on remaining duration
    if (beforeMarker && !afterMarker) {
      const remainingChars = transcript.length - beforeMarker.transcriptStartIndex
      const remainingTime = videoDuration - beforeMarker.timestamp
      const charsAfterMarker = charIndex - beforeMarker.transcriptStartIndex
      return beforeMarker.timestamp + (charsAfterMarker / remainingChars) * remainingTime
    }

    // Interpolate between two markers
    if (beforeMarker && afterMarker) {
      const charsBetween = afterMarker.transcriptStartIndex - beforeMarker.transcriptStartIndex
      const timeBetween = afterMarker.timestamp - beforeMarker.timestamp
      const charsFromBefore = charIndex - beforeMarker.transcriptStartIndex
      return beforeMarker.timestamp + (charsFromBefore / charsBetween) * timeBetween
    }

    // Fallback: uniform distribution
    return (charIndex / transcript.length) * videoDuration
  }

  // Find markers that should be highlighted
  const getHighlightedRanges = () => {
    const ranges: Array<{
      start: number
      end: number
      category: string
      timestamp: number
      feedback: string
    }> = []

    markers.forEach((marker) => {
      if (toggles[marker.category as keyof CategoryToggle]) {
        ranges.push({
          start: marker.transcriptStartIndex,
          end: marker.transcriptEndIndex,
          category: marker.category,
          timestamp: marker.timestamp,
          feedback: marker.feedback,
        })
      }
    })

    return ranges.sort((a, b) => a.start - b.start)
  }

  // Check if a character index is within any highlighted range
  const isInHighlightedRange = (
    charIndex: number,
    ranges: Array<{
      start: number
      end: number
      category: string
      timestamp: number
      feedback: string
    }>
  ): { inRange: boolean; category?: string; timestamp?: number; feedback?: string } => {
    for (const range of ranges) {
      if (charIndex >= range.start && charIndex < range.end) {
        return {
          inRange: true,
          category: range.category,
          timestamp: range.timestamp,
          feedback: range.feedback,
        }
      }
    }
    return { inRange: false }
  }

  const renderTranscript = () => {
    const highlightedRanges = getHighlightedRanges()
    
    // Split transcript into words while preserving spaces and punctuation
    const words: Array<{ text: string; startIndex: number; endIndex: number }> = []
    
    // Match words and whitespace/punctuation
    const wordRegex = /\S+|\s+/g
    let match
    
    while ((match = wordRegex.exec(transcript)) !== null) {
      words.push({
        text: match[0],
        startIndex: match.index!,
        endIndex: match.index! + match[0].length,
      })
    }

    return words.map((word, idx) => {
      const wordStartIndex = word.startIndex
      const wordEndIndex = word.endIndex
      const wordMiddleIndex = Math.floor((wordStartIndex + wordEndIndex) / 2)
      
      // Check if this word is highlighted
      const highlightInfo = isInHighlightedRange(wordMiddleIndex, highlightedRanges)
      const estimatedTimestamp = estimateTimestamp(wordMiddleIndex)
      
      // Use marker timestamp if in highlighted range, otherwise use estimated
      const timestamp = highlightInfo.inRange && highlightInfo.timestamp 
        ? highlightInfo.timestamp 
        : estimatedTimestamp

      if (highlightInfo.inRange) {
        const colorClass = getCategoryColor(highlightInfo.category!)
        return (
          <span
            key={`word-${idx}`}
            className={`${colorClass} border-b-2 border-opacity-60 cursor-pointer hover:opacity-90 transition-opacity px-1 rounded font-medium`}
            onClick={() => onWordClick(timestamp)}
            title={highlightInfo.feedback || `Jump to ${timestamp.toFixed(1)}s`}
          >
            {word.text}
          </span>
        )
      } else {
        return (
          <span
            key={`word-${idx}`}
            className="text-gray-800 cursor-pointer hover:bg-gray-100 hover:rounded px-1 transition-colors"
            onClick={() => onWordClick(timestamp)}
            title={`Jump to ${timestamp.toFixed(1)}s`}
          >
            {word.text}
          </span>
        )
      }
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
      {/* Header with Font Size Controls */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Transcript</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 mr-1">{fontSize}px</span>
          <button
            onClick={decreaseFontSize}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors"
            title="Decrease font size"
            aria-label="Decrease font size"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={resetFontSize}
            className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            title="Reset font size"
            aria-label="Reset font size"
          >
            Reset
          </button>
          <button
            onClick={increaseFontSize}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors"
            title="Increase font size"
            aria-label="Increase font size"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable Transcript Container */}
      <div
        ref={transcriptRef}
        className="overflow-y-auto overflow-x-hidden leading-relaxed pr-2 break-words"
        style={{ 
          fontSize: `${fontSize}px`,
          minHeight: '300px',
          maxHeight: '500px',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
      >
        {renderTranscript()}
      </div>
    </div>
  )
}

