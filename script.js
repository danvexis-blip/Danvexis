container.innerHTML += `
  <div class="product">
    <img src="${p.image}" />
    <h3>${p.name}</h3>
    <p>$${p.price}</p>
    <p>Stock: ${p.stock}</p>
    <button onclick="buy('${id}', ${p.stock})">Buy</button>
  </div>
`;