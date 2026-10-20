import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';

type MenuItem = {
  name: string;
  description: string;
  price: string;
};

type MenuCategory = {
  label: string;
  image: string;
  imageAlt: string;
  items: MenuItem[];
};

const mapUrl = 'https://maps.google.com/?q=Av.+Coronel+Colares+Moreira,+400,+São+Luís,+MA';
const whatsappNumber = '5598999999999';

const categories: Record<string, MenuCategory> = {
  executivos: {
    label: 'Pratos executivos',
    image: '/images/prato-carne.jpg',
    imageAlt: 'Prato executivo de carne com acompanhamentos',
    items: [
      { name: 'Executivo de carne à moda italiana', description: 'Massa, carne na chapa, salada mista com verduras e pãozinho. Serve 1 pessoa.', price: 'R$ 53,00' },
      { name: 'Executivo de frango à moda italiana', description: 'Massa, frango na chapa, salada mista com verduras e pãozinho. Serve 1 pessoa.', price: 'R$ 48,50' },
      { name: 'Executivo com carne na chapa', description: 'Carne na chapa com 3 acompanhamentos à sua escolha. Serve 1 pessoa.', price: 'R$ 50,00' },
      { name: 'Executivo com frango na chapa', description: 'Frango na chapa com 3 acompanhamentos à sua escolha. Serve 1 pessoa.', price: 'R$ 48,00' },
    ],
  },
  grelhados: {
    label: 'Grelhados',
    image: '/images/prato-camarao.jpg',
    imageAlt: 'Prato com camarões e legumes',
    items: [
      { name: 'Bife à parmegiana', description: 'Bife com muito molho de tomate e queijo, mais 2 acompanhamentos à sua escolha.', price: 'R$ 47,00' },
      { name: 'Frango à parmegiana', description: 'Frango com muito molho de tomate e queijo, mais 2 acompanhamentos à sua escolha.', price: 'R$ 44,50' },
      { name: 'Picanha grelhada ao molho roty', description: 'Picanha com um toque especial de molho roty e 2 acompanhamentos à sua escolha.', price: 'R$ 71,00' },
      { name: 'Filé de anchova ao molho de ervas', description: 'Grelhado no ponto certo e finalizado com molho de ervas frescas. Leve e saboroso.', price: 'R$ 49,50' },
      { name: 'Filé de peixe com camarões', description: 'Filé de peixe grelhado com camarões, cogumelos e alcaparras. Serve 1 pessoa.', price: 'R$ 69,00' },
      { name: 'Salmão grelhado', description: 'Salmão grelhado com salada verde e arroz de brócolis. Serve 1 pessoa.', price: 'R$ 87,50' },
    ],
  },
  espetos: {
    label: 'Espetos',
    image: '/images/prato-massa.jpg',
    imageAlt: 'Prato de carne grelhada com acompanhamentos',
    items: [
      { name: 'Espeto de carne', description: 'Com dois acompanhamentos à sua escolha e uma porção de vinagrete.', price: 'R$ 47,00' },
      { name: 'Espeto de frango', description: 'Acompanhado de uma porção de vinagrete.', price: 'R$ 42,50' },
      { name: 'Espeto de toscana', description: 'Acompanhado de uma porção de vinagrete.', price: 'R$ 42,50' },
      { name: 'Espeto misto 400 g', description: 'Carne e frango grelhados na brasa, bem temperados, com vinagrete fresquinho.', price: 'R$ 41,00' },
    ],
  },
  massas: {
    label: 'Massas & lasanhas',
    image: '/images/salao-pizzas.jpg',
    imageAlt: 'Mesa com pizzas servidas no salão',
    items: [
      { name: 'Ravioli artesanal de carne', description: 'Nosso ravioli artesanal é imperdível! Serve 1 pessoa.', price: 'R$ 44,00' },
      { name: 'Ravioli artesanal de queijo', description: 'Nosso ravioli artesanal é imperdível! Serve 1 pessoa.', price: 'R$ 44,00' },
      { name: 'Spaghetti grano duro', description: 'Aquela massa tradicional que sempre é uma boa pedida. Serve 1 pessoa.', price: 'R$ 39,00' },
      { name: 'Penne grano duro', description: 'Penne com nossos molhos artesanais. Serve 1 pessoa.', price: 'R$ 39,00' },
      { name: 'Penne integral e sem glúten', description: 'Opção mais leve com nossos deliciosos molhos artesanais. Serve 1 pessoa.', price: 'R$ 39,00' },
      { name: 'Lasanha bolonhesa', description: 'Massa fresca com um delicioso molho bolonhesa. 400 g.', price: 'R$ 40,00' },
      { name: 'Lasanha vegetariana', description: 'Massa fresca com molho de cenoura, abobrinha, ervilha, couve-flor, brócolis e berinjela. 400 g.', price: 'R$ 40,00' },
      { name: 'Lasanha de carne de sol', description: 'Massa fresca com um delicioso molho de carne de sol. 400 g.', price: 'R$ 48,00' },
      { name: 'Pizza dobrada', description: 'Nossa pizza dobrada, em diferentes sabores.', price: 'A partir de R$ 23,50' },
    ],
  },
  saladas: {
    label: 'Saladas & porções',
    image: '/images/mesa.jpg',
    imageAlt: 'Mesa do salão',
    items: [
      { name: 'Salada verde com carne de sol', description: 'Salada verde com carne de sol desfiada. 250 g.', price: 'R$ 39,50' },
      { name: 'Salada verde com frango', description: 'Salada verde com frango desfiado. 250 g.', price: 'R$ 31,50' },
      { name: 'Torta low carb de atum', description: 'Deliciosa torta de atum feita com farinha de amêndoa. 150 g.', price: 'R$ 25,00' },
      { name: 'Batata frita com molho da casa', description: 'Porção de 200 g com nosso molho especial.', price: 'R$ 23,50' },
      { name: 'Frango trinchado com pimentões', description: 'Porção de 400 g acompanhada de batata frita.', price: 'R$ 55,00' },
    ],
  },
  salgados: {
    label: 'Salgados & omeletes',
    image: '/images/balcao.jpg',
    imageAlt: 'Balcão com vitrine e cardápio em lousa',
    items: [
      { name: 'Empadão de camarão', description: 'Sequinho por fora e super cremoso por dentro, com recheio de camarão. 135 g.', price: 'R$ 23,50' },
      { name: 'Empadão de frango', description: 'Sequinho por fora e super cremoso por dentro, com creme de frango. 135 g.', price: 'R$ 20,50' },
      { name: 'Pastel folhado de queijo', description: 'Nosso tradicional pastel folhado quentinho, com muito queijo.', price: 'R$ 11,50' },
      { name: 'Pastel de queijo e presunto', description: 'Massa folhada crocante a cada mordida, com queijo e presunto.', price: 'R$ 15,50' },
      { name: 'Omelete de mussarela', description: 'Omelete preparado na hora com mussarela.', price: 'R$ 21,50' },
      { name: 'Omelete de peito de peru com queijo', description: 'Omelete preparado na hora com peito de peru e queijo.', price: 'R$ 25,00' },
    ],
  },
  doces: {
    label: 'Sorvetes, doces & bebidas',
    image: '/images/vitrine-doces.jpg',
    imageAlt: 'Vitrine de sorvetes e doces',
    items: [
      { name: 'Sorvete artesanal — caixa 0,5 kg', description: 'Nosso sorvete artesanal para levar para casa.', price: 'R$ 78,00' },
      { name: 'Sorvete artesanal — caixa 1 kg', description: 'Nosso sorvete artesanal para levar para casa.', price: 'R$ 149,00' },
      { name: 'Sorvete Fit Equilibri — 0,250 kg', description: 'Cremoso, baixíssima caloria, zero açúcar adicionado e 100% vegano. Açaí, Gianduia, Abacaxi com hortelã e gengibre ou Morango.', price: 'R$ 48,90' },
      { name: 'Fatia de torta', description: 'Fatia de 150 g, doce na medida!', price: 'A partir de R$ 22,50' },
      { name: 'Tortinha crostata', description: 'Massa amanteigada dourada com recheio cremoso de limão ou de chocolate.', price: 'A partir de R$ 17,50' },
      { name: 'Água mineral sem gás 500 ml', description: 'Bem gelada.', price: 'R$ 6,50' },
      { name: 'Refrigerante 350 ml', description: 'Diversos sabores.', price: 'A partir de R$ 10,00' },
    ],
  },
};

