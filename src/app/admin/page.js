// src/app/admin/page.js
'use client';

import React from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Sample data for charts
const participationData = [
  { name: 'Jan', participants: 65 },
  { name: 'Feb', participants: 90 },
  { name: 'Mar', participants: 78 },
  { name: 'Apr', participants: 110 },
  { name: 'May', participants: 98 },
  { name: 'Jun', participants: 120 },
  { name: 'Jul', participants: 140 },
  { name: 'Aug', participants: 160 },
  { name: 'Sep', participants: 190 },
  { name: 'Oct', participants: 210 },
  { name: 'Nov', participants: 230 },
  { name: 'Dec', participants: 250 },
];

const teamSizeData = [
  { name: '1-2', value: 25 },
  { name: '3-4', value: 45 },
  { name: '5-6', value: 20 },
  { name: '7+', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const categoryData = [
  { name: 'Web', value: 35 },
  { name: 'Mobile', value: 25 },
  { name: 'AI', value: 20 },
  { name: 'IoT', value: 15 },
  { name: 'Other', value: 5 },
];

const recentUsersData = [
  { name: 'Alex Johnson', role: 'Participant', date: 'Oct 15, 2025' },
  { name: 'Sarah Miller', role: 'Organizer', date: 'Oct 14, 2025' },
  { name: 'James Wilson', role: 'Participant', date: 'Oct 14, 2025' },
  { name: 'Emma Davis', role: 'Mentor', date: 'Oct 13, 2025' },
];

const upcomingEventsData = [
  { name: 'Annual Hackathon 2025', date: 'Nov 10-12, 2025', participants: 120 },
  { name: 'AI Innovation Challenge', date: 'Nov 20-22, 2025', participants: 85 },
  { name: 'Web Dev Showdown', date: 'Dec 5-7, 2025', participants: 75 },
];

export default function AdminDashboard() {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to the MongoNext admin dashboard. Here's an overview of your platform.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<EventIcon />}>
          Create New Event
        </Button>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Events
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography component="p" variant="h4" sx={{ mr: 1 }}>
                12
              </Typography>
              <Chip 
                icon={<TrendingUpIcon fontSize="small" />} 
                label="+25%" 
                size="small" 
                color="success" 
                sx={{ height: 24 }}
              />
            </Box>
            <Typography variant="body2" sx={{ flex: 1, color: 'text.secondary', mt: 1 }}>
              Active hackathons
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GroupsIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Teams
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography component="p" variant="h4" sx={{ mr: 1 }}>
                48
              </Typography>
              <Chip 
                icon={<TrendingUpIcon fontSize="small" />} 
                label="+12%" 
                size="small" 
                color="success" 
                sx={{ height: 24 }}
              />
            </Box>
            <Typography variant="body2" sx={{ flex: 1, color: 'text.secondary', mt: 1 }}>
              Registered teams
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PeopleIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Users
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography component="p" variant="h4" sx={{ mr: 1 }}>
                247
              </Typography>
              <Chip 
                icon={<TrendingUpIcon fontSize="small" />} 
                label="+18%" 
                size="small" 
                color="success" 
                sx={{ height: 24 }}
              />
            </Box>
            <Typography variant="body2" sx={{ flex: 1, color: 'text.secondary', mt: 1 }}>
              Active participants
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SettingsIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Completion
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography component="p" variant="h4" sx={{ mr: 1 }}>
                86%
              </Typography>
              <Chip 
                icon={<TrendingDownIcon fontSize="small" />} 
                label="-2%" 
                size="small" 
                color="error" 
                sx={{ height: 24 }}
              />
            </Box>
            <Typography variant="body2" sx={{ flex: 1, color: 'text.secondary', mt: 1 }}>
              Project submission rate
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3, borderRadius: 2 }}>
            <CardHeader 
              title="Participant Growth" 
              subheader="Monthly participant registrations" 
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={participationData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="participants" 
                    stroke="#00684A" 
                    fill="#00684A" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardHeader 
                  title="Team Size Distribution" 
                  subheader="Members per team" 
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={teamSizeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {teamSizeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardHeader 
                  title="Project Categories" 
                  subheader="Projects by technology" 
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                      data={categoryData}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#13AA52" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3, borderRadius: 2 }}>
            <CardHeader 
              title="Recent Users" 
              subheader="Newly registered users" 
              action={
                <Button size="small">View All</Button>
              }
            />
            <List>
              {recentUsersData.map((user, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {user.role}
                          </Typography>
                          {` — ${user.date}`}
                        </>
                      }
                    />
                  </ListItem>
                  {index < recentUsersData.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Card>
          
          <Card sx={{ borderRadius: 2 }}>
            <CardHeader 
              title="Upcoming Events" 
              subheader="Next 30 days" 
              action={
                <Button size="small">View Calendar</Button>
              }
            />
            <List>
              {upcomingEventsData.map((event, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <CalendarMonthIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={event.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {event.date}
                          </Typography>
                          {` — ${event.participants} participants`}
                        </>
                      }
                    />
                  </ListItem>
                  {index < upcomingEventsData.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}