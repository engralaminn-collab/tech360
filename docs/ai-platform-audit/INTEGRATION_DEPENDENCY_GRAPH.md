# Integration dependency graph

```text
Production identity / backup / authorization
    -> disposable DB & security baseline
    -> existing inquiry -> client -> SOW -> approval -> invoice/payment
    -> preview -> delivery -> acceptance workflow tests
    -> CRM/communication connector permissions + webhook verification
    -> bounded job queue / audit / isolation -> REA fixture pilot
    -> model adapters / local inference + agent tool allowlists
    -> marketing and media provider permissions + human publishing review
    -> specialist and research tools
```

REA is optional and not a CI or approval dependency. MarketingOS and ALO are distinct data owners; no dependency implies cross-tenant sharing. Each connector needs revoke/disable, monitoring and rollback prior to staging.
