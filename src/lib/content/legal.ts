/**
 * Legal pages (SiteContent.txt, Section 4, "=== LEGAL ===").
 * Reproduced as given. Do not rewrite their meaning.
 * The Terms & Conditions body is placeholder text; keep the section headings.
 */
import type { LegalDoc } from './types';

const lorem1 =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const lorem2 =
	'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const privacyPolicy: LegalDoc = {
	seo: {
		title: 'Privacy Policy | Proxie Studio',
		description:
			'How Proxie Studio collects, uses and protects your personal information when you visit our website or use our services.'
	},
	title: 'Privacy Policy',
	parts: [
		{
			blocks: [
				{
					paragraphs: [
						'At Proxie Studio, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use and safeguard your data when you visit our website or use our services.'
					]
				},
				{
					heading: '1. Information we collect',
					items: [
						{
							title: 'Personal information',
							text: 'When you register on our website, subscribe to our newsletter or participate in our community forums, we may collect personal information such as your name, email address and any other information you provide voluntarily.'
						},
						{
							title: 'Usage data',
							text: 'We may also collect non-personal information about how you interact with our website and services, including your IP address, browser type, device information and pages visited.'
						}
					]
				},
				{
					heading: '2. How we use your information',
					paragraphs: ['We use the information we collect for the following purposes:'],
					items: [
						'To provide and improve our website and services.',
						'To personalise your experience and customise the content you see.',
						'To communicate with you about updates, promotions and other relevant information.',
						'To analyse trends and user behaviour to enhance our offerings and user experience.',
						'To comply with legal requirements and enforce our terms of service.'
					]
				},
				{
					heading: '3. Data security',
					paragraphs: [
						'We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.'
					]
				},
				{
					heading: '4. Sharing of information',
					paragraphs: [
						'We do not sell, trade or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy or as required by law. We may share your information with trusted third-party service providers who assist us in operating our website, conducting business or servicing you.'
					]
				},
				{
					heading: '5. Cookies',
					paragraphs: [
						'We use cookies and similar technologies to collect information about your browsing behaviour and preferences. You can choose to disable cookies in your browser settings, but some features of our website may not function properly if you do so.'
					]
				},
				{
					heading: '6. Your rights',
					paragraphs: [
						'You have the right to access, correct or delete your personal information at any time. You may also opt out of receiving marketing communications from us by following the unsubscribe instructions included in our emails.'
					]
				},
				{
					heading: '7. Changes to this policy',
					paragraphs: [
						'We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page, and the effective date will be updated accordingly. We encourage you to review this Privacy Policy periodically.'
					]
				},
				{
					heading: '8. Contact us',
					paragraphs: [
						'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at enquiries@weareproxie.com.'
					]
				},
				{
					paragraphs: [
						'By using our website and services, you consent to the terms of this Privacy Policy.'
					]
				}
			]
		}
	]
};

export const terms: LegalDoc = {
	seo: {
		title: 'Terms & Conditions | Proxie Studio',
		description: 'The terms and conditions that govern your use of the Proxie Studio website.'
	},
	title: 'Terms & Conditions',
	parts: [
		{
			blocks: [
				{ paragraphs: [lorem1] },
				{ heading: '1. Use of Proxie', paragraphs: [lorem2] },
				{ heading: '2. User accounts', paragraphs: [lorem1] },
				{ heading: '3. Content ownership', paragraphs: [lorem2] },
				{ heading: '4. Intellectual property', paragraphs: [lorem1] },
				{ heading: '5. Limitation of liability', paragraphs: [lorem2] },
				{ heading: '6. Indemnification', paragraphs: [lorem1] },
				{ heading: '7. Governing law', paragraphs: [lorem2] },
				{ heading: '8. Changes to these terms', paragraphs: [lorem1] },
				{ heading: '9. Contact us', paragraphs: [lorem2] }
			]
		}
	]
};

