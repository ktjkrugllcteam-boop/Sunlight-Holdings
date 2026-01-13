import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.portfolio': 'Portfolio',
    'nav.investment': 'Approche d\'Investissement',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.headline': 'Redéfinir l\'Immobilier de Luxe en Afrique de l\'Ouest',
    'hero.subheadline': 'Acquisitions stratégiques. Excellence du design. Création de valeur à long terme.',
    'hero.cta': 'Explorer Notre Portfolio',
    'hero.scroll': 'Défiler',
    
    // Company Intro
    'intro.title': 'Notre Vision',
    'intro.text': 'Sunlight Holdings SARL est une société d\'investissement immobilier privée spécialisée dans l\'acquisition et le développement de propriétés de prestige en Afrique de l\'Ouest. Nous combinons une expertise internationale avec une connaissance approfondie du marché local pour créer des espaces exceptionnels qui génèrent une valeur durable.',
    
    // Portfolio Preview
    'portfolio.title': 'Notre Portfolio',
    'portfolio.subtitle': 'Chaque propriété de notre portfolio est sélectionnée pour son potentiel à offrir l\'excellence du design, un positionnement premium et une appréciation de valeur à long terme.',
    'portfolio.viewAll': 'Voir le Portfolio Complet',
    'portfolio.viewDetails': 'Voir les Détails',
    
    // Investment Philosophy
    'philosophy.title': 'Notre Philosophie d\'Investissement',
    'philosophy.pillar1.title': 'Excellence du Design',
    'philosophy.pillar1.text': 'Chaque acquisition reflète notre engagement envers la distinction architecturale et les finitions premium.',
    'philosophy.pillar2.title': 'Positionnement Stratégique',
    'philosophy.pillar2.text': 'Nous ciblons les corridors à forte croissance et les marchés de luxe émergents.',
    'philosophy.pillar3.title': 'Vision à Long Terme',
    'philosophy.pillar3.text': 'Notre stratégie de détention privilégie l\'appréciation durable plutôt que les gains à court terme.',
    
    // Leadership
    'leadership.title': 'Direction Expérimentée',
    'leadership.text': 'Notre équipe de direction combine des décennies d\'expérience sur les marchés immobiliers mondiaux avec un engagement profond envers le Sénégal et la région ouest-africaine.',
    'leadership.learnMore': 'En Savoir Plus',
    
    // Contact CTA
    'contact.title': 'Intéressé par des Opportunités de Partenariat?',
    'contact.subtitle': 'Sunlight Holdings accueille les demandes de partenaires potentiels, d\'investisseurs et de collaborateurs partageant notre engagement envers l\'excellence.',
    'contact.cta': 'Nous Contacter',
    
    // Footer
    'footer.tagline': 'Investissement Immobilier de Luxe en Afrique de l\'Ouest',
    'footer.location': 'Dakar, Sénégal',
    'footer.rights': 'Tous droits réservés.',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions d\'Utilisation',
    
    // About Page
    'about.hero.title': 'Construire les Monuments de Demain',
    'about.philosophy.title': 'Notre Philosophie',
    'about.philosophy.text1': 'Sunlight Holdings SARL a été fondée sur une conviction simple : l\'Afrique de l\'Ouest mérite un développement immobilier de classe mondiale. Alors que la région émerge comme une force économique mondiale, les investisseurs et résidents exigeants demandent de plus en plus des propriétés répondant aux standards internationaux de design, de construction et d\'habitabilité.',
    'about.philosophy.text2': 'Nous comblons ce fossé. Notre équipe combine des décennies d\'expérience sur les marchés immobiliers mondiaux—de Dubaï à Londres en passant par San Juan—avec un engagement profond envers le Sénégal et la région ouest-africaine. Nous comprenons à la fois ce à quoi ressemble l\'excellence et comment la réaliser dans ce contexte de marché unique.',
    'about.philosophy.text3': 'Chaque propriété de notre portfolio reflète cette double perspective : informée mondialement, enracinée localement.',
    'about.leadership.title': 'Direction',
    'about.leadership.role': 'Fondateur & Directeur Général',
    'about.leadership.credentials': 'MBA, IE Business School Madrid • MSc, Oxford Saïd Business School • Ancien gestionnaire de portfolio, Al Habtoor Group (Dubaï) - Portfolio immobilier de 500M$',
    'about.whyAfrica.title': 'Pourquoi l\'Afrique de l\'Ouest',
    'about.whyAfrica.text1': 'Le Sénégal et l\'Afrique de l\'Ouest représentent l\'une des opportunités d\'investissement immobilier les plus convaincantes au monde. L\'urbanisation rapide, une classe moyenne croissante, l\'augmentation des investissements directs étrangers et le développement des infrastructures créent une demande soutenue pour des logements et espaces commerciaux de qualité.',
    'about.whyAfrica.text2': 'Pourtant, l\'offre de propriétés véritablement premium reste limitée. Ce déséquilibre offre-demande, combiné à des tendances démographiques favorables et une gouvernance améliorée, crée des conditions exceptionnelles pour les investisseurs patients et axés sur la qualité.',
    'about.whyAfrica.text3': 'Sunlight Holdings est positionnée pour saisir cette opportunité grâce à une acquisition disciplinée, un développement réfléchi et une gestion à long terme d\'actifs exceptionnels.',
    
    // Portfolio Page
    'portfolio.page.title': 'Notre Portfolio',
    'portfolio.page.intro': 'Chaque propriété de notre portfolio est sélectionnée pour son potentiel à offrir l\'excellence du design, un positionnement premium et une appréciation de valeur à long terme.',
    'portfolio.platinum.name': 'Platinum Edge',
    'portfolio.platinum.location': 'Almadies, Dakar, Sénégal',
    'portfolio.platinum.description': 'Appartement de prestige de 4 chambres avec vue panoramique sur l\'océan et le Monument de la Renaissance Africaine. 4,500,000 FCFA/mois.',
    'portfolio.platinum.price': '4,500,000 FCFA/mois',
    'portfolio.platinum.specs': '4 Chambres • 3 Salles de Bain • Vue Océan Panoramique • Grande Terrasse',
    'portfolio.platinum.overview': 'Platinum Edge est une résidence d\'exception de 4 chambres et 3 salles de bain offrant des vues panoramiques sur l\'océan Atlantique et le Monument de la Renaissance Africaine depuis chaque pièce. Dotée d\'une grande terrasse, d\'un salon spacieux et entièrement meublée avec notre design signature, cette propriété représente le summum du luxe résidentiel à Dakar.',
    'portfolio.platinum.features': 'Chaque chambre bénéficie de vues imprenables. Le système d\'éclairage LED ambiant signature, les surfaces en marbre, les luminaires importés et l\'art contemporain africain créent une atmosphère unique. Entièrement meublée et équipée, prête à accueillir les locataires les plus exigeants—dirigeants, diplomates et particuliers fortunés.',
    'portfolio.platinum.living': 'L\'espace de vie présente un mur média personnalisé avec éclairage ambiant intégré, créant une atmosphère de calme sophistiqué. Les fenêtres du sol au plafond habillées de draperies premium filtrent la lumière naturelle tout en préservant l\'intimité.',
    'portfolio.platinum.kitchen': 'La cuisine à concept ouvert met en valeur des armoires d\'inspiration italienne en noir mat, des comptoirs en marbre et des appareils de qualité professionnelle. Un îlot généreux offre à la fois un espace de préparation et des places assises pour les repas décontractés.',
    'portfolio.platinum.details': 'Dans toute la résidence, des niches architecturales illuminées présentent des sculptures et objets soigneusement sélectionnés, transformant les espaces de circulation en expériences de galerie. La palette de matériaux—béton poli, sol en marbre, panneaux muraux cannelés—crée une continuité visuelle tout en permettant à chaque espace son caractère distinct.',
    'portfolio.platinum.location.title': 'Emplacement',
    'portfolio.platinum.location.text': 'Le quartier des Almadies est le quartier le plus prestigieux de Dakar, abritant des ambassades, des résidences de luxe et des restaurants haut de gamme. La propriété offre un accès facile aux commodités tout en maintenant l\'intimité et l\'exclusivité.',
    'portfolio.inquiries': 'Pour des demandes de partenariat ou d\'investissement concernant cette propriété, veuillez nous contacter.',
    
    // Investment Page
    'investment.hero.title': 'Notre Approche de Création de Valeur',
    'investment.intro.text': 'Sunlight Holdings applique une approche disciplinée et axée sur la qualité à l\'investissement immobilier, combinant rigueur institutionnelle et sensibilité design.',
    'investment.criteria.title': 'Critères d\'Acquisition',
    'investment.criteria.text1': 'Nous nous concentrons sur des emplacements de premier choix dans des corridors de luxe établis ou émergents. Au Sénégal, cela signifie des quartiers comme les Almadies, Ngor et certaines zones du Plateau. Nous recherchons des propriétés avec des fondamentaux solides : construction de qualité ou potentiel de réaménagement, proximité des commodités et infrastructures, et titre de propriété clair.',
    'investment.criteria.text2': 'Le potentiel de design est primordial. Nous acquérons des propriétés qui peuvent être élevées aux plus hauts standards grâce à une rénovation réfléchie ou qui démontrent déjà une distinction architecturale. Nous évitons les produits résidentiels de commodité en faveur d\'actifs avec caractère et différenciation.',
    'investment.criteria.text3': 'Notre période de détention cible est à long terme. Nous ne recherchons pas les retournements rapides ou les jeux spéculatifs. Cette approche patiente nous permet de traverser les cycles de marché, d\'investir correctement dans la qualité et de capturer le plein potentiel d\'appréciation.',
    'investment.development.title': 'Philosophie de Développement',
    'investment.development.text1': 'Lorsque nous développons ou rénovons, nous appliquons des standards internationaux adaptés au contexte local. Cela signifie des matériaux premium sourcés globalement et localement. Des luminaires européens aux côtés de l\'artisanat sénégalais. Un design adapté au climat qui ne sacrifie pas l\'esthétique.',
    'investment.development.text2': 'Intégration de maison intelligente et commodités modernes que les locataires et futurs acheteurs exigeants attendent. Systèmes d\'éclairage ambiant, infrastructure de connectivité haut débit, systèmes de sécurité et appareils premium.',
    'investment.development.text3': 'Art et culture tissés dans l\'expérience de vie. Nous commandons et collectionnons de l\'art contemporain africain, transformant nos propriétés en déclarations culturelles autant qu\'en résidences.',
    'investment.partnership.title': 'Structures de Partenariat',
    'investment.partnership.intro': 'Sunlight Holdings est ouverte aux partenariats stratégiques avec des investisseurs et institutions alignés. Nous offrons :',
    'investment.partnership.jv.title': 'Opportunités de Joint-Venture',
    'investment.partnership.jv.text': 'Co-investissement dans des acquisitions ou développements spécifiques',
    'investment.partnership.dev.title': 'Partenariats de Développement',
    'investment.partnership.dev.text': 'Collaboration avec des propriétaires fonciers et développeurs locaux cherchant à élever leurs projets',
    'investment.partnership.advisory.title': 'Services de Conseil',
    'investment.partnership.advisory.text': 'Aperçu du marché et supervision de projet pour les investisseurs internationaux entrant sur le marché ouest-africain',
    'investment.partnership.outro': 'Les demandes de partenariat sont évaluées sur l\'alignement de la vision, l\'horizon d\'investissement et le potentiel de création de valeur mutuelle.',
    'investment.cta': 'Discuter des Opportunités de Partenariat',
    
    // Contact Page
    'contact.hero.title': 'Connectez-vous avec Nous',
    'contact.intro': 'Sunlight Holdings accueille les demandes de partenaires potentiels, d\'investisseurs et de collaborateurs partageant notre engagement envers l\'excellence dans l\'immobilier ouest-africain.',
    'contact.form.name': 'Nom',
    'contact.form.email': 'Email',
    'contact.form.organization': 'Organisation / Entreprise',
    'contact.form.inquiryType': 'Type de Demande',
    'contact.form.inquiryType.investment': 'Partenariat d\'Investissement',
    'contact.form.inquiryType.jv': 'Joint-Venture',
    'contact.form.inquiryType.general': 'Demande Générale',
    'contact.form.inquiryType.media': 'Média',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Envoyer le Message',
    'contact.form.success': 'Message envoyé avec succès. Nous vous répondrons dans les 48 heures.',
    'contact.direct.title': 'Contact Direct',
    'contact.direct.email': 'Email',
    'contact.direct.location': 'Emplacement',
    'contact.note': 'Nous répondons à toutes les demandes sérieuses dans les 48 heures. Veuillez noter que Sunlight Holdings se concentre sur les partenariats d\'investissement et n\'offre pas de services de gestion immobilière ou de location à court terme.',
    
    // Gallery
    'gallery.title': 'Galerie',
    'gallery.living': 'Espaces de Vie',
    'gallery.kitchen': 'Cuisine',
    'gallery.details': 'Détails Architecturaux',
    'gallery.art': 'Collection d\'Art',
    
    // Virtual Tour
    'virtualTour.button': 'Visite Virtuelle',
    'virtualTour.title': 'Visite Virtuelle Immersive',
    'virtualTour.instruction': 'Cliquez sur les pièces pour naviguer',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.investment': 'Investment Approach',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.headline': 'Redefining Luxury Real Estate in West Africa',
    'hero.subheadline': 'Strategic acquisitions. Design excellence. Long-term value creation.',
    'hero.cta': 'Explore Our Portfolio',
    'hero.scroll': 'Scroll',
    
    // Company Intro
    'intro.title': 'Our Vision',
    'intro.text': 'Sunlight Holdings SARL is a private real estate investment firm focused on acquiring and developing premium properties across West Africa. We combine international expertise with deep local knowledge to create exceptional spaces that deliver lasting value.',
    
    // Portfolio Preview
    'portfolio.title': 'Our Portfolio',
    'portfolio.subtitle': 'Each property in our portfolio is selected for its potential to deliver design excellence, premium positioning, and long-term value appreciation.',
    'portfolio.viewAll': 'View Full Portfolio',
    'portfolio.viewDetails': 'View Details',
    
    // Investment Philosophy
    'philosophy.title': 'Our Investment Philosophy',
    'philosophy.pillar1.title': 'Design Excellence',
    'philosophy.pillar1.text': 'Every acquisition reflects our commitment to architectural distinction and premium finishes.',
    'philosophy.pillar2.title': 'Strategic Positioning',
    'philosophy.pillar2.text': 'We target high-growth corridors and emerging luxury markets.',
    'philosophy.pillar3.title': 'Long-Term Vision',
    'philosophy.pillar3.text': 'Our hold strategy prioritizes sustainable appreciation over short-term gains.',
    
    // Leadership
    'leadership.title': 'Experienced Leadership',
    'leadership.text': 'Our leadership team combines decades of experience in global real estate markets with deep commitment to Senegal and the broader West African region.',
    'leadership.learnMore': 'Learn More',
    
    // Contact CTA
    'contact.title': 'Interested in Partnership Opportunities?',
    'contact.subtitle': 'Sunlight Holdings welcomes inquiries from potential partners, investors, and collaborators who share our commitment to excellence.',
    'contact.cta': 'Contact Us',
    
    // Footer
    'footer.tagline': 'Luxury Real Estate Investment in West Africa',
    'footer.location': 'Dakar, Senegal',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    
    // About Page
    'about.hero.title': 'Building Tomorrow\'s Landmarks',
    'about.philosophy.title': 'Our Philosophy',
    'about.philosophy.text1': 'Sunlight Holdings SARL was founded on a simple conviction: West Africa deserves world-class real estate development. As the region emerges as a global economic force, discerning investors and residents increasingly demand properties that meet international standards of design, construction, and livability.',
    'about.philosophy.text2': 'We bridge this gap. Our team combines decades of experience in global real estate markets—from Dubai to London to San Juan—with deep commitment to Senegal and the broader West African region. We understand both what excellence looks like and how to deliver it in this unique market context.',
    'about.philosophy.text3': 'Every property in our portfolio reflects this dual perspective: globally informed, locally rooted.',
    'about.leadership.title': 'Leadership',
    'about.leadership.role': 'Founder & Managing Director',
    'about.leadership.credentials': 'MBA, IE Business School Madrid • MSc, Oxford Saïd Business School • Former portfolio manager, Al Habtoor Group (Dubai) - $500M real estate portfolio',
    'about.whyAfrica.title': 'Why West Africa',
    'about.whyAfrica.text1': 'Senegal and West Africa represent one of the world\'s most compelling real estate investment opportunities. Rapid urbanization, a growing middle class, increasing foreign direct investment, and infrastructure development are creating sustained demand for quality housing and commercial space.',
    'about.whyAfrica.text2': 'Yet the supply of truly premium properties remains limited. This supply-demand imbalance, combined with favorable demographic trends and improving governance, creates exceptional conditions for patient, quality-focused investors.',
    'about.whyAfrica.text3': 'Sunlight Holdings is positioned to capture this opportunity through disciplined acquisition, thoughtful development, and long-term stewardship of exceptional assets.',
    
    // Portfolio Page
    'portfolio.page.title': 'Our Portfolio',
    'portfolio.page.intro': 'Each property in our portfolio is selected for its potential to deliver design excellence, premium positioning, and long-term value appreciation.',
    'portfolio.platinum.name': 'Platinum Edge',
    'portfolio.platinum.location': 'Almadies, Dakar, Senegal',
    'portfolio.platinum.description': 'Prestigious 4-bedroom apartment with panoramic ocean views and African Renaissance Monument vistas. 4,500,000 FCFA/month (~$7,500 USD).',
    'portfolio.platinum.price': '4,500,000 FCFA/month',
    'portfolio.platinum.specs': '4 Bedrooms • 3 Bathrooms • Panoramic Ocean Views • Large Terrace',
    'portfolio.platinum.overview': 'Platinum Edge is an exceptional 4-bedroom, 3-bathroom residence offering panoramic views of the Atlantic Ocean and the African Renaissance Monument from every room. Featuring a large terrace, spacious living areas, and fully furnished with our signature design, this property represents the pinnacle of luxury residential living in Dakar.',
    'portfolio.platinum.features': 'Every bedroom enjoys stunning views. The signature ambient LED lighting system, marble surfaces, imported fixtures, and curated African contemporary art create a unique atmosphere. Fully furnished and equipped, ready to welcome the most discerning tenants—executives, diplomats, and high-net-worth individuals.',
    'portfolio.platinum.living': 'The living area features a custom media wall with integrated ambient lighting, creating an atmosphere of sophisticated calm. Floor-to-ceiling windows dressed in premium drapery filter natural light while maintaining privacy.',
    'portfolio.platinum.kitchen': 'The open-concept kitchen showcases Italian-inspired cabinetry in matte black, marble countertops, and professional-grade appliances. A generous island provides both preparation space and casual dining seating.',
    'portfolio.platinum.details': 'Throughout the residence, illuminated architectural niches display carefully selected sculptures and objects, transforming circulation spaces into gallery experiences. The material palette—polished concrete, marble flooring, fluted wall panels—creates visual continuity while allowing each space its distinct character.',
    'portfolio.platinum.location.title': 'Location',
    'portfolio.platinum.location.text': 'The Almadies district is Dakar\'s most prestigious neighborhood, home to embassies, luxury residences, and upscale restaurants. The property offers easy access to amenities while maintaining privacy and exclusivity.',
    'portfolio.inquiries': 'For partnership or investment inquiries regarding this property, please contact us.',
    
    // Investment Page
    'investment.hero.title': 'Our Approach to Value Creation',
    'investment.intro.text': 'Sunlight Holdings applies a disciplined, quality-focused approach to real estate investment, combining institutional rigor with design sensibility.',
    'investment.criteria.title': 'Acquisition Criteria',
    'investment.criteria.text1': 'We focus on prime locations within established or emerging luxury corridors. In Senegal, this means neighborhoods like Almadies, Ngor, and select areas of Plateau. We seek properties with strong fundamentals: quality construction or redevelopment potential, proximity to amenities and infrastructure, and clear title.',
    'investment.criteria.text2': 'Design potential is paramount. We acquire properties that can be elevated to the highest standards through thoughtful renovation or that already demonstrate architectural distinction. We avoid commodity residential products in favor of assets with character and differentiation.',
    'investment.criteria.text3': 'Our target hold period is long-term. We are not seeking quick flips or speculative plays. This patient approach allows us to weather market cycles, invest properly in quality, and capture full appreciation potential.',
    'investment.development.title': 'Development Philosophy',
    'investment.development.text1': 'When we develop or renovate, we apply international standards adapted to the local context. This means premium materials sourced globally and locally. European fixtures alongside Senegalese craftsmanship. Climate-appropriate design that doesn\'t sacrifice aesthetics.',
    'investment.development.text2': 'Smart home integration and modern amenities that discerning tenants and future buyers expect. Ambient lighting systems, high-speed connectivity infrastructure, security systems, and premium appliances.',
    'investment.development.text3': 'Art and culture woven into the living experience. We commission and collect African contemporary art, transforming our properties into cultural statements as much as residences.',
    'investment.partnership.title': 'Partnership Structures',
    'investment.partnership.intro': 'Sunlight Holdings is open to strategic partnerships with aligned investors and institutions. We offer:',
    'investment.partnership.jv.title': 'Joint Venture Opportunities',
    'investment.partnership.jv.text': 'Co-investment in specific acquisitions or developments',
    'investment.partnership.dev.title': 'Development Partnerships',
    'investment.partnership.dev.text': 'Collaboration with landowners and local developers seeking to elevate their projects',
    'investment.partnership.advisory.title': 'Advisory Services',
    'investment.partnership.advisory.text': 'Market insight and project oversight for international investors entering the West African market',
    'investment.partnership.outro': 'Partnership inquiries are evaluated on alignment of vision, investment horizon, and mutual value creation potential.',
    'investment.cta': 'Discuss Partnership Opportunities',
    
    // Contact Page
    'contact.hero.title': 'Connect With Us',
    'contact.intro': 'Sunlight Holdings welcomes inquiries from potential partners, investors, and collaborators who share our commitment to excellence in West African real estate.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.organization': 'Organization / Company',
    'contact.form.inquiryType': 'Inquiry Type',
    'contact.form.inquiryType.investment': 'Investment Partnership',
    'contact.form.inquiryType.jv': 'Joint Venture',
    'contact.form.inquiryType.general': 'General Inquiry',
    'contact.form.inquiryType.media': 'Media',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Message sent successfully. We will respond within 48 hours.',
    'contact.direct.title': 'Direct Contact',
    'contact.direct.email': 'Email',
    'contact.direct.location': 'Location',
    'contact.note': 'We respond to all serious inquiries within 48 hours. Please note that Sunlight Holdings focuses on investment partnerships and does not offer property management or short-term rental services.',
    
    // Gallery
    'gallery.title': 'Gallery',
    'gallery.living': 'Living Spaces',
    'gallery.kitchen': 'Kitchen',
    'gallery.details': 'Architectural Details',
    'gallery.art': 'Art Collection',
    
    // Virtual Tour
    'virtualTour.button': 'Virtual Tour',
    'virtualTour.title': 'Immersive Virtual Tour',
    'virtualTour.instruction': 'Click on rooms to navigate',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
