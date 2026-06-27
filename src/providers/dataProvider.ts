import { fetchUtils } from 'react-admin';
import type { DataProvider } from 'react-admin';
import qs from 'query-string';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = localStorage.getItem('admin_token');
  options.headers = new Headers(options.headers as HeadersInit);
  options.headers.set('Content-Type', 'application/json');
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

const buildQuery = (params: {
  pagination?: { page: number; perPage: number };
  sort?: { field: string; order: string };
  filter?: Record<string, unknown>;
}) => {
  const { pagination, sort, filter } = params;
  const query: Record<string, unknown> = {};
  if (pagination) {
    query.page = pagination.page;
    query.limit = pagination.perPage;
  }
  if (sort) {
    query.sortBy = sort.field;
    query.sortOrder = sort.order.toLowerCase();
  }
  if (filter) {
    if (filter.q) query.search = filter.q;
    if (filter.title) query.search = filter.title;
    if (filter.name) query.search = filter.name;
    if (filter.status) query.status = filter.status;
  }
  return query;
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const query = buildQuery(params);
    const queryString = qs.stringify(query);
    const url = `${API_URL}/api/${resource}${queryString ? `?${queryString}` : ''}`;
    const response = await httpClient(url);
    const data = response.json.data || response.json;
    const total =
      response.json.total ||
      response.json.pagination?.total ||
      (Array.isArray(data) ? data.length : 0);
    return {
      data: (Array.isArray(data) ? data : []) as any[],
      total,
    };
  },

  getOne: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const response = await httpClient(url);
    const data = response.json.data || response.json;
    return { data: data as any };
  },

  create: async (resource, params) => {
    const url = `${API_URL}/api/${resource}`;
    const response = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    const data = response.json.data || response.json;
    return { data: data as any };
  },

  update: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const response = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    const data = response.json.data || response.json;
    return { data: data as any };
  },

  delete: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    await httpClient(url, { method: 'DELETE' });
    return { data: { id: params.id } as any };
  },

  getMany: async (resource, params) => {
    const queryString = qs.stringify({ id: params.ids });
    const url = `${API_URL}/api/${resource}?${queryString}`;
    const response = await httpClient(url);
    const data = response.json.data || response.json;
    return {
      data: (Array.isArray(data) ? data : []) as any[],
    };
  },

  getManyReference: async (resource, params) => {
    const { target, id, pagination, sort } = params;
    const query: Record<string, unknown> = { [target]: id };
    if (pagination) {
      query.page = pagination.page;
      query.limit = pagination.perPage;
    }
    if (sort) {
      query.sortBy = sort.field;
      query.sortOrder = sort.order.toLowerCase();
    }
    const queryString = qs.stringify(query);
    const url = `${API_URL}/api/${resource}?${queryString}`;
    const response = await httpClient(url);
    const data = response.json.data || response.json;
    return {
      data: (Array.isArray(data) ? data : []) as any[],
      total: response.json.total || (Array.isArray(data) ? data.length : 0),
    };
  },

  updateMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        httpClient(`${API_URL}/api/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        })
      )
    );
    return { data: params.ids };
  },

  deleteMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        httpClient(`${API_URL}/api/${resource}/${id}`, { method: 'DELETE' })
      )
    );
    return { data: params.ids };
  },
};