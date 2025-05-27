import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, TextField, Button } from '@mui/material';
import { message } from 'antd';
import axios from 'axios';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/');
        console.log(response.data);
        setTodos(response.data);
        message.success('Data fetched successfully');
        if (response.data.length === 0) {
          setError('No todos found');
        }
      } catch (error) {
        message.error('Failed to fetch data: ' + error.message);
        console.error('Error fetching data:', error);
        setError('Failed to fetch todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) {
      message.warning('Please fill in both fields');
      return;
    }
    setAddLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/', {
        title: formData.title,
        body: formData.body,
      });
      setTodos([response.data, ...todos]);
      message.success('Todo added successfully');
      setFormData({ title: '', body: '' }); // Reset form
    } catch (error) {
      message.error('Failed to add todo: ' + error.message);
      console.error('Error adding todo:', error);
    } finally {
      setAddLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: '#f5f5f5',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: '#f5f5f5',
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        p: 2,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Todo List
      </Typography>
      <Box sx={{ mb: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Add a new Todo
        </Typography>
        <form onSubmit={handleAddTodo} noValidate>
          <TextField
            name="title"
            label="Todo Title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="body"
            label="Todo Description"
            value={formData.body}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={addLoading}
            sx={{ mt: 2 }}
          >
            {addLoading ? <CircularProgress size={24} /> : 'Add Todo'}
          </Button>
        </form>
      </Box>

      {todos.length === 0 ? (
        <Typography>No todos available</Typography>
      ) : (
        todos.map((item) => (
          <Card
            key={item.id}
            sx={{
              mb: 2,
              p: 2,
              width: '100%',
              maxWidth: 600,
              bgcolor: '#fff',
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                {item.body}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}