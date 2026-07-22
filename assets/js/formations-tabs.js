(() => {
  const tablist = document.querySelector('.category-nav[role="tablist"]');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs
    .map((tab) => document.getElementById(tab.getAttribute('aria-controls')))
    .filter(Boolean);
  const indicator = tablist.querySelector('.category-nav-indicator');

  const moveIndicator = (tab) => {
    if (!indicator || !tab.offsetWidth) return;
    indicator.style.transform = `translate(${tab.offsetLeft}px, ${tab.offsetTop}px)`;
    indicator.style.width = `${tab.offsetWidth}px`;
    indicator.style.height = `${tab.offsetHeight}px`;
  };

  const activateTab = (tab, updateHash = true) => {
    const panelId = tab.getAttribute('aria-controls');

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== panelId;
    });

    moveIndicator(tab);

    if (updateHash) {
      history.replaceState(null, '', `#${panelId}`);
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      activateTab(tab);
    });

    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;

      activateTab(tabs[nextIndex]);
      tabs[nextIndex].focus();
    });
  });

  const hashTab = tabs.find((tab) => `#${tab.getAttribute('aria-controls')}` === window.location.hash);
  const initialTab = hashTab || tabs[0];

  if (indicator) {
    indicator.style.transition = 'none';
    activateTab(initialTab, false);
    void indicator.offsetWidth;
    indicator.style.transition = '';
  } else {
    activateTab(initialTab, false);
  }

  window.addEventListener('resize', () => {
    const activeTab = tabs.find((tab) => tab.classList.contains('active'));
    if (activeTab) moveIndicator(activeTab);
  });
})();
