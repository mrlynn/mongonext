import { Box, Card, CardContent, Typography } from '@mui/material';

export default function ProductDetail({ product }) {
  if (!product) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {product.name}
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Description
          </Typography>
          <Typography variant="body1">
            {product.description}
          </Typography>
        </Box>

        {/* Add more fields as needed */}
      </CardContent>
    </Card>
  );
} 