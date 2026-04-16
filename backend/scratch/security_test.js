async function testSecurity() {
  const baseUrl = 'http://localhost:5000/api';
  
  console.log('--- Testing Security Vulnerabilities ---');

  // 1. Try to register as Admin
  try {
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Hacker',
        email: `hacker${Date.now()}@example.com`,
        password: 'StrongPassword123!',
        role: 'Admin'
      })
    });
    const data = await regRes.json();
    if (regRes.status === 403) {
      console.log('PASS: Registering as Admin failed with 403 Forbidden');
    } else {
      console.log('FAIL: Registering as Admin status:', regRes.status, data);
    }
  } catch (err) {
    console.log('ERROR during register test:', err.message);
  }

  // 2. Try to hit make-me-admin
  try {
    const adminRes = await fetch(`${baseUrl}/admin/make-me-admin`, { method: 'POST' });
    if (adminRes.status === 404) {
      console.log('PASS: make-me-admin returned 404 Not Found');
    } else {
      console.log('FAIL: make-me-admin returned status:', adminRes.status);
    }
  } catch (err) {
    console.log('ERROR during make-me-admin test:', err.message);
  }

  // 3. Try to create notification as anonymous (should fail protect)
  try {
    const notifyRes = await fetch(`${baseUrl}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Hacked', message: 'System compromised' })
    });
    if (notifyRes.status === 401) {
      console.log('PASS: Notification creation failed with 401 Unauthorized (protected)');
    } else {
      console.log('FAIL: Notification creation status:', notifyRes.status);
    }
  } catch (err) {
    console.log('ERROR during notification test:', err.message);
  }

  console.log('--- Security Testing Done ---');
}

testSecurity();
