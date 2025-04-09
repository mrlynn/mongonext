// Theme configurations for MongoNext
export const themes = {
  mongodb: {
    name: 'MongoDB',
    palette: {
      primary: {
        main: '#00684A',
        light: '#13AA52',
        dark: '#004D40',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#001E2B',
        light: '#023430',
        dark: '#001E2B',
        contrastText: '#FFFFFF'
      },
      background: {
        gradient: 'linear-gradient(120deg, #00684A 0%, #13AA52 100%)',
      }
    },
    typography: {
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700
      }
    },
    content: {
      hero: {
        title: 'Build MongoDB-powered apps with Next.js in minutes',
        subtitle: 'A production-ready starter template combining the power of Next.js, MongoDB, and Material UI'
      },
      features: [
        {
          title: 'Modern Stack',
          description: 'Built with Next.js App Router, MongoDB, and Material UI for a modern development experience.'
        },
        {
          title: 'Performance First',
          description: 'Optimized for speed and developer experience with fast refresh and efficient data handling.'
        },
        {
          title: 'Authentication Ready',
          description: 'Pre-configured auth system with NextAuth.js, supporting various providers and strategies.'
        }
      ]
    }
  },
  ocean: {
    name: 'Ocean',
    palette: {
      primary: {
        main: '#1976D2',
        light: '#42A5F5',
        dark: '#1565C0',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#0D47A1',
        light: '#1976D2',
        dark: '#0D47A1',
        contrastText: '#FFFFFF'
      },
      background: {
        gradient: 'linear-gradient(45deg, #1565C0 30%, #42A5F5 90%)',
      }
    },
    typography: {
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700
      }
    },
    content: {
      hero: {
        title: 'Launch Your Next.js Project Today',
        subtitle: 'A modern web development stack for building scalable applications'
      },
      features: [
        {
          title: 'Cloud Ready',
          description: 'Deploy to any cloud platform with built-in optimization and scaling capabilities.'
        },
        {
          title: 'Developer Experience',
          description: 'Hot reloading, TypeScript support, and comprehensive documentation.'
        },
        {
          title: 'Enterprise Grade',
          description: 'Production-ready features including monitoring, logging, and security.'
        }
      ]
    }
  },
  forest: {
    name: 'Forest',
    palette: {
      primary: {
        main: '#2E7D32',
        light: '#4CAF50',
        dark: '#1B5E20',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#1B5E20',
        light: '#2E7D32',
        dark: '#1B5E20',
        contrastText: '#FFFFFF'
      },
      background: {
        gradient: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
      }
    },
    typography: {
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700
      }
    },
    content: {
      hero: {
        title: 'Sustainable Web Development',
        subtitle: 'Build eco-friendly applications with optimized performance and minimal resource usage'
      },
      features: [
        {
          title: 'Resource Efficient',
          description: 'Optimized bundle sizes and efficient data handling for minimal environmental impact.'
        },
        {
          title: 'Smart Caching',
          description: 'Intelligent caching strategies to reduce server load and improve response times.'
        },
        {
          title: 'Green Hosting Ready',
          description: 'Compatible with green hosting providers and energy-efficient infrastructure.'
        }
      ]
    }
  },
  sunset: {
    name: 'Sunset',
    palette: {
      primary: {
        main: '#FF6B6B',
        light: '#FF8E8E',
        dark: '#FF4949',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#4A4A4A',
        light: '#6B6B6B',
        dark: '#2D2D2D',
        contrastText: '#FFFFFF'
      },
      background: {
        gradient: 'linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)',
      }
    },
    typography: {
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700
      }
    },
    content: {
      hero: {
        title: 'Create Beautiful Web Experiences',
        subtitle: 'Design-focused development stack for creating stunning web applications'
      },
      features: [
        {
          title: 'Beautiful UI',
          description: 'Pre-built beautiful components and layouts for rapid development.'
        },
        {
          title: 'Responsive Design',
          description: 'Mobile-first approach ensuring great experience across all devices.'
        },
        {
          title: 'Animation Ready',
          description: 'Built-in animation components and transitions for engaging interfaces.'
        }
      ]
    }
  }
}; 