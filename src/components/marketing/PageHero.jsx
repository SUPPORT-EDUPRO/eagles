import React from 'react';

function PageHero({ kicker, title, lede, children, className = '' }) {
  return (
    <section className={['ye-page-intro', className].filter(Boolean).join(' ')}>
      <div className="ye-wrap ye-page-intro__inner">
        {kicker && <p className="ye-eyebrow">{kicker}</p>}
        <h1>{title}</h1>
        {lede && <p className="ye-page-intro__lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}

export default PageHero;
