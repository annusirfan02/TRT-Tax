import type { LucideIcon } from "lucide-react";
import { Landmark, Building2, LineChart, ShieldCheck } from "lucide-react";

export interface TextItem {
  title: string;
  description: string;
}
export interface Faq {
  q: string;
  a: string;
}
export interface Service {
  slug: string;
  href: string;
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  cardDescription: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  heroHeadline: string;
  /** Optional hero background photo (path in /public). */
  heroImage?: string;
  intro: string;
  itemsHeading: string;
  items: TextItem[];
  benefitsHeading: string;
  benefitsIntro: string;
  benefits: TextItem[];
  processHeading: string;
  process: TextItem[];
  faqs: Faq[];
  notice: string;
  related: string[];
}

export const services: Service[] = [
  {
    slug: "income-sales-tax",
    href: "/income-sales-tax",
    icon: Landmark,
    title: "Income & Sales Tax Registration, Filing and Compliance",
    shortTitle: "Income & Sales Tax",
    cardDescription:
      "NTN and sales tax registration, return preparation and filing assistance, withholding compliance, and FBR notice support.",
    seoTitle: "Tax Consultant in Karachi | NTN, Income & Sales Tax Filing Pakistan",
    seoDescription:
      "TRT Associate offers tax consultancy in Karachi: NTN registration, income tax return filing, sales tax registration and returns, wealth statements, ATL and FBR notice assistance in Pakistan.",
    keywords: [
      "tax consultant in Karachi",
      "income tax return filing Pakistan",
      "NTN registration Pakistan",
      "sales tax registration Pakistan",
    ],
    heroHeadline: "Professional Tax Solutions for Individuals and Businesses.",
    heroImage: "/hero-income-tax.jpg",
    intro:
      "TRT Associate provides comprehensive income tax and sales tax consultancy services to individuals, entrepreneurs, and businesses in Pakistan. We assist clients with tax registration, return preparation, filing, documentation, and ongoing compliance requirements.",
    itemsHeading: "Our Income & Sales Tax Services",
    items: [
      { title: "NTN Registration", description: "Assistance with National Tax Number registration for individuals, businesses, AOPs, and companies." },
      { title: "Income Tax Return Filing", description: "Preparation and filing assistance for individual, business, and corporate income tax returns." },
      { title: "Sales Tax Registration", description: "Assistance with applicable sales tax registration and STRN-related requirements." },
      { title: "Monthly Sales Tax Returns", description: "Preparation and filing assistance for applicable monthly sales tax returns." },
      { title: "Wealth Statement Preparation", description: "Assistance with wealth statement preparation and reconciliation." },
      { title: "Withholding Tax Compliance", description: "Assistance with withholding tax calculations, documentation, reporting, and applicable compliance." },
      { title: "Active Taxpayer List (ATL)", description: "Assistance relating to taxpayer filing status and ATL requirements." },
      { title: "FBR Notices and Assessment Assistance", description: "Support in understanding and responding to applicable FBR notices and tax-related matters." },
      { title: "Tax Planning and Advisory", description: "Practical tax advisory and planning services within applicable Pakistani laws." },
      { title: "Tax Documentation and Record Management", description: "Assistance with maintaining appropriate tax records and documentation." },
    ],
    benefitsHeading: "Why Choose Our Tax Services?",
    benefitsIntro:
      "Tax obligations in Pakistan involve the Federal Board of Revenue (FBR), the IRIS portal and, for certain services, provincial revenue authorities such as the Sindh Revenue Board (SRB). We help you approach them in an organised way.",
    benefits: [
      { title: "Clear, Plain-English Guidance", description: "We explain what applies to your situation and which documents are needed, without unnecessary jargon." },
      { title: "Regulatory Awareness", description: "Our work is based on the applicable laws and official FBR and provincial authority guidance." },
      { title: "Organised Documentation", description: "Structured records make filing, future reviews and notice responses far less stressful." },
      { title: "Individuals to Companies", description: "Support for salaried individuals, business owners, AOPs, SMEs and corporate entities." },
      { title: "Honest Scope", description: "We tell you what we can assist with and where a matter needs other authorised professionals." },
      { title: "Ongoing Support", description: "Compliance is continuous. We help you stay organised between filing periods." },
    ],
    processHeading: "Our Tax Consultancy Process",
    process: [
      { title: "Consultation", description: "We discuss your income sources, business activity and current tax status." },
      { title: "Document Review", description: "We identify the documents required and review what you already have." },
      { title: "Preparation", description: "Registrations, returns or statements are prepared for your review and approval." },
      { title: "Filing Assistance", description: "With your authorisation, we assist with submission through the relevant portal, such as FBR IRIS." },
      { title: "Follow-up", description: "We help you keep records current and track upcoming compliance requirements." },
    ],
    faqs: [
      { q: "What is an NTN and who needs one?", a: "The National Tax Number (NTN) is the identification number used by the Federal Board of Revenue (FBR) for taxpayers. Whether you must obtain one depends on your circumstances and the law currently in force. We can review your situation and assist with registration where applicable." },
      { q: "Can you file my income tax return on my behalf?", a: "We prepare returns and provide filing assistance based on the information and documents you provide and with your authorisation. You remain responsible for the accuracy and completeness of the information supplied." },
      { q: "What is the Active Taxpayer List (ATL)?", a: "The ATL is a list maintained by the FBR of persons who have filed their returns as required. Your status can affect how certain transactions are treated. We can help you understand your status and the steps relevant to it." },
      { q: "Do you help with sales tax registration?", a: "Yes. We assist with applicable federal sales tax registration (STRN) and, where relevant to your business, guide you regarding provincial sales tax on services, such as registration with the Sindh Revenue Board." },
      { q: "Can you help if I receive an FBR notice?", a: "We can help you understand the notice, gather the relevant documents and prepare a response for your review. Representation before tax authorities or appellate forums may need to be handled by suitably authorised representatives, and we will tell you when that applies." },
      { q: "Can you guarantee tax savings?", a: "No. We provide advice within applicable law, but outcomes depend on your facts and on the law and its interpretation at the time. We do not promise specific tax results." },
    ],
    notice:
      "Tax law, rates, deadlines and procedures change frequently. Always confirm current requirements with the FBR or the relevant provincial authority. Information on this page is general and is not a substitute for advice on your specific situation.",
    related: ["secp-compliance-incorporation", "financial-accounting-auditing"],
  },
  {
    slug: "secp-compliance-incorporation",
    href: "/secp-compliance-incorporation",
    icon: Building2,
    title: "SECP Compliance & Incorporation",
    shortTitle: "SECP Compliance & Incorporation",
    cardDescription:
      "Company incorporation, corporate documentation, statutory filings and ongoing compliance with the SECP.",
    seoTitle: "SECP Company Registration Pakistan | Company Incorporation Karachi",
    seoDescription:
      "Company incorporation in Karachi and SECP compliance across Pakistan: private limited, single member company and LLP registration, annual returns, amendments and corporate secretarial support.",
    keywords: [
      "SECP company registration Pakistan",
      "company incorporation Karachi",
      "private limited company registration",
      "corporate compliance services Pakistan",
    ],
    heroHeadline: "Build Your Business on a Strong Corporate Foundation.",
    heroImage: "/hero-secp.jpg",
    intro:
      "TRT Associate assists entrepreneurs, startups, and established businesses with company incorporation, corporate documentation, and ongoing SECP compliance requirements in Pakistan.",
    itemsHeading: "Our SECP & Incorporation Services",
    items: [
      { title: "Private Limited Company Registration", description: "Assistance with incorporation of private limited companies." },
      { title: "Single Member Company Registration", description: "Support with Single Member Company (SMC) incorporation." },
      { title: "LLP Registration", description: "Assistance with applicable Limited Liability Partnership registration requirements." },
      { title: "Company Name Reservation", description: "Guidance and assistance with company name availability and reservation." },
      { title: "Memorandum and Articles of Association", description: "Preparation and documentation assistance for constitutional company documents." },
      { title: "Directors and Shareholders Changes", description: "Assistance with applicable changes in company ownership, directors, and particulars." },
      { title: "Annual Returns and SECP Filings", description: "Support with applicable annual returns and statutory filing requirements." },
      { title: "Company Amendments", description: "Assistance with changes to company information and constitutional documents." },
      { title: "Corporate Secretarial Services", description: "Corporate documentation and secretarial compliance support." },
      { title: "Post-Incorporation Compliance", description: "Guidance regarding applicable regulatory obligations after company registration." },
    ],
    benefitsHeading: "Benefits of Professional Corporate Assistance",
    benefitsIntro:
      "Companies in Pakistan are regulated by the Securities and Exchange Commission of Pakistan (SECP) under the Companies Act, 2017 and related rules. Getting the structure and documents right at the start helps avoid delays and rework.",
    benefits: [
      { title: "Right Structure from Day One", description: "We help you understand the options so you can choose a structure that fits your plans." },
      { title: "Accurate Documentation", description: "Carefully prepared constitutional documents and forms reduce the chance of queries and resubmissions." },
      { title: "Compliance Visibility", description: "Understand your statutory obligations after incorporation, not only at registration." },
      { title: "Time Saved for Founders", description: "Spend your time on the business while we assist with paperwork and process." },
      { title: "Coordinated Services", description: "Incorporation connects naturally with tax registration and accounting set-up." },
      { title: "Clear Communication", description: "You are kept informed on what is needed, what has been filed and what comes next." },
    ],
    processHeading: "Company Incorporation Process",
    process: [
      { title: "Structure Discussion", description: "We discuss your business, ownership and objectives to identify a suitable company type." },
      { title: "Name Availability", description: "We assist with checking and reserving a proposed company name, subject to SECP rules." },
      { title: "Documents & Particulars", description: "We collect details and prepare the constitutional documents and forms for your review." },
      { title: "Submission to SECP", description: "We assist with submission of the incorporation application through the applicable SECP process." },
      { title: "Post-Incorporation Set-up", description: "We guide you on next steps such as tax registration, banking documents and statutory registers." },
    ],
    faqs: [
      { q: "What type of company should I register?", a: "It depends on the number of owners, liability, funding plans and compliance appetite. Common options include a private limited company, a single member company and an LLP. We discuss these with you during a consultation." },
      { q: "How long does incorporation take?", a: "Timelines depend on SECP processing, name availability and how quickly documents are provided. We do not guarantee specific timelines or approvals." },
      { q: "What are the government fees?", a: "Official fees are set by the SECP and can change. We will direct you to the current official fee schedule rather than quote figures that may be outdated." },
      { q: "Do I have to file anything after incorporation?", a: "Companies have ongoing statutory obligations under the Companies Act, 2017 and SECP rules, such as annual filings and reporting of changes. We help you understand those that apply to your company." },
      { q: "Can you help with changes to directors or shareholding?", a: "Yes. We assist with preparing and filing the applicable documents for changes in directors, shareholders, registered office and other particulars." },
      { q: "Do you provide legal advice?", a: "Our work is consultancy and documentation support. Where a matter calls for a licensed legal practitioner, we will say so." },
    ],
    notice:
      "SECP requirements, forms and fees are updated from time to time. Please verify current rules on the official SECP website. Nothing on this page is a guarantee of registration or approval.",
    related: ["income-sales-tax", "risk-management-compliance"],
  },
  {
    slug: "financial-accounting-auditing",
    href: "/financial-accounting-auditing",
    icon: LineChart,
    title: "Financial Accounting & Auditing",
    shortTitle: "Financial Accounting & Auditing",
    cardDescription:
      "Bookkeeping, financial statements, reporting, reconciliations, budgeting and audit-related support.",
    seoTitle: "Accounting Services Karachi | Bookkeeping, Financial Reporting & Audit Support",
    seoDescription:
      "Accounting and audit-related services in Karachi, Pakistan: bookkeeping, financial statements, bank reconciliation, internal audit, budgeting and accounting system setup for SMEs and companies.",
    keywords: [
      "accounting services Karachi",
      "bookkeeping services Pakistan",
      "financial consultancy Pakistan",
      "internal audit Pakistan",
    ],
    heroHeadline: "Financial Clarity for Better Business Decisions.",
    heroImage: "/hero-accounting.jpg",
    intro:
      "TRT Associate supports businesses with accounting, financial reporting, bookkeeping, and audit-related services designed to improve financial visibility and support informed business decisions.",
    itemsHeading: "Our Accounting & Audit Services",
    items: [
      { title: "Bookkeeping and Accounting", description: "Accurate recording and organization of financial transactions." },
      { title: "Financial Statements Preparation", description: "Preparation assistance for financial statements in accordance with applicable reporting requirements." },
      { title: "Financial Reporting", description: "Financial reporting and management information to support business decisions." },
      { title: "Bank Reconciliation", description: "Reconciliation of bank statements with accounting records." },
      { title: "Accounts Payable and Receivable", description: "Management and review of outstanding payments and receivables." },
      { title: "Internal Audit", description: "Review of internal procedures, financial records, and controls." },
      { title: "External Audit", description: "External audit services where the firm and its professionals meet applicable statutory and professional eligibility requirements. Otherwise, we provide audit coordination and assistance." },
      { title: "Financial Statement Review", description: "Review and analysis of financial statements." },
      { title: "Budgeting and Forecasting", description: "Budget preparation and financial forecasting assistance." },
      { title: "Accounting System Setup", description: "Assistance with accounting processes, systems, and financial record management." },
    ],
    benefitsHeading: "Benefits of Professional Accounting",
    benefitsIntro:
      "Reliable accounts are the foundation for tax compliance, funding conversations and day-to-day management decisions.",
    benefits: [
      { title: "Accurate Records", description: "Consistently maintained books reduce errors and year-end pressure." },
      { title: "Better Decisions", description: "Timely management information helps you understand performance and cash position." },
      { title: "Tax-Ready Accounts", description: "Well-kept accounts make tax return preparation more straightforward." },
      { title: "Stronger Controls", description: "Reconciliations and reviews help detect mistakes early." },
      { title: "Credibility", description: "Organised financial statements support discussions with banks, investors and regulators." },
      { title: "Scalable Processes", description: "Systems set up properly early on can grow with your business." },
    ],
    processHeading: "Our Financial Management Process",
    process: [
      { title: "Assess", description: "We review your current accounting records, systems and reporting needs." },
      { title: "Set Up", description: "We agree a chart of accounts, procedures and a document flow that suits your business." },
      { title: "Record & Reconcile", description: "Transactions are recorded and reconciled against bank and supplier records." },
      { title: "Report", description: "You receive periodic financial statements and management information." },
      { title: "Review & Improve", description: "We review results with you and suggest practical improvements." },
    ],
    faqs: [
      { q: "Which businesses do you provide accounting services to?", a: "We work with sole proprietors, AOPs, startups, SMEs and companies. Scope is agreed upfront based on transaction volume and complexity." },
      { q: "Can TRT Associate perform my statutory audit?", a: "External statutory audits can be performed only by firms and professionals who meet the applicable statutory and professional eligibility requirements. Where that does not apply, we provide audit coordination and assistance. We will be transparent about this at the outset." },
      { q: "Do you work with my existing accounting software?", a: "We can discuss working with your current system or helping you set up a suitable alternative. Specific software support will be confirmed during consultation." },
      { q: "What financial reporting framework do you follow?", a: "Financial statements are prepared in line with the reporting framework applicable to your entity type and size." },
      { q: "How often will I receive reports?", a: "Reporting frequency, such as monthly or quarterly, is agreed with you based on your needs." },
      { q: "Is my financial information kept confidential?", a: "Client information is handled confidentially and used only for the agreed engagement, except where disclosure is required by law." },
    ],
    notice:
      "External audit and certain assurance services are regulated professional activities. We provide them only where eligibility and licensing requirements are met; otherwise we offer coordination and supporting assistance.",
    related: ["income-sales-tax", "risk-management-compliance"],
  },
  {
    slug: "risk-management-compliance",
    href: "/risk-management-compliance",
    icon: ShieldCheck,
    title: "Risk Management & Compliance",
    shortTitle: "Risk Management & Compliance",
    cardDescription:
      "Risk assessments, internal controls, governance advisory and compliance monitoring for growing businesses.",
    seoTitle: "Risk Management Consultancy Pakistan | Compliance & Internal Controls Karachi",
    seoDescription:
      "Risk management and compliance consultancy in Karachi, Pakistan: business risk assessment, internal control evaluation, governance advisory, compliance monitoring and policy development.",
    keywords: [
      "risk management consultancy Pakistan",
      "corporate compliance services Pakistan",
      "internal control evaluation",
      "corporate governance advisory Karachi",
    ],
    heroHeadline: "Protect Your Business Through Smarter Risk Management.",
    heroImage: "/hero-risk.jpg",
    intro:
      "TRT Associate helps businesses identify potential risks, strengthen internal controls, and understand applicable regulatory and compliance requirements through structured consultancy and advisory support.",
    itemsHeading: "Our Risk & Compliance Services",
    items: [
      { title: "Business Risk Assessment", description: "Identification and evaluation of potential business risks." },
      { title: "Internal Control Evaluation", description: "Review of internal controls and business processes." },
      { title: "Regulatory Compliance Review", description: "Assessment of applicable regulatory and statutory compliance requirements." },
      { title: "Corporate Governance Advisory", description: "Guidance relating to corporate governance practices." },
      { title: "Financial Risk Management", description: "Identification and assessment of financial risks." },
      { title: "Compliance Monitoring", description: "Support with monitoring applicable compliance obligations." },
      { title: "Internal Policies and Procedures", description: "Development and review assistance for internal policies and procedures." },
      { title: "AML Compliance Advisory", description: "AML-related consultancy where applicable and subject to relevant professional qualifications and regulatory requirements." },
      { title: "Operational Risk Assessment", description: "Assessment of operational risks and potential process weaknesses." },
      { title: "Compliance Documentation", description: "Assistance with organizing and maintaining compliance documentation." },
    ],
    benefitsHeading: "Why Risk Management Matters",
    benefitsIntro:
      "Many serious business problems, from financial loss to regulatory penalties, build up gradually. A structured look at risk helps you act before they become costly.",
    benefits: [
      { title: "Early Warning", description: "Spot weaknesses in processes and controls before they turn into losses." },
      { title: "Regulatory Readiness", description: "Know which obligations apply and keep evidence of compliance organised." },
      { title: "Better Governance", description: "Clear roles, policies and approval flows support accountability." },
      { title: "Protect Reputation", description: "Strong controls build confidence with customers, banks and partners." },
      { title: "Informed Priorities", description: "Focus attention and budget on the risks that matter most." },
      { title: "Practical Recommendations", description: "Advice sized to your business, not generic checklists." },
    ],
    processHeading: "Our Risk Assessment Process",
    process: [
      { title: "Scope", description: "We agree the business areas, objectives and obligations to be covered." },
      { title: "Identify", description: "Through discussion and document review we identify potential risks and control gaps." },
      { title: "Evaluate", description: "Risks are assessed by likelihood and potential impact." },
      { title: "Recommend", description: "We provide a practical set of recommendations and policy improvements." },
      { title: "Monitor", description: "We support periodic follow-up and compliance monitoring." },
    ],
    faqs: [
      { q: "Is risk management only for large companies?", a: "No. Smaller businesses often benefit because a single control failure can have a major impact. Engagements are scaled to the size and complexity of the business." },
      { q: "Do you provide AML compliance services?", a: "AML advisory is offered only where applicable and subject to the relevant professional qualifications and regulatory requirements. Contact us to discuss whether your situation falls within what we can support." },
      { q: "What will I receive at the end of an assessment?", a: "Typically a written summary of findings, a prioritised list of risks and recommendations. The exact deliverables are agreed before we begin." },
      { q: "Can you help write internal policies?", a: "Yes. We assist in drafting and reviewing policies and procedures, which you review and adopt according to your own governance process." },
      { q: "Does this guarantee regulatory compliance?", a: "No. Our work supports your own compliance efforts, but responsibility for compliance rests with the business and its management." },
      { q: "How is this different from an audit?", a: "Risk and control advisory is forward-looking and recommendation-focused. An audit is a formal assurance engagement with specific eligibility and reporting requirements." },
    ],
    notice:
      "Risk management and compliance advisory is general in nature and depends on the facts of each business. Regulated or licensed activities are undertaken only where applicable qualifications and legal requirements are met.",
    related: ["secp-compliance-incorporation", "financial-accounting-auditing"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const homeContent = {
  whyChoose: [
    { title: "Client-Focused Approach", description: "Every engagement starts with understanding your situation, goals and constraints." },
    { title: "Professional Expertise", description: "Practical knowledge across taxation, accounting, corporate and compliance matters." },
    { title: "Comprehensive Business Solutions", description: "Tax, incorporation, accounting and risk support from a single consultancy." },
    { title: "Regulatory Awareness", description: "We keep our work aligned with FBR, SECP and provincial authority requirements." },
    { title: "Transparent Communication", description: "Clear scope, clear next steps and no hidden surprises." },
    { title: "Commitment to Quality", description: "Careful preparation and review of every document we assist with." },
  ] as TextItem[],
  process: [
    { title: "Initial Consultation", description: "We listen to your needs and explain how we can help." },
    { title: "Understanding Client Requirements", description: "We review your documents, structure and compliance position." },
    { title: "Professional Assistance", description: "We prepare, file and coordinate the work agreed with you." },
    { title: "Ongoing Support and Compliance", description: "We stay available as your obligations and business evolve." },
  ] as TextItem[],
  aboutPoints: [
    "Professional approach",
    "Client-focused solutions",
    "Regulatory awareness",
    "Transparent communication",
    "Reliable consultancy services",
  ],
};
