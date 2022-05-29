import fetchPost from './fetchPost';

export default async (
  url,
  {
    body = {},
    headers = { Accept: 'application/json', 'Content-Type': 'application/json' },
    method = 'POST'
  }
) => {
  const res = await fetchPost(url, { body });
  return await res.json();
};
