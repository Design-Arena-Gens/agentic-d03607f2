(function(){
  const yearEl = document.getElementById('y');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('orderForm');
  if (!form) return;

  const errors = {
    name: '????? ?????',
    phone: '??? ?????? ????? (10 ????? ??? ?????)',
    wilaya: '???? ?????? ???????',
    quantity: '?????? ??? ?? ???? 1 ?? ????',
    address: '??????? ?????'
  };

  function setError(id, message){
    const small = form.querySelector(`small[data-for="${id}"]`);
    if (small) small.textContent = message || '';
  }

  function clearErrors(){
    ['name','phone','wilaya','quantity','address'].forEach(k=> setError(k, ''));
  }

  function validate(){
    clearErrors();
    let ok = true;

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const wilaya = form.wilaya.value;
    const quantity = Number(form.quantity.value || 0);
    const address = form.address.value.trim();

    if (!name) { setError('name', errors.name); ok = false; }
    if (!/^[0-9]{9,13}$/.test(phone.replace(/\D/g,''))) { setError('phone', errors.phone); ok = false; }
    if (!wilaya) { setError('wilaya', errors.wilaya); ok = false; }
    if (!(quantity >= 1)) { setError('quantity', errors.quantity); ok = false; }
    if (!address) { setError('address', errors.address); ok = false; }

    return ok;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (!validate()) return;

    const data = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      wilaya: form.wilaya.value,
      quantity: form.quantity.value,
      address: form.address.value.trim()
    };

    const message = [
      '?????? ?????? ??? ????? ??? ??????:',
      `?????: ${data.name}`,
      `??????: ${data.phone}`,
      `???????: ${data.wilaya}`,
      `???????: ${data.address}`,
      `??????: ${data.quantity}`,
      '?????: 3500 ?? ? ??????? ?????'
    ].join('%0A');

    // ??? ?????? ???????? (???? ??????)
    const phoneIntl = '213555000000';
    const wa = `https://wa.me/${phoneIntl}?text=${message}`;
    window.location.href = wa;
  });
})();
