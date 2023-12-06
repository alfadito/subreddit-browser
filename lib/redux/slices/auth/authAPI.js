export function authenticate() {
  const token = `Basic ${btoa(
    `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
  )}`;

  return fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        'Authorization': token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials"
    });
}
