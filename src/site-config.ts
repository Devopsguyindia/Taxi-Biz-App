export const siteConfig = {
	businessName: 'Sagar Travels',
	siteUrl: 'https://www.exampletaxi.com',
	defaultDescription:
		'Reliable taxi service for Pune and Mumbai including airport transfer, local hire, and return trip packages.',
	phoneDisplay: '+91 98765 43210',
	phoneHref: '+919876543210',
	whatsappNumber: '919876543210',
	serviceAreas: ['Pune', 'Mumbai', 'New Mumbai'],
	addressLocality: 'Pune',
	addressRegion: 'Maharashtra',
	priceRange: '$$',
	enableStickyActions: true,
	formEndpoint: 'https://formspree.io/f/your-form-id',
	fleet: [
		{
			name: 'Toyota Innova',
			type: 'SUV',
			icon: '🚙',
			imageUrl: '',
			imageAlt: 'Toyota Innova SUV',
			passengerInfo: 'Comfortable for family and airport travel.',
		},
		{
			name: 'Maruti Ertiga',
			type: 'MUV',
			icon: '🚐',
			imageUrl: '',
			imageAlt: 'Maruti Ertiga MUV',
			passengerInfo: 'Balanced option for local and intercity trips.',
		},
		{
			name: 'Swift Dzire',
			type: 'Sedan',
			icon: '🚗',
			imageUrl: '',
			imageAlt: 'Swift Dzire Sedan',
			passengerInfo: 'Economical sedan for daily and local rides.',
		},
	],
	packages: [
		{
			title: 'Airport Pickup / Drop',
			slug: '/services/airport-transfers/',
			highlights: [
				'Pune Airport - Day Hrs',
				'Pune Airport - Night Hrs',
				'Pune - Mumbai / Mumbai - Pune',
				'Pune - New Mumbai / New Mumbai - Pune',
			],
		},
		{
			title: 'Local Hire',
			slug: '/services/local-hire/',
			highlights: ['City rides', 'Business travel', 'Flexible timings'],
		},
		{
			title: 'Mumbai Return Package',
			slug: '/services/mumbai-return/',
			highlights: ['Same-day return', 'Planned return trip', 'Comfort fleet'],
		},
	],
	seo: {
		defaultKeywords: [
			'Pune taxi service',
			'Pune airport taxi',
			'Pune to Mumbai cab',
			'Mumbai to Pune taxi',
			'Pune local cab hire',
			'Mumbai return taxi package',
		],
		pages: {
			home: {
				title: 'Taxi Service in Pune and Mumbai',
				description:
					'Book airport transfer, local hire, and Mumbai return taxi packages with professional drivers and clean vehicles.',
				path: '/',
				keywords: ['Pune taxi', 'airport transfer Pune', 'Pune Mumbai cab', 'local hire Pune'],
				heroKicker: '24x7 Premium Taxi Service',
				heroTitle: 'Reliable taxi service for Pune, Mumbai, and airport travel',
				heroDescription:
					'Simple package booking with call, WhatsApp, or quick enquiry form. Clean cars, timely drivers, and comfortable intercity rides.',
				faq: [
					{
						question: 'Do you provide Pune Airport night pickups?',
						answer: 'Yes. Day and night airport pickup/drop options are available by prior booking.',
					},
					{
						question: 'Can I book Pune to Mumbai and return?',
						answer: 'Yes. You can choose one-way routes or our dedicated Mumbai return package.',
					},
					{
						question: 'Which vehicles are available?',
						answer:
							'Toyota Innova, Maruti Ertiga, and Swift Dzire are available based on your trip type.',
					},
				],
			},
			airportTransfers: {
				title: 'Airport Pickup and Drop Taxi',
				description:
					'Book Pune Airport day and night transfer taxis, plus Pune-Mumbai and Pune-New Mumbai intercity cabs.',
				path: '/services/airport-transfers/',
				keywords: ['Pune airport taxi', 'airport pickup Pune', 'Pune to Mumbai cab'],
			},
			localHire: {
				title: 'Local Hire Taxi in Pune',
				description:
					'Hire a local cab for business, shopping, meetings, and full-day city travel with flexible pickup points.',
				path: '/services/local-hire/',
				keywords: ['local cab Pune', 'Pune local hire taxi', 'cab for full day Pune'],
			},
			mumbaiReturn: {
				title: 'Mumbai Return Taxi Package',
				description:
					'Comfortable Mumbai return taxi package from Pune with reliable timing and vehicle options for same-day return.',
				path: '/services/mumbai-return/',
				keywords: ['Pune Mumbai return taxi', 'Mumbai return cab package', 'Pune to Mumbai return'],
			},
			fleet: {
				title: 'Taxi Fleet - Innova, Ertiga, Dzire',
				description:
					'Choose from Toyota Innova SUV, Maruti Ertiga MUV, and Swift Dzire sedan for airport and intercity travel.',
				path: '/fleet/',
				keywords: ['Innova taxi Pune', 'Ertiga cab Pune', 'Dzire sedan cab Pune'],
			},
			contact: {
				title: 'Contact and Booking',
				description:
					'Contact our taxi service by phone, WhatsApp, or quick form for Pune airport transfer, local hire, and Mumbai trips.',
				path: '/contact/',
				keywords: ['contact taxi Pune', 'book taxi Pune', 'WhatsApp taxi booking'],
			},
		},
	},
};

export type SeoMeta = {
	title: string;
	description: string;
	path: string;
};
