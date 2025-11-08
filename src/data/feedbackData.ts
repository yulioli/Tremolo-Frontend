// Mock feedback data keyed by timestamp in "M:SS" format
export const feedbackData: Record<string, {
  type: string
  issue: string
  suggestion: string
}> = {
  '0:12': {
    type: 'Speech',
    issue: 'Filler Word Detected',
    suggestion: 'You used the filler word "um". Try to replace these moments with a short, deliberate pause.',
  },
  '0:18': {
    type: 'Speech',
    issue: 'Filler Word Detected',
    suggestion: 'You used the filler word "uh". Consider taking a breath instead to maintain your flow.',
  },
  '0:25': {
    type: 'Body Language',
    issue: 'Closed-Off Posture',
    suggestion: 'Your hands are clasped, which can be seen as defensive. Try to keep your hands open and use natural gestures.',
  },
  '0:30': {
    type: 'Body Language',
    issue: 'Good Eye Contact Maintained',
    suggestion: 'Excellent eye contact! You maintained engagement with your audience throughout this segment.',
  },
  '0:35': {
    type: 'Speech',
    issue: 'Filler Word Detected',
    suggestion: 'Another "um" detected. Practice pausing instead of using filler words to sound more confident.',
  },
  '0:42': {
    type: 'Vocal/Body Mismatch',
    issue: 'High Vocal Energy, Low Body Language',
    suggestion: 'Your voice has great energy, but your body language is static. Try using a hand gesture to emphasize the point.',
  },
  '0:48': {
    type: 'Speech',
    issue: 'Filler Word Detected',
    suggestion: 'Filler word "um" detected. Consider using a transitional phrase like "Now, let\'s consider..." instead.',
  },
  '0:55': {
    type: 'Vocal',
    issue: 'Pace Too Fast Detected',
    suggestion: 'Your speaking pace increased significantly here. Slow down slightly to ensure your audience can follow along.',
  },
  '1:02': {
    type: 'Speech',
    issue: 'Filler Word Detected',
    suggestion: 'Another "uh" detected. Take a moment to collect your thoughts before continuing.',
  },
  '1:08': {
    type: 'Body Language',
    issue: 'Good Gesture Usage',
    suggestion: 'Great use of hand gestures! They helped emphasize your point and kept the audience engaged.',
  },
  '1:15': {
    type: 'Speech',
    issue: 'Filler Word Detected',
    suggestion: 'Filler word "um" detected. Practice replacing these with strategic pauses in your delivery.',
  },
  '1:22': {
    type: 'Speech',
    issue: 'Filler Word Detected',
    suggestion: 'Another "uh" detected. Consider using phrases like "Let me think about that" to buy time instead.',
  },
}

// Helper function to format seconds to "M:SS" format
export const formatTimeForFeedback = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

