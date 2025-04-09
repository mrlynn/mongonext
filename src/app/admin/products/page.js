'use client';

/**
 * @file Products page
 * @module app/admin/products/page
 */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Breadcrumbs,
  Link as MuiLink,
  Alert,
  CircularProgress,
  Paper,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductList from '@/components/admin/products/ProductList';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });
      
      if (search) {
        queryParams.append('search', search);
      }
      
      const response = await fetch(`/api/products?${queryParams.toString()}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch products');
      }
      
      setProducts(result.data);
      setPagination(result.pagination);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setPagination({ ...pagination, page: 1 });
  };

  const handleCreate = () => {
    router.push('/admin/products/create');
  };

  if (loading && products.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <MuiLink 
            component={Link} 
            href="/admin"
            underline="hover"
            color="inherit"
          >
            Dashboard
          </MuiLink>
          <Typography color="text.primary">
            Products
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Products
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleCreate}
          >
            Create Product
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          < ProductList 
            products={products}
            pagination={pagination}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
            loading={loading}
          />
        </Paper>
      </Box>
    </Container>
  );
} 