# Deployment Guide

This guide covers deploying the MongoNext template to various hosting platforms.

## Prerequisites

- Node.js 18.0 or higher
- MongoDB instance (Atlas or self-hosted)
- Environment variables configured
- Domain name (optional)

## Environment Setup

1. **Production Environment Variables**
   ```bash
   # .env.production
   MONGODB_URI=mongodb+srv://...
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=your-secret
   ```

2. **Build Configuration**
   ```javascript
   // next.config.mjs
   const nextConfig = {
     output: 'standalone',
     images: {
       domains: ['your-domain.com'],
     },
   };
   ```

## Deployment Options

### 1. Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Environment Variables**
   - Set in Vercel dashboard
   - Or use CLI:
   ```bash
   vercel env add MONGODB_URI
   ```

### 2. Docker Deployment

1. **Build Image**
   ```bash
   docker build -t mongonext .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 \
     -e MONGODB_URI=your-uri \
     -e NEXTAUTH_URL=your-url \
     mongonext
   ```

### 3. Traditional Server

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm run start
   ```

## MongoDB Setup

1. **Atlas Setup**
   - Create cluster
   - Configure network access
   - Create database user
   - Get connection string

2. **Local MongoDB**
   - Install MongoDB
   - Configure authentication
   - Set up replication (optional)

## SSL/TLS Configuration

1. **Vercel**
   - Automatic SSL with custom domain
   - Configure in Vercel dashboard

2. **Custom Server**
   - Install Certbot
   - Configure Nginx/Apache
   - Set up auto-renewal

## Performance Optimization

1. **Caching**
   ```javascript
   // next.config.mjs
   const nextConfig = {
     headers: async () => [
       {
         source: '/api/:path*',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=3600',
           },
         ],
       },
     ],
   };
   ```

2. **Image Optimization**
   - Use Next.js Image component
   - Configure CDN
   - Set up image domains

## Monitoring

1. **Error Tracking**
   - Set up Sentry or similar
   - Configure error boundaries
   - Monitor API errors

2. **Performance Monitoring**
   - Use Vercel Analytics
   - Set up MongoDB monitoring
   - Configure logging

## Backup Strategy

1. **Database Backups**
   - Configure MongoDB Atlas backups
   - Set up automated backups
   - Test restore procedures

2. **Application Backups**
   - Version control
   - Environment backups
   - Configuration backups

## Security Checklist

- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Set up rate limiting
- [ ] Enable authentication
- [ ] Configure CSP headers
- [ ] Set up WAF
- [ ] Enable MongoDB authentication
- [ ] Configure backup strategy

## Troubleshooting

Common deployment issues:

1. **Build Failures**
   - Check Node.js version
   - Verify dependencies
   - Check environment variables

2. **Database Connection**
   - Verify connection string
   - Check network access
   - Test authentication

3. **Performance Issues**
   - Enable caching
   - Optimize images
   - Check database indexes

## Related Documentation

- [Architecture Overview](../architecture/overview.md)
- [API Documentation](../api/overview.md)
- [Development Workflows](../development/workflows.md) 