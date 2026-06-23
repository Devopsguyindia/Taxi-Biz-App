export interface RouteLandingItem {
	slug: string;
	title: string;
	description: string;
	path: string;
	keywords: string[];
	h1: string;
	lead: string;
	highlights: { title: string; body: string }[];
	relatedLinks: { label: string; href: string }[];
	faq: { question: string; answer: string }[];
}

export const siteConfig = {
	businessName: 'Sagar Travels',
	siteUrl: 'https://www.exampletaxi.com',
	defaultDescription:
		'Reliable taxi service for Pune and Mumbai including airport transfer, local hire, and return trip packages.',
	phoneDisplay: '+91 90287 43575',
	phoneHref: '+919028743575',
	whatsappNumber: '919028743575',
	serviceAreas: ['Pune', 'Mumbai', 'New Mumbai'],
	streetAddress: '',
	postalCode: '',
	addressLocality: 'Pune',
	addressRegion: 'Maharashtra',
	geo: {
		latitude: 18.5204,
		longitude: 73.8567,
	},
	openingHoursSpecification: [
		{
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			],
			opens: '00:00',
			closes: '23:59',
		},
	],
	sameAs: [] as string[],
	priceRange: '$$',
	enableStickyActions: true,
	formEndpoint: 'https://api.your-domain.com/api-submit-enquiry.php',
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
		ogImage: '',
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
	routeLandings: [
		{
			slug: 'pune-to-mumbai-taxi',
			title: 'Pune to Mumbai Taxi & Cab',
			description:
				'Book Pune to Mumbai taxi and one-way cab with Innova, Ertiga, or Dzire. Reliable intercity pickup, airport-friendly timing, and WhatsApp booking.',
			path: '/routes/pune-to-mumbai-taxi/',
			keywords: [
				'Pune to Mumbai taxi',
				'Pune Mumbai cab',
				'Pune to Mumbai one way taxi',
				'Pune Mumbai innova taxi',
			],
			h1: 'Pune to Mumbai Taxi & One-Way Cab',
			lead: 'Comfortable intercity taxis from Pune to Mumbai with professional drivers, clean cars, and flexible pickup points across Pune.',
			highlights: [
				{
					title: 'Popular for business & family travel',
					body: 'Ideal for meetings, relocations, and airport connections with luggage-friendly vehicles.',
				},
				{
					title: 'Vehicle choice',
					body: 'Toyota Innova SUV, Maruti Ertiga MUV, and Swift Dzire sedan based on group size and budget.',
				},
				{
					title: 'Return options',
					body: 'Pair with our Mumbai return package or book Mumbai to Pune taxi for the reverse leg.',
				},
			],
			relatedLinks: [
				{ label: 'Mumbai return package', href: '/services/mumbai-return/' },
				{ label: 'Our fleet', href: '/fleet/' },
				{ label: 'Airport transfers', href: '/services/airport-transfers/' },
			],
			faq: [
				{
					question: 'Do you provide Pune to Mumbai taxi at night?',
					answer: 'Yes. Night departures are available with advance booking so we can confirm driver availability.',
				},
				{
					question: 'Can I book a one-way Pune Mumbai cab?',
					answer: 'Yes. One-way and return packages are available. Share your date, time, and pickup for a quick quote.',
				},
				{
					question: 'Which car is best for Pune Mumbai highway travel?',
					answer: 'Innova and Ertiga are popular for comfort on long highway rides; Dzire works well for smaller groups.',
				},
			],
		},
		{
			slug: 'mumbai-airport-drop',
			title: 'Mumbai Airport Drop Taxi',
			description:
				'Book Mumbai airport drop taxi from Pune or Mumbai locations. Timely drop to BOM with sedan, MUV, or SUV options and night-hour support.',
			path: '/routes/mumbai-airport-drop/',
			keywords: [
				'Mumbai airport drop',
				'taxi to Mumbai airport',
				'BOM airport drop',
				'Pune to Mumbai airport taxi',
			],
			h1: 'Mumbai Airport Drop Taxi (BOM)',
			lead: 'Plan a stress-free drop to Chhatrapati Shivaji Maharaj International Airport with punctual pickup and flight-time coordination.',
			highlights: [
				{
					title: 'Flight-time alignment',
					body: 'Share your terminal and departure time—we plan buffer for city traffic and airport entry.',
				},
				{
					title: 'From Pune or Mumbai',
					body: 'Intercity drops from Pune and local drops from Mumbai; ideal for early morning flights.',
				},
				{
					title: 'Luggage-friendly fleet',
					body: 'Innova and Ertiga suit families with bags; Dzire fits light travelers.',
				},
			],
			relatedLinks: [
				{ label: 'Pune airport taxi', href: '/routes/pune-airport-taxi/' },
				{ label: 'Airport transfer packages', href: '/services/airport-transfers/' },
				{ label: 'Contact & book', href: '/contact/' },
			],
			faq: [
				{
					question: 'Do you drop at Mumbai airport late night?',
					answer: 'Yes. Night drops are supported with prior booking so we can assign an available driver.',
				},
				{
					question: 'Can you pick up from Pune for a Mumbai airport drop?',
					answer: 'Yes. Share your pickup address in Pune and flight details for a door-to-airport quote.',
				},
				{
					question: 'Which vehicle should I choose for airport drop?',
					answer: 'Choose Innova or Ertiga for more luggage; Dzire is ideal for solo or light luggage trips.',
				},
			],
		},
		{
			slug: 'pune-airport-taxi',
			title: 'Pune Airport Taxi Pickup & Drop',
			description:
				'Pune Airport (PNQ) taxi for day and night pickup and drop. Book Innova, Ertiga, or Dzire with WhatsApp or call for quick confirmation.',
			path: '/routes/pune-airport-taxi/',
			keywords: [
				'Pune airport taxi',
				'PNQ pickup taxi',
				'Pune airport drop night',
				'Pune airport cab',
			],
			h1: 'Pune Airport Taxi (PNQ) Pickup & Drop',
			lead: 'Reliable PNQ transfers with meet-at-airport pickup options and timely drops for domestic and international flights.',
			highlights: [
				{
					title: 'Day & night coverage',
					body: 'Early morning and late-night PNQ pickups available with advance booking.',
				},
				{
					title: 'City & intercity',
					body: 'Connect PNQ with Pune city, Mumbai, or Navi Mumbai routes in one booking flow.',
				},
				{
					title: 'Clear communication',
					body: 'WhatsApp updates for driver details and pickup point alignment.',
				},
			],
			relatedLinks: [
				{ label: 'Mumbai airport drop', href: '/routes/mumbai-airport-drop/' },
				{ label: 'All airport services', href: '/services/airport-transfers/' },
				{ label: 'Fleet & vehicle types', href: '/fleet/' },
			],
			faq: [
				{
					question: 'Is Pune airport pickup available at night?',
					answer: 'Yes. Night-hour PNQ pickups are available when booked in advance.',
				},
				{
					question: 'Can I book Pune airport to Mumbai in one taxi?',
					answer: 'Yes. Mention PNQ pickup and Mumbai drop for a combined intercity quote.',
				},
				{
					question: 'What details should I share for PNQ pickup?',
					answer: 'Flight number, landing time, passenger count, and luggage helps us assign the right vehicle.',
				},
			],
		},
		{
			slug: 'new-mumbai-pune-taxi',
			title: 'New Mumbai (Navi Mumbai) to Pune Taxi',
			description:
				'Book New Mumbai to Pune taxi and Pune to Navi Mumbai cab. One-way and return-friendly options with SUV, MUV, and sedan fleet.',
			path: '/routes/new-mumbai-pune-taxi/',
			keywords: [
				'Navi Mumbai to Pune taxi',
				'New Mumbai to Pune cab',
				'Pune to Navi Mumbai taxi',
				'Kharghar to Pune taxi',
			],
			h1: 'New Mumbai (Navi Mumbai) ↔ Pune Taxi',
			lead: 'Intercity cabs connecting Navi Mumbai and Pune for work, airport, and family travel with comfortable highway vehicles.',
			highlights: [
				{
					title: 'Both directions',
					body: 'Book New Mumbai to Pune or Pune to New Mumbai with the same fleet standards.',
				},
				{
					title: 'Corporate & family friendly',
					body: 'Popular for Vashi, Nerul, Kharghar, and Panvel corridor pickups.',
				},
				{
					title: 'Tie-in routes',
					body: 'Combine with Pune–Mumbai runs or airport drops when you share full itinerary.',
				},
			],
			relatedLinks: [
				{ label: 'Pune to Mumbai taxi', href: '/routes/pune-to-mumbai-taxi/' },
				{ label: 'Mumbai return package', href: '/services/mumbai-return/' },
				{ label: 'Enquiry form', href: '/contact/' },
			],
			faq: [
				{
					question: 'Do you cover Kharghar and Vashi pickups?',
					answer: 'Yes. Share your exact pickup pin for Navi Mumbai so we can plan route and timing.',
				},
				{
					question: 'Can I book a sedan for Navi Mumbai to Pune?',
					answer: 'Yes. Dzire is available for smaller groups; choose Innova or Ertiga for extra space.',
				},
				{
					question: 'Is same-day return possible?',
					answer: 'Often yes, depending on timing. Mention return time for a Mumbai return style quote.',
				},
			],
		},
	] satisfies RouteLandingItem[],
};

export type SeoMeta = {
	title: string;
	description: string;
	path: string;
};
