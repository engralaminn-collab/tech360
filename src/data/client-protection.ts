import type { LegalDoc } from "./site";

/**
 * Client protection policy updates.
 * These are public-facing policy drafts for owner/legal review before publication.
 * The standard commercial model is: free discovery + HTML preview, then full
 * agreed payment after written preview approval, followed by delivery/handover.
 */
export const CLIENT_PROTECTION_OVERRIDES: Record<string, LegalDoc> = {
  refund: {
    slug: "refund",
    title: "Refund & Cancellation Policy",
    summary: "Clear cancellation rules, refund calculations, remedy rights, evidence, and refund processing timelines.",
    updated: "November 2026",
    sections: [
      { heading: "1. Scope and order of precedence", body: [
        "This policy applies to new TECH360 LLC software, website, CRM, eCommerce, automation, and related development engagements accepted on or after its effective date. The signed Final Scope of Work (SOW) may set project-specific terms, but any departure from this policy must be clearly stated and accepted by both parties in writing before payment.",
        "Nothing in this policy removes a right or remedy that cannot lawfully be excluded under applicable law. Where mandatory law gives the client a greater protection, that law prevails."
      ]},
      { heading: "2. Before preview approval and before payment", body: [
        "Enquiry, initial discovery, preparation of the written SOW, and the agreed HTML preview are provided without an advance payment. The client may stop before approving the preview and before making payment without a development cancellation fee.",
        "TECH360 will not commit the client to a paid third-party purchase, non-cancellable licence, hosting order, or other external expense unless that expense and its amount have first been disclosed and approved by the client in writing."
      ]},
      { heading: "3. After preview approval and payment", body: [
        "Under the standard model, the client pays 100% of the agreed project fee only after approving the SOW and HTML preview in writing. Production development begins after the payment is verified. The payment is not described as an advance collected before the client sees the preview; it is the agreed project fee paid at the approved preview gate.",
        "A different written milestone schedule may be used only where it is expressly shown in the SOW, states each amount and trigger, and is separately accepted by both parties before the first payment. No percentage schedule is implied or silently substituted."
      ]},
      { heading: "4. Cancellation by the client after payment", body: [
        "If the client cancels after verified payment but before any billable project work has started, TECH360 will refund 100% of the amount received, less only third-party charges that were specifically disclosed, approved in writing before commitment, actually incurred, and not recoverable.",
        "If billable work has started, the refund is calculated as: total cleared payments received, minus the agreed value of work completed up to the effective cancellation date, minus approved and evidenced non-recoverable third-party costs. The client receives the remaining positive balance. Work value must be tied to the SOW deliverables, approved milestones, or documented rates stated in the SOW. TECH360 will provide an itemised calculation and supporting evidence on request.",
        "No cancellation fee, administration fee, restocking fee, or penalty is deducted unless it was specifically disclosed in the SOW, accepted in writing, actually applicable, and lawful."
      ]},
      { heading: "5. TECH360 failure to deliver or material non-conformity", body: [
        "If a delivered item materially fails to match the approved SOW and approved preview, the client must notify TECH360 in writing with reasonable details. TECH360 will first have a reasonable opportunity to correct the non-conformity at no additional charge within a remedy period agreed in writing, taking account of severity and project complexity.",
        "If TECH360 cannot or does not correct a material non-conformity within the agreed remedy period, the client is entitled to a refund of the amount attributable to the affected undelivered or non-conforming portion. If TECH360 terminates the engagement for reasons within its control before completing the agreed scope, the value of undelivered work is refunded. Refund calculations must not charge the client for work not performed.",
        "Approval of a preview or milestone does not waive the right to report a latent defect or a defect covered by the applicable warranty."
      ]},
      { heading: "6. Completed and accepted work", body: [
        "Fees attributable to conforming work that has been delivered and accepted are not refundable merely because the client later changes their mind, changes business direction, stops using the software, or chooses another developer. This does not limit remedies for fraud, statutory rights, proven non-conformity, warranty obligations, or any right that cannot lawfully be excluded.",
        "A source-code handover, deployment record, acceptance record, invoice, payment verification, and relevant communications may be retained as evidence of the agreed scope and delivery. TECH360 will respond to payment disputes honestly and through the applicable payment-provider and legal processes. This policy does not prohibit a lawful card dispute or chargeback."
      ]},
      { heading: "7. How to request a refund", body: [
        "Send a written request to info@bdtech360.com with the TECH360 Client ID, project code, invoice or transaction reference, requested amount, reason, and relevant evidence. Do not send card security codes, passwords, or online banking credentials.",
        "TECH360 will acknowledge the request within two business days and provide a reasoned decision or a request for necessary information within five business days. If additional information is required, the decision period resumes when the requested information is received."
      ]},
      { heading: "8. Refund processing time", body: [
        "Once a refund is approved and the amount is confirmed, TECH360 will initiate it to the original payment method within 14 business days. If the original payment provider does not support a refund to that method, an alternative method will be agreed in writing and verified against the client.",
        "The receiving bank or payment provider may take additional time to post the refund. TECH360 will provide the refund transaction reference or remittance evidence when available. Any unavoidable provider or bank delay will be communicated."
      ]},
      { heading: "9. Contact", body: [
        "Contact TECH360 LLC at info@bdtech360.com or through the contact route at https://bdtech360.com. Include your Client ID and project reference so the request can be matched to the correct record."
      ]}
    ]
  },
  delivery: {
    slug: "delivery",
    title: "Delivery Policy",
    summary: "The preview-first delivery sequence, written scope, project start gate, revisions, testing, acceptance, and warranty.",
    updated: "November 2026",
    sections: [
      { heading: "1. Standard delivery sequence", body: [
        "The standard sequence is: enquiry and discovery → written Final Scope of Work → client SOW approval → HTML preview → client preview approval → full agreed payment → verified payment → production development → testing and quality assurance → client review → deployment and source-code handover → client verification.",
        "No payment is requested before the client has received and approved the agreed HTML preview. Production development does not start until the agreed payment has been verified, unless a different written milestone arrangement is expressly accepted in the SOW."
      ]},
      { heading: "2. What the HTML preview means", body: [
        "The HTML preview is a reviewable representation of the agreed design, navigation, key screens, and interactions. The SOW identifies which functions are demonstrable in the preview and which require backend services, credentials, production data, licensed integrations, or later implementation.",
        "Preview approval confirms the agreed visual direction and preview scope. It does not falsely certify that every backend integration, external provider, production database, security control, or third-party service has already been implemented or tested."
      ]},
      { heading: "3. Timeline and dependencies", body: [
        "The delivery timeline is stated in the approved SOW and begins when the required approvals, verified payment, client materials, access, and dependencies are available. Any client delay, approved scope change, provider approval delay, or third-party outage that affects the schedule will be recorded and communicated with its expected impact.",
        "TECH360 will not request or store credentials through public preview pages. Access is provided through an agreed secure channel or client-controlled account with least-privilege access."
      ]},
      { heading: "4. Revisions and scope changes", body: [
        "The SOW states the included revision rounds, review windows, and acceptance criteria. A revision within the approved scope is not a chargeable scope change. A new feature, material redesign, new integration, or changed business requirement is quoted separately and requires written approval before work begins.",
        "No unapproved scope change or extra charge is silently added."
      ]},
      { heading: "5. Testing and delivery acceptance", body: [
        "The SOW defines the applicable browser/device coverage, functional tests, security checks, integrations, data migration, performance expectations, and deployment criteria. TECH360 records the tests actually run and identifies any blocked or untested item rather than marking it complete.",
        "Delivery is presented for client review with a delivery checklist and known-issues list, if any. The client may accept or report a specific non-conformity within the review period stated in the SOW. A silence-based acceptance clause, if used, must be conspicuous in the SOW and cannot waive mandatory legal rights."
      ]},
      { heading: "6. Warranty", body: [
        "Unless the SOW provides a longer period, TECH360 provides a 30-calendar-day defect-correction warranty beginning on written delivery acceptance. The warranty covers reproducible defects that cause the delivered custom work to fail materially against the approved SOW and acceptance criteria.",
        "The warranty does not include new features, changed requirements, third-party outages, provider API changes, client or third-party modifications, unsupported environments, or defects caused by misuse. Such exclusions do not apply where the issue is actually caused by TECH360's own non-conforming work or where applicable law says otherwise."
      ]},
      { heading: "7. Contact", body: [
        "For delivery questions, contact info@bdtech360.com and quote your Client ID and project code."
      ]}
    ]
  },
  payment: {
    slug: "payment",
    title: "Payment & Financial Security Policy",
    summary: "The preview-first payment gate, agreed project fee, verified payment methods, receipts, refunds, and transparent costs.",
    updated: "November 2026",
    sections: [
      { heading: "1. Standard payment model", body: [
        "The standard TECH360 model is HTML Preview Before Payment, Source Code After Full Payment. The client receives and reviews the approved SOW and HTML preview before any project payment is requested. After the client approves both in writing, the client pays 100% of the agreed project fee. Production development begins only after payment verification.",
        "No advance, booking, reservation, discovery, administration, or mandatory onboarding fee is charged before preview approval under the standard model. A different payment schedule is valid only if every amount, percentage, trigger, due date, and refund treatment is expressly written in the SOW and separately accepted by both parties before payment."
      ]},
      { heading: "2. Price, currency, and invoice", body: [
        "Every quotation and invoice states the project fee, currency, included deliverables, exclusions, tax treatment where applicable, payment reference, and due date. USD is the default quotation currency unless another currency is agreed in writing.",
        "The approved project fee cannot be increased retroactively. A scope change requires a written change request, itemised quote, timeline impact, and client approval before the additional work begins."
      ]},
      { heading: "3. Payment methods and availability", body: [
        "Payment instructions are limited to methods that TECH360 has actually configured and authorised for the relevant transaction. A provider is not advertised as available merely because it appears in a settings screen or because credentials have been entered.",
        "Each payment request identifies the legal payee, invoice, Client ID, project, amount, currency, and transaction reference. If a payment provider, bank, or mobile financial service is unavailable, TECH360 will disclose that status and agree an alternative method before payment."
      ]},
      { heading: "4. Verification and receipt", body: [
        "A payment is treated as received only after server-side provider verification, bank reconciliation, or documented review by an authorised finance operator against reliable provider evidence. A browser redirect, screenshot, message, or uploaded receipt alone does not prove settlement.",
        "The platform records the amount, currency, transaction reference, invoice association, verification source, verifier or provider event, timestamp, and audit event. Duplicate, mismatched, replayed, or unverified payment events are not silently settled. A receipt is issued after verification."
      ]},
      { heading: "5. Source-code release gate", body: [
        "The agreed final source package is released only after the full amount due under the approved SOW has cleared and been verified, unless the SOW expressly defines an approved alternative handover schedule. A partial payment does not satisfy the full-payment gate by default.",
        "The client may inspect progress and agreed preview or test deliverables before final handover. TECH360 does not use hidden hosting or account control to withhold a paid deliverable."
      ]},
      { heading: "6. No hidden or recurring charges", body: [
        "There are no undisclosed mandatory monthly or annual TECH360 fees after handover. Any optional maintenance, hosting, support, monitoring, licence, API usage, storage, messaging, domain, or cloud charge must be itemised, identified as one-time or recurring, and approved by the client before commitment.",
        "Third-party charges are billed by the provider or passed through only as expressly disclosed in the SOW. TECH360 does not add an undisclosed markup or renew a paid subscription on the client's behalf without prior written authorisation."
      ]},
      { heading: "7. Refunds, reversals, and disputes", body: [
        "Refund eligibility and calculations are governed by the Refund & Cancellation Policy and the signed SOW. Refunds and chargebacks are handled with accurate records and in accordance with provider rules and applicable law. Neither party is asked to waive rights that cannot lawfully be waived.",
        "A refund is processed only after approval and reconciliation. The platform records the refund case, decision, approved amount, payment reference, settlement evidence, and audit trail."
      ]},
      { heading: "8. Contact", body: [
        "For payment questions, contact info@bdtech360.com with your Client ID and invoice reference. Never send passwords, one-time passcodes, card security codes, or online banking credentials."
      ]}
    ]
  },
  "source-code-handover": {
    slug: "source-code-handover",
    title: "Source Code, Ownership & Data Deletion Policy",
    summary: "What is transferred, when the handover occurs, client independence, retention periods, deletion evidence, and third-party licensing.",
    updated: "November 2026",
    sections: [
      { heading: "1. Handover principle and payment gate", body: [
        "TECH360 releases the agreed source package after the full amount due under the approved SOW has cleared and been verified. The client receives the items specifically listed in the SOW and handover manifest. Any exception must be expressly documented in the signed agreement.",
        "The handover process records the project, client, package version, manifest, file hashes where supported, delivery timestamp, download status, and client acceptance or issue report."
      ]},
      { heading: "2. Handover package", body: [
        "Depending on the approved SOW, the package includes custom application source code, project-specific assets, database schema and migrations, build and deployment instructions, dependency inventory, configuration templates without secret values, and a list of external services and licences.",
        "Internal TECH360 credentials, unrelated customer data, private infrastructure secrets, staff accounts, and confidential materials belonging to other clients are not transferred. Client-owned credentials and accounts are transferred or placed under the client's control through an agreed secure process."
      ]},
      { heading: "3. Password and account control", body: [
        "Where TECH360 temporarily uses a client account or deployment credential, the client is asked to rotate the credential after handover. TECH360 will revoke temporary access and remove its staff or contractor access when no longer required, subject to a documented support agreement.",
        "The client should enable multi-factor authentication, rotate temporary passwords, review administrator accounts, and verify that the domain, hosting, cloud, source repository, database, email, payment, and third-party service accounts are controlled by the client."
      ]},
      { heading: "4. Custom code, reusable components, and third-party licences", body: [
        "After full payment, the client receives the ownership or assignment rights in the project-specific custom code, designs, and deliverables that the SOW identifies as client-owned, to the extent those rights can legally be transferred.",
        "TECH360 retains ownership of its pre-existing frameworks, generic tools, reusable libraries, templates, methods, and know-how. Where any such component is included in the delivered system, TECH360 grants the client a perpetual, worldwide, non-exclusive, royalty-free licence to use, run, reproduce as needed for the project, maintain, modify, and have third-party developers maintain that component as part of the delivered system.",
        "Open-source and third-party software remain subject to their own licences. The handover includes a dependency and licence inventory to the extent reasonably available. No third-party item is represented as exclusively owned by TECH360 or the client when its licence says otherwise."
      ]},
      { heading: "5. Source-code retention and deletion timeline", body: [
        "Unless the SOW or a separate written retention agreement says otherwise, TECH360 will remove active working copies of the client's project source from TECH360-controlled development workspaces, active repositories, and ordinary project storage within 30 calendar days after the client confirms successful handover or the parties otherwise close the handover.",
        "Encrypted disaster-recovery or immutable backups that may contain residual project data are allowed to expire through the documented backup rotation, with a maximum target retention of 90 calendar days after the active-copy deletion date. Such backup copies are not used for routine development or restored except for disaster recovery, legal necessity, or security incident response. If a backup is restored, the deletion request is re-applied to the restored environment.",
        "Within five business days after active-copy deletion is completed, TECH360 will provide a deletion completion statement identifying the systems and categories covered, deletion date, and any documented exception. Backup expiry is recorded separately when the rotation completes."
      ]},
      { heading: "6. Retention exceptions", body: [
        "TECH360 may retain the minimum records reasonably required by law, tax and accounting obligations, contract administration, security, fraud prevention, dispute resolution, or the defence or exercise of legal claims. These records may include signed SOWs, invoices, payment and refund records, approvals, delivery acceptance, and limited audit metadata. They are access-restricted and are not retained as a substitute source-code archive.",
        "Third-party processors may have independent backup and retention schedules. TECH360 will identify material processors where reasonably practicable and will not promise immediate deletion from systems it does not control. Any such limitation and the processor's stated retention period will be disclosed."
      ]},
      { heading: "7. Client independence after handover", body: [
        "The delivered system is intended to operate using client-controlled hosting, domain, database, repository, and service accounts, or the exact third-party dependencies disclosed in the SOW. The client may appoint another developer or service provider to maintain, modify, host, and extend the delivered system.",
        "If a feature depends on a TECH360-operated service, subscription, proprietary API, or licence, that dependency must be disclosed in the SOW before approval, including its cost, continuity implications, and available migration or self-hosting option. No undisclosed TECH360 account or subscription is required for ordinary operation after handover."
      ]},
      { heading: "8. Post-handover support", body: [
        "The standard defect-correction warranty is 30 calendar days after written delivery acceptance, as described in the Delivery Policy. Support beyond that period is optional and requires a separate written support agreement. The agreement identifies fees, covered systems, response targets, support hours, exclusions, renewal, and termination.",
        "The client is not required to purchase ongoing TECH360 support to retain ownership or operate the delivered software, subject to third-party licences and dependencies disclosed in the SOW."
      ]},
      { heading: "9. Contact", body: [
        "For handover or deletion requests, contact info@bdtech360.com with your Client ID and project code. Never email passwords, API secrets, recovery codes, or payment credentials."
      ]}
    ]
  }
};

