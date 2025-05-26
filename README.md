# Video Subtitle App

A React app for playing videos with SRT subtitles and an interactive transcript panel.

## Features

- Play local or remote videos with SRT subtitles
- Custom subtitle overlay with font size and toggle controls
- Interactive transcript: click a line to seek the video
- Keyboard shortcuts for subtitle and fullscreen controls
- Responsive layout

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
git clone https://github.com/your-username/video-subtitle-app.git
cd video-subtitle-app
npm install
```

### Running the App

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests

```sh
npm test
```

or for coverage:

```sh
npm run coverage
```

## Project Structure

```
src/
  adapters/         # Video asset adapters
  components/       # React components (VideoPlayer, Transcript, etc.)
  types/            # TypeScript types
  utils/            # Subtitle parsing utilities
  App.tsx           # Main app component
  index.tsx         # Entry point
public/
  ...               # Static assets
```

## Keyboard Shortcuts

- **S**: Toggle subtitles
- **F**: Toggle fullscreen
- **O/P**: Decrease/Increase subtitle font size

## Accessibility

- Transcript and video controls are keyboard accessible.
- Labels are properly associated with form controls.

## License

MIT

---