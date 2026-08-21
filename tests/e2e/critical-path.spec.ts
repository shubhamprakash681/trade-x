import { test, expect } from '@playwright/test';

test.describe('Critical User Path', () => {
  // Use the mocked API or rely on the real backend running
  // For this test, we assume the backend is running locally at :8080 
  // or we can just test the UI navigation and state if the backend is mocked.
  // We'll focus on the UI flow.

  test('user can login, navigate dashboard, and logout', async ({ page }) => {
    // 1. Go to login page
    await page.goto('/login');
    
    // Expect a title "to contain" a substring.
    await expect(page.locator('h3')).toContainText(/Sign in to TradeX/i);

    // 2. Fill in credentials (assuming a dev/test user exists)
    // Note: this test requires the backend to be running to actually log in
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'password123');
    
    // 3. Click login
    await page.click('button[type="submit"]');

    // 4. Wait for navigation to dashboard
    await page.waitForURL('/dashboard');
    await expect(page.locator('nav')).toBeVisible();

    // 5. Check if dashboard components are visible
    // For example, checking for Market Overview section
    await expect(page.locator('text=Market Overview')).toBeVisible();

    // 6. Navigate to Portfolio
    await page.click('text=Portfolio');
    await page.waitForURL('/dashboard/portfolio');
    await expect(page.locator('h1')).toContainText(/Your Portfolio/i);

    // 7. Logout
    await page.click('text=Logout');
    await page.waitForURL('/login');
  });
});
