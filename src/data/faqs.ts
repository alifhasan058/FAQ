import { FAQItem, Category } from '../types';
import waterFilters from '../assets/images/water_filters_1784480612578.jpg';

export const CATEGORIES: Category[] = [
  { id: 'most-asked', name: 'Most Asked', iconName: 'Star' },
  { id: 'installation', name: 'Installation', iconName: 'LayoutGrid' },
  { id: 'maintenance', name: 'Maintenance', iconName: 'Wrench' },
  { id: 'warranty', name: 'Warranty', iconName: 'Shield' },
  { id: 'delivery', name: 'Delivery & Order', iconName: 'Truck' },
  { id: 'payment', name: 'Payment & Other', iconName: 'CreditCard' },
];

export const INITIAL_FAQS: FAQItem[] = [
  // --- MOST ASKED ---
  {
    id: 'ma-1',
    category: 'most-asked',
    question: 'How often should filters be replaced?',
    answer: 'It depends on usage and water quality. Typically, sediment and carbon filters last 6 months, while RO membrane lasts 12-18 months. Our app reminds you before it\'s due.',
    isHot: true,
    image: waterFilters,
  },
  {
    id: 'ma-2',
    category: 'most-asked',
    question: 'Is installation really free?',
    answer: 'Yes, installation is completely free for all NeaPure purifiers! Once your delivery is completed, our certified technician will visit your location within 24-48 hours to complete the installation.',
  },
  {
    id: 'ma-3',
    category: 'most-asked',
    question: 'Do all products include a warranty?',
    answer: 'Yes, all NeaPure water purifiers come with a comprehensive 1-year warranty on electrical parts and a 3-year warranty on the RO membrane. Physical damage is not covered.',
  },
  {
    id: 'ma-4',
    category: 'most-asked',
    question: 'Do you provide installation?',
    answer: 'Yes, we provide professional, certified installation services across all covered cities. Our technician will test your tap water TDS level, mount the purifier elegantly, and set up your dynamic wastewater drain outlet.',
  },
  {
    id: 'ma-5',
    category: 'most-asked',
    question: 'Can I order replacement filters online?',
    answer: 'Absolutely! You can purchase genuine NeaPure filter cartridge sets directly through our web portal, mobile app, or by raising a quick request with our automated chat support team.',
  },
  {
    id: 'ma-6',
    category: 'most-asked',
    question: 'Do you deliver outside Dhaka?',
    answer: 'Yes! We deliver to major cities throughout Bangladesh, including Chittagong, Sylhet, Khulna, Rajshahi, Barisal, and Rangpur. Shipping schedules and fees vary slightly by zone.',
  },
  {
    id: 'ma-7',
    category: 'most-asked',
    question: 'Do you service all cities?',
    answer: 'We currently provide full on-site servicing in Dhaka, Chittagong, Sylhet, Gazipur, and Narayanganj. For other major cities, we offer instant video support and work with verified local service partners.',
  },

  // --- INSTALLATION ---
  {
    id: 'inst-1',
    category: 'installation',
    question: 'What are the pre-requisites for installation?',
    answer: 'You will need a standard tap water connection, a power outlet (220V AC) within 1.5 meters, and adequate kitchen or wall space for mounting. A stable inlet water pressure of 10-40 PSI is highly recommended. If pressure is lower, an external booster pump may be required.',
  },
  {
    id: 'inst-2',
    category: 'installation',
    question: 'How long does the installation process take?',
    answer: 'A standard professional installation takes about 45 to 60 minutes. This includes safely mounting the unit, tapping the raw water source with our dual-valve adapter, flushing the filters, and calibrating the output TDS level.',
  },
  {
    id: 'inst-3',
    category: 'installation',
    question: 'Can I install the purifier myself?',
    answer: 'We highly advise letting our certified technicians complete the installation. Correct pressure setups, leakage checks, and initial flushing of carbon particles require expert tools. Self-installation may void parts of the 1-year warranty.',
  },
  {
    id: 'inst-4',
    category: 'installation',
    question: 'Do you charge extra for kitchen tile drilling?',
    answer: 'No! Standard wall mounting, kitchen cabinet drilling, tile drilling, and routing up to 5 meters of food-grade connection pipes are completely free of charge under our standard installation package.',
  },

  // --- MAINTENANCE ---
  {
    id: 'maint-1',
    category: 'maintenance',
    question: 'How do I clean my water purifier outer body?',
    answer: 'The outer body of your NeaPure purifier can be wiped gently with a soft, clean, damp cloth. Avoid abrasive detergents, sprays, or steel wool. The internal storage tank is continuously sanitized by our automatic UV-LED module, but we recommend manual scrubbing by a professional every 6 months.',
  },
  {
    id: 'maint-2',
    category: 'maintenance',
    question: 'What is a TDS controller and should I adjust it?',
    answer: 'The Total Dissolved Solids (TDS) controller balances mineral retention to ensure safe, tasty drinking water. Our technician calibrates this to your specific water source. Please do not adjust it yourself, as excessive raw water blending can compromise biological filtration safety.',
  },
  {
    id: 'maint-3',
    category: 'maintenance',
    question: 'How will I know when filters are choked?',
    answer: 'Your NeaPure device features a smart LED panel. The Filter Lifetime bar will change colors from green to amber (order replacement) and then flash red (service overdue). You will also receive automated SMS, email, and app notifications.',
  },
  {
    id: 'maint-4',
    category: 'maintenance',
    question: 'Is regular servicing covered under warranty?',
    answer: 'Yes! Your first-year standard warranty covers two free preventive maintenance visits. Our technician will check for leaks, test electrical components, clean the primary sediment bowl, and run a full water quality safety test.',
  },

  // --- WARRANTY ---
  {
    id: 'warr-1',
    category: 'warranty',
    question: 'What does the standard 1-year warranty cover?',
    answer: 'Our comprehensive warranty covers all electrical parts (booster pump, SMPS adapter, UV lamp ballast, solenoid valve, float switch) and manufacturing defects. It does not cover consumable parts like the Sediment filter, Carbon block, or Ultrafiltration membrane after initial use.',
  },
  {
    id: 'warr-2',
    category: 'warranty',
    question: 'How do I log a warranty claim or service ticket?',
    answer: 'Logging a ticket is easy! You can press the "Live Chat" button on our app, raise a service ticket in our web panel, call our Toll-Free customer line, or send a WhatsApp message. A service coordinator will schedule a technician visit within 24 hours.',
  },
  {
    id: 'warr-3',
    category: 'warranty',
    question: 'Can I purchase an Extended Warranty or AMC plan?',
    answer: 'Yes! We offer single-year or multi-year Annual Maintenance Contracts (AMC). The AMC covers unlimited service calls, two free filter changes, and repair or replacement of electrical parts. You can subscribe anytime before your initial warranty expires.',
  },
  {
    id: 'warr-4',
    category: 'warranty',
    question: 'What events or conditions will void my warranty?',
    answer: 'The warranty becomes invalid if: the unit is opened or serviced by non-certified technicians, non-genuine filter cartridges are installed, the device runs on water with a TDS above 2,500 PPM, or if damage occurs from high-voltage electrical surges or external physical force.',
  },

  // --- DELIVERY ---
  {
    id: 'del-1',
    category: 'delivery',
    question: 'What is the typical shipping timeline?',
    answer: 'For customers inside Dhaka metropolitan area, delivery is guaranteed within 24 to 48 hours. For Chittagong, Sylhet, and other major divisional cities, it takes 2 to 4 business days. Remote upazilas may take up to 5-7 business days.',
  },
  {
    id: 'del-2',
    category: 'delivery',
    question: 'What is your return and refund policy?',
    answer: 'We provide a 7-day hassle-free return window for sealed, unused water purifiers in their original factory packaging. If you suspect a technical defect or the outer box was delivered damaged, please contact us immediately for a free replacement.',
  },
  {
    id: 'del-3',
    category: 'delivery',
    question: 'Can I reschedule my delivery date or address?',
    answer: 'Yes, you can easily change your delivery address or reschedule to a preferred date by contacting our shipping helpdesk before your package leaves our central fulfillment hub.',
  },
  {
    id: 'del-4',
    category: 'delivery',
    question: 'Is cash-on-delivery (COD) supported nationwide?',
    answer: 'Yes! We support complete Cash on Delivery (COD) services across all 64 districts in Bangladesh. You can inspect the outer packaging condition before paying our delivery officer.',
  },

  // --- PAYMENT ---
  {
    id: 'pay-1',
    category: 'payment',
    question: 'What payment options do you support?',
    answer: 'We accept Cash on Delivery (COD), Visa, Mastercard, and American Express credit/debit cards. We also support all major mobile financial services (MFS) including bKash, Nagad, and Rocket.',
  },
  {
    id: 'pay-2',
    category: 'payment',
    question: 'Are interest-free EMI options available?',
    answer: 'Yes! We provide 3, 6, and 12-month interest-free (0% EMI) credit card payment plans with most major commercial banks in Bangladesh, including City Bank, SCB, EBL, BRAC, and DBBL, for purchases over BDT 12,000.',
  },
  {
    id: 'pay-3',
    category: 'payment',
    question: 'Do you offer commercial or corporate bulk discounts?',
    answer: 'We offer attractive volume-based corporate discounts for offices, schools, hospitals, and apartment complexes. Please contact our corporate accounts desk at business@neapure.com for custom pricing quotes.',
  },
  {
    id: 'pay-4',
    category: 'payment',
    question: 'How do I download my official payment receipt and invoice?',
    answer: 'Your official digital tax invoice is automatically emailed and sent via SMS immediately after your payment clears. You can also view and download historic invoice copies from your user account dashboard at any time.',
  },
];
