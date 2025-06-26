# VidVault 🎥

VidVault is a modern video sharing platform built with Next.js 14, featuring a sleek dark mode interface and seamless video management capabilities.

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🎥 Video upload and streaming
- 🌓 Dark/Light mode support
- 🔐 Secure authentication with NextAuth.js
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🗑️ Video management (upload, delete)
- 🖼️ ImageKit integration for video storage
- 🚀 Fast and optimized video delivery
- 📝 Form validation and error handling
- 🔔 Toast notifications for user feedback

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- ImageKit account for video storage

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vid-vault.git
cd vid-vault
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
# MongoDB
MONGODB_URI=your_mongodb_uri

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
vid-vault/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   └── ...               # Other app routes
├── lib/                   # Utility functions
├── models/                # MongoDB models
└── public/               # Static assets
```

## 🔑 Key Components

- **Authentication**: Secure user authentication using NextAuth.js
- **Video Upload**: Drag-and-drop video upload with progress indication
- **Video Management**: Easy video deletion with ownership verification
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Dark Mode**: System-aware dark mode with manual toggle
- **Toast Notifications**: User-friendly status updates

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [ImageKit](https://imagekit.io/) - Video storage and delivery
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js |
| `NEXTAUTH_URL` | Base URL for NextAuth.js |
| `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ImageKit Documentation](https://docs.imagekit.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 📧 Contact

Anmol Agarwal - agarwalanmol231@gmail.com

Project Link: [https://github.com/Anmoolll/vid-vault](https://github.com/Anmoolll/vid-vault)
