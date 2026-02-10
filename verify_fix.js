const endpoints = [
  'http://localhost:8000/api/notices/board',
  'http://localhost:8000/api/notices/board/8',
  'http://localhost:8000/api/notices/board/8/comments',
  'http://localhost:8000/api/notices/gallery',
  'http://localhost:8000/api/notices/meal-plan',
];

async function check() {
  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(`URL: ${url} | Status: ${res.status} | Success: ${data.success}`);
      if (!data.success) {
        console.error('Response data:', JSON.stringify(data, null, 2));
      }
      if (url.includes('/comments') || (data.data && data.data.comments && data.data.comments.length > 0)) {
        const comments = data.data.comments || data.data; // Handle list or nested
        if (comments.length > 0) {
          console.log('Sample comment structure:', JSON.stringify(comments[0], null, 2));
          if (!comments[0].author && !comments[0].authorName) console.error('WARNING: Comment missing author info!');
        }
      }
    } catch (e) {
      console.error(`URL: ${url} | Error: ${e.message}`);
    }
  }
}
check();
