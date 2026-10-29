<script lang="ts">
	import Seo from '#lib/components/layout/Seo.svelte';
	import LegalDocument from '#lib/components/sections/LegalDocument.svelte';
	import { blindCompanionPrivacy as doc } from '#lib/content/legal.ts';
</script>

<Seo seo={doc.seo} />

<LegalDocument {doc} />
