import { DataProvider, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = localStorage.getItem('admin_token');

  options.headers = new Headers(options.headers);
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
    const queryString = stringify(query);
    const url = `${API_URL}/api/${resource}${queryString ? `?${queryString}` : ''}`;

    const response = await httpClient(url);

    const data = response.json.data || response.json;
    const total =
      response.json.total ||
      response.json.pagination?.total ||
      (Array.isArray(data) ? data.length : 0);

    return {
      data: (Array.isArray(data) ? data : []).map((item: { id: number }) => ({
        ...item,
        id: item.id,
      })),
      total,
    };
  },

  getOne: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const response = await httpClient(url);

    const data = response.json.data || response.json;

    return { data: { ...data, id: data.id } };
  },

  create: async (resource, params) => {
    const url = `${API_URL}/api/${resource}`;
    const response = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });

    const data = response.json.data || response.json;
    return { data: { ...data, id: data.id } };
  },

  update: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const response = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });

    const data = response.json.data || response.json;
    return { data: { ...data, id: data.id } };
  },

  delete: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    await httpClient(url, { method: 'DELETE' });
    return { data: { id: params.id } } as { data: { id: number } };
  },

  getMany: async (resource, params) => {
    const queryString = stringify({ id: params.ids });
    const url = `${API_URL}/api/${resource}?${queryString}`;
    const response = await httpClient(url);
    const data = response.json.data || response.json;
    return {
      data: (Array.isArray(data) ? data : []).map((item: { id: number }) => ({
        ...item,
        id: item.id,
      })),
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

    const queryString = stringify(query);
    const url = `${API_URL}/api/${resource}?${queryString}`;
    const response = await httpClient(url);
    const data = response.json.data || response.json;

    return {
      data: (Array.isArray(data) ? data : []).map((item: { id: number }) => ({
        ...item,
        id: item.id,
      })),
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