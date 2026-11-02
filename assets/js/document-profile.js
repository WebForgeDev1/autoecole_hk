(() => {
  const profile = document.querySelector('[data-document-profile]');
  if (!profile) return;
  const card = profile.closest('.documents-card');
  const update = () => {
    const neph = profile.querySelector('[name="document-neph"]:checked')?.value;
    const age = profile.querySelector('[name="document-age"]:checked')?.value;
    const registered = neph === 'yes';
    card.querySelector('[data-neph-document]').hidden = !registered;
    card.querySelectorAll('[data-first-registration]').forEach(item => {
      item.hidden = registered;
    });
    card.querySelector('[data-minor-document]').hidden = age === 'adult';
    card.querySelector('[data-jdc]').textContent = age === 'minor'
      ? 'JDC (Français, 17 ans)'
      : 'JDC (Français, 17–24 ans)';
    card.querySelector('[data-document-note]').textContent = registered
      ? "Dossier NEPH à vérifier avec notre équipe."
      : 'Selon votre situation.';
  };
  profile.addEventListener('change', update);
  update();
})();