export const blindCompanionPrivacy: LegalDoc = {
	seo: {
		title: 'Blind Companion Privacy Policy | Proxie Studio',
		description:
			'How Proxie Studio collects, uses and protects your information when you use the Blind Companion app on iOS or Android.'
	},
	title: 'Blind Companion – Privacy Policy',
	parts: [
		{
			blocks: [
				{
					paragraphs: [
						'This Privacy Policy describes how Proxie Studio (“we”, “our” or “us”) collects, uses and protects your information when you use Blind Companion (the “App”) on iOS or Android devices. The App is an AI-powered visual assistant designed to help users of all ages understand their surroundings. By downloading or using the App on any platform, you agree to this Privacy Policy. Parents and guardians are encouraged to review this policy with their children.'
					]
				},
				{
					heading: '1. Information we collect',
					itemsAsSubsections: true,
					items: [
						{
							title: '1.1 Camera and image data',
							text: 'The App requires camera access to capture images for AI-powered analysis. Images are transmitted in real time to Google’s Gemini API for visual processing, are not stored on Proxie Studio’s servers at any time, and are discarded immediately after an AI response is generated. We do not retain, sell or share your images with any party beyond what is required for real-time AI processing. This applies equally on iOS and Android.'
						},
						{
							title: '1.2 Microphone and speech data (STT)',
							text: 'The App uses your device’s microphone to capture spoken queries. Audio is converted to text using on-device or platform-provided speech-to-text services (Apple Speech framework on iOS, Google Speech-to-Text on Android) and sent as text only to the Gemini API. Raw audio is never transmitted to or stored by Proxie Studio and is not retained by us in any form after the query is processed.'
						},
						{
							title: '1.3 Text-to-speech (TTS) output',
							text: 'AI responses are read aloud using your device’s built-in text-to-speech engine (AVSpeechSynthesizer on iOS, Android TTS API on Android). This happens locally on your device. We do not collect, transmit or store TTS audio.'
						},
						{
							title: '1.4 Account information (via Supabase)',
							text: 'When you create an account, we collect and securely store through Supabase your full name, email address, account creation date and a unique user ID (UUID). Passwords are never stored in plain text. All authentication is handled securely by Supabase (supabase.com/privacy).'
						},
						{
							title: '1.5 Subscription and purchase data (via RevenueCat)',
							text: 'Subscription management is handled by RevenueCat on both platforms. Data collected includes subscription plan (monthly or annual), subscription status (active, expired, cancelled), purchase history and entitlements, and platform identifier (Apple App Store or Google Play Store). We do not collect or store payment card details. All billing is processed by Apple (iOS) or Google (Android). See revenuecat.com/privacy.'
						},
						{
							title: '1.6 Usage and diagnostic data',
							text: 'We may collect anonymised, non-identifiable data such as app version, device type, operating system and crash logs to improve app stability. This data cannot be linked to individual users and is handled consistently across iOS and Android.'
						}
					]
				},
				{
					heading: '2. How we use your information',
					paragraphs: ['We use collected information to:'],
					items: [
						'Power the App’s core features (image analysis, speech input, voice responses) on iOS and Android.',
						'Authenticate your identity and manage your account.',
						'Manage your subscription and access to premium features.',
						'Improve App performance and reliability across platforms.',
						'Respond to user support requests.',
						'Comply with applicable laws and platform policies.'
					],
					closing:
						'We do not sell, rent or share your personal information with third parties for advertising or marketing purposes.'
				},
				{
					heading: '3. Platform-specific permissions',
					itemsAsSubsections: true,
					items: [
						{
							title: '3.1 iOS (Apple App Store)',
							text: 'The App requests Camera (to capture images for AI analysis), Microphone (to capture spoken queries) and Speech Recognition (to convert spoken input to text). Permission prompts are displayed by the operating system. You may revoke any permission at any time via Settings → Blind Companion on your iPhone or iPad.'
						},
						{
							title: '3.2 Android (Google Play Store)',
							text: 'The App requests CAMERA (to capture images for AI analysis), RECORD_AUDIO (to capture spoken queries) and INTERNET (to communicate with the Gemini API, Supabase and RevenueCat). You may revoke any permission at any time via Settings → Apps → Blind Companion → Permissions.'
						}
					],
					closing:
						'Revoking camera, microphone or speech permissions will disable the corresponding features of the App on either platform.'
				},
				{
					heading: '4. Third-party services',
					paragraphs: [
						'The App integrates with the following third-party providers on iOS and Android. Each provider operates under its own terms and privacy policies. We are not responsible for the data practices of these third-party services.'
					],
					items: [
						{
							title: 'Google Gemini API',
							text: 'AI image and text analysis (policies.google.com/privacy)'
						},
						{
							title: 'Supabase',
							text: 'user authentication and account storage (supabase.com/privacy)'
						},
						{
							title: 'RevenueCat',
							text: 'subscription management, iOS and Android (revenuecat.com/privacy)'
						},
						{
							title: 'Apple App Store',
							text: 'iOS payment processing (apple.com/legal/privacy)'
						},
						{
							title: 'Google Play Store',
							text: 'Android payment processing (policies.google.com/privacy)'
						}
					]
				},
				{
					heading: '5. Account deletion and data removal',
					itemsAsSubsections: true,
					items: [
						{
							title: '5.1 How to delete your account',
							text: 'You can delete your account at any time directly within the App on iOS and Android: Profile → Delete Account. No email, phone call or external website is required. The entire deletion process is completed inside the App.'
						},
						{
							title: '5.2 What happens when you delete your account',
							text: 'Upon confirming deletion, your name, email address and all account data are permanently deleted from Supabase; your unique user ID and account record are removed instantly; and all subscription entitlements are immediately revoked on both platforms. There is no grace period or deferred deletion: data removal is instant and permanent.'
						},
						{
							title: 'Important',
							text: 'Deleting your account in the App does not automatically cancel your App Store or Google Play subscription. You must cancel your subscription separately to stop future billing. iOS: Settings → [Your Name] → Subscriptions → Blind Companion → Cancel Subscription. Android: Google Play Store → Profile → Payments & Subscriptions → Subscriptions → Blind Companion → Cancel.'
						},
						{
							title: '5.3 Your other data rights',
							text: 'Depending on your jurisdiction, you may have the right to access, correct or request a copy of your personal data. To exercise these rights, contact us using the details below.'
						}
					]
				},
				{
					heading: '6. Children’s privacy',
					paragraphs: [
						'Blind Companion is designed for users of all ages, including children. Proxie Studio is committed to protecting the privacy of younger users.'
					],
					items: [
						'We do not knowingly collect personal information from children under 13 beyond what is required for account creation (name and email).',
						'We do not use any user’s data, including children’s, for advertising, profiling or any secondary purpose.',
						'Parents or guardians may contact us at any time to review, correct or delete their child’s account data.',
						'All data, regardless of user age, is protected equally under this policy.'
					],
					closing:
						'If you believe we have collected data from a child without appropriate consent, please contact us immediately and we will delete it promptly.'
				},
				{
					heading: '7. Data security',
					paragraphs: [
						'Proxie Studio implements reasonable technical and organisational safeguards to protect your information, including encrypted data transmission (HTTPS/TLS) for all communications on iOS and Android, Supabase row-level security for database access control, and no permanent storage of image, audio or biometric data on our servers. No method of electronic transmission or storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.'
					]
				},
				{
					heading: '8. Changes to this policy',
					paragraphs: [
						'We may update this Privacy Policy from time to time. The effective date at the top reflects the most recent revision. Continued use of the App on any platform after changes are posted constitutes your acceptance of the updated policy. We encourage you to review this page periodically.'
					]
				},
				{
					heading: '9. Contact',
					paragraphs: [
						'If you have questions, concerns or data requests regarding this Privacy Policy, please contact Proxie Studio:'
					],
					items: [
						{ title: 'Email', text: 'enquiries@weareproxie.com' },
						{ title: 'App', text: 'Blind Companion' },
						{ title: 'Company', text: 'Proxie Studio' },
						{ title: 'Address', text: 'H.M-107 Jamalpur Colony, Ludhiana 141010, Punjab, India' },
						{ title: 'Website', text: 'https://proxiestudio.com/' }
					]
				}
			]
		}
	]
};