const galleryImages = [
  { src: '/images/salao-plantas.jpg', alt: 'Salão do Rossetti com plantas pendentes e luz natural', label: 'Nosso salão' },
  { src: '/images/salao-pizzas.jpg', alt: 'Mesas com pizzas servidas no salão', label: 'Para compartilhar' },
  { src: '/images/prato-camarao.jpg', alt: 'Prato de camarão com legumes', label: 'Feito na hora' },
  { src: '/images/cafe.jpg', alt: 'Café expresso com doce', label: 'Café passado com calma' },
  { src: '/images/salao-bandeiras.jpg', alt: 'Salão decorado com bandeiras da Itália e do Brasil', label: 'Itália e Brasil' },
  { src: '/images/balcao.jpg', alt: 'Balcão com cardápio em lousa', label: 'Nosso balcão' },
  { src: '/images/vitrine-doces.jpg', alt: 'Vitrine de doces artesanais', label: 'Doces da casa' },
  { src: '/images/mesa.jpg', alt: 'Mesa e cadeiras do salão', label: 'Sua mesa espera' },
];

const testimonials = [
  { quote: 'Ótimo lugar para tomar café e almoçar no Tropical Shopping. Ambiente limpo e agradável!', name: 'Ana Paula M.', rating: 5, image: 'https://i.pravatar.cc/120?img=47' },
  { quote: 'Boas opções de self-service e lanches rápidos. Perfeito para o intervalo do trabalho.', name: 'Carlos Eduardo S.', rating: 4, image: 'https://i.pravatar.cc/120?img=12' },
  { quote: 'O cappuccino é maravilhoso e os doces são caseiros de verdade. Recomendo muito!', name: 'Fernanda L.', rating: 5, image: 'https://i.pravatar.cc/120?img=32' },
  { quote: 'Preço justo, comida gostosa e atendimento simpático. Viro cliente fixo!', name: 'Roberto A.', rating: 4, image: 'https://i.pravatar.cc/120?img=11' },
  { quote: 'A lasanha artesanal é incrível. Melhor restaurante do Tropical Shopping sem dúvida.', name: 'Mariana C.', rating: 5, image: 'https://i.pravatar.cc/120?img=44' },
];

