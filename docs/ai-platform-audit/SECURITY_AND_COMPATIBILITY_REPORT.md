# Security and compatibility report

See SECURITY_RISK_REPORT.md and REA_CAPABILITY_REPORT.md for concrete findings. TECH360 and ALO use MySQL in their checked-in Prisma schemas, MarketingOS uses SQLite; schema names alone do not justify sharing a database. TECH360 requires Node >=22 <23, ALO Node 22.x, MarketingOS >=22.23.2 <23, REA snapshot >=22.23.4 within Node 22; sandbox is 22.22.3. Resolve version needs in separate services or approved development environments, not via unreviewed production upgrade.

All integrations need authorization, least-privilege credentials, data minimization, audit, rate limits and provider-specific verification. AGPL, no-licence and source-available labels need legal review; GitHub SPDX fields do not replace licence text. Costs and current live provider configuration are unknown. No project was installed or tested as a result of this audit.
