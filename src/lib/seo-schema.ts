import { siteConfig } from '../site-config';

type BreadcrumbItem = { name: string; path: string };

export function absoluteUrl(path: string): string {
	return new URL(path, siteConfig.siteUrl).toString();
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path),
		})),
	};
}

export function buildLocalBusinessJsonLd() {
	const c = siteConfig;
	const address: Record<string, unknown> = {
		'@type': 'PostalAddress',
		addressLocality: c.addressLocality,
		addressRegion: c.addressRegion,
		addressCountry: 'IN',
	};
	if (c.streetAddress) address.streetAddress = c.streetAddress;
	if (c.postalCode) address.postalCode = c.postalCode;

	const entity: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': ['LocalBusiness', 'TaxiService'],
		name: c.businessName,
		image: [c.seo.ogImage || `${c.siteUrl.replace(/\/$/, '')}/favicon.svg`],
		url: c.siteUrl.replace(/\/$/, ''),
		telephone: c.phoneDisplay,
		priceRange: c.priceRange,
		address,
		areaServed: c.serviceAreas.map((name) => ({ '@type': 'City', name })),
	};

	if (c.geo?.latitude != null && c.geo?.longitude != null) {
		entity.geo = {
			'@type': 'GeoCoordinates',
			latitude: c.geo.latitude,
			longitude: c.geo.longitude,
		};
	}

	if (c.openingHoursSpecification?.length) {
		entity.openingHoursSpecification = c.openingHoursSpecification;
	}

	if (c.sameAs?.length) {
		entity.sameAs = c.sameAs;
	}

	return entity;
}

export function buildWebSiteJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteConfig.businessName,
		url: siteConfig.siteUrl.replace(/\/$/, ''),
		publisher: {
			'@type': 'Organization',
			name: siteConfig.businessName,
			url: siteConfig.siteUrl.replace(/\/$/, ''),
		},
	};
}
