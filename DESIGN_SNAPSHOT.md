# Tremolo Frontend - Design Snapshot

**Date**: Current State  
**Purpose**: Reference document for the current design implementation

## Current Design Overview

### Layout Structure
- **Home Page**: Centered upload area with drag-and-drop functionality
- **Analysis Page**: 2x2 grid layout:
  - Top Left: Video Player
  - Top Right: Transcript (scrollable)
  - Bottom Left: Analysis Dashboard
  - Bottom Right: Timeline

### Color Scheme
- **Body Language**: Green (`bg-green-200`, `text-green-800`, `border-green-300`)
- **Vocal**: Blue (`bg-blue-200`, `text-blue-800`, `border-blue-300`)
- **Speech**: Red (`bg-red-200`, `text-red-800`, `border-red-300`)
- **Background**: Light gray (`bg-gray-50`)
- **Cards**: White with shadow (`bg-white`, `shadow-lg`)

### Key Features
1. **Every word in transcript is clickable** - jumps to estimated timestamp
2. **Highlighted words** - color-coded based on feedback category
3. **Timeline markers** - clickable colored dots that jump to specific timestamps
4. **Toggle filters** - show/hide feedback categories (Body Language, Vocal, Speech)
5. **Video sync** - all interactions sync with video playback

### Component Details

#### Transcript Component
- Every word is individually clickable
- Words with feedback markers are highlighted with category colors
- Regular words have gray text with hover effect
- Tooltips show timestamps on hover
- Uses interpolation between markers for timestamp estimation

#### Video Player
- Standard HTML5 video with controls
- Supports play/pause/scrub
- Syncs with transcript and timeline clicks

#### Analysis Dashboard
- Overall score displayed prominently (large font)
- Sub-scores listed in order (highest to lowest)
- Toggle buttons with clear ON/OFF states
- Color-coded toggle buttons matching category colors

#### Timeline
- Horizontal bar with clickable markers
- Current time indicator (vertical line)
- Color-coded markers matching feedback categories
- Click anywhere on timeline to seek
- Legend showing color meanings

### Typography
- Headers: Bold, large (text-3xl, text-xl)
- Body: Standard system fonts
- Scores: Large, bold numbers

### Spacing
- Cards: `p-6` padding
- Grid gaps: `gap-6`
- Section margins: `mb-6`, `mb-4`

### Interactive States
- Hover effects on clickable elements
- Smooth transitions
- Clear visual feedback

## Technical Implementation

- React 18 + TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Component-based architecture
- Timestamp estimation algorithm using marker interpolation