export const sessionPilotPrivacy: LegalDoc = {
	seo: {
		title: 'Session Pilot Privacy Policy & Terms | Proxie Studio',
		description:
			'How the Session Pilot app collects, uses and protects your data, and the terms that apply when you use it.'
	},
	title: 'Session Pilot – Privacy Policy',
	sub: 'App: Session Pilot · Company: Proxie Studio Pvt. Ltd. · Contact: enquiries@weareproxie.com',
	parts: [
		{
			blocks: [
				{
					heading: '1. Introduction',
					paragraphs: [
						'Proxie Studio Pvt. Ltd. (“we”, “us”, “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use and protect your personal information when you use our mobile application.'
					]
				},
				{
					heading: '2. Information we collect',
					itemsAsSubsections: true,
					items: [
						{
							title: 'a. Audio recordings',
							text: 'We access the device’s microphone to capture voice input for transcription and note generation. Audio is processed through secure third-party services (e.g. Groq) and is not stored permanently.'
						},
						{
							title: 'b. Transcriptions and notes',
							text: 'We store transcribed text and generated notes so you can view, edit and manage them at any time.'
						},
						{
							title: 'c. Google authentication',
							text: 'When you sign in with Google (through Supabase), we collect your full name, email address, Google user ID and profile image (avatar). This data is used exclusively to authenticate you and personalise your experience in the app.'
						},
						{
							title: 'd. Google Calendar access',
							text: 'To enable calendar-linked note organisation, we collect event titles, start and end times, and event descriptions. Calendar data is used solely to associate notes with meetings and improve organisational efficiency.'
						},
						{
							title: 'e. Device permissions',
							text: 'The app may request access to the microphone (for audio capture), notifications (to notify you when notes are available) and images (to support image uploads to your notes).'
						}
					]
				},
				{
					heading: '3. How we use your data',
					items: [
						'Convert audio into text and structured notes',
						'Link notes to Google Calendar events',
						'Authenticate and personalise your user session',
						'Display your name and profile image within the app',
						'Notify you about completed transcription or session status'
					]
				},
				{
					heading: '4. Third-party services',
					paragraphs: [
						'We use reputable services to enhance app functionality. These services process only the data required for their function and follow strict security protocols.'
					],
					items: [
						{ title: 'Groq', text: 'audio transcription and AI-based note generation' },
						{ title: 'Supabase', text: 'authentication and secure cloud data management' }
					]
				},
				{
					heading: '5. Data retention',
					items: [
						{ title: 'Audio', text: 'not stored after transcription is complete' },
						{ title: 'Notes and transcriptions', text: 'retained until you delete them' },
						{
							title: 'Calendar and profile information',
							text: 'retained for as long as your account is active'
						}
					]
				},
				{
					heading: '6. Data security',
					paragraphs: [
						'We use encryption, secure APIs and controlled access to safeguard your information against unauthorised access or loss.'
					]
				},
				{
					heading: '7. User rights',
					items: [
						'View, modify or delete your notes',
						'Delete your account at any time',
						'Request removal of your profile data',
						'Revoke permissions through your Google account (which may affect app functionality)'
					]
				},
				{
					heading: '8. Children’s privacy',
					paragraphs: [
						'This app is not intended for users under 13 years of age. We do not knowingly collect data from children.'
					]
				},
				{
					heading: '9. Changes to the policy',
					paragraphs: [
						'We may update this Privacy Policy periodically. Material changes will be communicated by email or in-app notification.'
					]
				},
				{
					heading: '10. Contact',
					paragraphs: [
						'If you have any questions about this policy, please contact us at enquiries@weareproxie.com.'
					]
				}
			]
		},
		{
			heading: 'Session Pilot – Terms and Conditions',
			intro:
				'App: Session Pilot. Company: Proxie Studio Pvt. Ltd. Contact: enquiries@weareproxie.com.',
			blocks: [
				{
					heading: '1. Acceptance of terms',
					paragraphs: [
						'By using Session Pilot, you agree to these Terms and Conditions. If you do not agree, please do not use the application.'
					]
				},
				{
					heading: '2. Eligibility and account creation',
					paragraphs: [
						'To use the application, you must be at least 13 years old, sign in with your Google account, and grant all required permissions (e.g. microphone, calendar access). During sign-in, we collect your Google profile information, including your profile image.'
					]
				},
				{
					heading: '3. Application features',
					paragraphs: [
						'Session Pilot enables users to record and transcribe audio, generate and manage AI-powered notes, view personalised information within the app, and receive in-app notifications related to session status.'
					]
				},
				{
					heading: '4. Permissions required',
					paragraphs: [
						'Microphone access (for audio recording), calendar access (for linking notes to events), Google profile access (for personalisation and identification), image access (for uploading visual content) and notification access (for session updates). Denying essential permissions may prevent access to core features.'
					]
				},
				{
					heading: '5. User responsibilities',
					paragraphs: [
						'You agree not to use the application for unlawful purposes; upload offensive, harmful or malicious content; reverse-engineer, tamper with or exploit the platform; or infringe any third-party intellectual property rights.'
					]
				},
				{
					heading: '6. AI-generated content',
					paragraphs: [
						'Notes and summaries are AI-generated and may contain inaccuracies. Verify information before relying on it for critical decisions.'
					]
				},
				{
					heading: '7. Intellectual property',
					paragraphs: [
						'You retain ownership of your audio, notes and calendar content. Proxie Studio Pvt. Ltd. retains ownership of all source code, algorithms and designs related to the app.'
					]
				},
				{
					heading: '8. Account termination',
					paragraphs: [
						'We reserve the right to suspend or terminate accounts if users violate these Terms, misuse app functionality, or revoke permissions the app needs to function.'
					]
				},
				{
					heading: '9. Limitation of liability',
					paragraphs: [
						'We are not liable for errors in AI-generated notes, temporary service interruptions, or data loss caused by user actions or permission changes.'
					]
				},
				{
					heading: '10. Changes to terms',
					paragraphs: [
						'We may update these Terms from time to time. Continued use of the app indicates acceptance of the updated Terms.'
					]
				},
				{
					heading: '11. Governing law',
					paragraphs: [
						'These Terms are governed by the laws of the Republic of India. Any disputes are subject to the jurisdiction of Indian courts.'
					]
				},
				{
					heading: '12. Contact',
					paragraphs: ['For support or legal questions, contact enquiries@weareproxie.com.']
				}
			]
		}
	]
};
