import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import presenteImg from "@/assets/presente-bianca.png";

const paragrafos: { text: string; highlight?: boolean }[] = [
  { text: "Feliz aniversário meu amor!!!!" },
  {
    text: "Bom acho que é minha primeira vez escrevendo esse tipo de texto e queria que fosse do coração, então não estranhe se algo soar confuso kkkkk",
  },
  {
    text: "Hoje é seu dia em, quem diria que aquela garotinha que eu achei tão irritante no começo seria a pessoa com qual eu escolheria compartilhar a vida,",
  },
  {
    text: "e durante esse ano, tenho tido o prazer de passar cada dia ao seu lado conhecendo cada vez mais a Bianca e gostando cada dia mais de cada detalhe do seu jeito.",
  },
  {
    text: "Queria agradecer também pela paciência que você tem comigo que, por mais que a gente tenha nossas intrigas as vezes, você me faz querer ficar sempre.",
  },
  {
    text: "Eu sou muito grato por isso, pois não sei mais viver sem você, sem sentir a vontade de compartilhar cada vírgula do dia contigo e me entrosar com sua rotina.",
  },
  {
    text: "Você não sabe como me sinto realizado ao seu lado, mesmo que seja você dormindo tranquilamente do meu lado, ou acordada enchendo meu saco ou atentando o dia todo, você é uma mulher incrível e a única que me faz sentir essas coisas.",
  },
  {
    text: "Esse vai ser o primeiro aniversário seu de muitos outros que vamos passar juntos, e eu quero cada vez mais caprichar nos presentes kkkkkk",
  },
  {
    text: "Bom, olha, é dificil viu, lembrar de tantos momentos e não se emocionar... olho chega a encher de gotas de testo kkkk,",
    highlight: true,
  },
  {
    text: "mas enfim não vou fazer você se atrasar pro trabalho lendo um e-book de amores,",
    highlight: true,
  },
  {
    text: "como você não escolheu o presente pro dia, que eu sei que é importante pra você, eu comprei uma lembrancinha e podemos escolher o que você quiser depois, o que acha?",
  },
];

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      {paragrafos.map((p, i) => (
        <Section key={i} text={p.text} highlight={p.highlight} index={i} />
      ))}
      <Finale />
      <Footer />
    </main>
  );
}

export default Index;

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-6 text-sm uppercase tracking-[0.4em] text-muted-foreground">
        Com todo carinho
      </p>
      <h1 className="font-serif text-6xl italic leading-tight text-foreground sm:text-7xl md:text-8xl">
        Para: Bianca
        <span className="ml-2 inline-block">💝</span>
      </h1>
      <p className="mt-8 max-w-xs text-base text-muted-foreground sm:text-lg">
        Role devagar. Cada palavra é pra você.
      </p>
      <div className="absolute bottom-12 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">deslize</span>
        <svg
          className="bounce-arrow h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function Section({
  text,
  highlight,
  index,
}: {
  text: string;
  highlight?: boolean;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="flex min-h-[90svh] items-center justify-center px-6 py-20">
      <div
        ref={ref}
        className={[
          "max-w-xl transition-all duration-1000 ease-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        ].join(" ")}
      >
        {index === 0 && (
          <div className="mb-6 h-px w-12 bg-primary/40" aria-hidden />
        )}
        <p
          className={[
            "font-serif leading-relaxed",
            highlight
              ? "text-3xl italic text-primary sm:text-4xl"
              : "text-2xl text-foreground sm:text-3xl md:text-4xl",
          ].join(" ")}
        >
          {text}
        </p>
      </div>
    </section>
  );
}

function Finale() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const firedRef = useRef(false);

  useEffect(() => {
    if (!visible || firedRef.current) return;
    firedRef.current = true;

    const colors = ["#e8b4b8", "#d99a9e", "#f4d4d6", "#c97a7e", "#fbeaea"];
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        startVelocity: 25,
        spread: 70,
        ticks: 200,
        gravity: 0.5,
        origin: { x: Math.random(), y: -0.05 },
        colors,
        scalar: 0.9,
        drift: (Math.random() - 0.5) * 0.6,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [visible]);

  return (
    <section className="flex min-h-[100svh] items-center justify-center px-6 py-20">
      <div
        ref={ref}
        className={[
          "w-full max-w-md transition-all duration-1000 ease-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        ].join(" ")}
      >
        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[0_30px_80px_-40px_rgba(120,40,50,0.35)] sm:p-8">
          <p className="text-center text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Com amor
          </p>
          <h2 className="mt-3 text-center font-serif text-3xl italic text-foreground sm:text-4xl">
            Sua lembrancinha de hoje…
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-muted">
            <img
              src={presenteImg}
              alt="Lembrancinha de aniversário para a Bianca"
              className="h-auto w-full object-cover"
            />
          </div>
          <p className="mt-6 text-center font-serif text-xl italic text-muted-foreground">
            …e o resto a gente escolhe junto. 
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="flex min-h-[60svh] items-center justify-center px-6 py-16">
      <div
        ref={ref}
        className={[
          "text-center transition-all duration-1000 ease-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        ].join(" ")}
      >
        <p className="font-serif text-3xl italic text-foreground sm:text-4xl">
          Vamos escolher o resto juntos?
        </p>
        <div className="mx-auto mt-8 h-px w-16 bg-primary/40" aria-hidden />
        <p className="mt-8 text-sm uppercase tracking-[0.4em] text-muted-foreground">
          Feliz aniversário, meu amor
        </p>
        <p className="mt-2 text-2xl"></p>
      </div>
    </section>
  );
}
