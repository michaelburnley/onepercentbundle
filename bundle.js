{/* <script src="https://unpkg.com/axios/dist/axios.min.js"></script> */}
// https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#youre-building-a-quick-order-form-beware
const headers = {
    'X-Shopify-Storefront-Access-Token': ''
};

const bundleContainer = document.querySelector("#bundle-container");
const form = document.querySelector("#bundle-search");

const getbundlesQuery = (keyword) => `{ allbundles(filter: { q:"${keyword}"}) { price id title} }`;

const renderbundles = ({ data }) => {
  const { allbundles = [] } = data;

  while (bundleContainer.firstChild) {
    bundleContainer.removeChild(bundleContainer.firstChild);
  }

  const bundleFragment = document.createDocumentFragment();
  const bundlesList = document.createElement('ul');

  allbundles.forEach((bundle) => {
    const bundlesListItem = document.createElement('li');
    const bundlesListLink = document.createElement('a');
    bundlesListLink.href = bundle.url;
    bundlesListLink.textContent = "Click To View";
    bundlesListItem.textContent = `${bundle.title} - ${bundle.author}`;
    bundlesListItem.appendChild(bundlesListLink);
    bundlesList.appendChild(bundlesListItem);
  });

  bundleFragment.appendChild(bundlesList);
  bundleContainer.appendChild(bundleFragment);
}

const loadbundles = (ev) => {
  ev.preventDefault();
  const keyword = form.elements["search"].value;

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: getbundlesQuery(keyword)
    })
  };

  fetch(`http://localhost:3000`, options)
    .then(res => res.json())
    .then(renderbundles);

  form.reset();
}

form.addEventListener("submit", loadbundles)