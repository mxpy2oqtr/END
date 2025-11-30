// Cliente API para conectar el frontend con el backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper para hacer requests
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('accessToken');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth
export const auth = {
  async login(email, password) {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  },

  async register(email, password, full_name) {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name }),
    });
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  },

  async refresh() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');
    
    const data = await request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  },

  async me() {
    return request('/users/me');
  },

  async updateMe(data) {
    return request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};

// Entities - Activities
export const activities = {
  async list(sort = '-date', limit = 50) {
    return request(`/activities?sort=${sort}&limit=${limit}`);
  },

  async filter(filters) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object' && value.$gte) {
          params.append('start_date', value.$gte);
          params.append('end_date', value.$lte || new Date().toISOString().split('T')[0]);
        } else {
          params.append(key, value);
        }
      }
    });
    const response = await request(`/activities?${params.toString()}`);
    return response.data || response;
  },

  async get(id) {
    return request(`/activities/${id}`);
  },

  async create(data) {
    return request('/activities', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id, data) {
    return request(`/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id) {
    return request(`/activities/${id}`, {
      method: 'DELETE',
    });
  },
};

// Entities - HealthMetric
export const healthMetrics = {
  async filter(filters) {
    const params = new URLSearchParams();
    if (filters.date) {
      if (typeof filters.date === 'object' && filters.date.$gte) {
        params.append('start_date', filters.date.$gte);
        params.append('end_date', filters.date.$lte || new Date().toISOString().split('T')[0]);
      } else {
        params.append('date', filters.date);
      }
    }
    if (filters.week) params.append('week', 'true');
    
    const response = await request(`/metrics?${params.toString()}`);
    return Array.isArray(response) ? response : [response];
  },

  async create(data) {
    return request('/metrics', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id, data) {
    return request(`/metrics/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Entities - Meals
export const meals = {
  async filter(filters) {
    const params = new URLSearchParams();
    if (filters.date) params.append('date', filters.date);
    if (filters.start_date) params.append('start_date', filters.start_date);
    if (filters.end_date) params.append('end_date', filters.end_date);
    
    return request(`/meals?${params.toString()}`);
  },

  async list(sort = '-date', limit = 50) {
    return request(`/meals?sort=${sort}&limit=${limit}`);
  },

  async create(data) {
    return request('/meals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id, data) {
    return request(`/meals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id) {
    return request(`/meals/${id}`, {
      method: 'DELETE',
    });
  },
};

// Entities - Goals
export const goals = {
  async filter(filters) {
    const params = new URLSearchParams();
    if (filters.is_active !== undefined) params.append('is_active', filters.is_active);
    
    return request(`/goals?${params.toString()}`);
  },

  async list(sort = '-created_date') {
    return request(`/goals?sort=${sort}`);
  },

  async create(data) {
    return request('/goals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id, data) {
    return request(`/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id) {
    return request(`/goals/${id}`, {
      method: 'DELETE',
    });
  },

  async toggle(id) {
    return request(`/goals/${id}/toggle`, {
      method: 'PATCH',
    });
  },
};

// Conversations
export const conversations = {
  async list(filters = {}) {
    const params = new URLSearchParams();
    if (filters.agent_name) params.append('agent_name', filters.agent_name);
    
    return request(`/conversations?${params.toString()}`);
  },

  async get(id) {
    return request(`/conversations/${id}`);
  },

  async create(data) {
    return request('/conversations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async addMessage(id, message) {
    return request(`/conversations/${id}/messages`, {
      method: 'POST',
      body: JSON.stringify(message),
    });
  },

  async delete(id) {
    return request(`/conversations/${id}`, {
      method: 'DELETE',
    });
  },
};

// Stats
export const stats = {
  async daily(date) {
    const params = date ? `?date=${date}` : '';
    return request(`/stats/daily${params}`);
  },

  async weekly() {
    return request('/stats/weekly');
  },
};

// Compatibilidad con base44 (para migración gradual)
export const base44 = {
  auth,
  entities: {
    Activity: activities,
    HealthMetric: healthMetrics,
    Meal: meals,
    Goal: goals,
  },
  agents: {
    listConversations: (filters) => conversations.list(filters),
    getConversation: (id) => conversations.get(id),
    createConversation: (data) => conversations.create(data),
    addMessage: (conversation, message) => {
      const id = typeof conversation === 'string' ? conversation : conversation.id;
      return conversations.addMessage(id, message);
    },
    subscribeToConversation: () => {
      // Mock para compatibilidad - en producción usarías WebSockets
      return () => {};
    },
  },
};

export default { auth, activities, healthMetrics, meals, goals, conversations, stats, base44 };

