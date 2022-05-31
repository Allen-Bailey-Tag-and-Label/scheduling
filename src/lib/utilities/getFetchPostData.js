import fetchPost from './fetchPost';

export default async (
  url,
  {
    body = {},
    headers = { Accept: 'application/json', 'Content-Type': 'application/json' },
    method = 'POST'
  }
) => {
    const res = await fetchPost(url, { body, headers, method });
    const data = await res.json();
    if (!res.ok) throw data?.message;
    return data;
};
