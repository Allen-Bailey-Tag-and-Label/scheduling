export default async (
  url,
  {
    body = {},
    headers = { Accept: 'application/json', 'Content-Type': 'application/json' },
    method = 'POST'
  }
) => {
  return await fetch(url, {
    body: JSON.stringify(body),
    headers,
    method
  });
};
