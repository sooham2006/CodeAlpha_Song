# 🎵 Harmony - Modern Music Player

A beautiful, modern music player built with React, TypeScript, and Tailwind CSS, featuring the Jamendo API for streaming high-quality music.

![Harmony Music Player](https://images.pexels.com/photos/1540403/pexels-photo-1540403.jpeg?auto=compress&cs=tinysrgb&w=1200)

## ✨ Features

### 🎨 Modern Design
- **Glass Morphism UI** - Translucent cards with backdrop blur effects
- **Gradient Accents** - Beautiful purple-to-pink gradients throughout
- **Floating Animations** - Subtle particle effects and smooth transitions
- **Responsive Layout** - Optimized for all screen sizes

### 🎵 Music Features
- **High-Quality Streaming** - Powered by Jamendo API
- **Smart Search** - Find your favorite tracks instantly
- **Queue Management** - Add, remove, and reorder tracks
- **Playback Controls** - Play, pause, skip, shuffle, and repeat
- **Volume Control** - Smooth volume slider with mute functionality
- **Progress Bar** - Interactive seeking with visual feedback

### 🚀 Advanced Functionality
- **Auto-play** - Seamless track transitions
- **Shuffle Mode** - Randomized playback
- **Repeat Modes** - None, one track, or all tracks
- **Loading States** - Beautiful animations during data fetching
- **Error Handling** - Graceful fallbacks for missing content

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: Jamendo Music API
- **Deployment**: Netlify

## 🚀 Live Demo

**🌐 [View Live Demo](https://your-app-url.netlify.app)**

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd harmony-music-player
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Usage

### Basic Playback
1. **Browse Popular Tracks** - The app loads popular tracks automatically
2. **Search Music** - Use the search bar to find specific songs or artists
3. **Play Controls** - Click play/pause, skip tracks, or adjust volume
4. **Queue Management** - Add tracks to queue or remove them

### Advanced Features
- **Shuffle**: Click the shuffle button to randomize playback order
- **Repeat**: Cycle through repeat modes (none → one → all)
- **Seek**: Click anywhere on the progress bar to jump to that position
- **Volume**: Use the volume slider or mute button for audio control

## 🎨 Design Philosophy

Harmony combines modern web design principles with classic music player aesthetics:

- **Minimalist Interface** - Clean, uncluttered design focusing on the music
- **Premium Feel** - High-quality shadows, gradients, and animations
- **Intuitive Controls** - Familiar music player interactions
- **Visual Hierarchy** - Clear information architecture and typography
- **Responsive Design** - Seamless experience across all devices

## 🔧 Configuration

### Jamendo API
The app uses the Jamendo API with the following configuration:
- **Client ID**: `b0ac0b46`
- **Base URL**: `https://api.jamendo.com/v3.0`
- **Audio Format**: MP3 (128kbps)

### Customization
You can customize the app by modifying:
- **Colors**: Update the Tailwind config for different color schemes
- **Animations**: Adjust CSS animations in `src/index.css`
- **API Settings**: Modify `src/services/jamendoApi.ts` for different endpoints

## 📱 Screenshots

### Main Interface
- Modern glass morphism design
- Elegant track information display
- Intuitive playback controls

### Search & Discovery
- Real-time search functionality
- Beautiful loading states
- Comprehensive track information

### Queue Management
- Visual queue with album artwork
- Drag-and-drop reordering (coming soon)
- Easy track removal

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Jamendo** - For providing the music API
- **Lucide** - For the beautiful icons
- **Tailwind CSS** - For the utility-first CSS framework
- **Pexels** - For the placeholder images

## 🔮 Future Enhancements

- [ ] User authentication and playlists
- [ ] Lyrics integration
- [ ] Social sharing features
- [ ] Offline playback support
- [ ] Equalizer controls
- [ ] Dark/light theme toggle
- [ ] Mobile app version

---

**Built with ❤️ by [Your Name]**

*Enjoy your music with Harmony!* 🎵#
