/**
 * Image imports (SiteContent.txt, Section 6: Image map).
 * Client images come from /images; stock photos from src/lib/assets/photos
 * (see PHOTO-CREDITS.md). All are processed by
 * @sveltejs/enhanced-img into responsive AVIF/WebP + fallback sources.
 * The `w` directive lists the widths generated for each srcset.
 *
 * Not used on purpose: images/testimonials/Type-1a.png and Type-1b.png.
 * Both contain baked-in names and job titles that are not in SiteContent.txt,
 * so showing them would attach unsourced names and roles to the testimonials.
 */

import abhishek from '#images/founders/Abhishek_Malhotra.png?w=1120;800;560;400&enhanced';
import aman from '#images/founders/Aman_Malhotra.png?w=1120;800;560;400&enhanced';

import vans from '#images/brands/logo-vans.png?w=480;240&enhanced';
import mclaren from '#images/brands/logo-mclaren.png?w=480;240&enhanced';
import mercedes from '#images/brands/logo-mercedes.png?w=480;240&enhanced';
import daimler from '#images/brands/logo-daimler.png?w=480;240&enhanced';
import bufferleaf from '#images/brands/logo-bufferleaf.png?w=480;240&enhanced';

// Stock photography (CC0 / public domain, see PHOTO-CREDITS.md)
import heroAurora from '#lib/assets/photos/hero-aurora.jpg?w=2400;1600;1100;700&enhanced';
import aboutAurora from '#lib/assets/photos/about-aurora.jpg?w=2400;1600;1100;700&enhanced';
import servicesFiber from '#lib/assets/photos/services-fiber.jpg?w=2400;1600;1100;700&enhanced';
import energy from '#lib/assets/photos/industry-energy.jpg?w=2400;1600;1100;700&enhanced';
import manufacturing from '#lib/assets/photos/industry-manufacturing.jpg?w=2400;1600;1100;700&enhanced';
import retail from '#lib/assets/photos/industry-retail.jpg?w=2400;1600;1100;700&enhanced';
import publicSector from '#lib/assets/photos/industry-public-sector.jpg?w=2400;1600;1100;700&enhanced';
import officeSweden from '#lib/assets/photos/office-sweden.jpg?w=1600;1100;700&enhanced';
import officeIndia from '#lib/assets/photos/office-india.jpg?w=1600;1100;700&enhanced';
import forest from '#lib/assets/photos/sustainability-forest.jpg?w=2400;1600;1100;700&enhanced';
import careersRoom from '#lib/assets/photos/careers-room.jpg?w=2400;1600;1100;700&enhanced';

import erik from '#images/testimonials/Type-2a.jpeg?w=200;112&enhanced';
import kayla from '#images/testimonials/Type2b.jpg?w=224;112&enhanced';
import michelle from '#images/testimonials/Type2c.webp?w=224;112&enhanced';

export const images = {
	founders: { abhishek, aman },
	brands: { vans, mclaren, mercedes, daimler, bufferleaf },
	testimonials: { erik, kayla, michelle },
	photos: {
		heroAurora,
		aboutAurora,
		servicesFiber,
		forest,
		careersRoom,
		industries: { retail, energy, manufacturing, 'public-sector': publicSector },
		offices: { Sweden: officeSweden, India: officeIndia }
	}
} as const;
