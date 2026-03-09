# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to **security@digitalaksumite.com**. All security vulnerabilities will be promptly addressed.

Please do not open public issues for security bugs.

---

## Security Measures

### Input Validation

- All user inputs are validated using Zod schemas
- HTML sanitization with DOMPurify for all text inputs
- URL sanitization to prevent `javascript:` and `data:` schemes
- Rate limiting on API endpoints

### XSS Prevention

- Content Security Policy headers configured
- DOMPurify for all user-generated content
- No inline scripts in production
- Frame options set to DENY

### CSRF Protection

- SameSite cookies configured
- Origin validation on API requests

### Data Protection

- API tokens stored in environment variables only
- No sensitive data in client-side code
- HTTPS-only configuration in production

### Headers

```
Content-Security-Policy
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy
```

---

## Best Practices

1. **Never commit `.env.local`** - It contains sensitive data
2. **Use strong passwords** - For all CMS admin accounts
3. **Keep dependencies updated** - Run `npm audit` regularly
4. **Enable 2FA** - On all accounts (Vercel, Strapi, GitHub)
5. **Review code** - Before merging any PRs

---

## Dependency Security

Run security audit:

```bash
npm audit
npm audit fix
```

---

## Contact

For security concerns: **security@digitalaksumite.com**
