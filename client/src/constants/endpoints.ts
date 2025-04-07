const BASE_API = '/api/v1';

export const endpoints = {
  blog: {
    create: `${BASE_API}/blog/newblog`,
    getAll: `${BASE_API}/blog/all`,
    getById: (id: string) => `${BASE_API}/blog/${id}`,
    update: (id: string) => `${BASE_API}/blog/update/${id}`,
    delete: (id: string) => `${BASE_API}/blog/delete/${id}`,
  },
  user: {
    login: `${BASE_API}/user/login`,
    register: `${BASE_API}/user/register`,
    profile: `${BASE_API}/user/profile`,
  },
};
