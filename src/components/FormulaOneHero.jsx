export default function FormulaOneHero() {
  return (
    <div className="text-reveal__f1" aria-hidden="true">
      <picture className="text-reveal__f1-picture">
        <source media="(max-width: 767px)" srcSet="/Landscape_F1.png" />
        <img className="text-reveal__f1-image" src="/Potrait_F1.png" alt="" loading="eager" decoding="async" />
      </picture>
    </div>
  );
}