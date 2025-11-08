import { AnalysisData } from './types'

// Mock data for testing when backend is not available
export const mockAnalysisData: AnalysisData = {
  overallScore: 8.5,
  bodyLanguageScore: 9.0,
  vocalScore: 8.0,
  speechScore: 8.5,
  transcript:
    "Hello everyone, thank you for being here today. I'm excited to present our new product. Um, it's a revolutionary solution that, uh, addresses a key problem in the market. So, let me start by explaining the problem we're solving. The current solutions are, um, inefficient and expensive. Our product, on the other hand, provides a cost-effective alternative that, uh, really makes a difference. " +
    "Now, I'd like to dive deeper into the technical aspects of our solution. The architecture we've built is, um, scalable and robust. It handles, uh, millions of requests per second without breaking a sweat. The key innovation here is our proprietary algorithm that, um, optimizes performance in real-time. This means that, uh, users experience minimal latency even during peak usage. " +
    "Let's talk about the user experience. We've spent countless hours, um, designing an interface that's intuitive and user-friendly. Our research shows that, uh, users can complete tasks 50% faster with our platform. The feedback we've received has been overwhelmingly positive, and, um, we're constantly iterating based on user suggestions. " +
    "Moving on to the business model, I want to address how we're planning to, uh, monetize this platform. We've developed a freemium model that, um, allows users to get started for free, with premium features available for power users. This approach has proven successful in similar markets, and, uh, we're confident it will work here as well. " +
    "Now, let's discuss the competitive landscape. There are several players in this space, but, um, none of them offer the comprehensive solution that we do. Our unique combination of features, uh, sets us apart from the competition. We're not just another product in the market; we're, um, redefining what's possible in this industry. " +
    "I'd like to share some early results from our beta testing phase. We've had over ten thousand users, uh, test our platform, and the feedback has been incredible. Users report that, um, our solution saves them an average of five hours per week. That's significant time savings that, uh, can be reinvested into more strategic work. " +
    "Looking ahead, we have an exciting roadmap planned. Over the next six months, we'll be, um, rolling out several major features that will further enhance the platform. These include advanced analytics, uh, integration capabilities with popular tools, and enhanced security features. We're committed to, um, continuous improvement and innovation. " +
    "In conclusion, I believe we have something truly special here. Our product addresses a real need in the market, uh, and we have the team and technology to execute on this vision. I'm excited about the future, and, um, I hope you are too. Thank you for your time, and I'm happy to answer any questions you might have.",
  markers: [
    {
      category: 'speech',
      timestamp: 12.5,
      feedback: "Filler word 'um' detected",
      transcriptStartIndex: 67,
      transcriptEndIndex: 69,
    },
    {
      category: 'speech',
      timestamp: 18.2,
      feedback: "Filler word 'uh' detected",
      transcriptStartIndex: 120,
      transcriptEndIndex: 122,
    },
    {
      category: 'vocal',
      timestamp: 25.8,
      feedback: 'Monotonous tone detected',
      transcriptStartIndex: 180,
      transcriptEndIndex: 200,
    },
    {
      category: 'body-language',
      timestamp: 30.5,
      feedback: 'Good eye contact maintained',
      transcriptStartIndex: 220,
      transcriptEndIndex: 240,
    },
    {
      category: 'speech',
      timestamp: 35.2,
      feedback: "Filler word 'um' detected",
      transcriptStartIndex: 280,
      transcriptEndIndex: 282,
    },
    {
      category: 'speech',
      timestamp: 42.1,
      feedback: "Filler word 'uh' detected",
      transcriptStartIndex: 320,
      transcriptEndIndex: 322,
    },
    {
      category: 'speech',
      timestamp: 48.5,
      feedback: "Filler word 'um' detected",
      transcriptStartIndex: 450,
      transcriptEndIndex: 452,
    },
    {
      category: 'vocal',
      timestamp: 55.2,
      feedback: 'Pace too fast detected',
      transcriptStartIndex: 580,
      transcriptEndIndex: 620,
    },
    {
      category: 'speech',
      timestamp: 62.8,
      feedback: "Filler word 'uh' detected",
      transcriptStartIndex: 720,
      transcriptEndIndex: 722,
    },
    {
      category: 'body-language',
      timestamp: 68.3,
      feedback: 'Good gesture usage',
      transcriptStartIndex: 850,
      transcriptEndIndex: 870,
    },
    {
      category: 'speech',
      timestamp: 75.1,
      feedback: "Filler word 'um' detected",
      transcriptStartIndex: 980,
      transcriptEndIndex: 982,
    },
    {
      category: 'speech',
      timestamp: 82.4,
      feedback: "Filler word 'uh' detected",
      transcriptStartIndex: 1120,
      transcriptEndIndex: 1122,
    },
  ],
}