export const CLIENT_PROTECTION_ADDITIONAL_DOCS: LegalDoc[] = [
  {
    slug: "ownership",
    title: "Software Ownership & Intellectual Property Policy",
    summary: "The distinction between client-specific custom work, TECH360 reusable components, and third-party software licences.",
    updated: "November 2026",
    sections: [
      { heading: "1. Client-specific deliverables", body: [
        "After the client has paid all amounts due under the SOW, ownership or assignment of project-specific custom code, designs, documentation, and other deliverables transfers to the client to the extent identified in the SOW and legally transferable. The SOW identifies any excluded or licensed material before the client approves the project.",
        "The client may use, host, reproduce, maintain, modify, and engage another developer to modify the transferred custom deliverables, subject to third-party licences and any clearly disclosed exclusions."
      ]},
      { heading: "2. TECH360 background materials", body: [
        "TECH360 retains ownership of materials it developed or acquired independently of the project, including generic frameworks, reusable components, libraries, templates, utilities, methods, and know-how. These materials are not transferred as exclusive property merely because they are used to build a client deliverable.",
        "Where a TECH360 background component is included in the delivered system, the client receives a perpetual, worldwide, non-exclusive, royalty-free licence to use, run, maintain, modify, and have third parties maintain that component as part of the delivered system. The licence does not permit the client to resell the reusable component as a standalone competing product unless the SOW expressly grants that right."
      ]},
      { heading: "3. Third-party and open-source components", body: [
        "Third-party and open-source components remain governed by their respective licences. TECH360 will provide a dependency or licence inventory for material components to the extent reasonably available and will identify any paid licence or subscription that the client must obtain.",
        "No party receives ownership rights that the upstream licence does not permit to be transferred."
      ]},
      { heading: "4. Client materials and confidentiality", body: [
        "The client retains ownership of its pre-existing business data, content, trademarks, customer records, and materials. The client grants TECH360 only the limited permission needed to perform the approved SOW.",
        "TECH360 will not publish the client's name, logo, project, screenshots, results, or testimonial without separate prior written permission. Confidential information is used only for the engagement and legitimate legal, security, and operational purposes."
      ]},
      { heading: "5. Payment and transfer evidence", body: [
        "Transfer of client-specific ownership or licence rights is subject to the payment and handover conditions in the signed SOW and Source Code, Ownership & Data Deletion Policy. The handover manifest records the deliverables transferred."
      ]}
    ]
  },
  {
    slug: "pricing-transparency",
    title: "No Hidden & Recurring Charges Policy",
    summary: "How project fees, third-party expenses, subscriptions, hosting, licences, and optional maintenance are disclosed and approved.",
    updated: "November 2026",
    sections: [
      { heading: "1. No undisclosed mandatory fees", body: [
        "TECH360 does not impose undisclosed mandatory monthly or annual service fees after the agreed project handover. A client is not required to keep a TECH360 subscription, hosting account, maintenance retainer, or support plan merely to retain ownership of the delivered custom software.",
        "The approved SOW and invoice state the complete agreed project fee and identify any tax or other charge that is known and applicable at the time of quotation. No undisclosed administration, onboarding, release, handover, or cancellation fee is added."
      ]},
      { heading: "2. Third-party and usage-based costs", body: [
        "The SOW identifies material third-party costs known at quotation time, such as domain registration, hosting or cloud infrastructure, email/SMS/WhatsApp usage, AI model/API usage, payment processing, maps, data feeds, commercial fonts, stock assets, and software licences.",
        "For variable usage charges, TECH360 identifies the provider, billing unit or pricing link where available, who owns the account, who pays the provider, and whether a usage cap or alert can be configured. Provider pricing may change under the provider's own terms; TECH360 will not represent a variable provider charge as a fixed TECH360 fee."
      ]},
      { heading: "3. Approval before commitment", body: [
        "TECH360 will not purchase, activate, renew, or commit the client to a paid third-party product or recurring service without prior written approval identifying the estimated amount, billing frequency, account owner, renewal and cancellation method.",
        "Any proposed change to a recurring service or project fee is presented as a written change request. Silence is not approval."
      ]},
      { heading: "4. Optional support and maintenance", body: [
        "Post-warranty support, monitoring, backups, maintenance, hosting, and service-level commitments are optional unless the SOW expressly includes them. A separate agreement states the fee, scope, response targets, renewal, and cancellation terms.",
        "If no separate support agreement is active, no recurring TECH360 support fee is due after handover."
      ]}
    ]
  },
  {
    slug: "independence",
    title: "Independent Operation & Portability Policy",
    summary: "Client control of hosting, domains, repositories, data, credentials, and the right to use another developer after handover.",
    updated: "November 2026",
    sections: [
      { heading: "1. Client control", body: [
        "The default delivery design places the domain, hosting or cloud account, source repository, database, backups, and third-party service accounts under the client's ownership or administrative control wherever the provider permits. The SOW identifies any account that must temporarily be controlled by TECH360 and explains why.",
        "TECH360 does not intentionally create undisclosed technical lock-in. The client may appoint another developer or provider after handover."
      ]},
      { heading: "2. Documented dependencies", body: [
        "Before SOW approval, TECH360 identifies material external dependencies, including paid licences, proprietary APIs, hosted automation, email/SMS/WhatsApp providers, AI model services, and other systems required for specified features. The SOW states the account owner, recurring or usage cost, data flow, and any migration limitation known at that time.",
        "A feature that genuinely requires a TECH360-operated service is disclosed as such, including the service fee and what happens if the service ends. Where technically feasible, the SOW describes an export, migration, or self-hosting alternative."
      ]},
      { heading: "3. Credentials and security", body: [
        "Client credentials are transferred through a secure method and are not embedded in source code, frontend bundles, public repositories, or ordinary documentation. Temporary TECH360 access is least-privilege, logged where supported, and revoked when no longer needed.",
        "At handover, the client is provided with a configuration inventory and is asked to rotate temporary passwords, review users, enable MFA, and confirm control of key accounts."
      ]},
      { heading: "4. Independent operation and support", body: [
        "After handover, the client may operate the delivered system without purchasing optional TECH360 support, provided the client maintains the infrastructure and third-party accounts listed in the SOW. External providers may independently change or discontinue their services under their own terms.",
        "TECH360 will not disable a properly paid and handed-over client system solely because the client chooses another developer or does not purchase optional maintenance."
      ]}
    ]
  },
  {
    slug: "warranty-support",
    title: "Warranty & After-Sales Support Policy",
    summary: "The standard defect-correction warranty, covered defects, exclusions, response handling, and optional paid support.",
    updated: "November 2026",
    sections: [
      { heading: "1. Standard warranty period", body: [
        "Unless the SOW grants a longer period, TECH360 provides a 30-calendar-day defect-correction warranty from the date the client confirms delivery acceptance in writing. The warranty applies to reproducible defects in custom work delivered by TECH360 that materially fail the approved SOW and acceptance criteria.",
        "The warranty is included in the agreed project fee. The client does not need to buy a maintenance subscription to make a valid warranty request."
      ]},
      { heading: "2. How to report a defect", body: [
        "The client should report a defect through the client portal or info@bdtech360.com, quoting the Client ID and project code and describing the steps to reproduce the issue, expected behaviour, actual behaviour, and relevant screenshots or logs with secrets removed.",
        "TECH360 acknowledges warranty reports within two business days. Severity, workaround availability, reproducibility, and business impact determine the repair priority and target, which will be communicated in the case record. The acknowledgement target is not a guarantee that every issue can be fully resolved within two days."
      ]},
      { heading: "3. Covered and excluded work", body: [
        "Covered work includes correction of defects attributable to TECH360's delivered custom code or configuration that cause non-conformity with the approved SOW. Corrections are made without additional labour charges during the warranty period.",
        "New features, changed requirements, content updates, third-party provider outages or API changes, client or third-party code modifications, unsupported infrastructure changes, and issues caused by misuse are outside the standard warranty unless the SOW or mandatory law provides otherwise. TECH360 will explain the basis for an exclusion rather than automatically classifying every reported issue as chargeable."
      ]},
      { heading: "4. Security and maintenance boundaries", body: [
        "A security defect in TECH360's delivered custom work that is reproducible and falls within the warranty scope is treated as a warranty defect. Continuous security monitoring, penetration testing, managed patching, incident response, backups, uptime guarantees, and updates to third-party products are not included unless expressly listed in the SOW or a separate agreement.",
        "The client remains responsible for keeping client-controlled hosting, operating systems, third-party packages, credentials, and user access maintained after handover, except where a separate service agreement assigns those tasks to TECH360."
      ]},
      { heading: "5. Paid support after warranty", body: [
        "After the warranty period, support is optional. Before paid work begins, TECH360 provides a written quote stating the hourly, fixed-fee, or retainer basis; covered systems; support hours; response targets; exclusions; and any minimum charge. No paid support is performed without client approval.",
        "No standard hourly rate is implied by this policy. The actual rate or fixed fee is the amount written in the specific support quotation and accepted by the client."
      ]},
      { heading: "6. Contact", body: [
        "Submit support requests through the client portal or contact info@bdtech360.com with your Client ID and project code. Do not include passwords, API keys, recovery codes, or other secrets in support tickets."
      ]}
    ]
  },
  {
    slug: "company-transparency",
    title: "Company & Portfolio Verification",
    summary: "How TECH360 presents its legal identity, operational presence, team information, and real versus illustrative project examples.",
    updated: "November 2026",
    sections: [
      { heading: "1. Legal entity information", body: [
        "The website identifies the contracting entity as TECH360 LLC and states Missouri filing number LC014737249 and the business address published on the website. Prospective clients may independently search the Missouri Secretary of State's official business entity registry: https://bsd.sos.mo.gov/BusinessEntity/BESearch.aspx?SearchType=0.",
        "The official registry is the independent source for the entity record and status. Website statements are not a substitute for a current registry extract, certificate of good standing, tax document, or legal advice. Any certificate supplied by TECH360 should be independently verified using the issuing authority's verification facility where available."
      ]},
      { heading: "2. Tax identifiers and limits of public verification", body: [
        "A US Employer Identification Number is a tax identifier and is not generally validated through the public Missouri entity search. A client requiring tax verification may request appropriate documentation through a secure, confidential channel, subject to lawful redaction and reasonable confidentiality safeguards. TECH360 will not publish private tax documents or sensitive personal information as marketing material."
      ]},
      { heading: "3. Bangladesh operations and team", body: [
        "TECH360 will describe a Bangladesh office, registered branch, local entity, physical premises, or staffed development centre only where it can provide current supporting evidence. Remote team members or contractors must not be described as a registered office or branch.",
        "Where a client needs operational due diligence, TECH360 can provide appropriate team-role information, a meeting with responsible personnel, and relevant business or premises evidence under reasonable confidentiality arrangements. Personal identity documents and private employee data are not published publicly."
      ]},
      { heading: "4. Portfolio and case studies", body: [
        "A case study is labelled as a verified client engagement only where TECH360 has a genuine project record and permission to publish the relevant name, logo, results, or details. Where confidentiality prevents identification, the page must clearly say that the example is anonymised and that supporting references may be available only with the client's consent.",
        "Illustrative scenarios, representative workflows, sample screens, conceptual demos, and hypothetical business examples are labelled as illustrative. They are not presented as completed client projects, client testimonials, measured outcomes, or independently verified case studies."
      ]},
      { heading: "5. Requesting verification", body: [
        "Prospective clients may request the current legal entity details, a relevant registry reference, team-role information, and evidence supporting a specific portfolio claim by contacting info@bdtech360.com. Information is supplied subject to confidentiality, privacy, security, and applicable law."
      ]}
    ]
  }
];
