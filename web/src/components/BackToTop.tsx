import React, { useEffect, useState } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true)
    }
    else if (scrolled <= 300) {
      setVisible(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);

    return () => {
      window.removeEventListener('scroll', toggleVisible)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', cursor: 'pointer', bottom: 30, right: 30 }}>
      <i className="fas fa-arrow-circle-up fa-2x" onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }} />
    </div>
  );
}

export default BackToTop;