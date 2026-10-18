import { ServiceItem, PortfolioItem, TestimonialItem, FaqItem, StudioSettings } from '@/types';

export const siteConfig = {
  name: 'Edy Alves Tattoo',
  tagline: 'Tatuagem Autoral em Black Work e Preto e Cinza em Brasília-DF',
  shortBio: 'Tatuador profissional desde 2018, especialista em traços precisos, sombreamento refinado e projetos personalizados com atendimento exclusivo com hora marcada.',
  sinceYear: 2018,
  
  contact: {
    phone: '(61) 98279-1299',
    phoneRaw: '5561982791299',
    whatsappUrl: 'https://wa.me/5561982791299',
    instagram: '@edyalvestattoo',
    instagramUrl: 'https://instagram.com/edyalvestattoo',
    address: {
      street: 'QNM 18 Conjunto C (ou endereço completo)',
      neighborhood: 'Ceilândia',
      city: 'Brasília',
      state: 'DF',
      cep: '72210-000',
      formatted: 'Ceilândia, Brasília - DF',
    },
    googleMapsUrl: 'https://www.google.com/maps/place/Edy+Alves+Tattoo/@-15.80551,-48.0663675,17z/data=!4m17!1m10!3m9!1s0x24da7f3ed8457a75:0xa9ed780dd3c60218!2sEdy+Alves+Tattoo!8m2!3d-15.80551!4d-48.0663675!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11v0msjj18!3m5!1s0x24da7f3ed8457a75:0xa9ed780dd3c60218!8m2!3d-15.80551!4d-48.0663675!16s%2Fg%2F11v0msjj18',
    googleMapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.0621252192135!2d-48.06894242398573!3d-15.80550998483134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x24da7f3ed8457a75%3A0xa9ed780dd3c60218!2sEdy%20Alves%20Tattoo!5e0!3m2!1spt-BR!2sbr!4v1718000000000!5m2!1spt-BR!2sbr',
    coordinates: {
      latitude: -15.80551,
      longitude: -48.0663675,
    },
    openingHours: 'Segunda a Sábado, das 10h às 20h (Hora marcada)',
  },

  theme: {
    bgDark: '#0D0D0D',
    cardDark: '#161616',
    accentRed: '#E8153B',
    accentRedHover: '#C90F31',
    borderMuted: 'rgba(255, 255, 255, 0.08)',
  },

  stats: [
    { label: 'Anos de Trajetória', value: '6+' },
    { label: 'Sessões Realizadas', value: '1.200+' },
    { label: 'Materiais 100% Descartáveis', value: '100%' },
    { label: 'Satisfação e Avaliações', value: '5.0 ★' },
  ],

  trustBadges: [
    'Tatuador desde 2018',
    'Material 100% descartável e esterilizado',
    'Atendimento exclusivo com hora marcada',
    'Ambiente climatizado e seguro',
  ],

  diferenciais: [
    {
      title: 'TRAÇO LIMPO E PRECISO',
      description: 'Especialista em linhas consistentes, contraste denso e acabamento impecável em cada detalhe anatômico.',
      icon: 'Feather',
    },
    {
      title: 'PROJETO PERSONALIZADO E AUTORAL',
      description: 'Cada tatuagem é criada ou adaptada exclusivamente para respeitar o fluxo do seu corpo e contar a sua história.',
      icon: 'Compass',
    },
    {
      title: 'BIOSSEGURANÇA E HIGIENE TOTAL',
      description: 'Agulhas descartáveis de cartucho lacrado, bancada desinfectada com padrão cirúrgico e registro na ANVISA.',
      icon: 'ShieldCheck',
    },
  ],

  services: [
    {
      id: 'srv-1',
      name: 'BLACK WORK',
      slug: 'tatuagem-nova',
      description: 'Artes de alto contraste, sólidos pretos profundos, pontilhismo e composições geométricas marcantes.',
      startingPrice: 'A partir de R$ 250,00',
      iconName: 'PenTool',
      durationApprox: '2h a 6h por sessão',
    },
    {
      id: 'srv-2',
      name: 'PRETO E CINZA (BLACK & GREY)',
      slug: 'tatuagem-nova',
      description: 'Realismo, estátuas clássicas, animais e retratos com transições suaves de sombra e texturas vivas.',
      startingPrice: 'A partir de R$ 350,00',
      iconName: 'Sparkles',
      durationApprox: '3h a 7h por sessão',
    },
    {
      id: 'srv-3',
      name: 'PROJETOS EXCLUSIVOS / COVER-UP',
      slug: 'cover-up',
      description: 'Criação sob medida do zero ou cobertura estratégica e reforma de tatuagens antigas com camuflagem perfeita.',
      startingPrice: 'Sob consulta personalizada',
      iconName: 'Layers',
      durationApprox: 'Avaliação prévia necessária',
    },
    {
      id: 'srv-4',
      name: 'RETOQUE & MANUTENÇÃO',
      slug: 'retoque',
      description: 'Revitalização de pigmento, alinhamento de traços e restauração do brilho original da sua tatuagem.',
      startingPrice: 'A partir de R$ 150,00',
      iconName: 'RotateCcw',
      durationApprox: '1h a 2h',
    },
  ] as ServiceItem[],

  portfolio: [
    {
      id: 'port-1',
      title: 'Medusa & Serpente Mitológica',
      style: 'Black Work',
      bodyPart: 'Antebraço',
      sessionTime: '4h30',
      imageUrl: '/images/tattoo-medusa.png',
      description: 'Trabalho autoral em Black Work com pontilhismo, textura de escamas detalhadas e contraste denso de sombras.',
      isRealWork: true,
    },
    {
      id: 'port-2',
      title: 'Deusa da Justiça & Folhagens de Louro',
      style: 'Black Work',
      bodyPart: 'Antebraço',
      sessionTime: '5h',
      imageUrl: '/images/tattoo-goddess.jpg',
      description: 'Linhas finas precisas, pontilhismo degradê e sombreamento anatômico inspirado na escultura clássica.',
      isRealWork: true,
    },
    {
      id: 'port-3',
      title: 'Leão Imperial & Relógio Romano',
      style: 'Preto e Cinza',
      bodyPart: 'Antebraço / Braço',
      sessionTime: '6h',
      imageUrl: '/images/tattoo-lion-clock.jpg',
      description: 'Realismo de alto impacto em preto e cinza com pelo detalhado, olhos vívidos e mostrador em perspectiva.',
      isRealWork: false,
    },
    {
      id: 'port-4',
      title: 'Caveira com Peônia & Mandala Geométrica',
      style: 'Black Work',
      bodyPart: 'Ombro / Braço',
      sessionTime: '5h30',
      imageUrl: '/images/tattoo-skull-peony.jpg',
      description: 'Composição de crânio com preenchimento sólido preto, pétalas sombreadas e fundo de mandala pontilhada.',
      isRealWork: false,
    },
    {
      id: 'port-5',
      title: 'Aplicação em Estúdio com Máquina Rotativa',
      style: 'Outros',
      bodyPart: 'Estúdio / Processo',
      sessionTime: 'Em andamento',
      imageUrl: '/images/edy-action.png',
      description: 'Registro do atendimento do Edy Alves em Ceilândia-DF com materiais descartáveis e precisão no traço.',
      isRealWork: true,
    },
    {
      id: 'port-6',
      title: 'Edy Alves Tattoo - Tatuador desde 2018',
      style: 'Outros',
      bodyPart: 'Perfil do Artista',
      sessionTime: 'Trajetória',
      imageUrl: '/images/edy-portrait.png',
      description: 'Foto oficial de Edy Alves no estúdio. Dedicação exclusiva à arte na pele desde 2018 em Ceilândia, Brasília-DF.',
      isRealWork: true,
    },
  ] as PortfolioItem[],

  timeline: [
    {
      step: '01',
      title: 'ESCOLHA A IDEIA E O ESTILO',
      description: 'Defina o tema, estilo (Black Work, Preto e Cinza, etc.), região do corpo e separe referências visuais que você curte.',
    },
    {
      step: '02',
      title: 'AGENDE A DATA E ENVIE REFERÊNCIAS',
      description: 'Preencha o formulário em poucos minutos, selecione o dia e horário de preferência e envie suas fotos de inspiração.',
    },
    {
      step: '03',
      title: 'ALINHAMENTO DO PROJETO E SINAL',
      description: 'O Edy confirma a viabilidade, alinha os detalhes pelo WhatsApp e é feito o pagamento do sinal para reservar o horário.',
    },
    {
      step: '04',
      title: 'SESSÃO E CUIDADOS PÓS-TATTOO',
      description: 'Dia da sessão no estúdio com todo o conforto e biossegurança. Ao final, você recebe a orientação completa para cicatrização perfeita.',
    },
  ],

  testimonials: [
    {
      id: 'test-1',
      clientName: 'Lucas Ferreira',
      rating: 5,
      date: 'Há 2 semanas',
      comment: '[INSERIR DEPOIMENTO REAL - Exemplo: O Edy é surreal! Fez meu fechamento de braço em Black Work com traço impecável e cicatrizou perfeitamente. Atendimento nota 10 em Ceilândia!]',
      tattooDescription: 'Fechamento de antebraço Black Work',
      isRealPlaceholder: true,
    },
    {
      id: 'test-2',
      clientName: 'Mariana Ribeiro',
      rating: 5,
      date: 'Há 1 mês',
      comment: '[INSERIR DEPOIMENTO REAL - Exemplo: Estúdio super limpo, tudo descartável aberto na minha frente. A arte ficou muito melhor do que a referência que eu levei. Recomendo de olhos fechados!]',
      tattooDescription: 'Deusa grega no antebraço',
      isRealPlaceholder: true,
    },
    {
      id: 'test-3',
      clientName: 'Gabriel Souza',
      rating: 5,
      date: 'Há 2 meses',
      comment: '[INSERIR DEPOIMENTO REAL - Exemplo: Primeira tatuagem que fiz e o Edy me deixou super tranquilo. Paciente, cuidadoso e o trabalho em preto e cinza ficou sensacional!]',
      tattooDescription: 'Leão realista no braço',
      isRealPlaceholder: true,
    },
  ] as TestimonialItem[],

  faq: [
    {
      id: 'faq-1',
      category: 'procedimento',
      question: 'Dói muito fazer tatuagem? Quanto tempo dura uma sessão?',
      answer: 'A dor varia conforme a sensibilidade individual e a região do corpo (áreas com mais ossos e terminações nervosas costumam ser mais sensíveis). O Edy utiliza técnicas de aplicação firme e contínua para minimizar o desconforto. Sessões médias duram entre 2 e 5 horas, sempre com pausas confortáveis quando necessário.',
    },
    {
      id: 'faq-2',
      category: 'regras',
      question: 'Qual é a idade mínima para tatuar?',
      answer: 'A idade mínima legal é de 18 anos completos (apresentação de documento oficial com foto é obrigatória). Para jovens a partir de 16 anos, é necessária a presença e autorização formal por escrito dos responsáveis legais com firma reconhecida ou consentimento presencial.',
    },
    {
      id: 'faq-3',
      category: 'cuidados',
      question: 'Quais os cuidados necessários antes e depois da tatuagem?',
      answer: 'Antes da sessão: durma bem, alimente-se antes de vir, hidrate bastante a pele nos dias anteriores e evite consumo excessivo de álcool nas 24h que antecedem. Após a sessão: use filme protetor conforme orientado, lave com sabonete neutro, aplique pomada cicatrizante indicada em camada fina e não retire casquinhas nem se exponha ao sol, piscina ou mar por 20 a 30 dias.',
    },
    {
      id: 'faq-4',
      category: 'agendamento',
      question: 'Como funciona o pagamento do sinal e a política de remarcação?',
      answer: 'Para reservar e travar o horário na agenda do Edy, é solicitado um sinal de reserva (abatido do valor final no dia da sessão). Caso precise remarcar, avise com pelo menos 48h de antecedência pelo WhatsApp para mantermos o seu sinal válido para nova data.',
    },
    {
      id: 'faq-5',
      category: 'procedimento',
      question: 'O Edy faz cobertura de tatuagem antiga (Cover-up)?',
      answer: 'Sim! Projetos de cobertura são executados com análise prévia detalhada da tatuagem antiga, saturação de tinta e formato. Muitas vezes o estilo Black Work ou projetos com contrastes escuros funcionam de forma excepcional para transformar a arte antiga em uma obra nova e impactante.',
    },
    {
      id: 'faq-6',
      category: 'cuidados',
      question: 'O retoque está incluso?',
      answer: 'Caso haja necessidade de retoque decorrente da cicatrização natural, ele pode ser avaliado e agendado no período de 30 a 60 dias após a sessão, desde que os cuidados pós-tatuagem tenham sido seguidos rigorosamente.',
    },
  ] as FaqItem[],

  defaultSettings: {
    workingDays: [1, 2, 3, 4, 5, 6], // Segunda a Sábado
    workingHours: ['10:00', '14:00', '17:00', '19:00'],
    blockedDates: [],
    pixKey: '61982791299',
    pixKeyType: 'Telefone',
    pixBeneficiary: 'Edy Alves Tattoo',
    depositAmount: 'R$ 100,00',
  } as StudioSettings,
};