function whatsappLink(item?: MenuItem) {
  const message = item
    ? `Olá! Gostaria de pedir: ${item.name} - ${item.price}`
    : 'Olá! Quero fazer um pedido no Rossetti Artisan';
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function BrandMark({ large = false }: { large?: boolean }) {
  return (
    <a href="#inicio" className={`brand-logo ${large ? 'brand-logo-large' : ''}`} aria-label="Rossetti Artisan - início">
      <img src="/images/logo.jpg" alt="Rossetti Artisan, desde 1991" />
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('executivos');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const activeMenu = categories[activeCategory];
  const testimonial = testimonials[testimonialIndex];

  const scrollToMenu = () => {
    document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <BrandMark />
          <nav className={`main-nav ${menuOpen ? 'main-nav-open' : ''}`} aria-label="Navegação principal">
            <a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a>
            <a href="#cardapio" onClick={() => setMenuOpen(false)}>Cardápio</a>
            <a href="#historia" onClick={() => setMenuOpen(false)}>Nossa casa</a>
            <a href="#galeria" onClick={() => setMenuOpen(false)}>Galeria</a>
            <a href="#localizacao" onClick={() => setMenuOpen(false)}>Localização</a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="nav-order" onClick={() => setMenuOpen(false)}>
              Pedir agora <ArrowUpRight size={15} />
            </a>
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen((current) => !current)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content container">
            <p className="eyebrow hero-eyebrow"><span /> Cozinha artesanal no Tropical Shopping</p>
            <h1>Comida que<br /><em>acolhe.</em></h1>
            <p className="hero-copy">Sabores autorais, café especial e aquele cuidado que transforma uma pausa em memória.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={scrollToMenu}>Explorar cardápio <ArrowRight size={18} /></button>
              <a className="button button-ghost" href={mapUrl} target="_blank" rel="noreferrer">Como chegar <ArrowUpRight size={17} /></a>
            </div>
            <div className="hero-rating"><span className="stars">★★★★★</span><strong>4,4</strong><span>Baseado em quase 500 avaliações</span></div>
          </div>
          <div className="hero-bottom container"><span>São Luís · Maranhão</span><span className="scroll-hint">Role para descobrir <span className="scroll-line" /></span></div>
        </section>

        <section className="intro-strip" id="historia">
          <div className="container intro-grid">
            <p className="eyebrow">Uma pausa com sabor</p>
            <div>
              <h2>Feito à mão, servido <em>com afeto.</em></h2>
              <p className="intro-text">No Rossetti, cada receita tem o tempo e o cuidado que merece. Do almoço feito na hora ao café passado com calma, criamos momentos deliciosos para todos os seus dias.</p>
              <div className="intro-signature"><span>R</span><div><strong>Rossetti</strong><small>Artisan food & coffee</small></div></div>
            </div>
            <div className="intro-stat"><strong>35</strong><span>anos<br />de história</span></div>
          </div>
        </section>

        <section className="gallery-section section-pad" id="galeria">
          <div className="container">
            <div className="gallery-heading"><div><p className="eyebrow">Por dentro do Rossetti</p><h2>Um lugar para<br /><em>viver o momento.</em></h2></div><p>Do café da manhã ao almoço, nosso espaço foi feito para receber encontros leves, refeições sem pressa e pequenas pausas no meio do dia.</p></div>
            <div className="gallery-grid">
              {galleryImages.map((image) => <figure className="gallery-image" key={image.src}><img src={image.src} alt={image.alt} loading="lazy" /><figcaption>{image.label}</figcaption></figure>)}
            </div>
          </div>
        </section>

        <section className="experience-section section-pad">
          <div className="container">
            <div className="section-heading centered"><p className="eyebrow">Por que o Rossetti?</p><h2>Tem sempre um bom motivo<br /><em>para ficar mais um pouco.</em></h2></div>
            <div className="feature-grid">
              <article className="feature-card"><div className="feature-icon"><Utensils size={24} /></div><span className="feature-number">01</span><h3>Almoço de verdade</h3><p>Buffet fresco e pratos à la carte preparados para trazer sabor e conforto à sua rotina.</p><a href="#cardapio" onClick={scrollToMenu}>Ver opções <ArrowRight size={16} /></a></article>
              <article className="feature-card feature-card-accent"><div className="feature-icon"><Sparkles size={24} /></div><span className="feature-number">02</span><h3>Receitas autorais</h3><p>Ingredientes selecionados, combinações surpreendentes e o toque especial do nosso chef.</p><a href="#cardapio" onClick={scrollToMenu}>Conhecer menu <ArrowRight size={16} /></a></article>
              <article className="feature-card"><div className="feature-icon"><Coffee size={24} /></div><span className="feature-number">03</span><h3>Café & confeitaria</h3><p>Cappuccinos artesanais, doces caseiros e salgados frescos para qualquer hora do dia.</p><a href="#cardapio" onClick={scrollToMenu}>Fazer uma pausa <ArrowRight size={16} /></a></article>
            </div>
          </div>
        </section>

        <section className="menu-section section-pad" id="cardapio">
          <div className="container">
            <div className="menu-header"><div><p className="eyebrow">Nosso menu</p><h2>Escolha seu<br /><em>momento.</em></h2></div><figure className="menu-feature" key={activeCategory}><img src={activeMenu.image} alt={activeMenu.imageAlt} /><figcaption><span>Em destaque</span><strong>{activeMenu.label}</strong><small>Ingredientes frescos e receitas honestas.</small></figcaption></figure></div>
            <div className="menu-tabs" role="tablist" aria-label="Categorias do cardápio">
              {Object.entries(categories).map(([key, category]) => <button key={key} className={activeCategory === key ? 'active' : ''} onClick={() => setActiveCategory(key)} role="tab" aria-selected={activeCategory === key}>{category.label}</button>)}
            </div>
            <div className="menu-list">
              {activeMenu.items.map((item, index) => <article className="menu-item" key={item.name}><div className="menu-item-index">{String(index + 1).padStart(2, '0')}</div><div className="menu-item-main"><h3>{item.name}</h3><p>{item.description}</p></div><strong className="menu-price">{item.price}</strong><a className="menu-whatsapp" href={whatsappLink(item)} target="_blank" rel="noreferrer" aria-label={`Pedir ${item.name} pelo WhatsApp`}><MessageCircle size={17} /><span>Pedir</span></a></article>)}
            </div>
          </div>
        </section>

        <section className="location-section section-pad" id="localizacao">
          <div className="container location-grid">
            <div className="location-info"><p className="eyebrow">Venha nos visitar</p><h2>Seu lugar favorito<br /><em>fica aqui.</em></h2><p className="location-copy">Uma mesa esperando por você no coração do Tropical Shopping.</p><div className="hours"><div className="hours-row"><span>Segunda a sábado</span><strong>11h — 22h</strong></div><div className="hours-row"><span>Domingo</span><strong>12h — 21h</strong></div><div className="hours-note"><Coffee size={17} /> Café da manhã e da tarde durante todo o horário</div></div><a className="contact-line" href="tel:+559832356475"><Phone size={17} /> (98) 3235-6475</a><a className="button button-dark" href={whatsappLink()} target="_blank" rel="noreferrer">Falar no WhatsApp <MessageCircle size={17} /></a></div>
            <div className="map-card"><div className="map-pattern"><div className="map-route map-route-one" /><div className="map-route map-route-two" /><div className="map-road map-road-one" /><div className="map-road map-road-two" /><div className="map-pin"><MapPin size={24} fill="currentColor" /></div><span className="map-label map-label-one">Tropical Shopping</span><span className="map-label map-label-two">Jardim Renascença</span></div><div className="address-card"><MapPin size={20} /><div><strong>Rossetti Artisan</strong><p>Av. Coronel Colares Moreira, 400 — Loja 1<br />Jardim Renascença, São Luís — MA</p></div><a href={mapUrl} target="_blank" rel="noreferrer" aria-label="Abrir no Google Maps"><ArrowUpRight size={18} /></a></div></div>
          </div>
        </section>

        <section className="reviews-section section-pad"><div className="container reviews-grid"><div className="reviews-intro"><p className="eyebrow">Quem prova, volta</p><h2>Histórias que<br /><em>alimentam.</em></h2><div className="review-score"><strong>4,4</strong><div><span className="stars">★★★★★</span><small>quase 500 avaliações no Google</small></div></div></div><div className="testimonial-card"><div className="quote-mark">“</div><p className="testimonial-quote">{testimonial.quote}</p><div className="testimonial-footer"><div className="reviewer"><img src={testimonial.image} alt={testimonial.name} /><div><strong>{testimonial.name}</strong><span className="stars">{'★'.repeat(testimonial.rating)}<span className="stars-muted">{'★'.repeat(5 - testimonial.rating)}</span></span></div></div><div className="carousel-controls"><button onClick={() => setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length)} aria-label="Depoimento anterior"><ChevronLeft size={20} /></button><span>0{testimonialIndex + 1} / 0{testimonials.length}</span><button onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)} aria-label="Próximo depoimento"><ChevronRight size={20} /></button></div></div></div></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-top"><div><BrandMark large /><p className="footer-tagline">Sabor artesanal no coração<br />do Tropical Shopping.</p></div><div className="footer-links"><strong>Explore</strong><a href="#inicio">Início</a><a href="#cardapio">Cardápio</a><a href="#galeria">Galeria</a><a href="#localizacao">Localização</a></div><div className="footer-links"><strong>Conecte-se</strong><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={15} /> @rossetti.artisan</a><a href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a><a href="tel:+559832356475"><Phone size={15} /> (98) 3235-6475</a></div></div><div className="container footer-bottom"><span>© 2025 Rossetti Artisan. Todos os direitos reservados.</span><span>Feito para bons encontros.</span></div></footer>

      <a className="floating-whatsapp" href={whatsappLink()} target="_blank" rel="noreferrer"><span className="floating-icon"><MessageCircle size={21} /></span><span>Pedir agora</span></a>
    </div>
  );
}

export default App;
