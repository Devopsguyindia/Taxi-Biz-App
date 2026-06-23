import type { RouteLandingItem } from '../site-config';
import { siteConfig } from '../site-config';

export function getRouteLanding(slug: string): RouteLandingItem {
	const landing = siteConfig.routeLandings.find((r) => r.slug === slug);
	if (!landing) {
		throw new Error(`Route landing not found: ${slug}`);
	}
	return landing;
}
